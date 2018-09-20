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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult = /** @class */ (function () {
    function ValidationResult(_a) {
        var err = _a.err, kvs = _a.kvs;
        this.err = err;
        this.kvs = kvs;
    }
    return ValidationResult;
}());
var ValidationError = /** @class */ (function () {
    function ValidationError(error) {
        if (error === void 0) { error = {}; }
        if (typeof error === 'string') {
            this.info = error;
        }
        else {
            var _a = (error || {}).info, info = _a === void 0 ? '' : _a;
            this.info = info;
        }
    }
    return ValidationError;
}());
var ValidationSuccess = /** @class */ (function () {
    function ValidationSuccess() {
    }
    return ValidationSuccess;
}());
exports.defaultFuncs = {
    not_empty: function (_a) {
        var value = _a.value;
        return !!value;
    },
    is_number: function (_a) {
        var value = _a.value;
        return typeof value === 'number' && !isNaN(value);
    },
    is_string: function (_a) {
        var value = _a.value;
        return typeof value === 'string';
    },
    is_a: function (_a) {
        var value = _a.value, type = _a.type;
        return value instanceof type;
    },
    between: function (_a) {
        var value = _a.value, min = _a.min, max = _a.max;
        if (!exports.defaultFuncs.is_number({ value: min })) {
            console.error("you must give one numberic for 'min'");
            return;
        }
        else if (!exports.defaultFuncs.is_number({ value: max })) {
            console.error("you must give one numberic for 'max'");
            return;
        }
        return exports.defaultFuncs.is_number({ value: value }) && value < max && value > min;
    },
    in_list: function (_a) {
        var value = _a.value, _b = _a.list, list = _b === void 0 ? [] : _b;
        if (list instanceof Array) {
            return list.indexOf(value) > -1;
        }
        console.error("list for validation 'in_list' must be an array");
    },
    in_obj: function (_a) {
        var value = _a.value, object = _a.object;
        return value in object;
    },
    of_obj: function (_a) {
        var value = _a.value, object = _a.object;
        return object.hasOwnProperty(value);
    }
};
var Validation = /** @class */ (function () {
    function Validation() {
    }
    Validation.isOk = function (err) {
        return err instanceof ValidationSuccess;
    };
    Validation.isError = function (err) {
        return err instanceof ValidationError;
    };
    Validation.validate = function (validations, funcs) {
        if (validations === void 0) { validations = {}; }
        if (funcs === void 0) { funcs = exports.defaultFuncs; }
        var kvs = {};
        for (var _i = 0, _a = Object.keys(validations); _i < _a.length; _i++) {
            var fieldKey = _a[_i];
            var _b = validations[fieldKey] || {}, _c = _b.name, fieldName = _c === void 0 ? fieldKey : _c, rest = __rest(_b, ["name"]);
            if (!fieldName)
                continue;
            if (typeof fieldName !== 'string') {
                throw new Error("field's name must be string.");
            }
            var _d = rest || {}, value = _d.value, func = _d.func, payload = _d.payload, _e = _d.error_info, error_info = _e === void 0 ? "'" + fieldName + "' is invalid" : _e;
            if (typeof func === 'string' && funcs.hasOwnProperty(func)) {
                func = funcs[func];
            }
            if (typeof func !== 'function') {
                throw new Error("invalid func provided for field " + fieldName);
            }
            var result = func(__assign({}, payload, { value: value }));
            // console.info('value', value)
            // console.info('func', func)
            // console.info('result', result)
            if (!result) {
                return new ValidationResult({
                    err: new ValidationError({ info: error_info })
                });
            }
            if (result instanceof ValidationError) {
                return new ValidationResult({
                    err: result
                });
            }
            kvs[fieldName] = value;
        }
        return new ValidationResult({
            err: null,
            kvs: kvs
        });
    };
    return Validation;
}());
exports.default = Validation;
