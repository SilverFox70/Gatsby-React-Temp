import styled, { css } from "react-emotion";
import React from "react";
import colors from "@ibmduo/colors";

import { breakpointsREM } from "../../globals";
import ImgItem from "./ImgItem";

const ImgSet = ({ ExampleData }) => {
  const Images = [
    ...Object.keys(ExampleData).map((key, index) => {
      return (
        <div
          className="ibm-padding--top ibm-padding--horizontal ibm-padding--bottom"
          key={"img_" + key + index}
        >
          <ImgItem imgData={ExampleData[key]} />
        </div>
      );
    })
  ];

  return Images;
};

export default ImgSet;
