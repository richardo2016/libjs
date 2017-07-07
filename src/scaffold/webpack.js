export function importDirectories (webpackRequireContext = {}, options) {
  let direcotry = {}
  let {
    matchReg = /\.\/(.*)\.(j|t)s$/,
    excludeFilePatterns = [],
    keepWebpackContext = false,
    fileNameFilter,
    filterModule
  } = options || {}

  let callbackNewModule = typeof filterModule === 'function'
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

    let origName, newName = origName = fileName
    if (typeof fileNameFilter === 'function') {
      newName = fileNameFilter(origName)
    }

    direcotry[newName] = !keepWebpackContext ? {...webpackRequireContext(fileKey)} : webpackRequireContext(fileKey)
    if (callbackNewModule) {
      let newModule = filterModule({newName, origName, module: direcotry[newName]})
      if (newModule) {
        direcotry[newName] = newModule
      }
    }
  })

  return direcotry
}
