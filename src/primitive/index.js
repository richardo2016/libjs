export const types = {
  number: 'number',
  undefined: 'undefined',
  string: 'string',
  boolean: 'boolean',
  object: 'object'
}

export function coerce ({value, type, ...params}) {
  if (!types.hasOwnProperty(type)) {
    console.warn(`invalid primitive type given: ${type}`)
    return
  }

  switch (type) {
    default:
    case types.object:
      break
    case types.undefined:
      return undefined
    case types.number:
      if (typeof value === types.number) return value
      value = parseFloat(value)
      return !isNaN(value) ? value : undefined
    case types.string:
      value = value && value.toString()
      return value
    case types.boolean:
      return !!value
  }
}
