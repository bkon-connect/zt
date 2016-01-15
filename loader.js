
const path = require('path')
const zt = path.resolve('index.js')

module.exports = function (content) {
  this.cacheable()
  return `var zt = module.exports = require('${zt}');zt.addTimeZoneData(${content})`
}
