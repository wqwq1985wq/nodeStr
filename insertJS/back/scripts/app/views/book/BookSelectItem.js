var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblExp: cc.Label,
        urlLoad: n,
        btnSelect: cc.Button,
        sp1: n,
        sp2: n,
        nodeEffect: cc.Node,
    },
    ctor() {},
    onLoad() {
        this.addBtnEvent(this.btnSelect);
    },
    showData() {
        var t = this._data;
        if (t) {
            var e = localcache.getItem(localdb.table_hero, t.id);
            this.lblName.string = e.name;
            this.lblExp.string = t.zzexp + "";
            this.urlLoad.url = l.uiHelps.getServantHead(t.id);
            this.sp1.url = l.uiHelps.getLangSp(e.spec[0]);
            this.sp2.node.active = e.spec.length > 1;
            this.sp2.node.active && (this.sp2.url = l.uiHelps.getLangSp(e.spec[1]));
            var o = r.timeUtil.getCurData();
            this.nodeEffect.active = o > 4 || 5 == e.spec[0] || 6 == e.spec[0] || o == e.spec[0] || o == e.spec[1];
        }
    },
});
