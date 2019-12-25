var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../Initializer");
var r = require("../../utils/UIUtils");
var a = require("../../models/TimeProxy");
var s = require("../../component/List");
cc.Class({
    extends: i,
    properties: {
        lblDes: cc.Label,
        lblTarget: cc.Label,
        nodeGo: cc.Node,
        nodeGet: cc.Node,
        nodeFin: cc.Node,
        urlload: n,
        rwdGroup: s,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            var e = l.achievementProxy.getDailyTask(t.id),
            o = e ? e.num: 0;
            this.lblDes.string = t.title;
            this.lblTarget.string = i18n.t("ACHIEVE_TARGET", {
                c: 1 == e.rwd || o > t.num ? t.num: o,
                m: t.num
            });
            this.rwdGroup.data = t.rwd;
            this.nodeGo.active = o < t.num && 1 != e.rwd;
            this.nodeGet.active = o >= t.num && 1 != e.rwd;
            this.nodeFin.active = 1 == e.rwd;
            this.urlload.url = r.uiHelps.getTaskIcon(t.id);
        }
    },
    onClickGo() {
        var t = this._data;
        t && a.funUtils.openView(t.jumpTo);
    },
    onClickGet() {
        var t = this._data;
        t && l.achievementProxy.sendDailyTask(t.id);
    },
});
