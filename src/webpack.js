export function importDirectories (webpackRequireContext = {}, options) {
  let direcotry = {}
  let { matchReg = /\.\/(.*)\.js$/, excludeFilePatterns = [], fileNameFilter } = options || {}

  webpackRequireContext.keys().forEach(fileKey => {
    let [_, fileName] = fileKey.match(matchReg)
    if (!fileName) {
      console.warn(`no fileName matched by regex ${matchReg} for '${fileKey}'`)
      return
    }

    for (let pattern of excludeFilePatterns) {
      switch (typeof pattern) {
        case 'string':
          if (fileName === pattern) {
            return
          }
          break
        case 'object':
          if (pattern instanceof RegExp && pattern.test(fileName)) {
            return
          }
          break
      }
    }

    if (typeof fileNameFilter === 'function') {
      fileName = fileNameFilter(fileName)
    }

    direcotry[fileName] = webpackRequireContext(fileKey)
  })

  return direcotry
}
