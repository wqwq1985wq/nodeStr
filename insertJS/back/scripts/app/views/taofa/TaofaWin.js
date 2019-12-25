var i = require("../../utils/Utils");
var n = require("../../component/List");
cc.Class({
    extends: cc.Component,
    properties: {
        lblWin: cc.Label,
        list: n,
        lbl: cc.Label,
    },
    ctor() {},
    onLoad() {},
    onClickClost() {
        i.utils.closeView(this);
    },
});
