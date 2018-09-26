## BuiltIn Module

### object Utils

**foreachObject**
---

run foreach for one object.

```javascript
const { object } = require('@richardo2016/libjs').builtIn

object.foreachObject({
  a: 1,
  b: 1
}, (v, k, obj) => {
  // obj === object
  console.log(k, v)
})

// 'a', 1
// 'b', 2
```

### date Utils

**ensureDate(variable)**
---
if `variable` can be transformed to one Date Object, return transformed Date; otherwise, return `undefined`

```javascript
const { ensureDate } = require('@richardo2016/libjs').builtIn.date

ensureDate(new Date) // valid
ensureDate(Date.now()) // valid
ensureDate(0) // === new Date(0)
ensureDate(null) // undefined
```

**parseDate**
---

try to parse one variable as date with coercing it with 'ensureDate'

```javascript
const { parseDate } = require('@richardo2016/libjs').builtIn.date

function slashLocalDateTime (date: any) {
  if (!(date = ensureDate(date))) return
  return `${date.getFullYear()}/${padMonth(date.getMonth() + 1)}/${padDate(date.getDate())}`
}

slashLocalDateTime('2018-05-13') // '2018-05-13'
slashLocalDateTime(null) // undefined
```
