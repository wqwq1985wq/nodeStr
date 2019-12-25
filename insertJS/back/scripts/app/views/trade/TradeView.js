var i = require("../../utils/Utils");
var n = require("../../component/List");
cc.Class({
    extends: cc.Component,
    properties: {
        lblSilver: cc.Label,
        lblZZ: cc.Label,
        lblName: cc.Label,
        list: n,
        oneKeyTip: cc.Node,
        nodeBtnOne: cc.Node,
        nodeConfirm: cc.Node,
    },
    ctor() {},
    onLoad() {},
    onClickClost() {
        i.utils.closeView(this);
    },
});
