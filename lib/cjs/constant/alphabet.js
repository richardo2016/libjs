"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generate() {
    var list = [];
    var keymirror = {};
    var lowerA = 'a'.charCodeAt(0);
    var upperA = 'A'.charCodeAt(0);
    /**
     * X5 Blink kernel(chrome 37) has no Array.prototype.fill,
     * see detail in
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
     * or
     * Take a step back talk, this is the pattern for iteration more effective than Array.prototype.forEach
     */
    for (var index = 0; index < 26; index++) {
        var lower_asc_code = lowerA + index, lower_char = String.fromCharCode(lower_asc_code);
        var upper_asc_code = upperA + index, upper_char = String.fromCharCode(upper_asc_code);
        list.push(lower_char);
        list.unshift(upper_char);
        keymirror[lower_char] = lower_asc_code;
        keymirror[lower_asc_code] = lower_char;
        keymirror[upper_char] = upper_asc_code;
        keymirror[upper_asc_code] = upper_char;
    }
    return {
        keymirror: keymirror,
        list: list
    };
}
function generateKeyMirror() {
    return generate().keymirror;
}
exports.generateKeyMirror = generateKeyMirror;
function generateList() {
    return generate().list;
}
exports.generateList = generateList;
