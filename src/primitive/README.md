## Primitive Module

### Coerce About

**coerceString()**
----

coerce one value to string, return empty-string at least

view details in [spec](../../test/primitive.string.spec.js)

**coerceNumber(value)**
----

coerce one value to number.

if the value cannot be parsed as number, return `undefined`.

view details in [spec](../../test/primitive.number.spec.js)

### String Utils

**capitalize**
----

capitalize one string

```javascript
  capitalize('abc') === 'Abc'
  capitalize('') === ''
  capitalize(NaN) === 'NaN'
  capitalize(undefined) === 'Undefined'
  capitalize(null) === 'Null'
  capitalize(0) === '0'
```

**kebab2camel**
----

transform kebab-style string to camel-style

```javascript
  kebab2camel('abc-component') === 'abcComponent'
  kebab2camel('abc-com-ponent') === 'abcComPonent'
  kebab2camel('-abc-component') === 'AbcComponent'
  kebab2camel('-abc-component-') === 'AbcComponent'
  kebab2camel() === undefined
  kebab2camel(null) === null
```
<a name="camel2kebab"></a>

**camel2kebab**

transform camel-style string to kebab-style

```javascript
  camel2kebab('abcComponent') === 'abc-component'
  camel2kebab('AbcComponent') === 'abc-component'
  camel2kebab('Abccomponent') === 'abccomponent'
  camel2kebab('AbccomponenT') === 'abccomponen-t'
  camel2kebab('') === ''
  camel2kebab() === undefined
  camel2kebab(null) === null
  camel2kebab(undefined) === undefined
```
**underscore2camel**
----

transform underscore-style string to camel-style

```javascript
  underscore2camel('abc_component') === 'abcComponent'
  underscore2camel('abc_com_ponent') === 'abcComPonent'
  underscore2camel('_abc_component') === 'AbcComponent'
  underscore2camel('_abc_component_') === 'AbcComponent'
  underscore2camel() === undefined
  underscore2camel(null) === null
```
<a name="camel2underscore"></a>

**camel2underscore**
----
transform camel-style string to underscore-style

```javascript
  camel2underscore('abcComponent') === 'abc_component'
  camel2underscore('AbcComponent') === 'abc_component'
  camel2underscore('Abccomponent') === 'abccomponent'
  camel2underscore('AbccomponenT') === 'abccomponen_t'
  camel2underscore('')
  camel2underscore() undefined
  camel2underscore(null) null
  camel2underscore(undefined) undefined
```
