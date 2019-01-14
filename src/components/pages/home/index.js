import React from "react";
import PropTypes from "prop-types";
import styled, { css, cx } from "react-emotion";
import colors from "../../../globals/colors";

import { breakpointsREM } from "../../../globals";
import Margin from "../../../components/shared/Margin";

const MainGrid = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-column: 1 / -1;
  grid-template-columns: repeat(1, 1fr);
  grid-template-areas:
    "intro-1"
    "intro-2"
    "video-player";

  @media (min-width: ${breakpointsREM.md}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "intro-1 intro-2"
      "intro-1 intro-2"
      "video-player video-player";
  }

  @media (min-width: ${breakpointsREM.lg}) {
    grid-column: 5 / -1;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "intro-1 intro-2 intro-2"
      "video-player video-player video-player";
  }
`;

const DescriptionLeft = styled.h3`
  grid-area: intro-1;

  @media (min-width: ${breakpointsREM.sm}) {
    margin-bottom: 1.5rem;
  }
`;

const DescriptionRight = styled.div`
  grid-area: intro-2;

  > div {
    grid-column: 1/-1;
  }

  p {
    font-weight: 300;
  }

  @media (min-width: ${breakpointsREM.max}) {
    > div {
      grid-column: 1/-2;
    }
  }
`;

const videoPlayerStyles = css`
  grid-column: 1/-1;
`;

const gridContainer = css`
  margin-top: 2.5rem;
  background-color: ${colors.gray[100]};
  margin-bottom: -6rem;

  @media (min-width: ${breakpointsREM.md}) {
    width: calc(100vw + 1rem);
  }

  @media (min-width: ${breakpointsREM.lg}) {
    margin-top: 4.7rem;
    margin-bottom: -8rem;
  }

  @media (min-width: ${breakpointsREM.max}) {
    width: calc(100vw + 1.5rem);
  }
`;

const gridSection = css`
  grid-column: 1/-1;

  @media (min-width: ${breakpointsREM.lg}) {
    grid-column: 5/-1;
  }
`;

const gridItems = css`
  display: grid;
  padding: 1rem;
  grid-row-gap: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;

  p:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${breakpointsREM.lg}) and (max-width: 77.5rem) {
    grid-column-gap: 7rem !important;
    padding-right: 0 !important;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    padding: 4.25rem 6.25rem 4.25rem 1rem;
    grid-column-gap: 10rem;
    grid-row-gap: 5rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const GridItem = props => {
  const gridItemStyles = css`
    &:first-child {
      h3 {
        font-size: 1.7rem;
        font-weight: normal;
        
        @media (min-width: ${breakpointsREM.lg}) {
          width: 10rem;
        }
      }
    }

    h3 {
      color: ${colors.white[0]};
    }

    p {
      color: ${colors.gray[30]};
    }

    h3,
    p {
      font-size: 20px;
      line-height: 1.3;
    }
  `;

  return (
    <div className={gridItemStyles}>
      <h3 className="ibm-type-semibold duo-subsection-margin duo-no-margin--top">
        {props.heading}
      </h3>
      <p className="duo-no-margin--top">{props.copy}</p>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <div className="ibm-grid">
        <MainGrid>
         This could be a generic template for Gatsby React type sites once the "other"
         code is stripped out. 
        </MainGrid>
      </div>
    </div>
  );
};

export default HomePage;
