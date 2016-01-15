'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unpack;
function unpack(string) {
  var data = string.split('|');
  var abbrs = data[1].split(' ');
  var offsets = data[2].split(' ').map(unpackBase60);
  var indices = data[3].split('').map(unpackBase60);
  var untils = data[4].split(' ').map(unpackBase60).slice(0, indices.length - 1).reduce(function (m, v) {
    var n = Math.round(m[0] + v * 6e4);
    return [n, m[1].concat(n)];
  }, [0, []]).pop().concat(Infinity);

  return {
    name: data[0],
    abbrs: indices.map(function (i) {
      return abbrs[i];
    }),
    offsets: indices.map(function (i) {
      return offsets[i];
    }),
    untils: untils
  };
}

var charCodeToInt = function charCodeToInt(c) {
  return c - (c > 96 ? 87 : c > 64 ? 29 : 48);
};

function unpackBase60(string) {
  var neg = string.charCodeAt(0) === 45;
  var parts = string.split('.');
  var whole = parts[0];
  var fractional = parts[1] || '';
  var multiplier = 1;
  var out = 0;
  var num = undefined;
  for (var i = neg ? 1 : 0; i < whole.length; i++) {
    num = charCodeToInt(whole.charCodeAt(i));
    out = 60 * out + num;
  }
  for (var i = 0; i < fractional.length; i++) {
    multiplier = multiplier / 60;
    num = charCodeToInt(fractional.charCodeAt(i));
    out += num * multiplier;
  }
  return out * (neg ? -1 : 1);
}