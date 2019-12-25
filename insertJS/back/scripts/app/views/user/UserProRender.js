var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        lblEp1: cc.Label,
        lblEp2: cc.Label,
        lblEp3: cc.Label,
        lblEp4: cc.Label,
        lblTitle: cc.Label,
        bg: n,
    },
    ctor() {},
    showData() {
        var t = this._data,
        e = this._data.aep,
        o = e.e1 + e.e2 + e.e3 + e.e4;
        this.lblTitle.string = i18n.t("USER_PROP_DETAIL_" + t.type, {
            num: o || 0
        });
        this.lblEp1.string = (e.e1 ? e.e1: 0) + this.getPer(t.type, 1);
        this.lblEp2.string = (e.e2 ? e.e2: 0) + this.getPer(t.type, 2);
        this.lblEp3.string = (e.e3 ? e.e3: 0) + this.getPer(t.type, 3);
        this.lblEp4.string = (e.e4 ? e.e4: 0) + this.getPer(t.type, 4);
        this.bg.url = l.uiHelps.getDeatilBg(t.type);
        1 == t.type ? (this.lblTitle.node.color = cc.color(202, 101, 105)) : 2 == t.type ? (this.lblTitle.node.color = cc.color(101, 158, 202)) : 3 == t.type && (this.lblTitle.node.color = cc.color(217, 131, 30));
    },
    getPer(t, e) {
        var o = null;
        r.playerProxy.percentage && (1 == t && r.playerProxy.percentage.hero ? (o = r.playerProxy.percentage.hero["e" + e]) : 2 == t && r.playerProxy.percentage.son ? (o = r.playerProxy.percentage.son["e" + e]) : 3 == t && r.playerProxy.percentage.clothe && (o = r.playerProxy.percentage.clothe["e" + e]));
        return o ? i18n.t("USER_DETAIL_PRO_PER", {
            num: 100 * o
        }) : "";
    },
});
