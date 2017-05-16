import * as fluxModules from '../module'

const defaultFilterNs = (ns) => ns.replace(/\/index$/, '')

const defaultEmpty = () => {}

function genFluxModulesFromFcHash (FcHash = {}, options) {
  let {
        modules = {},
        filterNamespace = defaultFilterNs,
        onModuleGenerate = defaultEmpty,
        onModuleGenerated = defaultEmpty,
        prefix: module_prefix = '',
        suffix: module_suffix = '',
        filter = null,
        ...cfgs
      } = options || {}

  let canfilter = typeof filter === 'function'

  for (let key of Object.keys(FcHash)) {
    let { namespace, module_key } = fluxModules.relPathToNsAndModuleKey(key, { module_prefix, module_suffix, filterNamespace })

    if (modules.hasOwnProperty(module_key)) {
      console.warn(`module ${module_key} has exist in the modules, check your input FcHash object and remove the equivant vuex2-style module file.`)
      return
    }

    let exportContent = {...FcHash[key]}

    cfgs.module_key = module_key
    cfgs.namespace = namespace
    onModuleGenerate({rawModule: exportContent, module_key, namespace})
    bindFluxModule(exportContent, modules, cfgs)
    modules[module_key] && onModuleGenerated(modules[module_key], {exportContent, modules, module_key, namespace})
  }

  return modules
}

function genFluxModulesFromWebpackCtx (webpackRequireContext = {}, options) {
  let {
        modules = {},
        filterNamespace = defaultFilterNs,
        onModuleGenerate = defaultEmpty,
        onModuleGenerated = defaultEmpty,
        prefix: module_prefix = '',
        suffix: module_suffix = '',
        ...cfgs
      } = options || {}

  for (let key of webpackRequireContext.keys()) {
    if (key === './index.js') {
      return
    }

    let { namespace, module_key } = fluxModules.relPathToNsAndModuleKey(key, { module_prefix, module_suffix, filterNamespace })

    if (modules.hasOwnProperty(module_key)) {
      console.warn(`module ${module_key} has exist in the modules, check your input webpackRequireContext object and remove the equivant vuex2-style module file.`)
      return
    }

    let exportContent = {...webpackRequireContext(key)}

    cfgs.module_key = module_key
    cfgs.namespace = namespace
    onModuleGenerate({rawModule: exportContent, module_key, namespace})
    bindFluxModule(exportContent, modules, cfgs)
    modules[module_key] && onModuleGenerated(modules[module_key], {exportContent, modules, module_key, namespace})
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

function bindFluxModule (exportContent, modules, cfgs) {
  let { module_key, namespace, onNewMutation, onNewGetter, onNewAction } = cfgs || {}
  fluxModules.fixMObject(exportContent.M, {
    module_key,
    namespace,
    MGetter: () => modules[module_key]
  })
  // correspond to the mutations
  fluxModules.normalizeTypesAndMutationsOfExportContent({exportContent, onNewMutation})
  fluxModules.normalizeGettersAndActionsOfExportContent({exportContent, onNewGetter, onNewAction})

  modules[module_key] = exportContent.default = exportContent
  modules[module_key].toString = modules[module_key].valueOf = () => exportContent.M.PREFIX
  modules[module_key].M.toString = modules[module_key].M.valueOf = () => module_key

  return { module_key, namespace, module: modules[module_key] }
}
