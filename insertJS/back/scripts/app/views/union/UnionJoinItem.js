var i = require("../../component/RenderListItem");
var n = require("../user/UserHeadItem");
var l = require("../../Initializer");
var r = require("../chenghao/ChengHaoItem");
var a = require("../../Config");
var s = require("../../models/TimeProxy");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblLv: cc.Label,
        lblShili: cc.Label,
        btn: cc.Button,
        btnNo: cc.Button,
        head: n,
        chengHao: r,
    },
    ctor() {},
    onLoad() {
        this.btn && this.btn.clickEvents && this.btn.clickEvents.length > 0 && (this.btn.clickEvents[0].customEventData = this);
        this.btnNo && this.btnNo.clickEvents && this.btnNo.clickEvents.length > 0 && (this.btnNo.clickEvents[0].customEventData = this);
    },
    showData() {
        var t = this.data;
        if (t) {
            if (a.Config.isShowChengHao && s.funUtils.isOpenFun(s.funUtils.chenghao)) {
                var e = localcache.getItem(localdb.table_fashion, t.chenghao);
                this.chengHao.data = e;
            }
            this.lblName.string = t.name;
            this.lblShili.string = t.shili + "";
        }
    },
    onClickHead() {
        var t = this.data;
        l.playerProxy.sendGetOther(t.id);
    },
});
