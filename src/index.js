exports.builtIn = {
  date: require('./built-in/date'),
  array: require('./built-in/array'),
  object: require('./built-in/object'),
  function: require('./built-in/function')
}
exports.struct = {
  iterator: require('./struct/iterator'),
  map: require('./struct/map')
}
exports.vuex = require('./state/vuex')
exports.webpack = require('./scaffold/webpack')
exports.primitive = {
  number: require('./primitive/number'),
  string: require('./primitive/string')
}
exports.logger = require('./common/logger')
exports.constant = {
  alphabet: require('./constant/alphabet'),
  keycode: require('./constant/keycode')
}
