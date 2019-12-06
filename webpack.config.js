const webpack = require('webpack');
const path = require('path');
const html = require('html-webpack-plugin');

const config = {
  entry: './demo/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/demo'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|woff|ttf|eot)/,
        loader: 'url-loader?limit=20480&name=static/[name].[ext]',
      },
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  plugins: [
    new html()
  ]
}

module.exports = config;
