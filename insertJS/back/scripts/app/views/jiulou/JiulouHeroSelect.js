var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        heroList: i,
    },
    ctor() {},
    onLoad() {
        this.heroList.data = n.jiulouProxy.getYhHeroList();
    },
    onClickClose() {
        l.utils.closeView(this);
    },
});
