var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../component/List");
cc.Class({
    extends: i,
    properties: {
        urlIcon: n,
        lblName: cc.Label,
        lblSolder: cc.Label,
        lblRwd1: cc.Label,
        lblRwd2: cc.Label,
        list: l,
    },
    ctor() {},
    showData() {
        this.data;
    },
    onClickBat() {},
});
