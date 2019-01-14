// ElementPageResourceLinks
//
// A group of one or more ResourceLink components to render on an element page.
// Applies an aspect ratio to each ResourceLink
//
// Usage:
// <ElementPageResourceLinks>
//   <ResourceLink/>
//   <ResourceLink/>
//   ...
// </ElementPageResourceLinks>

import React from "react";
import styled from "react-emotion";
import colors from "@ibmduo/colors";

import { breakpointsREM } from "../../globals";
import calculateHoverColor from "../../utils/calculateHoverColor";

import AspectRatio from "./AspectRatio";

const Outer = styled.div`
  min-height: 164px;
  grid-column: span 4;
  grid-template-rows: auto;
  @media (min-width: ${breakpointsREM.md}) {
    grid-column: span 12;
  }
`;

const Item = styled.div`
  grid-column: span 4;

  a {
    border-color: ${colors.gray[10]};
    border-style: solid;
    border-width: 0;
  }

  // Add left border on every even element
  &:nth-child(even) {
    a {
      border-left-width: 1px;
    }
  }

  // Add top border from 3rd element and onwards
  &:nth-child(n + 3) {
    a {
      border-top-width: 1px;
    }
  }

  &:nth-child(even),
  &:nth-child(n + 3) {
    a {
      &:hover {
        border-color: ${props => props.borderHoverColor};
      }
    }
  }
`;

const ElementPageResourceLinks = ({ children }) => {
  const items = React.Children.map(children, item => {
    return (
      <Item borderHoverColor={calculateHoverColor(colors.white[0])}>
        <AspectRatio aspectRatio="1/2">{item}</AspectRatio>
      </Item>
    );
  });

  return (
    <div className="ibm-grid">
      <Outer className="ibm-grid">{items}</Outer>
    </div>
  );
};

export default ElementPageResourceLinks;
