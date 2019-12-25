var i = require("../../utils/Utils");
var n = require("../../component/List");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        list: n,
        lblTitle: cc.Label,
    },
    ctor() {},
    onLoad() {
        facade.subscribe("LIMIT_ACTIVITY_UPDATE", this.onDataUpdate, this);
        var t = this.node.openParam;
        t && l.limitActivityProxy.sendLookActivityData(t.id);
    },
    onDataUpdate(t) {
        l.limitActivityProxy.curSelectData = t;
        this.lblTitle.string = t.cfg.info.title;
        t.cfg.rwd.sort(this.sortList);
        for (var e = 0,
        o = 0; o < t.cfg.rwd.length; o++) e < t.cfg.rwd[o].items.length && (e = t.cfg.rwd[o].items.length);
        var i = Math.ceil(e / 5),
        n = 150 + 100 * i + 10 * (i - 1);
        this.list.setWidthHeight(630, n);
        this.list.data = t.cfg.rwd;
    },
    sortList(t, e) {
        var o = t.id > l.limitActivityProxy.curSelectData.rwd ? -1 : 1,
        i = e.id > l.limitActivityProxy.curSelectData.rwd ? -1 : 1;
        return o != i ? o - i: t.id - e.id;
    },
    onClickClose() {
        i.utils.closeView(this);
        i.utils.openPrefabView("limitactivity/LimitActivityView");
    },
});
