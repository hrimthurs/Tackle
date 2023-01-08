import { getArray } from './TkArray.js'
import { getHash as getHashString } from './TkString.js'

/**
 * Checks if the checkVal is an javascript object
 * @param {any} checkVal                    Check value
 * @param {string} [checkKey]               Checks for the presence of the checkKey in the object (default: null)
 * @returns {boolean}
 */
export function isObjectJs(checkVal, checkKey = null) {
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
export function excludeKeys(srcObj, skipPathKeys, modifySrc = false) {
    let res = modifySrc ? srcObj : clone(srcObj)

    let arrSkipKeys = getArray(skipPathKeys)
    arrSkipKeys.forEach(pathKey => setValue(res, pathKey, null, (root, key) => delete root[key]))

    return res
}

/**
 * Gets the values of the object's fields by pathKeys
 * @param {object} srcObj                   Source object
 * @param {...string} pathKeys              Keys (names or chains names)
 * @returns {any|any[]}                     For single pathKey return value, for a few pathKeys return array values
 */
export function getValue(srcObj, ...pathKeys) {
    let chainKeys = pathKeys.map(name => name.split('.'))

    let values = chainKeys.map(chain => {
        return chain.reduce((obj, key) => isObjectJs(obj, key) ? obj[key] : undefined, srcObj)
    })

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
export function setValue(srcObj, pathKey, value, cbAction = null) {
    let res = false

    let chainKeys = pathKey.split('.')
    if (chainKeys.length > 1) {

        let lastKey = chainKeys.pop()
        let parent = getValue(srcObj, chainKeys.join('.'))
        if (isObjectJs(parent, lastKey)) {
            parent[lastKey] = value
            res = (typeof cbAction === 'function') ? cbAction(parent, lastKey) : true
        }

    } else if (pathKey in srcObj) {
        srcObj[pathKey] = value
        res = (typeof cbAction === 'function') ? cbAction(srcObj, pathKey) : true
    }

    return res
}

/**
 * Try convert object to array
 * @param {object} srcObj                   Source object
 * @returns {Array|object}                  Array if possible convert, else - source object
 */
export function tryConvertToArray(srcObj) {
    const allKeys = Object.keys(srcObj)

    if ((allKeys.length > 0) && allKeys.every((key) => !Number.isNaN(Number(key)))) {
        let res = []
        allKeys.forEach((key) => res[key] = srcObj[key])
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
export function enumeration(srcObj, cbAction, deep = false) {
    const processedFlag = '__TackleEnumAlreadyProcessed__'
    const allKeys = Object.keys(srcObj)

    return Object.fromEntries(allKeys.map(key => {
        let srcVal = srcObj[key]
        let val = cbAction(srcVal, key, allKeys) ?? srcVal

        if (deep && (typeof srcVal === 'object') && (srcVal !== null)) {
            if (!srcVal[processedFlag]) {
                Object.defineProperty(srcVal, processedFlag, {
                    value: true,
                    writable: false,
                    configurable: true
                })

                val = tryConvertToArray(this.enumeration(srcVal, cbAction, deep))
            }

            delete srcVal[processedFlag]
        }

        return [key, val]
    }))
}

/**
 * Deep merge objects into a new object
 * @param {...object} srcObjects            Source objects
 * @returns {object}
 */
export function merge(...srcObjects) {
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
export function clone(srcObj) {
    return JSON.parse(JSON.stringify(srcObj))
}

/**
 * Collects an array of transferable values (use for web worker)
 * @param {object} srcObj                   Source object
 * @returns {Array}                         Array of transferable values
 */
export function getArrayTransferable(srcObj) {
    const transferableNamesClasses = [
        'ArrayBuffer', 'MessagePort',
        'ReadableStream', 'WritableStream', 'TransformStream',
        'ImageBitmap', 'AudioData', 'VideoFrame',
        'OffscreenCanvas', 'RTCDataChannel'
    ]

    let res = []

    enumeration(srcObj, (val) => {
        const isTransferable = transferableNamesClasses.some((checkName) => val.constructor.name === checkName)
        if (isTransferable) res.push(val)
    }, true)

    return res
}

/**
 * Returns the hash of the object with a length of 16 characters
 * @param {object} srcObj                   Source object
 * @param {string|string[]} [skipPathKeys]  Not hash values with these keys (names or chains names)
 * @param {number} [seed]                   Hashing is relative to this value
 * @returns {string}                        String of hex values with a length of 16 characters
 */
export function getHash(srcObj, skipPathKeys = null, seed = 0) {
    return getHashString(JSON.stringify(excludeKeys(srcObj, skipPathKeys)), seed)
}

export default { isObjectJs, excludeKeys, getValue, setValue, tryConvertToArray, enumeration, merge, clone, getArrayTransferable, getHash }