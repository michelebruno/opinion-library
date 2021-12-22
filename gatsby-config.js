require('dotenv').config()
const googleCredentials = require('./credentials.json');

const siteUrl = 'https://michelebruno.github.io/opinion-library/'
const description = "What do change.org users think about mask mandates? A website that allows to understand the language used to express different positions on the mask mandate issue in the United States"
module.exports = {
    pathPrefix: '/opinion-library',
    siteMetadata: {
        title: 'Opinion Library',
        titleTemplate: '%s • Opinion Library',
        description,
        siteUrl, // No trailing slash allowed!
        image: '/ident-bumper.jpg', // Path to your image you placed in the 'static' folder
    },
    plugins: [
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
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /\.component\.svg$/ // See below to configure properly
                }
            }
        }
    ],
};
