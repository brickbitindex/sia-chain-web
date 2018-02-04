var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

var routers = require('./routers.dev.json').routers;
var index = '/' + require('./routers.dev.json').index;

var entry = {};
routers.forEach((r) => {
  entry[r.name] = r.entry;
});
var plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  chunks: [r.name],
  inject: 'body'
}));
var rewrites = routers.map(r => ({
  from: new RegExp('\\/' + r.name),
  to: '/' + r.filename,
}));

var config = {
  context: path.join(__dirname, '..', '/src'),
  entry,
  output: {
    path: path.join(__dirname, '..', '/build'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production', // judge if dev environment.
    }),
    new ExtractTextPlugin("[name].css")
  ].concat(plugins),
  module: {
    perLoaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      },
      {
        test: /.reactx$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      ,
      {
        test: /.vue$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer?{browsers:["last 2 version", "> 1%"]}')
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!autoprefixer?{browsers:["last 2 version", "> 1%"]}!sass'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url?limit=10000!img?progressive=true'
      },
      {
        test: /\.data$/i,
        loader: 'url?limit=100'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'html?attrs[]=img:src',
      }
    ],
    noParse: []
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {}
  },
  devtool: 'eval-source-map',
  jshint: {
    "esnext": true
  },
  devServer: {
    inline: true,
    // host: '30.55.241.44',
    historyApiFallback: {
      index,
      rewrites,
    },
  },
  externals: {
    lodash: "_",
    jquery: "jQuery",
  },
};

module.exports = config;
