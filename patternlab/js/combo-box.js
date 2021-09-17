'use strict';

var _CLICK, _keydown, _behavior;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var receptor = require('receptor');

var select = require('../../../utils/select');

var behavior = require('../../../utils/behavior');

var _require = require('../../../config'),
    PREFIX = _require.prefix;

var CLICK = 'click';
var COMBO_BOX_CLASS = "".concat(PREFIX, "-combo-box");
var COMBO_BOX_PRISTINE_CLASS = "".concat(COMBO_BOX_CLASS, "--pristine");
var SELECT_CLASS = "".concat(COMBO_BOX_CLASS, "__select");
var INPUT_CLASS = "".concat(COMBO_BOX_CLASS, "__input");
var CLEAR_INPUT_BUTTON_CLASS = "".concat(COMBO_BOX_CLASS, "__clear-input");
var CLEAR_INPUT_BUTTON_WRAPPER_CLASS = "".concat(CLEAR_INPUT_BUTTON_CLASS, "__wrapper");
var INPUT_BUTTON_SEPARATOR_CLASS = "".concat(COMBO_BOX_CLASS, "__input-button-separator");
var TOGGLE_LIST_BUTTON_CLASS = "".concat(COMBO_BOX_CLASS, "__toggle-list");
var TOGGLE_LIST_BUTTON_WRAPPER_CLASS = "".concat(TOGGLE_LIST_BUTTON_CLASS, "__wrapper");
var LIST_CLASS = "".concat(COMBO_BOX_CLASS, "__list");
var LIST_OPTION_CLASS = "".concat(COMBO_BOX_CLASS, "__list-option");
var LIST_OPTION_FOCUSED_CLASS = "".concat(LIST_OPTION_CLASS, "--focused");
var LIST_OPTION_SELECTED_CLASS = "".concat(LIST_OPTION_CLASS, "--selected");
var STATUS_CLASS = "".concat(COMBO_BOX_CLASS, "__status");
var COMBO_BOX = ".".concat(COMBO_BOX_CLASS);
var SELECT = ".".concat(SELECT_CLASS);
var INPUT = ".".concat(INPUT_CLASS);
var CLEAR_INPUT_BUTTON = ".".concat(CLEAR_INPUT_BUTTON_CLASS);
var TOGGLE_LIST_BUTTON = ".".concat(TOGGLE_LIST_BUTTON_CLASS);
var LIST = ".".concat(LIST_CLASS);
var LIST_OPTION = ".".concat(LIST_OPTION_CLASS);
var LIST_OPTION_FOCUSED = ".".concat(LIST_OPTION_FOCUSED_CLASS);
var LIST_OPTION_SELECTED = ".".concat(LIST_OPTION_SELECTED_CLASS);
var STATUS = ".".concat(STATUS_CLASS);

var noop = function noop() {};
/**
 * set the value of the element and dispatch a change event
 *
 * @param {HTMLInputElement|HTMLSelectElement} el The element to update
 * @param {string} value The new value of the element
 */


var changeElementValue = function changeElementValue(el) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var elementToChange = el;
  elementToChange.value = value;
  var event = new CustomEvent('change', {
    bubbles: true,
    cancelable: true,
    detail: {
      value: value
    }
  });
  elementToChange.dispatchEvent(event);
};
/**
 * The elements within the combo box.
 * @typedef {Object} ComboBoxContext
 * @property {HTMLElement} comboBoxEl
 * @property {HTMLSelectElement} selectEl
 * @property {HTMLInputElement} inputEl
 * @property {HTMLUListElement} listEl
 * @property {HTMLDivElement} statusEl
 * @property {HTMLLIElement} focusedOptionEl
 * @property {HTMLLIElement} selectedOptionEl
 * @property {HTMLButtonElement} toggleListBtnEl
 * @property {HTMLButtonElement} clearInputBtnEl
 */

/**
 * Get an object of elements belonging directly to the given
 * combo box component.
 *
 * @param {HTMLElement} el the element within the combo box
 * @returns {ComboBoxContext} elements
 */


var getComboBoxContext = function getComboBoxContext(el) {
  var comboBoxEl = el.closest(COMBO_BOX);

  if (!comboBoxEl) {
    throw new Error("Element is missing outer ".concat(COMBO_BOX));
  }

  var selectEl = comboBoxEl.querySelector(SELECT);
  var inputEl = comboBoxEl.querySelector(INPUT);
  var listEl = comboBoxEl.querySelector(LIST);
  var statusEl = comboBoxEl.querySelector(STATUS);
  var focusedOptionEl = comboBoxEl.querySelector(LIST_OPTION_FOCUSED);
  var selectedOptionEl = comboBoxEl.querySelector(LIST_OPTION_SELECTED);
  var toggleListBtnEl = comboBoxEl.querySelector(TOGGLE_LIST_BUTTON);
  var clearInputBtnEl = comboBoxEl.querySelector(CLEAR_INPUT_BUTTON);
  var isPristine = comboBoxEl.classList.contains(COMBO_BOX_PRISTINE_CLASS);
  return {
    comboBoxEl: comboBoxEl,
    selectEl: selectEl,
    inputEl: inputEl,
    listEl: listEl,
    statusEl: statusEl,
    focusedOptionEl: focusedOptionEl,
    selectedOptionEl: selectedOptionEl,
    toggleListBtnEl: toggleListBtnEl,
    clearInputBtnEl: clearInputBtnEl,
    isPristine: isPristine
  };
};
/**
 * Disable the combo-box component
 *
 * @param {HTMLInputElement} el An element within the combo box component
 */


var disable = function disable(el) {
  var _getComboBoxContext = getComboBoxContext(el),
      inputEl = _getComboBoxContext.inputEl,
      toggleListBtnEl = _getComboBoxContext.toggleListBtnEl,
      clearInputBtnEl = _getComboBoxContext.clearInputBtnEl;

  clearInputBtnEl.hidden = true;
  clearInputBtnEl.disabled = true;
  toggleListBtnEl.disabled = true;
  inputEl.disabled = true;
};
/**
 * Enable the combo-box component
 *
 * @param {HTMLInputElement} el An element within the combo box component
 */


var enable = function enable(el) {
  var _getComboBoxContext2 = getComboBoxContext(el),
      inputEl = _getComboBoxContext2.inputEl,
      toggleListBtnEl = _getComboBoxContext2.toggleListBtnEl,
      clearInputBtnEl = _getComboBoxContext2.clearInputBtnEl;

  clearInputBtnEl.hidden = false;
  clearInputBtnEl.disabled = false;
  toggleListBtnEl.disabled = false;
  inputEl.disabled = false;
};
/**
 * Enhance a select element into a combo box component.
 *
 * @param {HTMLElement} comboBoxEl The initial element of the combo box component
 */


var enhanceComboBox = function enhanceComboBox(comboBoxEl) {
  var selectEl = comboBoxEl.querySelector('select');

  if (!selectEl) {
    throw new Error("".concat(COMBO_BOX, " is missing inner select"));
  }

  var selectId = selectEl.id;
  var listId = "".concat(selectId, "--list");
  var assistiveHintID = "".concat(selectId, "--assistiveHint");
  var additionalAttributes = [];
  var defaultValue = comboBoxEl.dataset.defaultValue;
  var placeholder = comboBoxEl.dataset.placeholder;
  var selectedOption;

  if (placeholder) {
    additionalAttributes.push("placeholder='".concat(placeholder, "'"));
  }

  if (defaultValue) {
    for (var i = 0, len = selectEl.options.length; i < len; i += 1) {
      var optionEl = selectEl.options[i];

      if (optionEl.value === defaultValue) {
        selectedOption = optionEl;
        break;
      }
    }
  }

  selectEl.setAttribute('aria-hidden', 'true');
  selectEl.setAttribute('tabindex', '-1');
  selectEl.classList.add('usa-sr-only', SELECT_CLASS);
  selectEl.id = '';
  selectEl.value = '';
  ['required', 'aria-label', 'aria-labelledby'].forEach(function (name) {
    if (selectEl.hasAttribute(name)) {
      var value = selectEl.getAttribute(name);
      additionalAttributes.push("".concat(name, "='").concat(value, "'"));
      selectEl.removeAttribute(name);
    }
  });
  comboBoxEl.insertAdjacentHTML('beforeend', ["<input\n        aria-owns='".concat(listId, "'\n        aria-autocomplete='list'\n        aria-describedby='").concat(assistiveHintID, "'\n        aria-expanded='false'\n        autocapitalize='off'\n        autocomplete='off'\n        id='").concat(selectId, "'\n        class='").concat(INPUT_CLASS, "'\n        type='text'\n        role='combobox'\n        ").concat(additionalAttributes.join(' '), "\n      >"), "<span class='".concat(CLEAR_INPUT_BUTTON_WRAPPER_CLASS, "' tabindex='-1'>\n        <button type='button' class='").concat(CLEAR_INPUT_BUTTON_CLASS, "' aria-label='Clear the select contents'>&nbsp;</button>\n      </span>"), "<span class='".concat(INPUT_BUTTON_SEPARATOR_CLASS, "'>&nbsp;</span>"), "<span class='".concat(TOGGLE_LIST_BUTTON_WRAPPER_CLASS, "' tabindex='-1'>\n        <button type='button' tabindex='-1' class='").concat(TOGGLE_LIST_BUTTON_CLASS, "' aria-label='Toggle the dropdown list'>&nbsp;</button>\n      </span>"), "<ul\n        tabindex='-1'\n        id='".concat(listId, "'\n        class='").concat(LIST_CLASS, "'\n        role='listbox'\n        hidden>\n      </ul>"), "<div class='".concat(STATUS_CLASS, " usa-sr-only' role='status'></div>"), "<span id='".concat(assistiveHintID, "' class='usa-sr-only'>\n        When autocomplete results are available use up and down arrows to review and enter to select.\n        Touch device users, explore by touch or with swipe gestures.\n      </span>")].join(''));

  if (selectedOption) {
    var _getComboBoxContext3 = getComboBoxContext(comboBoxEl),
        inputEl = _getComboBoxContext3.inputEl;

    changeElementValue(selectEl, selectedOption.value);
    changeElementValue(inputEl, selectedOption.text);
    comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
  }

  if (selectEl.disabled) {
    disable(comboBoxEl);
    selectEl.disabled = false;
  }
};
/**
 * Manage the focused element within the list options when
 * navigating via keyboard.
 *
 * @param {HTMLElement} el An element within the combo box component
 * @param {HTMLElement} currentEl An element within the combo box component
 * @param {HTMLElement} nextEl An element within the combo box component
 * @param {Object} options options
 * @param {boolean} options.skipFocus skip focus of highlighted item
 * @param {boolean} options.preventScroll should skip procedure to scroll to element
 */


var highlightOption = function highlightOption(el, currentEl, nextEl) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      skipFocus = _ref.skipFocus,
      preventScroll = _ref.preventScroll;

  var _getComboBoxContext4 = getComboBoxContext(el),
      inputEl = _getComboBoxContext4.inputEl,
      listEl = _getComboBoxContext4.listEl,
      selectedOptionEl = _getComboBoxContext4.selectedOptionEl;

  if (selectedOptionEl) {
    selectedOptionEl.tabIndex = '-1';
  }

  if (currentEl) {
    currentEl.classList.remove(LIST_OPTION_FOCUSED_CLASS);
    currentEl.setAttribute('aria-selected', 'false');
    currentEl.setAttribute('tabIndex', '-1');
  }

  if (nextEl) {
    inputEl.setAttribute('aria-activedescendant', nextEl.id);
    nextEl.setAttribute('aria-selected', 'true');
    nextEl.setAttribute('tabIndex', '0');
    nextEl.classList.add(LIST_OPTION_FOCUSED_CLASS);

    if (!preventScroll) {
      var optionBottom = nextEl.offsetTop + nextEl.offsetHeight;
      var currentBottom = listEl.scrollTop + listEl.offsetHeight;

      if (optionBottom > currentBottom) {
        listEl.scrollTop = optionBottom - listEl.offsetHeight;
      }

      if (nextEl.offsetTop < listEl.scrollTop) {
        listEl.scrollTop = nextEl.offsetTop;
      }
    }

    if (!skipFocus) {
      nextEl.focus({
        preventScroll: preventScroll
      });
    }
  } else {
    inputEl.setAttribute('aria-activedescendant', '');
    inputEl.focus();
  }
};
/**
 * Display the option list of a combo box component.
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var displayList = function displayList(el) {
  var _getComboBoxContext5 = getComboBoxContext(el),
      selectEl = _getComboBoxContext5.selectEl,
      inputEl = _getComboBoxContext5.inputEl,
      listEl = _getComboBoxContext5.listEl,
      statusEl = _getComboBoxContext5.statusEl,
      isPristine = _getComboBoxContext5.isPristine;

  var selectedItemId;
  var listOptionBaseId = "".concat(listEl.id, "--option-");
  var inputValue = (inputEl.value || '').toLowerCase();
  var options = [];

  for (var i = 0, len = selectEl.options.length; i < len; i += 1) {
    var optionEl = selectEl.options[i];

    if (optionEl.value && (isPristine || !inputValue || optionEl.text.toLowerCase().indexOf(inputValue) !== -1)) {
      if (selectEl.value && optionEl.value === selectEl.value) {
        selectedItemId = "".concat(listOptionBaseId).concat(options.length);
      }

      options.push(optionEl);
    }
  }

  var numOptions = options.length;
  var optionHtml = options.map(function (option, index) {
    var optionId = "".concat(listOptionBaseId).concat(index);
    var classes = [LIST_OPTION_CLASS];
    var tabindex = '-1';

    if (optionId === selectedItemId) {
      classes.push(LIST_OPTION_SELECTED_CLASS);
      tabindex = '0';
    }

    if (!selectedItemId && index === 0) {
      tabindex = '0';
    }

    return "<li\n          aria-selected='false'\n          aria-setsize='".concat(options.length, "'\n          aria-posinset='").concat(index + 1, "'\n          id='").concat(optionId, "'\n          class='").concat(classes.join(' '), "'\n          tabindex='").concat(tabindex, "'\n          role='option'\n          data-value='").concat(option.value, "'\n        >").concat(option.text, "</li>");
  }).join('');
  var noResults = "<li class='".concat(LIST_OPTION_CLASS, "--no-results'>No results found</li>");
  listEl.hidden = false;
  listEl.innerHTML = numOptions ? optionHtml : noResults;
  inputEl.setAttribute('aria-expanded', 'true');
  statusEl.innerHTML = numOptions ? "".concat(numOptions, " result").concat(numOptions > 1 ? 's' : '', " available.") : 'No results.';

  if (isPristine && selectedItemId) {
    var selectedOptionEl = listEl.querySelector('#' + selectedItemId);
    highlightOption(listEl, null, selectedOptionEl, {
      skipFocus: true
    });
  }
};
/**
 * Hide the option list of a combo box component.
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var hideList = function hideList(el) {
  var _getComboBoxContext6 = getComboBoxContext(el),
      inputEl = _getComboBoxContext6.inputEl,
      listEl = _getComboBoxContext6.listEl,
      statusEl = _getComboBoxContext6.statusEl,
      focusedOptionEl = _getComboBoxContext6.focusedOptionEl;

  statusEl.innerHTML = '';
  inputEl.setAttribute('aria-expanded', 'false');
  inputEl.setAttribute('aria-activedescendant', '');

  if (focusedOptionEl) {
    focusedOptionEl.classList.remove(LIST_OPTION_FOCUSED_CLASS);
  }

  listEl.scrollTop = 0;
  listEl.hidden = true;
};
/**
 * Select an option list of the combo box component.
 *
 * @param {HTMLElement} listOptionEl The list option being selected
 */


var selectItem = function selectItem(listOptionEl) {
  var _getComboBoxContext7 = getComboBoxContext(listOptionEl),
      comboBoxEl = _getComboBoxContext7.comboBoxEl,
      selectEl = _getComboBoxContext7.selectEl,
      inputEl = _getComboBoxContext7.inputEl;

  changeElementValue(selectEl, listOptionEl.dataset.value);
  changeElementValue(inputEl, listOptionEl.textContent);
  comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
  hideList(comboBoxEl);
  inputEl.focus();
};
/**
 * Clear the input of the combo box
 *
 * @param {HTMLButtonElement} clearButtonEl The clear input button
 */


var clearInput = function clearInput(clearButtonEl) {
  var _getComboBoxContext8 = getComboBoxContext(clearButtonEl),
      comboBoxEl = _getComboBoxContext8.comboBoxEl,
      listEl = _getComboBoxContext8.listEl,
      selectEl = _getComboBoxContext8.selectEl,
      inputEl = _getComboBoxContext8.inputEl;

  var listShown = !listEl.hidden;

  if (selectEl.value) {
    changeElementValue(selectEl);
  }

  if (inputEl.value) {
    changeElementValue(inputEl);
  }

  comboBoxEl.classList.remove(COMBO_BOX_PRISTINE_CLASS);

  if (listShown) {
    displayList(comboBoxEl);
  }

  inputEl.focus();
};
/**
 * Reset the select based off of currently set select value
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var resetSelection = function resetSelection(el) {
  var _getComboBoxContext9 = getComboBoxContext(el),
      comboBoxEl = _getComboBoxContext9.comboBoxEl,
      selectEl = _getComboBoxContext9.selectEl,
      inputEl = _getComboBoxContext9.inputEl;

  var selectValue = selectEl.value;
  var inputValue = (inputEl.value || '').toLowerCase();

  if (selectValue) {
    for (var i = 0, len = selectEl.options.length; i < len; i += 1) {
      var optionEl = selectEl.options[i];

      if (optionEl.value === selectValue) {
        if (inputValue !== optionEl.text) {
          changeElementValue(inputEl, optionEl.text);
        }

        comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
        return;
      }
    }
  }

  if (inputValue) {
    changeElementValue(inputEl);
  }
};
/**
 * Select an option list of the combo box component based off of
 * having a current focused list option or
 * having test that completely matches a list option.
 * Otherwise it clears the input and select.
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var completeSelection = function completeSelection(el) {
  var _getComboBoxContext10 = getComboBoxContext(el),
      comboBoxEl = _getComboBoxContext10.comboBoxEl,
      selectEl = _getComboBoxContext10.selectEl,
      inputEl = _getComboBoxContext10.inputEl,
      statusEl = _getComboBoxContext10.statusEl,
      focusedOptionEl = _getComboBoxContext10.focusedOptionEl;

  statusEl.textContent = '';

  if (focusedOptionEl) {
    changeElementValue(selectEl, focusedOptionEl.dataset.value);
    changeElementValue(inputEl, focusedOptionEl.textContent);
    comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
    return;
  }

  var inputValue = (inputEl.value || '').toLowerCase();

  if (inputValue) {
    for (var i = 0, len = selectEl.options.length; i < len; i += 1) {
      var optionEl = selectEl.options[i];

      if (optionEl.text.toLowerCase() === inputValue) {
        changeElementValue(selectEl, optionEl.value);
        changeElementValue(inputEl, optionEl.text);
        comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
        return;
      }
    }
  }

  resetSelection(comboBoxEl);
};
/**
 * Handle the escape event within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleEscape = function handleEscape(event) {
  var _getComboBoxContext11 = getComboBoxContext(event.target),
      comboBoxEl = _getComboBoxContext11.comboBoxEl,
      inputEl = _getComboBoxContext11.inputEl;

  hideList(comboBoxEl);
  resetSelection(comboBoxEl);
  inputEl.focus();
};
/**
 * Handle the down event within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleDown = function handleDown(event) {
  var _getComboBoxContext12 = getComboBoxContext(event.target),
      comboBoxEl = _getComboBoxContext12.comboBoxEl,
      listEl = _getComboBoxContext12.listEl,
      focusedOptionEl = _getComboBoxContext12.focusedOptionEl;

  if (listEl.hidden) {
    displayList(comboBoxEl);
  }

  var nextOptionEl = listEl.querySelector(LIST_OPTION_SELECTED) || listEl.querySelector(LIST_OPTION);

  if (focusedOptionEl) {
    nextOptionEl = focusedOptionEl.nextSibling;
  }

  if (nextOptionEl) {
    highlightOption(comboBoxEl, focusedOptionEl, nextOptionEl);
  }

  event.preventDefault();
};
/**
 * Handle the enter event from an input element within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleEnterFromInput = function handleEnterFromInput(event) {
  var _getComboBoxContext13 = getComboBoxContext(event.target),
      comboBoxEl = _getComboBoxContext13.comboBoxEl,
      listEl = _getComboBoxContext13.listEl;

  var listShown = !listEl.hidden;
  completeSelection(comboBoxEl);

  if (listShown) {
    hideList(comboBoxEl);
  }

  event.preventDefault();
};
/**
 * Handle the tab event from an list option element within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleTabFromListOption = function handleTabFromListOption(event) {
  selectItem(event.target);
  event.preventDefault();
};
/**
 * Handle the enter event from list option within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleEnterFromListOption = function handleEnterFromListOption(event) {
  selectItem(event.target);
  event.preventDefault();
};
/**
 * Handle the up event from list option within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleUpFromListOption = function handleUpFromListOption(event) {
  var _getComboBoxContext14 = getComboBoxContext(event.target),
      comboBoxEl = _getComboBoxContext14.comboBoxEl,
      listEl = _getComboBoxContext14.listEl,
      focusedOptionEl = _getComboBoxContext14.focusedOptionEl;

  var nextOptionEl = focusedOptionEl && focusedOptionEl.previousSibling;
  var listShown = !listEl.hidden;
  highlightOption(comboBoxEl, focusedOptionEl, nextOptionEl);

  if (listShown) {
    event.preventDefault();
  }

  if (!nextOptionEl) {
    hideList(comboBoxEl);
  }
};
/**
 * Select list option on the mousemove event.
 *
 * @param {MouseEvent} event The mousemove event
 * @param {HTMLLIElement} listOptionEl An element within the combo box component
 */


var handleMousemove = function handleMousemove(listOptionEl) {
  var isCurrentlyFocused = listOptionEl.classList.contains(LIST_OPTION_FOCUSED_CLASS);

  if (isCurrentlyFocused) {
    return;
  }

  var _getComboBoxContext15 = getComboBoxContext(listOptionEl),
      comboBoxEl = _getComboBoxContext15.comboBoxEl,
      focusedOptionEl = _getComboBoxContext15.focusedOptionEl;

  highlightOption(comboBoxEl, focusedOptionEl, listOptionEl, {
    preventScroll: true
  });
};
/**
 * Toggle the list when the button is clicked
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var toggleList = function toggleList(el) {
  var _getComboBoxContext16 = getComboBoxContext(el),
      comboBoxEl = _getComboBoxContext16.comboBoxEl,
      listEl = _getComboBoxContext16.listEl,
      inputEl = _getComboBoxContext16.inputEl;

  if (listEl.hidden) {
    displayList(comboBoxEl);
  } else {
    hideList(comboBoxEl);
  }

  inputEl.focus();
};
/**
 * Handle click from input
 *
 * @param {HTMLInputElement} el An element within the combo box component
 */


var handleClickFromInput = function handleClickFromInput(el) {
  var _getComboBoxContext17 = getComboBoxContext(el),
      comboBoxEl = _getComboBoxContext17.comboBoxEl,
      listEl = _getComboBoxContext17.listEl;

  if (listEl.hidden) {
    displayList(comboBoxEl);
  }
};

var comboBox = behavior((_behavior = {}, _defineProperty(_behavior, CLICK, (_CLICK = {}, _defineProperty(_CLICK, INPUT, function () {
  if (this.disabled) {
    return;
  }

  handleClickFromInput(this);
}), _defineProperty(_CLICK, TOGGLE_LIST_BUTTON, function () {
  if (this.disabled) {
    return;
  }

  toggleList(this);
}), _defineProperty(_CLICK, LIST_OPTION, function () {
  if (this.disabled) {
    return;
  }

  selectItem(this);
}), _defineProperty(_CLICK, CLEAR_INPUT_BUTTON, function () {
  if (this.disabled) {
    return;
  }

  clearInput(this);
}), _CLICK)), _defineProperty(_behavior, "focusout", _defineProperty({}, COMBO_BOX, function (event) {
  if (!this.contains(event.relatedTarget)) {
    resetSelection(this);
    hideList(this);
  }
})), _defineProperty(_behavior, "keydown", (_keydown = {}, _defineProperty(_keydown, COMBO_BOX, receptor.keymap({
  ArrowDown: handleDown,
  Down: handleDown,
  Escape: handleEscape
})), _defineProperty(_keydown, INPUT, receptor.keymap({
  Enter: handleEnterFromInput
})), _defineProperty(_keydown, LIST_OPTION, receptor.keymap({
  ArrowUp: handleUpFromListOption,
  Up: handleUpFromListOption,
  Enter: handleEnterFromListOption,
  Tab: handleTabFromListOption,
  'Shift+Tab': noop
})), _keydown)), _defineProperty(_behavior, "input", _defineProperty({}, INPUT, function () {
  var comboBoxEl = this.closest(COMBO_BOX);
  comboBoxEl.classList.remove(COMBO_BOX_PRISTINE_CLASS);
  displayList(this);
})), _defineProperty(_behavior, "mousemove", _defineProperty({}, LIST_OPTION, function () {
  handleMousemove(this);
})), _behavior), {
  init: function init(root) {
    select(COMBO_BOX, root).forEach(function (comboBoxEl) {
      enhanceComboBox(comboBoxEl);
    });
  },
  getComboBoxContext: getComboBoxContext,
  disable: disable,
  enable: enable,
  displayList: displayList,
  hideList: hideList
});
module.exports = comboBox;
//# sourceMappingURL=combo-box.js.map
