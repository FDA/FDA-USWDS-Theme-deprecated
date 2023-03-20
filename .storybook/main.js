const path = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  "framework": "@storybook/html",
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.twig$/,
      use: [
        {
          loader: 'twigjs-loader'
        }
      ]
    });
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    return config;
  }
}
