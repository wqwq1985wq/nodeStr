var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        continuityList: i,
    },
    ctor() {},
    onLoad() {
        this.data = this.node.openParam;
        this.data && (this.continuityList.data = this.data.items);
    },
    onClickClose() {
        n.utils.closeView(this);
    },
    onClickRecharge() {
        l.funUtils.openView(l.funUtils.recharge.id);
    },
});
