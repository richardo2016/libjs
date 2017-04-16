export const primitives = {
  number: 'number',
  undefined: 'undefined',
  string: 'string',
  boolean: 'boolean',
  object: 'object'
}

export function force ({value, type, ...params}) {
  if (!primitives.hasOwnProperty(type)) {
    console.warn(`invalid primitive type given: ${type}`)
    return
  }

  switch (type) {
    default:
      break
    case primitives.undefined:
      return undefined
    case primitives.number:
      if (typeof value === primitives.number) return value
      value = parseInt(value)
      return !isNaN(value) && value
    case primitives.string:
      value = value && value.toString()
      return value
    case primitives.boolean:
      return !!value
    case primitives.object:
      return new Object(value)
  }
}

export function forceNumber (value) {
  return force({value, type: primitives.number})
}

export function forceString (value) {
  return force({value, type: primitives.string})
}
