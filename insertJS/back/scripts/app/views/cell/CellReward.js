var i = require("../../component/List");
var n = require("../../utils/UIUtils");
var l = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
        list2: i,
    },
    ctor() {},
    onLoad() {
        var t = this.node.openParam;
        if (t) {
            this.list.data = n.uiUtils.getRwdItem(t.rwd_end);
            this.list2.data = n.uiUtils.getRwdItem(t.rwd);
            this.list.node.x = -this.list.node.width / 2;
            this.list2.node.x = -this.list2.node.width / 2;
        }
    },
    onClickClost() {
        l.utils.closeView(this);
    },
});
