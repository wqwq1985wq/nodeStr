var i = require("../utils/Utils");
var n = require("../Initializer");
var l = require("./TimeProxy");
var ShopProxy = function() {

    this.UPDATE_SHOP_LIST = "UPDATE_SHOP_LIST";
    this.UPDATE_SHOP_LIMIT = "UPDATE_SHOP_LIMIT";
    this.list = null;
    this.giftList = null;

    this.ctor = function() {
        JsonHttp.subscribe(proto_sc.shop.giftlist, this.onGifeList, this);
        JsonHttp.subscribe(proto_sc.shop.list, this.onList, this);
    };
    this.clearData = function() {
        this.list = null;
        this.giftList = null;
    };
    this.onGifeList = function(t) {
        this.giftList = t;
        facade.send(this.UPDATE_SHOP_LIMIT);
    };
    this.onList = function(t) {
        this.list = t;
        facade.send(this.UPDATE_SHOP_LIST);
    };
    this.isHaveItem = function(t, e) {
        void 0 === e && (e = 0);
        if (null == this.list) {
            var o = this;
            JsonHttp.send(new proto_cs.shop.shoplist(), function() {
                var n = o.isHaveItem(t);
                0 != e &&
                    (n = {
                        buy: n,
                        needCount: e
                    });
                if (n) i.utils.openPrefabView("shopping/ShopBuy", !1, n);
                else {
                    var r = localcache.getItem(localdb.table_item, t);
                    r && 0 != r.iconopen && l.funUtils.openView(r.iconopen);
                }
            });
            return !1;
        }
        for (var n = null, r = 0; r < this.list.length; r++) {
            var a = this.list[r];
            if (a.item.id == t) {
                n = a;
                if (0 == a.islimit || (1 == a.islimit && a.limit > 0))
                    return a;
            }
        }
        n &&
            1 == n.islimit &&
            n.limit <= 0 &&
            i.alertUtil.alert18n("SHOP_DAY_BUY_LIMIT");
        return !1;
    };
    this.sendBuyGift = function(t) {
        var e = new proto_cs.shop.shopGift();
        e.id = t;
        JsonHttp.send(e, function() {
            n.timeProxy.floatReward();
        });
    };
    this.sendBuyLimit = function(t, e, o) {
        void 0 === o && (o = !1);
        var i = new proto_cs.shop.shopLimit();
        i.id = t;
        i.count = e;
        JsonHttp.send(i, function() {
            o || n.timeProxy.floatReward();
            o && facade.send("SHOP_BUY_ITEM_ID", t, !0);
        });
    };
    this.sendList = function(t) {
        void 0 === t && (t = !0);
        JsonHttp.send(new proto_cs.shop.shoplist(), function() {
            t && i.utils.openPrefabView("shopping/ShopView");
        });
    };
    this.openShopBuy = function(t) {
        for (var e = this.list.length, o = 0; o < e; o++)
            if (this.list[o].item.id == t) {
                i.utils.openPrefabView(
                    "shopping/ShopBuy",
                    !1,
                    this.list[o]
                );
                break;
            }
    };
}
exports.ShopProxy = ShopProxy;
