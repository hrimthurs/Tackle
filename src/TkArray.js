import { randomLCG } from './TkService.js'

/**
 * Returns array regardless of type srcVal
 * @param {any} srcVal                      Source value
 * @param {boolean} [uniqValues]            Returns array of unique values (default: false)
 * @returns {any[]}
 */
export function getArray(srcVal, uniqValues = false) {
    let array = Array.isArray(srcVal)
        ? [...srcVal]
        : srcVal != null ? [srcVal] : []

    return uniqValues ? getUniqValues(array) : array
}

/**
 * Returns array of unique values
 * @param {any[]} srcArr                    Source array
 * @param {boolean} [modifySrc]             Modify the original array (default: false)
 * @returns {any[]}                         Array with unique values
 */
export function getUniqValues(srcArr, modifySrc = false) {
    let res = [...new Set(srcArr)]

    if (modifySrc) srcArr = res
    return res
}

/**
 * Swap array values
 * @param {any[]} srcArr                    Source array
 * @param {...[number, number]} indsCouples Couples of indices for values swap
 * @returns {any[]}
 */
export function swapValues(srcArr, ...indsCouples) {
    indsCouples.forEach(([indA, indB]) => {
        srcArr[indA] = srcArr.splice(indB, 1, srcArr[indA])[0]
    })

    return srcArr
}

/**
 * Returns array without elements with values from skipValues
 * @param {any[]} srcArr                    Source array
 * @param {any|any[]} skipValues            Values for exclude
 * @param {boolean} [modifySrc]             Modify the original array (default: false)
 * @returns {any[]}
 */
export function excludeValues(srcArr, skipValues, modifySrc = false) {
    let arrSkipValues = getArray(skipValues)
    let res = srcArr.filter(val => !arrSkipValues.includes(val))

    if (modifySrc) srcArr = res
    return res
}

/**
 * Returns array with sorted strings
 * @param {string[]} srcArrStr              Source array strings
 * @param {boolean} [modifySrc]             Modify the original array (default: false)
 * @returns {string[]}                      Array with sorted strings
 */
export function sortArrayStr(srcArrStr, modifySrc = false) {
    let res = srcArrStr.sort((a, b) => a.localeCompare(b))

    if (modifySrc) srcArrStr = res
    return res
}

/**
 * Shuffle of an array in-place
 * @param {any[]} srcArr                    Source array
 * @param {number} [seed]                   Seed of random generator (default: random)
 * @returns {any[]}
 */
export function shuffleRandom(srcArr, seed = Math.random()) {
    const generatorLCG = randomLCG(seed)

    for (let indA = srcArr.length - 1; indA > 0; indA--) {
        const indB = generatorLCG({ max: indA + 1 });
        [srcArr[indA], srcArr[indB]] = [srcArr[indB], srcArr[indA]]
    }

    return srcArr
}

/**
 * Checks is all elements of array subArr are present in array mainArr
 * @param {any[]} subArr                    Sub array
 * @param {any[]} mainArr                   Main array
 * @param {boolean} [strictEqual]           Arrays must be equivalent (default: false)
 * @returns {boolean}
 */
export function isSubArray(subArr, mainArr, strictEqual = false) {
    let suitableSize = strictEqual
        ? subArr.length == mainArr.length
        : subArr.length <= mainArr.length

    return suitableSize && subArr.every(val => mainArr.includes(val))
}

/**
 * Returns the value of the previous element of a circular array
 * @param {any[]} srcArr                    Source array
 * @param {number} index                    Element index
 * @returns {any}
 */
export function prevValueCycle(srcArr, index) {
    return srcArr[index > 0 ? index - 1 : srcArr.length - 1]
}

/**
  * Returns the value of the next element of a circular array
 * @param {any[]} srcArr                    Source array
 * @param {number} index                    Element index
 * @returns {any}
 */
export function nextValueCycle(srcArr, index) {
    return srcArr[index < srcArr.length - 1 ? index + 1 : 0]
}

export default { getArray, getUniqValues, swapValues, excludeValues, sortArrayStr, shuffleRandom, isSubArray, prevValueCycle, nextValueCycle }