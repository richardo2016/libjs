export function getQuries = (queryString) {
  if (!queryString && typeof window !== 'undefined') {
    let { search } = window.location
    if (search.indexOf('?') === 0) {
      queryString = search.slice(1)
    } else {
      let pos = window.location.hash.indexOf('?')
      if (pos > -1) queryString = window.location.hash.slice(pos + 1)
    }
  }

  let query = {}
  if (queryString) {
    let arr = queryString.split('&'), arrLen = arr.length
    for (let i = 0; i < arrLen; i++) {
      let [key, value] = arr[i].split('=')
      if (key) query[key] = value
    }
  }

  return query
}
