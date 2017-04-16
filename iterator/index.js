export function mixinListIterator (options) {
  let { list = [], generator, yieldIt } = options || {}

  yieldIt = yieldIt || (({index, list}) => list[index])

  generator = generator || function * () {
    let index = 0, len = list.length
    while (index < len) {
      yield yieldIt({list, index: index++})
    }
  }

  list[Symbol.iterator] = generator
  return list
}
