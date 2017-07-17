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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileError", function() { return FileError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageError", function() { return ImageError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFileDataURL", function() { return readFileDataURL; });
/* harmony export (immutable) */ __webpack_exports__["getFileInfoSync"] = getFileInfoSync;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkFile", function() { return checkFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readImageInfo", function() { return readImageInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkImage", function() { return checkImage; });
/* harmony export (immutable) */ __webpack_exports__["filesOfInput"] = filesOfInput;
/* harmony export (immutable) */ __webpack_exports__["fileExt"] = fileExt;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFileArrayBuffer", function() { return readFileArrayBuffer; });
/* harmony export (immutable) */ __webpack_exports__["getFileListFromEvent"] = getFileListFromEvent;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseError = function () {
  function BaseError(_ref) {
    var _ref$code = _ref.code,
        code = _ref$code === undefined ? 0 : _ref$code,
        _ref$message = _ref.message,
        message = _ref$message === undefined ? 'ok' : _ref$message,
        payload = _objectWithoutProperties(_ref, ['code', 'message']);

    _classCallCheck(this, BaseError);

    this.code = code;
    this.message = message;
    this.payload = payload;
  }

  _createClass(BaseError, [{
    key: 'isError',
    get: function get() {
      return true;
    }
  }]);

  return BaseError;
}();

var FileError = function (_BaseError) {
  _inherits(FileError, _BaseError);

  function FileError(params) {
    _classCallCheck(this, FileError);

    var file = params.file,
        rest = _objectWithoutProperties(params, ['file']);

    rest.code = 'file:error:' + rest.code;

    var _this = _possibleConstructorReturn(this, (FileError.__proto__ || Object.getPrototypeOf(FileError)).call(this, rest));

    _this.file = file;
    return _this;
  }

  _createClass(FileError, [{
    key: 'isFileError',
    get: function get() {
      return true;
    }
  }]);

  return FileError;
}(BaseError);

var ImageError = function (_BaseError2) {
  _inherits(ImageError, _BaseError2);

  function ImageError(params) {
    _classCallCheck(this, ImageError);

    var image = params.image,
        rest = _objectWithoutProperties(params, ['image']);

    rest.code = 'image:error:' + rest.code;

    var _this2 = _possibleConstructorReturn(this, (ImageError.__proto__ || Object.getPrototypeOf(ImageError)).call(this, rest));

    _this2.image = image;
    return _this2;
  }

  _createClass(ImageError, [{
    key: 'isImageError',
    get: function get() {
      return true;
    }
  }]);

  return ImageError;
}(BaseError);

var readFileDataURL = function readFileDataURL(file) {
  return new Promise(function (resolve, reject) {
    if (!(file instanceof File)) reject(new TypeError('not-file'));
    var reader = new FileReader();

    reader.onloadend = function (evt) {
      resolve(reader.result);
    };

    reader.onabort = function (evt) {
      return reject({ event: evt, progress: 'onabort' });
    };
    reader.onerror = function (evt) {
      return reject({ event: evt, progress: 'onerror' });
    };


    reader.readAsDataURL(file);
  });
};

function getFileInfoSync(file) {
  var type = file.type,
      size = file.size,
      name = file.name,
      lastModified = file.lastModified,
      lastModifiedDate = file.lastModifiedDate;

  return {
    type: type,
    size: size,
    name: name,
    lastModified: lastModified,
    lastModifiedDate: lastModifiedDate
  };
}

var checkFile = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(file, options) {
    var _ref3, _ref3$maxSize, maxSize, _ref3$minSize, minSize;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref3 = options || {}, _ref3$maxSize = _ref3.maxSize, maxSize = _ref3$maxSize === undefined ? 1024 * 1024 * 2 : _ref3$maxSize, _ref3$minSize = _ref3.minSize, minSize = _ref3$minSize === undefined ? 1024 : _ref3$minSize;

            if (file instanceof File) {
              _context.next = 3;
              break;
            }

            throw new FileError({ code: 'type', error: 'Not File Type', file: file });

          case 3:
            if (!(file.size > maxSize)) {
              _context.next = 5;
              break;
            }

            throw new FileError({ code: 'over_size', message: 'File Over Maxsize: ' + maxSize, file: file, maxSize: maxSize, maxkb: maxSize / 1024 });

          case 5:
            if (!(minSize > 0 && file.size < minSize)) {
              _context.next = 7;
              break;
            }

            throw new FileError({ code: 'lower_size', message: 'File Lower Minsize: ' + minSize, file: file, minSize: minSize, minkb: minSize / 1024 });

          case 7:
            return _context.abrupt('return', file);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function checkFile(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var readImageInfo = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(file, options) {
    var _ref5, _ref5$image, img, _ref5$reader, reader, _ref5$acceptPng, acceptPng, _ref5$acceptBmp, acceptBmp, _ref5$acceptJpg, acceptJpg;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref5 = options || {}, _ref5$image = _ref5.image, img = _ref5$image === undefined ? new Image() : _ref5$image, _ref5$reader = _ref5.reader, reader = _ref5$reader === undefined ? new FileReader() : _ref5$reader, _ref5$acceptPng = _ref5.acceptPng, acceptPng = _ref5$acceptPng === undefined ? true : _ref5$acceptPng, _ref5$acceptBmp = _ref5.acceptBmp, acceptBmp = _ref5$acceptBmp === undefined ? false : _ref5$acceptBmp, _ref5$acceptJpg = _ref5.acceptJpg, acceptJpg = _ref5$acceptJpg === undefined ? true : _ref5$acceptJpg;
            return _context2.abrupt('return', new Promise(function (resolve, reject) {
              if ([acceptPng && 'image/png', acceptJpg && 'image/jpeg', acceptBmp && 'image/bmp'].filter(function (x) {
                return x;
              }).indexOf(file.type) === -1) {
                reject(new FileError({ code: 'image_mime_type', error: 'Invalid Image Type', file: file }));
                return;
              }

              reader.onload = function (e) {
                img.src = e.target.result;
              };

              reader.onabort = function (evt) {
                return reject(new FileError({ code: 'onabort' }));
              };
              reader.onerror = function (evt) {
                return reject(new FileError({ code: 'onerror' }));
              };

              img.onload = function () {
                resolve({ image: img, file: file, width: img.width, height: img.height, kb: file.size / 1024, mb: file.size / (1024 * 1024), ext: fileExt(file) });
              };

              reader.readAsDataURL(file);
            }));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function readImageInfo(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var checkImage = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(image, options) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (image instanceof Image) {
              _context3.next = 2;
              break;
            }

            throw new ImageError({ code: 'type', error: 'Not Image Type', image: image });

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function checkImage(_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();

function filesOfInput(event, options) {
  var _this3 = this;

  var el = event.target,
      _ref7 = el || {},
      _ref7$files = _ref7.files,
      files = _ref7$files === undefined ? [] : _ref7$files;


  var proto = Object.getPrototypeOf(files),
      symbols = Object.getOwnPropertySymbols(proto);

  if (symbols.indexOf(Symbol.iterator) === -1) {
    files = Array.apply(null, files);
  }

  return { event: event, files: files, resetInput: function () {
      var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', event.target.value = '');

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this3);
      }));

      return function resetInput() {
        return _ref8.apply(this, arguments);
      };
    }() };
}

function fileExt(file) {
  if (!(file instanceof File)) {
    return;
  }

  var _file$name = file.name,
      name = _file$name === undefined ? '' : _file$name;

  return name && name.substr(name.lastIndexOf('.') + 1);
}

var readFileArrayBuffer = function readFileArrayBuffer(file) {
  return new Promise(function (resolve, reject) {
    if (!(file instanceof File)) return new Error('not-file');
    var reader = new FileReader();

    reader.onloadend = function (evt) {
      resolve(reader.result);
    };

    reader.readAsArrayBuffer(file);
  });
};

function getFileListFromEvent(event) {
  var el = event.target,
      _ref9 = el || {},
      _ref9$files = _ref9.files,
      files = _ref9$files === undefined ? [] : _ref9$files;


  return files;
}

/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _window = window,
    localStorage = _window.localStorage;

var Storage = function () {
  function Storage(dbName, options) {
    var _this = this;

    _classCallCheck(this, Storage);

    if (!localStorage) {
      return;
    }

    var _ref = options || {},
        _ref$syncInterval = _ref.syncInterval,
        syncInterval = _ref$syncInterval === undefined ? 2000 : _ref$syncInterval;

    dbName = dbName || 'default';

    this.hasChanged = false;
    this.store = {};
    this.dbName = 'localStorageORM/' + dbName;

    if ((typeof localStorage === 'undefined' ? 'undefined' : _typeof(localStorage)) === 'object') {
      this.hasLocalStorage = true;

      setTimeout(function () {
        return _this.update();
      }, 1);

      setInterval(function () {
        if (_this.hasChanged) {
          _this.sync();
          _this.syncEnd();
        }
      }, syncInterval);
    }

    return this;
  }

  _createClass(Storage, [{
    key: 'update',
    value: function update() {
      var db = localStorage.getItem(this.dbName);
      if (db) {
        this.store = JSON.parse(db);
      }
      return this.store;
    }
  }, {
    key: 'syncStart',
    value: function syncStart() {
      this.hasChanged = true;
    }
  }, {
    key: 'sync',
    value: function sync() {
      localStorage.setItem(this.dbName, JSON.stringify(this.store));
    }
  }, {
    key: 'syncEnd',
    value: function syncEnd() {
      this.hasChanged = false;
    }
  }, {
    key: 'get',
    value: function get(key) {
      return key ? this.store[key] : this.store;
    }
  }, {
    key: 'set',
    value: function set(key, data) {
      this.store[key] = data;
      this.syncStart();
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      if (this.store.hasOwnProperty(key)) {
        delete this.store[key];
        this.syncStart();
      }
    }
  }, {
    key: 'find',
    value: function find(attribute, value) {
      var i = void 0,
          iMax = void 0,
          result = void 0;

      result = [];

      for (i = 0, iMax = this.store.length; i < iMax; i++) {
        if (this.store[i][attribute] && this.store[i][attribute] === value) {
          result.push(this.store[i]);
        }
      }

      return result;
    }
  }, {
    key: 'each',
    value: function each(callback) {
      var key = void 0;

      for (key in this.store) {
        if (this.store.hasOwnProperty(key)) {
          callback.bind(this, key, this.store[key]);
        }
      }
    }
  }]);

  return Storage;
}();

/* harmony default export */ __webpack_exports__["default"] = (Storage);

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
  file: __webpack_require__(0),
  localStorage: __webpack_require__(1)
});

/***/ })

/******/ });
});
//# sourceMappingURL=browser.js.map