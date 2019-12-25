var i = require("../../utils/Utils");
var n = require("../../component/ChildSpine");
cc.Class({
    extends: cc.Component,
    properties: {
        childSpine: n,
        nameText: cc.Label,
        mother: cc.Label,
        total: cc.Label,
        wuli: cc.Label,
        zhili: cc.Label,
        zz: cc.Label,
        meili: cc.Label,
        lblSf: cc.Label,
    },
    ctor() {},
    onLoad() {
        var t = this.node.openParam;
        if (t) {
            this.nameText.string = t.name;
            this.wuli.string = "" + t.ep.e1;
            this.zhili.string = "" + t.ep.e2;
            this.zz.string = "" + t.ep.e3;
            this.meili.string = "" + t.ep.e4;
            var e = t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4;
            this.total.string = "" + e;
            this.childSpine.setKid(t.id, t.sex);
            var o = localcache.getItem(localdb.table_adult, t.honor);
            this.lblSf.string = o.name;
        }
    },
    onClickClose() {
        i.utils.closeView(this);
    },
});
