import React from "react";
import styled from "react-emotion";

import { breakpointsREM } from "../globals";

import Hero from "../components/shared/Hero";
import navDimensions from "../components/navigation/NavDimensions";

const Container = styled.section`
  grid-column: span 4;

  @media (min-width: ${breakpointsREM.md}) {
    grid-column-start: 1;
    grid-column-end: 9;
  }
  @media (min-width: ${breakpointsREM.lg}) {
    grid-column-start: 5;
    grid-column-end: 17;
    margin-top: 0;
  }
  @media (min-width: ${breakpointsREM.xlg}) {
    grid-column-start: 5;
    grid-column-end: 17;
    margin-top: 0;
    max-width: 1400px;
  }
`;

const WrapperContainer = styled.main`
  margin-bottom: 6rem;
  margin-top: ${navDimensions.triggerSize}rem;

  @media (min-width: ${breakpointsREM.lg}) {
    margin-top: 0;
    margin-bottom: 8rem;
  }
`;

export default ({ title, description, gradient, children }) => (
  <WrapperContainer>
    <Hero title={title} description={description} gradient={gradient} />
    <div className="ibm-grid">
      <Container>{children()}</Container>
    </div>
  </WrapperContainer>
);
