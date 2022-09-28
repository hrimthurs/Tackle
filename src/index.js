class TkArray {

    static get(src, uniqValues = false) {
        let array = Array.isArray(src) ? [...src] : src != null ? [src] : []
        return uniqValues ? [...new Set(array)] : array
    }

}

module.exports = { TkArray }