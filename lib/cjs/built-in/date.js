"use strict";
// import 'core-js/modules/es7.string.pad-start'
// import 'core-js/modules/es7.string.pad-end'
Object.defineProperty(exports, "__esModule", { value: true });
function ensureDate(dateInstance) {
    if (!dateInstance)
        return;
    if (dateInstance instanceof Date)
        return dateInstance;
    dateInstance = new Date(dateInstance);
    if (dateInstance + '' === 'Invalid Date')
        return;
    else if (isNaN(dateInstance.valueOf()))
        return;
    return dateInstance;
}
exports.ensureDate = ensureDate;
function padMonth(string) {
    string = string + '';
    return string.padStart(2, '0');
}
exports.padMonth = padMonth;
function padDate(string) {
    string = string + '';
    return string.padStart(2, '0');
}
exports.padDate = padDate;
exports.padHours = padDate;
exports.padMiniutes = padDate;
exports.padSeconds = padDate;
function padMilliseconds(string) {
    string = string + '';
    return string.padStart(3, '0');
}
exports.padMilliseconds = padMilliseconds;
function slashLocalDateTime(date) {
    if (!(date = ensureDate(date)))
        return;
    return date.getFullYear() + "/" + padMonth(date.getMonth() + 1) + "/" + padDate(date.getDate());
}
exports.slashLocalDateTime = slashLocalDateTime;
function kebabLocalDateTime(date) {
    if (!(date = ensureDate(date)))
        return;
    return date.getFullYear() + "-" + padMonth(date.getMonth() + 1) + "-" + padDate(date.getDate());
}
exports.kebabLocalDateTime = kebabLocalDateTime;
function getDiffDays(beginTime, endTime) {
    if (!(beginTime = ensureDate(beginTime)) || !(endTime = ensureDate(endTime))) {
        return 0;
    }
    var diffMs = endTime - beginTime;
    return Math.floor(diffMs / (86400 * 1e3));
}
exports.getDiffDays = getDiffDays;
/**
 * @brief parse one Date(if it is)
 *
 * @param  date: valid date descriptor
 * @return parsed data
 */
function parseDate(date) {
    if (!(date = ensureDate(date)))
        return;
    return {
        padded_year: date.getFullYear() + '',
        padded_month: padMonth(date.getMonth() + 1),
        padded_date: padDate(date.getDate()),
        padded_hours: exports.padHours(date.getHours()),
        padded_minutes: exports.padMiniutes(date.getMinutes()),
        padded_seconds: exports.padSeconds(date.getSeconds()),
        padded_milliseconds: padMilliseconds(date.getMilliseconds())
    };
}
exports.parseDate = parseDate;
