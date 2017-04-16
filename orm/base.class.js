import { secretifyObj, secretObj, solidifyObj } from '../node/object'
import { ListPagination, Query, PaginationSrc } from './list-pagination.class'
import { clearMap } from '../node/map'

export class AnoymousBase {
  static __mapTypes = {
    Map: Map,
    clearMap: clearMap,
  };

  static __utils = {
    Query,
    ListPagination,
    PaginationSrc
  };

  constructor (obj) {
    if (obj && typeof obj === 'object') {
      if (Object.getPrototypeOf(this) === Object.getPrototypeOf(obj)) {
        this.shallowCopy(obj)
      }

      this._initialize(obj)
    }
  }

  _initialize (initObj) {}

  shallowCopy (obj) {
    for (let key in obj) {
      this[key] = obj[key]
    }
  }

  shallowPartCopy (obj) {
    for (let key in obj) {
      if (this.hasOwnProperty(key)) {
        this[key] = obj[key]
      }
    }
  }

  secretField (fieldName, value) {
    secretObj(this, fieldName, value)
  }

  secretifyField (fieldName, value) {
    secretifyObj(this, fieldName, value)
  }

  solidifyField (fieldName, value) {
    solidifyObj(this, fieldName, value)
  }

  __settifyField (fieldName, iteratorables = []) {
    if (!this[`__${fieldName}_set__`]) {
      this[`__${fieldName}_set__`] = new Set(iteratorables)
    }
    return this[`__${fieldName}_set__`]
  }

  __getFieldSet (fieldName, iteratorables = []) {
    if (!this[`__${fieldName}_set__`] || !(this[`__${fieldName}_set__`] instanceof Set)) return this.__settifyField(fieldName)

    return this[`__${fieldName}_set__`]
  }

  __mapField (...args) {
    return this.__mappifyField(...args)
  }

  __mappifyField (fieldName, iteratorables = []) {
    if (!this[`__${fieldName}_map__`]) {
      this[`__${fieldName}_map__`] = new Map(iteratorables)
    }
    return this[`__${fieldName}_map__`]
  }

  __clearMappifyField (fieldName, iteratorables = []) {
    // TODO check if iteratorables if iteratorable
    if (!this[`__${fieldName}_clear_map__`]) {
      this[`__${fieldName}_clear_map__`] = new AnoymousBase.__mapTypes.clearMap(iteratorables)
    } else if (this[`__${fieldName}_clear_map__`] instanceof AnoymousBase.__mapTypes.clearMap) {
    } else {
      console.warn(`no valid clearMap-type field in 'fieldName', you should build it first by call '__clearMappifyField(fieldName, iteratorables)'`)
      return this.__clearMappifyField(fieldName, [])
    }

    return this[`__${fieldName}_clear_map__`]
  }

  __setChildOfMap ({child_name: fieldName, list, child_item, idKey = 'id', _assign = false}) {
    if (!__hasChildMap (child_name)) {
      if (!_assign) return
      console.warn(`no '${child_name}' with Map-type in the Object\
it would be assigned as the one map namedof __${fieldName}_map__\
`)
    }
    let childMap = this.__getFieldMap(child_name)

    if (child_item) {
      let { [idKey]: child_id } = child_item
      childMap.set(child_id.toString(), new $orm.Category(child_item))
    }

    for (let _child of list) {
      let { [idKey]: child_id } = _child
      childMap.set(child_id.toString(), new $orm.Category(_child))
    }
  }

  __hasChildMap (fieldName) {
    return this[`__${fieldName}_map__`] && this[`__${fieldName}_map__`] instanceof Map
  }

  __getFieldMap (fieldName, options) {
    if (!this[`__${fieldName}_map__`] || !(this[`__${fieldName}_map__`] instanceof Map)) return this.__mappifyField(fieldName)

    return this[`__${fieldName}_map__`]
  }

  __pagifyField (fieldName, initPaginationSrc) {
    if (!this[`__${fieldName}_pagination__`]) {
      let {offset = 0, size = 20, total = 0} = initPaginationSrc || {}
      this[`__${fieldName}_pagination__`] = new ListPagination([], {offset, size, total})
    }

    return this[`__${fieldName}_pagination__`]
  }

  __getFieldPagination (fieldName) {
    if (!this[`__${fieldName}_pagination__`] || !(this[`__${fieldName}_pagination__`] instanceof ListPagination)) return this.__pagifyField(fieldName)

    return this[`__${fieldName}_pagination__`]
  }
}

export const NoIdBase = AnoymousBase

export class Base extends AnoymousBase {
  static NoId = AnoymousBase;

  constructor (obj) {
    super(obj)
    this.id = obj.id
  }

  getId () {
    return this.id
  }
}

export default Base
