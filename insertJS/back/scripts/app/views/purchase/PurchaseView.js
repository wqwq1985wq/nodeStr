var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../../component/RedDot");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
    },
    ctor() {},
    onLoad() {
        facade.subscribe(l.purchaseProxy.PURCHASE_DATA_UPDATA, this.onShowData, this);
        facade.subscribe("RECHARGE_FAIL", this.resetLimitBuy, this);
        l.purchaseProxy.sendOpenPrince();
    },
    onShowData() {
        for (var t = [], e = 0; e < l.purchaseProxy.gift.length; e++) null == l.purchaseProxy.gift[e].type && t.push(l.purchaseProxy.gift[e]);
        t.sort(function(t, e) {
            var o = t.limit > 0;
            if (o != e.limit > 0) return o ? -1 : 1;
            var i = t.end - n.timeUtil.second <= 31536e3;
            return i != e.end - n.timeUtil.second <= 31536e3 ? i ? -1 : 1 : t.id - e.id;
        });
        this.list.data = t;
    },
    resetLimitBuy() {
        l.purchaseProxy.setGiftNum(0, 1);
        l.purchaseProxy.limitBuy = !1;
    },
    onclickClose() {
        r.change("purchase", !1);
        n.utils.closeView(this);
    },
});
