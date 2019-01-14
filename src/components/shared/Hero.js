import React from "react";
import styled, { css } from "react-emotion";
import colors from "../../globals/colors";
import { breakpointsREM, transitionEase, zIndexConfig } from "../../globals";

const HeroContainer = styled("section")`
  width: 100vw;
  background-image: linear-gradient(
    230deg,
    ${props => props.gradient.dark},
    ${props => props.gradient.light}
  );
  position: relative;
  z-index: ${zIndexConfig.hero};
  padding-top: 1rem;

  @media (min-width: ${breakpointsREM.md}) {
    padding-right: 0;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    margin-left: -1rem;
    margin-right: 0;
  }

  @media (min-width: ${breakpointsREM.max}) {
    margin-left: -1.5rem;
  }
`;

const HeroContent = styled.div`
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 1;
  grid-row-end: 5;

  @media (min-width: ${breakpointsREM.md}) {
    grid-row-end: 5;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    grid-row-end: 9;
  }
`;

const Description = styled.p`
  color: ${colors.gray[10]};
  grid-column: 1 / -1;
  grid-row-start: 1;
  grid-row-end: 6;
  max-width: 35rem;

  @media (min-width: ${breakpointsREM.md}) {
    grid-column-start: 1;
    grid-column-end: -1;
    grid-row-start: 1;
    margin-top: 2rem;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    grid-column-start: 5;
    grid-column-end: -1;
    grid-row-end: 6;
    margin-top: 1.5rem;
  }
`;

const Title = styled.h1`
  color: ${colors.white[0]};
  grid-column: 1 / -1;
  grid-row-start: 6;
  grid-row-end: 5;
  align-self: end;
  margin-bottom: 0.5rem;

  @media (min-width: ${breakpointsREM.md}) {
    grid-row-start: 2;
    grid-row-end: 6;
    margin-bottom: 1rem;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    padding-left: 0;
    grid-column-start: 5;
    grid-column-end: 17;
    grid-row-end: 9;
  }
`;

const Hero = ({ title, description, gradient, page }) => {
  return (
    <div>
      <HeroContainer
        gradient={gradient || defaultGradient}
        className="ibm-container__bleed--md ibm-container__bleed--lg ibm-grid--fluid-rows"
      >
        <HeroContent className="ibm-grid ibm-grid--fluid-rows">
          <Title className="ibm-type-j ibm-padding">{title}</Title>

          {page !== "home" && (
            <Description className="ibm-type-e ibm-padding--horizontal">
              {description}
            </Description>
          )}
        </HeroContent>
      </HeroContainer>
    </div>
  );
};

export default Hero;
