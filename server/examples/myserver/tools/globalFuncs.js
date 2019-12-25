function getRandom(n1, n2) {
    var s = Math.random()
    return Math.ceil(n1 + s * (n2 - n1))
}
function getClientTime() {
    return Date.now();
}
module.exports = {
    getRandom,getClientTime
}