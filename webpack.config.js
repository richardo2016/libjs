/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'ray';

let plugins = [], outputFile, suffix = '.js';

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  suffix = '.min' + suffix;
}

outputFile = libraryName + suffix;

function resolve (_path) {
  return path.resolve(__dirname, _path)
}

const config = {
  entry: {
    'ray': __dirname + '/src/index.js',
    browser: __dirname + '/src/browser/index.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name]' + suffix,
    // filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        include: [path.resolve('./src')],
        exclude: /(node_modules\/(?!(ray-js)\/).*|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        include: [path.resolve('./src')],
        exclude: /node_modules\/(?!(ray-js)\/).*/
      }
    ]
  },
  resolve: {
    modules: [resolve('./src'), resolve('./node_modules')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
