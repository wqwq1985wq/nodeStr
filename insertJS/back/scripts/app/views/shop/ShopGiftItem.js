var i = require("../../component/RenderListItem");
var n = require("../../utils/Utils");
var l = require("../item/ItemSlotUI");
var r = require("../../component/LabelShadow");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblCount: r,
        nodeLimit: cc.Node,
        lblCost: cc.Label,
        ItemSlotUI: l,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblName.string = t.name;
            this.lblCost.string = t.need + "";
            this.nodeLimit.active = 1 == t.islimit;
            this.lblCount.string = i18n.t("SHOP_LIMIT_COUNT", {
                c: t.limit
            });
            this.ItemSlotUI.data = t.items[0];
        }
    },
    onClickBuy() {
        n.utils.openPrefabView("shopping/ShopGiftBuy", !1, this._data);
    },
});
