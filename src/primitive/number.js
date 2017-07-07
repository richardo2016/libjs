import { types, coerce } from './'

export function coerceNumber (value) {
  return coerce({value, type: types.number})
}
