/**
 * Returns function decorator that implements memoization
 * @param {function} srcFunc                Source function
 * @param {object} [context]                Function execution context (default: globalThis)
 * @returns {function}                      Memoized decorator
 */
export function decoMemoize(srcFunc, context = globalThis) {
    let cache = new Map()

    return function () {
        let res
        let key = [].join.call(arguments)

        if (!cache.has(key)) {
            res = srcFunc.apply(context, arguments)
            cache.set(key, res)
        } else res = cache.get(key)

        return res
    }
}

export default { decoMemoize }