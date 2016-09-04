var isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './js/main.js',
  devtool: isDevelopment ? 'inline-sourcemap' : null,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties']
        }
      }
    ]
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};
