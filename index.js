
var m = require('./lib/core.js')
var zt = m['default']

m.addTimeZoneData(require('./data/packed/core.json'))

if (typeof __webpack_require__ === 'undefined') {
  m.addTimeZoneData(require('./data/packed/complete.json'))
}

Object.keys(m).forEach(function (k) {
  zt[k] = m[k]
})
module.exports = exports = zt
