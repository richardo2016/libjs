"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = {
    number: 'number',
    undefined: 'undefined',
    string: 'string',
    boolean: 'boolean',
    object: 'object'
};
function coerce(_a) {
    var value = _a.value, type = _a.type;
    if (!exports.types.hasOwnProperty(type)) {
        console.warn("invalid primitive type given: " + type);
        return;
    }
    var _type = typeof value;
    switch (type) {
        default:
        case exports.types.object:
            break;
        case exports.types.undefined:
            return undefined;
        case exports.types.number:
            if (_type === exports.types.number && !isNaN(value))
                return value;
            value = parseFloat(value);
            return !isNaN(value) ? value : undefined;
        case exports.types.string:
            value = value && value.toString();
            return value;
        case exports.types.boolean:
            return !!value;
    }
}
exports.coerce = coerce;
