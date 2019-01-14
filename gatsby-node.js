const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const select = require(`unist-util-select`);
const fs = require(`fs-extra`);

exports.modifyWebpackConfig = ({ config, env }) => {
  // Remove svg from url-loader config
  config.loader("url-loader", {
    test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    loader: "url-loader",
    query: {
      limit: 10000,
      name: `static/[name].[hash:8].[ext]`
    }
  });

  // Adds a SVG to React loader. Using this over the gatsby plugin since we need to use a fork of svg-react-loader to fix issue with -- in names
  config.loader("svg-react-loader", {
    test: /\.svg$/,
    loader: "svg-react-loader"
  });

  // This fixes an issue with webpack where packages with dependencies on fs can not find it even if it is installed
  config.merge({
    node: {
      fs: "empty"
    }
  });

  return config;
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const pages = [];
    const markdownPage = path.resolve("./src/templates/markdown-page.js");
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create markdown pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          createPage({
            path: edge.node.frontmatter.path,
            component: markdownPage
          });
        });
      })
    );
  });
};
