require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// const prismicHtmlSerializer = require('./src/gatsby/htmlSerializer')

const config = require('./config')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

module.exports = {
  /* General Information */
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix, // For gatsby-plugin-sitemap
    pathPrefix,
    title: config.siteTitle,
    titleAlt: config.siteTitleAlt,
    description: config.siteDescription,
    banner: config.siteLogo,
    headline: config.siteHeadline,
    siteLanguage: config.siteLanguage,
    ogLanguage: config.ogLanguage,
    author: config.author,
    twitter: config.twitter,
    facebook: config.facebook,
  },
  /* Plugins */
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'marioproject',
        accessToken: `${process.env.API_KEY}`,
        // Get the correct URLs in blog posts
        linkResolver: () => post => `/${post.uid}`,
        // PrismJS highlighting for labels and slices
        //htmlSerializer: () => prismicHtmlSerializer,
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
        anonymize: true,
      },
    },
  ],
}
