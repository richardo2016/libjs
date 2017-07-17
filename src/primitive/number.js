import { types, coerce } from './'

/**
 * @brief coerce one value to number
 * @details if the value cannot be parse to number, return `undefined`.
 *
 * @param  value input value
 * @returns value result value
 */
export function coerceNumber (value) {
  return coerce({value, type: types.number})
}
