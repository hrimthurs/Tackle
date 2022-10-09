module.exports = class TkString {

    /**
     * Converts a numeric value to a string of the specified length with adding '0' (at the beginning for integer, ending for float).
     * If the length of the original number is greater than lenTotal - no change occurs
     * @param {any} srcNum                      - source number
     * @param {number} lenTotal                 - expected length result
     * @param {number} [precision]              - number of decimal points of the result (0 → not change original value)
     * @return {string}
     */
    static formatNumber(srcNum, lenTotal, precision = 0) {
        const absNum = Math.abs(srcNum)
        const strSign = srcNum < 0 ? '-' : ''
        const strAbsNum = precision ? absNum.toFixed(precision) : absNum.toString()

        let addZero = lenTotal - strAbsNum.length - strSign.length

        let strNum = addZero <= 0
            ? strAbsNum
            : Number.isInteger(srcNum) && !precision
                ? '0'.repeat(addZero) + strAbsNum
                : strAbsNum + '0'.repeat(addZero)

        return strSign + strNum
    }

    /**
     * Converts the value to string
     * @param {any} srcVal                      - source value
     * @param {object} [options]                - options
     * @param {boolean} [options.json]          - save or remove json markup (default: true)
     * @param {number} [options.floatPrecision] - number of decimal points of the float values (default: 0 → not change original value)
     * @return {string}
     */
    static stringify(srcVal, options = {}) {
        let useOptions = {
            json: true,
            floatPrecision: 0,
            ...options
        }

        const numFixed = v => useOptions.floatPrecision && (typeof v === 'number')
            ? Number(v.toFixed(useOptions.floatPrecision))
            : v

        let res = typeof srcVal === 'object'
            ? JSON.stringify(srcVal, (k, v) => numFixed(v))
            : numFixed(srcVal).toString()

        if (!useOptions.json) {
            res = res
                .replace(/(\{|,)"(\w+)"\:/g, '$1 $2: ')
                .replace(/(\}+)/g, ' $1')
                .replace(/,\{/g, ', {')
                .replace(/\{\s+\}/g, '{}')
        }

        return res
    }

    /**
     * Returns hash of the string
     * @param {string} srcStr                   - source string
     * @param {number} [seed]                   - hashing is relative to this value
     * @return {string}
     */
    static getHash(srcStr, seed = 0) {
        const factor = {
            h1: { f1: 0xdeadbeef, f2: 2654435761, f3: 2246822507 },
            h2: { f1: 0x41c6ce57, f2: 1597334677, f3: 3266489909 }
        }

        let h1 = factor.h1.f1^seed, h2 = factor.h2.f1^seed

        for (let i = 0; i < srcStr.length; i++) {
            let code = srcStr.charCodeAt(i)
            h1 = Math.imul(h1^code, factor.h1.f2)
            h2 = Math.imul(h2^code, factor.h2.f2)
        }

        h1 = Math.imul(h1^(h1>>>16), factor.h1.f3)^Math.imul(h2^(h2>>>13), factor.h2.f3)
        h2 = Math.imul(h2^(h2>>>16), factor.h1.f3)^Math.imul(h1^(h1>>>13), factor.h2.f3)

        return (h2>>>0).toString(16) + (h1>>>0).toString(16)
    }

}