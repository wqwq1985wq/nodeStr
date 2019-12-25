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
        facade.subscribe("UNION_OPEN_COPY_RESULT", this.onUpdateData, this);
        this.onUpdateData();
    },
    onUpdateData() {
        for (var t = [], e = localcache.getList(localdb.table_unionBoss), o = 0; o < e.length; o++) e[o].level <= n.unionProxy.clubInfo.level && t.push(e[o]);
        this.list.data = t;
    },
    eventClose() {
        l.utils.closeView(this);
    },
});
