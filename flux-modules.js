/**
 * fwps flux module protocol
 *
 * 1. state is just state, state can just be changed in mutation.
 * 2. type should be prefixible
 * 3. one namespace or one object to store the MODULE name-about info.
 * 4.
 *
 * optional helper
 * - module prefixer or suffixer
 * - module can be customized to exclude the files of module
 */

/* ============================= UTILS ================================ */
// add or fix the 'M' object of module to
export let fixMObject = (M, {module_key, namespace = '', MGetter}) => {
  M.GETTER_KEY = module_key
  M.MODULE_PREIX = `${module_key}_`
  M.PREFIX = M.MODULE_PREIX
  M.NAMESPACE = namespace || module_key
  if (MGetter) M.MGetter = MGetter
  if (typeof M.initializer === 'function') M.initializer({module_key, prefix: M.PREFIX, namespace: M.NAMESPACE})
  return M
}

export let prefixer = ({module_name, module_prefix}) => {
  if (typeof module_prefix === 'string') {
    module_name = module_prefix + module_name
  }
  return module_name
}

export let suffixer = ({module_name, module_suffix}) => {
  if (typeof module_suffix === 'string') {
    module_name += module_suffix
  }
  return module_name
}

// Prefix Modules Types, make it to be it self always
export const prefixTypes = (options) => {
  let { types, prefix = '', onGenNewkey = () => {} } = options
  if (!types) return

  if (prefix[prefix.length - 1] !== '_') {
    prefix += '_'
  }

  if (typeof onGenNewkey !== 'function') {
    console.error(`onGenNewkey must be one generator function`)
    return
  }

  for (let type_key in types) {
    let old_type = types[type_key],
        new_type = prefix + old_type
    types[type_key] = new_type
    onGenNewkey({type_key, old_type, new_type})
  }

  return types
}

/**
 * generate the namespace(slash-style) and module_key(dot-delimeter-style)
 * based on the relative filepath in required files iterator from `require.context` of webpack.
 *
 * @param  {[type]} relFilePath [description]
 * @return {[type]}             [description]
 */
export function relPathToNsAndModuleKey (relFilePath, options) {
  let { filter, filterNamespace, filterModuleKey } = options || {}

  let namespace = relFilePath
    if (namespace.indexOf('./') === 0) {
      namespace = namespace.substr('./'.length)
    }

    let extensionPos = namespace.length - '.js'.length
    if (namespace.substr(extensionPos) === '.js') {
      namespace = namespace.substr(0, extensionPos)
    }

    if (typeof filterNamespace === 'function') {
      namespace = filterNamespace(namespace)
    }

    let module_key = namespace.replace('/', '.')

    if (typeof filterModuleKey === 'function') {
      module_key = filterModuleKey(module_key)
    }

    let module_descriptor = { module_key, namespace }

    if (typeof filter === 'function') filter(module_descriptor)
    return module_descriptor
}

export function ensureMObject ({exportContent}) {
  if (typeof exportContent.M !== 'object') {
    console.warn(`\
no valid 'M' object found for exportContent.\
it would be fixed by being assigned one empty/plain object`)
    exportContent.M = {}
  }
  return exportContent
}

export function noHashAddon (obj, {origKey, newKey, addon_type = 'module_addon'}) {
  obj.noHash = {
    name: origKey,
    origKey,
    newKey,
    addon_type
  }
}

export const normalizeTypesAndMutationsOfExportContent = ({exportContent}) => {
  ensureMObject({exportContent})

  let types, mutations, typeFromM = false
  // TODO: consider which source fo types is better, and give the tip for user when
  // he/she choose the other one.
  if (typeof exportContent.types === 'object') {
    types = exportContent.types
  } else if (typeof exportContent.M.types === 'object') {
    types = exportContent.M.types
    typeFromM = true
  } else {
    console.warn(`\
no valid 'types' Object found \
in exports of module:'${exportContent.M.GETTER_KEY}'\
or its 'M' object.\nit would be fixed\
by being assigned 'types' to its 'M' object.\
      `)

  }

  if (typeof types === 'object') {
    mutations = {}
    prefixTypes({
      types,
      prefix: exportContent.M.MODULE_PREIX,
      onGenNewkey: !exportContent.mutations ? () => {} : ({type_key, old_type, new_type}) => {
        if (exportContent.mutations.hasOwnProperty(old_type)) {
          mutations[new_type] = exportContent.mutations[old_type]
          noHashAddon(mutations[new_type], {origKey: old_type, newKey: new_type, addon_type: 'mutation'})
        }
      }
    })

    if (typeFromM) {
      exportContent.M.types = exportContent.types = types
    } else {
      exportContent.types = exportContent.M.types = types
    }

    exportContent.mutations = mutations
  }

  return {
    exportContent,
    types,
    mutations
  }
}

export function normalizeGettersAndActionsOfExportContent ({exportContent}) {
  // TODO: mark if M ensured
  ensureMObject({exportContent})

  if (exportContent.getters) {
    let getters = {}, noHash = {}
    Object.keys(exportContent.getters).forEach((origKey) => {
      let newKey = `${exportContent.M.MODULE_PREIX}${origKey}`
      getters[newKey] = exportContent.getters[origKey]
      noHashAddon(getters[newKey], {origKey, newKey, addon_type: 'getter'})
      noHash[newKey] = origKey
    })
    exportContent.getters = getters
    exportContent.noHashOfGetters = noHash
  }

  if (exportContent.actions) {
    let actions = {}, noHash = {}
    Object.keys(exportContent.actions).forEach((origKey) => {
      let newKey = `${exportContent.M.MODULE_PREIX}${origKey}`
      actions[newKey] = exportContent.actions[origKey]
      noHashAddon(actions[newKey], {origKey, newKey, addon_type: 'action'})
      noHash[newKey] = origKey
    })
    exportContent.actions = actions
    exportContent.noHashOfGctions = noHash
  }
}
