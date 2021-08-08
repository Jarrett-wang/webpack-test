const wc = require('webpack-config');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const serverConfig = require(`./config/servers/${process.env.SERVER_ENV}.config`);

module.exports = new wc.Config().merge({
  devtool: 'cheap-module-source-map',
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER: JSON.stringify(serverConfig),
    }),
    new ManifestPlugin({
      generate: (seed, files) => {
        const scripts = [];
        files.forEach(({ name, path }) => {
          if (/\.js$/.test(name) && /(main|appconf)/.test(name)) {
            scripts.push(path);
          }
        });
        return { scripts };
      },
    }),
  ],
});
