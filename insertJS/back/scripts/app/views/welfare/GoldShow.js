var i = require("../../models/TimeProxy");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../item/ItemSlotUI");
cc.Class({
    extends: cc.Component,
    properties: {
        lblGold: cc.Label,
        item: r,
        res:1,
        paramKey:"",
        nodeRes: cc.Node,
    },
    ctor() {
        // this.res = 1;
        // this.paramKey = "";
    },
    onLoad() {
        this.res = n.stringUtil.isBlank(this.paramKey) ? this.res: n.utils.getParamInt(this.paramKey);
        this.nodeRes && (this.nodeRes.active = 1 == this.res || null == this.item);
        this.item && (this.item.node.active = 1 != this.res);
        this.item && (this.item.data = {
            id: this.res,
            kind: 1
        });
        this.onUpdateGold();
        1 == this.res ? facade.subscribe(l.playerProxy.PLAYER_USER_UPDATE, this.onUpdateGold, this) : facade.subscribe(l.bagProxy.UPDATE_BAG_ITEM, this.onUpdateGold, this);
    },
    onClickItem() {
        n.utils.openPrefabView("ItemInfo", !1, {
            id: this.res
        });
    },
    onUpdateGold() {
        this.lblGold.string = n.utils.formatMoney(l.bagProxy.getItemCount(this.res));
    },
    onClickOpen() {
        1 == this.res ? i.funUtils.openView(i.funUtils.recharge.id) : l.shopProxy.isHaveItem(this.res) && i.funUtils.openView(i.funUtils.shopping.id, {
            id: this.res
        });
    },
});
