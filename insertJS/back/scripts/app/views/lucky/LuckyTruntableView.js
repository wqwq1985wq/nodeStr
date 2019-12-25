var i = require("../../utils/Utils");
var n = require("../truntable/TrunTableItem");
cc.Class({
    extends: cc.Component,
    properties: {
        itemArr: [n],
        lblTime: cc.Label,
        lblHqCount: cc.Label,
    },
    ctor() {},
    onLoad() {},
    onClickClose() {
        i.utils.closeView(this);
    },
});
