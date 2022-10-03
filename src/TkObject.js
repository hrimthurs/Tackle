const getHashString = require('./TkString.js').getHash
const stringify = require('./TkString.js').stringify
const getArray = require('./TkArray.js').getArray

module.exports = class TkObject {

    static excludeKeys(srcObj, skipKeys, modifySrc = false) {
        let arrSkipKeys = getArray(skipKeys)
        let res = Object.fromEntries(Object.entries(srcObj).filter(rec => !arrSkipKeys.includes(rec[0])))

        if (modifySrc) srcObj = res
        return res
    }

    static getHash(srcObj, skipKeys = null, seed = 0) {
        return getHashString(stringify(this.excludeKeys(srcObj, skipKeys)), seed)
    }

}