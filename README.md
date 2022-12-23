# Tackle

[![npm](https://img.shields.io/npm/v/@hrimthurs/tackle.svg)](https://npmjs.com/@hrimthurs/tackle)
[![info badge](https://img.shields.io/npm/dt/@hrimthurs/tackle.svg)](https://npm-stat.com/charts.html?package=@hrimthurs/tackle)
[![packagephobia publish](https://badgen.net/packagephobia/publish/@hrimthurs/tackle)](https://bundlephobia.com/result?p=@hrimthurs/tackle)

Various auxiliary tools/routines for working in JavaScript projects

## Installation

You can use this package on the server side as well as the client side.

### [Node.js](http://nodejs.org/):

~~~
npm install @hrimthurs/tackle
~~~

## Connection

### ESM:

~~~ javascript
import Tackle from '@hrimthurs/tackle'
import { TkArray, TkObject, TkString, TkFunction, TkService } from '@hrimthurs/tackle'
~~~

### CommonJS:

~~~ javascript
const Tackle = require('@hrimthurs/tackle')
const { TkArray, TkObject, TkString, TkFunction, TkService } = require('@hrimthurs/tackle')
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
     * @param {any} srcVal              - source value
     * @param {boolean} [uniqValues]    - true → returns array of unique values
     * @return {any[]}
     */

• TkArray.getUniqValues(srcArr, modifySrc = false)
    /**
     * Returns array of unique values
     * @param {any[]} srcArr            - source array
     * @param {boolean} [modifySrc]     - true → modifies the original array
     * @return {any[]}
     */

• TkArray.excludeValues(srcArr, skipValues, modifySrc = false)
    /**
     * Returns array without elements with values from skipValues
     * @param {any[]} srcArr            - source array
     * @param {any|any[]} skipValues    - values for exclude
     * @param {boolean} [modifySrc]     - true → modifies the original array
     * @return {any[]}
     */

• TkArray.sortArrayStr(srcArrStr, modifySrc = false)
    /**
     * Returns array with sorted strings
     * @param {string[]} srcArrStr      - source array strings
     * @param {boolean} [modifySrc]     - true → modifies the original array
     * @return {string[]}
     */

• TkArray.isSubArray(subArr, mainArr, strictEqual = false)
    /**
     * Checks is all elements of array subArr are present in array mainArr
     * @param {any[]} subArr            - sub array
     * @param {any[]} mainArr           - main array
     * @param {boolean} [strictEqual]   - true → arrays must be equivalent
     * @return {boolean}
     */
~~~

### TkObject:

~~~ javascript
• TkObject.isObjectJs(srcVal, checkKey)
    /**
     * Checks if the checkVal is an javascript object
     * @param {any} checkVal                    - check value
     * @param {string} [checkKey]               - checks for the presence of the checkKey in the object
     * @return {boolean}
     */

• TkObject.excludeKeys(srcObj, skipKeys, modifySrc = false)
    /**
     * Returns object that does not contain fields with skipKeys keys
     * @param {object} srcObj                   - source object
     * @param {string|string[]} [skipPathKeys]  - exclude keys (names or chains names)
     * @param {boolean} [modifySrc]             - true → modifies the original object
     * @return {object}
     */

• TkObject.getValue(srcObj, ...pathKeys)
    /**
     * Gets the values of the object's fields by pathKeys
     * @param {object} srcObj                   - source object
     * @param {...string} pathKeys              - keys (names or chains names)
     * @return {any|any[]} for single pathKey return value, for a few pathKeys return array values
     */

• TkObject.setValue(srcObj, pathKey, value, cbAction = null)
    /**
     * Sets value to object field by pathKey
     * @param {object} srcObj                                   - source object
     * @param {string} pathKey                                  - key (name or chain names)
     * @param {any} value                                       - value
     * @param {function(object, string):any} [cbAction]         - callback action for success set
     *      - arg0 - parent object of the setting field
     *      - arg1 - finite key of the setting field
     * @return {boolean|any} true/false as a success set value, or result cbAction (if given)
     */

• TkObject.enumeration(srcObj, cbAction)
    /**
     * Enumeration all object fields
     * @param {object} srcObj                                   - source object
     * @param {function(any, string, string[]):any} cbAction    - callback action for every field
     *      - arg0 - field current value
     *      - arg1 - field key
     *      - arg2 - all fields keys
     * @return {object} new object based on the results of cbAction calls
     */

• TkObject.merge(srcObjects)
    /**
     * Deep merge objects into a new object
     * @param {...object} srcObjects            - source objects
     * @return {object}
     */

• TkObject.clone(srcObj)
    /**
     * Creates an independent clone of the object
     * @param {object} srcObj                   - source object
     * @return {object}
     */

• TkObject.getHash(srcObj, skipKeys = null, seed = 0)
    /**
     * Returns the hash of the object with a length of 16 characters
     * @param {object} srcObj                   - source object
     * @param {string|string[]} [skipPathKeys]  - not hash values with these keys
     * @param {number} [seed]                   - hashing is relative to this value
     * @return {string} string of hex values with a length of 16 characters
     */
~~~

### TkString:

~~~ javascript
• TkString.formatNumber(srcNum, lenTotal, precision = 0)
    /**
     * Converts a numeric value to a string of the specified length with adding '0' (at the beginning for integer, ending for float).
     * If the length of the original number is greater than lenTotal - no change occurs
     * @param {any} srcNum                      - source number
     * @param {number} lenTotal                 - expected length result
     * @param {number} [precision]              - number of decimal points of the result (0 → not change original value)
     * @return {string}
     */

• TkString.getHash(srcStr, seed = 0)
    /**
     * Returns the hash of the string with a length of 16 characters
     * @param {string} srcStr                   - source string
     * @param {number} [seed]                   - hashing is relative to this value
     * @return {string} string of hex values with a length of 16 characters
     */
~~~

### TkFunction:

~~~ javascript
• TkFunction.decoMemoize(srcFunc, context = globalThis)
    /**
     * Returns function decorator that implements memoization
     * @param {function} srcFunc        - source function
     * @param {object} [context]        - function execution context
     * @return {function}
     */
~~~

### TkService:

~~~ javascript
• TkService.bytesToKb(numBytes, precision = 2)
    /**
     * Converts the number of bytes to kilobytes
     * @param {number} numBytes                 - number of bytes
     * @param {number} [precision]              - defines the number of decimal points of the result
     * @return {number}
     */

• TkService.bytesToMb(numBytes, precision = 2)
    /**
     * Converts the number of bytes to megabytes
     * @param {number} numBytes                 - number of bytes
     * @param {number} [precision]              - defines the number of decimal points of the result
     * @return {number}
     */

• TkService.trimFloat(srcVal, precision, stringify = false)
    /**
     * Trimming float numbers with a given precision
     * @param {any} srcVal                      - value with containing float numbers
     * @param {number} precision                - defines the number of decimal points of the result float numbers
     * @param {boolean} [stringify]             - return the result as converted to string
     * @return {any|string}
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
     * @param {string|URL} [srcUrl]             - source URL (if not set in case client side → used self.location.href)
     * @param {object} [options]                - options
     * @param {boolean} [options.keysLowerCase] - convert all parameters names to lower case (default: false)
     * @param {boolean} [options.valsLowerCase] - convert all strings values to lower case (default: false)
     * @return {object}
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
     * @param {string|URL} url                  - source string URL or exist URL-object
     * @param {object} [params]                 - source object to set as parameters URL (default: {})
     * @param {boolean} [encode]                - use encode URI for result (default: false)
     * @return {URL}
     */

• TkService.generateHashUID(initialStr = '')
    /**
     * Generates a unique ID in the format of a hash string of 16 characters length
     * @param {string} [initialStr]             - initial string for generate
     * @return {string} string of hex values with a length of 16 characters
     */

• TkService.generateUUID()
    /**
     * Generates a universal unique ID in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     * @return {string} string hex values
     */
~~~

## Usage

You can find usage examples [here](./examples/example.js) and [here](./examples/example.html)

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at
[github](https://github.com/hrimthurs/Tackle).
