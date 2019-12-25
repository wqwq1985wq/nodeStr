var i = require("../../models/TimeProxy");
var n = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        lblName: cc.Label,
        lblDes: cc.Label,
    },
    ctor() {},
    onLoad() {
        var t = i.funUtils.getWillOpen(),
        e = localcache.getItem(localdb.table_iconOpen, t.id);
        this.lblName.string = e.title;
        this.lblDes.string = e.errmsg;
    },
    onClickClost() {
        n.utils.closeView(this);
    },
});
