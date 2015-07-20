var webpack = require('webpack');
var path = require('path');

module.exports = {
  resolve: {
    root: [
      __dirname
    ],
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    modulesDirectories: [
      path.join(__dirname, 'node_modules')
    ]
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'jsx-loader?insertPragma=React.DOM'
    }, {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  entry: ['test'],
  output: {
    path: path.join(__dirname, '../client/components'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ]
};
