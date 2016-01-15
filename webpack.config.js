
const regions = require('./data/regions.json')
const path = require('path')
const pack = n => path.resolve(`data/packed/${n}.json`)

const entries = ['core'].concat(Object.keys(regions)
  .concat('complete')
  .map(e => e.toLowerCase())
  .reduce((es, e) => es.concat(e, `recent/${e}`), []))

const entry = entries.reduce((es, e) => {
  return Object.assign({[e]: [pack('core')].concat(e === 'core' ? [] : pack(e))}, es)
}, {})

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
        test: /\.json$/,
        exclude: /node_modules/,
        loader: path.resolve('loader.js')
      }
    ]
  }
}
