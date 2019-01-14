import React from "react";
import styled, { css } from "react-emotion";

import { breakpointsREM } from "../globals";

import Hero from "../components/shared/Hero";
import navDimensions from "../components/navigation/NavDimensions";

const Container = styled.section`
  width: 100%;
`;

const WrapperContainer = styled.main`
  margin-bottom: 6rem;
  margin-top: ${navDimensions.triggerSize}rem;

  @media (min-width: ${breakpointsREM.lg}) {
    margin-bottom: 8rem;
    margin-top: 0;
  }
`;

const removePadding = css`
  p {
    padding-left: 0 !important;
  }
`;

const AnimatedLogo = () => {
  return <video src={watsonLogo} width="300" height="300" />;
};

export default ({ title, description, gradient, children }) => (
  <WrapperContainer>
    <Hero
      title={title}
      gradient={gradient}
      page="home"
      className={removePadding}
    />
    <Container>{children()}</Container>
  </WrapperContainer>
);
