var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
        bgNode: cc.Node,
    },
    ctor() {
        this.dlist = [];
    },
    onLoad() {
        this.dlist = [];
        if (n.unionProxy.changePosParam) {
            var t = n.unionProxy.getUnionData(n.unionProxy.clubInfo.level),
            e = [0, 1, t.leader, t.elite];
            1 == n.unionProxy.memberInfo.post && this.dlist.push(this.getPosData(2, e));
            this.dlist.push(this.getPosData(3, e));
            this.dlist.push(this.getPosData(4, e));
            this.dlist.push({
                name: i18n.t("UNION_KICT_MEMBER"),
                active: 1,
                pos: 0,
                index: 5
            });
        }
        this.list.data = this.dlist;
        this.bgNode.height = this.list.node.height + 100;
    },
    getPosData(t, e) {
        var o = n.unionProxy.getPostNum(t),
        i = e.length > t ? e[t] : 0,
        l = {};
        l.name = i18n.t("UNION_POSITION_" + t) + (0 != i ? "(" + o + "/" + i + ")": "");
        l.active = 4 == t || o < i ? 1 : 0;
        l.pos = o;
        l.index = t;
        return l;
    },
    eventClose() {
        l.utils.closeView(this);
    },
    onClickChange(t, e) {
        var o = e.data;
        o && n.unionProxy.sendChangePos(n.unionProxy.changePosParam.id, o.index);
        this.eventClose();
    },
});
