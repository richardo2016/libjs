<a name="importDirectories"></a>

## importDirectories(webpackRequireContext, options) ⇒ <code>hash</code>
this function can make it easy to import one directory's file as modules, you can
filter the module_name, module's content before return the whole hash.

**Kind**: global function  
**Returns**: <code>hash</code> - one hash object includes all module  

| Param | Type | Description |
| --- | --- | --- |
| webpackRequireContext | <code>require.context(webpackRequireContext)</code> | result from 'require.context(regex|string, ...)' in webpack runtime, which has methods `keys` which returns one iterator for every files included |
| options | <code>hash</code> | options |

