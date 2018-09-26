import { coerceString } from './_coerce'
export const coerce = coerceString

/**
 * @brief capitalize one string
 *
 * @use_cases <br />
 *
 * ```javascript
 *   capitalize('abc') === 'Abc'
 *   capitalize('') === ''
 *   capitalize(NaN) === 'NaN'
 *   capitalize(undefined) === 'Undefined'
 *   capitalize(null) === 'Null'
 *   capitalize(0) === '0'
 * ```
 *
 * @kind       primitives
 */
export function capitalize (string: string) {
  if (!(string = coerceString(string))) return string
  return string[0].toUpperCase() + string.slice(1)
}

/**
 * @brief transfer kebab-style string to camel-style
 *
 * @use_cases <br />
 *
 * ```javascript
 *   kebab2camel('abc-component') === abcComponent
 *   kebab2camel('abc-com-ponent') === abcComPonent
 *   kebab2camel('-abc-component') === AbcComponent
 *   kebab2camel('-abc-component-') === AbcComponent
 *   kebab2camel() === undefined
 *   kebab2camel(null) === null
 * ```
 *
 * @kind       primitives
 */
export function kebab2camel (string: string) {
  if (!(string = coerceString(string)))
    return string

  return string.replace(/-(.)?/g, (match: string, p1: string, offset: number, wholeStr: string) => {
    return p1 ? p1.toUpperCase() : ''
  })
}

/**
 * @brief transfer camel-style string to kebab-style
 *
 * @use_cases <br />
 *
 * ```javascript
 *   camel2kebab('abcComponent') abc-component
 *   camel2kebab('AbcComponent') abc-component
 *   camel2kebab('Abccomponent') abccomponent
 *   camel2kebab('AbccomponenT') abccomponen-t
 *   camel2kebab('')
 *   camel2kebab() undefined
 *   camel2kebab(null) null
 *   camel2kebab(undefined) undefined
 * ```
 *
 * @kind       primitives
 */
export function camel2kebab (string: string) {
  if (!(string = coerceString(string))) return string
  return string.replace(/[A-Z]{1}/g, (match: string, offset: number, wholeStr: string) => {
    if (offset === 0) return match.toLowerCase()
    return '-' + match.toLowerCase()
  })
}

/**
 * @brief transfer underscore-style string to camel-style
 *
 * @use_cases <br />
 *
 * ```javascript
 *   underscore2camel('abc_component') === abcComponent
 *   underscore2camel('abc_com_ponent') === abcComPonent
 *   underscore2camel('_abc_component') === AbcComponent
 *   underscore2camel('_abc_component_') === AbcComponent
 *   underscore2camel() === undefined
 *   underscore2camel(null) === null
 * ```
 *
 * @kind       primitives
 */
export function underscore2camel (string: string) {
  if (!(string = coerceString(string))) return string
  return string.replace(/_(.)?/g, (match: string, p1, offset: number, wholeStr: string) => {
    return p1 ? p1.toUpperCase() : ''
  })
}
export const _2camel = underscore2camel
/**
 * @brief transfer camel-style string to underscore-style
 *
 * @use_cases <br />
 *
 * ```javascript
 *   camel2underscore('abcComponent') abc_component
 *   camel2underscore('AbcComponent') abc_component
 *   camel2underscore('Abccomponent') abccomponent
 *   camel2underscore('AbccomponenT') abccomponen_t
 *   camel2underscore('')
 *   camel2underscore() undefined
 *   camel2underscore(null) null
 *   camel2underscore(undefined) undefined
 * ```
 *
 * @kind       primitives
 */
export function camel2underscore (string: string) {
  if (!(string = coerceString(string))) return string
  return string.replace(/[A-Z]{1}/g, (match: string, offset: number, wholeStr: string) => {
    if (offset === 0) return match.toLowerCase()
    return '_' + match.toLowerCase()
  })
}
export const camel2_ = camel2underscore
