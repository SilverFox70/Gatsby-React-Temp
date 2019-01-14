import React from "react";
import styled, { css } from "react-emotion";
import colors from "@ibmduo/colors";

const ColorToggleButton = styled.button`
  background-color: ${props => props.backgroundColor || colors.white[0]};

  color: ${props => props.color || colors.gray[100]};

  box-shadow: ${props => (props.boxShadow ? props.boxShadow : "none")};
  border: none;
  cursor: pointer;
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: ${props => (props.narrowStyle ? "1rem" : "2rem")};
  padding-left: ${props => (props.narrowStyle ? "1rem" : "2rem")};
  height: 3rem;

  input {
    margin: 0;
    visibility: hidden;
    width: 0;
  }

  &:hover {
    background-color: ${props => props.bgColorOnHover || colors.gray[20]};
    color: ${props => props.colorOnHover || props.color};
  }

  transition: background-color 0.3s, color 0.3s;
  transition-timing-function: cubic-bezier(0.2, 0.2, 0.38, 0.9);
`;

export default ColorToggleButton;
