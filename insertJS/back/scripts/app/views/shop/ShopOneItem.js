var i = require("../../component/RenderListItem");
var n = require("../item/ItemSlotUI");
var l = require("../../utils/Utils");
var r = require("../../component/LabelShadow");
cc.Class({
    extends: i,
    properties: {
        item: n,
        lblPrice: cc.Label,
        lblCount: r,
        nodeLimit: cc.Node,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.nodeLimit.active = 1 == t.islimit;
            // this.lblCount.string = i18n.t("SHOP_LIMIT_COUNT", {
            //     c: t.limit
            // });
            this.lblCount.string = i18n.t("SHOP_LIMIT_COUNT") + t.limit;
            this.lblPrice.string = t.need + "";
            this.item.data = t.item;
        }
    },
    onClickBuy() {
        l.utils.openPrefabView("shopping/ShopBuy", !1, this._data);
    },
});
