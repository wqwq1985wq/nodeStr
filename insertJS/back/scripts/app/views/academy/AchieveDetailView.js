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
        this.list.data = n.achievementProxy.getDetail();
    },
    onClickClose() {
        l.utils.closeView(this);
    },
});
