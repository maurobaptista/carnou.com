module.exports = {
  siteMetadata: {
    title: `Carnou`,
    author: {
      name: `Mauro Baptista`,
      summary: `Always trying to go a little bit further!`
    },
    description: `A blog about development`,
    siteUrl: `https://blog.carnou.com/`,
    social: {
      twitter: `carnou`
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Carnou Blog`,
        short_name: `Carnou`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        //develop: true,
        tailwind: true,
        whitelist: ['whitelist'],
        ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'],
        purgeOnly: ['components/', '/main.css', 'bootstrap/'],
      }
    }
  ]
}
