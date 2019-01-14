import React from "react";
import styled, { css } from "react-emotion";

import { breakpoints, breakpointsREM } from "../../globals";

const PaneTextBlock = styled.div`
  grid-column: span 2;
  padding-top: 2rem;

  @media (min-width: ${breakpointsREM.lg}) {
    padding-right: ${props => props.paddingRight || "50%"};
  }
`;

export default PaneTextBlock;
