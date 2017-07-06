(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("rayjs", [], factory);
	else if(typeof exports === 'object')
		exports["rayjs"] = factory();
	else
		root["rayjs"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 120);
/******/ })
/************************************************************************/
/******/ ({

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["divideIntoGroup"] = divideIntoGroup;
function divideIntoGroup() {
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

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_object_js__ = __webpack_require__(121);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterObj", function() { return filterObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "solidObj", function() { return solidObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "secretObj", function() { return secretObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "secretifyObj", function() { return secretifyObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetObjPropertyQuietly", function() { return SetObjPropertyQuietly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFreezedPropertyFromObj", function() { return getFreezedPropertyFromObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrArray2Object", function() { return StrArray2Object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimItemContent", function() { return trimItemContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkItemObjs", function() { return checkItemObjs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterItemObjs", function() { return filterItemObjs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forceObj", function() { return forceObj; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var filterObj = function filterObj(obj, options) {
  if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    console.warn('non-empty object expected', 'warn');
    return obj;
  }

  if (options instanceof Array) {
    options = { catchKeys: options };
  }

  var _ref = options || {},
      _ref$leaveKeys = _ref.leaveKeys,
      leaveKeys = _ref$leaveKeys === undefined ? [] : _ref$leaveKeys,
      _ref$catchKeys = _ref.catchKeys,
      catchKeys = _ref$catchKeys === undefined ? [] : _ref$catchKeys;

  for (var key in obj) {
    if (catchKeys.indexOf(key) > -1 && leaveKeys.indexOf(key) === -1) {
      delete obj[key];
    }
  }
};
var solidObj = function solidObj(obj, propertyName, value, options) {
  return __WEBPACK_IMPORTED_MODULE_0__node_object_js__["a" /* solidifyObj */](obj, propertyName, value, options);
};

var secretObj = __WEBPACK_IMPORTED_MODULE_0__node_object_js__["b" /* secretObj */];
var secretifyObj = __WEBPACK_IMPORTED_MODULE_0__node_object_js__["c" /* secretifyObj */];

var SetObjPropertyQuietly = __WEBPACK_IMPORTED_MODULE_0__node_object_js__["b" /* secretObj */];

var getFreezedPropertyFromObj = __WEBPACK_IMPORTED_MODULE_0__node_object_js__["d" /* getFreezedPropertyFromObj */];

var StrArray2Object = function StrArray2Object(arr, options) {
  var _ref2 = options || {},
      _ref2$mainKeys = _ref2.mainKeys,
      mainKeys = _ref2$mainKeys === undefined ? [] : _ref2$mainKeys;

  var hasMainKeys = mainKeys.length;

  var object = arr.map(function (elem) {
    if (typeof elem === 'string' && mainKeys.indexOf(elem) === -1) {
      return _defineProperty({}, elem, elem);
    }
  }).filter(function (x) {
    return x;
  });

  return hasMainKeys ? {
    object: object,
    mainKeys: mainKeys
  } : object;
};

var trimItemContent = function trimItemContent() {
  var itemStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return itemStr.trim();
};

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

var filterItemObjs = function filterItemObjs(itemObjs) {
  var filterFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_ref7) {
    var itemObj = _ref7.itemObj;
    return itemObj;
  };

  if (itemObjs.length <= 1) {
    return itemObjs;
  }

  for (var index in itemObjs) {
    var properties = Object.keys(itemObjs[index]);

    if (properties.length <= 1 && !trimItemContent(itemObjs[index].content)) {
      itemObjs[index] = filterFunc({ itemObj: itemObjs[index], properties: properties, index: index });
    }
  }

  return itemObjs.filter(function (x) {
    return x;
  });
};

var forceObj = function forceObj() {};

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["coerceString"] = coerceString;
/* harmony export (immutable) */ __webpack_exports__["capitalize"] = capitalize;
/* harmony export (immutable) */ __webpack_exports__["kebab2camel"] = kebab2camel;
/* harmony export (immutable) */ __webpack_exports__["camel2kebab"] = camel2kebab;

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

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

exports.array = __webpack_require__(116);
exports.object = __webpack_require__(117);
exports.iterator = __webpack_require__(125);
exports.flux = __webpack_require__(127);
exports.string = __webpack_require__(118);

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return secretifyObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return solidifyObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return secretObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getFreezedPropertyFromObj; });
/* unused harmony export valueInObject */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var secretifyObj = function secretifyObj(obj, propertyName, value, options) {
  var _ref = options || {},
      descriptor = _ref.descriptor,
      _ref$lteIE = _ref.lteIE8,
      lteIE8 = _ref$lteIE === undefined ? false : _ref$lteIE,
      _ref2 = descriptor || {},
      _ref2$configurable = _ref2.configurable,
      configurable = _ref2$configurable === undefined ? false : _ref2$configurable,
      _ref2$writable = _ref2.writable,
      writable = _ref2$writable === undefined ? false : _ref2$writable;

  if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    if (lteIE8) {
      obj[propertyName] = value;
      return obj;
    }

    var obj_descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
    var new_descriptor = { value: value === undefined ? obj[propertyName] : value, enumerable: false, configurable: configurable, writable: writable };

    if (obj.hasOwnProperty(propertyName)) {
      if (obj_descriptor.writable) {
        obj[propertyName] = value;
        Object.defineProperty(obj, propertyName, new_descriptor);
      }
    } else {
      Object.defineProperty(obj, propertyName, new_descriptor);
    }
  }
  return obj;
};

var solidifyObj = function solidifyObj() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _ref3 = args[3] || {},
      descriptor = _ref3.descriptor;

  args[3] = _extends({}, args[3], {
    descriptor: _extends({}, descriptor, {
      configurable: false,
      writable: false
    })
  });
};

var secretObj = function secretObj() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var _ref4 = args[3] || {},
      descriptor = _ref4.descriptor;

  args[3] = _extends({}, args[3], {
    descriptor: _extends({}, descriptor, {
      configurable: true,
      writable: true
    })
  });

  return secretifyObj.apply(undefined, args);
};

var getFreezedPropertyFromObj = function getFreezedPropertyFromObj(obj) {
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var propertiesObj = {};
  for (var propertyKey in properties) {
    if (obj.hasOwnProperty(propertyKey)) {
      propertiesObj[propertyKey] = obj[propertyKey];
    }
  }

  return propertiesObj;
};

function valueInObject(value, obj, options) {
  var inIt = false,
      _ref5 = options || {},
      _ref5$strict = _ref5.strict,
      strict = _ref5$strict === undefined ? true : _ref5$strict;
  for (var key in obj) {
    if (!strict && value.toString() === obj[key].toString() || value === obj[key]) {
      inIt = true;
      break;
    }
  }

  return inIt;
}

/***/ }),

/***/ 125:
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

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixMObject", function() { return fixMObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefixer", function() { return prefixer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "suffixer", function() { return suffixer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefixTypes", function() { return prefixTypes; });
/* harmony export (immutable) */ __webpack_exports__["relPathToNsAndModuleKey"] = relPathToNsAndModuleKey;
/* harmony export (immutable) */ __webpack_exports__["ensureMObject"] = ensureMObject;
/* harmony export (immutable) */ __webpack_exports__["noHashAddon"] = noHashAddon;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeTypesAndMutationsOfExportContent", function() { return normalizeTypesAndMutationsOfExportContent; });
/* harmony export (immutable) */ __webpack_exports__["normalizeGettersAndActionsOfExportContent"] = normalizeGettersAndActionsOfExportContent;
/* harmony export (immutable) */ __webpack_exports__["namedGetter"] = namedGetter;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fixMObject = function fixMObject(M, _ref) {
  var module_key = _ref.module_key,
      _ref$namespace = _ref.namespace,
      namespace = _ref$namespace === undefined ? '' : _ref$namespace,
      MGetter = _ref.MGetter,
      _ref$delimeter = _ref.delimeter,
      delimeter = _ref$delimeter === undefined ? '/' : _ref$delimeter;

  M.GETTER_KEY = module_key;
  M.MODULE_PREIX = '' + module_key + delimeter;
  M.PREFIX = M.MODULE_PREIX;
  M.NAMESPACE = namespace || module_key;
  M.namedGetter = namedGetter;

  if (MGetter) M.MGetter = MGetter;
  if (typeof M.initializer === 'function') M.initializer({ module_key: module_key, prefix: M.PREFIX, namespace: M.NAMESPACE });
  return M;
};

var prefixer = function prefixer(_ref2) {
  var module_name = _ref2.module_name,
      module_prefix = _ref2.module_prefix;

  if (typeof module_prefix === 'string') {
    module_name = module_prefix + module_name;
  }
  return module_name;
};

var suffixer = function suffixer(_ref3) {
  var module_name = _ref3.module_name,
      module_suffix = _ref3.module_suffix;

  if (typeof module_suffix === 'string') {
    module_name += module_suffix;
  }
  return module_name;
};

var prefixTypes = function prefixTypes(options) {
  var types = options.types,
      _options$prefix = options.prefix,
      prefix = _options$prefix === undefined ? '' : _options$prefix,
      _options$onGenNewkey = options.onGenNewkey,
      onGenNewkey = _options$onGenNewkey === undefined ? function () {} : _options$onGenNewkey;

  if (!types) return;

  if (prefix[prefix.length - 1] !== '_') {
    prefix += '_';
  }

  if (typeof onGenNewkey !== 'function') {
    console.error('onGenNewkey must be one generator function');
    return;
  }

  for (var type_key in types) {
    var old_type = types[type_key],
        new_type = prefix + old_type;
    types[type_key] = new_type;
    onGenNewkey({ type_key: type_key, old_type: old_type, new_type: new_type });
  }

  return types;
};

function relPathToNsAndModuleKey(relFilePath, options) {
  var _ref4 = options || {},
      filter = _ref4.filter,
      filterNamespace = _ref4.filterNamespace,
      filterModuleKey = _ref4.filterModuleKey,
      _ref4$module_prefix = _ref4.module_prefix,
      module_prefix = _ref4$module_prefix === undefined ? '' : _ref4$module_prefix,
      _ref4$module_suffix = _ref4.module_suffix,
      module_suffix = _ref4$module_suffix === undefined ? '' : _ref4$module_suffix;

  var namespace = relFilePath;

  if (namespace.indexOf('./') === 0) {
    namespace = namespace.substr('./'.length);
  }

  var extensionPos = namespace.length - '.js'.length;
  if (namespace.substr(extensionPos) === '.js') {
    namespace = namespace.substr(0, extensionPos);
  }

  if (typeof filterNamespace === 'function') {
    namespace = filterNamespace(namespace);
  }

  var module_key = namespace.replace('/', '.');

  if (typeof filterModuleKey === 'function') {
    module_key = filterModuleKey(module_key);
  }

  if (module_prefix) {
    module_key = prefixer({ module_name: module_key, module_prefix: module_prefix });
    namespace = prefixer({ module_name: namespace, module_prefix: module_prefix });
  }
  if (module_suffix) {
    module_key = suffixer({ module_name: module_key, module_suffix: module_suffix });
    namespace = suffixer({ module_name: namespace, module_suffix: module_suffix });
  }

  var module_descriptor = { module_key: module_key, namespace: namespace };

  if (typeof filter === 'function') filter(module_descriptor);
  return module_descriptor;
}

function ensureMObject(_ref5) {
  var exportContent = _ref5.exportContent;

  if (_typeof(exportContent.M) !== 'object') {
    console.warn('no valid \'M\' object found for exportContent.it would be fixed by being assigned one empty/plain object');
    exportContent.M = {};
  }
  return exportContent;
}

function noHashAddon(obj, _ref6) {
  var origKey = _ref6.origKey,
      newKey = _ref6.newKey,
      _ref6$addon_type = _ref6.addon_type,
      addon_type = _ref6$addon_type === undefined ? 'module_addon' : _ref6$addon_type;

  obj.noHash = {
    name: origKey,
    origKey: origKey,
    newKey: newKey,
    addon_type: addon_type
  };
}

var normalizeTypesAndMutationsOfExportContent = function normalizeTypesAndMutationsOfExportContent(_ref7) {
  var exportContent = _ref7.exportContent,
      onNewMutation = _ref7.onNewMutation;

  ensureMObject({ exportContent: exportContent });

  var types = void 0,
      mutations = void 0,
      typeFromM = false;

  if (_typeof(exportContent.types) === 'object') {
    types = exportContent.types;
  } else if (_typeof(exportContent.M.types) === 'object') {
    types = exportContent.M.types;
    typeFromM = true;
  } else {
    console.warn('no valid \'types\' Object found in exports of module:\'' + exportContent.M.GETTER_KEY + '\'or its \'M\' object.\nit would be fixedby being assigned \'types\' to its \'M\' object.    ');
  }

  if ((typeof types === 'undefined' ? 'undefined' : _typeof(types)) === 'object') {
    mutations = {};
    var callback = typeof onNewMutation === 'function';
    prefixTypes({
      types: types,
      prefix: exportContent.M.MODULE_PREIX,
      onGenNewkey: !exportContent.mutations ? function () {} : function (_ref8) {
        var type_key = _ref8.type_key,
            old_type = _ref8.old_type,
            new_type = _ref8.new_type;

        if (exportContent.mutations.hasOwnProperty(old_type)) {
          mutations[new_type] = exportContent.mutations[old_type];
          callback && onNewMutation({ rawModule: exportContent, exportContent: exportContent, module_key: exportContent.M.GETTER_KEY, mutation: mutations[new_type], new_type: new_type, old_type: old_type, newKey: new_type, origKey: old_type });
        }
      }
    });

    if (typeFromM) {
      exportContent.M.types = exportContent.types = types;
    } else {
      exportContent.types = exportContent.M.types = types;
    }

    exportContent.mutations = mutations;
  }

  return {
    exportContent: exportContent,
    types: types,
    mutations: mutations
  };
};

function normalizeGettersAndActionsOfExportContent(_ref9) {
  var exportContent = _ref9.exportContent,
      onNewAction = _ref9.onNewAction,
      onNewGetter = _ref9.onNewGetter;

  ensureMObject({ exportContent: exportContent });

  if (exportContent.getters) {
    var getters = {};
    var callback = typeof onNewGetter === 'function';
    Object.keys(exportContent.getters).forEach(function (origKey) {
      var newKey = '' + exportContent.M.MODULE_PREIX + origKey;
      getters[newKey] = exportContent.getters[origKey];
      callback && onNewGetter({ rawModule: exportContent, exportContent: exportContent, module_key: exportContent.M.GETTER_KEY, getter: getters[newKey], newKey: newKey, origKey: origKey });
    });
    exportContent.getters = getters;
  }

  if (exportContent.actions) {
    var actions = {};
    var _callback = typeof onNewAction === 'function';
    Object.keys(exportContent.actions).forEach(function (origKey) {
      var newKey = '' + exportContent.M.MODULE_PREIX + origKey;
      actions[newKey] = exportContent.actions[origKey];
      _callback && onNewAction({ rawModule: exportContent, exportContent: exportContent, module_key: exportContent.M.GETTER_KEY, action: actions[newKey], newKey: newKey, origKey: origKey });
    });
    exportContent.actions = actions;
  }
}

function namedGetter(name) {
  return function (state) {
    return state[name];
  };
}

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

exports.generate = __webpack_require__(128);
exports.module = __webpack_require__(126);

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module__ = __webpack_require__(126);
/* harmony export (immutable) */ __webpack_exports__["genFluxModules"] = genFluxModules;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



var defaultFilterNs = function defaultFilterNs(ns) {
  return ns.replace(/\/index$/, '');
};

var defaultEmpty = function defaultEmpty() {};

function genFluxModulesFromFcHash() {
  var FcHash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments[1];

  var _ref = options || {},
      _ref$modules = _ref.modules,
      modules = _ref$modules === undefined ? {} : _ref$modules,
      _ref$filterNamespace = _ref.filterNamespace,
      filterNamespace = _ref$filterNamespace === undefined ? defaultFilterNs : _ref$filterNamespace,
      _ref$onModuleGenerate = _ref.onModuleGenerate,
      onModuleGenerate = _ref$onModuleGenerate === undefined ? defaultEmpty : _ref$onModuleGenerate,
      _ref$onModuleGenerate2 = _ref.onModuleGenerated,
      onModuleGenerated = _ref$onModuleGenerate2 === undefined ? defaultEmpty : _ref$onModuleGenerate2,
      _ref$prefix = _ref.prefix,
      module_prefix = _ref$prefix === undefined ? '' : _ref$prefix,
      _ref$suffix = _ref.suffix,
      module_suffix = _ref$suffix === undefined ? '' : _ref$suffix,
      _ref$filter = _ref.filter,
      filter = _ref$filter === undefined ? null : _ref$filter,
      cfgs = _objectWithoutProperties(_ref, ['modules', 'filterNamespace', 'onModuleGenerate', 'onModuleGenerated', 'prefix', 'suffix', 'filter']);

  var canfilter = typeof filter === 'function';

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(FcHash)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var _fluxModules$relPathT = __WEBPACK_IMPORTED_MODULE_0__module__["relPathToNsAndModuleKey"](key, { module_prefix: module_prefix, module_suffix: module_suffix, filterNamespace: filterNamespace }),
          namespace = _fluxModules$relPathT.namespace,
          module_key = _fluxModules$relPathT.module_key;

      if (modules.hasOwnProperty(module_key)) {
        console.warn('module ' + module_key + ' has exist in the modules, check your input FcHash object and remove the equivant vuex2-style module file.');
        return;
      }

      var exportContent = _extends({}, FcHash[key]);

      cfgs.module_key = module_key;
      cfgs.namespace = namespace;
      onModuleGenerate({ rawModule: exportContent, module_key: module_key, namespace: namespace });
      bindFluxModule(exportContent, modules, cfgs);
      modules[module_key] && onModuleGenerated(modules[module_key], { exportContent: exportContent, modules: modules, module_key: module_key, namespace: namespace });
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

  return modules;
}

function genFluxModulesFromWebpackCtx() {
  var webpackRequireContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments[1];

  var _ref2 = options || {},
      _ref2$modules = _ref2.modules,
      modules = _ref2$modules === undefined ? {} : _ref2$modules,
      _ref2$filterNamespace = _ref2.filterNamespace,
      filterNamespace = _ref2$filterNamespace === undefined ? defaultFilterNs : _ref2$filterNamespace,
      _ref2$onModuleGenerat = _ref2.onModuleGenerate,
      onModuleGenerate = _ref2$onModuleGenerat === undefined ? defaultEmpty : _ref2$onModuleGenerat,
      _ref2$onModuleGenerat2 = _ref2.onModuleGenerated,
      onModuleGenerated = _ref2$onModuleGenerat2 === undefined ? defaultEmpty : _ref2$onModuleGenerat2,
      _ref2$prefix = _ref2.prefix,
      module_prefix = _ref2$prefix === undefined ? '' : _ref2$prefix,
      _ref2$suffix = _ref2.suffix,
      module_suffix = _ref2$suffix === undefined ? '' : _ref2$suffix,
      cfgs = _objectWithoutProperties(_ref2, ['modules', 'filterNamespace', 'onModuleGenerate', 'onModuleGenerated', 'prefix', 'suffix']);

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {

    for (var _iterator2 = webpackRequireContext.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      if (key === './index.js') {
        return;
      }

      var _fluxModules$relPathT2 = __WEBPACK_IMPORTED_MODULE_0__module__["relPathToNsAndModuleKey"](key, { module_prefix: module_prefix, module_suffix: module_suffix, filterNamespace: filterNamespace }),
          namespace = _fluxModules$relPathT2.namespace,
          module_key = _fluxModules$relPathT2.module_key;

      if (modules.hasOwnProperty(module_key)) {
        console.warn('module ' + module_key + ' has exist in the modules, check your input webpackRequireContext object and remove the equivant vuex2-style module file.');
        return;
      }

      var exportContent = _extends({}, webpackRequireContext(key));

      cfgs.module_key = module_key;
      cfgs.namespace = namespace;
      onModuleGenerate({ rawModule: exportContent, module_key: module_key, namespace: namespace });
      bindFluxModule(exportContent, modules, cfgs);
      modules[module_key] && onModuleGenerated(modules[module_key], { exportContent: exportContent, modules: modules, module_key: module_key, namespace: namespace });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return modules;
}

function genFluxModules(entry) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  switch (typeof entry === 'undefined' ? 'undefined' : _typeof(entry)) {
    case 'object':
      return genFluxModulesFromFcHash.apply(undefined, [entry].concat(rest));
    case 'function':
      if (typeof entry.keys === 'function') {
        return genFluxModulesFromWebpackCtx.apply(undefined, [entry].concat(rest));
      }
      break;
    default:
      throw new TypeError('object or webpack context function required for \'genFluxModules\'');
  }
}

function bindFluxModule(exportContent, modules, cfgs) {
  var _ref3 = cfgs || {},
      module_key = _ref3.module_key,
      namespace = _ref3.namespace,
      onNewMutation = _ref3.onNewMutation,
      onNewGetter = _ref3.onNewGetter,
      onNewAction = _ref3.onNewAction;

  __WEBPACK_IMPORTED_MODULE_0__module__["fixMObject"](exportContent.M, {
    module_key: module_key,
    namespace: namespace,
    MGetter: function MGetter() {
      return modules[module_key];
    }
  });

  __WEBPACK_IMPORTED_MODULE_0__module__["normalizeTypesAndMutationsOfExportContent"]({ exportContent: exportContent, onNewMutation: onNewMutation });
  __WEBPACK_IMPORTED_MODULE_0__module__["normalizeGettersAndActionsOfExportContent"]({ exportContent: exportContent, onNewGetter: onNewGetter, onNewAction: onNewAction });

  modules[module_key] = exportContent.default = exportContent;
  modules[module_key].toString = modules[module_key].valueOf = function () {
    return exportContent.M.PREFIX;
  };
  modules[module_key].M.toString = modules[module_key].M.valueOf = function () {
    return module_key;
  };

  return { module_key: module_key, namespace: namespace, module: modules[module_key] };
}

/***/ })

/******/ });
});
//# sourceMappingURL=rayjs.js.map