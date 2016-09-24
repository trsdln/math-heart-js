var path = require('path');

var isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/main.js',
  devtool: isDevelopment ? 'inline-sourcemap' : null,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
        }
      }
    ]
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};