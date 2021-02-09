const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './_entrypoints/main.js'
  },
  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: 'body'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets:  [
                [
                  '@babel/env', {
                    targets: {
                      browsers: [ 'last 2 versions', ]
                    }
                  }
                ],
                '@babel/react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
              ],
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.js' ],
    modules: [ path.resolve(__dirname, 'node_modules') ],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      styles: path.resolve(__dirname, 'src/styles/'),
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    port: 3000
  },
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
};

module.exports = webpackConfig;
