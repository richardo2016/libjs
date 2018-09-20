"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function corceObject(obj) {
    if (obj === null)
        return {};
    if (typeof obj !== 'object') {
        console.warn('non-empty object expected');
        return {};
    }
    return obj;
}
/**
 * @brief transform list(array) to keymirror-style hash
 */
function list2keymirror(list) {
    if (list === void 0) { list = []; }
    if (!Array.isArray(list))
        return;
    var keymirror = {};
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var key = list_1[_i];
        keymirror[key] = key;
    }
    return keymirror;
}
exports.list2keymirror = list2keymirror;
/**
 * @brief iterate object like `Array.prototype.foreach`, key as index, object[key] as value in callback
 */
function foreachObject(object, callback) {
    object = corceObject(object);
    if (!object)
        return;
    for (var key in object) {
        callback.apply(object, [object[key], key, object]);
    }
}
exports.foreachObject = foreachObject;
function filterObject(obj, options) {
    obj = corceObject(obj);
    if (!obj)
        return;
    if (options instanceof Array) {
        options = { dropKeys: options };
    }
    var _a = options || {}, _b = _a.leaveKeys, leaveKeys = _b === void 0 ? [] : _b, _c = _a.dropKeys, dropKeys = _c === void 0 ? [] : _c;
    if (!leaveKeys.length) {
        for (var key in obj) {
            if (dropKeys.includes(key)) {
                delete obj[key];
            }
        }
    }
    else {
        for (var key in obj) {
            if (!leaveKeys.includes(key)) {
                delete obj[key];
            }
        }
    }
}
exports.filterObject = filterObject;
/**
 * @brief check if one value in object.
 */
function ofObject(value, obj, options) {
    var ofIt = false, _a = (options || {}).strict, strict = _a === void 0 ? true : _a;
    for (var key in obj) {
        if ((!strict && value == obj[key]) || value === obj[key]) {
            ofIt = true;
            break;
        }
    }
    return ofIt;
}
exports.ofObject = ofObject;
function view(object) {
    return Object.getOwnPropertyDescriptors(object);
}
exports.view = view;
function viewField(object, property) {
    return Object.getOwnPropertyDescriptor(object, property);
}
exports.viewField = viewField;
function ofChangeable(object, property) {
    return view(object).writable;
}
exports.ofChangeable = ofChangeable;
function secretifyObjectProperty(object, property, newDescriptor) {
    if (newDescriptor === void 0) { newDescriptor = {}; }
    object = corceObject(object);
    if (!object)
        return;
    var _a = newDescriptor || {}, _b = _a.value, value = _b === void 0 ? undefined : _b, _c = _a.configurable, configurable = _c === void 0 ? false : _c, _d = _a.writable, writable = _d === void 0 ? false : _d;
    if (!Object.defineProperty || !Object.getOwnPropertyDescriptor) {
        object[property] = value;
        return object;
    }
    var prop_descriptor = Object.getOwnPropertyDescriptor(object, property);
    var new_descriptor = { value: value === undefined ? object[property] : value, enumerable: false, configurable: configurable, writable: writable };
    if (prop_descriptor && object.hasOwnProperty(property)) {
        if (prop_descriptor.writable) {
            object[property] = value;
            Object.defineProperty(object, property, new_descriptor);
        }
    }
    else {
        Object.defineProperty(object, property, new_descriptor);
    }
    return object;
}
function solidifyObj(object, property, descriptor) {
    if (descriptor === void 0) { descriptor = {}; }
    descriptor = __assign({}, descriptor, { configurable: false, writable: false });
    return secretifyObjectProperty(object, property, descriptor);
}
exports.solidifyObj = solidifyObj;
function secretObj(object, property, descriptor) {
    if (descriptor === void 0) { descriptor = {}; }
    descriptor = __assign({}, descriptor, { configurable: true, writable: true });
    return secretifyObjectProperty(object, property, descriptor);
}
exports.secretObj = secretObj;
function getFreezedPropertyFromObj(obj, properties) {
    if (properties === void 0) { properties = []; }
    var propertiesObj = {};
    for (var propertyKey in properties) {
        if (obj.hasOwnProperty(propertyKey)) {
            propertiesObj[propertyKey] = obj[propertyKey];
        }
    }
    return propertiesObj;
}
exports.getFreezedPropertyFromObj = getFreezedPropertyFromObj;
