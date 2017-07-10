## Functions

<dl>
<dt><a href="#coerceNumber">coerceNumber(value)</a> ⇒</dt>
<dd></dd>
<dt><a href="#coerceString">coerceString()</a></dt>
<dd></dd>
</dl>

<a name="capitalize"></a>

## capitalize
**Kind**: global primitives  
**Brief**: capitalize one string  
**Use_cases**: <br />

```javascript
  capitalize('abc') === 'Abc'
  capitalize('') === ''
  capitalize(NaN) === 'NaN'
  capitalize(undefined) === 'Undefined'
  capitalize(null) === 'Null'
  capitalize(0) === '0'
```  
<a name="kebab2camel"></a>

## kebab2camel
**Kind**: global primitives  
**Brief**: transfer kebab-style string to camel-style  
**Use_cases**: <br />

```javascript
  kebab2camel('abc-component') === abcComponent
  kebab2camel('abc-com-ponent') === abcComPonent
  kebab2camel('-abc-component') === AbcComponent
  kebab2camel('-abc-component-') === AbcComponent
  kebab2camel() === undefined
  kebab2camel(null) === null
```  
<a name="camel2kebab"></a>

## camel2kebab
**Kind**: global primitives  
**Brief**: transfer camel-style string to kebab-style  
**Use_cases**: <br />

```javascript
  camel2kebab('abcComponent') abc-component
  camel2kebab('AbcComponent') abc-component
  camel2kebab('Abccomponent') abccomponent
  camel2kebab('AbccomponenT') abccomponen-t
  camel2kebab('')
  camel2kebab() undefined
  camel2kebab(null) null
  camel2kebab(undefined) undefined
```  
<a name="underscore2camel"></a>

## underscore2camel
**Kind**: global primitives  
**Brief**: transfer underscore-style string to camel-style  
**Use_cases**: <br />

```javascript
  underscore2camel('abc_component') === abcComponent
  underscore2camel('abc_com_ponent') === abcComPonent
  underscore2camel('_abc_component') === AbcComponent
  underscore2camel('_abc_component_') === AbcComponent
  underscore2camel() === undefined
  underscore2camel(null) === null
```  
<a name="camel2underscore"></a>

## camel2underscore
**Kind**: global primitives  
**Brief**: transfer camel-style string to underscore-style  
**Use_cases**: <br />

```javascript
  camel2underscore('abcComponent') abc_component
  camel2underscore('AbcComponent') abc_component
  camel2underscore('Abccomponent') abccomponent
  camel2underscore('AbccomponenT') abccomponen_t
  camel2underscore('')
  camel2underscore() undefined
  camel2underscore(null) null
  camel2underscore(undefined) undefined
```  
<a name="coerceNumber"></a>

## coerceNumber(value) ⇒
**Kind**: global function  
**Returns**: value result value  
**Brief**: coerce one value to number  
**Details**: if the value cannot be parse to number, return `undefined`.  

| Param | Description |
| --- | --- |
| value | input value |

<a name="coerceString"></a>

## coerceString()
**Kind**: global function  
**Brief**: coerce one value to string, return empty-string at least  
**Use_cases**: <br />

```javascript
  coerceString(NaN) === 'NaN'
  coerceString(undefined) === 'Undefined'
  coerceString(null) === 'Null'
  coerceString(0) === '0'
```  
