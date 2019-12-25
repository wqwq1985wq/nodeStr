var i = require("../Initializer");
var ThirtyDaysProxy = function() {

    this.data = null;
    this.THIRTY_DAY_DATA_UPDATE = "THIRTY_DAY_DATA_UPDATE";
    this.THIRTY_DAY_SHOW_DATA = "THIRTY_DAY_SHOW_DATA";

    this.ctor = function() {
        JsonHttp.subscribe(
            proto_sc.thirtyCheck.hdQianDaoConfig,
            this.onDataUpdate,
            this
        );
    };
    this.onDataUpdate = function(t) {
        this.data = t;
        facade.send(this.THIRTY_DAY_DATA_UPDATE);
    };
    this.sendOpenActivity = function() {
        JsonHttp.send(new proto_cs.huodong.hd6500Info());
    };
    this.sendGet = function() {
        var t = this;
        JsonHttp.send(new proto_cs.huodong.hd6500Get(), function() {
            i.timeProxy.floatReward();
            facade.send(t.THIRTY_DAY_SHOW_DATA);
        });
    };
}
exports.ThirtyDaysProxy = ThirtyDaysProxy;
