import { coerceString } from "../primitive/string";

interface MixinListIteratorType<ITEMT = any> {
  list: ITEMT[]
  generator?: {(): IterableIterator<any>}
  yieldIt?: (payload: {index: number, list: ITEMT[]}) => ITEMT
}

function noop () {}
export function mixinListIterator (options: MixinListIteratorType) {

  let {
    list = [],
    yieldIt = noop,
    generator = function * () {
      let index = 0, len = list.length
      while (index < len) {
        yield yieldIt({list, index: index++})
      }
    }
  } = options || {}

  yieldIt = yieldIt || (({index, list}) => list[index])

  list[Symbol.iterator] = generator
  return list
}

export function iteratorable (object: object) {
  if (object === null || typeof object !== 'object') {
    return false
  }

  return Object.getOwnPropertySymbols(object).indexOf(Symbol.iterator) > -1
}

export function enumHash (obj: object, options: {keepNumber?: boolean}) {
  let enumPayload = {}, { keepNumber = false } = options || {}
  for (let key in obj) {
    let value = obj[key]
    if (value === undefined || value === null) {
      console.warn(`invalid value "${value}" in source object, check it`)
      value = String(value)
      continue
    }
    if (keepNumber) {
      let temp
      /* eslint-disable no-multi-spaces */
      key   = coerceString(isNaN((temp = parseInt(key)))   ? key : temp)
      value = isNaN((temp = parseInt(value))) ? value : temp
      /* eslint-enable no-multi-spaces */
    }
    enumPayload[enumPayload[key] = value] = key
  }
  return enumPayload
}

export function enumNumHash (obj: object, options: {keepNumber?: boolean} = {}) {
  options.keepNumber = true
  return enumHash(obj, options)
}

/**
 * @brief do keymirror with one array or object
 *
 * {1: 2, 3: 4} => {1: 2, 2: 1, 3: 4, 4: 3}
 *
 * @test
 * ```
 * let keys = [1, 2, 3, 4, 5], keyHash = {1: undefined, 2: null, 3: 'c', 4: '5'}
 * console.info('enumKeyMirror', enumKeyMirror(keys), enumKeyMirror(keyHash))
 * ```
 *
 * applying in runtime is not recommended, you can pre-set the object always,
 * so you can use this function in pre-processing, e.g. in webpack's loader.
 *
 * @param  [description]
 * @return [description]
 */
export function enumKeyMirror (entries: object, options: {keepExist?: boolean} = {}) {
  if (typeof entries !== 'object') return

  let enumPayload = {}, {keepExist = false} = options
  if (!Array.isArray(entries)) {
    for (let key in entries) {
      if (!entries.hasOwnProperty(key) || !keepExist) enumPayload[enumPayload[key] = key] = key
    }
  } else {
    for (let value of entries) {
      if (!entries.hasOwnProperty(value) || !keepExist) enumPayload[enumPayload[value] = value] = value
    }
  }
  return enumPayload
}
