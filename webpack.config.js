
const regions = require('./data/regions.json')
const path = require('path')
const pack = n => path.resolve(`data/packed/${n}.json`)

const entries = Object.keys(regions)
  .concat('complete')
  .map(e => e.toLowerCase())
  .reduce((es, e) => es.concat(e, `recent/${e}`), [])

const entry = entries.reduce((es, e) => {
  return Object.assign({[e]: [pack(e)]}, es)
}, {core: [path.resolve('index.js')]})

module.exports = {
  context: __dirname,
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    library: 'zt'
  },
  entry: entry,
  module: {
    loaders: [
      {
        test: /core\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|core\.json$)/,
        loader: path.resolve('loader.js')
      }
    ]
  }
}
