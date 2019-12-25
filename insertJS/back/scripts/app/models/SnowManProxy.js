var i = require("../Initializer");
var n = require("../component/RedDot");
var SnowManProxy = function() {

    this.data = null;
    this.records = null;
    this.SNOWMAN_DATA_UPDATE = "SNOWMAN_DATA_UPDATE";
    this.SNOWMAN_RECORDS_UPDATE = "SNOWMAN_RECORDS_UPDATE";

    this.ctor = function() {
        JsonHttp.subscribe(
            proto_sc.dxrhuodong.snowman,
            this.onDataUpdate,
            this
        );
        JsonHttp.subscribe(
            proto_sc.dxrhuodong.records,
            this.onRecords,
            this
        );
    };
    this.clearData = function() {
        this.data = null;
        this.records = null;
    };
    this.onDataUpdate = function(t) {
        this.data = t;
        n.change("snowman", this.hasRed());
        facade.send(this.SNOWMAN_DATA_UPDATE);
    };
    this.onRecords = function(t) {
        this.records = t;
        facade.send(this.SNOWMAN_RECORDS_UPDATE);
    };
    this.sendOpenSnowMan = function() {
        JsonHttp.send(new proto_cs.huodong.hd6183Info());
    };
    this.sendSnowManOnce = function() {
        JsonHttp.send(new proto_cs.huodong.hd6183Paly(), function() {
            i.timeProxy.floatReward();
        });
    };
    this.sendSnowManTen = function() {
        JsonHttp.send(new proto_cs.huodong.hd6183PalyTen(), function() {
            i.timeProxy.floatReward();
        });
    };
    this.sendGetReward = function(t) {
        var e = new proto_cs.huodong.hd6183Rwd();
        e.lv = t;
        JsonHttp.send(e, function() {
            i.timeProxy.floatReward();
        });
    };
    this.hasRed = function() {
        for (var t = !1, e = 0; e < this.data.rwd.length; e++)
            if (
                this.data.bossinfo.lv >= this.data.rwd[e].lv &&
                0 == this.data.rwd[e].get
            ) {
                t = !0;
                break;
            }
        return t;
    };
}
exports.SnowManProxy = SnowManProxy;
