
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '..'),
  output: {
    path: path.resolve('tmp'),
    filename: 'test.js'
  },
  entry: require.resolve('./browser.js'),
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
