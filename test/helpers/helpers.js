
import assert from 'assert'
import zt, {addTimeZoneData, offset as ztOffset, abbr as ztAbbr} from '../../src/core.js'

addTimeZoneData(require('../../data/packed/complete.json'))

export const makeTestYear = (name, expected) => () => testYear(name, expected)
export const makeTestGuess = () => false

const pad = n => (n < 10 ? '0' : '') + n
const ucf = s => s.replace(/^./, m => m.toUpperCase())
const fmt = (d, s) => pad(d['getUTC' + ucf(s)]())
const rnd = f => Math.round(f * 1e4) / 1e4

function testYear (name, expected) {
  expected.forEach(e => {
    const [date, time, abbr, offset] = e
    const ts = new Date(date).getTime()
    const tz = zt(ts, name)
    const d = new Date(tz)
    const t = [fmt(d, 'hours'), fmt(d, 'minutes'), fmt(d, 'seconds')].join(':')
    assert.equal(t, time, date + ' should be ' + time + ' ' + abbr)
    assert.equal(rnd(ztOffset(ts, name)), rnd(-offset), date + ' should be ' + offset + ' minutes offset in ' + abbr)
    assert.equal(ztAbbr(ts, name), abbr, date + ' should be ' + abbr)
  })
}
