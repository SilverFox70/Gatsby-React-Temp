import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled, { injectGlobal } from "react-emotion";
import { DOMParser } from "xmldom";
import _ from "lodash";
import colors from "../globals/colors";

import Navigation from "../components/navigation";
import Footer from "../components/Footer";
import Default from "../structures/Default";
import PageWithHeader from "../structures/PageWithHero";
import PageWithHeaderLeftAligned from "../structures/PageWithHeroLeftAligned";
import PageJSX from "../structures/PageJSX";
import { breakpointsREM } from "../globals";

injectGlobal`
  ${
    "" /* ibm-grid sets position: relative, which breaks scroll positioning
  when using anchor links. They are being positioned in the middle of the
  page instead of on top of it. Setting ibm-grid to position: static
  (the browsers default value) fixes the issue. */
  }
  .ibm-grid {
    position: static;

    ${"" /* Override grid span between breakpoints */}
    @media (min-width: ${breakpointsREM.md}) {
      grid-template-columns: repeat(auto-fill, calc(100vw * 0.125));
    }

    @media (min-width: ${breakpointsREM.lg}) {
      grid-template-columns: repeat(auto-fill, calc((100vw - 2rem) * 0.0625));
    }

    @media (min-width: ${breakpointsREM.max}) {
      grid-template-columns: repeat(auto-fill, calc((99rem - 3rem) * 0.0625));
    }
  }

  ${"" /* Fix for lack of CSS Grid support in older IE */}
  .no-cssgrid .ibm-container {
    max-width: 1250px;
    margin: 0 0 0 300px !important;
  }

  .ibm-container {
    max-width: 100% !important;

    @media (min-width: ${breakpointsREM.md}) {
      padding: 0;
    }
  }
`;
// End Temporary CSS

injectGlobal`
  html {
    background-color: ${colors.gray[90]};
  }

  body {
      background: ${colors.gray[30]};
      color: ${colors.gray[90]};
      text-rendering: optimizeLegibility;
      font-smoothing: antialiased;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }

  :focus {
    outline: none;
  }

  .section-padding {
    margin-top: 3rem;
    @media (min-width: ${breakpointsREM.lg}) {
      margin-top: 4rem;
    }
  }

  .subsection-margin {
    margin-top: 3rem;
    margin-bottom: 0;

    @media (min-width: ${breakpointsREM.lg}) {
      margin-top: 4rem;
    }
  }

  .no-margin--top {
    margin-top: 0 !important;
  }

  .no-margin--bottom {
    margin-bottom: 0 !important;
  }

	svg {
		font-smoothing: antialiased;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

  a.text-link {
    color: ${colors.gray[60]};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: ${colors.gray[70]};
    }
    &:focus {
      text-decoration: none;
      border-bottom: 3px solid ${colors.gray[60]};
    }
  }

  main section ul {
    position: relative;
    list-style-type: none;
    padding-left: 1.15rem;
    text-indent: -.56rem;

    li:before {
      content: "–";
      display: inline-block;
      margin-right: 0.5rem;
    }
  }

  .md-list-padding {
    padding-left: 1.75rem;
  }

  .ol-list-padding {
    padding-left: 2.55rem;
  }

  h1 {
    color: ${colors.white[0]};
  }
`;

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewportSize: {
        w: -1,
        h: -1
      },
      resizing: false
    };

    this.updateDimensions = _.throttle(this.updateDimensions.bind(this), 100);
    this.stopResizing = _.debounce(this.stopResizing.bind(this), 200);
  }

  updateDimensions() {
    this.setState({
      viewportSize: {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      },
      resizing: true
    });
    this.stopResizing();
  }

  stopResizing() {
    this.setState({
      resizing: false
    });
  }

  componentDidMount() {
    const Blazy = require("blazy");
    const bLazy = new Blazy();

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    window.removeEventListener("resize", this.stopResizing);
  }

  render() {
    let allPages = this.props.data.allSitePage.edges
      .map(edge => edge.node)
      .map(page => {
        return {
          ...page,
          order: 100,
          sections: [],
          title: page.path
            .replace(/\b\/\b/g, ": ")
            .replace(/\//g, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, l => l.toUpperCase()),
          colorScheme: page.path === "/" ? "dark" : "light"
        };
      });

    const markdownPages = this.props.data.allMarkdownRemark.edges
      .map(edge => edge.node)
      .map(page => {
        // If markdown page is empty, put blank space so site doesn't crash
        if (page.html === "") {
          page.html = "<p></p>";
        }
        const sections = Array.prototype.slice
          .call(
            new DOMParser()
              .parseFromString(page.html, "text/html")
              .getElementsByTagName("h1")
          )
          .map(section => {
            return {
              link: section.attributes[0].value,
              title: section.childNodes[1].data
            };
          });

        return {
          gradient: page.frontmatter.headerGradient,
          colorScheme: page.frontmatter.colorScheme || "light",
          description: page.frontmatter.description,
          order: page.frontmatter.order,
          path: page.frontmatter.path,
          sections: sections,
          structure: page.frontmatter.structure,
          title: page.frontmatter.title
        };
      });

    // Merge info from markdown pages
    allPages = _.values(
      allPages
        .concat(markdownPages)
        //.concat(disabledLinks)
        .reduce((acc, x) => {
          acc[x.path] = Object.assign(acc[x.path] || {}, x);
          return acc;
        }, {})
    ).sort((prev, next) => prev.order - next.order);

    const { title, description, structure, gradient } = allPages.filter(
      x => x.path === this.props.location.pathname
    )[0];

    const bgColor = gradient && gradient.light ? gradient.light : null;

    let prevPage = "";
    let nextPage = "";
    let prevLink = "";
    let nextLink = "";

    allPages
      .filter(page => page.order !== 100 && page.disabled !== true)
      .forEach((item, i, filteredPages) => {
        if (item.path === this.props.location.pathname) {
          if (i > 0) {
            prevPage = filteredPages[i - 1].title;
            prevLink = filteredPages[i - 1].path;
          }
          if (i < filteredPages.length - 2) {
            nextPage = filteredPages[i + 1].title;
            nextLink = filteredPages[i + 1].path;
          }
        }
      });

    return (
      <div className="ibm">
        <Helmet>
          <html lang="en" />
          <body
            className="ibm-container ibm-container--left ibm-type"
            data-page={this.props.location.pathname.replace(/\//g, "")}
          />
        </Helmet>
        <Navigation
          pathname={this.props.location.pathname}
          section={this.props.location.hash}
          viewportWidth={this.state.viewportSize.w}
          resizing={this.state.resizing}
          bgColor={bgColor}
          allPages={allPages}
        />

        {structure === "default" ? (
          <PageWithHeader
            title={title}
            description={description}
            gradient={gradient}
            children={this.props.children}
          />
        ) : structure === "default-left-aligned" ? (
          <PageWithHeaderLeftAligned
            title={title}
            description={description}
            gradient={gradient}
            children={this.props.children}
          />
        ) : (
          <PageJSX children={this.props.children} />
        )}

        <Footer
          hidePrevNextLinks={
            this.props.location.pathname !== "/404.html" ? true : false
          }
          prevPage={prevPage}
          nextPage={nextPage}
          prevLink={prevLink}
          nextLink={nextLink}
        />
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

export const layoutQuery = graphql`
  query layoutQuery {
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            description
            order
            path
            structure
            title
            headerGradient {
              light
              dark
            }
          }
        }
      }
    }
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`;
