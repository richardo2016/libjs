import { lteIE8 } from './ie-shiv/env'
import * as nodeObject from './node/object.js'

export let filterObj = (obj, options) => {
  if (!obj || typeof obj !== 'object') {
    console.warn('non-empty object expected', 'warn')
    return obj
  }

  if (options instanceof Array) {
    options = {catchKeys: options}
  }

  let { leaveKeys = [], catchKeys = [] } = options || {}

  for (let key in obj) {
    if (catchKeys.indexOf(key) > -1 && leaveKeys.indexOf(key) === -1) {
      delete obj[key]
    }
  }
}
export const solidObj = (obj, propertyName, value, options) => {
  options.lteIE8 = lteIE8
  return nodeObject.solidifyObj(obj, propertyName, value, options)
}

// deprecated in release versions and would be replaced with `nodeObject.secretObj`
export const secretObj = nodeObject.secretObj
export const secretifyObj = nodeObject.secretifyObj

// deprected, use `nodeObject.secretObj` instead
export const SetObjPropertyQuietly = nodeObject.secretObj

export const getFreezedPropertyFromObj = nodeObject.getFreezedPropertyFromObj

export const StrArray2Object = (arr, options) => {
  let { mainKeys = [] } = options || {}

  let hasMainKeys = mainKeys.length

  let object = arr.map(elem => {
    if (typeof elem === 'string' && mainKeys.indexOf(elem) === -1) {
      return {
        [elem]: elem
      }
    }
  }).filter(x => x)
  // promot it
  return hasMainKeys ? {
    object,
    mainKeys
  } : object
}

export const valueInObj = nodeObject.valueInObj

// -------------------------------------- object check utils ----------------------------------------//

export let trimItemContent = (itemStr = '') => {
  return itemStr.trim()
}

export let checkItemObjs = (itemObjs, options) => {
  let result = {
        repeat_elems: [],
        repeat: false,
        empty: true,
        invalid: false
      }, {
        onCheckValid = () => true,
        onFindRepeat = ({itemObj, itemObjs}) => {
          let found_index = itemObjs.indexOf(itemObjs)
          return found_index > -1 && { found_index }
        },
        onCheckRepeat = ({itemObjs, index}) => {
          let repeat = false,
              itemObj = itemObjs[index],
              found = onFindRepeat({itemObj, itemObjs})

          return !found && {indexes: [found, index], itemObj}
        },
        onTryToKeepEmpty = (item) => trimItemContent(item).length === 0
      } = options || {}

  // one itemObjs with Array format expected
  for (let index in itemObjs) {
    let itemObj = itemObjs[index]

    if (result.empty) {
      result.empty = onTryToKeepEmpty(itemObjs[index])
    }

    if (!result.repeat) {
      result.repeat = onCheckRepeat({itemObjs, index})
      if (result.repeat) {
        result.repeat_elems.push(itemObjs[index])
      }
    }

    if (!result.invalid) {
      result.invalid = !onCheckValid(itemObjs[index])
    }
  }

  return result
}

/**
 * filter invalid items by examination function filter func
 */
export let filterItemObjs = (itemObjs, filterFunc = ({itemObj}) => itemObj) => {
  if (itemObjs.length <= 1) {
    // return isItemObjsEmpty(isItemObjsEmpty) ? [{content: ''}] : itemObjs
    return itemObjs
  }

  for (let index in itemObjs) {
    let properties = Object.keys(itemObjs[index])

    if (properties.length <= 1 && !trimItemContent(itemObjs[index].content)) {
      itemObjs[index] = filterFunc({itemObj: itemObjs[index], properties, index})
    }
  }

  return itemObjs.filter(x => x)
}

// -------------------------------------- object check utils end ----------------------------------------//

export let forceObj = () => {

}
