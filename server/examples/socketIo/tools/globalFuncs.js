function getRandom(n1, n2) {
    var s = Math.random()
    return Math.ceil(n1 + s * (n2 - n1))
}
function getClientTime() {
    return Date.now();
}
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
function jsonStringfy(obj) {
    // Note: cache should not be re-used by repeated calls to JSON.stringify.
    var cache = [];
    var str = JSON.stringify(obj, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // Enable garbage collection
    return str
}
global.gf_objToStrMap = objToStrMap
module.exports = {
    getRandom, getClientTime, objToStrMap,
    jsonStringfy
}