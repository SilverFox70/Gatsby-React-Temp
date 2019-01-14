import React from "react";
import styled, { css } from "react-emotion";

import PaneTextBlock from "./PaneTextBlock";

const PaneBodyText = ({ body }) => {
  const BodyText = [
    ...Object.keys(body).map(key => {
      const paragraph = body[key].join(" ");
      return <p key={key}>{paragraph}</p>;
    })
  ];
  return BodyText;
};

const noMarginTop = css`
  h4 + p {
    margin-top: 0;
  }
`;

// props: {TabData, paneView, ExamplesContainer}
const PaneContentWithImages = props => {
  const headerText = props.TabData.header;
  const bodyText = props.TabData.body;
  const environment = props.TabData.environment;
  const ExamplesContainer = props.ExamplesContainer;
  const Examples = props.Examples;
  const ExampleData =
    props.Examples.name === "ImgSet" ? props.TabData.examples : props.TabData;

  if (bodyText) {
    return (
      <div className="ibm-padding--bottom">
        <PaneTextBlock
          className={`ibm-padding--horizontal ibm-type-c ${noMarginTop}`}
          paddingRight={props.paneTextBlockPadding}
        >
          <h4 className="ibm-type-d duo-no-margin--bottom">{headerText}</h4>
          <PaneBodyText body={bodyText} />
        </PaneTextBlock>
        <ExamplesContainer>
          <Examples ExampleData={ExampleData} />
        </ExamplesContainer>
      </div>
    );
  } else {
    return (
      <div>
        <ExamplesContainer>
          <Examples ExampleData={ExampleData} />
        </ExamplesContainer>
      </div>
    );
  }
};

export default PaneContentWithImages;
