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

function slashLocalDate (date) {
  const info = parseDate(date)
  if (!info) return info
  return `${info.padded_year}/${info.padded_month}/${info.padded_date}`
}

slashLocalDate('2018-05-13') // '2018-05-13'
slashLocalDate(null) // undefined
```
