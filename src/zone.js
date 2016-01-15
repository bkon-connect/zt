
import unpack from './unpack.js'

export default class Zone {
  constructor (zone) {
    if (typeof zone === 'string') this._set(unpack(zone))
    if (typeof zone === 'object') this._set(zone)
  }

  _set (unpacked) {
    this.name = unpacked.name
    this.abbrs = unpacked.abbrs
    this.untils = unpacked.untils
    this.offsets = unpacked.offsets
    this.link = unpacked.link
    this.untils[this.untils.length - 1] = Infinity
  }

  _index (timestamp) {
    const target = +timestamp
    for (let i = 0; i < this.untils.length; i++) {
      if (this.untils[i] > target) return i
    }
  }

  abbr (timestamp) {
    return this.abbrs[this._index(timestamp)]
  }

  offset (timestamp, local = false, opts = {}) {
    if (!local) return this.offsets[this._index(timestamp)]
    const target = +timestamp
    const max = this.untils.length - 1
    for (let i = 0; i < max; i++) {
      let curr = this.offsets[i]
      let next = this.offsets[i + 1]
      let prev = this.offsets[i ? i - 1 : i]
      if (curr < next && opts.moveAmbiguousForward) {
        curr = next
      } else if (curr > prev && opts.moveInvalidForward) {
        curr = prev
      }
      if (target < this.untils[i] - (curr * 6e4)) return this.offsets[i] * -1
    }
    return this.offsets[max] * -1
  }

  dst (timestamp) {
    const date = new Date(timestamp)
    const offset = this.offset(timestamp)
    return offset < this.offset(date.setUTCMonth(0)) ||
      offset < this.offset(date.setUTCMonth(5))
  }
}
