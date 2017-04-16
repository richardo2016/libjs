import { secretifyObj } from '../node/object'
import * as utilPagination from 'wm/lib/js/pagination'

export class PaginationSrc {
  constructor (initObj = {}) {
    this.offset = initObj.offset || 0
    this.size = initObj.size || 20
    this.total = initObj.total || 0

    secretifyObj(this, 'orig_offset', 0)
    // secretifyObj(this, 'init_size', this.size)
    // secretifyObj(this, 'init_total', this.total)
  }

  reset (options) {
    if (typeof options === 'string') {
      options = { field: options }
    }

    let { field } = options || {}

    switch (field) {
      default:
      case 'all':
        this.offset = this.orig_offset
        // this.size = this.init_size
        // this.total = this.init_total
        break
      case 'offset':
        this.offset = this.orig_offset
        break
      case 'size':
        // this.size = this.init_size
        break
      case 'total':
        // this.total = this.init_total
        break
    }
  }

  beforeNext (options) {
    let { strict = true } = options || {}
    let { offset, size, total } = this.pagination

    let _nextOffset = (offset + 1) * size

    if (strict) {
      if (total < _nextOffset) _nextOffset = total
    }

    return {
      offset: _nextOffset,
      size,
      total
    }
  }

  beforePrev (options) {
    let { strict = true } = options || {}
    let { offset, size, total } = this.pagination

    let _nextOffset = (offset - 1) * size

    if (_nextOffset < 0) _nextOffset = 0

    if (strict) {
      if (total < _nextOffset) _nextOffset = total
    }

    return {
      offset: _nextOffset,
      size,
      total
    }
  }

  beforeGoTo (options) {
    let { page = 'next', ...rest } = options || {}
    if (page === 'next') return this.beforeNext(rest)
    if (page === 'prev') return this.beforePrev(rest)

    let { strict = true} = options || {}
    let { offset, size, total } = this.pagination

    let _nextOffset = (offset - 1) * size

    if (_nextOffset < 0) _nextOffset = 0

    if (strict) {
      if (total < _nextOffset) _nextOffset = total
    }

    return {
      offset: _nextOffset,
      size,
      total
    }
  }
}

export class Query {
  constructor (query = {}) {
    this.queryKv = {}
    for (let key in query) {
      this.queryKv[key] = query[key]
    }
  }

  toParamString () {
    let arr = ''
    for (let key in this.queryKv) {
      arr.push(`${key}=${this.queryKv[key]}`)
    }
    return arr.join('&')
  }

  setValue (key, value) {
    if (!key) return
    this.queryKv[key] = value
  }

  getValue (key) {
    return this.queryKv[key]
  }

  deleteKey (key = '') {
    if (!key) return
    if (this.queryKv.hasOwnProperty(key)) delete this.queryKv[key]
  }
}

// zero start offset
export class ListPagination {
  constructor (list, pagination_src = new PaginationSrc(), options = {}) {
    if (arguments.length < 2) {
      pagination_src = list
      list = []
    }

    this.list = list || []
    let { query = new Query() } = options || {}
    this.Query = query
    this.setPaginationSrc(pagination_src)
  }

  clone (listPagination = this) {
    return new ListPagination({...listPagination})
  }

  resetSrc (...args) {
    this.src.reset(...args)
  }

  setList (list = []) {
    this.list = list
    return this.list
  }

  setListIterator (generator) {
    // TODO: check if generator is one `generator` type
    this.list[Symbol.iterator] = generator
  }

  setQuery (query = new Query()) {
    if (!(query instanceof Query)) query = new Query(query)
    this.Query = query
  }

  // depreacted, use setPaginationSrc instead
  setPagination (...args) {
    return this.setPaginationSrc(...args)
  }

  setPaginationSrc (src = new PaginationSrc()) {
    if (!(src instanceof PaginationSrc)) src = new PaginationSrc(src)
    this.src = src
    let { size = this.size || 20, offset = this.size || 0, total = 0 } = this.src || {}

    this.pagination = utilPagination.computeListPagination(total, offset, size)
    return this.pagination
  }

  get offset () {
    return this.src.offset
  }

  get size () {
    return this.src.size
  }

  // depreacted, would become the 'getter'
  total () {
    console.warn(`you use the old getter function 'total()' to compute the total of the listpagination's pagination, it's deprecated ane use count getter to replace it.`)
    return this.src.total
  }

  get count () {
    return this.src.total
  }

  paginationToSrc () {
    return utilPagination.paginationToQuery(this.pagination)
  }

  // ensure the pagination exists
  computePagiParams (curPage = this.pagination.curPage, pageSize = this.pagination.pageSize) {
    let { offset, size } = utilPagination.computeListPagiParams(curPage, pageSize)
    return { offset, size }
  }

  getQueryKvPair () {
    return this.Query.queryKv
  }

  get querykvs () {
    return this.Query.kvs
  }

  srcNext (options) {
    let { strict = true } = options || {}
    let { offset, size, total } = this.pagination

    let _nextOffset = (offset + 1) * size

    if (strict) {
      if (total < _nextOffset) _nextOffset = total
    }

    return {
      offset: _nextOffset,
      size,
      total
    }
  }

  srcPrevPage (options) {
    let { strict = true } = options || {}
    let { offset, size, total } = this.pagination

    let _nextOffset = (offset - 1) * size

    if (_nextOffset < 0) _nextOffset = 0

    if (strict) {
      if (total < _nextOffset) _nextOffset = total
    }

    return {
      offset: _nextOffset,
      size,
      total
    }
  }

  srcGoToPage (page) {

  }
}

export default ListPagination
