"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeListPagiParams = function (cuaPage, pageSize) {
    if (cuaPage === void 0) { cuaPage = 0; }
    if (pageSize === void 0) { pageSize = 20; }
    var offset = cuaPage * pageSize, size = pageSize;
    return {
        offset: offset,
        size: size
    };
};
exports.computeListPagination = function (total, offset, size) {
    if (offset === void 0) { offset = 0; }
    if (size === void 0) { size = 20; }
    size = (size <= 0 || typeof size !== 'number') ? 1 : size;
    var curPage = offset / size, firstPage = 0, lastPage = parseInt(total / size) - Number(!(total / size - parseInt(total / size)));
    if (lastPage < firstPage)
        lastPage = firstPage;
    var pagination = {
        curPage: curPage,
        firstPage: firstPage,
        lastPage: lastPage,
        canNext: lastPage > curPage,
        canPrev: curPage > firstPage,
        pageSize: size,
        total: total,
        pageStart: !total ? 0 : curPage * size + 1,
        pageEnd: !total ? 0 : curPage === lastPage ? total : total > size ? (curPage + 1) * size : total,
        needPagi: total > size,
        len: lastPage - firstPage + 1
    };
    pagination.overTotal = offset > total || total < pagination.pageStart || pagination.pageEnd < pagination.pageStart;
    if (pagination.overTotal) {
        pagination.latestValidPage = 0;
    }
    pagination.canPrevEtc = function (_a) {
        var _b = _a.navCount, navCount = _b === void 0 ? 1 : _b, _c = _a.firstNav, firstNav = _c === void 0 ? pagination.firstPage : _c;
        var half = parseInt(navCount / 2), min = Math.min(pagination.curPage, pagination.len), offset = min - half;
        return offset >= 1 && firstNav < offset;
    };
    pagination.canNextEtc = function (_a) {
        var _b = _a.navCount, navCount = _b === void 0 ? 1 : _b, _c = _a.lastNav, lastNav = _c === void 0 ? pagination.lastPage : _c;
        return pagination.len > navCount && pagination.curPage + (navCount / 2) < lastNav;
    };
    pagination.genIndicators = function (options) {
        if (typeof options === 'number')
            options = { navCount: options };
        var _a = options || {}, _b = _a.navCount, navCount = _b === void 0 ? 1 : _b, _c = _a.pageLen, pageLen = _c === void 0 ? pagination.len : _c, _d = _a.start, start = _d === void 0 ? pagination.curPage - parseInt(navCount / 2) : _d;
        var len = Math.min(navCount, pageLen);
        if (start < pagination.firstPage)
            start = pagination.firstPage;
        else if (start + len > pagination.lastPage)
            start = pagination.lastPage - len + 1;
        var indicators = [];
        for (var i = 0; i < len; i++) {
            var next = start + i;
            if (next > pagination.lastPage)
                break;
            indicators.push(next);
        }
        return indicators;
    };
    return pagination;
};
function paginationToQuery(pagination) {
    // TODO: normalize pagination object
    var _a = pagination || {}, _b = _a.curPage, curPage = _b === void 0 ? 0 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 20 : _c;
    return {
        offset: curPage * pageSize,
        nextOffset: (curPage + 1) * pageSize,
        prevOffset: (curPage - 1) * pageSize,
        size: pageSize
    };
}
exports.paginationToQuery = paginationToQuery;
