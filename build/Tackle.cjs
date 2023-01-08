/* @hrimthurs/tackle 1.9.2 https://github.com/hrimthurs/Tackle @license MIT */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var TkArray = { getArray, getUniqValues, excludeValues, sortArrayStr, isSubArray };

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

    let arrSkipKeys = getArray(skipPathKeys);
    arrSkipKeys.forEach(pathKey => setValue(res, pathKey, null, (root, key) => delete root[key]));

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
 * @param {object} srcObj                   Source object
 * @param {string} pathKey                  Key (name or chain names)
 * @param {any} value                       Value
 * @param {function(object, string):any} [cbAction] Callback action for success set (default: null)
 *      - arg0 - parent object of the setting field
 *      - arg1 - finite key of the setting field
 * @returns {boolean|any}                   True/false as a success set value, or result cbAction (if given)
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
 * Enumeration all object fields
 * @param {object} srcObj                   Source object
 * @param {function(any, string, string[]):any} cbAction Callback action for every field
 *      - arg0 - field current value
 *      - arg1 - field key
 *      - arg2 - all fields keys
 * @param {boolean} [deep]                  Recursive enumeration all subobjects (default: false)
 * @returns {object}                        New object based on the results of cbAction calls
 */
function enumeration(srcObj, cbAction, deep = false) {
    const processedFlag = '__TackleEnumAlreadyProcessed__';
    const allKeys = Object.keys(srcObj);

    return Object.fromEntries(allKeys.map(key => {
        let srcVal = srcObj[key];
        let val = cbAction(srcVal, key, allKeys) ?? srcVal;

        if (deep && (typeof srcVal === 'object') && (srcVal !== null)) {
            if (!srcVal[processedFlag]) {
                Object.defineProperty(srcVal, processedFlag, {
                    value: true,
                    writable: false,
                    configurable: true
                });

                val = tryConvertToArray(enumeration(srcVal, cbAction, deep));
            }

            delete srcVal[processedFlag];
        }

        return [key, val]
    }))
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

    enumeration(srcObj, (val) => {
        const isTransferable = transferableNamesClasses.some((checkName) => val.constructor.name === checkName);
        if (isTransferable) res.push(val);
    }, true);

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

var TkObject = { isObjectJs, excludeKeys, getValue, setValue, tryConvertToArray, enumeration, merge, clone, getArrayTransferable, getHash };

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
function setParamsURL(url, params = {}, encode = false) {
    let res = typeof url === 'string' ? _tryMakeURL(url) : url;
    if (res) {

        for (const key in params) {
            let value = params[key];

            if (typeof value === 'object') {
                let obj = Array.isArray(value)
                    ? value.map((val) => _valToStr(val, { 'string': (v) => v }))
                    : Object.entries(value).map((rec) => `${rec[0]}:${_valToStr(rec[1], { 'string': (v) => v })}`);

                value = obj.join(',');
            }

            res.searchParams.set(key, encode ? encodeURIComponent(value) : value);
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
 * @param {function(function, number):void} [options.cbCreate] Callback after create promise (default: empty)
 *      - arg0 - promise resolve function
 *      - arg1 - timeout id
 * @param {boolean} [options.timeoutReject] Call reject on timeout (default: false → call resolve without args)
 * @returns {Promise}
 */
function PromiseTimeout(limTimeout, { func = null, args = [], cbCreate = (resolve, idTimeout) => {}, timeoutReject = false }) {
    return new Promise(async (resolve, reject) => {
        const idTimeout = setTimeout(() => {
            if (timeoutReject) reject(new Error('timeout'));
            else resolve();
        }, limTimeout);

        cbCreate(resolve, idTimeout);

        if (func) {
            try {
                resolve(await func(...args));
            } catch (error) {
                reject(error);
            } finally {
                clearTimeout(idTimeout);
            }
        }
    })
}

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

var TkService = { bytesToKb, bytesToMb, trimFloat, getParamsURL, setParamsURL, generateHashUID, generateUUID, PromiseTimeout };

var Tackle = { TkArray, TkString, TkObject, TkFunction, TkService };

exports.TkArray = TkArray;
exports.TkFunction = TkFunction;
exports.TkObject = TkObject;
exports.TkService = TkService;
exports.TkString = TkString;
exports.default = Tackle;
