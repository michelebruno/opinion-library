require('dotenv').config()
const googleCredentials = require('./credentials.json');

const siteUrl = 'https://dd-phase03.mbruno.it/'
const description = "An opinion library"
module.exports = {
    siteMetadata: {
        title: 'Opinion Library',
        titleTemplate: '%s • Opinion Library',
        description,
        siteUrl, // No trailing slash allowed!
        image: '/ident-bumper.jpg', // Path to your image you placed in the 'static' folder
    },
    plugins: [
        "gatsby-plugin-svgr",
        "gatsby-plugin-postcss",
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/favicon.png",
            },
        },
        "gatsby-plugin-mdx",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
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
    ],
};
