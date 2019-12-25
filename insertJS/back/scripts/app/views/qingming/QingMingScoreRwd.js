var i = require("../../component/List");
var n = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
    },
    ctor() {},
    onLoad() {},
    onCliclClose() {
        n.utils.closeView(this);
    },
});
