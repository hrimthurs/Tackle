export class TkArray {

    static get(obj, uniqValues = false) {
        let array = Array.isArray(obj) ? [...obj] : obj != null ? [obj] : []
        return uniqValues ? [...new Set(array)] : array
    }

}

export default { TkArray }