import * as FluxModules from './flux-modules'

export const prefixTypes = (types, prefix = 'CVD_', cb) => {
  if (prefix[prefix.length - 1] !== '_') {
    prefix += '_'
  }

  let cbCanExe = typeof cb === 'function'
  for (let type_key in types) {
    let new_key = prefix + types[type_key]
    types[type_key] = prefix + types[type_key]
    cbCanExe && cb(type_key, new_key)
  }
  return types
}

export let emptyReucerGen = (defaultState = null) => {
  return (state = {...defaultState}, action = {}) => {
    return state
  }
}

export const genModuleStore = (requireContext = {}, options) => {
  // files path is relative the path where this function called
  let { excludeFiles = ['./index.js'],
        fullExport = false,
        override = false,
        // overrideGetterKey = true,
        prefix: module_prefix = '',
        suffix: module_suffix = ''
  } = options || {}

  // webpack's context

  // TODO: check requireContext's type according `[[iterator]]`
  if (!requireContext.keys) {
    console.warn('one valid required file collection expected.')
    return false
  }
  let files = requireContext,
      modules = {},
      reducers = {}

  files.keys().forEach((key) => {
    if (excludeFiles.indexOf(key) > -1) {
      return
    }

    let module_key = key.replace(/(\.\/|\.js)/g, ''),
        exportContent = files(key),
        { default: exportContentDefault = {} } = exportContent

    exportContentDefault = {
      state: exportContent.state,
      // mutations: exportContent.mutations,
      types: exportContent.types,
      actions: exportContent.actions,
      getters: exportContent.getters,
      ...exportContentDefault
    }

    if (!module_key) {
      return
    }

    if (typeof module_prefix === 'string') {
      module_key = module_prefix + module_key
    }

    if (typeof module_suffix === 'string') {
      module_key += module_suffix
    }

    if (modules.hasOwnProperty(module_key)) {
      console.warn(`module ${module_key} with path '${key}' has been in module collection, the latest added module would${override ? ' ' : 'not '}override the earlier added one, maybe you import files with same name from diffrent path`)
    }

    let reducerOrigDefaultFn
    /* let state to be default reducer */
    if (typeof exportContentDefault !== 'object' || !exportContentDefault.hasOwnProperty('state')) {
      console.warn(`${module_key} is not a valid vuex2-like reducer, system would auto-fix it with one empty reducer state`)
      reducerOrigDefaultFn = emptyReucerGen({})
    } else {
      reducerOrigDefaultFn = emptyReucerGen({...exportContentDefault.state})
    }

    if (!exportContent.hasOwnProperty('M') || typeof exportContent.M !== 'object') {
      exportContent.M = {}
    }
    FluxModules.fixMObject(exportContent.M, {module_key, MGetter: () => exportContent})
    exportContent.M.fixFnModuleKey = fn => ((fn.__module_key__ = module_key) && fn)

    // deal with types with mutations
    let mutations = {}
    let types = prefixTypes(exportContent.types, module_key, exportContent.mutations && ((orig_type_key, fixed_type_key) => {
      if (exportContent.mutations.hasOwnProperty(orig_type_key)) {
        mutations[fixed_type_key] = exportContent.mutations[orig_type_key]
      }
    })) || {}
    exportContent.types = exportContentDefault.types = types
    exportContent.mutations = exportContentDefault.mutations = mutations

    // deal with actions and getters
    for (let actionKey in exportContent.actions) {
      exportContent.actions[actionKey].__module_key__ = module_key
    }
    for (let getterKey in exportContent.getters) {
      exportContent.getters[getterKey].__module_key__ = module_key
    }

    // TODO: let state to be the modules state src
    modules[module_key] = {
      // prefixTypes ensure the modules[MODULE].types has been set correctly when REDUCERS created
      ...fullExport && { ...exportContent },
      actions: exportContent.actions,
      types: exportContent.types,
      mutations: exportContent.mutations,
      getters: exportContent.getters,
    }

    reducerOrigDefaultFn = ModuleCallbackSupportMutations({module_key, module: modules[module_key], reducerFn: reducerOrigDefaultFn})

    if (reducerOrigDefaultFn) {
      reducers[module_key] = reducerOrigDefaultFn
    } else {
      process.env.NOED_ENV !== 'production' && console.warn(`may be you forget to export default the module ${module_key} reducer in ${key}? or it's not one reducer which should't in this directory`)
    }
  })

  return {
    modules,
    reducers
  }
}

export const ModuleCallbackSupportMutations = ({module, module_key, reducerFn}) => {
  /**
   * mutation is effective tools that combine
   * reducer's actionType-statement(from mutation's key)
   * and reducer's actionType-return-value.
   *
   * use case:
   * 1. mutation definition
   * ```
   *   mutations: {
   *     increment (state, n) {
   *       state.count += n
   *     }
   *   }
   * ```
   *
   * 2. commit it
   *   - simple-style
   *     ```
   *       store.commit('INCREMENT', 1)
   *     ```
   * 3. with payload
   *   definition
   *   ```
   *     mutations: {
   *       increment (state, payload) {
   *         state.count += payload.amount
   *       }
   *     }
   *   ```
   *   change it
   *     -
   *       ```
   *         store.commit('type', {
   *           amount: 10
   *         })
   *       ```
   *     - object-style
   *       ```
   *         store.commit({
   *           type: 'INCREMENT',
   *           amount: 10
   *         })
   *       ```
   *
   * reference: http://vuex.vuejs.org/en/mutations.html
   * @type {Object}
   */
  let mutationKeys = module.mutations && Object.keys(module.mutations) || []
  if (mutationKeys.length) {
    // default means reducer
    if (typeof reducerFn === 'function') {
      let defaultFn = reducerFn

      // warning: never change the state's default value in case override the default state in corresponding module
      reducerFn = (state = {...defaultFn(state)}, action = {}) => {
        // TODO: support mutations to be Map and let anything to be the mutation-key
        if (module.mutations.hasOwnProperty(action.type)) {
          let mutation_func = module.mutations[action.type],
              payload = {...action}

          delete payload.type

          // tips: 1.state must be object; 2.re-assign state from object; 3.never cover object but change itself in mutation(Javascript pointer)
          let object = {...state}
          mutation_func(object, payload, { reducer: defaultFn })
          state = object
          return state
        }

        state = defaultFn(state, action)
        return state
      }
    }
  }
  return reducerFn
}

// TODO: test and improve payload style
/**
 * product object for mutation
 *
 * because the payload's keys length is uncertain,
 * we can just pass it as one object
 */
export const storeCommit = (store, ...args) => {
  let payload = [], type, style = 'payload'
  if (!args) {
    args = []
  }

  // maybe IE8 has problem with undefined index
  // object-style: payload
  if (typeof args[0] === 'object' && typeof args[0].type === 'string') {
    type = args[0].type
    payload = {...args[0]}
    delete payload.type
  } else if (typeof args[0] === 'string') {
    type = args[0]
    payload = args[1]
    // payload.shift()
    style = typeof payload === 'object' ? 'payload' : 'basic'
  }

  if (!type) {
    console.warn(`no type supply for this ${style}-style commit`)
    return
  }

  store.dispatch({
    type,
    ...payload
  })
}

export const mergeModules = (...args) => {
  if (!args.length) {
    console.warn('correct arguments expected')
    return
  }

  if (args[0] instanceof Array && args[0].length) {
    args = args[0]
  }

  let finalModules = {}

  args.reduce((prevModule, curModule, currentIndex, arr) => {
    let { name } = curModule
    if (finalModules.hasOwnProperty(name)) {
      finalModules[name] = {
        ...finalModules[name],
        ...curModule
      }
    } else {
      finalModules[name] = prevModule
    }
  })

  return finalModules
}

export const connectStoreFactory = (store, factory_options) => {
  let { slave, stores } = factory_options || {}
  store.commit = (...args) => { storeCommit(store, ...args) }

  return (options) => {
    let { component } = options
    delete options.component

    options.slave = {...slave, ...options.slave}
    options.stores = {...stores, ...options.stores}

    let connectComponentFn = vuexLikeConnect({
      ...options,
      ...{store, warn_no_store: true}
    })

    return Component.isPrototypeOf(component) ? connectComponentFn(component) : connectComponentFn
  }
}
