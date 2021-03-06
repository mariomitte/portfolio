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
    'gatsby-plugin-catch-links',
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteShortName,
        lang: 'en-GB',
        description: config.siteDescription,
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    'gatsby-plugin-netlify-cache',

  ],
}
