var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/Utils");
var r = require("../../Initializer");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        lblname:cc.Label,
        lblCost:cc.Label,
        icon:n,
        btnSelect:cc.Button,
        nameNode:cc.Node,
        lblPrice:cc.Label,
        priceNode:cc.Node,
    },
    showData() {
        var t = this._data;
        if (t) {
            this.lblname.string = t.name;
            this.priceNode.active = 0 == t.itemid;
            this.lblCost.node.active = 0 != t.itemid;
            if (0 == t.itemid) {
                var e = r.sonProxy.getSon(r.sonProxy.lilianData.sid),
                o = Math.ceil(((30 * t.max) / Math.ceil(r.playerProxy.userEp.e2 / 800)) * 0.5 * r.playerProxy.userEp.e2 * e.talent * 0.3);
                this.lblPrice.string = "" + o;
                this.btnSelect.interactable = r.playerProxy.userData.food >= o;
                this.icon.url = a.uiHelps.getXingLiIcon(t.id);
            } else {
                this.lblCost.string = r.bagProxy.getItemCount(t.itemid) + "/" + t.num;
                this.btnSelect.interactable = r.bagProxy.getItemCount(t.itemid) >= t.num;
                this.icon.url = a.uiHelps.getItemSlot(t.itemid);
            }
        }
    },
    onClickRender() {
        var t = this._data;
        r.sonProxy.lilianData.luggage = t.id;
        l.utils.closeNameView("child/ChildLilianXingliSelect");
        facade.send("CHILD_LI_LIAN_SELECT_UPDATE");
    },
});
