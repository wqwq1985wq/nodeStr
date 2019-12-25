var i = require("../../utils/Utils");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        nodeArr: [cc.Node],
        roleUrl: n,
        content1: cc.Label,
        content2: cc.Label,
        kuang: cc.Node,
    },
    ctor() {},
    onLoad() {
        var t = this.node.openParam;
        if (t) {
            var e = localcache.getItem(localdb.table_wife, t.wifeid),
            o = t.type,
            n = [];
            if (100 * Math.random() <= 50) o = e.type;
            else {
                for (var a = 1; a < 5; a++) a != e.type && n.push(a + "");
                o = parseInt(n[Math.floor(Math.random() * n.length)]);
            }
            Math.random();
            var s = "WIFE_WEN_HOU_TYPE_" + o + "_" + (0 == t.isgad ? 1 : 2);
            0 != t.isgad && i.alertUtil.alert18n("WIFE_IS_GAD");
            var c = i18n.t(s).split("|");
            this.content1.string = c[0];
            this.content2.string = c.length > 1 ? c[1] : "";
            for (a = 0; a < this.nodeArr.length; a++) this.nodeArr[a].active = a == o - 1;
            this.roleUrl.url = l.uiHelps.getWifeBody(e.res);
            r.timeProxy.floatReward();
            i.alertUtil.alert(i18n.t("WIFE_WEN_HOU_QIN_MI", {
                name: e.wname2
            }));
            this.kuang.height = c[0].length > 11 ? 950 : 450;
        }
    },
    onClickClose() {
        i.utils.closeView(this);
    },
});
