import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import styled from "react-emotion";
import colors from "../../globals/colors";
import NavItem from "./NavItem";
import NavTrigger from "./NavTrigger";
import navDimensions from "./NavDimensions";

import {
  transitionDefaults,
  breakpointsREM,
  excludeFromNav
} from "../../globals";
import { convertHexToRGBA } from "../../utils";

const NavMask = styled.div`
  overflow: hidden;
  width: 100vw;

  @media (min-width: ${breakpointsREM.lg}) {
    width: ${navDimensions.navWidth.lg}rem;
  }
`;

const BackgroundContainer = styled.div`
  background-color: ${convertHexToRGBA(colors.white[0], 1)};
  transition: transform 0.3s cubic-bezier(0.2, 0.2, 0.38, 0.9);
  transform: translateY(${props => (props.open ? "0" : "-100vh")});
  height: calc(100vh - 3rem);
  padding-top: 3rem;

  @media (min-width: ${breakpointsREM.lg}) {
    padding: 0;
    transform: none;
    height: 100vh;
  }
`;

const NavEl = styled.nav`
  height: calc(100vh - 4rem);
  overflow-y: auto;
  padding: 1rem 0 0;

  @media (min-width: ${breakpointsREM.lg}) {
    height: calc(100vh - 8rem);
    padding: 8rem 0 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  .white {
    background: ${colors.white[0]};
  }
`;

const MenuContainer = styled.div`
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: auto
  display: block;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${breakpointsREM.md}) {
    height: auto;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    display: block;
  }
`;

const Menu = styled("ul")`
  padding: 0;
  overflow: hidden;
  margin: 0;
`;

const MenuDynamic = styled(Menu)`
  /**
  TODO: Solve for the issue of viewport
  size change as explained here goo.gl/uLvGy7
  */
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.gray[20]};
  margin: 1.5rem 1rem 1rem;
`;

const TriggerLabel = styled.p`
  display: none;

  @media (min-width: ${breakpointsREM.lg}) {
    display: block;
    font-size: 1.25rem;
    font-weight: normal;
    margin: 0;
    padding: 2.7rem 2rem 1rem 1rem;
    width: calc(100%);
    box-sizing: border-box;
    z-index: 3;
    position: absolute;
    left: 0;
    top: 0;
    color: ${colors.gray[90]};
    line-height: 1.3;
    background: #fff;
  }
`;

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  slugToTitle = slug => {
    return slug
      .split("-")
      .map(
        segment =>
          segment.match(/\b[a-z]/, "g")[0].toUpperCase() + segment.slice(1)
      )
      .join(" ");
  };

  shouldBeExcluded = slug => {
    return excludeFromNav.includes(slug);
  };

  getLinks = (type, current) => {
    const sections = this.props.pages.reduce((navItems, page) => {
      if (this.shouldBeExcluded(page.path)) {
        return navItems;
      }
      const path = page.path.split("/").filter(val => val !== "");

      /** Only takes in consideration two levels: root and under a section
       *  No URL should have a third level
       */
      const firstSlug = path[0];
      if (path.length === 1) {
        // Root pages
        navItems[firstSlug] = page;
      } else if (path.length === 2) {
        // Pages in a section or category
        navItems[firstSlug] = navItems[firstSlug] || {};
        navItems[firstSlug].title = this.slugToTitle(firstSlug);
        if (!navItems[firstSlug].pages) {
          navItems[firstSlug].pages = [];
        }
        navItems[firstSlug].pages.push(page);
      }
      return navItems;
    }, {});
    return Object.keys(sections)
      .map(key => {
        // Add order property to section based on the lowest order of the sub pages
        const section = sections[key];
        if (!section.order && section.pages) {
          section.order = section.pages.reduce(
            (prev, next) => ({ order: Math.min(prev.order, next.order) }),
            { order: Infinity }
          ).order;
        }
        return key;
      })
      .sort((a, b) => {
        return sections[a].order - sections[b].order;
      })
      .map((sectionPath, index) => {
        const currentPath = current.path
          .split("/")
          .filter(val => val !== "")[0];
        const section = sections[sectionPath];
        if (section.pages && section.pages.length > 0) {
          section.pages = section.pages.sort((a, b) => {
            return a.order - b.order;
          });
        }
        return (
          <NavItem
            page={section}
            currentPage={sectionPath === currentPath}
            currentPath={current.path}
            key={index}
            disabled={section.disabled}
          />
        );
      });
  };

  render() {
    const current = this.props.pages.filter(
      x => x.path === this.props.current
    )[0];

    const location = `${
      current.title === ""
        ? "Gatsby React Site"
        : "Gatsby React Site | "
    }${current.title}`;

    return (
      <NavMask open={this.props.navOpen}>
        <BackgroundContainer
          open={this.props.navOpen}
          viewportWidth={this.props.viewportWidth}
          resizing={this.props.resizing}
          className="nav-background-container"
        >
          <NavEl
            open={this.props.navOpen}
            viewportWidth={this.props.viewportWidth}
            resizing={this.props.resizing}
          >
            <Helmet title={location} />
            <MenuContainer>
              <TriggerLabel
                fontColor={this.props.fontColor}
                className="ibm-type-b ibm-type-semibold"
              >
                <Link to="/">
                  <strong>Gatsby</strong> <br /> React Site
                </Link>
              </TriggerLabel>

              <MenuDynamic show={true} type="docs" staticItemCount={0}>
                <NavItem
                  page={{
                    path: "/",
                    order: 0,
                    title: "Home",
                    sections: []
                  }}
                  currentPage={this.props.current === "/" ? true : false}
                  currentPath={this.props.current}
                  key="external0"
                  disabled={false}
                />

                {this.getLinks("docs", current)}
              </MenuDynamic>
            </MenuContainer>
          </NavEl>
        </BackgroundContainer>
      </NavMask>
    );
  }
}

Nav.propTypes = {
  resizing: PropTypes.bool,
  current: PropTypes.string,
  pages: PropTypes.array,
  viewportWidth: PropTypes.number,
  resizing: PropTypes.bool
};

export default Nav;
