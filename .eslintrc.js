var DISABLE_DEV_NO_UNUSED_VARS = false

module.exports = {
  root: false,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // Override our default settings just for this directory
    "eqeqeq": 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //  allows the opening and closing braces for a block to be on the same line
    // 'allowSingleLine': 0,
    // http://eslint.org/docs/rules/brace-style
    'brace-style': [
      'error',
      // 'stroustrup', 'allman'
      '1tbs',
      { "allowSingleLine": true }
    ],
    "camelcase": [0, {"properties": "never"}],
    // close no-unused-vars when debug
    "no-unused-vars": [process.env.NODE_ENV === 'production' && DISABLE_DEV_NO_UNUSED_VARS ? 2 : 0],
    "one-var": [0],
    "indent": ["error", 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 }, "SwitchCase": 1 }],
    // forbid no multiple spaces except property of object, variable-declaration and import-declaration
    "no-multi-spaces": ["error", {
      exceptions: {
        "Property": true,
        "VariableDeclarator": true,
        "ImportDeclaration": true
      },
    }],

    "no-useless-escape": [0]
  }
}
