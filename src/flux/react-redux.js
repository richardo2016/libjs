import { Component } from 'react'
import { connect as origConnect } from 'react-redux'
import * as fluxModules from './module'

export function genFluxModulesWithReducer (fcHash, options) {
  let modules = {},
      {
        reducers = {},
        prefix: module_prefix = '',
        suffix: module_suffix = ''
      } = options || {}

  let onNewMutation = function ({module_key, mutation, new_type, old_type}) {
    // console.info('onNewMutation', {mutation, new_type, old_type})
    mutation.__module_key__ = module_key
    mutation.__type__ = new_type
  }

  let onNewAction = function ({module_key, action, newKey, origKey}) {
    // console.info('onNewAction', {action, newKey, origKey})
    action.__module_key__ = module_key
  }

  let onNewGetter = function ({module_key, getter, newKey, origKey}) {
    // console.info('onNewGetter', module_key, getter, newKey, origKey)
    getter.__module_key__ = module_key
  }

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
    fluxModules.normalizeTypesAndMutationsOfExportContent({exportContent, onNewMutation})
    fluxModules.normalizeGettersAndActionsOfExportContent({exportContent, onNewAction, onNewGetter})

    modules[module_key] = exportContent.default = exportContent
    reducerOrigDefaultFn = convertMutationToReducerFn({module_key, module: modules[module_key], reducerFn: emptyReucerGen({...exportContent.state})})
    // reducers[module_key] = {default: reducerOrigDefaultFn}
    reducers[module_key] = reducerOrigDefaultFn
  }

  return modules
}

export const connectFlux = function (options) {
  let {
    getters = {},
    /**
     * every action in actions is one function, which would
     * return one standard redux-reducer-return-value, e.g.
     * `
     * {
     *   type: 'ACTION_TYPE',
     *   ... // action data
     * }
     * `
     * @type {Object}
     */
    actions = {},
    mutations = {},
    // TODO check if component is React Component
    propsToState = defaultPropsToState,
    store: $store, // store is just the combined reducers in react-redux
    warnNoStore = true,
    reactReduxOrig,
  } = options || {}, {
    withRef = true,
    pure = true,
    mergeStateToProps,
    mergeDispatchToProps,
    mergeProps,
  } = reactReduxOrig || {}

  if (warnNoStore && (!$store || typeof $store.getState !== 'function')) {
    console.warn('no effective store given, if you want to use $store in React Component, pass it in options')
  }

  if (!getters || typeof getters !== 'object') {
    console.error('geters must be non-empty object')
    getters = {}
  }

  let ofFlux_mergeStateToProps = (state, ownProps) => {
    let computedState = {},
        $state = {
          ...state,
          ...$store.getState()
        }

    // TODO: override the default store's state from <Provider>
    for (let getter_key in getters) {
      console.info('getters[getter_key]', getters, getters[getter_key])
      if (typeof getters[getter_key] === 'function') {
        if (!getters[getter_key].hasOwnProperty('__module_key__')) {
          console.warn(`key '__module_key__' not found in getter ${getter_key}, the 1st argument of it would be undefined.`)
        } else {
          // pass state and ownProps to getter to compute function
          let { __module_key__ } = getters[getter_key]
          computedState[getter_key] = getters[getter_key](!__module_key__ ? undefined : $state[__module_key__], {ownProps, $store})
        }
      } else {
        let state_key

        if (typeof getters[getter_key] === 'string' && getters[getter_key]) {
          state_key = getters[getter_key]
        } else {
          // use getter_key to get data when getters[getter_key] is not function or string
          state_key = getter_key
        }

        if (!$state.hasOwnProperty(state_key)) {
          console.warn(`the ${state_key} is not in state (containing state from Provider's store and other stores if they provided.)`)
          break
        }

        computedState[getter_key] = $state[state_key]
      }
    }

    return {
      ...typeof mergeStateToProps === 'function' ? mergeStateToProps(state, ownProps) : {},
      ...computedState,
      $state
    }
  }

  let ofFlux_mergeDispatchToProps = (dispatch, ownProps) => {
    let convertedPropsFromActions = {}

    for (let action_key in actions) {
      let actionFnType = typeof actions[action_key]
      if (actionFnType === 'function') {
        // convert dispatch to vuex-style actions
        convertedPropsFromActions[action_key] = (...args) => {
          /**
           * reduxActionReturnValue may be Promise
           *
           */
          let rootState = $store.getState(), { __module_key__ } = actions[action_key]
          let scopedCtx = {...$store}
          if (__module_key__) {
            scopedCtx.state = rootState[__module_key__]
            scopedCtx.rootState = rootState
            scopedCtx.ownProps = ownProps
          }
          let reduxActionReturnValue = actions[action_key](scopedCtx, ...args)
          // if (!(reduxActionReturnValue instanceof Promise)) {
          //   // TODO: check whether the type in all types in system
          //   if (typeof reduxActionReturnValue === 'object') {
          //     if (!reduxActionReturnValue.hasOwnProperty('type')) {
          //       console.warn(`bad return from ${action_key} method, you should return one object with its own property 'type' corresponding the same-name one in action-types of your redux`)
          //       process.env.NODE_ENV !== 'production' && console.info(reduxActionReturnValue)
          //     } else {
          //       dispatch(reduxActionReturnValue)
          //     }
          //   }
          // }

          return reduxActionReturnValue
        }
      } else {
        console.warn(`invalid action ${action_key}, one ${actionFnType}type-actiontype given`)
      }
    }
    let convertedPropsFromMutations = {}
    for (let mutation_key in mutations) {
      let mutationFnType = typeof mutations[mutation_key]
      if (mutationFnType === 'function') {
        // convert dispatch to vuex-style mutations
        convertedPropsFromMutations[mutation_key] = (payload) => {
          /**
           * reduxMutationReturnValue may be Promise
           *
           */
          let rootState = {...$store.getState()}, { __module_key__, __type__: type } = mutations[mutation_key]

          $store.commit(type, payload)
        }
      } else {
        console.warn(`invalid mutation ${mutation_key}, one ${mutationFnType}type-mutationtype given`)
      }
    }

    return {
      ...typeof mergeDispatchToProps === 'function' ? mergeDispatchToProps(dispatch, ownProps) : {},
      ...convertedPropsFromActions,
      ...convertedPropsFromMutations,
      $dispatch: dispatch, // always return dispatch
      $store, // pass $store just like vuex
    }
  }

  // http://redux.js.org/docs/react-redux/api.html
  let ofFlux_mergeProps = (stateProps, dispatchProps, ownProps) => {
    if (typeof mergeProps === 'function') {
      return mergeProps(stateProps, dispatchProps, ownProps)
    } else {
      if (typeof propsToState !== 'function') {propsToState = () => {}}
      return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        /**
         * resolve the problem repeating to tranfer props to state manually
         * in `componentWillReceiveProps` and `constructor`/`getInitialState`
         */
        $propsToState: propsToState({}, {helpers: propsToStateHelpers})
      }
    }
  }

  return origConnect(
    ofFlux_mergeStateToProps,
    ofFlux_mergeDispatchToProps,
    ofFlux_mergeProps,
    {
      withRef,
      pure
    }
  )
}

export const propsToStateHelpers = {
  /**
   * To Deal With setState in different Case
   */
  setState: (component, propsToBeState, options = false) => {
    if (typeof opitons === 'boolean') {
      options = { inConstructor: options }
    }

    let { inConstructor = false, setStateCb } = options || {}

    if (inConstructor) {
      component.state = {
        ...propsToBeState
      }
      return component.state
    } else {
      component.setState({
        ...propsToBeState
      }, () => {
        typeof setStateCb === 'function' && setStateCb()
      })

      return component.state
    }
  }
}

export const defaultPropsToState = (props) => {
  // you won't see $propsToState here
  return (component, props, inConstructor = false) => {
    // but you could see $propsToState here
    return propsToStateHelpers.setState(component, {
      $props: props
    }, {inConstructor})
  }
}

export const connectStoreFactory = (store, factory_options) => {
  store.commit = (...args) => { storeCommit(store, ...args) }

  return function (options) { // useful connectFlux
    let { component } = options
    delete options.component

    // actual connectFlux
    let connectComponentFn = connectFlux({ ...options, store })
    return Component.isPrototypeOf(component) ? connectComponentFn(component) : connectComponentFn
  }
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

export const convertMutationToReducerFn = ({module, module_key, reducerFn}) => {
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

export function emptyReucerGen (defaultState = null) {
  return (state = {...defaultState}, action = {}) => {
    return state
  }
}
