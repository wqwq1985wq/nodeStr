var i = require("../item/ItemSlotUI");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../component/SelectMax");
cc.Class({
    extends: cc.Component,
    properties: {
        lblDes: cc.Label,
        silderCount: r,
        item: i,
        lblPrice: cc.Label,
        lblLimit: cc.Label,
    },
    ctor() {
        this.shop = null;
        this.count = 0;
    },
    onLoad() {
        this.shop = this.node.openParam;
        if (null != this.shop.needCount) {
            this.count = this.shop.needCount;
            this.shop = this.shop.buy;
        }
        facade.subscribe(n.shopProxy.UPDATE_SHOP_LIST, this.updateShow, this);
        this.updateShow();
    },
    updateShow() {
        if (this.shop) {
            for (var t = 0; t < n.shopProxy.list.length; t++) if (this.shop.id == n.shopProxy.list[t].id) {
                this.shop = n.shopProxy.list[t];
                break;
            }
            var e = localcache.getItem(localdb.table_item, this.shop.item.id),
            o = Math.floor(n.playerProxy.userData.cash / this.shop.need);
            o = 1 == this.shop.islimit ? this.shop.limit > o ? o: this.shop.limit: o;
            this.lblLimit.node.active = 1 == this.shop.islimit;
            this.lblLimit.string = i18n.t("SHOP_LIMIT_COUNT", {
                c: this.shop.limit
            });
            this.lblPrice.string = this.shop.need + "";
            this.item.data = this.shop.item;
            this.lblDes.string = e.explain;
            this.silderCount.node.active = o > 1 || this.count > 1;
            var i = this;
            this.silderCount.changeHandler = function() {
                var t = i.shop.need * i.silderCount.curValue;
                i.lblPrice.string = t + "";
            };
            this.silderCount.curValue = this.count;
            this.silderCount.node.active && (this.silderCount.max = o);
        }
    },
    onClickBuy() {
        var t = this.shop;
        if (t) {
            var e = this.silderCount.node.active ? this.silderCount.curValue: 1;
            if (t.vip > n.playerProxy.userData.vip) {
                l.alertUtil.alert("SHOP_BUY_VIP_LIMIT", {
                    v: t.vip
                });
                return;
            }
            if (1 == t.islimit && 0 == t.limit) {
                l.alertUtil.alert18n("SHOP_BUY_COUNT_LIMIT");
                return;
            }
            if (t.need * e > n.playerProxy.userData.cash) {
                l.alertUtil.alertItemLimit(1);
                return;
            }
            if (0 == e) return;
            n.shopProxy.sendBuyLimit(t.id, e, 0 != this.count);
            this.onClickClost();
        }
    },
    onClickClost() {
        l.utils.closeView(this);
    },
});
