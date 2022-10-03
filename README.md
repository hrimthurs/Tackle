# Tackle

[![npm](https://img.shields.io/npm/v/@hrimthurs/tackle.svg)](https://npmjs.com/@hrimthurs/tackle)
[![info badge](https://img.shields.io/npm/dt/@hrimthurs/tackle.svg)](https://npm-stat.com/charts.html?package=@hrimthurs/tackle)

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

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/dist/Tackle.js?label=Tackle.js)](https://github.com/hrimthurs/tackle/blob/master/dist/Tackle.js)

    ~~~ html
    <script src="Tackle.js"></script>
    <script> Tackle. ... </script>
    ~~~

* Connection part of working with **arrays**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/dist/TkArray.js?label=TkArray.js)](https://github.com/hrimthurs/tackle/blob/master/dist/TkArray.js)

    ~~~ html
    <script src="TkArray.js"></script>
    <script> TkArray. ... </script>
    ~~~

* Connection part of working with **objects**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/dist/TkObject.js?label=TkObject.js)](https://github.com/hrimthurs/tackle/blob/master/dist/TkObject.js)

    ~~~ html
    <script src="TkObject.js"></script>
    <script> TkObject. ... </script>
    ~~~

* Connection part of working with **strings**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/dist/TkString.js?label=TkString.js)](https://github.com/hrimthurs/tackle/blob/master/dist/TkString.js)

    ~~~ html
    <script src="TkString.js"></script>
    <script> TkString. ... </script>
    ~~~

* Connection part of working with **functions**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/dist/TkFunction.js?label=TkFunction.js)](https://github.com/hrimthurs/tackle/blob/master/dist/TkFunction.js)

    ~~~ html
    <script src="TkFunction.js"></script>
    <script> TkFunction. ... </script>
    ~~~

* Connection part of working with **others**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/dist/TkService.js?label=TkService.js)](https://github.com/hrimthurs/tackle/blob/master/dist/TkService.js)

    ~~~ html
    <script src="TkService.js"></script>
    <script> TkService. ... </script>
    ~~~

## API

### TkArray:

~~~ typescript
• TkArray.getArray(srcVal: any, uniqValues?: boolean = false): any[]
    // Returns array regardless of type srcVal
    // If uniqValues is set to true then returns array of unique values

• TkArray.getUniqValues(srcArr: any[], modifySrc?: boolean = false): any[]
    // Returns array of unique values from the srcArr array
    // If modifySrc is set to true then modifies the original array

• TkArray.excludeValues(srcArr: any[], skipValues: any|any[], modifySrc?: boolean = false): any[]
    // Returns array without elements with values from skipValues
    // If modifySrc is set to true then modifies the original array

• TkArray.sortArrayStr(srcArrStr: string[], modifySrc?: boolean = false): string[]
    // Returns array with sorted strings
    // If modifySrc is set to true then modifies the original array

• TkArray.isSubArray(checkArr: any[], mainArr: any[], strictEqual?: boolean = false): boolean
    // Checks is all elements of array checkArr are present in array mainArr
    // If strictEqual is set to true then arrays must be equivalent
~~~

### TkObject:

~~~ typescript
• TkObject.excludeKeys(srcObj: object, skipKeys: string|string[], modifySrc?: boolean = false): object
    // Returns object that does not contain fields with skipKeys keys
    // If modifySrc is set to true then modifies the original object

• TkObject.getHash(srcObj: object, skipKeys?: string|string[] = null, seed?: number = 0): string
    // Returns hash of the object srcObj
    // If set skipKeys then does not hash fields with these keys
    // If set seed then hashing is relative to this value
~~~

### TkString:

~~~ typescript
• TkString.formatNumber(srcNum: number, lenTotal: number, precision?: number = 0): string
    // Converts a numeric value to a string of the specified length with adding '0' (at the beginning for integer, ending for float)
    // If the length of the original number is greater than lenTotal - no change occurs
    // precision parameter defines the number of decimal points of the result (default: 0 - not change original value)

• TkString.stringify(srcVal: any, options?: object): string
    // Converts the srcVal to string

    options: {
        json: boolean,      // - save or remove json markup (default: true - save json markup)
        floatPrecision: 0   // - defines the number of decimal points of the float values (default: 0 - not change original value)
    }

• TkString.getHash(srcStr: string, seed?: number = 0): string
    // Returns hash of the string srcStr
    // If set seed then hashing is relative to this value
~~~

### TkFunction:

~~~ typescript
• TkFunction.decoMemoize(srcFunc: function, context?: object = globalThis): function
    // Returns function decorator of srcFunc that implements memoization
    // context parameter defines function execution context
~~~

### TkService:

~~~ typescript
• TkService.bytesToKb(numBytes: number, precision?: number = 2): number
    // Converts the number of bytes to kilobytes
    // precision parameter defines the number of decimal points of the result

• TkService.bytesToMb(numBytes: number, precision?: number = 2): number
    // Converts the number of bytes to megabytes
    // precision parameter defines the number of decimal points of the result
~~~

## Usage

You can find usage examples [here](./examples/example.js) and [here](./examples/example.html)

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at
[github](https://github.com/hrimthurs/Tackle).
