exports.builtin = {
  array: require('./built-in/array'),
  object: require('./built-in/object'),
  function: require('./built-in/function')
}
exports.array = exports.builtin.array
exports.object = exports.builtin.object
exports.function = exports.builtin.function

exports.primitive = {
  number: require('./primitive/number'),
  string: require('./primitive/string')
}
exports.number = exports.primitive.number
exports.string = exports.primitive.string

exports.struct = {
  iterator: require('./struct/iterator'),
  map: require('./struct/map')
}

exports.webpack = require('./scaffold/webpack')
exports.logger = require('./common/logger')
exports.constant = {
  alphabet: require('./constant/alphabet'),
  keycode: require('./constant/keycode')
}
