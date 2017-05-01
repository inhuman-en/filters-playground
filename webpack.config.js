let debug = process.env.NODE_ENV !== "production";
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
//ExtractTextPlugin is meant for production usage
//thus, emitted css DONT go in the output when build is run by WDS
//let extractCSS = new ExtractTextPlugin('/styles-vendor.css');
let extractSASS = new ExtractTextPlugin('/styles-build.css');

let path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug
    ? "inline-sourcemap"
    : null,
  entry: "./js/main.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react', 'es2015', 'stage-0'
          ],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
        }
      }, 
      // {
      //   test: /\.css$/,
      //   loader: extractCSS.extract("style-loader", "css-loader")
      // }, 
      {
        test: /\.scss$/,
        loader: extractSASS.extract("style-loader", "css-loader!sass-loader")
      }, {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  output: {
    path: __dirname + "/build/",
    filename: "scripts.min.js"
  },
  plugins: debug
    ? [extractSASS]
    : [
      extractSASS,
      new webpack
        .optimize
        .DedupePlugin(),
      new webpack
        .optimize
        .OccurenceOrderPlugin(),
      new webpack
        .optimize
        .UglifyJsPlugin({mangle: false, sourcemap: false})
    ],
  devServer: {
    host: "localhost",
    port: 9000,
    contentBase: __dirname + "/build"
  }
};