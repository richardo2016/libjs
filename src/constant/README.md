## Constant Module

### keycode

keyboard's code ascii hashmap, view details in [source](./keycode.ts)

```javascript
const { keycode } = require('@richardo2016/libjs').constant

console.log(keycode.enter === 13) // true
console.log(keycode.caps_lock === 20) // true
console.log(keycode.decimal_point === 110) // true
```

### alphabet

utils about alphabet

- generate
- generateList
- generateKeymirror

```javascript
const { alphabet } = require('@richardo2016/libjs').constant

/**
 * generate alphabet's
 * 1. list: a...zA...Z
 * 2. keymirror: two-way of keymirror of char/ascii
 */
const { list = [],  = {} } = alphabet.generate
// or
const list = alphabet.generateList()
const keymirror = alphabet.generateKeyMirror()

console.log(list[27] === 'b')

console.log(keymirror.a === 97)
console.log(keymirror[97] === 'a')
console.log(keymirror.A === 65)
console.log(keymirror[65] === 'z')
```
