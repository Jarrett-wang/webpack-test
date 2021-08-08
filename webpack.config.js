const path = require('path');
const wc = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverConfig = require(`./config/servers/${process.env.SERVER_ENV}.config`);
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

module.exports = new wc.Config().extend(`./webpack.${env}.config.js`).merge({
  // entry: './src/index',
  devtool: 'source-map',
  entry: {
    main: './src/index',
  },
  mode: process.env.NODE_ENV,
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve('dist', serverConfig.buildPath),
    publicPath: (env === 'prod' ? serverConfig.SERVER_DOMAIN + '/' : ''),
  },
  target: 'web',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        }],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        include: path.resolve('./src'),
        use: [
          'style-loader',
          { loader: 'css-loader', options: { minimize: true } },
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
          // 'sass-loader',
          { loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  'primary-color': '#ff9052'
                }
              }
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve('./public/favicon.ico'),
      template: path.resolve('./public/index.html'),
      filename: 'index.html',
      inject: 'body',
      ENV: serverConfig,
    }),
  ],
});
