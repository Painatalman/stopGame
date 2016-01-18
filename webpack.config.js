// for a production run, do
// $ NODE_ENV=production webpack

var
  path = require('path'),
  debug = process.env.NODE_ENV !== "production",
  webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  debug: true,
  entry: [
    // 'webpack/hot/dev-server',
    './src/main.js',
  ],
  output: {
    path: __dirname + "/public/javascripts",
    filename: 'bundle.js' },
    plugins: debug ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false
      })
    ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      // SASS
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }
    ]
  },
};
