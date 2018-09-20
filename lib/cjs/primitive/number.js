"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
/**
 * @brief coerce one value to number
 * @details if the value cannot be parse to number, return `undefined`.
 *
 * @param  value input value
 * @returns value result value
 */
function coerceNumber(value) {
    return _1.coerce({ value: value, type: _1.types.number });
}
exports.coerceNumber = coerceNumber;
