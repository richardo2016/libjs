"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var clearMapValue = /** @class */ (function () {
    function clearMapValue() {
    }
    clearMapValue.prototype._destroy = function () { };
    return clearMapValue;
}());
exports.clearMapValue = clearMapValue;
var clearMap = /** @class */ (function (_super) {
    __extends(clearMap, _super);
    function clearMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return clearMap;
}(Map));
exports.clearMap = clearMap;
