class ValidationResult {
  constructor ({err, kvs}) {
    this.err = err
    this.kvs = kvs
  }
}

class ValidationError {
  constructor (error = {}) {
    if (typeof error === 'string') {
      this.info = error
    } else {
      let { info = '' } = error || {}
      this.info = info
    }
  }
}

class ValidationSuccess {}

export const defaultFuncs = {
  not_empty: ({value}) => !!value,
  is_number: ({value}) => typeof value === 'number' && !isNaN(value),
  is_string: ({value}) => typeof value === 'string',
  is_a: ({value, type}) => value instanceof type,
  between: ({value, min, max}) => {
    if (!defaultFuncs.is_number({value: min})) {
      console.error(`you must give one numberic for 'min'`)
      return
    } else if (!defaultFuncs.is_number({value: max})) {
      console.error(`you must give one numberic for 'max'`)
      return
    }

    return defaultFuncs.is_number({value}) && value < max && value > min
  },
  in_list: ({value, list = []}) => {
    if (list instanceof Array) {
      return list.indexOf(value) > -1
    }
    console.error(`list for validation 'in_list' must be an array`)
  },
  in_obj: ({value, object}) => value in object,
  of_obj: ({value, object}) => object.hasOwnProperty(value)
}

export default class Validation {
  static isOk (err) {
    return err instanceof ValidationSuccess
  }

  static isError (err) {
    return err instanceof ValidationError
  }

  static validate (validations = {}, funcs = defaultFuncs) {
    let kvs = {}

    for (let fieldKey of Object.keys(validations)) {
      let { name: fieldName = fieldKey, ...rest } = validations[fieldKey] || {}
      if (!fieldName) continue

      if (typeof fieldName !== 'string') {
        throw new Error(`field's name must be string.`)
      }

      let { value, func, payload, error_info = `'${fieldName}' is invalid` } = rest || {}

      if (typeof func === 'string' && funcs.hasOwnProperty(func)) {
        func = funcs[func]
      }

      if (typeof func !== 'function') {
        throw new Error(`invalid func provided for field ${fieldName}`)
      }

      let result = func({...payload, value})
      // console.info('value', value)
      // console.info('func', func)
      // console.info('result', result)

      if (!result) {
        return new ValidationResult({
          err: new ValidationError({info: error_info})
        })
      }

      if (result instanceof ValidationError) {
        return new ValidationResult({
          err: result
        })
      }

      kvs[fieldName] = value
    }

    return new ValidationResult({
      err: null, // new ValidationSuccess(),
      kvs
    })

  }
}
