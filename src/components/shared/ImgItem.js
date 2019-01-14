import React from "react";
import Img from "react-image";
import colors from "@ibmduo/colors";
import styled, { css } from "react-emotion";
import { breakpointsREM } from "../../globals";

const ImgCss = css`
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

const ImgContainerText = styled.div`
  padding-bottom: 0rem;
`;

const ImageCaptionStyle = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.01rem;
  padding-top: 0;
  margin-top: 0.75rem;
  margin-bottom: 0;
  line-height: 1.25rem;
  padding-right: 15%;
`;

const ImageTextBox = styled.p`
  margin: 0px;
  padding-right: 42%;

  a {
    text-decoration: none;
    color: #558ffc;
  }
`;

const TextBox = text => {
  return { __html: text };
};

const ImageCaption = ({ caption }) => {
  if (typeof caption !== "undefined" || caption !== "") {
    return <ImageCaptionStyle>{caption}</ImageCaptionStyle>;
  } else {
    return null;
  }
};

const ImgItem = ({ imgData }) => {
  if (typeof imgData.textBox === "undefined") {
    return (
      <ImgContainerText>
        <Img src={imgData.src} className={ImgCss} />
        <ImageCaption caption={imgData.caption} />
      </ImgContainerText>
    );
  } else {
    return <ImageTextBox dangerouslySetInnerHTML={TextBox(imgData.textBox)} />;
  }
};

export default ImgItem;
