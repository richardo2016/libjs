## Struct Module

### Iterator About

**iteratorable(variable)**
---

- require: `Symbol`

check if `variable` is iteratorable

```javascript
const { iteratorable } = require('@richardo2016/libjs').struct.iterator

iteratorable([]) === true
iteratorable(new Map()) === true
iteratorable(new Set()) === true
iteratorable({}) === false
```

**selfIteratorable(variable)**
---

- require: `Symbol`

like `iteratorable`, check if `variable` is iteratorable but only check object's own property.

```javascript
const { selfIteratorable } = require('@richardo2016/libjs').struct.iterator

selfIteratorable([]) === false
selfIteratorable(new Map()) === false
selfIteratorable(new Set()) === false
selfIteratorable({}) === false
```

**mixinListIterator(options)**
----

make one list,

view details in [spec](../../test/primitive.string.spec.js)
