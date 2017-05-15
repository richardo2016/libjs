import * as fluxModules from '../module'

const defaultFilterNs = (ns) => ns.replace(/\/index$/, '')

export function genFluxModulesFromFcHash (FcHash = {}, options) {
  let modules = {},
      {
        filterNamespace = defaultFilterNs,
        prefix: module_prefix = '',
        suffix: module_suffix = '',
        filter = null
      } = options || {}

  let canfilter = typeof filter === 'function'

  for (let key of Object.keys(FcHash)) {
    let { namespace, module_key } = fluxModules.relPathToNsAndModuleKey(key, { filterNamespace })

    if (modules.hasOwnProperty(module_key)) {
      console.warn(`module ${module_key} has exist in the modules, check your input FcHash object and remove the equivant vuex2-style module file.`)
      return
    }

    let exportContent = {...FcHash[key]}

    bindFluxModule(exportContent, modules, {module_key, module_prefix, module_suffix, namespace})
  }

  return modules
}

export function genFluxModulesFromWebpackCtx (webpackRequireContext = {}, options) {
  let modules = {},
      {
        filterNamespace = defaultFilterNs,
        prefix: module_prefix = '',
        suffix: module_suffix = ''
      } = options || {}

  for (let key of webpackRequireContext.keys()) {
    if (key === './index.js') {
      return
    }

    let { namespace, module_key } = fluxModules.relPathToNsAndModuleKey(key, { filterNamespace })

    if (modules.hasOwnProperty(module_key)) {
      console.warn(`module ${module_key} has exist in the modules, check your input webpackRequireContext object and remove the equivant vuex2-style module file.`)
      return
    }

    let exportContent = {...webpackRequireContext(key)}

    bindFluxModule(exportContent, modules, {module_key, module_prefix, module_suffix, namespace})
  }

  return modules
}

export function genFluxModules (entry, ...rest) {
  switch (typeof entry) {
    case 'object':
      return genFluxModulesFromFcHash(entry, ...rest)
    case 'function':
      if (typeof entry.keys === 'function') {
        return genFluxModulesFromWebpackCtx(entry, ...rest)
      }
      break
    default:
      throw new TypeError(`object or webpack context function required for 'genFluxModules'`)
  }
}

export function bindFluxModule (exportContent, modules, cfgs) {
  let {module_key = '', module_prefix = '', module_suffix = '', namespace = ''} = cfgs || {}
  module_key = fluxModules.prefixer({module_name: module_key, module_prefix})
  module_key = fluxModules.suffixer({module_name: module_key, module_suffix})

  fluxModules.fixMObject(exportContent.M, {
    module_key,
    namespace,
    MGetter: () => exportContent
  })

  // correspond to the mutations
  fluxModules.normalizeTypesAndMutationsOfExportContent({exportContent})
  fluxModules.normalizeGettersAndActionsOfExportContent({exportContent})

  modules[module_key] = exportContent.default = exportContent
  modules[module_key].toString = modules[module_key].valueOf = () => exportContent.M.PREFIX
  modules[module_key].M.toString = modules[module_key].M.valueOf = () => module_key

  modules[module_key] = exportContent.default = exportContent
}
