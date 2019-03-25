require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// const prismicLinkResolver = require('./src/gatsby/linkResolver')

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
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        // Get the correct URLs in blog posts
        linkResolver: ({ node, key, value }) => doc => {

          const prefix = `${doc.uid}`

          if (doc.type === 'post') return `/blog/${doc.uid}`
          if (doc.type === 'projects') return `/projects/${doc.uid}`

          return `${prefix}`
        },
        // PrismJS highlighting for labels and slices
        //htmlSerializer: () => prismicHtmlSerializer,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
        anonymize: true,
      },
    },
  ],
}
