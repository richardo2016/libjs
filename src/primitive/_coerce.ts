export const types = {
  number: 'number',
  undefined: 'undefined',
  string: 'string',
  boolean: 'boolean',
  object: 'object'
}

interface CorceFnTypeOptions {
  value: any
  type: string
}
export function coerce ({value, type}: CorceFnTypeOptions) {
  if (!types.hasOwnProperty(type)) {
    console.warn(`invalid primitive type given: ${type}`)
    return
  }

  let _type = typeof value
  switch (type) {
    default:
    case types.object:
      if (value === null) return {}

      if (typeof value !== 'object') {
        console.warn('non-empty object expected')
        return {}
      }
      return value
    case types.undefined:
      return undefined
    case types.number:
      if (_type === types.number && !isNaN(value)) return value
      value = parseFloat(value)
      return !isNaN(value) ? value : undefined
    case types.string:
      if (!value || typeof value !== 'string') {
        value = String(value).toString()
      }
      return value
    case types.boolean:
      return !!value
  }
}

export function coerceString (value: any) {
  return coerce({value, type: types.string})
}

export function coerceNumber (value: any) {
  return coerce({value, type: types.number})
}

export function corceObject (value: object): object {
  return coerce({value, type: types.object})
}
