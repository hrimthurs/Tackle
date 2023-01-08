# Tackle

[![npm](https://img.shields.io/npm/v/@hrimthurs/tackle.svg)](https://npmjs.com/@hrimthurs/tackle)
[![info badge](https://img.shields.io/npm/dt/@hrimthurs/tackle.svg)](https://npm-stat.com/charts.html?package=@hrimthurs/tackle)
[![packagephobia publish](https://badgen.net/packagephobia/publish/@hrimthurs/tackle)](https://bundlephobia.com/result?p=@hrimthurs/tackle)

Various auxiliary tools/routines for working in JavaScript projects

## Installation

You can use this package on the server side as well as the client side.
> Other than ```TkBrowser```, which can only be used in the browser

### [Node.js](http://nodejs.org/):

~~~
npm install @hrimthurs/tackle
~~~

## Connection

### ESM:

~~~ javascript
import Tackle from '@hrimthurs/tackle'
import { TkArray, TkObject, TkString, TkFunction, TkService, TkBrowser } from '@hrimthurs/tackle'
~~~

### CommonJS:

~~~ javascript
const Tackle = require('@hrimthurs/tackle')
const { TkArray, TkObject, TkString, TkFunction, TkService, TkBrowser } = require('@hrimthurs/tackle')
~~~

### HTML tag \<script\>:

* Connection full:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/Tackle.min.js?label=Tackle.min.js)](https://github.com/hrimthurs/tackle/blob/master/build/Tackle.min.js)
    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/Tackle.min.legacy.js?label=Tackle.min.legacy.js)](https://github.com/hrimthurs/tackle/blob/master/build/Tackle.min.legacy.js)

    ~~~ html
    <script src="Tackle.min.js"></script>
    <!-- OR TRANSPILED: <script src="Tackle.min.legacy.js"></script> -->
    <script> Tackle. ... </script>
    ~~~

* Connection part of working with **arrays**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkArray.min.js?label=TkArray.min.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkArray.min.js)
    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkArray.min.legacy.js?label=TkArray.min.legacy.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkArray.min.legacy.js)

    ~~~ html
    <script src="TkArray.min.js"></script>
    <!-- OR TRANSPILED: <script src="TkArray.min.legacy.js"></script> -->
    <script> TkArray. ... </script>
    ~~~

* Connection part of working with **objects**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkObject.min.js?label=TkObject.min.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkObject.min.js)
    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkObject.min.legacy.js?label=TkObject.min.legacy.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkObject.min.legacy.js)

    ~~~ html
    <script src="TkObject.min.js"></script>
    <!-- OR TRANSPILED: <script src="TkObject.min.legacy.js"></script> -->
    <script> TkObject. ... </script>
    ~~~

* Connection part of working with **strings**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkString.min.js?label=TkString.min.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkString.min.js)
    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkString.min.legacy.js?label=TkString.min.legacy.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkString.min.legacy.js)

    ~~~ html
    <script src="TkString.min.js"></script>
    <!-- OR TRANSPILED: <script src="TkString.min.legacy.js"></script> -->
    <script> TkString. ... </script>
    ~~~

* Connection part of working with **functions**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkFunction.min.js?label=TkFunction.min.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkFunction.min.js)
    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkFunction.min.legacy.js?label=TkFunction.min.legacy.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkFunction.min.legacy.js)

    ~~~ html
    <script src="TkFunction.min.js"></script>
    <!-- OR TRANSPILED: <script src="TkFunction.min.legacy.js"></script> -->
    <script> TkFunction. ... </script>
    ~~~

* Connection part of working with **others**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkService.min.js?label=TkService.min.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkService.min.js)
    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkService.min.legacy.js?label=TkService.min.legacy.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkService.min.legacy.js)

    ~~~ html
    <script src="TkService.min.js"></script>
    <!-- OR TRANSPILED: <script src="TkService.min.legacy.js"></script> -->
    <script> TkService. ... </script>
    ~~~

* Connection part of working with **page**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkBrowser.min.js?label=TkBrowser.min.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkBrowser.min.js)
    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkBrowser.min.legacy.js?label=TkBrowser.min.legacy.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkBrowser.min.legacy.js)

    ~~~ html
    <script src="TkBrowser.min.js"></script>
    <!-- OR TRANSPILED: <script src="TkBrowser.min.legacy.js"></script> -->
    <script> TkBrowser. ... </script>
    ~~~

## WebPack Tree Shaking

- **ON** optimization.minimizer:
    ~~~ javascript
    import Tackle from 'tackle'             → full package
    import * as Tackle from 'tackle'        → used submodules
    import { Part } from 'tackle'           → used submodules
    ~~~

- **OFF** optimization.minimizer:
    ~~~ javascript
    import Tackle from 'tackle'             → used submodules
    import * as Tackle from 'tackle'        → used functions
    import { Part } from 'tackle'           → used functions
    ~~~

## API

### TkArray:

~~~ javascript
• TkArray.getArray(srcVal, uniqValues = false)
    /**
     * Returns array regardless of type srcVal
     * @param {any} srcVal                      Source value
     * @param {boolean} [uniqValues]            Returns array of unique values (default: false)
     * @returns {any[]}
     */

• TkArray.getUniqValues(srcArr, modifySrc = false)
    /**
     * Returns array of unique values
     * @param {any[]} srcArr                    Source array
     * @param {boolean} [modifySrc]             Modify the original array (default: false)
     * @returns {any[]}                         Array with unique values
     */

• TkArray.excludeValues(srcArr, skipValues, modifySrc = false)
    /**
     * Returns array without elements with values from skipValues
     * @param {any[]} srcArr                    Source array
     * @param {any|any[]} skipValues            Values for exclude
     * @param {boolean} [modifySrc]             Modify the original array (default: false)
     * @returns {any[]}
     */

• TkArray.sortArrayStr(srcArrStr, modifySrc = false)
    /**
     * Returns array with sorted strings
     * @param {string[]} srcArrStr              Source array strings
     * @param {boolean} [modifySrc]             Modify the original array (default: false)
     * @returns {string[]}                      Array with sorted strings
     */

• TkArray.isSubArray(subArr, mainArr, strictEqual = false)
    /**
     * Checks is all elements of array subArr are present in array mainArr
     * @param {any[]} subArr                    Sub array
     * @param {any[]} mainArr                   Main array
     * @param {boolean} [strictEqual]           Arrays must be equivalent (default: false)
     * @returns {boolean}
     */
~~~

### TkObject:

~~~ javascript
• TkObject.isObjectJs(srcVal, checkKey = null)
    /**
     * Checks if the checkVal is an javascript object
     * @param {any} checkVal                    Check value
     * @param {string} [checkKey]               Checks for the presence of the checkKey in the object (default: null)
     * @returns {boolean}
     */

• TkObject.excludeKeys(srcObj, skipKeys, modifySrc = false)
    /**
     * Returns object that does not contain fields with skipKeys keys
     * @param {object} srcObj                   Source object
     * @param {string|string[]} [skipPathKeys]  Exclude keys (names or chains names) (default: empty)
     * @param {boolean} [modifySrc]             Modify the original object (default: false)
     * @returns {object}
     */

• TkObject.getValue(srcObj, ...pathKeys)
    /**
     * Gets the values of the object's fields by pathKeys
     * @param {object} srcObj                   Source object
     * @param {...string} pathKeys              Keys (names or chains names)
     * @returns {any|any[]}                     For single pathKey return value, for a few pathKeys return array values
     */

• TkObject.setValue(srcObj, pathKey, value, cbAction = null)
    /**
     * Sets value to object field by pathKey
     * @param {object} srcObj                   Source object
     * @param {string} pathKey                  Key (name or chain names)
     * @param {any} value                       Value
     * @param {function(object, string):any} [cbAction] Callback action for success set (default: null)
     *      - arg0 - parent object of the setting field
     *      - arg1 - finite key of the setting field
     * @returns {boolean|any}                   True/false as a success set value, or result cbAction (if given)
     */

• TkObject.tryConvertToArray(srcObj)
    /**
     * Try convert object to array
     * @param {object} srcObj                   Source object
     * @returns {Array|object}                  Array if possible convert, else - source object
     */

• TkObject.enumeration(srcObj, cbAction)
    /**
     * Enumeration all object fields
     * @param {object} srcObj                   Source object
     * @param {function(any, string, string[]):any} cbAction Callback action for every field
     *      - arg0 - field current value
     *      - arg1 - field key
     *      - arg2 - all fields keys
     * @param {boolean} [deep]                  Recursive enumeration all subobjects (default: false)
     * @returns {object}                        New object based on the results of cbAction calls
     */

• TkObject.merge(srcObjects)
    /**
     * Deep merge objects into a new object
     * @param {...object} srcObjects            Source objects
     * @returns {object}
     */

• TkObject.clone(srcObj)
    /**
     * Creates an independent clone of the object
     * @param {object} srcObj                   Source object
     * @returns {object}                        Clone of the object
     */

• TkObject.getArrayTransferable(srcObj)
    /**
     * Collects an array of transferable values (use for web worker)
     * @param {object} srcObj                   Source object
     * @returns {Array}                         Array of transferable values
     */

• TkObject.getHash(srcObj, skipKeys = null, seed = 0)
    /**
     * Returns the hash of the object with a length of 16 characters
     * @param {object} srcObj                   Source object
     * @param {string|string[]} [skipPathKeys]  Not hash values with these keys (names or chains names)
     * @param {number} [seed]                   Hashing is relative to this value
     * @returns {string}                        String of hex values with a length of 16 characters
     */
~~~

### TkString:

~~~ javascript
• TkString.formatNumber(srcNum, lenTotal, precision = 0)
    /**
     * Converts a numeric value to a string of the specified length with adding '0' (at the beginning for integer, ending for float).
     * If the length of the original number is greater than lenTotal - no change occurs
     * @param {any} srcNum                      Source number
     * @param {number} lenTotal                 Expected length result
     * @param {number} [precision]              Number of decimal points of the result (default: 0 → not change original value)
     * @returns {string}                        String with formatted number
     */

• TkString.getHash(srcStr, seed = 0)
    /**
     * Returns the hash of the string with a length of 16 characters
     * @param {string} srcStr                   Source string
     * @param {number} [seed]                   Hashing is relative to this value (default: 0)
     * @returns {string}                        String of hex values with a length of 16 characters
     */
~~~

### TkFunction:

~~~ javascript
• TkFunction.decoMemoize(srcFunc, context = globalThis)
    /**
     * Returns function decorator that implements memoization
     * @param {function} srcFunc                Source function
     * @param {object} [context]                Function execution context (default: globalThis)
     * @returns {function}                      Memoized decorator
     */
~~~

### TkService:

~~~ javascript
• TkService.bytesToKb(numBytes, precision = 2)
    /**
     * Converts the number of bytes to kilobytes
     * @param {number} numBytes                 Number of bytes
     * @param {number} [precision]              Defines the number of decimal points of the result (default: 2)
     * @returns {number}                        Number of kilobytes
     */

• TkService.bytesToMb(numBytes, precision = 2)
    /**
     * Converts the number of bytes to megabytes
     * @param {number} numBytes                 Number of bytes
     * @param {number} [precision]              Defines the number of decimal points of the result (default: 2)
     * @returns {number}                        Number of megabytes
     */

• TkService.trimFloat(srcVal, precision, stringify = false)
    /**
     * Trimming float numbers with a given precision
     * @param {any} srcVal                      Value with containing float numbers
     * @param {number} precision                Defines the number of decimal points of the result float numbers
     * @param {boolean} [stringify]             Return the result as converted to string (default: false)
     * @returns {any|string}
     */

• TkService.getParamsURL(srcUrl, options)
    /**
     * Get parameters from URL to object
     *
     * Converts:
     * - param_name without value → param_name: true
     * - param_name=val1 → param_name: val1
     * - param_name=val1:val2 → param_name: {val1: val2}
     * - param_name=val1,val2,val3 → param_name: [val1, val2, val3]
     * - param_name=val1:val2,val3:val4 → param_name: {val1: val2, val3: val4}
     * - value/subvalue json-string → param_name: <json-parse>
     *
     * @param {string|URL} [srcUrl]             Source URL (in case client side default: self.location.href)
     * @param {object} [options]                Options
     * @param {boolean} [options.keysLowerCase] Convert all parameters names to lower case (default: false)
     * @param {boolean} [options.valsLowerCase] Convert all strings values to lower case (default: false)
     * @returns {object}                        Object with parameters
     */

• TkService.setParamsURL(url, params = {}, encode = false)
    /**
     * Set parameters from object to URL
     *
     * Converts:
     * - param_name: val1 → param_name=val1
     * - param_name: {val1: val2} → param_name=val1:val2
     * - param_name: [val1, val2, val3] → param_name=val1,val2,val3
     * - param_name: {val1: val2, val3: val4} → param_name=val1:val2,val3:val4
     * - subvalue object of array/object → <json-string>
     *
     * @param {string|URL} url                  Source string URL or exist URL-object
     * @param {object} [params]                 Source object to set as parameters URL (default: {})
     * @param {boolean} [encode]                Use encode URI for result (default: false)
     * @returns {URL}                           Instance URL with parameters
     */

• TkService.generateHashUID(initialStr = '')
    /**
     * Generates a unique ID in the format of a hash string of 16 characters length
     * @param {string} [initialStr]             Initial string for generate (default: empty)
     * @returns {string}                        String of hex values with a length of 16 characters
     */

• TkService.generateUUID()
    /**
     * Generates a universal unique ID in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     * @returns {string}                        String hex values
     */

• TkService.promiseTimeout(limTimeout, { func = null, args = [], cbCreate = (resolve, idTimeout) => {}, timeoutReject = false })
    /**
     * Creates a promise that is guaranteed to be fulfilled after a timeout
     * @param {number} limTimeout               Timeout promise (ms)
     * @param {object} [options]                Options
     * @param {function} [options.func]         Promise-wrapped function (default: null)
     * @param {Array} [options.args]            Arguments for promise-wrapped function (default: empty)
     * @param {function(function, number):void} [options.cbCreate] Callback after create promise (default: empty)
     *      - arg0 - promise resolve function
     *      - arg1 - timeout id
     * @param {boolean} [options.timeoutReject] Call reject on timeout (default: false → call resolve without args)
     * @returns {Promise}
     */
~~~

### TkBrowser (only be used in the browser):

~~~ javascript
• TkBrowser.createHTMLElement(tagName, elParent, options = {})
    /**
     * Creates an HTML element
     * @param {string} tagName                  Type of element to be created
     * @param {HTMLElement} elParent            Parent HTML element (page root: document.body)
     * @param {object} [options]
     * @param {boolean} [options.insertFirst]   Add an element as first of the children nodes of parent (default: false → add as last)
     * @param {object[]} [options.subElements]  Entries of elements to recursively create as children (default: empty)
     * @param {Object<string,string>} [options.attributes]      Keys/values of attributes who sets to the element (default: empty)
     * @param {string|Object<string,string>} [options.style]    Keys/values (or cssText) of the style to be set for the element (default: empty)
     * @param {string|string[]} [options.class]                 Class/Classes to be set for the element (default: empty)
     * @param {Object<string,string>} [options.properties]      Keys/values of properties to be set for the element (default: empty)
     * @returns {HTMLElement}
     */

• TkBrowser.setDivResizer(elDiv, handler)
    /**
     * Set resize handler for div HTML element
     * @param {HTMLElement} elDiv               Div HTML element
     * @param {function({width:number,height:number}):void} handler Handler function
     */

• TkBrowser.interceptErrors(handler, preventDefault = true)
    /**
     * Intercepting on page "error" and "unhandledrejection" events
     * @param {function(string):void} handler   Callback with error message on errors events
     * @param {boolean} [preventDefault]        Prevent default errors events (default: true)
     */
~~~

## Usage

You can find usage examples [here](./examples/example.js) and [here](./examples/example.html)

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at
[github](https://github.com/hrimthurs/Tackle).
