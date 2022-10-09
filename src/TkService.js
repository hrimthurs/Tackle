const FACTOR_KB = 1 / 1024
const FACTOR_MB = 1 / 1048576

module.exports = class TkService {

    /**
     * Converts the number of bytes to kilobytes
     * @param {number} numBytes                 - number of bytes
     * @param {number} [precision]              - defines the number of decimal points of the result
     * @return {number}
     */
    static bytesToKb(numBytes, precision = 2) {
        return Number((numBytes * FACTOR_KB).toFixed(precision))
    }

    /**
     * Converts the number of bytes to megabytes
     * @param {number} numBytes                 - number of bytes
     * @param {number} [precision]              - defines the number of decimal points of the result
     * @return {number}
     */
    static bytesToMb(numBytes, precision = 2) {
        return Number((numBytes * FACTOR_MB).toFixed(precision))
    }

    /**
     * Parse parameters URL to object
     *
     * - Convert parameter without value → param_name: true
     * - Convert value: val1 → param_name: val1
     * - Convert value: val1:val2 → param_name: { val1: val2 }
     * - Convert value: val1,val2,val3 → param_name: [val1, val2, val3]
     * - Convert value: val1:val2,val3:val4 → param_name: { val1: val2, val3: val4 }
     *
     * @param {string} [srcUrl]                 - source string URL (if not set in case client side → used self.location.href)
     * @param {object} [options]                - options
     * @param {boolean} [options.keysLowerCase] - convert all parameters names to lower case (default: false)
     * @param {boolean} [options.valsLowerCase] - convert all strings values to lower case (default: false)
     */
    static getParamsURL(srcUrl = null, options = {}) {
        let useOptions = {
            keysLowerCase: false,
            valsLowerCase: false,
            ...options
        }

        let res = {}

        if (!srcUrl) {
            try { srcUrl = self.location.href }
            catch { return res }
        }

        let url = new URL(decodeURIComponent(srcUrl))

        for (const srcKey of url.searchParams.keys()) {
            let srcVal = url.searchParams.get(srcKey)

            let arrVal = (useOptions.valsLowerCase ? srcVal.toLowerCase() : srcVal)
                .split(',')
                .map(val => val === '' || this.#tryStrToObj(val))

            let objVal = arrVal.reduce((obj, val) => {
                if (typeof val === 'string') {
                    let [subKey, subVal] = val.split(':')
                    if (subVal !== undefined) obj[subKey] = this.#tryStrToObj(subVal)
                }

                return obj
            }, {})

            let resVal = Object.keys(objVal).length != arrVal.length
                ? arrVal.length > 1 ? arrVal : arrVal[0]
                : objVal

            res[useOptions.keysLowerCase ? srcKey.toLowerCase() : srcKey] = resVal
        }

        return res
    }

    static #tryStrToObj(srcStr) {
        try { return JSON.parse(srcStr) }
        catch { return srcStr }
    }

}
