
export {addTimeZoneData} from './registry.js'
import {getZone} from './registry.js'

const unwrap = d => d instanceof Date ? d.getTime() : d

export function offset (timestamp, name, local, opts) {
  return getZone(name).offset(unwrap(timestamp), local, opts) * -1
}

export function abbr (timestamp, name) {
  return getZone(name).abbr(unwrap(timestamp))
}

export function dst (timestamp, name) {
  return getZone(name).dst(unwrap(timestamp))
}

export function canonicalize (name) {
  const z = getZone(name)
  return z.link || z.name
}

export default function tz (timestamp, name, local, opts) {
  if (timestamp instanceof Date) return new Date(tz(timestamp.getTime(), name))
  return timestamp + offset(timestamp, name, local, opts) * 6e4
}
