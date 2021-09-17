'use strict';

var select = require('../../../utils/select');

var behavior = require('../../../utils/behavior');

var _require = require('../../../config'),
    PREFIX = _require.prefix;

var DROPZONE_CLASS = "".concat(PREFIX, "-file-input");
var DROPZONE = ".".concat(DROPZONE_CLASS);
var INPUT_CLASS = "".concat(PREFIX, "-file-input__input");
var TARGET_CLASS = "".concat(PREFIX, "-file-input__target");
var BOX_CLASS = "".concat(PREFIX, "-file-input__box");
var INSTRUCTIONS_CLASS = "".concat(PREFIX, "-file-input__instructions");
var PREVIEW_CLASS = "".concat(PREFIX, "-file-input__preview");
var PREVIEW_HEADING_CLASS = "".concat(PREFIX, "-file-input__preview-heading");
var CHOOSE_CLASS = "".concat(PREFIX, "-file-input__choose");
var ACCEPTED_FILE_MESSAGE_CLASS = "".concat(PREFIX, "-file-input__accepted-files-message");
var DRAG_TEXT_CLASS = "".concat(PREFIX, "-file-input__drag-text");
var DRAG_CLASS = "".concat(PREFIX, "-file-input--drag");
var LOADING_CLASS = 'is-loading';
var HIDDEN_CLASS = 'display-none';
var INVALID_FILE_CLASS = 'has-invalid-file';
var GENERIC_PREVIEW_CLASS_NAME = "".concat(PREFIX, "-file-input__preview__image");
var GENERIC_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--generic");
var PDF_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--pdf");
var WORD_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--word");
var VIDEO_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--video");
var EXCEL_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--excel");
var SPACER_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
/**
 * Creates an ID name for each file that strips all invalid characters.
 * @param {string} name - name of the file added to file input
 * @returns {string} same characters as the name with invalide chars removed
 */

var makeSafeForID = function makeSafeForID(name) {
  return name.replace(/[^a-z0-9]/g, function replaceName(s) {
    var c = s.charCodeAt(0);

    if (c === 32) {
      return '-';
    }

    if (c >= 65 && c <= 90) {
      return "img_".concat(s.toLowerCase());
    }

    return "__".concat(('000', c.toString(16)).slice(-4));
  });
};
/**
 * Builds full file input comonent
 * @param {HTMLElement} fileInputEl - original file input on page
 * @returns {HTMLElement|HTMLElement} - Instructions, target area div
 */


var buildFileInput = function buildFileInput(fileInputEl) {
  var acceptsMultiple = fileInputEl.hasAttribute('multiple');
  var fileInputParent = document.createElement('div');
  var dropTarget = document.createElement('div');
  var box = document.createElement('div');
  var instructions = document.createElement('div'); // Adds class names and other attributes

  fileInputEl.classList.remove(DROPZONE_CLASS);
  fileInputEl.classList.add(INPUT_CLASS);
  fileInputParent.classList.add(DROPZONE_CLASS);
  box.classList.add(BOX_CLASS);
  instructions.classList.add(INSTRUCTIONS_CLASS);
  instructions.setAttribute('aria-hidden', 'true');
  dropTarget.classList.add(TARGET_CLASS); // Adds child elements to the DOM

  fileInputEl.parentNode.insertBefore(dropTarget, fileInputEl);
  fileInputEl.parentNode.insertBefore(fileInputParent, dropTarget);
  dropTarget.appendChild(fileInputEl);
  fileInputParent.appendChild(dropTarget);
  fileInputEl.parentNode.insertBefore(instructions, fileInputEl);
  fileInputEl.parentNode.insertBefore(box, fileInputEl); // Sets instruction test based on whether or not multipe files are accepted

  if (acceptsMultiple) {
    instructions.innerHTML = "<span class=\"".concat(DRAG_TEXT_CLASS, "\">Drag files here or </span><span class=\"").concat(CHOOSE_CLASS, "\">choose from folder</span>");
  } else {
    instructions.innerHTML = "<span class=\"".concat(DRAG_TEXT_CLASS, "\">Drag file here or </span><span class=\"").concat(CHOOSE_CLASS, "\">choose from folder</span>");
  } // IE11 and Edge do not support drop files on file inputs, so we've removed text that indicates that


  if (/rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
    fileInputParent.querySelector(".".concat(DRAG_TEXT_CLASS)).outerHTML = '';
  }

  return {
    instructions: instructions,
    dropTarget: dropTarget
  };
};
/**
 * Removes image previews, we want to start with a clean list every time files are added to the file input
 * @param {HTMLElement} dropTarget - target area div that encases the input
 * @param {HTMLElement} instructions - text to infrom users to drag or select files
 */


var removeOldPreviews = function removeOldPreviews(dropTarget, instructions) {
  var filePreviews = dropTarget.querySelectorAll(".".concat(PREVIEW_CLASS));
  var currentPreviewHeading = dropTarget.querySelector(".".concat(PREVIEW_HEADING_CLASS));
  var currentErrorMessage = dropTarget.querySelector(".".concat(ACCEPTED_FILE_MESSAGE_CLASS)); // Remove the heading above the previews

  if (currentPreviewHeading) {
    currentPreviewHeading.outerHTML = '';
  } // Remove existing error messages


  if (currentErrorMessage) {
    currentErrorMessage.outerHTML = '';
    dropTarget.classList.remove(INVALID_FILE_CLASS);
  } // Get rid of existing previews if they exist, show instructions


  if (filePreviews !== null) {
    if (instructions) {
      instructions.classList.remove(HIDDEN_CLASS);
    }

    Array.prototype.forEach.call(filePreviews, function removeImages(node) {
      node.parentNode.removeChild(node);
    });
  }
};
/**
 * When using an Accept attribute, invalid files will be hidden from
 * file browser, but they can still be dragged to the input. This
 * function prevents them from being dragged and removes error states
 * when correct files are added.
 * @param {event} e
 * @param {HTMLElement} fileInputEl - file input element
 * @param {HTMLElement} instructions - text to infrom users to drag or select files
 * @param {HTMLElement} dropTarget - target area div that encases the input
 */


var preventInvalidFiles = function preventInvalidFiles(e, fileInputEl, instructions, dropTarget) {
  var acceptedFiles = fileInputEl.getAttribute('accept');
  dropTarget.classList.remove(INVALID_FILE_CLASS); // Runs if only specific files are accepted

  if (acceptedFiles) {
    var errorMessage = document.createElement('div'); // If multiple files are dragged, this iterates through them and look for any files that are not accepted.

    var allFilesAllowed = true;

    for (var i = 0; i < e.dataTransfer.files.length; i += 1) {
      var file = e.dataTransfer.files[i];

      if (allFilesAllowed) {
        allFilesAllowed = file.name.indexOf(acceptedFiles);

        if (allFilesAllowed < 0) {
          break;
        }
      }
    } // If dragged files are not accepted, this removes them from the value of the input and creates and error state


    if (allFilesAllowed < 0) {
      removeOldPreviews(dropTarget, instructions);
      fileInputEl.value = ''; // eslint-disable-line no-param-reassign

      dropTarget.insertBefore(errorMessage, fileInputEl);
      errorMessage.innerHTML = "Please attach only ".concat(acceptedFiles, " files");
      errorMessage.classList.add(ACCEPTED_FILE_MESSAGE_CLASS);
      dropTarget.classList.add(INVALID_FILE_CLASS);
      e.preventDefault();
      e.stopPropagation();
    }
  }
};
/**
 * When new files are applied to file input, this function generates previews
 * and removes old ones.
 * @param {event} e
 * @param {HTMLElement} fileInputEl - file input element
 * @param {HTMLElement} instructions - text to infrom users to drag or select files
 * @param {HTMLElement} dropTarget - target area div that encases the input
 */


var handleChange = function handleChange(e, fileInputEl, instructions, dropTarget) {
  var fileNames = e.target.files;
  var filePreviewsHeading = document.createElement('div'); // First, get rid of existing previews

  removeOldPreviews(dropTarget, instructions); // Iterates through files list and creates previews

  var _loop = function _loop(i) {
    var reader = new FileReader();
    var fileName = fileNames[i].name; // Starts with a loading image while preview is created

    reader.onloadstart = function createLoadingImage() {
      var imageId = makeSafeForID(fileName);
      var previewImage = "<img id=\"".concat(imageId, "\" src=\"").concat(SPACER_GIF, "\" alt=\"\" class=\"usa-file-input__preview__image  ").concat(LOADING_CLASS, "\"/>");
      instructions.insertAdjacentHTML('afterend', "<div class=\"".concat(PREVIEW_CLASS, "\" aria-hidden=\"true\">").concat(previewImage).concat(fileName, "<div>"));
    }; // Not all files will be able to generate previews. In case this happens, we provide several types "generic previews" based on the file extension.


    reader.onloadend = function createFilePreview() {
      var imageId = makeSafeForID(fileName);
      var previewImage = document.getElementById(imageId);

      if (fileName.indexOf('.pdf') > 0) {
        previewImage.setAttribute('onerror', "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(PDF_PREVIEW_CLASS, "\")"));
      } else if (fileName.indexOf('.doc') > 0 || fileName.indexOf('.pages') > 0) {
        previewImage.setAttribute('onerror', "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(WORD_PREVIEW_CLASS, "\")"));
      } else if (fileName.indexOf('.xls') > 0 || fileName.indexOf('.numbers') > 0) {
        previewImage.setAttribute('onerror', "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(EXCEL_PREVIEW_CLASS, "\")"));
      } else if (fileName.indexOf('.mov') > 0 || fileName.indexOf('.mp4') > 0) {
        previewImage.setAttribute('onerror', "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(VIDEO_PREVIEW_CLASS, "\")"));
      } else {
        previewImage.setAttribute('onerror', "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(GENERIC_PREVIEW_CLASS, "\")"));
      } // Removes loader and displays preview


      previewImage.classList.remove(LOADING_CLASS);
      previewImage.src = reader.result;
    };

    if (fileNames[i]) {
      reader.readAsDataURL(fileNames[i]);
    } // Adds heading above file previews, pluralizes if there are multiple


    if (i === 0) {
      dropTarget.insertBefore(filePreviewsHeading, instructions);
      filePreviewsHeading.innerHTML = 'Selected file <span class="usa-file-input__choose">Change file</span>';
    } else if (i >= 1) {
      dropTarget.insertBefore(filePreviewsHeading, instructions);
      filePreviewsHeading.innerHTML = "".concat(i + 1, " files selected <span class=\"usa-file-input__choose\">Change files</span>");
    } // Hides null state content and sets preview heading class


    if (filePreviewsHeading) {
      instructions.classList.add(HIDDEN_CLASS);
      filePreviewsHeading.classList.add(PREVIEW_HEADING_CLASS);
    }
  };

  for (var i = 0; i < fileNames.length; i += 1) {
    _loop(i);
  }
};

var fileInput = behavior({}, {
  init: function init(root) {
    select(DROPZONE, root).forEach(function (fileInputEl) {
      var _buildFileInput = buildFileInput(fileInputEl),
          instructions = _buildFileInput.instructions,
          dropTarget = _buildFileInput.dropTarget;

      dropTarget.addEventListener('dragover', function handleDragOver() {
        this.classList.add(DRAG_CLASS);
      }, false);
      dropTarget.addEventListener('dragleave', function handleDragLeave() {
        this.classList.remove(DRAG_CLASS);
      }, false);
      dropTarget.addEventListener('drop', function handleDrop(e) {
        preventInvalidFiles(e, fileInputEl, instructions, dropTarget);
        this.classList.remove(DRAG_CLASS);
      }, false);

      fileInputEl.onchange = function (e) {
        // eslint-disable-line no-param-reassign
        handleChange(e, fileInputEl, instructions, dropTarget);
      };
    });
  }
});
module.exports = fileInput;
//# sourceMappingURL=file-input.js.map
