var i = require("../../component/List");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
    },
    ctor() {},
    onLoad() {
        this.list.data = localcache.getList(localdb.table_shenji);
    },
});
