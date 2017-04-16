export function importDirectories (webpackRequireContext = {}, options) {
  let direcotry = {}
  let { matchReg = /\.\/(.*)\.js$/, fileNameFilter } = options || {}

  webpackRequireContext.keys().map(fileKey => {
    let [_, fileName] = fileKey.match(matchReg)
    if (!fileName) {
      console.warn(`no fileName matched by regex ${matchReg} for '${fileKey}'`)
      return
    }

    if (typeof fileNameFilter === 'function') {
      fileName = fileNameFilter(fileName)
    }

    direcotry[fileName] = webpackRequireContext(fileKey)
  })

  return direcotry
}
