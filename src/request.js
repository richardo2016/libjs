// if you run in browser without fetch support, install fetch-ie8 first
if (!window.fetch) {
  try {
    window.fetch = require('fetch-ie8')
  } catch (e) {
    console.error(`[webmatrix:request]error occured when try to require the 'fetch-ie8'`)
  }
}

let { fetch } = window

import { error, isResponse } from './response' // eslint-disable
import { jsonToParams as normalizeParams } from './params' // eslint-disable
import { secretObj, SetObjPropertyQuietly } from './object' // eslint-disable

export const fixUrlStart = (url = '', options) => {
  if (url.substr(0, 1) !== '/' && !/^https?:\/\//.test(url)) {
    url = '/' + url
  }

  return url
}

export const computeUrl = (_url = '', options) => {
  let { host = '', protocol = window.location.protocol, url = _url, url_addition = '' } = options || {},
      needCors = false
  // TODO: compute the possible host in url
  if (host && host !== window.location.host) {
    if (url.indexOf(host) > -1) {
      url = fixUrlStart(url.replace(new RegExp(`(${host})|(${protocol}(//)?)`, 'ig'), ''))
    }
    url = `${protocol}//${host}${url}`
    needCors = true
  }

  if (typeof options === 'object' && options.hasOwnProperty('cors')) {
    needCors = options.cors
  }

  if (url_addition) {
    url += url_addition
  }

  return {url, needCors}
}

export const R = {}

R.checkResponse = (response) => {
  if (!response.ok) {
    // TOOD: check if request question
    let res = error('服务发生错误，请联系系统管理员')
    res.data = response
    return res.json()
  }

  return response.json()
}

R.onError = (...args) => {
  return error(...args)
}

// default decoration for correct response,
// you can change it when importing it to your project
R.normalizeRes = res => SetObjPropertyQuietly(res, 'R', R)

R.onbefore = (...args) => args

R.requestJson = (url = '', payload = {}, options = {}) => {
  R.onbefore({url, payload, options})

  let { queryParamsObj = {}, method = 'POST' } = options,
      queryParams = normalizeParams(queryParamsObj),
      { url: _url, needCors } = computeUrl(url, options.computeOpts),
      { checkResponse = R.checkResponse } = options

  return fetch(`${_url}${queryParams ? '?' + queryParams : ''}`, {
    method,
    credentials: 'include',
    ...options.fetchOptions,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    },
    // 考察 IE 8 下是否有编码问题
    body: JSON.stringify(payload),
    ...needCors
  })
  .then(checkResponse)
  .then(R.normalizeRes)
  .catch(R.onError)
}

R.get = (url = '', payload = {}, options = {}) => {
  R.onbefore({url, payload, options})

  let { url: _url, needCors } = computeUrl(url, options.computeOpts),
      { checkResponse = R.checkResponse } = options

  return fetch(_url + '?' + normalizeParams(payload), {
    method: 'get',
    credentials: 'include', // default sessions
    ...options.fetchOptions,
    headers: {
      ...options.headers
    },
    ...needCors
  })
  .then(checkResponse)
  .then(R.normalizeRes)
  .catch(R.onError)
}

R.post = (url = '', payload = {}, options = {}) => {
  R.onbefore({url, payload, options})

  let { url: _url, needCors } = computeUrl(url, options.computeOpts),
      { checkResponse = R.checkResponse } = options

  return fetch(_url, {
    method: 'post',
    credentials: 'include', // default sessions
    ...options.fetchOptions,
    headers: {
      ...options.headers,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 考察 IE 8 下是否有编码问题
    ...needCors,
    body: normalizeParams(payload)
  })
  .then(checkResponse)
  .then(R.normalizeRes)
  .catch(R.onError)
}

R.postJson = (url = '', payload = {}, options = {}) => {
  R.onbefore({url, payload, options})

  let { queryParamsObj = {} } = options,
      queryParams = normalizeParams(queryParamsObj),
      { url: _url, needCors } = computeUrl(url, options.computeOpts),
      { checkResponse = R.checkResponse } = options

  return fetch(`${_url}${queryParams ? '?' + queryParams : ''}`, {
    method: 'post',
    credentials: 'include',
    ...options.fetchOptions,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    },
    // 考察 IE 8 下是否有编码问题
    body: JSON.stringify(payload),
    ...needCors
  })
  .then(checkResponse)
  .then(R.normalizeRes)
  .catch(R.onError)
}

R.postFile = async (url = '', payload = {}, options = {}) => {
  // TODO: compact IE 8
  let { file } = payload,
      { url: _url, needCors } = computeUrl(url, options.computeOpts),
      { checkResponse = R.checkResponse } = options

  if (!file) return error('no valid file Given')

  let body = new FormData(payload)
  for (let key in payload) {
    // console.info(key, payload[key])
    body.append(key, payload[key])
  }

  // console.info(body, payload)

  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    ...options.fetchOptions,
    headers: {
      ...options.headers,
      'Accept': 'application/json'
      // 'Content-Type': ContentType,
    },
    body
  })
  .then(checkResponse)
  .then(R.normalizeRes)
  .catch(R.onError)
}

R.delete = (url = '', payload = {}, options = {}) => {
  R.onbefore({url, payload, options})

  let { url: _url, needCors } = computeUrl(url, options.computeOpts),
      { checkResponse = R.checkResponse } = options

  return fetch(_url, {
    method: 'delete',
    credentials: 'include', // default sessions
    ...options.fetchOptions,
    headers: {
      ...options.headers
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 考察 IE 8 下是否有编码问题
    ...needCors,
    body: normalizeParams(payload)
  })
  .then(checkResponse)
  .then(R.normalizeRes)
  .catch(R.onError)
}

R.error = async (...args) => error(...args)

R.errorUtils = {
  isResponse,
  error
}

R.RES_CONSTANT = {
  UNLOGINED: Symbol.for('UNLOGINED'),
  REPEAT_RES: Symbol.for('REPEAT_RES'),
  NO_AUTH_TICKET: Symbol.for('NO_AUTH_TICKET')
}

export default R
