module.exports = class TkArray {

    static getArray(srcVal, uniqValues = false) {
        let array = Array.isArray(srcVal) ? [...srcVal] : srcVal != null ? [srcVal] : []
        return uniqValues ? this.getUniqValues(array) : array
    }

    static getUniqValues(srcArr, modifySrc = false) {
        let res = [...new Set(srcArr)]

        if (modifySrc) srcArr = res
        return res
    }

    static excludeValues(srcArr, skipValues, modifySrc = false) {
        let arrSkipValues = this.getArray(skipValues)
        let res = srcArr.filter(val => !arrSkipValues.includes(val))

        if (modifySrc) srcArr = res
        return res
    }

    static sortArrayStr(srcArrStr, modifySrc = false) {
        let res = this.getArray(srcArrStr).sort((a, b) => a.localeCompare(b))

        if (modifySrc) srcArrStr = res
        return res
    }

    static isSubArray(checkArr, mainArr, strictEqual = false) {
        return (strictEqual ? checkArr.length == mainArr.length : checkArr.length <= mainArr.length) && checkArr.every(val => mainArr.includes(val))
    }

}