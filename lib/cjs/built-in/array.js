"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function group(arr, options) {
    if (arr === void 0) { arr = []; }
    if (options === void 0) { options = {}; }
    var _a = options || {}, _b = _a.rowCount, rowCount = _b === void 0 ? 2 : _b, _c = _a.fixLast, fixLast = _c === void 0 ? false : _c, _d = _a.fixUnit, fixUnit = _d === void 0 ? undefined : _d, newArr = [], group = [];
    // console.info(arr, arr.length)
    var arrLen = arr.length;
    for (var i = 0; i < arrLen; i++) {
        group.push(arr[i]);
        if (group.length === rowCount || i === arr.length - 1) {
            newArr.push(group);
            group = [];
        }
    }
    if (fixLast) {
        var lastArr = newArr[newArr.length - 1];
        if (lastArr && lastArr.length < rowCount) {
            while (lastArr.length < rowCount) {
                lastArr.push(fixUnit);
            }
            // lastArr.length = rowCount
            newArr[newArr.length - 1] = lastArr;
        }
    }
    return newArr;
}
exports.group = group;
