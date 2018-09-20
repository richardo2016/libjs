function corceObject (obj: object): object {
  if (obj === null) return {}

  if (typeof obj !== 'object') {
    console.warn('non-empty object expected')
    return {}
  }
  return obj
}

/**
 * @brief transform list(array) to keymirror-style hash
 */
export function list2keymirror (list = []) {
  if (!Array.isArray(list)) return
  let keymirror = {}
  for (let key of list) {
    keymirror[key] = key
  }

  return keymirror
}

/**
 * @brief iterate object like `Array.prototype.foreach`, key as index, object[key] as value in callback
 */
export function foreachObject (object: object, callback: Function) {
  object = corceObject(object)
  if (!object) return

  for (let key in object) {
    callback.apply(object, [object[key], key, object])
  }
}

/**
 * @brief priority: leaveKeys > dropKeys
 * @details filter object's keys with options `leaveKeys` and `dropKeys`
 */
interface FilterObjectType {
  leaveKeys?: string[]
  dropKeys?: string[]
}
export function filterObject (obj: object, options: string[] | FilterObjectType) {
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
export function ofObject (value: any, obj: object, options?: {strict?: boolean}) {
  let ofIt = false, { strict = true } = options || {}
  for (let key in obj) {
    if ((!strict && value == obj[key]) || value === obj[key]) {
      ofIt = true
      break
    }
  }

  return ofIt
}

export function view (object: object) {
  return Object.getOwnPropertyDescriptors(object)
}

export function viewField (object: object, property: PropertyKey) {
  return Object.getOwnPropertyDescriptor(object, property)
}

export function ofChangeable (object: object, property: PropertyKey) {
  return view(object).writable
}

function secretifyObjectProperty (object: object, property: PropertyKey, newDescriptor: PropertyDescriptor = {}) {
  object = corceObject(object)
  if (!object) return

  let { value = undefined, configurable = false, writable = false } = newDescriptor || {}
  if (!Object.defineProperty || !Object.getOwnPropertyDescriptor) {
    object[property] = value
    return object
  }

  let prop_descriptor = Object.getOwnPropertyDescriptor(object, property)
  let new_descriptor = { value: value === undefined ? object[property] : value, enumerable: false, configurable, writable }

  if (prop_descriptor && object.hasOwnProperty(property)) {
    if (prop_descriptor.writable) {
      object[property] = value
      Object.defineProperty(object, property, new_descriptor)
    }
  } else {
    Object.defineProperty(object, property, new_descriptor)
  }
  return object
}

export function solidifyObj (object: object, property: PropertyKey, descriptor = {}) {
  descriptor = {
    ...descriptor,
    configurable: false,
    writable: false
  }

  return secretifyObjectProperty(object, property, descriptor)
}

export function secretObj (object: object, property: PropertyKey, descriptor = {}) {
  descriptor = {
    ...descriptor,
    configurable: true,
    writable: true
  }

  return secretifyObjectProperty(object, property, descriptor)
}

export function getFreezedPropertyFromObj (obj: object, properties = []) {
  let propertiesObj = {}
  for (let propertyKey in properties) {
    if (obj.hasOwnProperty(propertyKey)) {
      propertiesObj[propertyKey] = obj[propertyKey]
    }
  }

  return propertiesObj
}
