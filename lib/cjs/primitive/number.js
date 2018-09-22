"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _common_1 = require("./_common");
/**
 * @brief coerce one value to number
 * @details if the value cannot be parse to number, return `undefined`.
 *
 * @param  value input value
 * @returns value result value
 */
function coerceNumber(value) {
    return _common_1.coerce({ value: value, type: _common_1.types.number });
}
exports.coerceNumber = coerceNumber;
