import { Component } from 'react'
import { connect as orig_connect } from 'react-redux'

export const vuexLikeConnect = (options) => {
  let { usePropsToState = false } = options

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
    // TODO check if component is React Component
    propsToState = usePropsToState && defaultPropsToState,
    store: $store,
    warn_no_store = false,
    connect: orig_connect_options,
    slave: $slave
  } = options || {}, {
    withRef = true,
    pure = true,
    mergeStateToProps,
    mergeDispatchToProps,
    mergeProps,
  } = orig_connect_options || {}

  if (warn_no_store && (!$store || typeof $store.getState !== 'function')) {
    console.warn('no effective store given, if you want to use $store in React Component, pass it in options')
  }

  if (!getters || typeof getters !== 'object') {
    console.error('geters must be non-empty object')
    getters = {}
  }

  let o_mergeStateToProps = (state, ownProps) => {
    let computedState = {},
        $state = {
          ...state,
          ...$store.getState()
        }

    // TODO: override the default store's state from <Provider>
    for (let getter_key in getters) {
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

  let o_mergeDispatchToProps = (dispatch, ownProps) => {
    let convertedActions = {}

    for (let action_key in actions) {
      let actionFnType = typeof actions[action_key]
      if (actionFnType === 'function') {
        // convert dispatch to vuex-style actions
        convertedActions[action_key] = (...args) => {
          /**
           * reduxActionReturnValue may be Promise
           *
           */
          let rootState = $store.getState(), { __module_key__ } = actions[action_key]
          let reduxActionReturnValue = actions[action_key]({...$store, ...__module_key__ && {state: rootState[__module_key__]}, rootState, ownProps}, ...args)
          if (!(reduxActionReturnValue instanceof Promise)) {
            // TODO: check whether the type in all types in system
            if (typeof reduxActionReturnValue === 'object') {
              if (!reduxActionReturnValue.hasOwnProperty('type')) {
                console.warn(`bad return from ${action_key} method, you should return one object with its own property 'type' corresponding the same-name one in action-types of your redux`)
                process.env.NODE_ENV !== 'production' && console.info(reduxActionReturnValue)
              } else {
                dispatch(reduxActionReturnValue)
              }
            }
          }

          return reduxActionReturnValue
        }
      } else {
        console.warn(`invalid action ${action_key}, one ${actionFnType}type-actiontype given`)
      }
    }

    return {
      ...typeof mergeDispatchToProps === 'function' ? mergeDispatchToProps(dispatch, ownProps) : {},
      ...convertedActions,
      dispatch, // always return dispatch
      $store, // pass $store just like vuex
      ...$slave && { $slave }
    }
  }

  // http://redux.js.org/docs/react-redux/api.html
  let o_mergeProps = (stateProps, dispatchProps, ownProps) => {
    let mergedProps =
      typeof mergeProps === 'function'
      ? mergeProps(stateProps, dispatchProps, ownProps)
      : {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        /**
         * resolve the problem repeating to tranfer props to state manually
         * in `componentWillReceiveProps` and `constructor`/`getInitialState`
         */
        ...typeof propsToState === 'function' && {$propsToState: propsToState(mergedProps, {helpers: propsToStateHelpers})}
      }

    return mergedProps
  }

  return orig_connect(
    o_mergeStateToProps,
    o_mergeDispatchToProps,
    o_mergeProps,
    {
      withRef,
      pure
    }
  )
}

export const connect = vuexLikeConnect

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
      // console.info(component)
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
