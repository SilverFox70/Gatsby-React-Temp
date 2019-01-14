import React from "react";
import styled, { css } from "react-emotion";
import { breakpoints, breakpointsREM } from "../../globals";

const PaneContainer = styled.div`
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
`;

export default PaneContainer;
