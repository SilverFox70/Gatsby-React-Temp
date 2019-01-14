import React from "react";
import ibmGrid from "!raw-loader!@ibmduo/grid/css/ibm-grid.css";
import ibmType from "!raw-loader!./globals/css/typestyle.css";

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    console.log(e);
  }
}

module.exports = class HTML extends React.Component {
  render() {
    console.log('ibmType:\n', ibmType);
    let css;
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      );
    }
    let typeStyles = (
      <style
        id="ibm-type-styles"
        dangerouslySetInnerHTML={{ __html: ibmType }}
      />
    );

    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/x-icon"
            sizes="16x16 32x32"
            href="/favicon.ico"
          />
          <link rel="icon" sizes="192x192" href="/favicon-192.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon-180-precomposed.png"
          />
          <style id="ibm-grid-styles">{ibmGrid}</style>
          {typeStyles}
          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
};
