export function group (arr = [], options: { rowCount?: number, fixLast?: boolean, fixUnit?: boolean } = {}) {
  let { rowCount = 2, fixLast = false, fixUnit = undefined } = options || {},
      newArr = [], group: any[] = []

  // console.info(arr, arr.length)
  let arrLen = arr.length
  for (let i = 0; i < arrLen; i++) {
    group.push(arr[i])
    if (group.length === rowCount || i === arr.length - 1) {
      newArr.push(group)
      group = []
    }
  }

  if (fixLast) {
    let lastArr = newArr[newArr.length - 1]
    if (lastArr && lastArr.length < rowCount) {
      while (lastArr.length < rowCount) {
        lastArr.push(fixUnit)
      }
      // lastArr.length = rowCount
      newArr[newArr.length - 1] = lastArr
    }
  }

  return newArr
}
