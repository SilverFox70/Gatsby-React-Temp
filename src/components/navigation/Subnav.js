import React from "react";
import styled, { css } from "react-emotion";
import Link from "gatsby-link";
import { navigateTo } from "gatsby-link";
import colors from "../../globals/colors";
import { breakpoints, breakpointsREM } from "../../globals";

import NavLink from "./NavLink";
import NavDimensions from "./NavDimensions";
import { convertHexToRGBA } from "../../utils";
import { animateScroll, Events } from "react-scroll";

const SubnavEl = styled.ul`
  max-height: ${props =>
    props.open ? `${props.page.sections.length * 50 + 50}px` : 0};
  overflow: hidden;
  transition-property: max-height;
  transition-duration: 0.5s;
  transition-ease: ease-out;
  padding: 0;
  margin: 0 -${NavDimensions.navSpacing}rem;

  li {
    padding: 0 0 0 2rem;

    @media (min-width: ${breakpointsREM.lg}) {
      &:hover {
        color: ${colors.gray[100]};
        background: ${convertHexToRGBA(colors.gray[20], 0.6)};
      }
    }
  }

  li:last-child {
    margin-bottom: 0;
  }

  a {
    display: block;
    padding: 0.375rem 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: colors.gray[100];
`;

const navLinkTriggerStyles = props => css`
  padding: 0.375rem 0 0.375rem ${NavDimensions.navSpacing * 1.5}rem;
  margin: 0 -${NavDimensions.navSpacing}rem;
  width: 100%;
  display: inline-block;
`;

const SubNavLink = props => {
  const NavigateToSection = e => {
    e.preventDefault();

    const currentSection = document.querySelector(props.section);
    const sectionPos = currentSection.offsetTop;
    const mobileOffset = currentSection.firstElementChild.offsetHeight * 2 + 10;

    navigateTo(props.section);

    animateScroll.scrollTo(
      window.innerWidth < breakpoints.lg
        ? sectionPos - mobileOffset
        : sectionPos,
      {
        smooth: "easeInOutQuart",
        duration: 1000
      }
    );
  };

  return (
    <a href={props.page + props.section} onClick={NavigateToSection}>
      {props.title}
    </a>
  );
};

const Subnav = ({ page, open, currentPath }) => (
  <SubnavEl className="subnav" open={open} page={page}>
    {page.sections.map((section, index) => (
      <StyledNavLink open={open} className="ibm-type-b" key={`section${index}`}>
        <SubNavLink
          page={`${page.path}`}
          section={`#${section.link}`}
          title={`${section.title}`}
        />
      </StyledNavLink>
    ))}
  </SubnavEl>
);

export default Subnav;
