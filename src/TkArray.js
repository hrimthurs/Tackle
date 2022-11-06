export default class TkArray {

    /**
     * Returns array regardless of type srcVal
     * @param {any} srcVal              - source value
     * @param {boolean} [uniqValues]    - true → returns array of unique values
     * @return {any[]}
     */
    static getArray(srcVal, uniqValues = false) {
        let array = Array.isArray(srcVal)
            ? [...srcVal]
            : srcVal != null ? [srcVal] : []

        return uniqValues ? this.getUniqValues(array) : array
    }

    /**
     * Returns array of unique values
     * @param {any[]} srcArr            - source array
     * @param {boolean} [modifySrc]     - true → modifies the original array
     * @return {any[]}
     */
    static getUniqValues(srcArr, modifySrc = false) {
        let res = [...new Set(srcArr)]

        if (modifySrc) srcArr = res
        return res
    }

    /**
     * Returns array without elements with values from skipValues
     * @param {any[]} srcArr            - source array
     * @param {any|any[]} skipValues    - values for exclude
     * @param {boolean} [modifySrc]     - true → modifies the original array
     * @return {any[]}
     */
    static excludeValues(srcArr, skipValues, modifySrc = false) {
        let arrSkipValues = this.getArray(skipValues)
        let res = srcArr.filter(val => !arrSkipValues.includes(val))

        if (modifySrc) srcArr = res
        return res
    }

    /**
     * Returns array with sorted strings
     * @param {string[]} srcArrStr      - source array strings
     * @param {boolean} [modifySrc]     - true → modifies the original array
     * @return {string[]}
     */
    static sortArrayStr(srcArrStr, modifySrc = false) {
        let res = srcArrStr.sort((a, b) => a.localeCompare(b))

        if (modifySrc) srcArrStr = res
        return res
    }

    /**
     * Checks is all elements of array subArr are present in array mainArr
     * @param {any[]} subArr            - sub array
     * @param {any[]} mainArr           - main array
     * @param {boolean} [strictEqual]   - true → arrays must be equivalent
     * @return {boolean}
     */
    static isSubArray(subArr, mainArr, strictEqual = false) {
        let suitableSize = strictEqual
            ? subArr.length == mainArr.length
            : subArr.length <= mainArr.length

        return suitableSize && subArr.every(val => mainArr.includes(val))
    }

}