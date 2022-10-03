module.exports = class TkFunction {

    static decoMemoize(srcFunc, context = globalThis) {
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

}