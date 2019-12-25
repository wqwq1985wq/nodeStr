var i = require("../../utils/Utils");
var n = require("../../component/List");
var l = require("../../Initializer");
var r = require("../../component/RoleSpine");
var a = require("./RankItem");
var s = require("../../component/UrlLoad");
var c = require("../../utils/UIUtils");
var _ = require("../chenghao/ChengHaoItem");
var d = require("../../Config");
var u = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        list: n,
        lblContext: cc.Label,
        btns: [cc.Button],
        lblRank: cc.Label,
        lblContent: cc.Label,
        nodeMobai: cc.Node,
        nodeMobaied: cc.Node,
        role: r,
        rankArr: [a],
        lblName: cc.Label,
        lblShiLi: cc.Label,
        lblLv: cc.Label,
        bgUrl: s,
        redShili: cc.Node,
        redGuanka: cc.Node,
        redQinmi: cc.Node,
        btnRe: cc.Button,
        lblRe: cc.Label,
        lblNoChenghao: cc.Node,
        chengHao: _,
    },
    ctor() {
        this.flag = !1;
        this.curIndex = 1;
        this.curList = null;
    },
    onLoad() {
        facade.subscribe(l.rankProxy.UPDATE_RANK_SELF_RID, this.updateCurShow, this);
        facade.subscribe(l.rankProxy.UPDATE_RANK_MOBAI, this.updateMobai, this);
        facade.subscribe(l.rankProxy.UPDATE_RANK_GUAN_KA, this.updateShowGuanKa, this);
        facade.subscribe(l.rankProxy.UPDATE_RANK_LOVE, this.updateShowLove, this);
        facade.subscribe(l.rankProxy.UPDATE_RANK_SHILI, this.updateShowShili, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
        this.list.selectHandle = function(t) {
            var e = t;
            l.playerProxy.sendGetOther(e.uid);
        };
        this.onClickTab(null, 1);
        this.updateMobai();
        this.onTimer();
        this.schedule(this.onTimer, 1);
    },
    updateShowShili() {
        if (null != l.rankProxy.shili) {
            var t = l.rankProxy.shili.slice(3, l.rankProxy.shili.length);
            this.list.data = t;
            l.playerProxy.userEp;
            this.onSetPanelData(l.rankProxy.shili);
        }
    },
    updateShowGuanKa() {
        if (null != l.rankProxy.guanKa) {
            l.rankProxy.isShowGuanKa = !0;
            var t = l.rankProxy.guanKa.slice(3, l.rankProxy.guanKa.length);
            this.list.data = t;
            this.lblContent.string = l.rankProxy.getGuankaString(l.playerProxy.userData.smap);
            this.onSetPanelData(l.rankProxy.guanKa);
        }
    },
    sortGuanQia(t, e) {
        return e.num - t.num;
    },
    updateShowLove() {
        if (null != l.rankProxy.love) {
            var t = l.rankProxy.love.slice(3, l.rankProxy.love.length);
            this.list.data = t;
            this.lblContent.string = i18n.t("RANK_TIP_3") + " " + i.utils.formatMoney(l.wifeProxy.base.allLove);
            this.onSetPanelData(l.rankProxy.love);
        }
    },
    updateMobai() {
        var t = 0;
        switch (this.curIndex) {
        case 1:
            t = l.rankProxy.mobai.shili;
            break;
        case 2:
            t = l.rankProxy.mobai.guanka;
            break;
        case 3:
            t = l.rankProxy.mobai.love;
        }
        this.nodeMobai.active = 0 == t;
        this.nodeMobaied.active = 0 != t;
        this.redShili.active = 0 == l.rankProxy.mobai.shili;
        this.redGuanka.active = 0 == l.rankProxy.mobai.guanka;
        this.redQinmi.active = 0 == l.rankProxy.mobai.love;
    },
    updateCurShow() {
        if (1 == l.rankProxy.showRankType) {
            var t = l.rankProxy.selfRid ? l.rankProxy.selfRid.shili: 0;
            this.lblRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
        } else if (2 == l.rankProxy.showRankType) {
            t = l.rankProxy.selfRid ? l.rankProxy.selfRid.guanka: 0;
            this.lblRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
        } else if (3 == l.rankProxy.showRankType) {
            t = l.rankProxy.selfRid ? l.rankProxy.selfRid.love: 0;
            this.lblRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
        }
    },
    onClickTab(t, e) {
        this.flag = !1;
        var o = parseInt(e);
        this.curIndex = o;
        for (var i = 0; i < this.btns.length; i++) this.btns[i].interactable = i != o - 1;
        this.lblContext.string = i18n.t("RANK_TIP_" + o);
        l.rankProxy.isShowGuanKa = !1;
        l.rankProxy.showRankType = o;
        switch (o) {
        case 1:
            l.rankProxy.sendRank(1);
            break;
        case 2:
            l.rankProxy.sendRank(2);
            break;
        case 3:
            l.rankProxy.sendRank(3);
        }
        this.updateMobai();
    },
    onClickMobai() {
        l.rankProxy.sendMoBai(this.curIndex);
    },
    onClickClost() {
        i.utils.closeView(this, !0);
    },
    onSetPanelData(t) {
        this.curList = t;
        this.lblName.string = l.playerProxy.userData.name;
        var e = l.playerProxy.userEp.e1 + l.playerProxy.userEp.e2 + l.playerProxy.userEp.e3 + l.playerProxy.userEp.e4,
        o = localcache.getItem(localdb.table_officer, l.playerProxy.userData.level);
        this.lblLv.string = o.name;
        if (d.Config.isShowChengHao && u.funUtils.isOpenFun(u.funUtils.chenghao)) {
            var n = localcache.getItem(localdb.table_fashion, l.playerProxy.userData.chenghao);
            this.chengHao.data = n;
            this.lblNoChenghao.active = !n;
        }
        if (1 == l.rankProxy.showRankType) this.lblShiLi.string = i18n.t("MAIN_SHILI", {
            d: i.utils.formatMoney(e)
        });
        else if (2 == l.rankProxy.showRankType) this.lblShiLi.string = l.rankProxy.getGuankaString(l.playerProxy.userData.smap);
        else if (3 == l.rankProxy.showRankType) {
            for (var r = 0,
            a = 0; a < l.wifeProxy.wifeList.length; a++) r += l.wifeProxy.wifeList[a].love;
            this.lblShiLi.string = i18n.t("RANK_TIP_3") + "：" + i.utils.formatMoney(r);
        }
        this.onClickRender(null, "0");
    },
    onClickRender(t, e) {
        for (var o = this.curList.slice(0, 3), i = 0; i < this.rankArr.length; i++) i < o.length && (this.rankArr[i].data = o[i]);
        var n = o[parseInt(e)];
        this.role.setClothes(n.sex, n.job, n.level, n.clothe);
        this.bgUrl.node.active = 0 != n.clothe.background;
        if (this.bgUrl.node.active) {
            var l = localcache.getItem(localdb.table_userClothe, n.clothe.background);
            l && (this.bgUrl.url = c.uiHelps.getStoryBg(l.model));
        }
    },
    onClickRe() {
        l.rankProxy.sendRefresh(this.curIndex);
    },
    onTimer() {
        var t = i.timeUtil.second - l.rankProxy.lastTime;
        t >= 60 && (this.btnRe.interactable = !0);
        this.btnRe.interactable = t >= 60;
        this.lblRe.string = t >= 60 ? i18n.t("COMMON_REFRESH") : i18n.t("FLOWER_SHENG_YU_SHI_JIAN", {
            num: 60 - t
        });
    },
});
