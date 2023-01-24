import { getArray } from './TkArray.js'
import { getHash as getHashString } from './TkString.js'

/**
 * @typedef {import('./Tackle').TObjectJS} TObjectJS Type of object JS
 */

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
 * @param {TObjectJS} srcObj                Source object
 * @param {string|string[]} [skipPathKeys]  Exclude keys (names or chains names) (default: empty)
 * @param {boolean} [modifySrc]             Modify the original object (default: false)
 * @returns {TObjectJS}
 */
export function excludeKeys(srcObj, skipPathKeys, modifySrc = false) {
    let res = modifySrc ? srcObj : clone(srcObj)

    getArray(skipPathKeys).forEach(pathKey => setValue(res, pathKey, null, {
        cbAction: (root, key) => delete root[key]
    }))

    return res
}

/**
 * Gets the values of the object's fields by pathKeys
 * @param {TObjectJS} srcObj                Source object
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
 * @param {TObjectJS} dstObj                Destination object
 * @param {string} pathKey                  Key (name or chain names)
 * @param {any} value                       Value
 * @param {object} [options]                Options
 * @param {boolean} [options.onlyExist]     Set value to only exists fields or create new fields (default: true)
 * @param {function(TObjectJS,string):any} [options.cbAction] Callback action for success set (default: empty)
 *      - arg0 - parent object of the setting field
 *      - arg1 - finite key of the setting field
 * @returns {boolean|any}                   True/false as a success set value, or result cbAction (if given)
 */
function setValue(dstObj, pathKey, value, options = {}) {
    let res = false

    const onlyExist = options.onlyExist ?? true
    const cbAction = options.cbAction ?? (() => {})

    let chainKeys = pathKey.split('.')
    if (chainKeys.length > 1) {

        if (onlyExist) {
            const lastKey = chainKeys.pop()
            let parent = getValue(dstObj, chainKeys.join('.'))
            if (isObjectJs(parent, lastKey)) {
                parent[lastKey] = value
                res = cbAction(parent, lastKey) ?? true
            }
        } else {
            let node = dstObj

            chainKeys.forEach((key, ind) => {
                if (!(key in node)) {
                    if (ind < chainKeys.length - 1) {
                        node[key] = {}
                        node = node[key]
                    } else node[key] = value
                }
            })
        }

    } else if (!onlyExist || (pathKey in dstObj)) {
        dstObj[pathKey] = value
        res = cbAction(dstObj, pathKey) ?? true
    }

    return res
}

/**
 * Sets values to exists object fields. Arrays are written in their entirety
 * @param {TObjectJS} targetObj             Target object
 * @param {TObjectJS} properties            Properties
 * @param {boolean} [strictTypes]           Strict type matching of values (default: true)
 */
export function setProperties(targetObj, properties, strictTypes = true) {
    traverse(properties, (val, key, chainKeysParents) => {
        const isArrayVal = Array.isArray(val)

        if (isArrayVal || (val === null) || (typeof val !== 'object')) {
            const chain = chainKeysParents !== ''
                ? chainKeysParents + '.' + key
                : key

            const srcVal = getValue(targetObj, chain)

            if (!strictTypes || ((typeof srcVal === typeof val) && (Array.isArray(srcVal) === isArrayVal))) {
                setValue(targetObj, chain, val)
            }
        }
    }, true)
}

/**
 * Traverse object fields
 * @param {TObjectJS} srcObj                Source object
 * @param {function(any,string,string):any} cbAction Callback action for every field
 *      - arg0 - field current value
 *      - arg1 - field key
 *      - arg2 - chain keys parents
 * @param {boolean} [deepObjects]           Recursive traverse all sub objects (default: false)
 * @param {boolean} [deepArrays]            Recursive traverse all sub arrays (default: false)
 * @returns {TObjectJS}                     New object based on the results of cbAction calls
 */
export function traverse(srcObj, cbAction, deepObjects = false, deepArrays = false) {
    return _traverseObject(srcObj, cbAction, deepObjects, deepArrays)
}

/**
 * Deep merge objects into a new object
 * @param {...TObjectJS} srcObjects         Source objects
 * @returns {TObjectJS}
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
 * @param {TObjectJS} srcObj                Source object
 * @returns {TObjectJS}                     Clone of the object
 */
export function clone(srcObj) {
    return JSON.parse(JSON.stringify(srcObj))
}

/**
 * Try convert object to array
 * @param {TObjectJS} srcObj                Source object
 * @returns {Array|TObjectJS}               Array if possible convert, else - source object
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
 * Collects an array of transferable values (use for web worker)
 * @param {TObjectJS} srcObj                Source object
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

    traverse(srcObj, (val) => {
        const isTransferable = transferableNamesClasses.some((checkName) => val.constructor.name === checkName)
        if (isTransferable) res.push(val)
    }, true, true)

    return res
}

/**
 * Returns the hash of the object with a length of 16 characters
 * @param {TObjectJS} srcObj                Source object
 * @param {string|string[]} [skipPathKeys]  Not hash values with these keys (names or chains names)
 * @param {number} [seed]                   Hashing is relative to this value
 * @returns {string}                        String of hex values with a length of 16 characters
 */
export function getHash(srcObj, skipPathKeys = null, seed = 0) {
    return getHashString(JSON.stringify(excludeKeys(srcObj, skipPathKeys)), seed)
}

export default { isObjectJs, excludeKeys, getValue, setValue, setProperties, traverse, merge, clone, tryConvertToArray, getArrayTransferable, getHash }

/////////////////////////////////////////////////   PRIVATE   /////////////////////////////////////////////////

function _traverseObject(srcObj, cbAction, deepObjects, deepArrays, chainKeysParents = []) {
    const processedFlag = '__TackleEnumAlreadyProcessed__'
    const allKeys = Object.keys(srcObj)

    return Object.fromEntries(allKeys.map(key => {
        let srcVal = srcObj[key]
        let val = cbAction(srcVal, key, chainKeysParents.join('.')) ?? srcVal

        if ((deepArrays && Array.isArray(srcVal)) || (deepObjects && isObjectJs(srcVal))) {
            if (!srcVal[processedFlag]) {
                Object.defineProperty(srcVal, processedFlag, {
                    value: true,
                    writable: false,
                    configurable: true
                })

                let valRecursive = _traverseObject(srcVal, cbAction, deepObjects, deepArrays, chainKeysParents.concat(key))

                val = Array.isArray(srcVal)
                    ? tryConvertToArray(valRecursive)
                    : valRecursive
            }

            delete srcVal[processedFlag]
        }

        return [key, val]
    }))
}