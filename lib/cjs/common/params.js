"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function warnParam(param, options) {
    if (typeof options === 'string') {
        options = { type: options };
    }
    var _a = options || {}, _b = _a.check_empty, check_empty = _b === void 0 ? true : _b, _c = _a.param_name, param_name = _c === void 0 ? 'param' : _c, _d = _a.context, context = _d === void 0 ? 'request' : _d, proto = _a.proto;
    var errMsgs;
    if (check_empty && !param) {
        errMsgs = param_name + " cannot be empty in " + context + ".";
        return new Error("warn_cb: " + errMsgs);
    }
    // TODO: check `type` is in basic type of Javascript
    // if (type && (typeof type === 'string') && (typeof param !== type)) {
    //   errMsgs = `${param_name}'s type should be ${type} in ${context}.`
    //   return new Error(`warn_type_cb: ${errMsgs}`)
    // }
    if (proto && !(param instanceof proto)) {
        errMsgs = param_name + " should be instance of " + proto.toString() + " in " + context + ".";
        return new Error("warn_class_cb: " + errMsgs);
    }
    return false;
}
exports.warnParam = warnParam;
exports.warnFieldEmpty = function (obj, field_name, options) {
    var _a, _b;
    if (!obj || typeof field_name !== 'string' || !field_name) {
        console.warn('you cannot call this function without enough arguments given.');
        return true;
    }
    var context = (_a = options || {}, _b = _a.context, _b === void 0 ? 'params' : _b), warn_cb = _a.warn_cb;
    if (!obj.field_name) {
        typeof warn_cb === 'function' ? warn_cb() : console.warn(field_name + " cannot be empty in " + context + ".");
        return;
    }
    return true;
};
function jsonToParams(jsonObj) {
    var query_params = [];
    for (var k in jsonObj) {
        var value = encodeURIComponent(jsonObj[k]);
        query_params.push(k + "=" + value);
    }
    return query_params.join('&');
}
exports.jsonToParams = jsonToParams;
exports.normalizeQueries = function (jsonObj) {
    var query_params = [];
    for (var k in jsonObj) {
        query_params.push(k + '=' + encodeURIComponent(jsonObj[k]));
    }
    return query_params.join('&');
};
exports.normalizeBody = function (jsonObj) {
    var body = [];
    for (var k in jsonObj) {
        var value = encodeURIComponent(jsonObj[k]);
        body.push(k + "=" + value);
    }
    return body.join('&');
};
exports.computeParamsByOpt = function (params, params_filter) {
    if (!params_filter) {
        return params;
    }
    for (var param_key in params_filter) {
        var filter = params_filter[param_key], filter_type = typeof filter;
        switch (filter_type) {
            case 'object':
                break;
            case 'string': {
                switch (filter) {
                    default:
                    case 'optional':
                        break;
                    case 'required':
                        if (!params.hasOwnProperty(param_key)) {
                            throw new Error("param " + param_key + " required");
                        }
                        break;
                    case 'notempty':
                        if (!params.param_key) {
                            throw new Error("param " + param_key + " cannot be empty");
                        }
                        break;
                    case 'string':
                        if (typeof params[param_key] !== 'string') {
                            throw new Error("param " + param_key + " should be string");
                        }
                        break;
                    case 'number':
                        if (typeof params[param_key] !== 'number') {
                            throw new Error("param " + param_key + " should be number");
                        }
                        break;
                    case 'json':
                        if (typeof params[param_key] !== 'string') {
                            throw new Error("param " + param_key + " should be json string");
                        }
                        try {
                            JSON.parse(params[param_key]);
                        }
                        catch (e) {
                            throw new Error("param " + param_key + " should be json string");
                        }
                        break;
                }
                break;
            }
        }
    }
    return params;
};
