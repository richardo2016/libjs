/**
 * this function can make it easy to import one directory's file as modules, you can
 * filter the module_name, module's content before return the whole hash.
 *
 * @param      {require.context(webpackRequireContext)} webpackRequireContext result from 'require.context(regex|string, ...)' in webpack runtime, which has methods `keys` which returns one iterator for every files included
 * @param      {hash} options options
 *
 * @returns    {hash} one hash object includes all module
 */

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
