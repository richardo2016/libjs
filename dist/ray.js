(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ray", [], factory);
	else if(typeof exports === 'object')
		exports["ray"] = factory();
	else
		root["ray"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["group"] = group;
function group() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = options || {},
      _ref$rowCount = _ref.rowCount,
      rowCount = _ref$rowCount === undefined ? 2 : _ref$rowCount,
      _ref$fixLast = _ref.fixLast,
      fixLast = _ref$fixLast === undefined ? false : _ref$fixLast,
      _ref$fixUnit = _ref.fixUnit,
      fixUnit = _ref$fixUnit === undefined ? undefined : _ref$fixUnit,
      newArr = [],
      group = [];

  var arrLen = arr.length;
  for (var i = 0; i < arrLen; i++) {
    group.push(arr[i]);
    if (group.length === rowCount || i === arr.length - 1) {
      newArr.push(group);
      group = [];
    }
  }

  if (fixLast) {
    var lastArr = newArr[newArr.length - 1];
    if (lastArr && lastArr.length < rowCount) {
      while (lastArr.length < rowCount) {
        lastArr.push(fixUnit);
      }

      newArr[newArr.length - 1] = lastArr;
    }
  }

  return newArr;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["curry"] = curry;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function curry(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length >= fn.length) {
    return fn.apply(undefined, args);
  }
  return function curriedFn() {

    if (args.length >= fn.length) {
      return fn.apply(undefined, args);
    }

    for (var _len2 = arguments.length, __in_args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      __in_args[_key2] = arguments[_key2];
    }

    var new_args = [].concat(args, __in_args);

    if (new_args.length >= fn.length) {
      return fn.apply(undefined, _toConsumableArray(new_args));
    }

    return function () {
      for (var _len3 = arguments.length, fix_args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        fix_args[_key3] = arguments[_key3];
      }

      return curry.apply(undefined, [fn].concat(_toConsumableArray(new_args), fix_args));
    };
  };
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["list2keymirror"] = list2keymirror;
/* harmony export (immutable) */ __webpack_exports__["foreachObject"] = foreachObject;
/* harmony export (immutable) */ __webpack_exports__["filterObject"] = filterObject;
/* harmony export (immutable) */ __webpack_exports__["ofObject"] = ofObject;
/* harmony export (immutable) */ __webpack_exports__["view"] = view;
/* harmony export (immutable) */ __webpack_exports__["viewField"] = viewField;
/* harmony export (immutable) */ __webpack_exports__["ofChangeable"] = ofChangeable;
/* harmony export (immutable) */ __webpack_exports__["solidifyObj"] = solidifyObj;
/* harmony export (immutable) */ __webpack_exports__["secretObj"] = secretObj;
/* harmony export (immutable) */ __webpack_exports__["getFreezedPropertyFromObj"] = getFreezedPropertyFromObj;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkItemObjs", function() { return checkItemObjs; });
/* harmony export (immutable) */ __webpack_exports__["mapObjects"] = mapObjects;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function corceObject(obj) {
  if (obj === null) return {};

  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    console.warn('non-empty object expected');
    return;
  }
  return obj;
}

function list2keymirror() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments[1];

  if (!Array.isArray(list)) return;
  var keymirror = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      keymirror[key] = key;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return keymirror;
}

function foreachObject(object, callback) {
  var _self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

  object = corceObject(object);
  if (!object) return;

  for (var key in object) {
    callback.apply(_self, [object[key], key, object]);
  }
}

function filterObject(obj, options) {
  obj = corceObject(obj);
  if (!obj) return;

  if (options instanceof Array) {
    options = { dropKeys: options };
  }

  var _ref = options || {},
      _ref$leaveKeys = _ref.leaveKeys,
      leaveKeys = _ref$leaveKeys === undefined ? [] : _ref$leaveKeys,
      _ref$dropKeys = _ref.dropKeys,
      dropKeys = _ref$dropKeys === undefined ? [] : _ref$dropKeys;

  if (!leaveKeys.length) {
    for (var key in obj) {
      if (dropKeys.includes(key)) {
        delete obj[key];
      }
    }
  } else {
    for (var _key in obj) {
      if (!leaveKeys.includes(_key)) {
        delete obj[_key];
      }
    }
  }
}

function ofObject(value, obj, options) {
  var ofIt = false,
      _ref2 = options || {},
      _ref2$strict = _ref2.strict,
      strict = _ref2$strict === undefined ? true : _ref2$strict;
  for (var key in obj) {
    if (!strict && value == obj[key] || value === obj[key]) {
      ofIt = true;
      break;
    }
  }

  return ofIt;
}

function view(object) {
  return Object.getOwnPropertyDescriptors(object);
}

function viewField(object, property) {
  return Object.getOwnPropertyDescriptor(object, property);
}

function ofChangeable(object, property) {
  return view(object, property).writable;
}

function secretifyObjectProperty(object, property) {
  var descriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  object = corceObject(object);
  if (!object) return;

  var _ref3 = descriptor || {},
      value = _ref3.value,
      _ref3$configurable = _ref3.configurable,
      configurable = _ref3$configurable === undefined ? false : _ref3$configurable,
      _ref3$writable = _ref3.writable,
      writable = _ref3$writable === undefined ? false : _ref3$writable;

  if (!Object.defineProperty || !Object.getOwnPropertyDescriptor) {
    object[property] = value;
    return object;
  }

  var prop_descriptor = Object.getOwnPropertyDescriptor(object, property);
  var new_descriptor = { value: value === undefined ? object[property] : value, enumerable: false, configurable: configurable, writable: writable };

  if (object.hasOwnProperty(property)) {
    if (prop_descriptor.writable) {
      object[property] = value;
      Object.defineProperty(object, property, new_descriptor);
    }
  } else {
    Object.defineProperty(object, property, new_descriptor);
  }
  return object;
}

function solidifyObj(object, property) {
  var descriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  descriptor = _extends({}, descriptor, {
    configurable: false,
    writable: false
  });

  return secretifyObjectProperty(object, property, descriptor);
}

function secretObj(object, property) {
  var descriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  descriptor = _extends({}, descriptor, {
    configurable: true,
    writable: true
  });

  return secretifyObjectProperty(object, property, descriptor);
}

function getFreezedPropertyFromObj(obj) {
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var propertiesObj = {};
  for (var propertyKey in properties) {
    if (obj.hasOwnProperty(propertyKey)) {
      propertiesObj[propertyKey] = obj[propertyKey];
    }
  }

  return propertiesObj;
}

function trimItemContent() {
  var itemStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return itemStr.trim();
}

var checkItemObjs = function checkItemObjs(itemObjs, options) {
  var result = {
    repeat_elems: [],
    repeat: false,
    empty: true,
    invalid: false
  },
      _ref4 = options || {},
      _ref4$onCheckValid = _ref4.onCheckValid,
      onCheckValid = _ref4$onCheckValid === undefined ? function () {
    return true;
  } : _ref4$onCheckValid,
      _ref4$onFindRepeat = _ref4.onFindRepeat,
      onFindRepeat = _ref4$onFindRepeat === undefined ? function (_ref5) {
    var itemObj = _ref5.itemObj,
        itemObjs = _ref5.itemObjs;

    var found_index = itemObjs.indexOf(itemObjs);
    return found_index > -1 && { found_index: found_index };
  } : _ref4$onFindRepeat,
      _ref4$onCheckRepeat = _ref4.onCheckRepeat,
      onCheckRepeat = _ref4$onCheckRepeat === undefined ? function (_ref6) {
    var itemObjs = _ref6.itemObjs,
        index = _ref6.index;

    var repeat = false,
        itemObj = itemObjs[index],
        found = onFindRepeat({ itemObj: itemObj, itemObjs: itemObjs });

    return !found && { indexes: [found, index], itemObj: itemObj };
  } : _ref4$onCheckRepeat,
      _ref4$onTryToKeepEmpt = _ref4.onTryToKeepEmpty,
      onTryToKeepEmpty = _ref4$onTryToKeepEmpt === undefined ? function (item) {
    return trimItemContent(item).length === 0;
  } : _ref4$onTryToKeepEmpt;
  for (var index in itemObjs) {
    var itemObj = itemObjs[index];

    if (result.empty) {
      result.empty = onTryToKeepEmpty(itemObjs[index]);
    }

    if (!result.repeat) {
      result.repeat = onCheckRepeat({ itemObjs: itemObjs, index: index });
      if (result.repeat) {
        result.repeat_elems.push(itemObjs[index]);
      }
    }

    if (!result.invalid) {
      result.invalid = !onCheckValid(itemObjs[index]);
    }
  }

  return result;
};

function mapObjects(items) {
  var handleEmptyItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_ref7) {
    var itemObj = _ref7.itemObj;
    return itemObj;
  };

  if (items.length <= 1) {
    return items;
  }

  for (var index in items) {
    var properties = Object.keys(items[index]);

    if (properties.length <= 1 && !trimItemContent(items[index].content)) {
      items[index] = handleEmptyItem({ itemObj: items[index], properties: properties, index: index });
    }
  }

  return items.filter(function (x) {
    return x;
  });
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ref = global || window || {},
    _ref$DEBUG = _ref.DEBUG,
    DEBUG = _ref$DEBUG === undefined ? true : _ref$DEBUG;

var Logger = function () {
  function Logger(level) {
    _classCallCheck(this, Logger);

    if (level === undefined) {
      level = DEBUG ? 'debug' : 'info';
    }
    this.level = level;
  }

  _createClass(Logger, [{
    key: 'debug',
    value: function debug() {
      if (this.level === 'debug') {
        var _console;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_console = console).debug.apply(_console, [this.time()].concat(args));
      }
    }
  }, {
    key: 'info',
    value: function info() {
      if (this.level === 'debug' || this.level === 'info') {
        var _console2;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        (_console2 = console).info.apply(_console2, [this.time()].concat(args));
      }
    }
  }, {
    key: 'warn',
    value: function warn() {
      if (this.level === 'debug' || this.level === 'info' || this.level === 'warn') {
        var _console3;

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        (_console3 = console).warn.apply(_console3, [this.time()].concat(args));
      }
    }
  }, {
    key: 'error',
    value: function error() {
      var _console4;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      (_console4 = console).error.apply(_console4, [this.time()].concat(args));
    }
  }, {
    key: 'time',
    value: function time() {
      var d = new Date();
      return d.toTimeString().substring(0, 8) + '.' + d.getMilliseconds();
    }
  }]);

  return Logger;
}();

/* harmony default export */ __webpack_exports__["default"] = (new Logger());
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(16)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "list", function() { return list; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keymirror", function() { return keymirror; });
var list = [];
var keymirror = {};

var lowerA = 'a'.charCodeAt(0);
var upperA = 'A'.charCodeAt(0);

for (var index = 0; index < 26; index++) {
    var lower_asc_code = lowerA + index,
        lower_char = String.fromCharCode(lower_asc_code);

    var upper_asc_code = upperA + index,
        upper_char = String.fromCharCode(upper_asc_code);

    list.push(lower_char);
    list.unshift(upper_char);

    keymirror[lower_char] = lower_asc_code;
    keymirror[lower_asc_code] = lower_char;
    keymirror[upper_char] = upper_asc_code;
    keymirror[upper_asc_code] = upper_char;
}

/* harmony default export */ __webpack_exports__["default"] = (keymirror);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause': 19,
  'break': 19,
  'caps_lock': 20,
  'escape': 27,
  'space': 32,
  'page_up': 33,
  'page_down': 34,
  'end': 35,
  'home': 36,
  'left_arrow': 37,
  'up_arrow': 38,
  'right_arrow': 39,
  'down_arrow': 40,
  'insert': 45,
  'delete': 46,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90,
  'left_window_key': 91,
  'right_window_key': 92,
  'select_key': 93,
  'numpad0': 96,
  'numpad1': 97,
  'numpad2': 98,
  'numpad3': 99,
  'numpad4': 100,
  'numpad5': 101,
  'numpad6': 102,
  'numpad7': 103,
  'numpad8': 104,
  'numpad9': 105,
  'multiply': 106,
  'add': 107,
  'subtract': 109,
  'decimal_point': 110,
  'divide': 111,
  'f1': 112,
  'f2': 113,
  'f3': 114,
  'f4': 115,
  'f5': 116,
  'f6': 117,
  'f7': 118,
  'f8': 119,
  'f9': 120,
  'f10': 121,
  'f11': 122,
  'f12': 123,
  'num_lock': 144,
  'scroll_lock': 145,
  'semi_colon': 186,
  'equal_sign': 187,
  'comma': 188,
  'dash': 189,
  'period': 190,
  'forward_slash': 191,
  'grave_accent': 192,
  'open_bracket': 219,
  'back_slash': 220,
  'close_braket': 221,
  'single_quote': 222
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(15);
/* harmony export (immutable) */ __webpack_exports__["coerceNumber"] = coerceNumber;


function coerceNumber(value) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0____["a" /* coerce */])({ value: value, type: __WEBPACK_IMPORTED_MODULE_0____["b" /* types */].number });
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["coerceString"] = coerceString;
/* harmony export (immutable) */ __webpack_exports__["capitalize"] = capitalize;
/* harmony export (immutable) */ __webpack_exports__["kebab2camel"] = kebab2camel;
/* harmony export (immutable) */ __webpack_exports__["camel2kebab"] = camel2kebab;
/* harmony export (immutable) */ __webpack_exports__["underscore2camel"] = underscore2camel;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_2camel", function() { return _2camel; });
/* harmony export (immutable) */ __webpack_exports__["camel2underscore"] = camel2underscore;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camel2_", function() { return camel2_; });

function coerceString(string) {
  if (!string) string = String(string).toString();
  if (typeof string !== 'string') string = string.toString();
  if (!string.length) return '';
  return string;
}

function capitalize(string) {
  if (!(string = coerceString(string))) return string;
  return string[0].toUpperCase() + string.slice(1);
}

function kebab2camel(string) {
  if (!(string = coerceString(string))) return string;
  return string.replace(/-(.)?/g, function (match, p1, offset, wholeStr) {
    return p1 ? p1.toUpperCase() : '';
  });
}

function camel2kebab(string, options) {
  if (!(string = coerceString(string))) return string;
  return string.replace(/[A-Z]{1}/g, function (match, offset, wholeStr) {
    if (offset === 0) return match.toLowerCase();
    return '-' + match.toLowerCase();
  });
}

function underscore2camel(string) {
  if (!(string = coerceString(string))) return string;
  return string.replace(/_(.)?/g, function (match, p1, offset, wholeStr) {
    return p1 ? p1.toUpperCase() : '';
  });
}
var _2camel = underscore2camel;

function camel2underscore(string, options) {
  if (!(string = coerceString(string))) return string;
  return string.replace(/[A-Z]{1}/g, function (match, offset, wholeStr) {
    if (offset === 0) return match.toLowerCase();
    return '_' + match.toLowerCase();
  });
}
var camel2_ = camel2underscore;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["importDirectories"] = importDirectories;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function importDirectories() {
  var webpackRequireContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments[1];

  var direcotry = {};

  var _ref = options || {},
      _ref$matchReg = _ref.matchReg,
      matchReg = _ref$matchReg === undefined ? /\.\/(.*)\.(j|t)s$/ : _ref$matchReg,
      _ref$excludeFilePatte = _ref.excludeFilePatterns,
      excludeFilePatterns = _ref$excludeFilePatte === undefined ? [] : _ref$excludeFilePatte,
      _ref$keepWebpackConte = _ref.keepWebpackContext,
      keepWebpackContext = _ref$keepWebpackConte === undefined ? false : _ref$keepWebpackConte,
      fileNameFilter = _ref.fileNameFilter,
      filterModule = _ref.filterModule;

  var callbackNewModule = typeof filterModule === 'function';
  webpackRequireContext.keys().forEach(function (fileKey) {
    var _ref2 = fileKey.match(matchReg) || [],
        _ref3 = _slicedToArray(_ref2, 2),
        _ = _ref3[0],
        fileName = _ref3[1];

    if (!fileName) {
      console.warn('no fileName matched by regex ' + matchReg + ' for \'' + fileKey + '\'');
      return;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = excludeFilePatterns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var pattern = _step.value;

        switch (typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) {
          case 'string':
            if (fileName === pattern) {
              return;
            }
            break;
          case 'object':
            if (pattern instanceof RegExp && pattern.test(fileName)) {
              return;
            }
            break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var origName = void 0,
        newName = origName = fileName;
    if (typeof fileNameFilter === 'function') {
      newName = fileNameFilter(origName);
    }

    direcotry[newName] = !keepWebpackContext ? _extends({}, webpackRequireContext(fileKey)) : webpackRequireContext(fileKey);
    if (callbackNewModule) {
      var newModule = filterModule({ newName: newName, origName: origName, module: direcotry[newName] });
      if (newModule) {
        direcotry[newName] = newModule;
      }
    }
  });

  return direcotry;
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["mixinListIterator"] = mixinListIterator;
/* harmony export (immutable) */ __webpack_exports__["iteratorable"] = iteratorable;
/* harmony export (immutable) */ __webpack_exports__["enumHash"] = enumHash;
/* harmony export (immutable) */ __webpack_exports__["enumNumHash"] = enumNumHash;
/* harmony export (immutable) */ __webpack_exports__["enumKeyMirror"] = enumKeyMirror;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function mixinListIterator(options) {
  var _ref = options || {},
      _ref$list = _ref.list,
      list = _ref$list === undefined ? [] : _ref$list,
      generator = _ref.generator,
      yieldIt = _ref.yieldIt;

  yieldIt = yieldIt || function (_ref2) {
    var index = _ref2.index,
        list = _ref2.list;
    return list[index];
  };

  generator = generator || regeneratorRuntime.mark(function _callee() {
    var index, len;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            index = 0, len = list.length;

          case 1:
            if (!(index < len)) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return yieldIt({ list: list, index: index++ });

          case 4:
            _context.next = 1;
            break;

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });

  list[Symbol.iterator] = generator;
  return list;
}

function iteratorable(object) {
  if (object === null || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
    return false;
  }

  return Object.getOwnPropertySymbols(object).indexOf(Symbol.iterator) > -1;
}

function enumHash(obj, options) {
  var enumPayload = {},
      _ref3 = options || {},
      _ref3$keepNumber = _ref3.keepNumber,
      keepNumber = _ref3$keepNumber === undefined ? false : _ref3$keepNumber;
  for (var key in obj) {
    var value = obj[key];
    if (value === undefined || value === null) {
      console.warn('invalid value "' + value + '" in source object, check it');
      value = String(value);
      continue;
    }
    if (keepNumber) {
      var temp = void 0;

      key = isNaN(temp = parseInt(key)) ? key : temp;
      value = isNaN(temp = parseInt(value)) ? value : temp;
    }
    enumPayload[enumPayload[key] = value] = key;
  }
  return enumPayload;
}

function enumNumHash(obj) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options.keepNumber = true;
  return enumHash(obj, options);
}

function enumKeyMirror(entries) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((typeof entries === 'undefined' ? 'undefined' : _typeof(entries)) !== 'object') return;

  var enumPayload = {},
      _options$keepExist = options.keepExist,
      keepExist = _options$keepExist === undefined ? false : _options$keepExist;
  if (!Array.isArray(entries)) {
    for (var key in entries) {
      if (!entries.hasOwnProperty(key) || !keepExist) enumPayload[enumPayload[key] = key] = key;
    }
  } else {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        if (!entries.hasOwnProperty(value) || !keepExist) enumPayload[enumPayload[value] = value] = value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return enumPayload;
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearMapValue", function() { return clearMapValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearMap", function() { return clearMap; });
var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clearMapValue = function () {
  function clearMapValue() {
    _classCallCheck(this, clearMapValue);
  }

  _createClass(clearMapValue, [{
    key: '_destroy',
    value: function _destroy() {}
  }]);

  return clearMapValue;
}();

var clearMap = function (_Map) {
  _inherits(clearMap, _Map);

  function clearMap() {
    _classCallCheck(this, clearMap);

    return _possibleConstructorReturn(this, (clearMap.__proto__ || Object.getPrototypeOf(clearMap)).apply(this, arguments));
  }

  _createClass(clearMap, [{
    key: 'clear',
    value: function clear() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          if (typeof value._destroy === 'function') {
            value._destroy();
          }

          value = null;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      _get(clearMap.prototype.__proto__ || Object.getPrototypeOf(clearMap.prototype), 'clear', this).call(this);
    }
  }]);

  return clearMap;
}(Map);

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports.builtin = {
  array: __webpack_require__(2),
  object: __webpack_require__(4),
  function: __webpack_require__(3)
};
exports.array = exports.builtin.array;
exports.object = exports.builtin.object;
exports.function = exports.builtin.function;

exports.primitive = {
  number: __webpack_require__(8),
  string: __webpack_require__(9)
};
exports.number = exports.primitive.number;
exports.string = exports.primitive.string;

exports.struct = {
  iterator: __webpack_require__(11),
  map: __webpack_require__(12)
};

exports.webpack = __webpack_require__(10);
exports.logger = __webpack_require__(5);
exports.constant = {
  alphabet: __webpack_require__(6),
  keycode: __webpack_require__(7)
};

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return types; });
/* harmony export (immutable) */ __webpack_exports__["a"] = coerce;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var types = {
  number: 'number',
  undefined: 'undefined',
  string: 'string',
  boolean: 'boolean',
  object: 'object'
};

function coerce(_ref) {
  var value = _ref.value,
      type = _ref.type,
      params = _objectWithoutProperties(_ref, ['value', 'type']);

  if (!types.hasOwnProperty(type)) {
    console.warn('invalid primitive type given: ' + type);
    return;
  }

  var _type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  switch (type) {
    default:
    case types.object:
      break;
    case types.undefined:
      return undefined;
    case types.number:
      if (_type === types.number && !isNaN(value)) return value;
      value = parseFloat(value);
      return !isNaN(value) ? value : undefined;
    case types.string:
      value = value && value.toString();
      return value;
    case types.boolean:
      return !!value;
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});
//# sourceMappingURL=ray.js.map