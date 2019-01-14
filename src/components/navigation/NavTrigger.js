import React from "react";
import styled from "react-emotion";
import colors from "../../globals/colors";

import { transitionDefaults, breakpointsREM } from "../../globals";
import {
  convertHexToRGBA,
  findColorInPalette,
  calculateHoverColor
} from "../../utils";
import navDimensions from "./NavDimensions";

import Close20px from "@ibmduo/icons/svg/close-20px.svg";

const NavTrigger = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 0;
  width: ${navDimensions.triggerSize}rem;
  height: ${navDimensions.triggerSize}rem;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
`;

const IconContainer = styled.div`
  transition-property: opacity;
  transition-duration: ${props =>
    props.resizing ? "0s" : transitionDefaults.duration};
  transition-timing-function: ${transitionDefaults.workingCurve};
  transition-delay: ${props => (props.open ? "0s" : "0.2s")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition-property: fill;
    transition-duration: ${props =>
      props.resizing ? "0s" : transitionDefaults.duration};
    transition-timing-function: ${transitionDefaults.workingCurve};
  }
`;

const CloseContainer = styled(IconContainer)`
  opacity: ${props => (props.open ? 1 : 0)};
  transition-property: opacity;
  transition-duration: ${props =>
    props.resizing ? "0s" : transitionDefaults.duration};
  transition-timing-function: ${transitionDefaults.workingCurve};
  transition-delay: ${props => (props.open ? "0.1s" : "0s")};
  fill: black;
`;

const OpenContainer = styled(IconContainer)`
  opacity: ${props => (props.open ? 0 : 1)};
  fill: black;
`;

export default ({
  ariaLabel,
  onClick,
  open,
  className,
  navSection,
  section,
  children,
  resizing,
  colorScheme
}) => {
  return (
    <NavTrigger
      aria-label={ariaLabel}
      onClick={onClick ? () => onClick(section) : false}
      open={open}
      className={className}
      resizing={resizing}
      colorScheme={colorScheme}
    >
      <OpenContainer open={open} colorScheme={colorScheme}>
        {children}
      </OpenContainer>

      <CloseContainer
        open={open}
        navSection={navSection}
        section={section}
        colorScheme={colorScheme}
      >
        <Close20px />
      </CloseContainer>
    </NavTrigger>
  );
};
