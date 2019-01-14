import React from "react";

import ElementPageResourceLinks from "./ElementPageResourceLinks";
import ResourceLink from "./ResourceLink";

import {
  AaIcon,
  AdobeIllustratorIcon,
  BoxIcon,
  GridishIcon,
  GitHubIcon,
  SketchIcon
} from "./../../media/icons";
import LaunchIcon from "@ibmduo/icons/svg/launch-20px.svg";
import DownloadIcon from "@ibmduo/icons/svg/download-20px.svg";

const getIcons = type => {
  let action, identifier;
  switch (type) {
    case "link":
      action = LaunchIcon;
      identifier = null;
      break;
    case "folder":
      action = LaunchIcon;
      identifier = BoxIcon;
      break;
    case "ai":
      action = DownloadIcon;
      identifier = AdobeIllustratorIcon;
      break;
    case "github":
      action = LaunchIcon;
      identifier = GitHubIcon;
      break;
    case "sketch":
      action = DownloadIcon;
      identifier = SketchIcon;
      break;
    case "type":
      action = DownloadIcon;
      identifier = AaIcon;
      break;
    case "grid":
      action = DownloadIcon;
      identifier = GridishIcon;
      break;
  }
  return {
    action,
    identifier
  };
};

const LinksFromCMS = links => {
  const mappedLinks = links.children.map((child, index) => {
    return (
      <ResourceLink
        subHeader={child.props.name}
        cta={child.props.cta}
        link={child.props.link}
        target="_blank"
        icons={getIcons(child.props.icon)}
        key={index}
      />
    );
  });
  return <ElementPageResourceLinks>{mappedLinks}</ElementPageResourceLinks>;
};

export default LinksFromCMS;
