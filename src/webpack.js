export function importDirectories (webpackRequireContext = {}, options) {
  let direcotry = {}
  let {
    matchReg = /\.\/(.*)\.(j|t)s$/,
    excludeFilePatterns = [],
    keepWebpackContext = false,
    assign = true,
    fileNameFilter,
    filterModule
  } = options || {}

  let callback = typeof filterModule === 'function'
  webpackRequireContext.keys().forEach(fileKey => {
    let [_, fileName] = fileKey.match(matchReg) || []
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

    direcotry[fileName] = !keepWebpackContext ? {...webpackRequireContext(fileKey)} : webpackRequireContext(fileKey)
    if (callback) {
      let newModule = filterModule({module: direcotry[fileName]})
      if (assign && newModule) {
        direcotry[fileName] = newModule
      }
    }
  })

  return direcotry
}
