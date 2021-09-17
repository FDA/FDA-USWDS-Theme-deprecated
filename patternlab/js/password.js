'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../../../utils/behavior');

var toggleFormInput = require('../../../utils/toggle-form-input');

var _require = require('../../../config'),
    PREFIX = _require.prefix;

var CLICK = 'click';
var LINK = ".".concat(PREFIX, "-show-password, .").concat(PREFIX, "-show-multipassword");

function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
}

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, toggle)));
//# sourceMappingURL=password.js.map
