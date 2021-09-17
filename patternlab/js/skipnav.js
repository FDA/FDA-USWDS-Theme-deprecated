'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var receptor = require('receptor').once;

var behavior = require('../../../utils/behavior');

var _require = require('../../../config'),
    PREFIX = _require.prefix;

var CLICK = 'click';
var LINK = ".".concat(PREFIX, "-skipnav[href^=\"#\"], .").concat(PREFIX, "-footer__return-to-top [href^=\"#\"]");
var MAINCONTENT = 'main-content';

function setTabindex() {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  var id = this.getAttribute('href');
  var target = document.getElementById(id === '#' ? MAINCONTENT : id.slice(1));

  if (target) {
    target.style.outline = '0';
    target.setAttribute('tabindex', 0);
    target.focus();
    target.addEventListener('blur', receptor.once(function () {
      target.setAttribute('tabindex', -1);
    }));
  } else {// throw an error?
  }
}

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, setTabindex)));
//# sourceMappingURL=skipnav.js.map
