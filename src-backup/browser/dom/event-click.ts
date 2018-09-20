export async function filesOfInput (event, options) {
  let el = event.target,
      { files = [] } = el || {}

  let proto = Object.getPrototypeOf(files),
      symbols = Object.getOwnPropertySymbols(proto)

  if (symbols.indexOf(Symbol.iterator) === -1) {
    files = Array.apply(null, files)
  }

  return { event, files, resetInput: async () => (event.target.value = '') }
}
