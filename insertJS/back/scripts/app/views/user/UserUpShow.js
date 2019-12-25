var i = require("../../utils/Utils");
var n = require("../../Initializer");
var l = require("../../component/List");
cc.Class({
    extends: cc.Component,
    properties: {
        list: l,
    },
    ctor() {},
    onLoad() {
        this.list.data = n.playerProxy.getAllOffice();
    },
    onClickClost() {
        i.utils.closeView(this);
    },
});
