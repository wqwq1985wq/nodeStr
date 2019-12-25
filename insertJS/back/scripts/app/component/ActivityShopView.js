var i = require("../views/item/ItemSlotUI");
var n = require("./List");
var l = require("../Initializer");
var r = require("../utils/Utils");
var a = require("../utils/UIUtils");
var s = require("./ActivityShopItem");
cc.Class({
    extends: cc.Component,
    properties: {
        itemSlot: i,
        itemSlot1: i,
        itemSlot2: i,
        itemSlot3: i,
        nodeItem1: cc.Node,
        lblCount1: cc.Label,
        nodeItem2: cc.Node,
        lblCount2: cc.Label,
        nodeItem3: cc.Node,
        lblCount3: cc.Label,
        lblCount: cc.Label,
        list: n,
        item: s,
        lblRemain: cc.Label,
        lblShopName: cc.Label,
        btnBuy: cc.Node
    },
    ctor() {
        this.shopData = {};
    },
    onLoad() {
        facade.subscribe(l.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.onDataUpdate, this);
        facade.subscribe(l.bagProxy.UPDATE_BAG_ITEM, this.updateCount, this);
        this.shopData = this.node.openParam;
        l.limitActivityProxy.curExchangeId = this.shopData.hid;
        var t = "LIMIT_ACTIVITY_SHOP_NAME_" + this.shopData.hid;
        this.lblShopName.string = i18n.t(t);
        this.updateShow();
        // 只有抢糕点才有
        this.btnBuy.active = this.shopData.hid === l.limitActivityProxy.GAO_DIAN_ID;
    },
    onDataUpdate(t) {
        this.shopData = t;
        this.updateShow();
    },
    updateCount() {
        if (null != this.shopData && null != this.shopData.rwd && this.shopData.rwd.length > 0) {
            var t = this.shopData.rwd[0].items[0].id,
            e = this.shopData.rwd[1].items[0].id,
            o = this.shopData.rwd[2].items[0].id,
            i = this.shopData.rwd[3].items[0].id;
            this.lblCount.string = l.bagProxy.getItemCount(t) + "";
            this.lblCount1.string = l.bagProxy.getItemCount(e) + "";
            this.lblCount2.string = l.bagProxy.getItemCount(o) + "";
            this.lblCount3.string = l.bagProxy.getItemCount(i) + "";
            t != e && (this.lblCount1.string = l.bagProxy.getItemCount(e) + "");
            t != e && e != o && (this.lblCount2.string = l.bagProxy.getItemCount(o) + "");
            t != e && e != o && o != i && (this.lblCount3.string = l.bagProxy.getItemCount(i) + "");
        }
    },
    updateShow() {
        if (null != this.shopData && null != this.shopData.rwd && this.shopData.rwd.length > 0) {
            var t = [];
            if (this.shopData.rwd) for (var e = 1; e < this.shopData.rwd.length; e++) t.push(this.shopData.rwd[e]);
            t.sort(function(t, e) {
                var o = t.count > t.buy || 0 == t.count;
                return o != (e.count > e.buy || 0 == e.count) ? o ? -1 : 1 : t.id - e.id;
            });
            var o = this.shopData.rwd[0].items[0].id,
            i = this.shopData.rwd[1].items[0].id,
            n = this.shopData.rwd[2].items[0].id,
            s = this.shopData.rwd[3].items[0].id;
            this.nodeItem1.active = o != i;
            this.nodeItem2.active = o != i && i != n;
            this.nodeItem3.active = o != i && i != n && n != s;
            this.nodeItem1.active && (this.itemSlot1.data = this.shopData.rwd[1].items[0]);
            this.nodeItem2.active && (this.itemSlot2.data = this.shopData.rwd[2].items[0]);
            this.nodeItem3.active && (this.itemSlot3.data = this.shopData.rwd[3].items[0]);
            this.list.data = t;
            this.item.data = this.shopData.rwd[0];
            this.itemSlot.data = this.shopData.rwd[0].items[0];
            this.lblCount.string = l.bagProxy.getItemCount(o) + "";
            this.lblCount1.string = l.bagProxy.getItemCount(i) + "";
            this.lblCount2.string = l.bagProxy.getItemCount(n) + "";
            this.lblCount3.string = l.bagProxy.getItemCount(s) + "";
            var c = this;
            if (null == this.shopData.stime || this.shopData.stime < r.timeUtil.second) {
                this.lblRemain.string = i18n.t("ACTHD_OVERDUE");
                6240 == l.limitActivityProxy.curExchangeId && (this.lblRemain.string = "");
            } else a.uiUtils.countDown(this.shopData.stime, this.lblRemain,
            function() {
                c.lblRemain.string = i18n.t("ACTHD_OVERDUE");
            },
            !0, "USER_REMAIN_TIME", "d");
            this.updateCount();
        } else {
            this.list.data = null;
            this.itemSlot.data = this.itemSlot1.data = null;
            this.lblRemain.string = i18n.t("ACTHD_OVERDUE");
            this.item.data = null;
        }
    },
    onClickClost() {
        r.utils.closeView(this);
    },

    onBuyBtn() {
        // 只有抢糕点才有
        if(this.shopData.hid !== l.limitActivityProxy.GAO_DIAN_ID) return;
        r.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: l.gaodianProxy.shop[0],
            activityId: l.gaodianProxy.info.info.id
        });
    }
});
