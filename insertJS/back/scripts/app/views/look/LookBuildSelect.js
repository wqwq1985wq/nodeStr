var i = require("../../component/List");
var n = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
    },
    ctor() {},
    onLoad() {},
    onClickClost() {
        n.utils.closeView(this);
    },
});
