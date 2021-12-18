require('dotenv').config()
const googleCredentials = require('./credentials.json');

module.exports = {
    siteMetadata: {
        siteUrl: "https://www.yourdomain.tld",
        title: "Phase 03",
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
                icon: "src/images/icon.png",
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
