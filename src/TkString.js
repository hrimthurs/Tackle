/**
 * Converts a numeric value to a string of the specified length with adding '0' (at the beginning for integer, ending for float).
 * If the length of the original number is greater than lenTotal - no change occurs
 * @param {any} srcNum                      Source number
 * @param {number} lenTotal                 Expected length result
 * @param {number} [precision]              Number of decimal points of the result (default: 0 → not change original value)
 * @returns {string}                        String with formatted number
 */
export function formatNumber(srcNum, lenTotal, precision = 0) {
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
 * Returns the hash of the string with a length of 16 characters
 * @param {string} srcStr                   Source string
 * @param {number} [seed]                   Hashing is relative to this value (default: 0)
 * @returns {string}                        String of hex values with a length of 16 characters
 */
export function getHash(srcStr, seed = 0) {
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

    let hash = (h2>>>0).toString(16) + (h1>>>0).toString(16)
    return '0'.repeat(16 - hash.length) + hash
}

export default { formatNumber, getHash }