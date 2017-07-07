/**
 * 强制为字符串，至少返回空字符串
 */
export function coerceString (string) {
  if (!string) string = String(string).toString()
  if (typeof string !== 'string') string = string.toString()
  if (!string.length) return ''
  return string
}

/**
 * 使得一个字符串首字母大写
 *
 * capitalize('abc') === 'Abc'
 * capitalize('') === ''
 * capitalize(NaN) === 'NaN'
 * capitalize(undefined) === 'Undefined'
 * capitalize(null) === 'Null'
 * capitalize(0) === '0'
 */
export function capitalize (string) {
  if (!(string = coerceString(string))) return string
  return string[0].toUpperCase() + string.slice(1)
}

/**
 * 使得中横线风格转化为驼峰风格
 *
 * kebab2camel('abc-component') // abcComponent
 * kebab2camel('abc-com-ponent') // abcComPonent
 * kebab2camel('-abc-component') // AbcComponent
 * kebab2camel('-abc-component-') // AbcComponent
 * kebab2camel() // undefined
 * kebab2camel(null) // null
 */
export function kebab2camel (string) {
  if (!(string = coerceString(string))) return string
  return string.replace(/-(.)?/g, (match, p1, offset, wholeStr) => {
    return p1 ? p1.toUpperCase() : ''
  })
}

/**
 * 使得驼峰风格转化为中横线风格
 *
 * camel2kebab('abcComponent') abc-component
 * camel2kebab('AbcComponent') abc-component
 * camel2kebab('Abccomponent') abccomponent
 * camel2kebab('AbccomponenT') abccomponen-t
 * camel2kebab('')
 * camel2kebab() undefined
 * camel2kebab(null) null
 * camel2kebab(undefined) undefined
 */
export function camel2kebab (string, options) {
  if (!(string = coerceString(string))) return string
  return string.replace(/[A-Z]{1}/g, (match, offset, wholeStr) => {
    if (offset === 0) return match.toLowerCase()
    return '-' + match.toLowerCase()
  })
}

/**
 * 使得下划线风格转化为驼峰风格
 *
 * kebab2camel('abc_component') // abcComponent
 * kebab2camel('abc_com_ponent') // abcComPonent
 * kebab2camel('_abc_component') // AbcComponent
 * kebab2camel('_abc_component_') // AbcComponent
 * kebab2camel() // undefined
 * kebab2camel(null) // null
 */
export function underscore2camel (string) {
  if (!(string = coerceString(string))) return string
  return string.replace(/_(.)?/g, (match, p1, offset, wholeStr) => {
    return p1 ? p1.toUpperCase() : ''
  })
}
export const _2camel = underscore2camel
/**
 * 使得驼峰风格转化为下划线风格
 *
 * camel2kebab('abcComponent') abc_component
 * camel2kebab('AbcComponent') abc_component
 * camel2kebab('Abccomponent') abccomponent
 * camel2kebab('AbccomponenT') abccomponen_t
 * camel2kebab('')
 * camel2kebab() undefined
 * camel2kebab(null) null
 * camel2kebab(undefined) undefined
 */
export function camel2underscore (string, options) {
  if (!(string = coerceString(string))) return string
  return string.replace(/[A-Z]{1}/g, (match, offset, wholeStr) => {
    if (offset === 0) return match.toLowerCase()
    return '_' + match.toLowerCase()
  })
}
export const camel2_ = camel2underscore
