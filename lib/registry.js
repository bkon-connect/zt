'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.addTimeZoneData = addTimeZoneData;
exports.hasTimeZoneData = hasTimeZoneData;
exports.removeTimeZoneData = removeTimeZoneData;
exports.clearTimeZoneData = clearTimeZoneData;
exports.getZone = getZone;

var _zone = require('./zone.js');

var _zone2 = _interopRequireDefault(_zone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _zones = {};
var _names = {};
var _links = {};
var _abbrs = {};

function addTimeZoneData(data) {
  if (!data) return;
  if (data.zones) addZone(data.zones);
  if (data.links) addLink(data.links);
}

function hasTimeZoneData(name) {
  return !!_names[normalize(name)];
}

function removeTimeZoneData(name) {
  [].concat(name).map(normalize).forEach(function (n) {
    Object.keys(_links).filter(function (k) {
      return _links[k] === n;
    }).forEach(removeTimeZoneData);
    delete _zones[n];
    delete _names[n];
    delete _links[n];
    delete _abbrs[n];
  });
}

function clearTimeZoneData() {
  Object.keys(_names).forEach(removeTimeZoneData);
}

function getZone(name) {
  var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var norm = normalize(name);
  var zone = _zones[norm];
  if (~seen.indexOf(norm)) throw new Error('Circular links: ' + seen.join(', '));
  if (zone instanceof _zone2.default) return zone;
  if (zone) return _zones[norm] = new _zone2.default(zone);
  if (_links[norm]) {
    var link = getZone(_links[norm], seen.concat(norm));
    if (!link) return;
    _zones[norm] = new _zone2.default();
    _zones[norm]._set(link);
    _zones[norm].name = name;
    _zones[norm].link = link.link || link.name;
    if (_abbrs[norm]) _zones[norm].abbrs = linkAbbrs(link, _abbrs[norm]);
    return _zones[norm];
  }
}

function linkAbbrs(zone, abbrs) {
  abbrs = abbrs.split(' ');
  return zone.abbrs.reduce(function (_ref, a, i) {
    var _ref2 = _slicedToArray(_ref, 2),
        m = _ref2[0],
        as = _ref2[1];

    var k = [a, zone.offsets[i]].join('|');
    if (!m[k]) m[k] = abbrs.shift();
    return [m, as.concat(m[k])];
  }, [{}, []]).pop();
}

function normalize(name) {
  return (name || '').trim().toUpperCase();
}

function addZone(zone) {
  [].concat(zone).forEach(function (zone) {
    var name = typeof zone === 'string' ? zone.split('|')[0] : zone.name;
    var norm = normalize(name);
    _names[norm] = name;
    _zones[norm] = zone;
    if (typeof zone === 'string' || !zone.link) return;
    var pnorm = normalize(zone.link);
    zone.link = _links[pnorm] || _names[pnorm];
    _links[norm] = _links[pnorm] || pnorm;
  });
}

function addLink(link) {
  [].concat(link).forEach(function (link) {
    if (typeof link !== 'string') return;

    var _link$split = link.split('|'),
        _link$split2 = _slicedToArray(_link$split, 3),
        parent = _link$split2[0],
        name = _link$split2[1],
        abbrs = _link$split2[2];

    var pnorm = normalize(parent);
    var norm = normalize(name);
    _names[norm] = name;
    _links[norm] = _links[pnorm] || pnorm;
    if (abbrs) _abbrs[norm] = abbrs;
  });
}