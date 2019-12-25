var i = require("../../component/List");
var n = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        itemList: i,
        tabs: [cc.Button],
    },
    ctor() {
        this.totalArr = [];
        this.curSelect = "1";
    },
    onLoad() {
        facade.subscribe("SERVANT_UP", this.updateData, this);
        var t = n.utils.getParamStr("ep_wl_item"),
        e = n.utils.getParamStr("ep_zl_item"),
        o = n.utils.getParamStr("ep_zz_item"),
        i = n.utils.getParamStr("ep_ml_item"),
        l = n.utils.getParamStr("ep_all_item") + "|" + t + "|" + e + "|" + o + "|" + i;
        this.totalArr = l.split("|");
        this.onClickTab(null, this.curSelect);
    },
    onClickTab(t, e) {
        for (var o = parseInt(e), i = 0; i < this.tabs.length; i++) i > 0 && (this.tabs[i].interactable = i != o);
        this.curSelect = e;
        this.onShowData();
    },
    onShowData() {
        "0" == this.curSelect ? (this.itemList.data = this.totalArr) : "1" == this.curSelect ? (this.itemList.data = n.utils.getParamStrs("ep_wl_item")) : "2" == this.curSelect ? (this.itemList.data = n.utils.getParamStrs("ep_zl_item")) : "3" == this.curSelect ? (this.itemList.data = n.utils.getParamStrs("ep_zz_item")) : "4" == this.curSelect && (this.itemList.data = n.utils.getParamStrs("ep_ml_item"));
    },
    updateData() {
        this.itemList.updateItemShow();
    },
    onClickClose() {
        n.utils.closeView(this);
    },
});
