import TkString from './TkString.js'
import TkArray from './TkArray.js'

export default class TkObject {

    /**
     * Checks if the checkVal is an javascript object
     * @param {any} checkVal                    - check value
     * @param {string} [checkKey]               - checks for the presence of the checkKey in the object
     * @return {boolean}
     */
    static isObjectJs(checkVal, checkKey = null) {
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
    static excludeKeys(srcObj, skipPathKeys, modifySrc = false) {
        let res = modifySrc ? srcObj : this.clone(srcObj)

        let arrSkipKeys = TkArray.getArray(skipPathKeys)
        arrSkipKeys.forEach(pathKey => this.setValue(res, pathKey, null, (root, key) => delete root[key]))

        return res
    }

    /**
     * Gets the values of the object's fields by pathKeys
     * @param {object} srcObj                   - source object
     * @param {...string} pathKeys              - keys (names or chains names)
     * @return {any|any[]} for single pathKey return value, for a few pathKeys return array values
     */
    static getValue(srcObj, ...pathKeys) {
        let chainKeys = pathKeys.map(name => name.split('.'))

        let values = chainKeys.map(chain => {
            return chain.reduce((obj, key) => this.isObjectJs(obj, key) ? obj[key] : undefined, srcObj)
        })

        return chainKeys.length == 1 ? values[0] : values
    }

    /**
     * Sets value to object field by pathKey
     * @param {object} srcObj                           - source object
     * @param {string} pathKey                          - key (name or chain names)
     * @param {any} value                               - value
     * @param {function(object, string):any} [cbAction] - callback action for success set
     *      - arg0 - parent object of the setting field
     *      - arg1 - finite key of the setting field
     * @return {boolean|any} true/false as a success set value, or result cbAction (if given)
     */
    static setValue(srcObj, pathKey, value, cbAction = null) {
        let res = false

        let chainKeys = pathKey.split('.')
        if (chainKeys.length > 1) {

            let lastKey = chainKeys.pop()
            let parent = this.getValue(srcObj, chainKeys.join('.'))
            if (this.isObjectJs(parent, lastKey)) {
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
     * Deep merge objects into a new object
     * @param {...object} srcObjects            - source objects
     * @return {object}
     */
    static merge(...srcObjects) {
        return srcObjects.reduce((objA, objB) => (
            objA = this.isObjectJs(objB) && this.isObjectJs(objA) && (Object.keys(objA).length > 0)
                ? Object.keys(objB).reduce((obj, k) => objB[k] != null ? (obj[k] = this.merge(objA[k], objB[k]), obj) : obj, { ...objA })
                : (objB == null) ? objA : objB
        , objA), {})
    }

    /**
     * Creates an independent clone of the object
     * @param {object} srcObj                   - source object
     * @return {object}
     */
    static clone(srcObj) {
        return JSON.parse(JSON.stringify(srcObj))
    }

    /**
     * Returns hash of the object
     * @param {object} srcObj                   - source object
     * @param {string|string[]} [skipPathKeys]  - not hash values with these keys (names or chains names)
     * @param {number} [seed]                   - hashing is relative to this value
     * @return {string}
     */
    static getHash(srcObj, skipPathKeys = null, seed = 0) {
        return TkString.getHash(JSON.stringify(this.excludeKeys(srcObj, skipPathKeys)), seed)
    }

}