import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";
import Link from "gatsby-link";
import NavLink from "./NavLink";
import Subnav from "./Subnav";
import colors from "../../globals/colors";
import { breakpointsREM } from "../../globals";
import NavDimensions from "./NavDimensions";
import { convertHexToRGBA } from "../../utils";
import { transitionDefaults } from "../../globals";

const navLinkTriggerStyles = props => css`
  padding: 0.375rem ${NavDimensions.navSpacing}rem;
  margin: 0 -${NavDimensions.navSpacing}rem;
  width: 100%;
  display: inline-block;
  position: relative;
  color: ${props.currentPage ? `${colors.gray[100]} !important` : "inherit"};
  box-shadow: ${props.currentPage && props.currentPath === "/"
    ? `inset 4px 0 0 0 ${colors.red[0]}`
    : "none"};

  @media (min-width: ${breakpointsREM.lg}) {
    &:hover {
      color: ${colors.gray[100]};
      background: ${convertHexToRGBA(colors.gray[20], 0.6)};
    }
  }
`;
const DisabledLink = styled.a`
  color: ${colors.gray[30]} !important;
  display: block;
  height: 1.25rem;
  user-select: none;
  cursor: default;
`;

class NavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.currentPage
    };
  }

  toggle = e => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { page, currentPage, disabled, currentPath, className } = this.props;
    const { open } = this.state;

    return (
      <NavLink
        className={"ibm-type-b ibm-type-semibold"}
        page={page}
        currentPage={currentPage}
      >
        <Link
          to={page.path}
          className={navLinkTriggerStyles({
            currentPage: currentPage,
            currentPath: currentPath
          })}
        >
          {page.title}
        </Link>

        {page.sections.length > 0 && <Subnav page={page} open={currentPage} />}
      </NavLink>
    );
  }
}

NavItem.propTypes = {
  page: PropTypes.object,
  currentPage: PropTypes.bool
};

export default NavItem;
