export let filterEmptyParam = (obj) => {

}

export let warnParam = (param, options) => {
  if (typeof options === 'string') {
    options = {type: options}
  }

  let { check_empty = true, param_name = 'param', context = 'request', proto } = options || {}
  let errMsgs

  if (check_empty && !param) {
    errMsgs = `${param_name} cannot be empty in ${context}.`
    return new Error(`warn_cb: ${errMsgs}`)
  }

  // TODO: check `type` is in basic type of Javascript
  // if (type && (typeof type === 'string') && (typeof param !== type)) {
  //   errMsgs = `${param_name}'s type should be ${type} in ${context}.`
  //   return new Error(`warn_type_cb: ${errMsgs}`)
  // }

  if (proto && !(param instanceof proto)) {
    errMsgs = `${param_name} should be instance of ${proto.toString()} in ${context}.`
    return new Error(`warn_class_cb: ${errMsgs}`)
  }

  return false
}

export let warnFieldEmpty = (obj, field_name, options) => {
  if (!obj || typeof field_name !== 'string' || !field_name) {
    console.warn('you cannot call this function without enough arguments given.')
    return true
  }

  let { context = 'params', warn_cb } = options || {}

  if (!obj.field_name) {
    typeof warn_cb === 'function' ? warn_cb() : console.warn(`${field_name} cannot be empty in ${context}.`)
    return
  }

  return true
}

export let checkType = () => {

}

export const jsonToParams = (jsonObj) => {
  let query_params = []

  for (let k in jsonObj) {
    let value = encodeURIComponent(jsonObj[k])
    query_params.push(`${k}=${value}`)
  }

  return query_params.join('&')
}

export const normalizeQueries = (jsonObj) => {
  let query_params = []

  for (let k in jsonObj) {
    query_params.push(k + '=' + encodeURIComponent(jsonObj[k]))
  }

  return query_params.join('&')
}

export const normalizeBody = (jsonObj) => {
  let body = []

  for (let k in jsonObj) {
    let value = encodeURIComponent(jsonObj[k])

    body.push(`${k}=${value}`)
  }

  return body.join('&')
}

export const computeParamsByOpt = (params, params_filter) => {
  if (!params_filter) {
    return params
  }

  for (let param_key in params_filter) {
    let filter = params_filter[param_key], filter_type = typeof filter

    switch (filter_type) {
      case 'object':
        break
      case 'string': {
        switch (filter) {
          default:
          case 'optional':
            break
          case 'required':
            if (!params.hasOwnProperty(param_key)) {
              throw new Error(`param ${param_key} required`)
            }
            break
          case 'notempty':
            if (!params.param_key) {
              throw new Error(`param ${param_key} cannot be empty`)
            }
            break
          case 'string':
            if (typeof params[param_key] !== 'string') {
              throw new Error(`param ${param_key} should be string`)
            }
            break
          case 'number':
            if (typeof params[param_key] !== 'number') {
              throw new Error(`param ${param_key} should be number`)
            }
            break
          case 'json':
            if (typeof params[param_key] !== 'string') {
              throw new Error(`param ${param_key} should be json string`)
            }

            try {
              JSON.parse(params[param_key])
            } catch (e) {
              throw new Error(`param ${param_key} should be json string`)
            }

            break
        }
        break
      }
    }
  }

  return params
}

export const getQuries = () => {
  let { search } = window.location
  if (search.indexOf('?') === 0) search = search.slice(1)

  let query = {}, arr = search.split('&'), arrLen = arr.length
  for (let i = 0; i < arrLen; i++) {
    let [key, value] = arr[i].split('=')
    query[key] = value
  }
  return query
}
