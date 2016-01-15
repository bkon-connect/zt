
var m = require('./lib/core.js')
var zt = m['default']

if (typeof __webpack_require__ === 'undefined') {
  m.addTimeZoneData(require('./data/packed/latest.json'))
}

Object.keys(m).forEach(function (k) {
  zt[k] = m[k]
})
module.exports = exports = zt
