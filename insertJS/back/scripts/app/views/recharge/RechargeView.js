var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../user/UserHeadItem");
cc.Class({
    extends: cc.Component,
    properties: {
        lblVip: cc.Label,
        lblNext: cc.Label,
        lblPrg: cc.Label,
        pro: cc.ProgressBar,
        nodeLook: cc.Node,
        nodeBtnLook: cc.Node,
        nodeGeted: cc.Node,
        nodeRwd: cc.Node,
        listRwd: i,
        nodeLeft: cc.Node,
        nodeRight: cc.Node,
        lblSp: cc.Label,
        contextRich: cc.RichText,
        nodeRecharge: cc.Node,
        nodeBtnRecharge: cc.Node,
        list: i,
        userItem: r,
        buyList: i,
        btnBuy: cc.Node,
        btnBuyed: cc.Node,
        costNode: cc.Node,
        lblCost: cc.Label,
        bgIcon: cc.Node,
        flowerNode: cc.Node,
        lblTip: cc.Node,
        refundDeclarationNode1: cc.Node,
        refundDeclarationNode2: cc.Node,
    },
    ctor() {
        this._curVipLv = 1;
        this._orgColor = null;
    },
    onLoad() {
        facade.subscribe("UPDATE_CHARGE_ORDER", this.onShowData, this);
        l.welfareProxy.sendOrderBack();
        var t = this.node.openParam ? this.node.openParam.type: 0;
        this.updateShow();
        0 == t ? this.onClickRecharge() : this.onClickLook();
        this._orgColor = this.contextRich.node.color;
        this.selectVipLook(0 == l.playerProxy.userData.vip ? 1 : l.playerProxy.userData.vip);
        facade.subscribe(l.welfareProxy.UPDATE_WELFARE_VIP_FULI, this.onUpdateShow, this);
        facade.subscribe(l.playerProxy.PLAYER_USER_UPDATE, this.updateShow, this);
        facade.subscribe(l.welfareProxy.UPDATE_CHARGE_ORDER, this.onShowData, this);
        facade.subscribe(l.playerProxy.PLAYER_UPDATE_HEAD, this.updateUser, this);
        this.onShowData();
    },
    updateUser() {
        this.userItem.updateUserHead();
    },
    onShowData() {
        for (var t = [], e = 0; e < l.welfareProxy.rshop.length; e++) 1 == l.welfareProxy.rshop[e].type && t.push(l.welfareProxy.rshop[e]);
        this.list.data = t;
    },
    onUpdateShow() {
        this.selectVipLook(this._curVipLv);
    },
    updateShow() {
        var t = l.playerProxy.userData,
        e = t.vip,
        o = localcache.getItem(localdb.table_vip, e + 1),
        i = localcache.getItem(localdb.table_vip, e);
        this.lblVip.string = i18n.t("VIP_LV_TIP", {
            v: e
        });
        var n = l.welfareProxy.getVipExp(e + 1);
        n = 0 == n ? (o ? o.recharge: i.recharge) : n;
        if (null != o) {
            this.lblNext.string = i18n.t("CUR_RECHARGE_NEXT_LV", {
                v: n - t.cashbuy
            });
            this.lblPrg.string = i18n.t("COMMON_NUM", {
                f: t.cashbuy,
                s: n
            });
            this.pro.progress = t.cashbuy / n;
        } else {
            this.pro.progress = 1;
            this.lblPrg.string = i18n.t("COMMON_MAX");
            this.lblNext.string = i18n.t("VIP_LV_MAX");
        }
    },
    onClickLook() {
        this.nodeBtnLook.active = this.nodeRecharge.active = !1;
        this.nodeBtnRecharge.active = this.nodeLook.active = !0;
        this.bgIcon.height = 1124;
        this.bgIcon.y = 572;
        this.flowerNode.y = 0;
        this.lblTip.active = !1;
        this.refundDeclarationNode1.active = !1;
        this.refundDeclarationNode2.active = !1;
    },
    onClickRecharge() {
        this.nodeBtnLook.active = this.nodeRecharge.active = !0;
        this.nodeBtnRecharge.active = this.nodeLook.active = !1;
        this.bgIcon.height = 765;
        this.bgIcon.y = 360;
        this.flowerNode.y = -150;
        this.lblTip.active = !0;
        this.refundDeclarationNode1.active = !0;
        this.refundDeclarationNode2.active = !0;
    },
    onClickReward() {
        1 == l.welfareProxy.getVipState(this._curVipLv) ? l.welfareProxy.sendVip(this._curVipLv) : n.alertUtil.alert18n("RECHARGE_NOT_GET");
    },
    onClickLeft(t, e) {
        var o = parseInt(e),
        i = this.getMax();
        this._curVipLv += o;
        this._curVipLv = this._curVipLv < 1 ? 1 : this._curVipLv;
        this._curVipLv = this._curVipLv > i ? i: this._curVipLv;
        this.selectVipLook(this._curVipLv);
    },
    getMax() {
        var t = 5 * (Math.floor(l.playerProxy.userData.vip / 5) + 1),
        e = localcache.getList(localdb.table_vip);
        return (t = t > e.length - 1 ? e.length - 1 : t);
    },
    onClickClost() {
        n.utils.closeView(this);
    },
    onClickOpen(t, e) {
        n.utils.openPrefabView(e);
    },
    selectVipLook(t) {
        this._curVipLv = t;
        var e = localcache.getItem(localdb.table_vip, this._curVipLv),
        o = localcache.getItem(localdb.table_vip2, this._curVipLv);
        this.nodeLeft.active = this._curVipLv > 1;
        this.nodeRight.active = this._curVipLv < this.getMax();
        this.lblSp.string = i18n.t("VIP_SP_TIP", {
            v: this._curVipLv
        });
        var i = "";
        if (e.recharge > 0) {
            var r = l.welfareProxy.getVipExp(this._curVipLv);
            i += i18n.t("VIP_CONTEXT_1", {
                v: (r = 0 == r ? e.recharge: r),
                lv: e.vip
            }) + "\n";
        }
        e.jingying > 0 && (i += i18n.t("VIP_CONTEXT_2", {
            v: e.jingying
        }) + "\n");
        i += i18n.t("VIP_CONTEXT_4", {
            v: e.jingli
        }) + "\n";
        i += i18n.t("VIP_CONTEXT_5", {
            v: e.jiaqi
        }) + "\n";
        i += i18n.t("VIP_CONTEXT_6", {
            v: e.sonpow
        }) + "\n";
        i += i18n.t("VIP_CONTEXT_7", {
            v: e.tili
        }) + "\n";
        e.free_zy > 0 && (i += i18n.t("VIP_CONTEXT_11", {
            v: e.free_zy
        }) + "\n");
        e.is_jump > 0 && (i += i18n.t("VIP_CONTEXT_12") + "\n");
        e.shenji > 0 && (i += i18n.t("VIP_CONTEXT_13", {
            v: e.shenji
        }) + "\n");
        e.is_chenlu > 0 && (i += i18n.t("VIP_CONTEXT_14") + "\n");
        e.is_gather > 0 && (i += i18n.t("VIP_CONTEXT_15") + "\n");
        e.is_planting > 0 && (i += i18n.t("VIP_CONTEXT_16") + "\n");
        e.is_getMail > 0 && (i += i18n.t("VIP_CONTEXT_17") + "\n");
        o.is_finstudy > 0 && (i += i18n.t("VIP_CONTEXT_18") + "\n");
        o.is_study > 0 && (i += i18n.t("VIP_CONTEXT_19") + "\n");
        o.is_cook > 0 && (i += i18n.t("VIP_CONTEXT_20") + "\n");
        o.is_fincook > 0 && (i += i18n.t("VIP_CONTEXT_21") + "\n");
        o.is_apprentice > 0 && (i += i18n.t("VIP_CONTEXT_22") + "\n");
        o.is_return > 0 && (i += i18n.t("VIP_CONTEXT_23") + "\n");
        // o.haoyou_num > 0 && (i += i18n.t("VIP_CONTEXT_24", {
        //     v: o.haoyou_num
        // }) + "\n");
        o.ban_num > 0 && (i += i18n.t("VIP_CONTEXT_25", {
            v: o.ban_num
        }) + "\n");
        // o.apply_num > 0 && (i += i18n.t("VIP_CONTEXT_26", {
        //     v: o.apply_num
        // }) + "\n");
        this.contextRich.string = i;
        var a = l.welfareProxy.getVipState(this._curVipLv);
        this.nodeGeted.active = 2 == a;
        this.nodeRwd.active = 1 == a;
        this.contextRich.node.color = l.playerProxy.userData.vip >= this._curVipLv ? this._orgColor: n.utils.GRAY;
        var s = localcache.getItem(localdb.table_vipReward, this._curVipLv);
        this.listRwd.data = s ? s.vipRwd: [];
        this.listRwd.node.x = this.listRwd.node.width / -2;
        this.buyList.data = s ? s.vipgifts: [];
        this.buyList.node.x = -this.buyList.node.width / 2;
        var c = l.welfareProxy.getPriceState(this._curVipLv);
        this.btnBuy.active = 1 == c;
        this.btnBuyed.active = 2 == c;
        this.costNode.active = 1 == c;
        this.lblCost.string = s.cost + "";
    },
    onClickBuy() {
        var t = this,
        e = localcache.getItem(localdb.table_vipReward, this._curVipLv);
        n.utils.showConfirmItem(i18n.t("VIP_BUY_COST_TXT", {
            price: e.cost
        }), 1, l.playerProxy.userData.cash,
        function() {
            l.playerProxy.userData.cash < e.cost ? n.alertUtil.alertItemLimit(1) : l.welfareProxy.sendBuy(t._curVipLv);
        });
    },
});
