console.log("Gatsby source folder: " + process.env.GATSBY_SOURCE_DIR);
module.exports = {
  siteMetadata: {
    title: "Watson Brand Guidelines"
  },
  plugins: [
    `gatsby-plugin-core-js`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src`,
        name: process.env.GATSBY_SOURCE_DIR || `pages`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-component",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1584,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-autolink-headers"
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Watson Brand Guidelines",
        short_name: "Watson",
        start_url: "/",
        background_color: "#F3F3F3",
        theme_color: "#0034CC",
        display: "standalone",
        icons: [
          {
            src: `favicon-192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `favicon-512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-next`
  ],
  proxy: {
    prefix: "/api",
    url: "http://localhost:7000"
  }
};
