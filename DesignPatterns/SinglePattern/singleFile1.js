var CreateDiv = function (param) {
    this.param = param;
    this.init();
};

CreateDiv.prototype.init = function () {
    //do init
};
let getInstance = (function () {
    var instance;
    return function (param) {
        if (!instance) {
            instance = new CreateDiv(param);
        }
        return instance;
    }
})();

exports.getInstance = getInstance