import React from "react";
import rehypeReact from "rehype-react";
import { throttle } from "lodash";
import visit from "unist-util-visit";
import remove from "unist-util-remove";
import { parse } from "css-declarations";
import toString from "mdast-util-to-string";
import { animateScroll, Events } from "react-scroll";

const isBrowser = typeof window !== "undefined";

isBrowser ? require("intersection-observer") : undefined;

import * as allComponents from "../components";
// Build an object with all the imported components using the component name as keys
let allImports = {};
Object.keys(allComponents).forEach(k => {
  if (typeof allComponents[k] === "function") {
    allImports[k.toLowerCase()] = allComponents[k];
  }
});

// Prepare a render function to match and replace the AST elements to the components list
const renderAST = new rehypeReact({
  createElement: React.createElement,
  components: allImports
}).Compiler;

const urlRegex = /(url\('.+'\))/gi;

class MarkdownPageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      previous: null,
      sectionStates: null,
      isScrolling: false
    };
  }

  componentWillMount() {
    // Makes a deep copy of the AST for modification to fix a bug where the modified AST was getting modified again,
    // making H1 into H2 and H2 into H3 and the second time around making all remaining H2 into H3
    // TODO: explore why this gets called every time a page is visited, even after SSR
    this.tempAST = JSON.parse(JSON.stringify(this.props.data));
    let pageContent = this.tempAST.markdownRemark.htmlAst;

    if (pageContent !== null) {
      visit(pageContent, node => {
        if (node.tagName === "code") {
          node.properties["data-string-code"] = `${toString(node)}`;
        }
      });
    }
    // console.log('this.tempAST: ', this.tempAST);

    // Add classes and styles to nodes in the AST to style markdown
    //TODO: Refactor this foreach to use visit instead
    const pageElements = pageContent.children;
    console.log('pageElements:', pageElements);
    if (pageElements.length) {
      // Removing orphan returns generated by remark to allow composition by passing the correct amount of children to react components
      this.removeOrphanReturnsAndBase64(pageContent);
      pageContent.children.forEach((el, index) => {
        switch (el.tagName) {
          case "a":
            el.properties.class = "text-link";
            break;
          case "p":
            el.properties.class = "type-a";
            let imgEls = this.findInTree("img", el);
            let aEls = this.findInTree("a", el);
            if (imgEls.length > 0) {
              el.properties.class = "ibm-padding--horizontal";
              el.tagName = "div";
              imgEls.forEach(img => {
                // Use the existing styles to respect gatsby responsive image plugin styles, or add basic styles to non-responsive images (mostly SVGs)
                img.properties.style =
                  img.properties.style || "width: 100%;display: block;";
              });
            }
            aEls.forEach(el => {
              el.properties.class = "text-link";
            });
            break;
          case "ul":
            el.properties.class =
              "type-a md-list-padding duo-no-margin--bottom";
            break;
          case "h2":
            el.tagName = "h3";
            el.properties.class =
              "type-b ibm-padding--left duo-subsection-margin";
            break;
          case "h1":
            el.tagName = "h2";
            el.properties.class =
              "duo-section-padding type-sectionheader";
            break;
          case "div":
            if (
              el.properties.className &&
              el.properties.className[0] === "gatsby-highlight"
            ) {
              el.tagName = "codesnippet";
              el.properties.className = [];
              let codeEls = this.findInTree("code", el);
              codeEls.forEach(codeEl => {
                if (codeEl.tagName === "code") {
                  codeEl.properties.class = "ibm-type-b ibm-type-mono";
                }
              });
            }
            break;
        }
      });
    }

    this.sectionByHeader(pageContent);
  }

  componentDidMount() {
    const path = this.props.data.markdownRemark.frontmatter.path;
    const sections = document.querySelectorAll("main section[id]");
    const sectionAnchors = document.querySelectorAll(".anchor");
    this.attachEventListener(sectionAnchors);

    Events.scrollEvent.register("begin", (to, element) => {
      this.setState({ isScrolling: true });
    });

    Events.scrollEvent.register("end", (to, element) => {
      this.setState({ isScrolling: false });
    });

    // If there are no 'sections' on a page, ignore the nav and observer
    if (typeof sections !== "undefined" && sections.length > 0) {
      this.initSectionState(sections);

      // Set options for Intersection Observer
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      };

      // Rules for focus: has IntersectionRect > 0 and 50% of screen space
      const observer = new IntersectionObserver(entries => {
        const path = this.props.data.markdownRemark.frontmatter.path;
        let NewSelectedSection = this.state.active;
        let sectionStates = this.state.sectionStates;
        let previouslyActive = this.state.previous;

        entries.forEach(entry => {
          let screenPercent = entry.intersectionRect.height ?
            entry.intersectionRect.height / entry.rootBounds.height :
            0;
          sectionStates[entry.target.id].IR = entry.intersectionRatio;
          sectionStates[entry.target.id].SP = screenPercent;
        });

        let maxIR = 0;
        let maxSP = 0;

        // Look through the state of each section and how visible it is
        // and select the most pertinent section
        Object.keys(sectionStates).forEach((key, index) => {
          if (
            sectionStates[key].IR > maxIR &&
            sectionStates[key].SP > maxSP &&
            !this.state.isReturning
          ) {
            maxIR = sectionStates[key].IR;
            maxSP = sectionStates[key].SP;
            NewSelectedSection = key;
          }
        });

        // Only if we are looking at a new section should we update
        if (
          NewSelectedSection !== this.state.active &&
          !this.state.isScrolling
        ) {
          this.setState({
            active: NewSelectedSection,
            previous: this.state.active
          });
        }
      }, options);

      Array.prototype.forEach.call(sections, function(section) {
        observer.observe(section);
      });
    }
  }

  initSectionState = sectionNodes => {
    const path = this.props.data.markdownRemark.frontmatter.path;
    const selectedRefs = document.querySelectorAll(".is-selected");
    let navName = null;

    if (selectedRefs !== null) {
      Array.prototype.forEach.call(selectedRefs, function(ref) {
        ref.classList.remove("is-selected");
      });
    }

    const sectionStates = {};
    Array.prototype.forEach.call(sectionNodes, function(section, index) {
      let activeState = false;
      if (index === 0) {
        navName = section.id;
        activeState = true;
      }

      sectionStates[section.id] = {
        IR: 0,
        SP: 0
      };
    });

    this.setState({
      active: navName,
      sectionStates: sectionStates
    });
  };

  attachEventListener = sectionAnchors => {
    // Below is a refactor for IE 11
    for (let i = 0; i < sectionAnchors.length; i++) {
      sectionAnchors[i].addEventListener("click", evt => {
        const path = this.props.data.markdownRemark.frontmatter.path;
        // console.log("atag", anchor.href);
        const tmp = document.createElement("div");
        tmp.style.cssText = "width: 0; height: 0;";
        const content = document.createTextNode(sectionAnchors[i].href);
        tmp.appendChild(content);
        document.body.appendChild(tmp);
        const range = document.createRange();
        range.selectNode(tmp);
        const selection = window.getSelection().addRange(range);
        // console.log("tmp:", tmp);
        // console.log("selection: ", selection);

        try {
          const success = document.execCommand("copy");
          const successMsg = success ? "successful copy" : "unsuccessful";
          // console.log(`Copy of link was ${successMsg}`);
        } catch (err) {
          // console.log(`Error copying: ${JSON.stringify(err, null, 2)}`);
        }

        tmp.parentNode.removeChild(tmp);
        window.getSelection().removeAllRanges();
        // console.log("tmp end: ", tmp);
      });
    }
    // Below is a version for modern browsers, should IE 11 not be supported
    // sectionAnchors.forEach(anchor => {
    //   anchor.addEventListener("click", evt => {
    //     const path = this.props.data.markdownRemark.frontmatter.path;
    //     // console.log("atag", anchor.href);
    //     const tmp = document.createElement("div");
    //     tmp.style.cssText = "width: 0; height: 0;";
    //     const content = document.createTextNode(anchor.href);
    //     tmp.appendChild(content);
    //     document.body.append(tmp);
    //     const range = document.createRange();
    //     range.selectNode(tmp);
    //     const selection = window.getSelection().addRange(range);
    //     // console.log("tmp:", tmp);
    //     // console.log("selection: ", selection);

    //     try {
    //       const success = document.execCommand("copy");
    //       const successMsg = success ? "successful copy" : "unsuccessful";
    //       // console.log(`Copy of link was ${successMsg}`);
    //     } catch (err) {
    //       // console.log(`Error copying: ${JSON.stringify(err, null, 2)}`);
    //     }

    //     tmp.parentNode.removeChild(tmp);
    //     window.getSelection().removeAllRanges();
    //     // console.log("tmp end: ", tmp);
    //   });
    // });
  };
  //
  componentDidUpdate() {
    const path = this.props.data.markdownRemark.frontmatter.path;
    let activeLink = document.querySelector(
      'a[href="' + path + "#" + this.state.active + '"]'
    );
    let prevLink = document.querySelector(
      'a[href="' + path + "#" + this.state.previous + '"]'
    );

    if (this.state.active !== null && activeLink !== null) {
      activeLink.closest("li").classList.add("is-selected");
    }

    if (this.state.previous !== null && prevLink !== null) {
      prevLink.closest("li").classList.remove("is-selected");
    }
  }

  // Finds text nodes with carriage returns only and removes them from the AST
  // Finds and converts all string style attributes to objects to avoid improper parsing of values containing semi-colons
  removeOrphanReturnsAndBase64 = pageContent => {
    const returnChar = String.fromCharCode(10);
    remove(pageContent, (node, index, parent) => {
      // Remove nodes of type text which include a carriage return and are not parented by a <code> tag
      if (
        node &&
        node.type === "text" &&
        parent.tagName !== "code" &&
        node.value.includes(returnChar)
      ) {
        // Exclude nodes that also include other characters besides carriage return and space
        for (let i = 0; i < node.value.length; i++) {
          const char = node.value[i];
          if (char !== " " && char !== returnChar) {
            return false;
          }
        }
        return true;
      } else {
        // Take advantage of the tree traverse to also parse the style property all of the non text elements in which said property is a string
        // This resolves a problem where base64 url inlined in the styles get wrongfully parsed (stripped out) by the AST parser
        if (
          node &&
          node.properties &&
          node.properties.style &&
          typeof node.properties.style === "string"
        ) {
          node.properties.style = parse(node.properties.style);
        }
      }
      return false;
    });
  };

  // Finds nodes recursively of a specific type in a tree abd returns them for manipulation
  findInTree = (tag, tree) => {
    let tags = [];
    if (tree.tagName && tree.tagName === tag) {
      tags.push(tree);
    }
    if (tree.children && tree.children.length) {
      tree.children.forEach(t => {
        tags = tags.concat(this.findInTree(tag, t));
      });
    }
    return tags;
  };

  selectLink = (id, sections, navLinks) => {
    Array.prototype.forEach.call(navLinks, function(element) {
      if (element) {
        element.classList.remove("is-selected");
      }
    });

    document
      .querySelector(
        `a[href="${this.props.data.markdownRemark.frontmatter.path}#${id}"]`
      )
      .classList.add("is-selected");
  };

  // Wraps each section of h2 into a <section>
  sectionByHeader = pageContent => {
    // Get indexes of all occurences of h1 elements
    let headerIndexes = pageContent.children
      .map((el, index) => (el.tagName === "h2" ? index : ""))
      .filter(String);

    let offset = 0;
    headerIndexes.forEach((headerIndex, i, headers) => {
      const newElement = {
        type: "element",
        tagName: "section",
        properties: {}
      };
      const startSlice = headerIndex - offset;
      const endSlice =
        i + 1 >= headers.length
          ? pageContent.children.length
          : headers[i + 1] - offset;
      const newChildren = pageContent.children.slice(startSlice, endSlice);

      newElement.properties.id = newChildren[0].properties.id;
      newElement.children = newChildren;
      pageContent.children.splice(startSlice, newChildren.length, newElement);
      offset += newChildren.length - 1;
    });
  };

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  render() {
    return renderAST(this.tempAST.markdownRemark.htmlAst);
  }
}

export default MarkdownPageTemplate;

export const pageQuery = graphql`
  query MarkdownPageByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      htmlAst
      frontmatter {
        description
        path
        title
        structure
      }
    }
  }
`;