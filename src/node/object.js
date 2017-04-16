export const secretifyObj = (obj, propertyName, value, options) => {
  let { descriptor, lteIE8 = false } = options || {},
      { configurable = false, writable = false } = descriptor || {}

  if (obj && typeof obj === 'object') {
    // never change value firstly, that's ineffective
    if (lteIE8) {
      obj[propertyName] = value
      return obj
    }

    let obj_descriptor = Object.getOwnPropertyDescriptor(obj, propertyName)
    let new_descriptor = { value: value === undefined ? obj[propertyName] : value, enumerable: false, configurable, writable }

    if (obj.hasOwnProperty(propertyName)) {
      if (obj_descriptor.writable) {
        obj[propertyName] = value
        Object.defineProperty(obj, propertyName, new_descriptor)
      }
    } else {
      Object.defineProperty(obj, propertyName, new_descriptor)
    }
  }
  return obj
}

export const solidifyObj = (...args) => {
  let {descriptor} = args[3] || {}
  args[3] = {
    ...args[3],
    descriptor: {
      ...descriptor,
      configurable: false,
      writable: false
    }
  }
}

export const secretObj = (...args) => {
  let {descriptor} = args[3] || {}
  args[3] = {
    ...args[3],
    descriptor: {
      ...descriptor,
      configurable: true,
      writable: true
    }
  }

  return secretifyObj(...args)
}

export const getFreezedPropertyFromObj = (obj, properties = []) => {
  let propertiesObj = {}
  for (let propertyKey in properties) {
    if (obj.hasOwnProperty(propertyKey)) {
      propertiesObj[propertyKey] = obj[propertyKey]
    }
  }

  return propertiesObj
}

export function valueInObject (value, obj, options) {
  let inIt = false, { strict = true } = options || {}
  for (let key in obj) {
    if ((!strict && value.toString() === obj[key].toString()) || value === obj[key]) {
      inIt = true
      break
    }
  }

  return inIt
}
