import * as fluxModules from './flux-modules'
import Vuex from 'vuex' // vuex2

/**
 * vuex2-style module generator
 *
 */
export function genVuexModules (webpackRequireContext = {}, options) {
  let modules = {},
      {
        prefix: module_prefix = '',
        suffix: module_suffix = ''
      } = options || {}

  webpackRequireContext.keys().forEach((key) => {
    if (key === './index.js') {
      return
    }

    let { namespace, module_key } = fluxModules.relPathToNsAndModuleKey(key, {
      filterNamespace: (ns) => ns.replace(/\/index$/, '')
    })

    if (modules.hasOwnProperty(module_key)) {
      console.warn(`module ${module_key} has exist in the modules, check your input webpackRequireContext object and remove the equivant vuex2-style module file.`)
      return
    }

    // TODO: 重复键名检测
    let exportContent = {...webpackRequireContext(key)}

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
  })

  return modules
}

// never change module in this definition
export function getModuleStateFromStore ({module = {}, runtimeStore = {}}) {
  if (!module.hasOwnProperty('M')) {
    console.warn(`no 'M' in module`)
    return
  }

  let { M = {} } = module || {}
  return runtimeStore.state[M.GETTER_KEY]
}

/**
 * Bind the vm with `$store` for the getters genareted by `Vuex.mapGetters` in raw environment
 *
 * @return {[type]} [description]
 */
export function bindVmToGetterHash (getterHash, vm) {
  for (let key in getterHash) {
    let _type = typeof getterHash[key]
    switch (_type) {
      case 'function':
        let rawFn = getterHash[key]
        // getterHash[key] = rawFn.bind(vm)
        // provide args when `getter` is one `function to being called` rather than just `property getter function`
        getterHash[key] = (...args) => rawFn.call(vm)(...args)
        break
      default:
        break
    }
  }
  return getterHash
}

/**
 * Bind the vm with `$store` for the getters genareted by `Vuex.mapActions` in raw environment
 *
 * @return {[type]} [description]
 */
export function bindVmToGetter (getterFn, vm) {
  if ('$store' in vm && typeof vm.$store === 'object') {
    let _type = typeof getterFn
    switch (_type) {
      case 'function':
        let rawFn = getterFn
        return (...args) => rawFn.call(vm)(...args)
      default:
        console.warn(`invalid getter for vuex module supplied, it must has one function.`)
        break
    }
  } else {
    console.warn(`invalid vm supplied, it must has one field named '$store' and with 'object(Vuex.Store)' type.`)
  }
}

/**
 * Bind the vm with `$store` for the actions genareted by `Vuex.mapActions` in raw environment
 *
 * @return {[type]} [description]
 */
export function bindVmToActionHash (actionHash, vm) {
  for (let key in actionHash) {
    let rawFn = actionHash[key]
    actionHash[key] = rawFn.bind(vm)
  }
  return actionHash
}

/**
 * Bind the vm with `$store` for the actions genareted by `Vuex.mapActions` in raw environment
 *
 * @return {[type]} [description]
 */
export function bindVmToAction (action, vm) {
  if ('$store' in vm && typeof vm.$store === 'object') {
    return action.bind(vm)
  } else {
    console.warn(`invalid vm supplied, it must has one field named '$store' and with 'object(Vuex.Store)' type.`)
  }
}

/**
 * enhance the capability of one vuex2-style module,
 * make it has capability to call it's own actions and getters(getter function recommended)
 * in **raw environment**, so the vm object with one '$store' field is required.
 *
 * @param  {Object} module         [vuex2 style module]
 * @param  {Object} options.$store [$store generated by new Vuex.Store()]
 * @param  {Object} options.vm     [description]
 * @return {Object}                [the module self]
 */
export function enhanceVuexModules (module, {$store, vm = {$store}}) {
  if (typeof module !== 'object') {
    console.warn(`invalid vuex2-style module supplied, it should be one object with fields 'actions' and 'getters'`)
    return
  }

  if (!vm || !(vm.$store instanceof Vuex.Store)) {
    console.warn(`invalid vm supplied, it should be one object with field '$store', and vm.$store must be the instance of Vuex.Store constructor.`)
    return
  }

  let { M = {} } = module,
      {
        enhanceModuleAction = true,
        enhanceModuleGetter = true,
        enhanceModuleMutation = true
      } = M

  if (enhanceModuleAction) {
    let actions = module.actions

    if (typeof M.vactions$ !== 'object') M.vactions$ = {}

    for (let aKey in actions) {
      let { noHash } = actions[aKey] || {}
      if (!noHash || !noHash.origKey || !noHash.newKey) {
        continue // ignore the module's action without the 'noHash' descriptor
      }
      M.vactions$[noHash.origKey] = `${noHash.newKey}`
    }
    M.vactions$ = bindVmToActionHash(Vuex.mapActions(M.vactions$), vm)
  }

  if (enhanceModuleGetter) {
    let getters = module.getters
    if (typeof M.vgetters$ !== 'object') M.vgetters$ = {}
    for (let gKey in getters) {
      let { noHash } = getters[gKey] || {}
      if (!noHash || !noHash.origKey || !noHash.newKey) {
        continue // ignore the module's getter without the 'noHash' descriptor
      }
      M.vgetters$[noHash.origKey] = `${noHash.newKey}`
    }

    M.vgetters$ = bindVmToGetterHash(Vuex.mapGetters(M.vgetters$), vm)
  }

  return module
}
