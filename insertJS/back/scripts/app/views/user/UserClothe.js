var i = require("../../component/List");
var n = require("../../component/RoleSpine");
var l = require("../../utils/Utils");
var r = require("../../Initializer");
var a = require("../../component/ConfirmView");
var s = require("../../utils/ApiUtils");
var c = require("../../component/UrlLoad");
var _ = require("../../utils/UIUtils");
var d = require("../../Config");
var u = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
        roleSpine: n,
        nodeTab: cc.Node,
        nodeList: cc.Node,
        lblType: cc.Label,
        btns: [cc.Button],
        nodeUp: cc.Node,
        nodeDown: cc.Node,
        lblInfo: cc.Label,
        lblLock: cc.Label,
        nodeInfo: cc.Node,
        effectSprite: cc.Sprite,
        lblLimitTime: cc.Label,
        lblRemainTime: cc.Label,
        btnLock: cc.Button,
        btnGo: cc.Button,
        btnSave: cc.Button,
        bgUrl: c,
        nodeBot: cc.Node,
        nodeTop: cc.Node,
        nodeRight: cc.Node,
        nodeShare: cc.Node,
        lblScore: cc.Label,
        btnShare: cc.Node,
        btnSuit: cc.Node,
        nodeRole: cc.Node,
    },
    ctor() {
        this.typeStrs = [
                "",
                "USER_CLOTHE_HEAD",
                "USER_CLOTHE_DRESS",
                "USER_CLOTHE_EAR",
                "USER_CLOTHE_BG",
                "USER_CLOTHE_EFF",
                "USER_CLOTHE_ANIMAL"
            ];
        this._orgBody = 0;
        this._orgHead = 0;
        this._orgEar = 0;
        this._orgBg = 0;
        this._orgEff = 0;
        this._orgAnimal = 0;
        this._body = 0;
        this._head = 0;
        this._ear = 0;
        this._bg = 0;
        this._eff = 0;
        this._animal = 0;
        this._curIndex = 1;
        this._curData = null;
        this._orgNodeRoleX = 0;
    },
    onLoad() {
        this.btnShare && (this.btnShare.active = d.Config.isShowShare);
        if (this.btnSuit) {
            var t = localcache.getList(localdb.table_usersuit);
            this.btnSuit.active = t && t.length > 0;
        }
        this.nodeRole && (this._orgNodeRoleX = this.nodeRole.x);
        this.updateCurClothe(r.playerProxy.userClothe);
        this.setRoleShow();
        this.onClickBack();
        this.updateScore();
        facade.subscribe(r.playerProxy.PLAYER_CLOTH_UPDATE, this.updateShow, this);
        facade.subscribe(r.playerProxy.PLAYER_RESET_JOB, this.setRoleShow, this);
        facade.subscribe(r.playerProxy.PLAYER_CLOTHE_SCORE, this.updateScore, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
        facade.subscribe("SHARE_SUCCESS", this.onShareShow, this);
        facade.subscribe("SHOP_BUY_ITEM_ID", this.onShopBuy, this);
        this.nodeInfo.active = !1;
        var e = this.node.openParam;
        e && e.tab && this.onClickItem(null, e.tab);
    },
    updateCurClothe(t) {
        this._body = t ? t.body: 0;
        this._head = t ? t.head: 0;
        this._ear = t ? t.ear: 0;
        this._bg = t ? t.background: 0;
        this._eff = t ? t.effect: 0;
        this._animal = t ? t.animal: 0;
        if (0 == this._body || 0 == this._head) {
            var e = localcache.getItem(localdb.table_officer, r.playerProxy.userData.level),
            o = localcache.getItem(localdb.table_roleSkin, e.shizhuang);
            0 == this._body && (this._body = r.playerProxy.getPartId(2, "body_0_" + o.body));
            0 == this._head && (this._head = r.playerProxy.getPartId(1, "headf_0_" + o.headf));
            0 == this._head && (this._head = r.playerProxy.getPartId(1, "headh_0_" + o.headh));
        }
        this._orgBody = this._body;
        this._orgHead = this._head;
        this._orgEar = this._ear;
        this._orgAnimal = this._animal;
        this._orgBg = this._bg;
        this._orgEff = this._eff;
    },
    updateScore() {
        this.lblScore && (this.lblScore.string = l.utils.formatMoney(r.playerProxy.clotheScore));
    },
    setRoleShow() {
        var t = r.playerProxy.userData,
        e = {};
        e.body = this._body;
        e.ear = this._ear;
        e.head = this._head;
        e.animal = this._animal;
        e.effect = this._eff;
        this.bgUrl.node.active = 0 != this._bg;
        if (0 != this._bg) {
            var o = localcache.getItem(localdb.table_userClothe, this._bg);
            o && (this.bgUrl.url = _.uiHelps.getStoryBg(o.model));
        }
        this.roleSpine.setClothes(t.sex, t.job, t.level, e);
    },
    onClickItem(t, e) {
        this.nodeList.active = !0;
        this.nodeTab.active = !1;
        this._curData = null;
        var o = parseInt(e);
        this.lblType.string = i18n.t(this.typeStrs[o]);
        this._curIndex = o;
        this.updateShow();
        for (var i = 0; i < this.btns.length; i++) this.btns[i].interactable = o - 1 != i;
        this.nodeInfo.active = null != this._curData;
        this.nodeUp.active = !0;
        this.nodeDown.active = !1;
        this.onClickRole(null, !0);
    },
    updateShow() {
        var t = localcache.getGroup(localdb.table_userClothe, "part", this._curIndex),
        e = [];
        this._curIndex > 2 && e.push({
            id: 0,
            name: i18n.t("USER_CLOTHE_DELECT"),
            part: this._curIndex
        });
        for (var o = 0; o < t.length; o++) {
            if (t[o].show_time && "0" != t[o].show_time) {
                if (l.timeUtil.str2Second(t[o].show_time) > l.timeUtil.second && !r.limitActivityProxy.isHaveTypeActive(t[o].show_avid)) continue;
            } else if (!r.limitActivityProxy.isHaveTypeActive(t[o].show_avid)) continue; (0 != t[o].display.length && -1 == t[o].display.indexOf(d.Config.pf)) || e.push(t[o]);
        }
        var i = {};
        e.sort(function(t, e) {
            null == i[t.id] && (i[t.id] = r.playerProxy.isUnlockCloth(t.id) ? 1 : 0);
            null == i[e.id] && (i[e.id] = r.playerProxy.isUnlockCloth(e.id) ? 1 : 0);
            var o = i[t.id],
            n = i[e.id];
            return o != n ? n - o: e.id - t.id;
        });
        var n = -1;
        for (o = 0; o < e.length; o++) 0 != e[o].id && ((e[o].id != this._body && e[o].id != this._ear && e[o].id != this._head && e[o].id != this._bg && e[o].id != this._eff && e[o].id != this._animal) || (n = o));
        this.list.data = e;
        this.list.selectIndex = n;
        this._curData = e[n];
        this.updateShowCurInfo();
    },
    updateShowCurInfo() {
        if (null != this._curData && 0 != this._curData.id) {
            var t = r.playerProxy.isUnlockCloth(this._curData.id);
            this.lblLock.string = this._curData.text;
            this.lblInfo.string = this._curData.des;
            this.btnLock.node.active = 0 != this._curData.unlock && null != this._curData.money.itemid;
            this.btnGo.node.active = !t && this._curData.iconopen && 0 != this._curData.iconopen;
            this.lblLimitTime.string = 0 != this._curData.limit ? i18n.t("USER_UNLOCK_TIME", {
                d: this._curData.limit
            }) : "";
            this.lblRemainTime.string = t && 0 != this._curData.limit ? i18n.t("USER_REMAIN_TIME", {
                d: l.timeUtil.second2hms(r.playerProxy.getRemainClotheTime(this._curData.id))
            }) : "";
        } else l.utils.showEffect(this.effectSprite, 1);
    },
    onClickClothe(t, e) {
        var o = e.data;
        if (o) {
            this.nodeUp.active = !1;
            this.nodeDown.active = !0;
            this.nodeInfo.active = !0;
            var i = r.playerProxy.isUnlockCloth(o.id);
            l.utils.showEffect(this.effectSprite, i ? 2 : 0);
            this._curData = o;
            this.updateShowCurInfo();
            switch (o.part) {
            case 1:
                this._head = o.id;
                break;
            case 2:
                this._body = o.id;
                break;
            case 3:
                this._ear = o.id;
                break;
            case 4:
                this._bg = o.id;
                break;
            case 5:
                this._eff = o.id;
                break;
            case 6:
                this._animal = o.id;
            }
            this.setRoleShow();
        }
    },
    isCanSave() {
        return ( !! r.playerProxy.isUnlockCloth(this._body) && ( !! r.playerProxy.isUnlockCloth(this._ear) && ( !! r.playerProxy.isUnlockCloth(this._head) && ( !! r.playerProxy.isUnlockCloth(this._bg) && ( !! r.playerProxy.isUnlockCloth(this._eff) && !!r.playerProxy.isUnlockCloth(this._animal))))));
    },
    checkBuyItem() {
        if (!this.isCanSave()) {
            l.alertUtil.alert18n("USER_SAVE_LOST");
            var t = [],
            e = !1;
            if (!this.checkAddClothe(this._body, t)) {
                this._body = this._orgBody;
                e = !0;
            }
            if (!this.checkAddClothe(this._head, t)) {
                this._head = this._orgHead;
                e = !0;
            }
            if (!this.checkAddClothe(this._ear, t)) {
                this._ear = this._orgEar;
                e = !0;
            }
            if (!this.checkAddClothe(this._animal, t)) {
                this._animal = this._orgAnimal;
                e = !0;
            }
            if (!this.checkAddClothe(this._bg, t)) {
                this._bg = this._orgBg;
                e = !0;
            }
            if (!this.checkAddClothe(this._eff, t)) {
                this._eff = this._orgEff;
                e = !0;
            }
            if (e) {
                l.alertUtil.alert18n("USER_CLOTHE_SAVE_NOT_BUY");
                this.setRoleShow();
                if (0 == t.length && (this._eff != this._orgEff || this._ear != this._orgEar || this._body != this._orgBody || this._bg != this._orgBg || this._animal != this._orgAnimal || this._head != this._orgHead)) return ! 0;
            }
            t.length > 0 && l.utils.openPrefabView("user/UserBuyMore", !1, t);
            return ! 1;
        }
        return ! 0;
    },
    checkAddClothe(t, e) {
        if (!r.playerProxy.isUnlockCloth(t)) {
            var o = localcache.getItem(localdb.table_userClothe, t);
            if (!o || (1 != o.unlock && 2 != o.unlock)) return ! 1;
            e.push(o);
            return ! 0;
        }
        return ! 0;
    },
    onClickSave() {
        if (this.checkBuyItem()) {
            this._orgBody = this._body;
            this._orgEar = this._ear;
            this._orgHead = this._head;
            this._orgAnimal = this._animal;
            this._orgBg = this._bg;
            this._orgEff = this._eff;
            r.playerProxy.sendCloth(this._head, this._body, this._ear, this._bg, this._eff, this._animal);
        }
    },
    onClickRecy() {
        this._body = this._orgBody;
        this._head = this._orgHead;
        this._ear = this._orgEar;
        this._animal = this._orgAnimal;
        this._bg = this._orgBg;
        this._eff = this._orgEff;
        this.setRoleShow();
    },
    onClickBack() {
        this.nodeList.active = !1;
        this.nodeTab.active = !0;
        this.nodeUp.active = !0;
        this.nodeDown.active = !1;
        if (null != this._curData) {
            var t = r.playerProxy.isUnlockCloth(this._curData.id);
            l.utils.showEffect(this.effectSprite, t ? 3 : 1);
            this._curData = null;
            this.nodeInfo.active = !1;
        }
    },
    onClickClost() {
        var t = this;
        if (this._orgBody == this._body && this._orgEar == this._ear && this._orgHead == this._head && this._orgBg == this._bg && this._orgEff == this._eff && this._orgAnimal == this._animal) l.utils.closeView(this, !0);
        else {
            if (!this.isCanSave()) {
                l.utils.closeView(this, !0);
                return;
            }
            t = this;
            l.utils.showConfirm(i18n.t("USER_CLOTHE_SAVE_CONFIRM"),
            function(e) {
                e != a.NO && r.playerProxy.sendCloth(t._head, t._body, t._ear, t._bg, t._eff, t._animal);
                l.utils.isOpenView("user/UserClothe") && l.utils.closeView(t, !0);
            },
            null, null, i18n.t("USER_CLOTHE_SAVE"), i18n.t("COMMON_NO"));
        }
    },
    onClickHideInfo() {
        var t = this.nodeDown.active;
        this.nodeDown.active = !t;
        this.nodeUp.active = t;
        var e = r.playerProxy.isUnlockCloth(this._curData.id);
        l.utils.showEffect(this.effectSprite, e ? (t ? 3 : 2) : t ? 1 : 0);
    },
    onClickUnlock(t) {
        void 0 === t && (t = !0);
        var e = this._curData,
        o = e.money ? e.money.itemid: 0,
        i = e.money ? e.money.count: 0,
        n = r.bagProxy.getItemCount(o);
        if (!t && n >= i && !r.playerProxy.isUnlockCloth(e.id)) r.playerProxy.sendUnlockCloth(e.id);
        else {
            if (1 == e.unlock && 0 != i) {
                var a = localcache.getItem(localdb.table_officer, e.para);
                l.utils.showConfirmItem(i18n.t("USER_CLOTHE_BUY_MAIN", {
                    n: a.name,
                    v: i,
                    iname: r.playerProxy.getKindIdName(1, o)
                }), o, n,
                function() {
                    n < i ? l.alertUtil.alertItemLimit(o, i - n) : r.playerProxy.sendUnlockCloth(e.id);
                },
                "USER_CLOTHE_BUY_MAIN");
            }
            2 == e.unlock && 0 != i && l.utils.showConfirmItem(i18n.t("USER_CLOTHE_BUY", {
                v: i,
                n: r.playerProxy.getKindIdName(1, o)
            }), o, n,
            function() {
                n < i ? l.alertUtil.alertItemLimit(o, i - n) : r.playerProxy.sendUnlockCloth(e.id);
            },
            "USER_CLOTHE_BUY");
        }
    },
    onClickRank() {
        r.rankProxy.sendClotheRank();
    },
    onClickResetJob() {
        l.utils.openPrefabView("user/UserJob");
    },
    onClickShare() {
        this.nodeTop.active = this.nodeRight.active = this.nodeBot.active = !1;
        this.nodeShare && (this.nodeShare.active = !0);
        this.scheduleOnce(this.delayShare, 0.1);
    },
    onClickGo() {
        var t = this._curData;
        0 != t.iconopen && u.funUtils.openView(t.iconopen);
    },
    delayShare() {
        s.apiUtils.share_game("clothe");
    },
    onShareShow() {
        this.nodeTop.active = this.nodeRight.active = this.nodeBot.active = !0;
        this.nodeShare && (this.nodeShare.active = !1);
    },
    onClickSuit() {
        l.utils.openPrefabView("user/UserSuit");
    },
    onShopBuy(t) {
        this._curData && this.onClickUnlock(!1);
    },
    onClickRole(t, e) {
        if (null != this.nodeRole && (null == e || 1 != e || 0 == this.nodeRole.x)) if (0 == this.nodeRole.x) {
            l.utils.showNodeEffect(this.nodeRight, 0);
            l.utils.showNodeEffect(this.nodeRole, 0);
        } else if (this.nodeRole.x == this._orgNodeRoleX) {
            l.utils.showNodeEffect(this.nodeRight, 1);
            l.utils.showNodeEffect(this.nodeRole, 1);
        }
    },
});
