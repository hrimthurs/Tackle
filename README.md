# Tackle

[![npm](https://img.shields.io/npm/v/@hrimthurs/tackle.svg)](https://npmjs.com/@hrimthurs/tackle)
[![info badge](https://img.shields.io/npm/dt/@hrimthurs/tackle.svg)](https://npm-stat.com/charts.html?package=@hrimthurs/tackle)
[![packagephobia publish](https://badgen.net/packagephobia/publish/@hrimthurs/tackle)](https://bundlephobia.com/result?p=@hrimthurs/tackle)

Various auxiliary tools/routines for working in JavaScript projects

## Installation

You can use this package on the server side as well as the client side.
> Other than ```TkBrowser```, which can only be used in the browser

> Other than ```TkNode```, which can only be used in the nodejs

### [Node.js](http://nodejs.org/):

~~~
npm install @hrimthurs/tackle
~~~

## Connection

### ESM:

~~~ javascript
import Tackle from '@hrimthurs/tackle'
import { TkArray, TkObject, TkString, TkFunction, TkMath, TkService, TkBrowser, TkNode } from '@hrimthurs/tackle'
~~~

### CommonJS:

~~~ javascript
const Tackle = require('@hrimthurs/tackle')
const { TkArray, TkObject, TkString, TkFunction, TkMath, TkService, TkBrowser, TkNode } = require('@hrimthurs/tackle')
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

* Connection part of working with **math**:

    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkMath.min.js?label=TkMath.min.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkMath.min.js)
    [![GitHub file size in bytes](https://img.shields.io/github/size/hrimthurs/tackle/build/TkMath.min.legacy.js?label=TkMath.min.legacy.js)](https://github.com/hrimthurs/tackle/blob/master/build/TkMath.min.legacy.js)

    ~~~ html
    <script src="TkMath.min.js"></script>
    <!-- OR TRANSPILED: <script src="TkMath.min.legacy.js"></script> -->
    <script> TkMath. ... </script>
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

• TkArray.swapValues(srcArr, ...indsCouples)
    /**
     * Swap array values
     * @param {any[]} srcArr                    Source array
     * @param {...[number, number]} indsCouples Couples of indices for values swap
     * @returns {any[]}
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

• TkArray.prevValueCycle(srcArr, index)
    /**
     * Returns the value of the previous element of a circular array
     * @param {any[]} srcArr                    Source array
     * @param {number} index                    Element index
     * @returns {any}
     */

• TkArray.nextValueCycle(srcArr, index)
    /**
     * Returns the value of the next element of a circular array
     * @param {any[]} srcArr                    Source array
     * @param {number} index                    Element index
     * @returns {any}
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

• TkObject.setValue(dstObj, pathKey, value, cbAction = null)
    /**
     * Sets value to object field by pathKey
     * @param {object} dstObj                   Destination object
     * @param {string} pathKey                  Key (name or chain names)
     * @param {any} value                       Value
     * @param {object} [options]                Options
     * @param {boolean} [options.onlyExist]     Set value to only exists fields or create new fields (default: true)
     * @param {function(object,string):any} [options.cbAction] Callback action for success set (default: empty)
     *      - arg0 - parent object of the setting field
     *      - arg1 - finite key of the setting field
     * @returns {boolean|any}                   True/false as a success set value, or result cbAction (if given)
     */

• TkObject.setProperties(targetObj, properties, strictTypes = true)
    /**
     * Sets values to exists object fields. Arrays are written in their entirety
     * @param {object} targetObj                Target object
     * @param {object} properties               Properties
     * @param {boolean} [strictTypes]           Strict type matching of values (default: true)
     */

• TkObject.traverse(srcObj, cbAction, deepObjects = false, deepArrays = false)
    /**
     * Traverse object fields
     * @param {object} srcObj                   Source object
     * @param {function(any,string,string):any} cbAction Callback action for every field
     *      - arg0 - field current value
     *      - arg1 - field key
     *      - arg2 - chain keys parents
     * @param {boolean} [deepObjects]           Recursive traverse all sub objects (default: false)
     * @param {boolean} [deepArrays]            Recursive traverse all sub arrays (default: false)
     * @returns {object}                        New object based on the results of cbAction calls
     */

• TkObject.merge(...srcObjects)
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

• TkObject.tryConvertToArray(srcObj)
    /**
     * Try convert object to array
     * @param {object} srcObj                   Source object
     * @returns {Array|object}                  Array if possible convert, else - source object
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

### TkMath:

~~~ javascript
• TkMath.HALF_PI = Pi / 2

• TkMath.QUART_PI = Pi / 4

• TkMath.DOUBLE_PI = Pi * 2

• TkMath.angleDegToRad(angleDeg = 0)
    /**
     * Converts angle value from degree to radian
     * @param {number} [angleDeg]               Angle degree (default: 0)
     * @returns {number}
     */

• TkMath.roundFloat(srcVal, precision = 3)
    /**
     * Round float number with a given precision
     * @param {number} srcVal                   Float number
     * @param {number} [precision]              Defines the number of decimal points of the result float number (default: 3)
     * @returns {number}
     */

• TkMath.dotProduct2D(ptA, ptB)
    /**
     * Calculates the dot product of 2D ptA and ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @returns {number}
     */

• TkMath.crossProduct2D(ptA, ptB)
    /**
     * Calculates the cross product of 2D ptA and ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @returns {number}
     */

• TkMath.delta2D(ptA, ptB)
    /**
     * Calculates the delta between 2D ptA and ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @returns {{x:number,y:number}}
     */

• TkMath.midPoint2D(ptA, ptB)
    /**
     * Calculates the midpoint between 2D ptA and ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @returns {{x:number,y:number}}
     */

• TkMath.normalize2D(ptA)
    /**
     * Calculates the point of unit vector for direction point
     * @param {{x:number,y:number}} ptA         Point A
     * @returns {{x:number,y:number}}
     */

• TkMath.isEqualCoords2D(ptA, ptB, tolerance = 0.1)
    /**
     * Checks is equal coords of 2D ptA and ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {number} [tolerance]              Tolerance of match coords (default: 0.1)
     * @returns {boolean}
     */

• TkMath.dist2D(ptA, ptB)
    /**
     * Calculates the distance between 2D ptA and ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @returns {number}
     */

• TkMath.distManhattan2D(ptA, ptB)
    /**
     * Calculates the Manhattan distance between 2D ptA and ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @returns {number}
     */

• TkMath.isNearerFirstPt2D(ptA, ptB, ptC)
    /**
     * Checks is point is nearer 2D ptC to ptA than to ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}} ptC         Point C
     * @returns {boolean}
     */

• TkMath.areaPolygon2D(polyPts, saveSign = false)
    /**
     * Calculation area of polygon 2D
     * @param {{x:number,y:number}[]} polyPts   Points of polygon
     * @param {boolean} [saveSign]              Save the area sign in the result (default: false)
     * @returns {number}
     */

• TkMath.centroidPolygon2D(polyPts)
    /**
     * Calculation centroid of polygon 2D
     * @param {{x:number,y:number}[]} polyPts   Points of polygon
     * @returns {{x:number,y:number}}
     */

• TkMath.pointOnLineByLen2D(ptA, ptB, distance)
    /**
     * Calculates the point 2D on a line lying at a given distance from ptA
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {number} distance                 Distance from ptA
     * @returns {{x:number,y:number}}
     */

• TkMath.projectPointToStraightLine2D(ptA, ptB, ptC)
    /**
     * Calculates the projection of a point 2D ptC onto a straight line ─ptA─────ptB─
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}} ptC         Point C
     * @returns {{x:number,y:number}}
     */

• TkMath.sidePointRelativeStraightLine2D(ptA, ptB, ptC)
    /**
     * Detect the side on which point ptC is located relative to the straight line ─ptA─────ptB─
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}} ptC         Point C
     * @returns {number}                        -1, 1, 0 (= located on straight line)
     */

• TkMath.isPointBelongStraightLine2D(ptA, ptB, ptC, tolerance = 1.2)
    /**
     * Checks if point 2D ptC on straight line ─ptA─────ptB─
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}} ptC         Point C
     * @param {number} [tolerance]              Tolerance of match (default: 1.2)
     * @returns {boolean}
     */

• TkMath.isPointBelongLineSegment2D(ptA, ptB, ptC, tolerance = 1.2)
    /**
     * Checks if point 2D ptC on line segment ptA─────ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}} ptC         Point C
     * @param {number} [tolerance]              Tolerance of match (default: 1.2)
     * @returns {boolean}
     */

• TkMath.isSomePointBelongLineSegment2D(ptA, ptB, arrPoints, tolerance = 1.2)
    /**
     * Checks if some point 2D on line segment ptA─────ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}[]} arrPoints Array of check points
     * @param {number} [tolerance]              Tolerance of match (default: 1.2)
     * @returns {boolean}
     */

• TkMath.isEveryPointBelongLineSegment2D(ptA, ptB, arrPoints, tolerance = 1.2)
    /**
     * Checks if every point 2D on line segment ptA─────ptB
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}[]} arrPoints Array of check points
     * @param {number} [tolerance]              Tolerance of match (default: 1.2)
     * @returns {boolean}
     */

• TkMath.isPointInsidePolygon2D(ptA, polyPts)
    /**
     * Checks if point 2D ptA inside in polygon
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}[]} polyPts   Points of polygon
     * @returns {boolean}
     */

• TkMath.isSomePointInsidePolygon2D(arrPoints, polyPts)
    /**
     * Checks if some point 2D inside in polygon
     * @param {{x:number,y:number}[]} arrPoints Array of check points
     * @param {{x:number,y:number}[]} polyPts   Points of polygon
     * @returns {boolean}
     */

• TkMath.isEveryPointInsidePolygon2D(arrPoints, polyPts)
    /**
     * Checks if every point 2D inside in polygon
     * @param {{x:number,y:number}[]} arrPoints Array of check points
     * @param {{x:number,y:number}[]} polyPts   Points of polygon
     * @returns {boolean}
     */

• TkMath.isParallelStraightLines2D(ptA, ptB, ptC, ptD, tolerance = 0.1)
    /**
     * Checks if parallel of the straight lines ─ptA─────ptB─ and ─ptC─────ptD─
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}} ptC         Point C
     * @param {{x:number,y:number}} ptD         Point D
     * @param {number} [tolerance]              Tolerance of parallel: 0 - exact match, 1 - orthogonal (default: 0.1)
     * @returns {boolean}
     */

• TkMath.crossStraightLines2D(ptA, ptB, ptC, ptD)
    /**
     * Calculates the cross point 2D of the straight lines ─ptA─────ptB─ and ─ptC─────ptD─
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}} ptC         Point C
     * @param {{x:number,y:number}} ptD         Point D
     * @returns {{x:number,y:number}|undefined}
     */

• TkMath.crossLinesSegments2D(ptA, ptB, ptC, ptD)
    /**
     * Calculates the cross point 2D of the lines segments ptA─────ptB and ptC─────ptD
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}} ptC         Point C
     * @param {{x:number,y:number}} ptD         Point D
     * @returns {{x:number,y:number}|undefined}
     */

• TkMath.isCrossLinesSegments2D(ptA, ptB, ptC, ptD)
    /**
     * Checks if crossed of the lines segments ptA─────ptB and ptC─────ptD
     * @param {{x:number,y:number}} ptA         Point A
     * @param {{x:number,y:number}} ptB         Point B
     * @param {{x:number,y:number}} ptC         Point C
     * @param {{x:number,y:number}} ptD         Point D
     * @returns {boolean}
     */

• TkMath.chainsLinesSegments2D(arrLines, continuityCoords = false, tolerance = 0.1)
    /**
     * Detect of continuous chains for a set of line segments
     * @param {[{x:number,y:number},{x:number,y:number}][]} arrLines    Array of lines segments
     * @param {boolean} [continuityCoords]                              Changing source coordinates for segments continuity (default: false)
     * @param {number} [tolerance]                                      Tolerance of match coords (default: 0.1)
     * @returns {{inds:number[],closed:boolean}[]}
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
     * @param {function(function,number):void} [options.cbCreate] Callback after create promise (default: empty)
     *      - arg0 - promise resolve function
     *      - arg1 - timeout id
     * @param {boolean} [options.timeoutReject] Call reject on timeout (default: false → call resolve without args)
     * @returns {Promise}
     */
~~~

### TkBrowser (only be used in the browser):

~~~ javascript
• TkBrowser.createHTMLElement(tagName, options = {}, elParent = null)
    /**
     * Creates an HTML element
     * @param {string} tagName                  Type of element to be created
     * @param {object} [options]                Options
     * @param {boolean} [options.insertFirst]   Add an element as first of the children nodes of parent (default: false → add as last)
     * @param {object[]} [options.subElements]                  Entries of elements to recursively create as children (default: empty)
     * @param {Object<string,string>} [options.attributes]      Keys/values of attributes who sets to the element (default: empty)
     * @param {string|Object<string,string>} [options.style]    Keys/values/cssText of the style to be set for the element (default: empty)
     * @param {string|string[]} [options.class]                 Class/Classes to be set for the element (default: empty)
     * @param {Object<string,string>} [options.properties]      Keys/values of exist properties to be set for the element (default: empty)
     * @param {HTMLElement} [elParent]          Parent HTML element (default: empty). Page root: document.body
     * @returns {HTMLElement}
     */

• TkBrowser.getSizeHTMLElement(element)
    /**
     * Returns real computed size of HTML element
     * @param {HTMLElement} element             HTML element
     * @returns {{width:number,height:number}}  Size of element
     */

• TkBrowser.applyClasses(selectorElement, options)
    /**
     * Sets/unsets/toggles classes for each element by selector
     * @param {string} selectorElement          Query selector of target elements
     * @param {object} [options]                Options
     * @param {string|string[]} [options.set]   Class/classes name for set to each elements (default: empty)
     * @param {string|string[]} [options.unset] Class/classes name for unset to each elements (default: empty)
     * @param {string|string[]} [options.toggle] Class/classes name for toggle to each elements (default: empty)
     */

• TkBrowser.forEachElement(selectorElement, callback)
    /**
     * Run callback for each element by selector
     * @param {string} selectorElement          Query selector of target elements
     * @param {function(any):void} callback     Callback function
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

• TkBrowser.onDocumentComplete(callback)
    /**
     * Wait for document complete
     * @param {function():void} [callback]      Callback on document complete
     * @returns {Promise}
     */

• TkBrowser.httpRequest(url, options = {})
    /**
     * Implementation HTTP request
     * @param {string} url                      Url of request
     *
     * @param {object} [options]                                    Options
     * @param {'GET'|'POST'} [options.method]                       Method of request (default: 'GET')
     * @param {XMLHttpRequestResponseType} [options.responseType]   Expected response type (default: 'arraybuffer')
     * @param {object} [options.params]                             Params of request. In case of a GET-request, this converted to url search params by TkService.setParamsURL → parsing on server by TkService.getParamsURL (default: empty)
     * @param {Object<string,string>} [options.headers]             Headers of request (default: empty)
     *
     * @param {string} [options.id]                 Id of request. Used in callbacks of request events (default: null)
     * @param {number} [options.timeout]            Timeout of request (default: 10000)
     * @param {boolean} [options.useCache]          Use request cached by browser (default: true)
     * @param {boolean} [options.useReject]         Use promise rejection on failure of request (default: false → resolve null)
     * @param {boolean} [options.setGetAsFolder]    For GET request set parameters to query string as path to folder (default: false)
     * @param {boolean} [options.addPostQString]    For POST request set body parameters to query string (default: false)
     *
     * @param {function(any,string):void} [options.cbLoad]          Callback on successful completion of the request (default: empty)
     *      - arg0 - response body
     *      - arg1 - request id
     * @param {function(number,string):void} [options.cbError]      Callback on failure of the request (default: empty)
     *      - arg0 - error status
     *      - arg1 - request id
     * @param {function(number,any,string):void} [options.cbFinal]  Callback on completion of the request (default: empty)
     *      - arg0 - request status
     *      - arg1 - response body
     *      - arg2 - request id
     * @param {function(number,number,string):void} [options.cbProgress] Callback on progress of the request (default: empty)
     *      - arg0 - bytes loaded
     *      - arg1 - bytes total
     *      - arg2 - request id
     * @returns {Promise}
     */

• TkBrowser.saveValAsJson(fileName, value)
    /**
     * Saves the passed value in JSON format
     * @param {string} fileName                 Name of file
     * @param {any} value                       Value to save
     */
~~~

### TkNode (only be used in the nodejs):

~~~ javascript
• TkNode.traverseFiles(root, options = {})
    /**
     * Traversing files in folders
     * @param {string} root                     Root for traversing
     * @param {object} [options]                Options
     * @param {string[]} [options.include]      Array of patterns of files/folders to includes in traversing (default: empty → all traversing)
     * @param {string[]} [options.exclude]      Array of patterns of files/folders to excludes from traversing (default: empty → all traversing)
     * @param {boolean} [options.recursive]     Recursive traversing of folders (default: true)
     * @param {function(string,TParsedPath):void} [options.cbAction] Callback for every file (default: empty)
     *      - arg0 - full path of file
     *      - arg1 - parsed parts of path of file
     * @returns {string[]}                      Array of full pathes of all traversed files
     */
~~~

## Usage

You can find usage examples [here](./examples/example.js) and [here](./examples/example.html)

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at
[github](https://github.com/hrimthurs/Tackle).
