import { secretObj } from './node/object'

export const ERROR_CODES = {
  SUCCESS: Symbol('SUCCESS'),
  INTERNAL_ERROR: Symbol('INTERNAL_ERROR'),
  PARAM_ERROR: Symbol('PARAM_ERROR'),
  LINK_EXPIRED: Symbol('LINK_EXPIRED'),
  UNLOGINED: Symbol('UNLOGINED'),
  FORBIDDEN_REQUEST: Symbol('FORBIDDEN_REQUEST'),
  NO_ACCESS: Symbol('NO_ACCESS'),
  NO_RESOURCE: Symbol('NO_RESOURCE'),
  REPEAT_RESOURCE: Symbol('REPEAT_RESOURCE'),
  SENSITIVE_WORD: Symbol('SENSITIVE_WORD'),
  VERIFY_CODE_ERROR: Symbol('VERIFY_CODE_ERROR'),
  DOWNLOAD_FAIL: Symbol('DOWNLOAD_FAIL'),
  UNKNOWN_ERROR: Symbol('UNKNOWN_ERROR'),
  EMPTY: Symbol('EMPTY')
}
/**
 * 默认错误错误类型为 1 , 1 属于基本类型,即如果不特别指定,
 * 则产生的错误实例应该出现的时候被立刻显示
 *
 */
export default class ResponseBase {
  static ERROR_CODES = ERROR_CODES;

  constructor (options = {}) {
    let {
      codeKey = 'error_code',
      [codeKey]: code,
      messageKey = 'info',
      [messageKey]: message,
      dataKey = 'data',
      [dataKey]: data
    } = options || {}

    secretObj(this, '$messageKey', messageKey)
    secretObj(this, '$codeKey', codeKey)
    secretObj(this, '$dataKey', dataKey)

    this[this.$messageKey] = message || ''
    this[this.$codeKey] = code || 0
    this[this.$dataKey] = data || ''
  }

  get get () {
    return {
      [this.$codeKey]: this[this.$codeKey],
      [this.$messageKey]: this[this.$messageKey],
      [this.$dataKey]: this[this.$dataKey]
    }
  }

  json () {
    return this.get
  }
}

export const isResponse = (object) => {
  return object instanceof ResponseBase
}

export const error = (message = 'Error', code = 1, payload) => {
  if (arguments.length === 1) {
    return isResponse(message) ? message : new ResponseBase({info: message, error_code: code})
  } else if (arguments.length === 2) {
    return new ResponseBase({info: message, error_code: code})
  } else if (arguments.length > 2) {
    return new ResponseBase({info: message, error_code: code, data: payload})
  }
}

export const errorPromise = async (...args) => {
  return error(...args)
}
