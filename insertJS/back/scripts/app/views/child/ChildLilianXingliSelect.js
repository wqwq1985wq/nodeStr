var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
    },
    ctor() {},
    onLoad() {
        for (var t = localcache.getList(localdb.table_practiceItem), e = [], o = 0; o < t.length; o++) 0 == t[o].itemid ? e.push(t[o]) : n.bagProxy.getItemCount(t[o].itemid) > 0 && e.push(t[o]);
        this.list.data = e;
    },
    onClickClose() {
        l.utils.closeView(this);
    },
});
