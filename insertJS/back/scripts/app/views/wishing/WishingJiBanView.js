var i = require("../../utils/Utils");
var n = require("../../component/List");
var l = require("../../component/UrlLoad");
var r = require("../../Initializer");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        itemList:n,
        berNum:cc.Label,
        spec_1:l,
        specNum:cc.Label,
        berValue:cc.ProgressBar,
        btns:[cc.Node],
    },

    ctor(){
        this.type = null;
        this.treeNum = 0;
        this.typeList = [];
    },
    onLoad() {
        var t = this.node.openParam;
        this.treeNum = t.index;
        this.typeList = localcache.getList(localdb.table_treeType);
        this.onShowTree();
    },
    onClickClose() {
        i.utils.closeView(this);
    },
    onShowTree() {
        this.type = this.typeList[this.treeNum];
        var t = localcache.getGroup(localdb.table_heropve, "tree", this.typeList[this.treeNum].id),
        e = r.jibanProxy.getTreeTypeCount(this.typeList[this.treeNum].id),
        o = t.length;
        this.berNum.string = i18n.t("COMMON_NUM", {
            f: e,
            s: o
        });
        this.berValue.progress = e / o;
        this.spec_1.url = a.uiHelps.getLangSp(this.type.prop[0].prop);
        this.specNum.string = "+" + this.type.prop[0].value;
        this.itemList.data = t;
        for (var i = 0; i < this.typeList.length; i++) this.btns[i].active = i == this.treeNum;
    },
    onClickTab(t, e) {
        var o = parseInt(e);
        this.treeNum = this.treeNum + o < 0 ? this.typeList.length - 1 : this.treeNum + o >= this.typeList.length ? 0 : this.treeNum + o;
        if (this.treeNum < this.typeList.length) {
            var n = this.typeList[this.treeNum];
            i.alertUtil.alert(i18n.t("WISHING_TU_JIAN_QIE_HUAN", {
                name: n.treename
            }));
        }
        this.onShowTree();
    },
});
