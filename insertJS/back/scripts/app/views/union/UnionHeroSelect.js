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
        facade.subscribe("UNION_FT_LIST_UPDATE", this.onFtList, this);
        this.onFtList();
    },
    onFtList() {
        var t = n.servantProxy.getServantList();
        t.sort(n.servantProxy.sortServantEp);
        this.list.data = t;
    },
    onClickClose() {
        l.utils.closeView(this);
    },
});
