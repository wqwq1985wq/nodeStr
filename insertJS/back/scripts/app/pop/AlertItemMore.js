var i = require("../utils/Utils");
var n = require("../component/List");
cc.Class({
    extends: cc.Component,
    properties: {
        list: null,
    },
    ctor() {},
    onLoad() {
        facade.subscribe("CLOST_ITEM_SHOW", this.onClickClost, this);
        var t = this.node.openParam;
        null != t && (this.list.data = t);
    },
    onClickClost() {
        i.utils.closeView(this);
        i.utils.popNext(!1);
    },
});
