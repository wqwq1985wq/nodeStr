var i = require("../../component/List");
var n = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
    },
    ctor() {},
    onLoad() {
        var t = this.node.openParam;
        this.list.data = t;
    },
    onClickClost() {
        n.utils.closeView(this);
    },
});
