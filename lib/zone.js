'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _unpack = require('./unpack.js');

var _unpack2 = _interopRequireDefault(_unpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Zone = function () {
  function Zone(zone) {
    _classCallCheck(this, Zone);

    if (typeof zone === 'string') this._set((0, _unpack2.default)(zone));
    if ((typeof zone === 'undefined' ? 'undefined' : _typeof(zone)) === 'object') this._set(zone);
  }

  _createClass(Zone, [{
    key: '_set',
    value: function _set(unpacked) {
      this.name = unpacked.name;
      this.abbrs = unpacked.abbrs;
      this.untils = unpacked.untils;
      this.offsets = unpacked.offsets;
      this.link = unpacked.link;
      this.untils[this.untils.length - 1] = Infinity;
    }
  }, {
    key: '_index',
    value: function _index(timestamp) {
      var target = +timestamp;
      for (var i = 0; i < this.untils.length; i++) {
        if (this.untils[i] > target) return i;
      }
    }
  }, {
    key: 'abbr',
    value: function abbr(timestamp) {
      return this.abbrs[this._index(timestamp)];
    }
  }, {
    key: 'offset',
    value: function offset(timestamp) {
      var local = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!local) return this.offsets[this._index(timestamp)];
      var target = +timestamp;
      var max = this.untils.length - 1;
      for (var i = 0; i < max; i++) {
        var curr = this.offsets[i];
        var next = this.offsets[i + 1];
        var prev = this.offsets[i ? i - 1 : i];
        if (curr < next && opts.moveAmbiguousForward) {
          curr = next;
        } else if (curr > prev && opts.moveInvalidForward) {
          curr = prev;
        }
        if (target < this.untils[i] - curr * 6e4) return this.offsets[i] * -1;
      }
      return this.offsets[max] * -1;
    }
  }, {
    key: 'dst',
    value: function dst(timestamp) {
      var date = new Date(timestamp);
      var offset = this.offset(timestamp);
      return offset < this.offset(date.setUTCMonth(0)) || offset < this.offset(date.setUTCMonth(5));
    }
  }]);

  return Zone;
}();

exports.default = Zone;