import React from "react";
import styled, { css } from "react-emotion";
import colors from "@ibmduo/colors";

const PaneAreaBW = styled.div`
  color: ${props => (props.checked === 1 ? colors.white[0] : colors.gray[100])};
  background-color: ${props =>
    props.checked === 1 ? "#000000" : colors.white[0]};
`;

export default PaneAreaBW;
