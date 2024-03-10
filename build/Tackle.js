/* @hrimthurs/tackle 1.19.1 https://github.com/hrimthurs/Tackle @license MIT */
/**
 * Returns array regardless of type srcVal
 * @param {any} srcVal                      Source value
 * @param {boolean} [uniqValues]            Returns array of unique values (default: false)
 * @returns {any[]}
 */
function getArray(srcVal, uniqValues = false) {
    let array = Array.isArray(srcVal)
        ? [...srcVal]
        : srcVal != null ? [srcVal] : [];

    return uniqValues ? getUniqValues(array) : array
}

/**
 * Returns array of unique values
 * @param {any[]} srcArr                    Source array
 * @param {boolean} [modifySrc]             Modify the original array (default: false)
 * @returns {any[]}                         Array with unique values
 */
function getUniqValues(srcArr, modifySrc = false) {
    let res = [...new Set(srcArr)];

    if (modifySrc) srcArr = res;
    return res
}

/**
 * Swap array values
 * @param {any[]} srcArr                    Source array
 * @param {...[number, number]} indsCouples Couples of indices for values swap
 * @returns {any[]}
 */
function swapValues(srcArr, ...indsCouples) {
    indsCouples.forEach(([indA, indB]) => {
        srcArr[indA] = srcArr.splice(indB, 1, srcArr[indA])[0];
    });

    return srcArr
}

/**
 * Returns array without elements with values from skipValues
 * @param {any[]} srcArr                    Source array
 * @param {any|any[]} skipValues            Values for exclude
 * @param {boolean} [modifySrc]             Modify the original array (default: false)
 * @returns {any[]}
 */
function excludeValues(srcArr, skipValues, modifySrc = false) {
    let arrSkipValues = getArray(skipValues);
    let res = srcArr.filter(val => !arrSkipValues.includes(val));

    if (modifySrc) srcArr = res;
    return res
}

/**
 * Returns array with sorted strings
 * @param {string[]} srcArrStr              Source array strings
 * @param {boolean} [modifySrc]             Modify the original array (default: false)
 * @returns {string[]}                      Array with sorted strings
 */
function sortArrayStr(srcArrStr, modifySrc = false) {
    let res = srcArrStr.sort((a, b) => a.localeCompare(b));

    if (modifySrc) srcArrStr = res;
    return res
}

/**
 * Checks is all elements of array subArr are present in array mainArr
 * @param {any[]} subArr                    Sub array
 * @param {any[]} mainArr                   Main array
 * @param {boolean} [strictEqual]           Arrays must be equivalent (default: false)
 * @returns {boolean}
 */
function isSubArray(subArr, mainArr, strictEqual = false) {
    let suitableSize = strictEqual
        ? subArr.length == mainArr.length
        : subArr.length <= mainArr.length;

    return suitableSize && subArr.every(val => mainArr.includes(val))
}

var TkArray = { getArray, getUniqValues, swapValues, excludeValues, sortArrayStr, isSubArray };

/**
 * Converts a numeric value to a string of the specified length with adding '0' (at the beginning for integer, ending for float).
 * If the length of the original number is greater than lenTotal - no change occurs
 * @param {any} srcNum                      Source number
 * @param {number} lenTotal                 Expected length result
 * @param {number} [precision]              Number of decimal points of the result (default: 0 → not change original value)
 * @returns {string}                        String with formatted number
 */
function formatNumber(srcNum, lenTotal, precision = 0) {
    const absNum = Math.abs(srcNum);
    const strSign = srcNum < 0 ? '-' : '';
    const strAbsNum = precision ? absNum.toFixed(precision) : absNum.toString();

    let addZero = lenTotal - strAbsNum.length - strSign.length;

    let strNum = addZero <= 0
        ? strAbsNum
        : Number.isInteger(srcNum) && !precision
            ? '0'.repeat(addZero) + strAbsNum
            : strAbsNum + '0'.repeat(addZero);

    return strSign + strNum
}

/**
 * Returns the hash of the string with a length of 16 characters
 * @param {string} srcStr                   Source string
 * @param {number} [seed]                   Hashing is relative to this value (default: 0)
 * @returns {string}                        String of hex values with a length of 16 characters
 */
function getHash$1(srcStr, seed = 0) {
    const factor = {
        h1: { f1: 0xdeadbeef, f2: 2654435761, f3: 2246822507 },
        h2: { f1: 0x41c6ce57, f2: 1597334677, f3: 3266489909 }
    };

    let h1 = factor.h1.f1^seed, h2 = factor.h2.f1^seed;

    for (let i = 0; i < srcStr.length; i++) {
        let code = srcStr.charCodeAt(i);
        h1 = Math.imul(h1^code, factor.h1.f2);
        h2 = Math.imul(h2^code, factor.h2.f2);
    }

    h1 = Math.imul(h1^(h1>>>16), factor.h1.f3)^Math.imul(h2^(h2>>>13), factor.h2.f3);
    h2 = Math.imul(h2^(h2>>>16), factor.h1.f3)^Math.imul(h1^(h1>>>13), factor.h2.f3);

    let hash = (h2>>>0).toString(16) + (h1>>>0).toString(16);
    return '0'.repeat(16 - hash.length) + hash
}

var TkString = { formatNumber, getHash: getHash$1 };

/**
 * Checks if the checkVal is an javascript object
 * @param {any} checkVal                    Check value
 * @param {string} [checkKey]               Checks for the presence of the checkKey in the object (default: null)
 * @returns {boolean}
 */
function isObjectJs(checkVal, checkKey = null) {
    return (typeof checkVal === 'object')
        && (checkVal !== null)
        && !Array.isArray(checkVal)
        && (!checkKey || (checkKey in checkVal))
}

/**
 * Returns object that does not contain fields with skipKeys keys
 * @param {object} srcObj                   Source object
 * @param {string|string[]} [skipPathKeys]  Exclude keys (names or chains names) (default: empty)
 * @param {boolean} [modifySrc]             Modify the original object (default: false)
 * @returns {object}
 */
function excludeKeys(srcObj, skipPathKeys, modifySrc = false) {
    let res = modifySrc ? srcObj : clone(srcObj);

    getArray(skipPathKeys).forEach(pathKey => setValue(res, pathKey, null, {
        cbAction: (root, key) => delete root[key]
    }));

    return res
}

/**
 * Gets the values of the object's fields by pathKeys
 * @param {object} srcObj                   Source object
 * @param {...string} pathKeys              Keys (names or chains names)
 * @returns {any|any[]}                     For single pathKey return value, for a few pathKeys return array values
 */
function getValue(srcObj, ...pathKeys) {
    let chainKeys = pathKeys.map(name => name.split('.'));

    let values = chainKeys.map(chain => {
        return chain.reduce((obj, key) => isObjectJs(obj, key) ? obj[key] : undefined, srcObj)
    });

    return chainKeys.length == 1 ? values[0] : values
}

/**
 * Sets value to object field by pathKey
 * @param {object} dstObj                   Destination object
 * @param {string} pathKey                  Key (name or chain names)
 * @param {any} value                       Value
 * @param {object} [options]                Options
 * @param {boolean} [options.onlyExist]     Set value to only exists fields or create new fields (default: true)
 * @param {function(object,string):any}     [options.cbAction] Callback action for success set (default: empty)
 *      - arg0 - parent object of the setting field
 *      - arg1 - finite key of the setting field
 * @returns {boolean|any}                   True/false as a success set value, or result cbAction (if given)
 */
function setValue(dstObj, pathKey, value, options = {}) {
    let res = false;

    const onlyExist = options.onlyExist ?? true;
    const cbAction = options.cbAction ?? (() => {});

    let chainKeys = pathKey.split('.');
    if (chainKeys.length > 1) {

        if (onlyExist) {
            const lastKey = chainKeys.pop();
            let parent = getValue(dstObj, chainKeys.join('.'));
            if (isObjectJs(parent, lastKey)) {
                parent[lastKey] = value;
                res = cbAction(parent, lastKey) ?? true;
            }
        } else {
            let node = dstObj;

            chainKeys.forEach((key, ind) => {
                if (!(key in node)) {
                    if (ind < chainKeys.length - 1) {
                        node[key] = {};
                        node = node[key];
                    } else node[key] = value;
                }
            });
        }

    } else if (!onlyExist || (pathKey in dstObj)) {
        dstObj[pathKey] = value;
        res = cbAction(dstObj, pathKey) ?? true;
    }

    return res
}

/**
 * Sets values to exists object fields. Arrays are written in their entirety
 * @param {object} targetObj                Target object
 * @param {object} properties               Properties
 * @param {boolean} [strictTypes]           Strict type matching of values (default: true)
 */
function setProperties(targetObj, properties, strictTypes = true) {
    traverse(properties, (val, key, chainKeysParents) => {
        const isArrayVal = Array.isArray(val);

        if (isArrayVal || (val === null) || (typeof val !== 'object')) {
            const chain = chainKeysParents !== ''
                ? chainKeysParents + '.' + key
                : key;

            const srcVal = getValue(targetObj, chain);

            if (!strictTypes || ((typeof srcVal === typeof val) && (Array.isArray(srcVal) === isArrayVal))) {
                setValue(targetObj, chain, val);
            }
        }
    }, true);
}

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
function traverse(srcObj, cbAction, deepObjects = false, deepArrays = false) {
    return _traverseObject(srcObj, cbAction, deepObjects, deepArrays)
}

/**
 * Deep merge objects into a new object
 * @param {...object} srcObjects            Source objects
 * @returns {object}
 */
function merge(...srcObjects) {
    return srcObjects.reduce((objA, objB) => (
        objA = isObjectJs(objB) && isObjectJs(objA) && (Object.keys(objA).length > 0)
            ? Object.keys(objB).reduce((obj, k) => objB[k] != null ? (obj[k] = merge(objA[k], objB[k]), obj) : obj, { ...objA })
            : (objB == null) ? objA : objB
    , objA), {})
}

/**
 * Creates an independent clone of the object
 * @param {object} srcObj                   Source object
 * @returns {object}                        Clone of the object
 */
function clone(srcObj) {
    return JSON.parse(JSON.stringify(srcObj))
}

/**
 * Try convert object to array
 * @param {object} srcObj                   Source object
 * @returns {Array|object}                  Array if possible convert, else - source object
 */
 function tryConvertToArray(srcObj) {
    const allKeys = Object.keys(srcObj);

    if ((allKeys.length > 0) && allKeys.every((key) => !Number.isNaN(Number(key)))) {
        let res = [];
        allKeys.forEach((key) => res[key] = srcObj[key]);
        return res
    } else return srcObj
}

/**
 * Collects an array of transferable values (use for web worker)
 * @param {object} srcObj                   Source object
 * @returns {Array}                         Array of transferable values
 */
function getArrayTransferable(srcObj) {
    const transferableNamesClasses = [
        'ArrayBuffer', 'MessagePort',
        'ReadableStream', 'WritableStream', 'TransformStream',
        'ImageBitmap', 'AudioData', 'VideoFrame',
        'OffscreenCanvas', 'RTCDataChannel'
    ];

    let res = [];

    traverse(srcObj, (val) => {
        const isTransferable = transferableNamesClasses.some((checkName) => val.constructor.name === checkName);
        if (isTransferable) res.push(val);
    }, true, true);

    return res
}

/**
 * Returns the hash of the object with a length of 16 characters
 * @param {object} srcObj                   Source object
 * @param {string|string[]} [skipPathKeys]  Not hash values with these keys (names or chains names)
 * @param {number} [seed]                   Hashing is relative to this value
 * @returns {string}                        String of hex values with a length of 16 characters
 */
function getHash(srcObj, skipPathKeys = null, seed = 0) {
    return getHash$1(JSON.stringify(excludeKeys(srcObj, skipPathKeys)), seed)
}

var TkObject = { isObjectJs, excludeKeys, getValue, setValue, setProperties, traverse, merge, clone, tryConvertToArray, getArrayTransferable, getHash };

/////////////////////////////////////////////////   PRIVATE   /////////////////////////////////////////////////

function _traverseObject(srcObj, cbAction, deepObjects, deepArrays, chainKeysParents = []) {
    const processedFlag = '__TackleEnumAlreadyProcessed__';
    const allKeys = Object.keys(srcObj);

    return Object.fromEntries(allKeys.map(key => {
        let srcVal = srcObj[key];
        let val = cbAction(srcVal, key, chainKeysParents.join('.')) ?? srcVal;

        if ((deepArrays && Array.isArray(srcVal)) || (deepObjects && isObjectJs(srcVal))) {
            if (!srcVal[processedFlag]) {
                Object.defineProperty(srcVal, processedFlag, {
                    value: true,
                    writable: false,
                    configurable: true
                });

                let valRecursive = _traverseObject(srcVal, cbAction, deepObjects, deepArrays, chainKeysParents.concat(key));

                val = Array.isArray(srcVal)
                    ? tryConvertToArray(valRecursive)
                    : valRecursive;
            }

            delete srcVal[processedFlag];
        }

        return [key, val]
    }))
}

/**
 * Returns function decorator that implements memoization
 * @param {function} srcFunc                Source function
 * @param {object} [context]                Function execution context (default: globalThis)
 * @returns {function}                      Memoized decorator
 */
function decoMemoize(srcFunc, context = globalThis) {
    let cache = new Map();

    return function () {
        let res;
        let key = [].join.call(arguments);

        if (!cache.has(key)) {
            res = srcFunc.apply(context, arguments);
            cache.set(key, res);
        } else res = cache.get(key);

        return res
    }
}

var TkFunction = { decoMemoize };

const HALF_PI = Math.PI / 2;
const QUART_PI = Math.PI / 4;

const _DEG_TO_RAD = Math.PI / 180;

/**
 * Converts angle value from degree to radian
 * @param {number} [angleDeg]               Angle degree (default: 0)
 * @returns {number}
 */
function angleDegToRad(angleDeg = 0) {
    return Number(angleDeg) * _DEG_TO_RAD
}

/**
 * Round float number with a given precision
 * @param {number} srcVal                   Float number
 * @param {number} [precision]              Defines the number of decimal points of the result float number (default: 3)
 * @returns {number}
 */
function roundFloat(srcVal, precision = 3) {
    return Number(srcVal.toFixed(precision))
}

/**
 * Calculates the dot product of 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
function dotProduct2D(ptA, ptB) {
    return (ptA.x * ptB.x) + (ptA.y * ptB.y)
}

/**
 * Calculates the cross product of 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
function crossProduct2D(ptA, ptB) {
    return (ptA.x * ptB.y) - (ptA.y * ptB.x)
}

/**
 * Calculates the delta between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {{x:number,y:number}}
 */
function delta2D(ptA, ptB) {
    return {
        x: ptA.x - ptB.x,
        y: ptA.y - ptB.y
    }
}

/**
 * Calculates the midpoint between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {{x:number,y:number}}
 */
function midPoint2D(ptA, ptB) {
    return {
        x: (ptA.x + ptB.x) / 2,
        y: (ptA.y + ptB.y) / 2
    }
}

/**
 * Checks is equal coords of 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {number} [tolerance]              Tolerance of match coords (default: 0.1)
 * @returns {boolean}
 */
function isEqualCoords2D(ptA, ptB, tolerance = 0.1) {
    const delta = delta2D(ptB, ptA);
    return (Math.abs(delta.x) < tolerance) && (Math.abs(delta.y) < tolerance)
}

/**
 * Calculates the distance between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
function dist2D(ptA, ptB) {
    const delta = delta2D(ptB, ptA);
    return Math.sqrt(delta.x ** 2 + delta.y ** 2)
}

/**
 * Calculates the Manhattan distance between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
function distManhattan2D(ptA, ptB) {
    const delta = delta2D(ptB, ptA);
    return Math.abs(delta.x) + Math.abs(delta.y)
}

/**
 * Checks is point is nearer 2D ptC to ptA than to ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @returns {boolean}
 */
function isNearerFirstPt2D(ptA, ptB, ptC) {
    return distManhattan2D(ptC, ptA) < distManhattan2D(ptC, ptB)
}

/**
 * Calculates the point 2D on a line lying at a given distance from ptA
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {number} distance                 Distance from ptA
 * @returns {{x:number,y:number}}
 */
function pointOnLineByLen2D(ptA, ptB, distance) {
    const delta = delta2D(ptB, ptA);
    const factor = distance / (dist2D(ptA, ptB) || 1);

    return {
        x: ptA.x + (delta.x * factor),
        y: ptA.y + (delta.y * factor)
    }
}

/**
 * Calculates the projection of a point 2D ptC onto a straight line ─ptA─────ptB─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @returns {{x:number,y:number}}
 */
function projectPointToStraightLine2D(ptA, ptB, ptC) {
    const delta = delta2D(ptB, ptA);
    const deltaPointA = delta2D(ptC, ptA);

    const factor = dotProduct2D(deltaPointA, delta) / dotProduct2D(delta, delta);

    return {
        x: ptA.x + (delta.x * factor),
        y: ptA.y + (delta.y * factor)
    }
}

/**
 * Checks if point 2D ptC on straight line ─ptA─────ptB─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
function isPointBelongStraightLine2D(ptA, ptB, ptC, tolerance = 1.2) {
    const deltaBA = delta2D(ptB, ptA);
    const deltaCA = delta2D(ptC, ptA);

    const doubleArea = crossProduct2D(deltaBA, deltaCA);
    const lengthAB = Math.sqrt(deltaBA.x ** 2 + deltaBA.y ** 2);

    return Math.abs(doubleArea / lengthAB) <= (tolerance / 2)
}

/**
 * Checks if point 2D ptC on line segment ptA─────ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
function isPointBelongLineSegment2D(ptA, ptB, ptC, tolerance = 1.2) {
    let res = false;

    const deltaBA = delta2D(ptB, ptA);
    const sqLengthAB = (deltaBA.x ** 2) + (deltaBA.y ** 2);

    if (sqLengthAB !== 0) {
        const factorBelong = (((ptC.x - ptA.x) * deltaBA.x) + ((ptC.y - ptA.y) * deltaBA.y)) / sqLengthAB;

        if (factorBelong < 0) {
            res = Math.sqrt((ptA.x - ptC.x) ** 2 + (ptA.y - ptC.y) ** 2) <= tolerance;
        } else if (factorBelong > 1) {
            res = Math.sqrt((ptB.x - ptC.x) ** 2 + (ptB.y - ptC.y) ** 2) <= tolerance;
        } else {
            const factorLocate = (((ptA.y - ptC.y) * deltaBA.x) - ((ptA.x - ptC.x) * deltaBA.y)) / sqLengthAB;
            res = Math.abs(factorLocate) * Math.sqrt(sqLengthAB) <= tolerance;
        }
    }

    return res
}

/**
 * Checks if some point 2D on line segment ptA─────ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
function isSomePointBelongLineSegment2D(ptA, ptB, arrPoints, tolerance = 1.2) {
    return arrPoints.some((pt) => isPointBelongLineSegment2D(ptA, ptB, pt, tolerance))
}

/**
 * Checks if every point 2D on line segment ptA─────ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
function isEveryPointBelongLineSegment2D(ptA, ptB, arrPoints, tolerance = 1.2) {
    return arrPoints.every((pt) => isPointBelongLineSegment2D(ptA, ptB, pt, tolerance))
}

/**
 * Checks if point 2D ptA inside in polygon
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {boolean}
 */
function isPointInsidePolygon2D(ptA, polyPts) {
    let isInside = false;

    for (let i = 0, j = polyPts.length - 1; i < polyPts.length; j = i++) {
        const pt1 = polyPts[i];
        const pt2 = polyPts[j];

        const isIntersect =
            ((pt1.y > ptA.y) !== (pt2.y > ptA.y)) &&
            (ptA.x < (pt2.x - pt1.x) * (ptA.y - pt1.y) / (pt2.y - pt1.y) + pt1.x);

        if (isIntersect) isInside = !isInside;
    }

    return isInside
}

/**
 * Checks if some point 2D inside in polygon
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {boolean}
 */
function isSomePointInsidePolygon2D(arrPoints, polyPts) {
    return arrPoints.some((pt) => isPointInsidePolygon2D(pt, polyPts))
}

/**
 * Checks if every point 2D inside in polygon
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {boolean}
 */
function isEveryPointInsidePolygon2D(arrPoints, polyPts) {
    return arrPoints.every((pt) => isPointInsidePolygon2D(pt, polyPts))
}

/**
 * Calculates the cross point 2D of the straight lines ─ptA─────ptB─ and ─ptC─────ptD─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @returns {{x:number,y:number}|undefined}
 */
function crossStraightLines2D(ptA, ptB, ptC, ptD) {
    const factor = _getFactorCrossLines2D(ptA, ptB, ptC, ptD);
    if (factor) {
        return _getPointByFactorCross2D(factor, ptA, ptB)
    }
}

/**
 * Calculates the cross point 2D of the lines segments ptA─────ptB and ptC─────ptD
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @returns {{x:number,y:number}|undefined}
 */
function crossLinesSegments2D(ptA, ptB, ptC, ptD) {
    const factor = _getFactorCrossLines2D(ptA, ptB, ptC, ptD);
    if (_isScopeFactorCross2D(factor)) {
        return _getPointByFactorCross2D(factor, ptA, ptB)
    }
}

/**
 * Checks if crossed of the lines segments ptA─────ptB and ptC─────ptD
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @returns {boolean}
 */
function isCrossLinesSegments2D(ptA, ptB, ptC, ptD) {
    const factor = _getFactorCrossLines2D(ptA, ptB, ptC, ptD);
    return _isScopeFactorCross2D(factor) === true
}

function _getFactorCrossLines2D(ptA, ptB, ptC, ptD) {
    let res = null;

    if (ptA && ptB && ptC && ptD) {
        const deltaAB = delta2D(ptA, ptB);
        const deltaDC = delta2D(ptD, ptC);

        const cross = crossProduct2D(deltaAB, deltaDC);
        if (cross !== 0) {

            const deltaDB = delta2D(ptD, ptB);
            res = {
                Ua: crossProduct2D(deltaDB, deltaDC) / cross,
                Ub: crossProduct2D(deltaAB, deltaDB) / cross
            };
        }
    }

    return res
}

function _isScopeFactorCross2D(factor) {
    return factor && (factor.Ua >= 0) && (factor.Ua <= 1) && (factor.Ub >= 0) && (factor.Ub <= 1)
}

function _getPointByFactorCross2D(factor, ptA, ptB) {
    return {
        x: (ptA.x * factor.Ua) + (ptB.x * (1 - factor.Ua)),
        y: (ptA.y * factor.Ua) + (ptB.y * (1 - factor.Ua))
    }
}

var TkMath = { HALF_PI, QUART_PI, angleDegToRad, roundFloat, dotProduct2D, crossProduct2D, delta2D, midPoint2D, isEqualCoords2D, dist2D, distManhattan2D, isNearerFirstPt2D, pointOnLineByLen2D, projectPointToStraightLine2D, isPointBelongStraightLine2D, isPointBelongLineSegment2D, isSomePointBelongLineSegment2D, isEveryPointBelongLineSegment2D, isPointInsidePolygon2D, isSomePointInsidePolygon2D, isEveryPointInsidePolygon2D, crossStraightLines2D, crossLinesSegments2D, isCrossLinesSegments2D };

/**
 * Converts the number of bytes to kilobytes
 * @param {number} numBytes                 Number of bytes
 * @param {number} [precision]              Defines the number of decimal points of the result (default: 2)
 * @returns {number}                        Number of kilobytes
 */
function bytesToKb(numBytes, precision = 2) {
    return trimFloat(numBytes / 1024, precision)
}

/**
 * Converts the number of bytes to megabytes
 * @param {number} numBytes                 Number of bytes
 * @param {number} [precision]              Defines the number of decimal points of the result (default: 2)
 * @returns {number}                        Number of megabytes
 */
function bytesToMb(numBytes, precision = 2) {
    return trimFloat(numBytes / 1048576, precision)
}

/**
 * Trimming float numbers with a given precision
 * @param {any} srcVal                      Value with containing float numbers
 * @param {number} precision                Defines the number of decimal points of the result float numbers
 * @param {boolean} [stringify]             Return the result as converted to string (default: false)
 * @returns {any|string}
 */
function trimFloat(srcVal, precision, stringify = false) {
    let res = _valToStr(srcVal, { 'number': (v) => Number(v.toFixed(precision)) });
    return stringify ? res : JSON.parse(res)
}

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
function getParamsURL(srcUrl = null, options = {}) {
    const useOptions = {
        keysLowerCase: false,
        valsLowerCase: false,
        ...options
    };

    let res = {};

    let url = srcUrl instanceof URL ? srcUrl : _tryMakeURL(srcUrl);
    if (url) {
        for (const srcKey of url.searchParams.keys()) {
            let srcVal = url.searchParams.get(srcKey).replace(/^["'](.*)["']$/, '$1');

            let arrVal = _paramURLtoArray(useOptions.valsLowerCase ? srcVal.toLowerCase() : srcVal);
            let objVal = arrVal.reduce((obj, val) => {
                if (typeof val === 'string') {
                    let valSplitted = val.split(':');

                    let [subKey, ...vals] = valSplitted;
                    let subVal = vals.length > 1 ? vals.join(':') : vals[0];
                    if (subVal !== undefined) obj[subKey] = _tryStrToObj(subVal);
                }

                return obj
            }, {});

            let resVal = Object.keys(objVal).length != arrVal.length
                ? arrVal.length > 1 ? arrVal : arrVal[0]
                : objVal;

            res[useOptions.keysLowerCase ? srcKey.toLowerCase() : srcKey] = resVal;
        }
    }

    return res
}

/**
 * Set parameters from object to URL
 *
 * Converts:
 * - param_name: undefined → skip
 * - param_name: val1 → param_name=val1
 * - param_name: {val1: val2} → param_name=val1:val2
 * - param_name: [val1, val2, val3] → param_name=val1,val2,val3
 * - param_name: {val1: val2, val3: val4} → param_name=val1:val2,val3:val4
 * - empty array/object, subvalue object of array/object → <json-string>
 *
 * @param {string|URL} url                  Source string URL or exist URL-object
 * @param {object} [params]                 Source object to set as parameters URL (default: {})
 * @param {boolean} [encode]                Use encode URI for result (default: false)
 * @returns {URL}                           Instance URL with parameters
 */
function setParamsURL(url, params = {}, encode = false) {
    let res = typeof url === 'string' ? _tryMakeURL(url) : url;

    if (res) {
        for (const key in params) {
            let value = params[key];

            if (value !== undefined) {
                if ((typeof value === 'object') && (value !== null)) {
                    let obj = Array.isArray(value)
                        ? value.map((val) => _valToStr(val, { 'string': (v) => v }))
                        : Object.entries(value).map((rec) => `${rec[0]}:${_valToStr(rec[1], { 'string': (v) => v })}`);

                    value = obj.length > 0
                        ? obj.join(',')
                        : _valToStr(value);
                }

                res.searchParams.set(key, encode ? encodeURIComponent(value) : value);
            }
        }
    }

    return res
}

/**
 * Generates a unique ID in the format of a hash string of 16 characters length
 * @param {string} [initialStr]             Initial string for generate (default: empty)
 * @returns {string}                        String of hex values with a length of 16 characters
 */
function generateHashUID(initialStr = '') {
    const numRandom = 10 + Math.trunc(Math.random() * 10);
    const strRandom = new Array(numRandom).fill(0).map(() => Math.random()).join();

    return getHash$1(initialStr + Date.now() + strRandom, Math.random())
}

/**
 * Generates a universal unique ID in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * @returns {string}                        String hex values
 */
function generateUUID() {
	const d0 = Math.random() * 0xffffffff | 0;
	const d1 = Math.random() * 0xffffffff | 0;
	const d2 = Math.random() * 0xffffffff | 0;
	const d3 = Math.random() * 0xffffffff | 0;

	const uuid =
        _strHex[d0 & 0xff] + _strHex[d0>>8 & 0xff] + _strHex[d0>>16 & 0xff] + _strHex[d0>>24 & 0xff] + '-' +
		_strHex[d1 & 0xff] + _strHex[d1>>8 & 0xff] + '-' +
        _strHex[d1>>16 & 0x0f | 0x40] + _strHex[d1>>24 & 0xff] + '-' +
		_strHex[d2 & 0x3f | 0x80] + _strHex[d2>>8 & 0xff] + '-' +
        _strHex[d2>>16 & 0xff] + _strHex[d2>>24 & 0xff] + _strHex[d3 & 0xff] + _strHex[d3>>8 & 0xff] + _strHex[d3>>16 & 0xff] + _strHex[d3>>24 & 0xff];

	return uuid.toLowerCase()
}

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
function promiseTimeout(limTimeout, options = {}) {
    return new Promise(async (resolve, reject) => {
        const idTimeout = setTimeout(() => {
            if (options.timeoutReject) reject(new Error('timeout'));
            else resolve();
        }, limTimeout);

        // @ts-ignore
        options?.cbCreate(resolve, idTimeout);

        if (options.func) {
            try {
                resolve(await options.func(...options.args ?? []));
            } catch (error) {
                reject(error);
            } finally {
                clearTimeout(idTimeout);
            }
        }
    })
}

var TkService = { bytesToKb, bytesToMb, trimFloat, getParamsURL, setParamsURL, generateHashUID, generateUUID, promiseTimeout };

/////////////////////////////////////////////////   PRIVATE   /////////////////////////////////////////////////

const _strHex = new Array(256).fill(0).map((val, ind) => (ind < 16 ? '0' : '') + ind.toString(16));

function _paramURLtoArray(srcStr) {
    let res = [];

    let saveItems = [];
    let cntBracket = 0;
    let cntQuotes = 0;

    let splittedVal = srcStr.split(',');

    for (const item of splittedVal) {
        if ((cntBracket > 0) || (item[0] == '{')) {
            saveItems.push(item);

            let chars = item.split('');
            cntBracket = chars.reduce((cnt, ch) => ch == '{' ? ++cnt : ch == '}' ? --cnt : cnt, cntBracket);
            cntQuotes = chars.reduce((cnt, ch) => ['"', '\''].includes(ch) ? ++cnt : cnt, cntQuotes);

            if ((cntBracket == 0) && (item[item.length - 1] == '}')) {
                res.push(saveItems.join(','));
                saveItems = [];
            }
        } else res.push(item);
    }

    return (cntBracket == 0) && (cntQuotes % 2 == 0)
        ? res.concat(saveItems).map((val) => val === '' || _tryStrToObj(val))
        : [srcStr]
}

function _valToStr(srcVal, typeHandler = {}, useStringify = true) {
    let handler = typeHandler[typeof srcVal];
    return handler
        ? handler(srcVal)
        : useStringify
            ? JSON.stringify(srcVal, (key, val) => _valToStr(val, typeHandler, false))
            : srcVal
}

function _tryMakeURL(srcStr) {
    try { return new URL(decodeURIComponent(srcStr || self.location.href)) }
    catch {}
}

function _tryStrToObj(srcStr) {
    try { return JSON.parse(srcStr.replace(/^["'](.*)["']$/, '$1')) }
    catch { return srcStr }
}

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
function createHTMLElement(tagName, options = {}, elParent = null) {
    const element = self.document.createElement(tagName);

    const insertFirst = options.insertFirst ?? false;
    const subElements = options.subElements ?? [];

    Object.entries(options).forEach((recProperty) => {
        const [propName, propVal] = recProperty;

        const isValArray = Array.isArray(propVal);
        const isValString = typeof propVal === 'string';
        const isValObject = typeof propVal === 'object';

        switch (propName) {
            case 'attributes':
                if (isValObject) {
                    Object.entries(propVal).forEach(([name, val]) => {
                        element.setAttribute(name, val);
                    });
                }
            break

            case 'style':
                const currCssText = element.style.cssText ?? '';

                if (isValObject) {
                    Object.entries(propVal).forEach(([name, val]) => {
                        element.style.cssText = currCssText + `;${name}:${val}`;
                    });
                } else if (isValString) {
                    element.style.cssText = currCssText + `;${propVal}`;
                }
            break

            case 'class':
                if (isValArray) {
                    propVal.forEach((rec) => element.classList.add(rec));
                } else if (isValString) {
                    element.classList.add(propVal);
                }
            break

            case 'properties':
                if (isValObject) {
                    Object.entries(propVal).forEach(([name, val]) => {
                        if (name in element) element[name] = val;
                    });
                }
            break
        }
    });

    if (elParent) {
        if (insertFirst) elParent.insertBefore(element, elParent.firstChild);
        else elParent.appendChild(element);
    }

    subElements.forEach((subEl) => {
        const tagName = subEl.tagName;
        delete subEl.tagName;
        createHTMLElement(tagName, subEl, element);
    });

    return element
}

/**
 * Returns real computed size of HTML element
 * @param {HTMLElement} element             HTML element
 * @returns {{width:number,height:number}}  Size of element
 */
function getSizeHTMLElement(element) {
    const { width, height } = getComputedStyle(element);

    return {
        width: parseInt(width, 10) + 1,
        height: parseInt(height, 10) + 1
    }
}

/**
 * Sets/unsets/toggles classes for each element by selector
 * @param {string} selectorElement          Query selector of target elements
 * @param {object} [options]                Options
 * @param {string|string[]} [options.set]   Class/classes name for set to each elements (default: empty)
 * @param {string|string[]} [options.unset] Class/classes name for unset to each elements (default: empty)
 * @param {string|string[]} [options.toggle] Class/classes name for toggle to each elements (default: empty)
 */
function applyClasses(selectorElement, options) {
    const setClasses = getArray(options.set);
    const unsetClasses = getArray(options.unset);
    const toggleClasses = getArray(options.toggle);

    forEachElement(selectorElement, (el) => {
        setClasses.forEach((name) => el.classList.add(name));
        unsetClasses.forEach((name) => el.classList.remove(name));
        toggleClasses.forEach((name) => el.classList.toggle(name));
    });
}

/**
 * Run callback for each element by selector
 * @param {string} selectorElement          Query selector of target elements
 * @param {function(any):void} callback     Callback function
 */
function forEachElement(selectorElement, callback) {
    document.querySelectorAll(selectorElement).forEach((el) => callback(el));
}

/**
 * Set resize handler for div HTML element
 * @param {HTMLElement} elDiv               Div HTML element
 * @param {function({width:number,height:number}):void} handler Handler function
 */
function setDivResizer(elDiv, handler) {
    const elResizer = createHTMLElement('iframe', {
        style: 'position:absolute; left:0px; top:0px; width:100%; height:100%; z-index:-10000',
        attributes: { frameborder: 'no' }
    }, elDiv);

    const contentWindow = elResizer['contentWindow'];

    let prevSize = {
        width: null,
        height: null
    };

    contentWindow.addEventListener('resize', () => {
        const newSize = getSizeHTMLElement(elResizer);

        if ((prevSize.width !== newSize.width) || (prevSize.height !== newSize.height)) {
            handler(newSize);
            prevSize = newSize;
        }
    });

    contentWindow.dispatchEvent(new Event('resize'));
}

/**
 * Intercepting on page "error" and "unhandledrejection" events
 * @param {function(string):void} handler   Callback with error message on errors events
 * @param {boolean} [preventDefault]        Prevent default errors events (default: true)
 */
function interceptErrors(handler, preventDefault = true) {
    window.addEventListener('error', (event) => {
        if (preventDefault) event.preventDefault();
        handler(event.message);
    });

    window.addEventListener('unhandledrejection', (event) => {
        if (preventDefault) event.preventDefault();
        handler(event.reason ?? 'Unknown reason rejection');
    });
}

/**
 * Wait for document complete
 * @param {function():void} [callback]      Callback on document complete
 * @returns {Promise}
 */
function onDocumentComplete(callback = () => {}) {
    return new Promise((resolve) => {
        const complete = () => {
            callback();
            resolve(true);
        };

        if (document.readyState !== 'complete') {
            document.addEventListener('readystatechange', () => {
                if (document.readyState === 'complete') complete();
            });
        } else complete();
    })
}

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
function httpRequest(url, options = {}) {
    const useOptions = {
        method: 'GET',

        /** @type {XMLHttpRequestResponseType} */
        responseType: 'arraybuffer',

        params: {},
        headers: {},

        id: null,
        timeout: 10000,

        useCache: true,
        useReject: false,

        setGetAsFolder: false,
        addPostQString: false,

        cbLoad: (response, requestId) => {},
        cbError: (status, requestId) => {},
        cbFinal: (status, response, requestId) => {},
        cbProgress: (loaded, total, requestId) => {},

        ...options
    };

    const isMethodGET = useOptions.method === 'GET';
    const isMethodPOST = useOptions.method === 'POST';

    let isSetParamsUrl = isMethodGET || (isMethodPOST && useOptions.addPostQString);

    if (isMethodGET && useOptions.setGetAsFolder) {
        url += setParamsURL(self.location.href, options.params).searchParams.toString();
        isSetParamsUrl = false;
    }

    let useUrl;

    try {
        useUrl = new URL(url);
    } catch {
        const baseUrl = new URL(self.location.href).origin;
        useUrl = new URL(url, baseUrl);
    }

    if (isSetParamsUrl) setParamsURL(useUrl, options.params);
    if (!useOptions.useCache) useUrl.searchParams.set('r', Math.random().toString());

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(useOptions.method, useUrl, true);
        xhr.responseType = useOptions.responseType;
        xhr.timeout = useOptions.timeout;

        for (let name in useOptions.headers) {
            xhr.setRequestHeader(name,  useOptions.headers[name]);
        }

        xhr.onloadend = () => {
            const isError = (xhr.status !== 200) || ((useOptions.responseType === 'arraybuffer') && (xhr.response.byteLength === 0));

            if (isError) {
                useOptions.cbError(xhr.status, useOptions.id);
                if (useOptions.useReject) reject(xhr.status);
                else resolve(null);
            } else {
                useOptions.cbLoad(xhr.response, useOptions.id);
                resolve(xhr.response);
            }

            useOptions.cbFinal(xhr.status, xhr.response, useOptions.id);
        };

        xhr.onprogress = (event) => {
            useOptions.cbProgress(event.loaded, event.total, useOptions.id);
        };

        const sendData = JSON.stringify(isMethodPOST ? useOptions.params : {});
        xhr.send(sendData);
    })
}

/**
 * Saves the passed value in JSON format
 * @param {string} fileName                 Name of file
 * @param {any} value                       Value to save
 */
function saveValAsJson(fileName, value) {
    const blob = new Blob([JSON.stringify(value, null, '\t')], { type: 'text/json' });
    const url = URL.createObjectURL(blob);

    setTimeout(() => URL.revokeObjectURL(url), 10000);

    createHTMLElement('a', {
        properties: {
            type: 'text/json',
            download: fileName,
            href: url
        }
    }).click();
}

var TkBrowser = { createHTMLElement, getSizeHTMLElement, applyClasses, forEachElement, setDivResizer, interceptErrors, onDocumentComplete, httpRequest, saveValAsJson };

var TkNode = {};

var Tackle = { TkArray, TkString, TkObject, TkFunction, TkMath, TkService, TkBrowser, TkNode };

export { TkArray, TkBrowser, TkFunction, TkMath, TkNode, TkObject, TkService, TkString, Tackle as default };
