var i = require("../../utils/Utils");
var n = require("../../Initializer");
var l = require("../../utils/UIUtils");
var r = require("./ZhongYuanItem");
cc.Class({
    extends: cc.Component,
    properties: {
        lblBall: cc.Label,
        items: [r],
        lblTime: cc.Label,
        lblConsume: cc.Label,
        btnPlay: cc.Button,
        tipNode: cc.Node,
        pointerNode: cc.Node,
        itemNode: cc.Node,
    },
    ctor() {
        this.consume = null;
        this.curIndex = 0;
        this.roundIndex = 0;
    },
    onLoad() {
        facade.subscribe(n.zhongyuanProxy.ZHONGYUAN_DATA_UPDATE, this.onDataUpDate, this);
        facade.subscribe(n.bagProxy.UPDATE_BAG_ITEM, this.onItemUpdate, this);
        l.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
        n.zhongyuanProxy.sendInfo();
        n.shopProxy.sendList(!1);
        this.onItemUpdate();
    },
    onDataUpDate() {
        var t = this,
        e = n.zhongyuanProxy.data,
        o = 0;
        if (e) {
            l.uiUtils.countDown(e.info.eTime, this.lblTime,
            function() {
                i.timeUtil.second >= e.info.eTime && (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
            });
            for (var r = 0; r < this.items.length; r++) {
                this.items[r].data = e.list[r];
                this.items[r].select = 0 == r;
                this.pointerNode.angle = 30;
                e.list[r].get && o++;
            }
            if (n.zhongyuanProxy.win && n.zhongyuanProxy.isTrun) {
                this.curIndex = n.zhongyuanProxy.win.id;
                this.showEff(0);
            }
            this.btnPlay.node.active = o < e.list.length;
            this.consume = localcache.getItem(localdb.table_zhongyuan, o + 1);
            if (o >= e.list.length) {
                this.lblConsume.string = i18n.t("ZHONG_YUAN_QUAN_BU_LIN_QU");
                this.itemNode.active = !1;
            } else {
                this.lblConsume.string = this.consume.cons ? i18n.t("ZHONG_YUAN_XIAO_HAO", {
                    num: this.consume.cons
                }) : i18n.t("ZHONG_YUAN_MIAN_FEI");
                this.itemNode.active = this.consume.cons;
            }
            this.lblBall.string = n.bagProxy.getItemCount(e.need) + "";
            this.tipNode.active = 0 == n.bagProxy.getItemCount(e.need);
        }
    },
    showEff(t) {
        this.unscheduleAllCallbacks();
        this.schedule(this.showSelect, t);
    },
    showSelect() {
        for (var t = this.roundIndex % 16,
        e = 0; e < this.items.length; e++) this.items[e].select = t == e;
        this.pointerNode.angle = -(22.5 * t - 30) % 360;
        this.roundIndex++;
        if (this.roundIndex >= 16 && this.roundIndex < 32) this.showEff(0.03);
        else if (this.roundIndex >= 32 && this.roundIndex < 48) this.showEff(0.03 + (this.roundIndex - 32) / 320);
        else if (this.roundIndex >= 48 + this.curIndex && this.roundIndex < 160) {
            this.roundIndex = 0;
            this.curIndex = 0;
            this.unscheduleAllCallbacks();
            n.timeProxy.floatReward();
            n.zhongyuanProxy.isTrun = !1;
            facade.send(n.zhongyuanProxy.ZHONGYUAN_ITEM_LINQU);
        }
    },
    onItemUpdate() {
        if (n.zhongyuanProxy.data) {
            var t = n.bagProxy.getItemCount(n.zhongyuanProxy.data.need);
            this.tipNode.active = 0 == t;
            this.lblBall.string = t + "";
        }
    },
    onClickClose() {
        i.utils.closeView(this);
    },
    onClickPlay() {
        if (!n.zhongyuanProxy.isTrun) {
            if (n.bagProxy.getItemCount(n.zhongyuanProxy.data.need) < this.consume.cons) {
                i.alertUtil.alertItemLimit(n.zhongyuanProxy.data.need);
                this.onClickAdd();
            } else {
                n.zhongyuanProxy.sendPlay();
                n.zhongyuanProxy.isTrun = !0;
            }
        }
    },
    onClickAdd() {
        i.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: n.zhongyuanProxy.shop[0],
            activityId: n.zhongyuanProxy.data.info.id
        });
        n.shopProxy.openShopBuy(n.zhongyuanProxy.data.need);
    },
    onClickTab(t, e) {
        switch (e) {
        case "1":
            i.utils.openPrefabView("ActivityShopView", null, n.zhongyuanProxy.dhShop);
            break;
        case "2":
            i.utils.openPrefabView("limitactivity/LimitActivityView", null, {
                type: n.limitActivityProxy.ZHONGYUAN_TYPE
            });
            break;
        case "3":
            i.utils.openPrefabView("zhongyuan/SacrificeView");
            break;
        case "4":
            n.zhongyuanProxy.sendPaiHang();
        }
    },
});
