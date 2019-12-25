var i = require("../../component/RenderListItem");
var n = require("../../component/List");
var l = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        lblTitle: cc.Label,
        list: n,
        btnGet: cc.Button,
        btnYlq: cc.Node,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblTitle.string = i18n.t("GUO_LI_TOTAL_GET", {
                num: t.need
            });
            this.btnGet.node.active = 0 == t.get;
            this.btnGet.interactable = 0 == t.get && t.need <= l.guoliPorxy.data.allgl;
            this.btnYlq.active = 1 == t.get;
            this.list.data = t.items;
        }
    },
    onClickGet() {
        var t = this._data;
        l.guoliPorxy.sendGetReward(t.dc);
    },
});
