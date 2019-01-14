import colors from "colors";

// animation
export const transitionDefaults = {
  duration: "0.3s",
  delay: 0,
  timingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
  shortHand: "0.3s cubic-bezier(0.77, 0, 0.175, 1)",
  celebratoryCurve: "cubic-bezier(0.4, 0.14, 0.3, 1)",
  workingCurve: "cubic-bezier(0.2, 0.2, 0.38, 0.9)"
};
export const hoverTransitionTime = ".3s";
export const transitionEase = "cubic-bezier(0.77, 0, 0.175, 1)";

export const breakpoints = {
  sm: 600,
  md: 900,
  lg: 1200,
  xlg: 1800
};

//37.5 56.25 75 112.5
export const breakpointsREM = {
  sm: "38rem",
  md: "56rem",
  lg: "75rem",
  xlg: "113rem",
};

/** z-index management (ideally all components thant need z-index would be listed here)
 * Use absoluteComponentLayer to position absolute elements inside components
 **/
export const zIndexConfig = {
  navTrigger: 13,
  nav: 12,
  navContainer: 11,
  hero: 11,
  scrollToTop: 10,
  dropdownMenu: 9,
  videoPlayerPlayPauseButton: 6,
  absoluteComponentLayer: 1, //Reserve 1 to 5 to allow components to layer freely in this range when needed
};

export const boxShadowBorder = {
  top: `inset 0 1px 0 0 ${colors.gray[10]}`,
  right: `inset -1px 0 0 0 ${colors.gray[10]}`,
  bottom: `inset 0 -1px 0 0 ${colors.gray[10]}`,
  left: `inset 1px 0 0 0 ${colors.gray[10]}`,
  full: `inset 0 0 0 1px ${colors.gray[10]}`
};

export const excludeFromNav = ["/dev-404-page/", "/404.html"];

// List of all external links used in the site
export const linksDirectory = {

};
