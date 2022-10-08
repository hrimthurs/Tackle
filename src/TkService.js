const FACTOR_KB = 1 / 1024
const FACTOR_MB = 1 / 1048576

module.exports = class TkService {

    /**
     * Converts the number of bytes to kilobytes
     * @param {number} numBytes         - number of bytes
     * @param {number} [precision]      - defines the number of decimal points of the result
     * @return {number}
     */
    static bytesToKb(numBytes, precision = 2) {
        return Number((numBytes * FACTOR_KB).toFixed(precision))
    }

    /**
     * Converts the number of bytes to megabytes
     * @param {number} numBytes         - number of bytes
     * @param {number} [precision]      - defines the number of decimal points of the result
     * @return {number}
     */
    static bytesToMb(numBytes, precision = 2) {
        return Number((numBytes * FACTOR_MB).toFixed(precision))
    }

}
