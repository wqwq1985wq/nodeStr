var i = require("../../utils/Utils");
var n = require("../../component/List");
var l = require("../../Initializer");
var r = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        listGift: n,
        list: n,
        nodeGift: cc.Node,
        nodeList: cc.Node,
        lblTime: cc.Label,
        nodeBtn1: cc.Node,
        nodeBtn2: cc.Node,
        nodeTab: cc.Node,
        btns: [cc.Button],
        tab: cc.Node,
    },
    ctor() {
        this._curIndex = 4;
    },

    onLoad() {
        var t = this.node.openParam;
        if (t && 0 != t.id) {
            var e = l.shopProxy.isHaveItem(t.id);
            i.utils.openPrefabView("shopping/ShopBuy", !1, e);
        }
        this.onClickTab(null, 1);
        facade.subscribe(
            l.shopProxy.UPDATE_SHOP_LIST,
            this.updateCurShow,
            this
        );
        this.nodeBtn1.active = l.shopProxy.list.length > 0;
        this.nodeBtn2.active =
            null != l.shopProxy.giftList &&
            l.shopProxy.giftList.list.length > 0;
        this.nodeTab.active = this.nodeBtn1.active && this.nodeBtn2.active;
    },
    updateCurShow() {
        this.onClickTab(null, this.nodeList.active ? 1 : 2);
    },
    onClickTab(t, e) {
        var o = parseInt(e);
        this.tab.active = this.nodeList.active = 1 == o;
        this.nodeGift.active = 2 == o;
        this.lblTime.node.active = 2 == o;
        this.nodeList.active && this.onClickListTab(null, this._curIndex);
        if (this.nodeGift.active) {
            this.lblTime.string = i18n.t("SHOP_NEXT_TIME", {
                t: i.timeUtil.getDateDiff(l.shopProxy.giftList.cft.eTime)
            });
            this.listGift.data = this.getGiftList();
        }
    },
    onClickListTab(t, e) {
        var o = parseInt(e);
        this._curIndex = o;
        for (var i = 0; i < this.btns.length; i++)
            this.btns[i].interactable = i != o;
        this.list.data = this.getShopList(o);
    },
    getShopList(t) {
        void 0 === t && (t = 0);
        for (var e = [], o = l.shopProxy.list.length, i = 0; i < o; i++) {
            var n = l.shopProxy.list[i];
            if (
                null != n &&
                !(0 != n.vip && n.vip > l.playerProxy.userData.vip)
            ) {
                var r = localcache.getItem(localdb.table_item, n.item.id);
                switch (t) {
                    case 4:
                        n.islimit && e.push(n);
                        break;

                    default:
                        (r.classify == t ||
                            (null == r.classify && 0 == t)) &&
                            e.push(n);
                }
            }
        }
        e.sort(function(t, e) {
            var o = 1 == t.islimit ? -1 : 1,
                i = 1 == e.islimit ? -1 : 1;
            return o != i ? o - i : t.need - e.need;
        });
        return e;
    },
    getGiftList() {
        for (
            var t = [], e = l.shopProxy.giftList.list.length, o = 0;
            o < e;
            o++
        ) {
            var i = l.shopProxy.giftList.list[o];
            (0 != i.vip && i.vip > l.playerProxy.userData.vip) || t.push(i);
        }
        t.sort(function(t, e) {
            return t.need - e.need;
        });
        return t;
    },
    onClickClost() {
        i.utils.closeView(this);
    },
    onClickRecharge() {
        r.funUtils.openView(r.funUtils.recharge.id);
    },
});