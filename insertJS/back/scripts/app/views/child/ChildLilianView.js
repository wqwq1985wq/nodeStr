var i = require("../../utils/Utils");
var n = require("../../component/List");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        sonList: n,
        lvliList: n,
        lvliScroll: cc.ScrollView,
        tipNode: cc.Node,
        btnOneKeyLilian: cc.Node,
    },
    ctor() {
        this._sonList = [];
    },
    onLoad() {
        facade.subscribe("SON_LI_LIAN_LIST", this.onSonList, this);
        facade.subscribe("SON_LI_LIAN_SEAT", this.onSonList, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        this.sonList.selectHandle = function(t) {
            if (! (l.sonProxy.lilianSeat.desk + 1 < t.id)) if (l.sonProxy.lilianSeat.desk < t.id) {
                var e = localcache.getItem(localdb.table_practiceSeat, l.sonProxy.lilianSeat.desk + 1);
                i.utils.showConfirmItem(i18n.t("SON_LI_LIAN_JIE_SUO_XI_WEI", {
                    value: e.cost
                }), 1, l.playerProxy.userData.cash,
                function() {
                    var t = localcache.getItem(localdb.table_practiceSeat, l.sonProxy.lilianSeat.desk + 1);
                    l.playerProxy.userData.cash < t.cost ? i.alertUtil.alertItemLimit(1) : l.sonProxy.sendBuyLilianSeat();
                },
                "SON_LI_LIAN_JIE_SUO_XI_WEI");
            } else {
                var o = t.data;
                if (null == o || 0 == o.sid) {
                    l.sonProxy.lilianData = new proto_cs.son.liLianSon();
                    l.sonProxy.lilianData.sid = 0;
                    l.sonProxy.lilianData.travel = 0;
                    l.sonProxy.lilianData.luggage = 0;
                    l.sonProxy.lilianData.did = parseInt(t.id);
                    i.utils.openPrefabView("child/ChildLilianSelectWin");
                } else 0 == o.cd.next ? l.sonProxy.sendLilianReward(o.id, o.sid) : i.alertUtil.alert18n("SON_LI_LIAN_ZHENG_ZAI");
            }
        };
        l.sonProxy.sendInfoLilian();
        this.showLvli();
        this.schedule(this.onLvli, 60);
    },
    onSonList() {
        this._sonList = [];
        for (var t = 1; t < 7; t++) this._sonList.push({
            id: t,
            data: l.sonProxy.getLilianData(t)
        });
        this.sonList.data = this._sonList;
        for (var e = l.timeProxy.getLoacalValue("CHILD_ONE_KEY_LI_LIAN"), o = !1, n = 0; n < l.sonProxy.lilianList.length; n++) if (l.sonProxy.lilianList[n].sid && 0 != l.sonProxy.lilianList[n].sid) {
            o = !0;
            break;
        }
        i.stringUtil.isBlank(e) || o ? (this.btnOneKeyLilian.active = !1) : (this.btnOneKeyLilian.active = !0);
    },
    onLvli() {
        for (var t = localcache.getList(localdb.table_practiceLvli), e = [], o = [], i = 0; i < t.length; i++) 1 == t[i].sex || 0 == t[i].sex ? e.push(t[i]) : (2 != t[i].sex && 0 != t[i].sex) || o.push(t[i]);
        for (i = 0; i < l.sonProxy.lilianList.length; i++) {
            var n = l.sonProxy.lilianList[i];
            if (n.sid) {
                var r = l.sonProxy.getSon(n.sid),
                a = null;
                if (1 == r.sex) {
                    a = e[Math.floor(Math.random() * e.length)];
                } else if (2 == r.sex) {
                    a = o[Math.floor(Math.random() * o.length)];
                }
                var s = {
                    name: r.name,
                    sys: a
                };
                l.sonProxy.lilianLvli.push(s);
            }
        }
        this.showLvli();
    },
    showLvli() {
        this.tipNode.active = 0 == l.sonProxy.lilianLvli.length;
        var t = [];
        t = l.sonProxy.lilianLvli.length <= 25 ? l.sonProxy.lilianLvli: l.sonProxy.lilianLvli.splice(l.sonProxy.lilianLvli.length - 25, 25);
        this.lvliList.data = t;
        t.length > 8 && this.lvliScroll.scrollToBottom();
    },
    onClickClose() {
        i.utils.closeView(this, !0);
    },
    onClickOnekeyLilian() {
        if (l.playerProxy.userData.vip < 5) i.alertUtil.alert18n("SON_LI_LIAN_ONE_KEY_VIP_OPEN");
        else {
            var t = l.timeProxy.getLoacalValue("CHILD_ONE_KEY_LI_LIAN"),
            e = JSON.parse(t);
            if (null != e) {
                var o = [],
                n = 0,
                r = 0,
                a = {};
                for (var s in e) if (null != e[s]) {
                    var c = {};
                    c.did = e[s].did;
                    c.sid = e[s].sid;
                    c.travel = e[s].travel;
                    c.luggage = e[s].luggage;
                    c.localep2 = l.playerProxy.userEp.e2;
                    o.push(c);
                    var _ = localcache.getItem(localdb.table_practiceItem, e[s].luggage);
                    if (null != _) {
                        if (0 == _.itemid) {
                            var d = l.sonProxy.getSon(e[s].sid);
                            n += Math.ceil(((30 * _.max) / Math.ceil(l.playerProxy.userEp.e2 / 800)) * 0.5 * l.playerProxy.userEp.e2 * d.talent * 0.3);
                        } else a[_.itemid] += 1;
                        var u = localcache.getItem(localdb.table_practiceTravel, e[s].travel);
                        null != u ? 1 == u.type ? (r += u.money) : 2 == u.type && (n += u.money) : i.alertUtil.alert(i18n.t("SON_LI_LIAN_CHU_XING_LIMIT", {
                            num: e[s].travel
                        }));
                    } else i.alertUtil.alert(i18n.t("SON_LI_LIAN_XING_LI_LIMIT", {
                        num: e[s].luggage
                    }));
                }
                if (l.playerProxy.userData.cash < r) i.alertUtil.alertItemLimit(1);
                else if (l.playerProxy.userData.food < n) i.alertUtil.alertItemLimit(3);
                else {
                    var p = 0;
                    for (var h in a) if (l.bagProxy.getItemCount(h) < a[h]) {
                        p = parseInt(h);
                        break;
                    }
                    0 == p ? l.sonProxy.sendOneKeyLilian(o) : i.alertUtil.alertItemLimit(p);
                }
            } else i.alertUtil.alert18n("SON_LI_LIAN_XIAN_AN_PAI");
        }
    },
    onClickOneKeyGuilai() {
        if (l.playerProxy.userData.vip < 4) i.alertUtil.alert18n("SON_LI_LIAN_FINNISH_VIP_OPEN");
        else {
            for (var t = !1,
            e = 0; e < l.sonProxy.lilianList.length; e++) l.sonProxy.lilianList[e].sid && 0 != l.sonProxy.lilianList[e].sid && (t = !0);
            t ? l.sonProxy.sendOneKeyLilianFinish() : i.alertUtil.alert18n("SON_LI_LIAN_NO_BODY");
        }
    },
});
