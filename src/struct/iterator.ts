import { coerce as coerceString } from "../primitive/string";

export function iteratorable (object: object) {
  if (object === null || typeof object !== 'object') {
    return false
  }

  return Symbol.iterator in object
}

export function selfIteratorable (object: object) {
  if (object === null || typeof object !== 'object') {
    return false
  }

  return Object.getOwnPropertySymbols(object).indexOf(Symbol.iterator) > -1
}

interface MixinListIteratorType<ITEMT = any> {
  list: ITEMT[]
  generator?: {(): IterableIterator<any>}
  yieldIt?: (payload: {index: number, list: ITEMT[]}) => ITEMT
}

export function mixinListIterator (options: MixinListIteratorType) {

  let {
    list = [],
    yieldIt = null,
    generator = function * () {
      let index = 0, len = list.length
      const selfYield = yieldIt || (({index, list}) => list[index])

      while (index < len) {
        yield selfYield({list, index: index++})
      }
    }
  } = options || {}

  list[Symbol.iterator] = generator
  return list
}

/**
 * @brief make keymirror with one array or object
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
 */
export function enumKeyMirror (entries: object) {
  if (!entries)
    throw 'entries must be non-null object'

  if (typeof entries !== 'object') return

  let enumPayload = {}
  if (!Array.isArray(entries)) {
    for (let key in entries) {
      enumPayload[enumPayload[key] = coerceString(entries[key])] = coerceString(key)
    }
  } else {
    entries.forEach((v, _) => {
      enumPayload[enumPayload[v] = coerceString(v)] = coerceString(v)
    })
  }
  return enumPayload
}
