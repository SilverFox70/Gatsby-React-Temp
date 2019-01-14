import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";
import Link from "gatsby-link";
import { throttle } from "lodash";
import colors from "../../globals/colors";
import Menu20px from "@ibmduo/icons/svg/menu-20px.svg";

import {
  zIndexConfig,
  breakpoints,
  breakpointsREM,
  transitionDefaults
} from "../../globals";
import { convertHexToRGBA } from "../../utils";

import Nav from "./Nav";
import NavTrigger from "./NavTrigger";
import navDimensions from "./NavDimensions";

const NavGrid = styled.div`
  position: relative;

  &:hover {
    .nav-background-container {
      background: ${colors.white[0]};
    }
  }
`;

const NavContainer = styled.div`
  position: fixed !important;
  z-index: ${zIndexConfig.nav};
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  left: 0;
  pointer-events: ${props => (props.navOpen ? "auto" : "none")};
  transition-property: background-color;
  transition-duration: ${props =>
      props.resizing ? "0s" : transitionDefaults.duration},
    0.1s;
  transition-timing-function: ${transitionDefaults.workingCurve};
  top: 0 !important;
  background-color: ${props =>
    props.navOpen ? convertHexToRGBA(colors.black[100], 0.4) : "none"};

  @media (min-width: ${breakpointsREM.lg}) {
    left: 0;
    top: ${navDimensions.navSpacing + navDimensions.triggerSize}rem;
    width: ${navDimensions.navWidth.lg}rem;
    background-color: transparent;
  }
`;

const TriggerContainer = styled.div`
  position: fixed !important;
  z-index: ${zIndexConfig.navTrigger};
  width: 100vw;
  height: ${navDimensions.triggerSize}rem;
  background: ${colors.white[0]};
  padding: 0;
  top: 0;
  left: 0;
  box-shadow: 0px 1px 1px 1px ${convertHexToRGBA(colors.gray[100], 0.16)};

  @media (min-width: ${breakpointsREM.lg}) {
    display: none;
  }
`;

const TriggerContent = styled.div`
  position: relative;
`;

const TriggerLabelMobile = styled.p`
  display: block;
  font-size: 1.1rem;
  font-weight: normal;
  padding: 0;
  margin: 0;
  height: 3rem;
  position: absolute;
  left: 4rem;
  top: 0.8rem;
  color: ${colors.gray[90]};
  line-height: 1.3;

  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    display: none;
  }
`;

class NavWithTrigger extends React.Component {
  state = {
    navOpen: false,
    toggleSetToOpen: false
  };

  componentDidMount() {
    this.setState({
      navOpen: window.innerWidth > breakpoints.lg ? true : false
    });
  }

  componentDidUpdate(prevProps) {
    const onMobile = window.innerWidth < breakpoints.lg ? true : false;
    // If on mobile and we are not trying to open nav
    // intentionally, close it
    if (onMobile && this.state.navOpen && !this.state.toggleSetToOpen) {
      this.setState({
        navOpen: false
      });
    }

    // Close the nav on small after navigation.
    if (
      (prevProps.section !== this.props.section ||
        prevProps.pathname !== this.props.pathname) &&
      onMobile
    ) {
      this.setState({
        navOpen: false,
        toggleSetToOpen: false
      });
      // If we are not on mobile, make sure nav is open
    } else if (!onMobile && !this.state.navOpen) {
      this.setState({
        navOpen: true
      });
    }
  }

  toggleOpen = () => {
    this.setState({
      navOpen: !this.state.navOpen,
      toggleSetToOpen: !this.state.toggleSetToOpen
    });
  };

  render() {
    const { pathname, allPages, viewportWidth, resizing } = this.props;
    const currentPage = allPages
      .filter(page => {
        return page.path === pathname;
      })
      .reduce((acc, value) => {
        acc = value;
      });

    const colorScheme =
      currentPage &&
      currentPage.colorScheme &&
      currentPage.colorScheme === "dark"
        ? "dark"
        : "light";
    const { navOpen } = this.state;

    return (
      <NavGrid>
        <NavContainer navOpen={navOpen}>
          <Nav
            current={pathname}
            pages={allPages}
            viewportWidth={viewportWidth}
            resizing={resizing}
            navOpen={navOpen}
          />
        </NavContainer>
        <TriggerContainer>
          <TriggerContent>
            <NavTrigger
              ariaLabel="Menu"
              onClick={this.toggleOpen}
              open={navOpen}
              top={0}
              colorScheme={colorScheme}
              viewportWidth={viewportWidth}
              resizing={resizing}
            >
              <Menu20px />
            </NavTrigger>

            <TriggerLabelMobile className="ibm-type-b ibm-type-semibold">
              <Link to="/">
                Gatsby React Site
              </Link>
            </TriggerLabelMobile>
          </TriggerContent>
        </TriggerContainer>
      </NavGrid>
    );
  }
}

NavWithTrigger.propTypes = {
  pathname: PropTypes.string, //this.props.location.pathname
  viewportWidth: PropTypes.number,
  resizing: PropTypes.bool,
  allPages: PropTypes.array
};

export default NavWithTrigger;
