var i = require("../utils/Utils");
var n = require("../Initializer");
var l = require("../component/RedDot");
var UnionProxy = function() {

    this.memberInfo = null;
    this.clubInfo = null;
    this.clubList = null;
    this.lookClubInfo = null;
    this.applyList = null;
    this.transList = null;
    this.shopList = null;
    this.bossInfo = null;
    this.fightRank = null;
    this.myFightRankInfo = null;
    this.myClubRank = null;
    this.bossFtList = null;
    this.heroLog = null;
    this.clubLog = null;
    this.dialogParam = null;
    this.changePosParam = null;
    this.openCopyParam = null;
    this.curSelectId = 0;
    this.fighting = !1;

    this.ctor = function() {
        JsonHttp.subscribe(proto_sc.club.clubList, this.onClubList, this);
        JsonHttp.subscribe(proto_sc.club.clubInfo, this.onClubInfo, this);
        JsonHttp.subscribe(proto_sc.club.shopList, this.onShopList, this);
        JsonHttp.subscribe(proto_sc.club.applyList, this.onApplyList, this);
        JsonHttp.subscribe(proto_sc.club.bossInfo, this.onBossInfo, this);
        JsonHttp.subscribe(proto_sc.club.bossft, this.onBossFg, this);
        JsonHttp.subscribe(proto_sc.club.clubLog, this.onClubLog, this);
        JsonHttp.subscribe(proto_sc.club.transInfo, this.onTransInfo, this);
        JsonHttp.subscribe(
            proto_sc.club.memberInfo,
            this.onMemberInfo,
            this
        );
        JsonHttp.subscribe(proto_sc.club.win, this.onWin, this);
        JsonHttp.subscribe(proto_sc.club.uidLog, this.onUidLog, this);
        JsonHttp.subscribe(proto_sc.club.myClubRid, this.onClubRank, this);
        JsonHttp.subscribe(proto_sc.club.heroLog, this.onHeroLog, this);
    };
    this.clearData = function() {
        this.memberInfo = null;
        this.clubInfo = null;
        this.clubList = null;
        this.lookClubInfo = null;
        this.applyList = null;
        this.transList = null;
        this.shopList = null;
        this.bossInfo = null;
        this.fightRank = null;
        this.myFightRankInfo = null;
        this.myClubRank = null;
        this.dialogParam = null;
        this.changePosParam = null;
        this.openCopyParam = null;
        this.bossFtList = null;
        this.curSelectId = 0;
        this.heroLog = null;
        this.clubLog = null;
        l.change("unionCopy", !1);
        l.change("unionApply", !1);
    };
    this.onWin = function(t) {
        i.utils.openPrefabView("union/UnionCopyWindow", null, t);
    };
    this.onHeroLog = function(t) {
        this.heroLog = t;
        this.heroLog.sort(this.sortHeroLog);
        facade.send("UNION_RECORD_UPDATE");
    };
    this.sortHeroLog = function(t, e) {
        return e.time - t.time;
    };
    this.onClubLog = function(t) {
        this.clubLog = t;
        this.clubLog.sort(this.sortHeroLog);
        facade.send("UNION_CLUB_LOG_UPDATE");
    };
    this.onBossFg = function(t) {
        this.bossFtList = t;
        facade.send("UNION_FT_LIST_UPDATE");
    };
    this.onUidLog = function(t) {
        this.fightRank = t;
        for (var e = 0; e < t.list.length; e++) {
            t.list[e].rid = e + 1;
            t.list[e].uid == n.playerProxy.userData.uid &&
                (this.myFightRankInfo = t.list[e]);
        }
        if (null == this.myFightRankInfo) {
            var o = {};
            o.name = n.playerProxy.userData.name;
            o.hit = 0;
            o.rid = 0;
            o.gx = 0;
            this.myFightRankInfo = o;
        }
    };
    this.onBossInfo = function(t) {
        this.bossInfo = t;
        this.updateCopyRed();
        facade.send("UPDATE_BOSS_INFO");
    };
    this.updateCopyRed = function() {
        var t = !1,
            e = this.bossInfo;
        if (e && e.length > 0)
            for (var o = 0; o < e.length; o++)
                if (0 != e[o].id && 1 == e[o].type) {
                    t = !0;
                    break;
                }
        var n =
            i.timeUtil.second > i.timeUtil.getTodaySecond(0) &&
            i.timeUtil.second < i.timeUtil.getTodaySecond(23.5);
        l.change("unionCopy", t && n);
    };
    this.onMemberInfo = function(t) {
        this.memberInfo = t;
        0 == t.cid && l.change("unionCopy", !1);
        facade.send("UPDATE_MEMBER_INFO");
    };
    this.onClubInfo = function(t) {
        this.clubInfo = t;
        facade.send("UPDATE_SEARCH_INFO");
    };
    this.onClubList = function(t) {
        this.clubList = t;
        if (this.clubInfo)
            for (var e = 0; e < this.clubList.length; e++)
                if (this.clubList[e].id == this.clubInfo.id) {
                    this.lookClubInfo = this.clubList[e];
                    break;
                }
        facade.send("UPDATE_CLUB_RANK");
    };
    this.onApplyList = function(t) {
        this.applyList = t;
        var e = t ? t.length : 0;
        l.change("unionApply", e > 0);
        facade.send("UPDATE_APPLY_LIST");
    };
    this.onTransInfo = function(t) {
        this.transList = t;
        facade.send("UPDATE_TRANS_LIST");
    };
    this.onClubRank = function(t) {
        this.myClubRank = t;
        facade.send("UPDATE_MY_RANK");
    };
    this.onShopList = function(t) {
        this.shopList = t;
        facade.send("UPDATE_SHOP_LIST");
    };
    this.sendTran = function(t, e) {
        var o = new proto_cs.club.transWang();
        o.fuid = e;
        o.password = t;
        JsonHttp.send(o);
    };
    this.sendSearchUnion = function(t) {
        var e = new proto_cs.club.clubFind();
        e.cid = t;
        JsonHttp.send(e);
    };
    this.sendAllowRandomJoin = function(t) {
        var e = new proto_cs.club.isJoin();
        e.join = t;
        JsonHttp.send(e);
    };
    this.sendReject = function(t) {
        void 0 === t && (t = 0);
        var e = new proto_cs.club.noJoin();
        e.fuid = t;
        JsonHttp.send(e);
    };
    this.sendApplyJoin = function(t) {
        var e = new proto_cs.club.yesJoin();
        e.fuid = t;
        JsonHttp.send(e);
    };
    this.sendInfoMod = function(t, e, o, i) {
        var n = new proto_cs.club.clubInfoSave();
        n.qq = t;
        n.laoma = e;
        n.notice = o;
        n.outmsg = i;
        JsonHttp.send(n);
    };
    this.sendJiesan = function(t) {
        var e = new proto_cs.club.delClub();
        e.password = t;
        JsonHttp.send(e, function() {
            i.utils.closeNameView("union/UnionMain");
            n.chatProxy.clubMsg = [];
        });
    };
    this.sendModifyName = function(t, e) {
        var o = new proto_cs.club.clubName();
        o.name = t;
        o.type = e;
        var n = this;
        JsonHttp.send(o, function() {
            n.clubInfo.name == t &&
                i.alertUtil.alert18n("UNION_CHANGE_SUCCESS");
        });
    };
    this.sendCovert = function(t) {
        var e = new proto_cs.club.shopBuy();
        e.id = t;
        JsonHttp.send(e, function() {
            facade.send("UNION_SHOP_UPDATE");
            n.timeProxy.floatReward();
        });
    };
    this.sendChangePos = function(t, e) {
        var o = new proto_cs.club.memberPost();
        o.fuid = t;
        o.postid = e;
        var n = this.changePosParam;
        JsonHttp.send(o, function(t) {
            1 == t.s &&
                i.alertUtil.alert("union_change_tip" + e, {
                    name: n.name
                });
        });
    };
    this.sendReqOpen = function(t, e) {
        var o = new proto_cs.club.clubBossOpen();
        o.cbid = t;
        o.type = e;
        JsonHttp.send(o, function() {
            facade.send("UNION_OPEN_COPY_RESULT");
        });
    };
    this.sendBuild = function(t) {
        var e = new proto_cs.club.dayGongXian();
        e.dcid = t;
        JsonHttp.send(e, function(e) {
            if (1 == e.s) {
                var o = localcache.getItem(localdb.table_construction, t);
                i.alertUtil.alert(
                    i18n.t("UNION_EXP_TXT_2") + "+" + o.get.exp
                );
                i.alertUtil.alert(
                    i18n.t("UNION_MONEY_TXT_2") + "+" + o.get.fund
                );
                i.alertUtil.alert(
                    i18n.t("UNION_GE_REN_GONG_XIAN_2", {
                        num: o.get.gx
                    })
                );
            }
        });
    };
    this.sendHitList = function(t) {
        var e = new proto_cs.club.clubBossHitList();
        e.id = t;
        JsonHttp.send(e, function() {
            i.utils.openPrefabView("union/UnionHurtRank");
        });
    };
    this.sendTranList = function() {
        var t = new proto_cs.club.transList();
        JsonHttp.send(t);
    };
    this.sendApplyUnion = function(t) {
        var e = this,
            o = new proto_cs.club.clubApply();
        o.cid = t;
        JsonHttp.send(o, function() {
            if (e.memberInfo && 0 != e.memberInfo.cid) {
                i.utils.isOpenView("union/UnionView") &&
                    i.utils.closeNameView("union/UnionView");
                i.utils.isOpenView("union/UnionInfo") &&
                    i.utils.closeNameView("union/UnionInfo");
                i.utils.isOpenView("union/UnionSearch") &&
                    i.utils.closeNameView("union/UnionSearch");
                i.utils.isOpenView("union/UnionRank") &&
                    i.utils.closeNameView("union/UnionRank");
                i.utils.openPrefabView("union/UnionMain");
            }
        });
    };
    this.sendCreateUnion = function(t, e, o, i, l, r) {
        var a = new proto_cs.club.clubCreate();
        a.isJoin = r ? 1 : 0;
        a.laoma = o;
        a.name = t;
        a.outmsg = l;
        a.qq = e;
        a.password = i;
        var s = this;
        JsonHttp.send(a, function() {
            s.enterUnion();
            n.chatProxy.sendChat(i18n.t("SYS_HELLO_CHAT"), 1);
        });
    };
    this.sendOut = function() {
        var t = this;
        JsonHttp.send(new proto_cs.club.outClub(), function() {
            t.enterUnion();
            n.chatProxy.clubMsg = [];
        });
        1 != this.memberInfo.post && (this.clubInfo = null);
    };
    this.sendRankList = function(t) {
        var e = new proto_cs.club.clubList();
        e.cid = t;
        JsonHttp.send(e, function() {
            i.utils.openPrefabView("union/UnionRank");
        });
    };
    this.sendRandomAdd = function() {
        var t = new proto_cs.club.clubRand(),
            e = this;
        JsonHttp.send(t, function() {
            e.enterUnion();
        });
    };
    this.sendShopList = function() {
        var t = new proto_cs.club.shopList();
        JsonHttp.send(t, function() {
            i.utils.openPrefabView("union/UnionConvert");
        });
    };
    this.sendBossList = function() {
        var t = new proto_cs.club.clubBossInfo();
        JsonHttp.send(t, function() {
            i.utils.openPrefabView("union/UnionCopy");
        });
    };
    this.sendHeroFuhuo = function(t) {
        var e = new proto_cs.club.clubHeroCone();
        e.id = t;
        JsonHttp.send(e, function(t) {
            1 == t.s && i.alertUtil.alert18n("UNION_FU_HUO_SUCCESS");
        });
    };
    this.sendFightBoss = function(t, e) {
        var o = new proto_cs.club.clubBossPK();
        o.cbid = t;
        o.id = e;
        JsonHttp.send(o);
    };
    this.sendApplyList = function() {
        JsonHttp.send(new proto_cs.club.applyList());
    };
    this.sendGetMemberInfo = function(t) {
        var e = new proto_cs.club.clubMemberInfo();
        e.cid = t;
        JsonHttp.send(e);
    };
    this.sendGetBossRecord = function(t) {
        var e = new proto_cs.club.clubBossPKLog();
        e.cbid = t;
        JsonHttp.send(e);
    };
    this.enterUnion = function() {
        if (this.memberInfo && this.memberInfo.cid > 0) {
            i.utils.openPrefabView("union/UnionMain");
            facade.send("UNION_CREATE_SUCESS");
        } else i.utils.openPrefabView("union/UnionView");
    };
    this.getMengzhu = function(t) {
        for (var e = 0; e < t.length; e++) if (1 == t[e].post) return t[e];
        return null;
    };
    this.getUnionLvMaxCount = function(t) {
        var e = this.getUnionData(t);
        return e ? e.maxMember : 0;
    };
    this.getUnionLvExp = function(t) {
        for (var e = 0, o = 1; o < t + 1; o++) {
            var i = this.getUnionData(o);
            e += i ? i.exp : 0;
        }
        return e;
    };
    this.getUnionData = function(t) {
        return localcache.getItem(localdb.table_union, t);
    };
    this.getPostNum = function(t) {
        var e = 0;
        if (null == this.clubInfo) return 0;
        var o = this.clubInfo.members;
        if (0 == o.length) return 0;
        for (var i = 0; i < o.length; i++) o[i].post == t && e++;
        return e;
    };
    this.getPostion = function(t) {
        return i18n.t("union_pos" + t);
    };
    this.getAllShili = function(t) {
        for (var e = 0, o = 0; o < t.length; o++)
            e += t[o] ? t[o].shili : 0;
        return e;
    };
    this.getHeroFightData = function(t) {
        for (var e = null, o = 0; o < this.bossFtList.length; o++)
            if (this.bossFtList[o].id == t) {
                e = this.bossFtList[o];
                break;
            }
        return e;
    };
    this.getClubLog = function(t) {
        var e = "";
        switch (t.type) {
            case 1:
                var o = localcache.getItem(
                    localdb.table_construction,
                    t.num1
                );
                e = i18n.t("UNION_JIN_XING_YI_CI", {
                    str: o.msg,
                    exp: o.get.exp,
                    rich: o.get.fund,
                    gx: o.get.gx
                });
                break;

            case 2:
                e = i18n.t("UNION_GENG_GAI_GONG_GAO");
                break;

            case 3:
                var i = localcache.getItem(localdb.table_unionBoss, t.num1);
                e = i18n.t("UNION_JI_SHA_LE", {
                    name: i.name,
                    exp: i.rwd.exp
                });
                break;

            case 4:
                var n = localcache.getItem(localdb.table_unionBoss, t.num1);
                e = i18n.t("UNION_KAI_QI_FU_BEN_TXT", {
                    name: n.name
                });
                break;

            case 5:
                var l = this.getPostion(t.num2);
                e = i18n.t("UNION_ZHI_WEI_BIAN_GENG", {
                    name1: t.name,
                    name2: l
                });
                break;

            case 6:
                e = i18n.t("UNION_GENG_GAI_MING_ZI");
                break;

            case 7:
                e = i18n.t("UNION_ZHU_CHU_LIAN_MENG", {
                    name: t.name
                });
                break;

            case 8:
                e = i18n.t("UNION_GONG_DIAN_SHENG_JI", {
                    num: t.num1
                });
                break;

            case 9:
                e = i18n.t("UNION_JIA_RU_TXT");
                break;

            case 10:
                e = i18n.t("UNION_LI_KAI_GONG_DIAN");
                break;

            case 11:
                e = i18n.t("UNION_JIA_RU_TXT");
        }
        return e;
    };
}
exports.UnionProxy = UnionProxy;
