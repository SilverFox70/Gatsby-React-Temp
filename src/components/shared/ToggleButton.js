import React from "react";
import styled, { css } from "react-emotion";
import colors from "@ibmduo/colors";

const ToggleButton = styled.button`
  background-color: ${props =>
    props.checked ? colors.gray[100] : colors.white[0]};

  color: ${props => (props.checked ? colors.white[0] : colors.gray[100])};

  box-shadow: ${props => (props.boxShadow ? props.boxShadow : "none")};
  border: none;
  cursor: pointer;
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 1rem;
  padding-left: 1rem;
  min-width: 9rem;
  text-align: left;
  height: 3rem;

  input {
    margin: 0;
    visibility: hidden;
    width: 0;
  }

  &:hover {
    background-color: ${props =>
      props.checked ? colors.gray[80] : colors.gray[20]};
  }

  transition: background-color 0.3s, color 0.3s;
  transition-timing-function: cubic-bezier(0.2, 0.2, 0.38, 0.9);
`;

export default ToggleButton;
