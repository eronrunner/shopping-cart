export function sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

export function isEqual(first, second) {
    let rs = true
    for (const attr in first) {
        if (second[attr] !== first[attr]) {
            return false
        }
    }
    return rs
}

export function containsObject(obj, list) {
    for (let i = 0; i < list.length; i++) {
        if (isEqual(list[i], obj)) {
            return true;
        }
    }

    return false;
}

export function generateID() {
    return 'id' + Math.random().toString(16).slice(2);
}