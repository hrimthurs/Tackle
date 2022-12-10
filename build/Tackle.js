/**
 * Returns array regardless of type srcVal
 * @param {any} srcVal              - source value
 * @param {boolean} [uniqValues]    - true → returns array of unique values
 * @return {any[]}
 */
function getArray(srcVal, uniqValues = false) {
    let array = Array.isArray(srcVal)
        ? [...srcVal]
        : srcVal != null ? [srcVal] : [];

    return uniqValues ? getUniqValues(array) : array
}

/**
 * Returns array of unique values
 * @param {any[]} srcArr            - source array
 * @param {boolean} [modifySrc]     - true → modifies the original array
 * @return {any[]}
 */
function getUniqValues(srcArr, modifySrc = false) {
    let res = [...new Set(srcArr)];

    if (modifySrc) srcArr = res;
    return res
}

/**
 * Returns array without elements with values from skipValues
 * @param {any[]} srcArr            - source array
 * @param {any|any[]} skipValues    - values for exclude
 * @param {boolean} [modifySrc]     - true → modifies the original array
 * @return {any[]}
 */
function excludeValues(srcArr, skipValues, modifySrc = false) {
    let arrSkipValues = getArray(skipValues);
    let res = srcArr.filter(val => !arrSkipValues.includes(val));

    if (modifySrc) srcArr = res;
    return res
}

/**
 * Returns array with sorted strings
 * @param {string[]} srcArrStr      - source array strings
 * @param {boolean} [modifySrc]     - true → modifies the original array
 * @return {string[]}
 */
function sortArrayStr(srcArrStr, modifySrc = false) {
    let res = srcArrStr.sort((a, b) => a.localeCompare(b));

    if (modifySrc) srcArrStr = res;
    return res
}

/**
 * Checks is all elements of array subArr are present in array mainArr
 * @param {any[]} subArr            - sub array
 * @param {any[]} mainArr           - main array
 * @param {boolean} [strictEqual]   - true → arrays must be equivalent
 * @return {boolean}
 */
function isSubArray(subArr, mainArr, strictEqual = false) {
    let suitableSize = strictEqual
        ? subArr.length == mainArr.length
        : subArr.length <= mainArr.length;

    return suitableSize && subArr.every(val => mainArr.includes(val))
}

var TkArray = { getArray, getUniqValues, excludeValues, sortArrayStr, isSubArray };

/**
 * Converts a numeric value to a string of the specified length with adding '0' (at the beginning for integer, ending for float).
 * If the length of the original number is greater than lenTotal - no change occurs
 * @param {any} srcNum                      - source number
 * @param {number} lenTotal                 - expected length result
 * @param {number} [precision]              - number of decimal points of the result (0 → not change original value)
 * @return {string}
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
 * Returns hash of the string
 * @param {string} srcStr                   - source string
 * @param {number} [seed]                   - hashing is relative to this value
 * @return {string}
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
 * @param {any} checkVal                    - check value
 * @param {string} [checkKey]               - checks for the presence of the checkKey in the object
 * @return {boolean}
 */
function isObjectJs(checkVal, checkKey = null) {
    return (typeof checkVal === 'object')
        && (checkVal !== null)
        && !Array.isArray(checkVal)
        && (!checkKey || (checkKey in checkVal))
}

/**
 * Returns object that does not contain fields with skipKeys keys
 * @param {object} srcObj                   - source object
 * @param {string|string[]} [skipPathKeys]  - exclude keys (names or chains names)
 * @param {boolean} [modifySrc]             - true → modifies the original object
 * @return {object}
 */
function excludeKeys(srcObj, skipPathKeys, modifySrc = false) {
    let res = modifySrc ? srcObj : clone(srcObj);

    let arrSkipKeys = getArray(skipPathKeys);
    arrSkipKeys.forEach(pathKey => setValue(res, pathKey, null, (root, key) => delete root[key]));

    return res
}

/**
 * Gets the values of the object's fields by pathKeys
 * @param {object} srcObj                   - source object
 * @param {...string} pathKeys              - keys (names or chains names)
 * @return {any|any[]} for single pathKey return value, for a few pathKeys return array values
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
 * @param {object} srcObj                                   - source object
 * @param {string} pathKey                                  - key (name or chain names)
 * @param {any} value                                       - value
 * @param {function(object, string):any} [cbAction]         - callback action for success set
 *      - arg0 - parent object of the setting field
 *      - arg1 - finite key of the setting field
 * @return {boolean|any} true/false as a success set value, or result cbAction (if given)
 */
function setValue(srcObj, pathKey, value, cbAction = null) {
    let res = false;

    let chainKeys = pathKey.split('.');
    if (chainKeys.length > 1) {

        let lastKey = chainKeys.pop();
        let parent = getValue(srcObj, chainKeys.join('.'));
        if (isObjectJs(parent, lastKey)) {
            parent[lastKey] = value;
            res = (typeof cbAction === 'function') ? cbAction(parent, lastKey) : true;
        }

    } else if (pathKey in srcObj) {
        srcObj[pathKey] = value;
        res = (typeof cbAction === 'function') ? cbAction(srcObj, pathKey) : true;
    }

    return res
}

/**
 * Enumeration all object fields
 * @param {object} srcObj                                   - source object
 * @param {function(any, string, string[]):any} cbAction    - callback action for every field
 *      - arg0 - field current value
 *      - arg1 - field key
 *      - arg2 - all fields keys
 * @return {object} new object based on the results of cbAction calls
 */
function enumeration(srcObj, cbAction) {
    let allKeys = Object.keys(srcObj);
    return Object.fromEntries(allKeys.map(key => [key, cbAction(srcObj[key], key, allKeys)]))
}

/**
 * Deep merge objects into a new object
 * @param {...object} srcObjects            - source objects
 * @return {object}
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
 * @param {object} srcObj                   - source object
 * @return {object}
 */
function clone(srcObj) {
    return JSON.parse(JSON.stringify(srcObj))
}

/**
 * Returns hash of the object
 * @param {object} srcObj                   - source object
 * @param {string|string[]} [skipPathKeys]  - not hash values with these keys (names or chains names)
 * @param {number} [seed]                   - hashing is relative to this value
 * @return {string}
 */
function getHash(srcObj, skipPathKeys = null, seed = 0) {
    return getHash$1(JSON.stringify(excludeKeys(srcObj, skipPathKeys)), seed)
}

var TkObject = { isObjectJs, excludeKeys, getValue, setValue, enumeration, merge, clone, getHash };

/**
 * Returns function decorator that implements memoization
 * @param {function} srcFunc        - source function
 * @param {object} [context]        - function execution context
 * @return {function}
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

/**
 * Converts the number of bytes to kilobytes
 * @param {number} numBytes                 - number of bytes
 * @param {number} [precision]              - defines the number of decimal points of the result
 * @return {number}
 */
function bytesToKb(numBytes, precision = 2) {
    return trimFloat(numBytes / 1024, precision)
}

/**
 * Converts the number of bytes to megabytes
 * @param {number} numBytes                 - number of bytes
 * @param {number} [precision]              - defines the number of decimal points of the result
 * @return {number}
 */
function bytesToMb(numBytes, precision = 2) {
    return trimFloat(numBytes / 1048576, precision)
}

/**
 * Trimming float numbers with a given precision
 * @param {any} srcVal                      - value with containing float numbers
 * @param {number} precision                - defines the number of decimal points of the result float numbers
 * @param {boolean} [stringify]             - return the result as converted to string
 * @return {any|string}
 */
function trimFloat(srcVal, precision, stringify = false) {
    let res = _valToStr(srcVal, { 'number': v => Number(v.toFixed(precision)) });
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
 * @param {string|URL} [srcUrl]             - source URL (if not set in case client side → used self.location.href)
 * @param {object} [options]                - options
 * @param {boolean} [options.keysLowerCase] - convert all parameters names to lower case (default: false)
 * @param {boolean} [options.valsLowerCase] - convert all strings values to lower case (default: false)
 * @return {object}
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
function setParamsURL(url, params = {}, encode = false) {
    let res = typeof url === 'string' ? _tryMakeURL(url) : url;
    if (res) {

        for (const key in params) {
            let value = params[key];

            if (typeof value === 'object') {
                let obj = Array.isArray(value)
                    ? value.map(val => _valToStr(val, { 'string': v => v }))
                    : Object.entries(value).map(rec => `${rec[0]}:${_valToStr(rec[1], { 'string': v => v })}`);

                value = obj.join(',');
            }

            res.searchParams.set(key, encode ? encodeURIComponent(value) : value);
        }
    }

    return res
}

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
        ? res.concat(saveItems).map(val => val === '' || _tryStrToObj(val))
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

var TkService = { bytesToKb, bytesToMb, trimFloat, getParamsURL, setParamsURL };

var Tackle = { TkArray, TkString, TkObject, TkFunction, TkService };

export { TkArray, TkFunction, TkObject, TkService, TkString, Tackle as default };
