"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtIn = {
    date: require('./built-in/date'),
    array: require('./built-in/array'),
    object: require('./built-in/object')
};
exports.struct = {
    iterator: require('./struct/iterator'),
    map: require('./struct/map')
};
exports.primitive = {
    number: require('./primitive/number'),
    string: require('./primitive/string')
};
exports.constant = {
    alphabet: require('./constant/alphabet'),
    keycode: require('./constant/keycode')
};
