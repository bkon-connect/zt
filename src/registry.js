
import Zone from './zone.js'

const _zones = {}
const _names = {}
const _links = {}
const _abbrs = {}

export function addTimeZoneData (data) {
  if (!data) return
  if (data.zones) addZone(data.zones)
  if (data.links) addLink(data.links)
}

export function hasTimeZoneData (name) {
  return !!_names[normalize(name)]
}

export function removeTimeZoneData (name) {
  [].concat(name).map(normalize).forEach(n => {
    Object.keys(_links).filter(k => _links[k] === n).forEach(removeTimeZoneData)
    delete _zones[n]
    delete _names[n]
    delete _links[n]
    delete _abbrs[n]
  })
}

export function clearTimeZoneData () {
  Object.keys(_names).forEach(removeTimeZoneData)
}

export function getZone (name, seen = []) {
  const norm = normalize(name)
  const zone = _zones[norm]
  if (~seen.indexOf(norm)) throw new Error(`Circular links: ${seen.join(', ')}`)
  if (zone instanceof Zone) return zone
  if (zone) return (_zones[norm] = new Zone(zone))
  if (_links[norm]) {
    const link = getZone(_links[norm], seen.concat(norm))
    if (!link) return
    _zones[norm] = new Zone()
    _zones[norm]._set(link)
    _zones[norm].name = name
    _zones[norm].link = link.link || link.name
    if (_abbrs[norm]) _zones[norm].abbrs = linkAbbrs(link, _abbrs[norm])
    return _zones[norm]
  }
}

function linkAbbrs (zone, abbrs) {
  abbrs = abbrs.split(' ')
  return zone.abbrs.reduce(([m, as], a, i) => {
    const k = [a, zone.offsets[i]].join('|')
    if (!m[k]) m[k] = abbrs.shift()
    return [m, as.concat(m[k])]
  }, [{}, []]).pop()
}

function normalize (name) {
  return (name || '').trim().toUpperCase()
}

function addZone (zone) {
  [].concat(zone).forEach(zone => {
    const name = typeof zone === 'string' ? zone.split('|')[0] : zone.name
    const norm = normalize(name)
    _names[norm] = name
    _zones[norm] = zone
    if (typeof zone === 'string' || !zone.link) return
    const pnorm = normalize(zone.link)
    zone.link = _links[pnorm] || _names[pnorm]
    _links[norm] = _links[pnorm] || pnorm
  })
}

function addLink (link) {
  [].concat(link).forEach(link => {
    if (typeof link !== 'string') return
    const [parent, name, abbrs] = link.split('|')
    const pnorm = normalize(parent)
    const norm = normalize(name)
    _names[norm] = name
    _links[norm] = _links[pnorm] || pnorm
    if (abbrs) _abbrs[norm] = abbrs
  })
}
