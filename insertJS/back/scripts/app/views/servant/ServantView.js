var i = require("../../utils/Utils");
var n = require("../../component/List");
var l = require("./ServantTalent");
var r = require("../../Initializer");
var a = require("../../component/UrlLoad");
var s = require("../../utils/UIUtils");
var c = require("../../component/JiBanShow");
var _ = require("../../models/PlayerProxy");
var d = require("./ServantStarShow");
var u = require("../../component/LangSprite");
cc.Class({
    extends: cc.Component,
    properties: {
        prg: cc.ProgressBar,
        lblExp: cc.Label,
        lblLv: cc.Label,
        lblName: cc.Label,
        lblEps: [cc.Label],
        tabs: [cc.Button],
        items: [cc.Node],
        nodeUp: cc.Node,
        imgSpe1: a,
        imgSpe2: a,
        sFrame: [cc.SpriteFrame],
        servantShow: a,
        aniLv: cc.Animation,
        tanlent: l,
        btnJiban: cc.Node,
        lblShiLi: cc.Label,
        btnNode: cc.Node,
        btnLvUp: cc.Node,
        btnTiBa: cc.Node,
        tanlentNode: cc.Node,
        skillNode: cc.Node,
        skillList: n,
        skillGhList: n,
        lblBtns: [cc.Label],
        luckImg: c,
        proNode: cc.Node,
        nodeHeroShow: cc.Node,
        check: cc.Toggle,
        lblJbValue: cc.Label,
        spine: u,
        lblYueli: cc.Label,
        lblGold: cc.Label,
        lblSkillName: cc.Label,
        starShow: d,
        btnLeft: cc.Node,
        btnRight: cc.Node,
        lblTotalZZ: cc.Label,
        redLv: cc.Node,
        redTanlent: cc.Node,
        redSkill: cc.Node,
        talkNode: cc.Node,
        lblTalk: cc.Label,
        btnZhiji: cc.Node,
        tablentScroll: cc.ScrollView,
        btnLeader: cc.Node,
        btnHZ: cc.Node,
        lblLeadPro: cc.Label,
        lblLeadLv: cc.Label,
    },
    ctor() {
        this.lastData = new _.RoleData();
        this.tabIndex = "1";
        this._curHero = null;
        this._curIndex = 0;
        this._oldHeroLv = 0;
        this.voiceSys = null;
    },
    onLoad() {
        var t = this;
        facade.subscribe(r.playerProxy.PLAYER_USER_UPDATE, this.onResUpdate, this);
        facade.subscribe("PLAYER_HERO_SHOW", this.onHeroShow, this);
        facade.subscribe(r.servantProxy.SERVANT_TALK_TDA, this.talkData, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
        facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onClickRight, this);
        facade.subscribe("UPDATE_HERO_JB", this.onJibanUpdate, this);
        s.uiUtils.scaleRepeat(this.btnLeft, 0.9, 1.2);
        s.uiUtils.scaleRepeat(this.btnRight, 0.9, 1.2);
        this.skillList.selectHandle = function(e) {
            var o = e;
            o && i.utils.openPrefabView("servant/ServantSkillUp", null, {
                _skill: o,
                _hero: t._curHero
            });
        };
        r.servantProxy.sortServantList();
        var e = this.node.openParam,
        o = e.hero,
        n = e.tab;
        if (o) {
            var l = r.servantProxy.getHeroData(o.heroid);
            this._curHero = l;
            this._curIndex = r.servantProxy.servantList.indexOf(l);
            this._oldHeroLv = this._curHero.level;
        }
        this.showData();
        this.onClickTab(null, n);
        this.btnNode.active = r.servantProxy.servantList.length > 1;
        facade.subscribe("SERVANT_UP", this.updateServant, this);
        this.updateServant();
        this.nodeHeroShow.active = this._curHero.id != r.playerProxy.heroShow;
        this.servantShow.url = s.uiHelps.getServantSpine(this._curHero.id);
        this.starShow.setValue(o.star);
        this.onPlayVoice(null, null);
        this.onResUpdate();
        this.check.isChecked = r.servantProxy.isLevelupTen;
        e.isTrain && this.onClickTran();
        localcache.getGroup(localdb.table_heroClothe, "heroid", this._curHero.id);
    },
    onClost() {
        r.servantProxy.curSelectId = 0;
        i.audioManager.playSound("", !0);
        i.utils.closeView(this, !0);
        r.servantProxy.isRenMaiOpen && (r.servantProxy.isRenMaiOpen = !1);
    },
    onBack() {
        r.servantProxy.curSelectId = 0;
        i.audioManager.playSound("", !0);
        i.utils.closeView(this);
        r.servantProxy.isRenMaiOpen ? (r.servantProxy.isRenMaiOpen = !1) : i.utils.openPrefabView("servant/ServantListView");
    },
    onClickUp() {
        if (this._curHero) {
            var t = localcache.getItem(localdb.table_heroLvUp, this._curHero.level + "");
            t && (t.cost, this._curHero.exp);
            if (this._curHero.level >= 400) {
                i.alertUtil.alert("门客等级上限");
                return;
            }
            if (0 == r.playerProxy.userData.coin) {
                i.alertUtil.alertItemLimit(2);
                return;
            }
            this.check.isChecked ? r.servantProxy.sendLvUpTen(this._curHero.id) : r.servantProxy.sendLvUp(this._curHero.id);
        }
    },
    onHideSpine() {
        this.spine.setActive = !1;
    },
    onClickAdd(t, e) {
        i.utils.openPrefabView("");
    },
    onClickJiBan() {
        i.utils.openPrefabView("jiban/JibanDetailView", !1, {
            heroid: this._curHero.id
        });
    },
    onClickTab(t, e) {
        var o = parseInt(e) - 1;
        this.tabIndex = e;
        0 == o ? this.tanlent.updateShow(this._curHero) : 1 == o && (this.skillList.data = this._curHero.pkskill);
        for (var i = 0; i < this.tabs.length; i++) this.tabs[i].interactable = i != o;
        this.tanlentNode.active = "1" == e;
        this.skillNode.active = "2" == e;
        this.proNode.active = "4" == e;
        this.nodeHeroShow.active = this._curHero.id != r.playerProxy.heroShow;
        "1" == e && this.tablentScroll.scrollToLeft();
    },
    updateServant() {
        var t = this;
        this._curHero = r.servantProxy.servantList[this._curIndex];
        var e = localcache.getItem(localdb.table_nobility, this._curHero.senior),
        o = localcache.getItem(localdb.table_nobility, this._curHero.senior + 1);
        this.btnLvUp.active = this._curHero.level < e.max_level;
        this.btnTiBa.active = this._curHero.level == e.max_level && r.playerProxy.userData.level >= e.player_level && null != o;
        this.showData();
        this.skillList.data = this._curHero.pkskill;
        if (this._oldHeroLv < this._curHero.level) {
            var n = this;
            s.uiUtils.showPrgChange(this.prg, 0, 1, 1, 10,
            function() {
                n.prg.progress = 0;
                t.spine.animation = "animation";
                t.spine.setActive = !0;
                t.scheduleOnce(t.onHideSpine, 2);
                i.audioManager.playSound("levelup", !0, !0);
            });
        }
        this._oldHeroLv = this._curHero.level;
        this.redLv.active = r.servantProxy.getLevelUp(this._curHero);
        this.redTanlent.active = r.servantProxy.getTanlentUp(this._curHero);
        this.redSkill.active = r.servantProxy.getSkillUp(this._curHero);
        this.onJibanUpdate();
    },
    onJibanUpdate() {
        var t = r.jibanProxy.getHeroJbLv(this._curHero.id).level % 1e3,
        e = r.jibanProxy.getHeroNextJb(this._curHero.id, t);
        this.luckImg.setValue(5, t);
        var o = r.jibanProxy.getHeroJbLv(this._curHero.id),
        i = t > 1 ? " (" + i18n.t("COMMON_PROP5") + "+" + o.prop / 100 + "%)": "";
        this.lblJbValue.string = null == e ? i: r.jibanProxy.getHeroJB(this._curHero.id) + "/" + (e ? e.yoke: "") + i;
    },
    showData() {
        var t = localcache.getItem(localdb.table_hero, this._curHero.id + ""),
        e = localcache.getItem(localdb.table_heroLvUp, this._curHero.level + "");
        r.jibanProxy.getJibanType(1, this._curHero.id);
        if (t) {
            this.lblName.string = t.name;
            t.spec;
            var o = t.spec[0];
            this.imgSpe1.url = s.uiHelps.getLangSp(o);
            this.imgSpe2.node.active = t.spec.length > 1;
            if (t.spec.length > 1) {
                o = t.spec[1];
                this.imgSpe2.url = s.uiHelps.getLangSp(o);
            }
        }
        for (var n = 0,
        l = 0; l < this.lblEps.length; l++) {
            var a = l + 1;
            n += this._curHero.aep["e" + a];
            this.lblEps[l].string = this._curHero.aep["e" + a];
        }
        var c = e ? e.cost - this._curHero.exp: 0;
        this.lblExp.string = 0 != c ? i18n.t("SERVANT_UP_NEED", {
            exp: i.utils.formatMoney(c)
        }) : i18n.t("SERVANT_LV_MAX");
        this.prg.progress = e ? this._curHero.exp / e.cost: 1;
        this.lblLv.string = i18n.t("COMMON_LV", {
            lv: this._curHero.level
        });
        this.lblShiLi.string = i18n.t("RANK_SHILI_TIP") + " " + n;
        var _ = this._curHero.zz.e1 + this._curHero.zz.e2 + this._curHero.zz.e3 + this._curHero.zz.e4;
        this.lblTotalZZ.string = i18n.t("SERVANT_PROP_TOTAL", {
            value: _
        });
        r.servantProxy.curSelectId = this._curHero.id;
        var d = localcache.getGroup(localdb.table_wifeSkill, "heroid", this._curHero.id);
        this.btnZhiji.active = d && d.length > 0;
        this.btnLeader.active = 0 != t.leaderid;
        var u = r.servantProxy.getLeadLv(t.heroid, this._curHero.leadlv);
        if (u) {
            this.lblLeadPro.string = "+" + u.ep;
            this.lblLeadLv.string = i18n.t("LEADER_LEVEL_TXT", {
                num: u.id % 1e3
            });
        } else {
            this.lblLeadPro.string = "+0";
            this.lblLeadLv.string = i18n.t("LEADER_NO_JI_HUO");
        }
    },
    onClickLeft(t) {
        t < 300 || this.showClickData( - 1);
    },
    onClickRight(t) {
        t < 300 || this.showClickData(1);
    },
    showClickData(t) {
        this._curIndex += t;
        this._curIndex = this._curIndex < 0 ? r.servantProxy.servantList.length - 1 : this._curIndex;
        this._curIndex = this._curIndex > r.servantProxy.servantList.length - 1 ? 0 : this._curIndex;
        this._curHero = r.servantProxy.servantList[this._curIndex];
        this._oldHeroLv = this._curHero.level;
        this.servantShow.url = s.uiHelps.getServantSpine(this._curHero.id);
        var e = localcache.getItem(localdb.table_hero, this._curHero.id);
        this.starShow.setValue(e.star);
        this.showData();
        this.updateServant();
        this.onClickTab(null, this.tabIndex);
        this.onPlayVoice(null, null);
        localcache.getGroup(localdb.table_heroClothe, "heroid", this._curHero.id);
    },
    onClickTiBa() {
        i.utils.openPrefabView("servant/ServantAdvance", null, this._curHero);
    },
    onClickTran() {
        i.utils.openPrefabView("servant/ServantTrainView", null, this._curHero);
    },
    onClickSetHero() {
        if (this._curHero) {
            if (r.xianyunProxy.isXianYun(this._curHero.id)) {
                i.alertUtil.alert18n("XIAN_YUN_ZHENG_ZAI_DU_JIA");
                return;
            }
            r.playerProxy.sendHeroShow(this._curHero.id);
            var t = localcache.getItem(localdb.table_hero, this._curHero.id);
            i.alertUtil.alert(i18n.t("SERVANT_GUAN_SHI", {
                name: t.name
            }));
        }
    },
    onPlayVoice(t, e) {
        if ("1" != e || !i.audioManager.isPlayLastSound()) {
            this.voiceSys = r.voiceProxy.randomHeroVoice(this._curHero.id);
            this.talkNode.active = !0;
            if (this.voiceSys) {
                this.lblTalk.string = this.voiceSys.herotext;
                i.audioManager.playSound("servant/" + this.voiceSys.herovoice, !0, !0);
            }
        }
    },
    onResUpdate() {
        s.uiUtils.showNumChange(this.lblYueli, this.lastData.coin, r.playerProxy.userData.coin);
        s.uiUtils.showNumChange(this.lblGold, this.lastData.cash, r.playerProxy.userData.cash);
        this.lastData.coin = r.playerProxy.userData.coin;
        this.lastData.cash = r.playerProxy.userData.cash;
    },
    onClickZhuanJi() {
        i.utils.openPrefabView("servant/ServantZhuanJi", null, this._curHero);
    },
    onClickZhiJi() {
        var t = localcache.getGroup(localdb.table_wifeSkill, "heroid", this._curHero.id)[0].wid,
        e = r.wifeProxy.getWifeData(t);
        if (null != e) 0 != e.skill.length ? i.utils.openPrefabView("servant/ServantZhiJiSkill", null, e) : i.alertUtil.alert(i18n.t("SERVANT_WITHOUT_WIFE"));
        else {
            var o = localcache.getItem(localdb.table_wife, t);
            i.alertUtil.alert(i18n.t("SERVANT_WITHOUT_NAME", {
                name: o.wname2
            }));
            i.utils.openPrefabView("wife/WifeInfo", !1, o);
        }
    },
    onHeroShow() {
        this.nodeHeroShow.active = this._curHero.id != r.playerProxy.heroShow;
    },
    onClickGift() {
        i.utils.openPrefabView("servant/ServantGiftView");
    },
    onClickCheck() {
        r.servantProxy.isLevelupTen = this.check.isChecked;
    },
    onClickTalk() {
        r.servantProxy.sendHeroTalk(this._curHero.id);
    },
    talkData(t) {
        if (t) if (0 == t.chatType) this.onPlayVoice(null, null);
        else {
            r.playerProxy.addStoryId(t.stroyid);
            i.utils.openPrefabView("StoryView", !1, {
                heroid: this._curHero.id,
                type: 4,
                talkType: 1
            });
        }
    },
    onClickDetail() {
        i.utils.openPrefabView("servant/ServantProDetail", null, this._curHero);
    },
    onClickLeader() {
        i.utils.openPrefabView("servant/ServantLeader", null, this._curHero);
    },
    onClickHuanZhuang() {
        i.utils.openPrefabView("servant/ServantHuanZhuang", null, this._curHero);
    },
});
