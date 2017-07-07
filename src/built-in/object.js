function corceObject (obj) {
  if (obj === null) return {}

  if (typeof obj !== 'object') {
    console.warn('non-empty object expected')
    return
  }
  return obj
}

/**
 * @brief transform list(array) to keymirror-style hash
 */
export function list2keymirror (list = [], options) {
  if (!Array.isArray(list)) return
  let keymirror = {}
  // let { mainKeys = [] } = options || {}
  for (let key of list) {
    keymirror[key] = key
  }

  return keymirror
}

/**
 * @brief iterate object like `Array.prototype.foreach`, key as index, object[key] as value in callback
 */
export function foreachObject (object, callback, _self = this) {
  object = corceObject(object)
  if (!object) return

  for (let key in object) {
    callback.apply(_self, [object[key], key, object])
  }
}

/**
 * @brief priority: leaveKeys > dropKeys
 * @details filter object's keys with options `leaveKeys` and `dropKeys`
 */
export function filterObject (obj, options) {
  obj = corceObject(obj)
  if (!obj) return

  if (options instanceof Array) {
    options = {dropKeys: options}
  }

  let { leaveKeys = [], dropKeys = [] } = options || {}

  if (!leaveKeys.length) {
    for (let key in obj) {
      if (dropKeys.includes(key)) {
        delete obj[key]
      }
    }
  } else {
    for (let key in obj) {
      if (!leaveKeys.includes(key)) {
        delete obj[key]
      }
    }
  }
}

/**
 * @brief check if one value in object.
 */
export function ofObject (value, obj, options) {
  let ofIt = false, { strict = true } = options || {}
  for (let key in obj) {
    if ((!strict && value == obj[key]) || value === obj[key]) {
      ofIt = true
      break
    }
  }

  return ofIt
}

export function view (object) {
  return Object.getOwnPropertyDescriptors(object)
}

export function viewField (object, property) {
  return Object.getOwnPropertyDescriptor(object, property)
}

export function ofChangeable (object, property) {
  return view(object, property).writable
}

function secretifyObjectProperty (object, property, descriptor = {}) {
  object = corceObject(object)
  if (!object) return

  if (!Object.defineProperty || !Object.getOwnPropertyDescriptor) {
    object[property] = value
    return object
  }
  let { value, configurable = false, writable = false } = descriptor || {}

  let prop_descriptor = Object.getOwnPropertyDescriptor(object, property)
  let new_descriptor = { value: value === undefined ? object[property] : value, enumerable: false, configurable, writable }

  if (object.hasOwnProperty(property)) {
    if (prop_descriptor.writable) {
      object[property] = value
      Object.defineProperty(object, property, new_descriptor)
    }
  } else {
    Object.defineProperty(object, property, new_descriptor)
  }
  return object
}

export function solidifyObj (object, property, descriptor = {}) {
  descriptor = {
    ...descriptor,
    configurable: false,
    writable: false
  }

  return secretifyObjectProperty(object, property, descriptor)
}

export function secretObj (object, property, descriptor = {}) {
  descriptor = {
    ...descriptor,
    configurable: true,
    writable: true
  }

  return secretifyObjectProperty(object, property, descriptor)
}

export function getFreezedPropertyFromObj (obj, properties = []) {
  let propertiesObj = {}
  for (let propertyKey in properties) {
    if (obj.hasOwnProperty(propertyKey)) {
      propertiesObj[propertyKey] = obj[propertyKey]
    }
  }

  return propertiesObj
}

// -------------------------------------- object check utils ----------------------------------------//
function trimItemContent (itemStr = '') {
  return itemStr.trim()
}

export const checkItemObjs = (itemObjs, options) => {
  let result = {
        repeat_elems: [],
        repeat: false,
        empty: true,
        invalid: false
      }, {
        onCheckValid = () => true,
        onFindRepeat = ({itemObj, itemObjs}) => {
          let found_index = itemObjs.indexOf(itemObjs)
          return found_index > -1 && { found_index }
        },
        onCheckRepeat = ({itemObjs, index}) => {
          let repeat = false,
              itemObj = itemObjs[index],
              found = onFindRepeat({itemObj, itemObjs})

          return !found && {indexes: [found, index], itemObj}
        },
        onTryToKeepEmpty = (item) => trimItemContent(item).length === 0
      } = options || {}

  // one itemObjs with Array format expected
  for (let index in itemObjs) {
    let itemObj = itemObjs[index]

    if (result.empty) {
      result.empty = onTryToKeepEmpty(itemObjs[index])
    }

    if (!result.repeat) {
      result.repeat = onCheckRepeat({itemObjs, index})
      if (result.repeat) {
        result.repeat_elems.push(itemObjs[index])
      }
    }

    if (!result.invalid) {
      result.invalid = !onCheckValid(itemObjs[index])
    }
  }

  return result
}

/**
 * filter invalid items by examination function filter func
 */
export function mapObjects (items, callback = ({itemObj}) => itemObj) {
  if (items.length <= 1) {
    // return isItemObjsEmpty(isItemObjsEmpty) ? [{content: ''}] : items
    return items
  }

  for (let index in items) {
    let properties = Object.keys(items[index])

    if (properties.length <= 1 && !trimItemContent(items[index].content)) {
      items[index] = callback({itemObj: items[index], properties, index})
    }
  }

  return items.filter(x => x)
}
