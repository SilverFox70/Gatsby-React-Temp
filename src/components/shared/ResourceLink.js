import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";
import Link from "gatsby-link";
import colors from "@ibmduo/colors";

import {
  breakpointsREM,
  boxShadowBorder,
  transitionDefaults,
  zIndexConfig
} from "../../globals";
import { findColorInPalette, isGatsbyLink } from "../../utils";
import calculateHoverColor from "../../utils/calculateHoverColor";

export const Trigger = styled.a`
  background-color: ${colors.white[0]};
  box-shadow: ${props =>
    props.border ? `${boxShadowBorder[props.border]}` : "none"};
  color: ${props => props.font.color};
  display: block;
  grid-column: 1 / -1;
  grid-row: auto;
  height: 100%;
  text-decoration: none;
  transition: background-color ${transitionDefaults.duration},
    color ${transitionDefaults.duration};
  transition-timing-function: ${transitionDefaults.workingCurve};

  background: ${props =>
    props.background && props.background.image
      ? `url(${props.background.image})`
      : props.background && props.background.color
        ? props.background.color
        : colors.white[0]};
  background-size: cover;
  background-position: center;

  svg {
    fill: ${colors.blue[60]};
  }

  .resource-link-overlay {
    background: rgba(0, 0, 0, 0.2);
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    height: 100%;
    opacity: 0;
    transition: opacity ${transitionDefaults.duration}
      ${transitionDefaults.workingCurve};
    width: 100%;
    z-index: ${zIndexConfig.absoluteComponentLayer};
  }

  &:hover {
    color: ${props => props.font.rolloverColor};
    background: ${props =>
      props.background && props.background.image
        ? `url(${props.background.image})`
        : props.background.rolloverColor};
    background-size: cover;
    background-position: center;

    .resource-link-overlay {
      opacity: 1;
    }
  }
`;

const VectorBackground = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InternalTrigger = Trigger.withComponent(Link);

const DisabledTrigger = InternalTrigger.withComponent("a");

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: [tile-start] 3fr [tile-center] 1fr [tile-end];
  grid-template-rows: [tile-start] auto [tile-center] auto [tile-end];
  grid-template-areas: "top-left top-right" "bottom-left bottom-right";

  height: 100%;
  position: relative;
`;

const LabelContainer = styled.span`
  grid-area: top-left;
  margin-bottom: 0;
  z-index: ${zIndexConfig.absoluteComponentLayer};
`;
const Title = styled.p`
  margin: 0;
  padding-top: 0;
`;
const SubTitle = styled.p`
  margin: 0;
  padding-bottom: 0;
  padding-right: 0;
`;
const IconContainer = styled.div`
  display: grid;
  align-self: end;
  justify-self: end;
  grid-area: bottom-right;
  z-index: ${zIndexConfig.absoluteComponentLayer};
`;

const ImgContainer = styled.div`
  display: grid;
  align-self: end;
  grid-area: bottom-left;
  z-index: ${zIndexConfig.absoluteComponentLayer};
`;

class ResourceLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      over: false
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver() {
    this.setState({
      over: true
    });
  }

  onMouseOut() {
    this.setState({
      over: false
    });
  }

  getContent(background, header, headerLarge, subHeader, icons, className) {
    return (
      <ContentContainer className={className}>
        {background &&
          background.vector && (
            <VectorBackground>
              <background.vector />
            </VectorBackground>
          )}
        {background &&
          (background.image || (background.vector && !background.color)) && (
            <div className="resource-link-overlay" />
          )}
        <LabelContainer>
          {subHeader && (
            <SubTitle className="ibm-type-b ibm-padding">{subHeader}</SubTitle>
          )}
          {header && <Title className="ibm-type-e ibm-padding">{header}</Title>}
          {headerLarge && (
            <Title className="ibm-type-g ibm-padding">{headerLarge}</Title>
          )}
        </LabelContainer>
        {icons &&
          icons.identifier && (
            <ImgContainer className="ibm-padding">
              <icons.identifier />
            </ImgContainer>
          )}
        {icons &&
          icons.action && (
            <IconContainer className="ibm-padding">
              <icons.action />
            </IconContainer>
          )}
      </ContentContainer>
    );
  }

  render() {
    const {
      link,
      target,
      background,
      header,
      headerLarge,
      subHeader,
      icons,
      className,
      colorScheme,
      border
    } = this.props;
    const internal = isGatsbyLink(link);
    const fontColor =
      colorScheme === "light" ? colors.white[0] : colors.gray[90];
    let rolloverBackgroundColor =
      colorScheme === "light" ? colors.black[100] : colors.white[0];
    let rolloverFontColor = fontColor;
    if (background && background.color) {
      rolloverBackgroundColor = calculateHoverColor(background.color);
    } else {
      rolloverBackgroundColor = calculateHoverColor(colors.white[0]);
    }
    if (!link) {
      return (
        <DisabledTrigger
          className={className}
          border={border}
          font={{ color: fontColor, rolloverColor: rolloverFontColor }}
          background={{ ...background, rolloverColor: rolloverBackgroundColor }}
        >
          {this.getContent(background, header, headerLarge, subHeader, icons)}
        </DisabledTrigger>
      );
    }
    return internal ? (
      <InternalTrigger
        to={link}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        className={className}
        border={border}
        target={target ? target : "_self"}
        font={{ color: fontColor, rolloverColor: rolloverFontColor }}
        background={{ ...background, rolloverColor: rolloverBackgroundColor }}
      >
        {this.getContent(background, header, headerLarge, subHeader, icons)}
      </InternalTrigger>
    ) : (
      <Trigger
        href={link}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        className={className}
        target={target ? target : "_self"}
        font={{ color: fontColor, rolloverColor: rolloverFontColor }}
        background={{ ...background, rolloverColor: rolloverBackgroundColor }}
      >
        {this.getContent(background, header, headerLarge, subHeader, icons)}
      </Trigger>
    );
  }
}

ResourceLink.propTypes = {
  item: PropTypes.object
};

export default ResourceLink;
