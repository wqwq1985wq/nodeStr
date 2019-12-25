var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../utils/UIUtils");
var r = require("../../utils/Utils");
var a = require("../../models/BagProxy");
var s = require("../item/ItemSlotUI");
cc.Class({
    extends: i,
    properties: {
        price: cc.Label,
        unSale: cc.Label,
        giftName: cc.Label,
        limitNum: cc.Label,
        time: cc.Label,
        giftBox: s,
        boxNode: cc.Node,
        timeNode: cc.Node,
        limitNode: cc.Node,
        btn: cc.Button,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.price.string = i18n.t("HD_TYPE8_PRICE", {
                // money: t.sign + t.present
                money: t.symbol + t.krw
            });
            this.limitNum.string = t.limit + "";
            this.unSale.string = i18n.t("HD_TYPE8_UNSALE", {
                // money: t.sign + t.prime
                money: t.symbol + t.prime
            });
            this.giftName.string = t.name;
            this.giftBox.data = t.items[0].kind == a.DataType.CLOTHE ? t.items[0] : localcache.getItem(localdb.table_item, t.icon);
            this.boxNode.scale = t.items[0].kind == a.DataType.CLOTHE ? 0.8 : 1;
            this.btn.interactable = t.limit > 0;
            l.uiUtils.countDown(t.end, this.time, null, !0, "HD_TYPE8_PRICE_TIME_LIMIT");
            this.limitNode.active = this.timeNode.active = t.end - r.timeUtil.second <= 31536e3;
        }
    },
    onclickBuy() {
        var t = this._data;
        if (t) {
            if (0 != t.islimit && t.limit <= 0) {
                r.alertUtil.alert18n("HD_TYPE8_DONT_SHOPING");
                return;
            }
            if (n.purchaseProxy.limitBuy) {
                r.alertUtil.alert18n("HD_TYPE8_SHOPING_WAIT");
                return;
            }
            if (t.end <= r.timeUtil.second) {
                r.alertUtil.alert18n("HD_TYPE8_SHOPING_TIME_OVER");
                return;
            }
            if (t.items[0].kind == a.DataType.CLOTHE) {
                for (var e = !1,
                o = n.mailProxy.mailList,
                i = 0; i < o.length; i++) if (0 == o[i].rts && o[i].items) for (var l = 0; l < o[i].items.length; l++) o[i].items[l] && o[i].items[l].kind == a.DataType.CLOTHE && t.items[0].id == o[i].items[l].id && (e = !0);
                if (n.playerProxy.isUnlockCloth(t.items[0].id) || e) {
                    r.alertUtil.alert18n("USER_CLOTHE_DUPLICATE");
                    return;
                }
            }
            r.utils.openPrefabView("purchase/PurchaseGiftShow", !1, t);
        }
    },
});
