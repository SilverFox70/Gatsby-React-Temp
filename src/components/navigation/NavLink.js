import React from "react";
import styled, { css } from "react-emotion";
import colors from "../../globals/colors";

import NavDimensions from "./NavDimensions";

const List = styled.li`
  position: relative;
  margin-bottom: 0;
  max-width: 100%;
  padding: 0 ${NavDimensions.navSpacing}rem;
  color: ${props =>
    props.colorTheme === "dark"
      ? props.currentPage
        ? colors.gray[10]
        : colors.gray[30]
      : props.currentPage
        ? colors.gray[100]
        : colors.gray[70]};

  &.is-selected {
    color: ${colors.gray[100]};
    box-shadow: inset 4px 0 0 0 ${colors.red[0]};
  }
`;

const NavLink = ({
  className,
  children,
  open,
  index,
  currentPage,
  currentPath
}) => <List className={className}>{children}</List>;

export default NavLink;
