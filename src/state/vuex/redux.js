import * as fluxModules from './module'

export function genFluxModules (fcHash, options) {
  let modules = {},
      {
        prefix: module_prefix = '',
        suffix: module_suffix = ''
      } = options || {}


  for (let filepath in fcHash) {
    if (filepath === './index.js') {
      return
    }

    let { namespace, module_key } = fluxModules.relPathToNsAndModuleKey(filepath, {
      filterNamespace: (ns) => ns.replace(/\/index$/, '')
    })

    if (modules.hasOwnProperty(module_key)) {
      console.warn(`module ${module_key} has exist in the modules, check your input webpackRequireContext object and remove the equivant vuex2-style module file.`)
      return
    }

    // TODO: 重复键名检测
    let exportContent = {...fcHash[filepath]}

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
  }

  return modules
}
