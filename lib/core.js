'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTimeZoneData = undefined;

var _registry = require('./registry.js');

Object.defineProperty(exports, 'addTimeZoneData', {
  enumerable: true,
  get: function get() {
    return _registry.addTimeZoneData;
  }
});
exports.offset = offset;
exports.abbr = abbr;
exports.dst = dst;
exports.canonicalize = canonicalize;
exports.default = tz;

var unwrap = function unwrap(d) {
  return d instanceof Date ? d.getTime() : d;
};

function offset(timestamp, name, local, opts) {
  return (0, _registry.getZone)(name).offset(unwrap(timestamp), local, opts) * -1;
}

function abbr(timestamp, name) {
  return (0, _registry.getZone)(name).abbr(unwrap(timestamp));
}

function dst(timestamp, name) {
  return (0, _registry.getZone)(name).dst(unwrap(timestamp));
}

function canonicalize(name) {
  var z = (0, _registry.getZone)(name);
  return z.link || z.name;
}

function tz(timestamp, name, local, opts) {
  if (timestamp instanceof Date) return new Date(tz(timestamp.getTime(), name));
  return timestamp + offset(timestamp, name, local, opts) * 6e4;
}