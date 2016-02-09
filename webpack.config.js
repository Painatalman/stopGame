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
    './src/main.jsx',
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
      // {
      //   test: /\.css$/,
      //   loader: "style!css"
      // },
      // SASS
    {
      test: /\.s?css$/,
      loader: 'style!css!sass'
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    },
    {
      test: /\.woff$/,
      loader: 'url?limit=100000'
    }
    ]
  },
};
