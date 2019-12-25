var i = require("../utils/Utils");
var n = require("../Initializer");
var l = require("../component/RedDot");
var ServantProxy = function() {

    this.servantList = [];
    this.servantMap = new Map();
    this.curServantList = [];
    this.heroStoryList = null;
    this.isRenMaiOpen = !1;
    this.isLevelupTen = !1;
    this.nobility = null;
    this.skin = null;
    this.needItemNum = null;
    this.SERVANT_TALK_TDA = "SERVANT_TALK_TDA";
    this.SERVANT_UP = "SERVANT_UP";

    this.ctor = function() {
        JsonHttp.subscribe(proto_sc.hero.heroList, this.onHeroList, this);
        JsonHttp.subscribe(proto_sc.hero.heroChat, this.onHeroChat, this);
        JsonHttp.subscribe(proto_sc.hero.skin, this.onHeroSkin, this);
    };
    this.clearData = function() {
        this.curSelectId = 0;
        this.heroStoryList = null;
        this.servantList = [];
        this.servantMap = new Map();
        this.curServantList = [];
        this.isLevelupTen = !1;
        this.skin = null;
    };
    this.onHeroList = function(t) {
        if (null == this.servantList) {
            this.servantList = [];
            this.servantMap = new Map();
        }
        for (var e = !1, o = 0; o < t.length; o++) {
            var n = t[o];
            if (n) {
                this.servantMap[n.id] = n;
                e ||
                    (e =
                        this.getLevelUp(t[o]) ||
                        this.getTanlentUp(t[o]) ||
                        this.getSkillUp(t[o]));
            }
        }
        l.change("servant", e);
        i.utils.copyData(this.servantList, t);
        facade.send("SERVANT_UP");
        facade.send("PLAYER_USER_UPDATE");
    };
    this.onHeroChat = function(t) {
        facade.send(this.SERVANT_TALK_TDA, t);
    };
    this.onHeroSkin = function(t) {
        this.skin = t;
        facade.send("SERVANT_CHUANZHUANG");
    };
    this.getAllHeroEp = function(t) {
        for (var e = 0, o = 0; o < this.servantList.length; o++)
            e += this.servantList[o].aep["e" + t];
        return e;
    };
    this.sendUpSenior = function(t) {
        var e = new proto_cs.hero.upsenior();
        e.id = t;
        JsonHttp.send(e, function() {
            i.utils.openPrefabView("servant/ServantAdvanceWindow");
        });
    };
    this.sendUpPkSkill = function(t, e) {
        var o = new proto_cs.hero.uppkskill();
        o.id = t;
        o.sid = e;
        JsonHttp.send(o, function() {
            facade.send("SERVANT_SKILL_UP");
        });
    };
    this.sortServantList = function() {
        this.servantList.sort(function(t, e) {
            if (null == t || null == e) return 1;
            var o = t.zz.e1 + t.zz.e2 + t.zz.e3 + t.zz.e4,
                i = e.zz.e1 + e.zz.e2 + e.zz.e3 + e.zz.e4;
            return o != i ? i - o : t.id - e.id;
        });
    };
    this.sendLvUp = function(t) {
        var e = new proto_cs.hero.upgrade();
        e.id = t;
        JsonHttp.send(e, function() {
            facade.send("SERVANT_LV_UP");
        });
    };
    this.sendUpZzSkill = function(t, e, o) {
        var i = new proto_cs.hero.upzzskill();
        i.id = t;
        i.sid = e;
        i.type = o;
        JsonHttp.send(i);
    };
    this.sendLvUpTen = function(t) {
        var e = new proto_cs.hero.upgradeTen();
        e.id = t;
        JsonHttp.send(e, function() {
            facade.send("SERVANT_LV_UP");
        });
    };
    this.sendHz = function(t, e) {
        var o = new proto_cs.hero.heroDress();
        o.hid = t;
        o.id = e;
        JsonHttp.send(o);
    };
    this.sendHeroGift = function(t, e, o) {
        var i = new proto_cs.hero.giveGift();
        i.id = t;
        i.gid = e;
        i.num = o;
        JsonHttp.send(i);
    };
    this.sendHeroTalk = function(t) {
        var e = new proto_cs.hero.hchat();
        e.id = t;
        JsonHttp.send(e);
    };
    this.sendLeaderUp = function(t) {
        var e = new proto_cs.hero.upcharisma();
        e.id = t;
        JsonHttp.send(e);
    };
    this.isHaveServantLv = function(t) {
        for (var e = 0; e < this.servantList.length; e++)
            if (this.servantList[e].level >= t) return !0;
        return !1;
    };
    this.getHeroList = function(t) {
        for (
            var e = [], o = localcache.getList(localdb.table_hero), i = 0;
            i < o.length;
            i++
        ) {
            var l = this.getHeroData(o[i].heroid);
            t && l
                ? e.push(o[i])
                : !t &&
                  null == l &&
                  n.jibanProxy.getHeroJB(o[i].heroid) > 0 &&
                  e.push(o[i]);
        }
        return e;
    };
    this.getHeroData = function(t) {
        for (var e = 0; e < this.servantList.length; e++)
            if (this.servantList[e] && this.servantList[e].id == t)
                return this.servantList[e];
        return null;
    };
    this.getLevelUp = function(t) {
        var e,
            o = localcache.getItem(localdb.table_nobility, t.senior),
            i = localcache.getItem(localdb.table_nobility, t.senior + 1);
        if (null == i) return !1;
        e =
            t.level == o.max_level &&
            n.playerProxy.userData.level >= o.player_level &&
            null != i;
        for (var l = !0, r = 0; r < o.need.length; r++)
            if (n.bagProxy.getItemCount(o.need[r]) <= 0) {
                l = !1;
                break;
            }
        return e && l;
    };
    this.getTanlentUp = function(t) {
        for (var e = !1, o = 0; o < t.epskill.length; o++)
            if (this.tanlentIsEnoughUp(t, t.epskill[o])) {
                e = !0;
                break;
            }
        return e;
    };
    this.tanlentIsEnoughUp = function(t, e) {
        var o = localcache.getItem(localdb.table_epSkill, e.id),
            i = localcache.getItem(localdb.table_epLvUp, o.star),
            l = null;
        1 == o.ep
            ? (l = localcache.getItem(localdb.table_item, 61))
            : 2 == o.ep
            ? (l = localcache.getItem(localdb.table_item, 62))
            : 3 == o.ep
            ? (l = localcache.getItem(localdb.table_item, 63))
            : 4 == o.ep && (l = localcache.getItem(localdb.table_item, 64));
        var r = n.bagProxy.getItemCount(l.id);
        return !!t && (t.zzexp >= i.exp || r >= i.quantity);
    };
    this.getSkillUp = function(t) {
        for (var e = !1, o = 0; o < t.pkskill.length; o++)
            if (this.skillIsEnouhghUp(t, t.pkskill[o])) {
                e = !0;
                break;
            }
        return e;
    };
    this.skillIsEnouhghUp = function(t, e) {
        var o = localcache.getItem(localdb.table_pkSkill, e.id),
            i = localcache.getItem(localdb.table_pkLvUp, e.level);
        return e.level < o.maxLevel && t.pkexp >= i.exp;
    };
    this.getBossServantList = function(t) {
        for (var e = [], o = 0; o < this.servantList.length; o++)
            this.servantList[o].id != t && e.push(this.servantList[o]);
        return e;
    };
    this.sortList = function(t, e) {
        var o = n.bossPorxy.getServantHitCount(t.id) > 0 ? 1 : 0,
            i = n.bossPorxy.getServantHitCount(e.id) > 0 ? 1 : 0;
        return o != i ? i - o : t.aep.e4 > e.aep.e4 ? -1 : 1;
    };
    this.sortServantEp = function(t, e) {
        t.aep.e1,
            t.aep.e2,
            t.aep.e3,
            t.aep.e4,
            e.aep.e1,
            e.aep.e2,
            e.aep.e3,
            e.aep.e4;
        var o = n.unionProxy.getHeroFightData(t.id),
            i = n.unionProxy.getHeroFightData(e.id),
            l = o && 1 != o.f && 0 == o.h ? 1 : 0,
            r = i && 1 != i.f && 0 == i.h ? 1 : 0;
        return l != r ? l - r : e.aep.e1 - t.aep.e1;
    };
    this.getQishiSys = function() {
        for (var t = null, e = 0; e < this.servantList.length; e++) {
            localcache
                .getItem(localdb.table_hero, this.servantList[e].id)
                .spec.indexOf(1) >= 0 &&
                (null == t
                    ? (t = this.servantList[e])
                    : t.level < this.servantList[e].level &&
                      (t = this.servantList[e]));
        }
        if (null == t)
            for (e = 0; e < this.servantList.length; e++)
                null == t
                    ? (t = this.servantList[e])
                    : t.aep.e1 < this.servantList[e].aep.e1 &&
                      (t = this.servantList[e]);
        return localcache.getItem(localdb.table_hero, t.id);
    };
    this.isActivedLeader = function(t) {
        var e = this.getLeadSys(t);
        if (e) {
            for (var o in e.activation) {
                if (null == this.getHeroData(e.activation[o])) return !1;
            }
            return !0;
        }
        return !1;
    };
    this.getLeadActivieStr = function(t) {
        var e = "",
            o = this.getLeadSys(t);
        if (o)
            for (var i in o.activation) {
                var n = localcache.getItem(
                    localdb.table_hero,
                    o.activation[i]
                );
                this.getHeroData(n.heroid);
                e += "[" + n.name + "]";
            }
        return i18n.t("LEADER_ACTIVITE_DES_2", {
            str: e
        });
    };
    this.getLeadSys = function(t) {
        var e = localcache.getItem(localdb.table_hero, t);
        return localcache.getItem(localdb.table_leaderAt, e.leaderid);
    };
    this.getLeadLv = function(t, e, o) {
        void 0 === o && (o = !1);
        for (
            var i = localcache.getList(localdb.table_leaderAt),
                n = 0,
                l = 0;
            l < i.length;
            l++
        )
            if (i[l].activation.indexOf(t) >= 0) {
                n = i[l].star;
                break;
            }
        var r = o ? 1e3 * n + e + 1 : 1e3 * n + e;
        return localcache.getItem(localdb.table_leaderExp, r);
    };
    this.getSink = function(t) {
        if (this.skin)
            for (var e = 0, o = this.skin; e < o.length; e++) {
                var i = o[e];
                if (t == i.hid) return i;
            }
        return null;
    };
    this.getHeroUseSkin = function(t) {
        var e = this.getSink(t);
        return null == e ? 0 : e.dress ? e.dress : 0;
    };
    this.getServantList = function() {
        if (
            null == n.xianyunProxy.heroList ||
            0 == n.xianyunProxy.heroList.length
        )
            return this.servantList;
        for (var t = [], e = 0; e < this.servantList.length; e++)
            this.isXianyun(this.servantList[e].id) ||
                t.push(this.servantList[e]);
        return t;
    };
    this.isXianyun = function(t) {
        for (var e = 0; e < n.xianyunProxy.heroList.length; e++)
            if (n.xianyunProxy.heroList[e].hid == t) return !0;
        return !1;
    };
    this.getFourKingActivieStr = function(t) {
        var e = "",
            o = this.getLeadSys(t);
        if (o)
            for (var i in o.activation) {
                var n = localcache.getItem(
                    localdb.table_hero,
                    o.activation[i]
                );
                this.getHeroData(n.heroid);
                e += "[" + n.name + "]";
            }
        return i18n.t("LEADER_ACTIVITE_DES_3", {
            str: e
        });
    };
}
exports.ServantProxy = ServantProxy;
