"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = require("../primitive/string");
function noop() { }
function mixinListIterator(options) {
    var _a = options || {}, _b = _a.list, list = _b === void 0 ? [] : _b, _c = _a.yieldIt, yieldIt = _c === void 0 ? noop : _c, _d = _a.generator, generator = _d === void 0 ? function () {
        var index, len;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0, len = list.length;
                    _a.label = 1;
                case 1:
                    if (!(index < len)) return [3 /*break*/, 3];
                    return [4 /*yield*/, yieldIt({ list: list, index: index++ })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    } : _d;
    yieldIt = yieldIt || (function (_a) {
        var index = _a.index, list = _a.list;
        return list[index];
    });
    list[Symbol.iterator] = generator;
    return list;
}
exports.mixinListIterator = mixinListIterator;
function iteratorable(object) {
    if (object === null || typeof object !== 'object') {
        return false;
    }
    return Object.getOwnPropertySymbols(object).indexOf(Symbol.iterator) > -1;
}
exports.iteratorable = iteratorable;
function enumHash(obj, options) {
    var enumPayload = {}, _a = (options || {}).keepNumber, keepNumber = _a === void 0 ? false : _a;
    for (var key in obj) {
        var value = obj[key];
        if (value === undefined || value === null) {
            console.warn("invalid value \"" + value + "\" in source object, check it");
            value = String(value);
            continue;
        }
        if (keepNumber) {
            var temp 
            /* eslint-disable no-multi-spaces */
            = void 0;
            /* eslint-disable no-multi-spaces */
            key = string_1.coerceString(isNaN((temp = parseInt(key))) ? key : temp);
            value = isNaN((temp = parseInt(value))) ? value : temp;
            /* eslint-enable no-multi-spaces */
        }
        enumPayload[enumPayload[key] = value] = key;
    }
    return enumPayload;
}
exports.enumHash = enumHash;
function enumNumHash(obj, options) {
    if (options === void 0) { options = {}; }
    options.keepNumber = true;
    return enumHash(obj, options);
}
exports.enumNumHash = enumNumHash;
/**
 * @brief do keymirror with one array or object
 *
 * {1: 2, 3: 4} => {1: 2, 2: 1, 3: 4, 4: 3}
 *
 * @test
 * ```
 * let keys = [1, 2, 3, 4, 5], keyHash = {1: undefined, 2: null, 3: 'c', 4: '5'}
 * console.info('enumKeyMirror', enumKeyMirror(keys), enumKeyMirror(keyHash))
 * ```
 *
 * applying in runtime is not recommended, you can pre-set the object always,
 * so you can use this function in pre-processing, e.g. in webpack's loader.
 *
 * @param  [description]
 * @return [description]
 */
function enumKeyMirror(entries, options) {
    if (options === void 0) { options = {}; }
    if (typeof entries !== 'object')
        return;
    var enumPayload = {}, _a = options.keepExist, keepExist = _a === void 0 ? false : _a;
    if (!Array.isArray(entries)) {
        for (var key in entries) {
            if (!entries.hasOwnProperty(key) || !keepExist)
                enumPayload[enumPayload[key] = key] = key;
        }
    }
    else {
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var value = entries_1[_i];
            if (!entries.hasOwnProperty(value) || !keepExist)
                enumPayload[enumPayload[value] = value] = value;
        }
    }
    return enumPayload;
}
exports.enumKeyMirror = enumKeyMirror;
