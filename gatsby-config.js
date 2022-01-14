require('dotenv').config();
const googleCredentials = require('./credentials.json');

const siteUrl = 'https://opinionlibrary.com';
const description =
  'What do change.org users think about mask mandates? A website that allows to understand the language used to express different positions on the mask mandate issue in the United States';
module.exports = {
  // pathPrefix: '/opinion-library',
  siteMetadata: {
    title: 'Opinion Library',
    titleTemplate: '%s • Opinion Library',
    description,
    siteUrl, // No trailing slash allowed!
    image: '/ident-bumper.jpg', // Path to your image you placed in the 'static' folder
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: 'gatsby-source-google-spreadsheet',
      options: {
        spreadsheetId: process.env.COMMENTI_SPEADSHEET_ID,
        typePrefix: 'Sheets',
        credentials: googleCredentials,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.component\.svg$/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-Y66XEQ19XF', // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: 'OPT_CONTAINER_ID',
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          //  exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
  ],
};
