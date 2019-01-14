import React from "react";
import styled, { css } from "react-emotion";
import colors from "@ibmduo/colors";
import { breakpoints, breakpointsREM } from "../../globals";

const FullWidthImageContainer = styled.div`
  padding-bottom: 1rem;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const FullWidthImage = image => {
  return (
    <div>
      <FullWidthImageContainer className="ibm-padding">
        <img src={image} />
      </FullWidthImageContainer>
    </div>
  );
};

export default FullWidthImage;
