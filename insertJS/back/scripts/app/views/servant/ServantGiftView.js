var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        listView: i,
        lbljb: cc.Label,
    },
    ctor() {
        this.itemArr = [
            {
                id: 900
            },
            {
                id: 901
            },
            {
                id: 902
            }
        ];
    },
    onLoad() {
        facade.subscribe("UPDATE_BAG_ITEM", this.showData, this);
        facade.subscribe("UPDATE_HERO_JB", this.updateJiban, this);
        this.showData();
        this.updateJiban();
        this.listView.data = this.itemArr;
    },
    showData() {
        this.listView.updateItemShow();
    },
    updateJiban() {
        var t = n.jibanProxy.getHeroJB(n.servantProxy.curSelectId);
        this.lbljb.string = t + "";
    },
    closeBtn() {
        l.utils.closeView(this);
    },
});
