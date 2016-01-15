
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import {addTimeZoneData, clearTimeZoneData, getZone} from './src/registry.js'
import data from './tmp/mtz/data/packed/latest.json'
import {tz as mtz} from './tmp/mtz/moment-timezone.js'
import './tmp/mtz/moment-timezone-utils.js'
import rmap from './data/regions.json'

addTimeZoneData(data)

const unpack = i => v => v.split('|')[i]
const names = data.zones.map(unpack(0)).concat(data.links.map(unpack(1)))
const zones = names.map(n => ({...getZone(n), link: undefined}))
const regions = Object.keys(rmap)

clearTimeZoneData()

const aeq = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])
const zeq = a => b => aeq(a.offsets, b.offsets) && aeq(a.untils, b.untils)
const leq = z => l => zeq(z)(l[0])

const findLinks = zs => zs.reduce(([zs, ls], z) => {
  const l = ls.find(leq(z))
  if (l) {
    l.push(z)
    return [zs, ls]
  }
  const z_ = zs.find(zeq(z))
  if (z_) {
    zs = zs.filter(z => z !== z_)
    ls.push([z, z_])
  } else {
    zs.push(z)
  }
  return [zs, ls]
}, [[], []])

const createLinks = (l, ls) => [l].concat(ls.filter(l_ => l_ !== l).map(l_ => ({...l_, link: l.name})))

const labbrs = (p, c) => {
  if (aeq(p.abbrs, c.abbrs)) return
  const m = p.abbrs.reduce((m, a, i) => {
    const k = [a, p.offsets[i]].join('|')
    if (!m[k]) m[k] = c.abbrs[i]
    return m
  }, {})
  return Object.keys(m).map(k => m[k]).join(' ')
}
const zpack = zs => zs.filter(z => !z.link).map(mtz.pack)
const lpack = zs => zs.filter(z => z.link).map(z => {
  const abbrs = labbrs(zs.find(z_ => z_.name === z.link), z)
  return [z.link, z.name].concat(abbrs || []).join('|')
})
const pack = d => ({...d, zones: zpack(d.zones), links: lpack(d.zones)})

const fwrite = (n, s) => {
  const f = path.resolve(`data/${n}.json`)
  mkdirp.sync(path.dirname(f))
  fs.writeFileSync(f, s)
}
const uwrite = (n, d) => fwrite(`unpacked/${n}`, JSON.stringify(d, null, 2))
const pwrite = (n, d) => fwrite(`packed/${n}`, JSON.stringify(pack(d)))
const write = (n, zones) => {
  uwrite(n, {zones})
  pwrite(n, {zones})
}

const utc = zones.find(z => z.name === 'UTC')
const core = createLinks(utc, findLinks(zones)[1].find(ls => ls.some(z => z === utc)))
write('core', core)

const corens = core.map(z => z.name)
const noncore = zones.filter(z => !~corens.indexOf(z.name))
const recent = noncore.map(z => ({...mtz.filterYears(z, 2010, 2020), population: undefined}))

build(noncore)
build(recent, 'recent')

function build (zones, prefix = '') {
  const ls = findLinks(zones)
  const complete = ls[0].concat(ls[1].reduce((ls, l) => ls.concat(createLinks(l[0], l)), []))
  write(path.join(prefix, 'complete'), complete)

  regions.forEach(r => {
    const zs = zones.filter(z => [r].concat(rmap[r]).some(r => z.name.startsWith(r)))
    const ls = findLinks(zs)
    const out = ls[0].concat(ls[1].reduce((ls, l) => ls.concat(createLinks(l[0], l)), []))
    write(path.join(prefix, r.toLowerCase()), out)
  })
}
