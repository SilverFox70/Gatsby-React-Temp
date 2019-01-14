import React from "react";
import styled, { css } from "react-emotion";
import Link from "gatsby-link";
import colors from "../globals/colors";

import { transitionDefaults, breakpointsREM, linksDirectory } from "../globals";

const FooterEl = styled.footer`
  width: 100vw;
  overflow: hidden;
  margin-bottom: 0;
`;

const SectionLinks = styled.div`
  background-color: ${colors.gray[80]};

  @media (min-width: ${breakpointsREM.md}) {
    margin-left: -1rem;
    margin-right: 0;
    padding-right: 0;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    margin-left: -1.5rem;
  }
`;

const buttonStyle = props =>
  css`
    background-color: ${colors.gray[80]};
    border: none;
    color: ${colors.white[0]};
    cursor: ${props.active ? "pointer" : "default"};
    grid-column: span 4;
    height: 8rem;
    padding: 0;
    pointer-events: ${props.active ? "default" : "none"};
    text-decoration: none;
    margin-left: 0;
    transition: background-color ${transitionDefaults.duration}
      ${transitionDefaults.workingCurve};
    display: ${props.active ? "block" : "none"};

    @media (min-width: ${breakpointsREM.md}) {
      display: block;
    }

    @media (min-width: ${breakpointsREM.lg}) {
      grid-column: ${props.left ? "5 / span 6" : "span 6"};
    }

    &:hover {
      background-color: ${props.active ? colors.gray[90] : colors.gray[80]};
    }
  `;

const Button = styled("Link")`
  ${buttonStyle};
`;

const ButtonContent = styled.div`
  display: block;
  height: 100%;
  text-align: left;
  box-sizing: border-box;
`;

const ExternalLinks = styled.div`
  background-color: ${colors.gray[90]};
  color: ${colors.white[0]};
  grid-auto-rows: auto;
  grid-column: 1 / -1;
  height: 40vw;
  margin-bottom: 3rem;
  padding: 1rem 0 0 0;

  @media (min-width: ${breakpointsREM.sm}) {
    align-items: center;
    height: unset;
    margin-bottom: unset;
    padding: 1rem 0 1rem 0;
  }

  @media (min-width: ${breakpointsREM.md}) {
    width: calc(100vw + 1.5rem);
    margin-left: -1.5rem;
    padding: 1rem 1.5rem 2rem 1.5rem;
  }
`;

const GroupLinks = styled.div`
  color: ${colors.gray[40]};
  grid-column: 1 / -1;
  padding-bottom: 1rem;

  @media (min-width: ${breakpointsREM.md}) {
    padding-bottom: 0;
    grid-column: span 4;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    grid-column: ${props => (props.left ? "5 / span 6" : "span 6")};
  }
`;

const GroupLinksBottomAligned = styled(GroupLinks)`
  display: flex;
  align-items: flex-end;
  height: 100%;
  padding-bottom: 0;
  @media (min-width: ${breakpointsREM.sm}) {
    display: unset;
    align-items: unset;
  }
`;

const ExternalLink = styled.a`
  color: ${colors.gray[40]};
  margin-left: 1rem;
  text-decoration: none;
  transition: color 0.1s ${transitionDefaults.workingCurve};

  &:hover {
    color: ${colors.gray[20]};
  }
  &:first-of-type {
    margin-left: 0;
  }

  @media (min-width: ${breakpointsREM.md}) {
    margin-left: 1.5rem;
  }
`;

const CopyrightText = styled.p`
  margin-bottom: 1rem !important;

  @media (min-width: ${breakpointsREM.sm}) {
    margin-bottom: 0 !important;
  }
`;

const getButton = (type, title) => (
  <ButtonContent className="ibm-padding">
    <span className="ibm-type-b">{type}</span>
    <p className="ibm-type-e">{title}</p>
  </ButtonContent>
);

const Footer = ({
  prevPage,
  prevLink,
  nextPage,
  nextLink,
  hidePrevNextLinks
}) => (
  <FooterEl>
    {hidePrevNextLinks && (
      <SectionLinks className="ibm-grid ibm-container__bleed--md ibm-container__bleed--lg">
        <Link
          className={`${buttonStyle({
            active: prevPage !== "",
            left: true
          })} ibm-container__bleed--md--left ibm-container__bleed--lg--left`}
          to={prevLink}
        >
          {prevPage !== ""
            ? getButton("Previous", prevPage === "Welcome" ? "Home" : prevPage)
            : ""}
        </Link>
        <Link
          className={`${buttonStyle({
            active: nextPage !== ""
          })} ibm-container__bleed--md--right ibm-container__bleed--lg--right`}
          to={nextLink}
        >
          {nextPage !== "" ? getButton("Next", nextPage) : ""}
        </Link>
      </SectionLinks>
    )}
    <ExternalLinks className="ibm-grid ibm-container__bleed--md ibm-container__bleed--lg">
    </ExternalLinks>
  </FooterEl>
);

export default Footer;
