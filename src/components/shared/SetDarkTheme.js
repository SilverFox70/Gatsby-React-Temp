// SetDarkTheme
//
// Render anywhere in your page to set the theme to dark

import React from "react";
import Helmet from "react-helmet";
import colors from "@ibmduo/colors";

const SetDarkTheme = () => {
  const isClient = typeof navigator !== "undefined";

  return (
    <Helmet
      htmlAttributes={{
        style: isClient
          ? `background-color: ${colors.gray[90]}`
          : { backgroundColor: colors.gray[90] }
      }}
      bodyAttributes={{
        style: isClient
          ? `background: ${colors.gray[90]}; color: ${colors.white[0]};`
          : { background: colors.gray[90], color: colors.white[0] }
      }}
    />
  );
};

export default SetDarkTheme;
