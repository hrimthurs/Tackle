const FACTOR_KB = 1 / 1024
const FACTOR_MB = 1 / 1048576

module.exports = class TkService {

    static bytesToKb(numBytes, precision = 2) {
        return Number((numBytes * FACTOR_KB).toFixed(precision))
    }

    static bytesToMb(numBytes, precision = 2) {
        return Number((numBytes * FACTOR_MB).toFixed(precision))
    }
    
}
