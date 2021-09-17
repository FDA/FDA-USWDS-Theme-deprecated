'use strict';

var behavior = require('../../../utils/behavior');

var validate = require('../../../utils/validate-input');

function change() {
  validate(this);
}

var validator = behavior({
  'keyup change': {
    'input[data-validation-element]': change
  }
});
module.exports = validator;
//# sourceMappingURL=validator.js.map
