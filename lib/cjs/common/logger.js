"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger(level) {
        if (level === undefined) {
            level = 'info';
        }
        this.level = level;
    }
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.level === 'debug') {
            console.debug.apply(console, [this.time()].concat(args));
        }
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.level === 'debug' || this.level === 'info') {
            console.info.apply(console, [this.time()].concat(args));
        }
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.level === 'debug' || this.level === 'info' || this.level === 'warn') {
            console.warn.apply(console, [this.time()].concat(args));
        }
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, [this.time()].concat(args));
    };
    Logger.prototype.time = function () {
        var d = new Date();
        return d.toTimeString().substring(0, 8) + '.' + d.getMilliseconds();
    };
    return Logger;
}());
exports.Logger = Logger;
exports.default = new Logger();
