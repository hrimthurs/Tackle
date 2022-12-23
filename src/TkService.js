import { getHash as getHashString } from './TkString.js'

/**
 * Converts the number of bytes to kilobytes
 * @param {number} numBytes                 - number of bytes
 * @param {number} [precision]              - defines the number of decimal points of the result
 * @return {number}
 */
export function bytesToKb(numBytes, precision = 2) {
    return trimFloat(numBytes / 1024, precision)
}

/**
 * Converts the number of bytes to megabytes
 * @param {number} numBytes                 - number of bytes
 * @param {number} [precision]              - defines the number of decimal points of the result
 * @return {number}
 */
export function bytesToMb(numBytes, precision = 2) {
    return trimFloat(numBytes / 1048576, precision)
}

/**
 * Trimming float numbers with a given precision
 * @param {any} srcVal                      - value with containing float numbers
 * @param {number} precision                - defines the number of decimal points of the result float numbers
 * @param {boolean} [stringify]             - return the result as converted to string
 * @return {any|string}
 */
export function trimFloat(srcVal, precision, stringify = false) {
    let res = _valToStr(srcVal, { 'number': v => Number(v.toFixed(precision)) })
    return stringify ? res : JSON.parse(res)
}

/**
 * Get parameters from URL to object
 *
 * Converts:
 * - param_name without value → param_name: true
 * - param_name=val1 → param_name: val1
 * - param_name=val1:val2 → param_name: {val1: val2}
 * - param_name=val1,val2,val3 → param_name: [val1, val2, val3]
 * - param_name=val1:val2,val3:val4 → param_name: {val1: val2, val3: val4}
 * - value/subvalue json-string → param_name: <json-parse>
 *
 * @param {string|URL} [srcUrl]             - source URL (if not set in case client side → used self.location.href)
 * @param {object} [options]                - options
 * @param {boolean} [options.keysLowerCase] - convert all parameters names to lower case (default: false)
 * @param {boolean} [options.valsLowerCase] - convert all strings values to lower case (default: false)
 * @return {object}
 */
export function getParamsURL(srcUrl = null, options = {}) {
    const useOptions = {
        keysLowerCase: false,
        valsLowerCase: false,
        ...options
    }

    let res = {}

    let url = srcUrl instanceof URL ? srcUrl : _tryMakeURL(srcUrl)
    if (url) {
        for (const srcKey of url.searchParams.keys()) {
            let srcVal = url.searchParams.get(srcKey).replace(/^["'](.*)["']$/, '$1')

            let arrVal = _paramURLtoArray(useOptions.valsLowerCase ? srcVal.toLowerCase() : srcVal)
            let objVal = arrVal.reduce((obj, val) => {
                if (typeof val === 'string') {
                    let valSplitted = val.split(':')

                    let [subKey, ...vals] = valSplitted
                    let subVal = vals.length > 1 ? vals.join(':') : vals[0]
                    if (subVal !== undefined) obj[subKey] = _tryStrToObj(subVal)
                }

                return obj
            }, {})

            let resVal = Object.keys(objVal).length != arrVal.length
                ? arrVal.length > 1 ? arrVal : arrVal[0]
                : objVal

            res[useOptions.keysLowerCase ? srcKey.toLowerCase() : srcKey] = resVal
        }
    }

    return res
}

/**
 * Set parameters from object to URL
 *
 * Converts:
 * - param_name: val1 → param_name=val1
 * - param_name: {val1: val2} → param_name=val1:val2
 * - param_name: [val1, val2, val3] → param_name=val1,val2,val3
 * - param_name: {val1: val2, val3: val4} → param_name=val1:val2,val3:val4
 * - subvalue object of array/object → <json-string>
 *
 * @param {string|URL} url                  - source string URL or exist URL-object
 * @param {object} [params]                 - source object to set as parameters URL (default: {})
 * @param {boolean} [encode]                - use encode URI for result (default: false)
 * @return {URL}
 */
export function setParamsURL(url, params = {}, encode = false) {
    let res = typeof url === 'string' ? _tryMakeURL(url) : url
    if (res) {

        for (const key in params) {
            let value = params[key]

            if (typeof value === 'object') {
                let obj = Array.isArray(value)
                    ? value.map(val => _valToStr(val, { 'string': v => v }))
                    : Object.entries(value).map(rec => `${rec[0]}:${_valToStr(rec[1], { 'string': v => v })}`)

                value = obj.join(',')
            }

            res.searchParams.set(key, encode ? encodeURIComponent(value) : value)
        }
    }

    return res
}

/**
 * Generates a unique ID in the format of a hash string of 16 characters length
 * @param {string} [initialStr]             - initial string for generate
 * @return {string} string of hex values with a length of 16 characters
 */
function generateHashUID(initialStr = '') {
    const numRandom = 10 + Math.trunc(Math.random() * 10)
    const strRandom = new Array(numRandom).fill(0).map(v => Math.random()).join()

    return getHashString(initialStr + Date.now() + strRandom, Math.random())
}

/**
 * Generates a universal unique ID in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * @return {string} string hex values
 */
function generateUUID() {
	const d0 = Math.random() * 0xffffffff | 0
	const d1 = Math.random() * 0xffffffff | 0
	const d2 = Math.random() * 0xffffffff | 0
	const d3 = Math.random() * 0xffffffff | 0

	const uuid =
        _strHex[d0 & 0xff] + _strHex[d0>>8 & 0xff] + _strHex[d0>>16 & 0xff] + _strHex[d0>>24 & 0xff] + '-' +
		_strHex[d1 & 0xff] + _strHex[d1>>8 & 0xff] + '-' +
        _strHex[d1>>16 & 0x0f | 0x40] + _strHex[d1>>24 & 0xff] + '-' +
		_strHex[d2 & 0x3f | 0x80] + _strHex[d2>>8 & 0xff] + '-' +
        _strHex[d2>>16 & 0xff] + _strHex[d2>>24 & 0xff] + _strHex[d3 & 0xff] + _strHex[d3>>8 & 0xff] + _strHex[d3>>16 & 0xff] + _strHex[d3>>24 & 0xff]

	return uuid.toLowerCase()
}

/////////////////////////////////////////////////   PRIVATE   /////////////////////////////////////////////////

const _strHex = new Array(256).fill(0).map((val, ind) => (ind < 16 ? '0' : '') + ind.toString(16))

function _paramURLtoArray(srcStr) {
    let res = []

    let saveItems = []
    let cntBracket = 0
    let cntQuotes = 0

    let splittedVal = srcStr.split(',')

    for (const item of splittedVal) {
        if ((cntBracket > 0) || (item[0] == '{')) {
            saveItems.push(item)

            let chars = item.split('')
            cntBracket = chars.reduce((cnt, ch) => ch == '{' ? ++cnt : ch == '}' ? --cnt : cnt, cntBracket)
            cntQuotes = chars.reduce((cnt, ch) => ['"', '\''].includes(ch) ? ++cnt : cnt, cntQuotes)

            if ((cntBracket == 0) && (item[item.length - 1] == '}')) {
                res.push(saveItems.join(','))
                saveItems = []
            }
        } else res.push(item)
    }

    return (cntBracket == 0) && (cntQuotes % 2 == 0)
        ? res.concat(saveItems).map(val => val === '' || _tryStrToObj(val))
        : [srcStr]
}

function _valToStr(srcVal, typeHandler = {}, useStringify = true) {
    let handler = typeHandler[typeof srcVal]
    return handler
        ? handler(srcVal)
        : useStringify
            ? JSON.stringify(srcVal, (key, val) => _valToStr(val, typeHandler, false))
            : srcVal
}

function _tryMakeURL(srcStr) {
    try { return new URL(decodeURIComponent(srcStr || self.location.href)) }
    catch {}
}

function _tryStrToObj(srcStr) {
    try { return JSON.parse(srcStr.replace(/^["'](.*)["']$/, '$1')) }
    catch { return srcStr }
}

export default { bytesToKb, bytesToMb, trimFloat, getParamsURL, setParamsURL, generateHashUID, generateUUID }