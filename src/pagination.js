export const computeListPagiParams = (cuaPage = 0, pageSize = 20) => {
  let offset = cuaPage * pageSize,
      size = pageSize

  return {
    offset,
    size
  }
}

export const computeListPagination = (total, offset = 0, size = 20) => {
  size = (size <= 0 || typeof size !== 'number') ? 1 : size

  let curPage  = offset / size,
      firstPage = 0,
      lastPage = parseInt(total / size) - Number(!(total / size - parseInt(total / size)))

  if (lastPage < firstPage) lastPage = firstPage

  let pagination = {
    curPage,
    firstPage,
    lastPage,
    canNext: lastPage > curPage,
    canPrev: curPage > firstPage,
    pageSize: size,
    total,
    pageStart: !total ? 0 : curPage * size + 1,
    pageEnd: !total ? 0 : curPage === lastPage ? total : total > size ? (curPage + 1) * size : total,
    needPagi: total > size,
    len: lastPage - firstPage + 1
  }

  pagination.overTotal = offset > total || total < pagination.pageStart || pagination.pageEnd < pagination.pageStart
  if (pagination.overTotal) {
    pagination.latestValidPage = 0
  }

  pagination.canPrevEtc = ({navCount = 1, firstNav = pagination.firstPage}) => {
    let half = parseInt(navCount / 2),
        min = Math.min(pagination.curPage, pagination.len),
        offset = min - half

    return offset >= 1 && firstNav < offset
  }

  pagination.canNextEtc = ({navCount = 1, lastNav = pagination.lastPage}) => pagination.len > navCount && pagination.curPage + (navCount / 2) < lastNav
  pagination.genIndicators = (options) => {
    if (typeof options === 'number') options = {navCount: options}

    let {
      navCount = 1,
      pageLen = pagination.len,
      start = pagination.curPage - parseInt(navCount / 2)
    } = options || {}
    let len = Math.min(navCount, pageLen)

    if (start < pagination.firstPage) start = pagination.firstPage
    else if (start + len > pagination.lastPage) start = pagination.lastPage - len + 1

    let indicators = []

    for (var i = 0; i < len; i++) {
      let next = start + i
      if (next > pagination.lastPage) break
      indicators.push(next)
    }

    return indicators
  }
  return pagination
}

export function paginationToQuery (pagination) {
  // TODO: normalize pagination object
  let { curPage = 0, pageSize = 20 } = pagination || {}
  return {
    offset: curPage * pageSize,
    nextOffset: (curPage + 1) * pageSize,
    prevOffset: (curPage - 1) * pageSize,
    size: pageSize
  }
}
