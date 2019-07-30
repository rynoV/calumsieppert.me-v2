const typographic = require('typographic')

module.exports = {
  siteMetadata: {
    title        : 'Calum Sieppert',
    description  : 'Personal website of freelance web developer Calum Sieppert',
    titleTemplate: '%s · Calum Sieppert',
    url          : 'https://www.calumsieppert.me/',
    siteUrl      : 'https://www.calumsieppert.me/',
    author       : 'Calum Sieppert',
    image        : 'https://www.calumsieppert.me/favicon.png',
  },
  plugins     : [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-stylus-resources',
      options: {
        use      : [typographic()],
        resources: [
          './src/styles/typographic.styl',
          './src/styles/mixins.styl',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /.*assets\/.*\.svg$/,
        },
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-plugin-tslint',
    'gatsby-plugin-react-axe',
    {
      resolve: 'gatsby-plugin-accessibilityjs',
      options: {
        injectStyles: `
        .accessibility-error {
          box-shadow: 0 0 3px 1px #f00;
          background-color: rgba(255, 0, 0, 0.25);
          position: relative;
        }
        .accessibility-error:before {
          content: "A11Y";
          position: absolute;
          top: 0;
          left: 0;
          color: #fff;
          font-size: 10px;
          background-color: rgba(255, 0, 0, 0.5);
          transform: translateY(-100%);
        }
      `,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color      : '#F98807',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name            : 'Calum Sieppert',
        short_name      : 'Calum Sieppert',
        start_url       : 'https://www.calumsieppert.me/',
        lang            : 'en',
        background_color: '#fff',
        theme_color     : '#111',
        display         : 'minimal-ui',
        icon            : 'static/favicon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-netlify',
  ],
}
