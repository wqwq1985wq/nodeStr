
var i = require("../utils/Utils");
var n = require("../Initializer");
var l = require("../Config");
var r = require("./BagProxy");
var a = require("../utils/ApiUtils");
var TimeProxy = function() {

    this.UPDATE_FLOAT_REWARD = "UPDATE_FLOAT_REWARD";
    this.itemReward = null;
    this.noticeMsg = null;
    this.activityNoticeMsg = null;
    this.allReward = null;
    this.storySelect = null;
    this._flushTime = 0;

    this.ctor = function() {
        JsonHttp.subscribe(proto_sc.system.sys, this.onServerTime, this);
        JsonHttp.subscribe(
            proto_sc.system.errror,
            this.onServerError,
            this
        );
        JsonHttp.subscribe(proto_sc.msgwin.items, this.onMsgItems, this);
        JsonHttp.subscribe(proto_sc.notice.listNew, this.onNotice, this);
        JsonHttp.subscribe(proto_sc.notice.list, this.onNotice, this);
        JsonHttp.subscribe(
            proto_sc.notice.activity,
            this.onActivityNotice,
            this
        );
        facade.subscribe("ITEM_LIMIT_GO", this.showItemLimit, this);
    };
    this.clearData = function() {
        this.itemReward = null;
        this.allReward = null;
        this.noticeMsg = null;
        this.storySelect = null;
    };
    this.sendFlushZero = function() {
        var t = i.timeUtil.getTodaySecond(),
            e = i.timeUtil.second;
        if (!(this._flushTime > t || e - t > 60)) {
            this._flushTime = e;
            JsonHttp.send(new proto_cs.guide.flushZero());
        }
    };
    this.onServerTime = function(t) {
        i.timeUtil.setServerTime(t.time);
    };
    this.onServerError = function(t) {
        if (!i.stringUtil.isBlank(t.msg))
            if (i18n.has(t.msg))
                "LOGIN_YIDIDENGLU" == t.msg
                    ? i.utils.showConfirm(i18n.t(t.msg), function() {
                          n.loginProxy.loginOut();
                      })
                    : i.alertUtil.alert18n(t.msg);
            else if (
                -1 != t.msg.indexOf("RES_SHORT") &&
                t.msg.split("|").length > 1
            )
                i.alertUtil.alertItemLimit(parseInt(t.msg.split("|")[1]));
            else if (-1 != t.msg.indexOf("|")) {
                for (
                    var e = t.msg.split("|"), o = {}, l = 1;
                    l < e.length;
                    l++
                )
                    o["v" + l] = e[l];
                i.alertUtil.alert(e[0], o);
            } else i.alertUtil.alert(t.msg);
    };
    this.onMsgItems = function(t) {
        this.itemReward = t;
        facade.send(this.UPDATE_FLOAT_REWARD);
    };
    this.onNotice = function(t) {
        this.noticeMsg = t;
    };
    this.onActivityNotice = function(t) {
        this.activityNoticeMsg = t;
    };
    this.getActivityNotice = function() {
        var t = [],
            e = n.loginProxy.pickServer.id;
        if (this.activityNoticeMsg && this.activityNoticeMsg.length > 0)
            for (var o = 0; o < this.activityNoticeMsg.length; o++) {
                var i = this.activityNoticeMsg[o],
                    l = i.sevid + "";
                if (-1 != l.indexOf("all")) t.push(i);
                else if (-1 != l.indexOf(","))
                    for (
                        var r = i.sevid.split(","), a = 0;
                        a < r.length;
                        a++
                    )
                        e == parseInt(r[a]) && t.push(i);
                else if (-1 != l.indexOf("-")) {
                    var s = i.sevid.split("-");
                    parseInt(s[0]) <= e && e <= parseInt(s[o]) && t.push(i);
                } else e == parseInt(i.sevid) && t.push(i);
            }
        return t;
    };
    this.floatReward = function(t, e) {
        void 0 === t && (t = !0);
        void 0 === e && (e = !1);
        if (null != this.itemReward && 0 != this.itemReward.length) {
            for (var o = 0; o < this.itemReward.length; o++) {
                var l = this.itemReward[o],
                    a =
                        l.count < 0
                            ? i18n.t("COMMON_ADD_2", {
                                  n: "",
                                  c: l.count
                              })
                            : i18n.t("COMMON_ADD", {
                                  n: "",
                                  c: l.count
                              });
                switch (l.kind) {
                    case r.DataType.HERO:
                        facade.send("UNLOCK_AUTO_LOOK", {
                            isFloat: 1
                        });
                        i.utils.openPrefabView(
                            "ServantShow",
                            !0,
                            n.servantProxy.getHeroData(l.id)
                        );
                        break;

                    case r.DataType.WIFE:
                        facade.send("UNLOCK_AUTO_LOOK", {
                            isFloat: 1
                        });
                        i.utils.openPrefabView(
                            "WifeShow",
                            !0,
                            n.wifeProxy.getWifeData(l.id)
                        );
                        break;

                    case r.DataType.NONE:
                    case r.DataType.ITEM:
                    case r.DataType.CHENGHAO:
                    case r.DataType.HUODONG:
                    case r.DataType.HEAD_BLANK:
                    case r.DataType.CLOTHE:
                    case r.DataType.JB_ITEM:
                        if (l.id < 0) {
                            a =
                                n.playerProxy.getKindIdName(l.kind, l.id) +
                                a;
                            i.alertUtil.alert(a);
                        } else
                            e
                                ? this.addAllReward(l)
                                : i.utils.popView("AlertItemShow", l);
                        break;

                    case r.DataType.ENUM_ITEM:
                        if (18 == l.id || 100 == l.id) continue;
                        if (l.id < 6 && t)
                            e
                                ? this.addAllReward(l)
                                : i.utils.popView("AlertItemShow", l);
                        else {
                            a =
                                n.playerProxy.getKindIdName(l.kind, l.id) +
                                a;
                            i.alertUtil.alert(a);
                        }
                        break;

                    default:
                        var s = n.playerProxy.getKindIdName(l.kind, l.id);
                        a = n.playerProxy.getKindIdName(l.kind, l.id) + a;
                        i.stringUtil.isBlank(s) || i.alertUtil.alert(a);
                        this.addAllReward(l);
                }
            }
            i.utils.popNext(!0);
            this.itemReward = null;
        }
    };
    this.addAllReward = function(t) {
        null == this.allReward && (this.allReward = []);
        for (var e = !1, o = 0; o < this.allReward.length; o++)
            if (this.allReward[o].id == t.id) {
                this.allReward[o].count += t.count;
                e = !0;
            }
        0 == e && this.allReward.push(t);
    };
    this.floatAllReward = function() {
        if (this.allReward)
            for (var t = 0; t < this.allReward.length; t++)
                i.utils.popView("AlertItemShow", this.allReward[t]);
        i.utils.popNext(!0);
        this.allReward = null;
    };
    this.getLoacalValue = function(t) {
        return cc.sys.localStorage.getItem(
            t + "_" + l.Config.serId + "_" + n.playerProxy.userData.uid
        );
    };
    this.saveLocalValue = function(t, e) {
        cc.sys.localStorage.setItem(
            t + "_" + l.Config.serId + "_" + n.playerProxy.userData.uid,
            e
        );
    };
    this.saveLocalAccount = function(t, e) {
        cc.sys.localStorage.setItem(t + "_account", e);
    };
    this.getLocalAccount = function(t) {
        return cc.sys.localStorage.getItem(t + "_account");
    };
    this.showItemLimit = function(t) {
        var e = t,
            l = 0;
        if (null != t.id) {
            e = t.id;
            l = t.count ? t.count : 0;
        }
        switch (e) {
            case 1:
                this.openFunConfirm(e, exports.funUtils.recharge.id, l);
                break;

            case 2:
                this.openJingying(
                    n.jingyingProxy.coin.num,
                    e,
                    exports.funUtils.jingyingView,
                    l
                );
                break;

            case 3:
                this.openJingying(
                    n.jingyingProxy.food.num,
                    e,
                    exports.funUtils.jingyingView,
                    l
                );
                break;

            case 4:
                this.openJingying(
                    n.jingyingProxy.army.num,
                    e,
                    exports.funUtils.jingyingView,
                    l
                );
                break;

            case 5:
                this.openFunConfirm(e, exports.funUtils.zhengwuView, l);
                break;

            default:
                var r = n.shopProxy.isHaveItem(e, l);
                if (r) {
                    var a = r;
                    0 != l &&
                        (a = {
                            buy: r,
                            needCount: l
                        });
                    i.utils.openPrefabView("shopping/ShopBuy", !1, a);
                } else {
                    var s = localcache.getItem(localdb.table_item, e);
                    s && 0 != s.iconopen && exports.funUtils.openView(s.iconopen);
                }
        }
    };
    this.openJingying = function(t, e, i, n) {
        t > 0 || !exports.funUtils.isOpenFun(exports.funUtils.qifu)
            ? this.openFunConfirm(e, i.id, n)
            : this.openFunConfirm(e, exports.funUtils.qifu.id, n);
    };
    this.openFunConfirm = function(t, e, l, r) {
        void 0 === l && (l = 0);
        void 0 === r && (r = null);
        var a = i18n.t("COMMON_LIMIT_GO", {
            n: n.playerProxy.getKindIdName(1, t),
            f: exports.funUtils.getFunName(e),
            c: 0 == l || null == l ? "" : l
        });
        i.utils.showConfirm(a, function() {
            exports.funUtils.openView(e, r);
        });
    };
    this.sendCDK = function(t) {
        var e = new proto_cs.recode.exchange();
        e.key = t;
        JsonHttp.send(e, function() {
            n.timeProxy.floatReward();
        });
    };
    this.isSelectedStory = function(t) {
        if (null == this.storySelect) {
            var e = this.getLoacalValue("STORY_SELECTED");
            this.storySelect = JSON.parse(e);
        }
        null == this.storySelect && (this.storySelect = {});
        return 1 == this.storySelect[t];
    };
    this.saveSelectStory = function(t) {
        if (!this.storySelect || 1 != this.storySelect[t]) {
            null == this.storySelect && (this.storySelect = {});
            this.storySelect[t] = 1;
            this.saveLocalValue(
                "STORY_SELECTED",
                JSON.stringify(this.storySelect)
            );
        }
    };
}
exports.TimeProxy = TimeProxy;

var FunUtils = function() {

        this.alls = null;
        this.battleView = {
            id: 2,
            url: "battle/FightView",
            param: null,
            activityid: 0
        };
        this.bossView = {
            id: 3,
            url: "boos/BossView",
            param: null,
            activityid: 0
        };
        this.prisonView = {
            id: 4,
            url: "cell/CellView",
            param: null,
            activityid: 0
        };
        this.yamenView = {
            id: 5,
            url: "dalishi/DalishiView",
            param: null,
            activityid: 0
        };
        this.jiulouView = {
            id: 6,
            url: "jiulou/JiulouView",
            param: null,
            activityid: 0
        };
        this.unionView = {
            id: 7,
            url: "union/UnionView",
            param: null,
            activityid: 0
        };
        this.jcView = {
            id: 8,
            url: "",
            param: null,
            activityid: 0
        };
        this.lDView = {
            id: 9,
            url: "",
            param: null,
            activityid: 0
        };
        this.xunFangView = {
            id: 11,
            url: "look/LookView",
            param: null,
            activityid: 0
        };
        this.chatView = {
            id: 12,
            url: "chat/ChatView",
            param: null,
            activityid: 0
        };
        this.wifeView = {
            id: 13,
            url: "wife/WifeSelectView",
            param: null,
            activityid: 0
        };
        this.childView = {
            id: 14,
            url: "child/ChildView",
            param: null,
            activityid: 0
        };
        this.servantView = {
            id: 15,
            url: "servant/ServantListView",
            param: null,
            activityid: 0
        };
        this.zhengwuView = {
            id: 16,
            url: "ZhengwuView",
            param: null,
            activityid: 0
        };
        this.jingyingView = {
            id: 17,
            url: "JingYingView",
            param: null,
            activityid: 0
        };
        this.skilView = {
            id: 19,
            url: "",
            param: null,
            activityid: 0
        };
        this.gzjView = {
            id: 20,
            url: "",
            param: null,
            activityid: 0
        };
        this.fzView = {
            id: 21,
            url: "",
            param: null,
            activityid: 0
        };
        this.jibanView = {
            id: 22,
            url: "jiban/JibanSelect",
            param: null,
            activityid: 0
        };
        this.feigeView = {
            id: 23,
            url: "feige/FeigeView",
            param: null,
            activityid: 0
        };
        this.jibanViewWife = {
            id: 24,
            url: "jiban/JibanSelect",
            param: {
                select: 2
            },
            activityid: 0
        };
        this.rankView = {
            id: 25,
            url: "rank/RankView",
            param: null,
            activityid: 0
        };
        this.achieveView = {
            id: 26,
            url: "achieve/AchieveView",
            param: null,
            activityid: 0
        };
        this.cityView = {
            id: 27,
            url: "main/MainCity",
            param: null,
            activityid: 0
        };
        this.bookView = {
            id: 28,
            url: "book/BookView",
            param: null,
            activityid: 0
        };
        this.kitchenView = {
            id: 29,
            url: "kitchen/KitchenView",
            param: null,
            activityid: 0
        };
        this.marryView = {
            id: 30,
            url: "marry/MarryView",
            param: null,
            activityid: 0
        };
        this.placeView = {
            id: 31,
            url: "marry/MarryView",
            param: null,
            activityid: 0
        };
        this.backView = {
            id: 32,
            url: "main/HouGong",
            param: null,
            activityid: 0
        };
        this.bagView = {
            id: 33,
            url: "bag/BagView",
            param: null,
            activityid: 0
        };
        this.battleBossView = {
            id: 34,
            url: "battle/FightBossView",
            param: null,
            activityid: 0
        };
        this.treasureView = {
            id: 35,
            url: "treasure/TreasureView",
            param: null,
            activityid: 0
        };
        this.userView = {
            id: 36,
            url: "user/UserView",
            param: null,
            activityid: 0
        };
        this.userClothe = {
            id: 37,
            url: "user/UserClothe",
            param: null,
            activityid: 0
        };
        this.mainTask = {
            id: 38,
            url: "MainTaskDetail",
            param: null,
            activityid: 0
        };
        this.shopping = {
            id: 39,
            url: "shopping/ShopView",
            param: null,
            activityid: 0
        };
        this.fuli = {
            id: 40,
            url: "welfare/Qiandao",
            param: null,
            activityid: 0
        };
        this.firstRecharge = {
            id: 41,
            url: "firstrecharge/FirstRecharge",
            param: null,
            activityid: 0
        };
        this.servanDay = {
            id: 42,
            url: "limitactivity/SevenDay",
            param: null,
            activityid: 0
        };
        this.atList = {
            id: 43,
            url: "limitactivity/AtListView",
            param: null,
            activityid: 3
        };
        this.limitActivity = {
            id: 44,
            url: "limitactivity/LimitActivityView",
            param: null,
            activityid: 2
        };
        this.rechargActivity = {
            id: 45,
            url: "limitactivity/RechargeActivity",
            param: null,
            activityid: 4
        };
        this.monthCard = {
            id: 46,
            url: "welfare/MonthCard",
            param: null,
            activityid: 0
        };
        this.duihuan = {
            id: 47,
            url: "limitactivity/ServantRecruit",
            param: null,
            activityid: 6152
        };
        this.support = {
            id: 48,
            url: "support/SupportView",
            param: null,
            activityid: 10
        };
        this.voice = {
            id: 49,
            url: "voice/VoiceView",
            param: null,
            activityid: 6137
        };
        this.xianli = {
            id: 50,
            url: "boss/BossView",
            param: null,
            activityid: 0
        };
        this.recharge = {
            id: 51,
            url: "welfare/RechargeView",
            param: null,
            activityid: 0
        };
        this.qifu = {
            id: 52,
            url: "qifu/QifuView",
            param: null,
            activityid: 0
        };
        this.treasureTidy = {
            id: 53,
            url: "treasure/MatchFind",
            param: null,
            activityid: 0
        };
        this.dayday = {
            id: 54,
            url: "limitactivity/Dayday",
            param: null,
            activityid: 6121
        };
        this.duihuanShop = {
            id: 55,
            url: "limitactivity/DHShop",
            param: null,
            activityid: 6122
        };
        this.trunTable = {
            id: 56,
            url: "truntable/TrunTableView",
            param: null,
            activityid: 6169
        };
        this.dailyRecharge = {
            id: 57,
            url: "dailyrecharge/DailyRechargeView",
            param: null,
            activityid: 6168
        };
        this.childLilian = {
            id: 58,
            url: "child/ChildLilianView",
            param: null,
            activityid: 0
        };
        this.stronger = {
            id: 59,
            url: "stronger/StrongerView",
            param: null,
            activityid: 0
        };
        this.prince = {
            id: 60,
            url: "prince/PrinceRecruitView",
            param: null,
            activityid: 6181
        };
        this.clothepve = {
            id: 61,
            url: "clothe/ClothePve",
            param: null,
            activityid: 6123
        };
        this.clothepvp = {
            id: 62,
            url: "clothe/ClothePvp",
            param: null,
            activityid: 6142
        };
        this.snowman = {
            id: 63,
            url: "snowman/SnowManView",
            param: null,
            activityid: 6183
        };
        this.levelgift = {
            id: 64,
            url: "levelgift/LevelGiftView",
            param: null,
            activityid: 6182
        };
        this.purchase = {
            id: 65,
            url: "purchase/PurchaseView",
            param: null,
            activityid: 6180
        };
        this.continuityrecharge = {
            id: 66,
            url: "continuityrecharge/ContinuityRechargeView",
            param: null,
            activityid: 6184
        };
        this.luckybrand = {
            id: 67,
            url: "luckybrand/LuckyBrand",
            param: null,
            activityid: 6188
        };
        this.guoli = {
            id: 68,
            url: "guoli/GuoliView",
            param: null,
            activityid: 6187
        };
        this.flower = {
            id: 69,
            url: "flower/FlowerView",
            param: null,
            activityid: 0
        };
        this.spring = {
            id: 70,
            url: "spring/SpringView",
            param: null,
            activityid: 6183
        };
        this.lantern = {
            id: 71,
            url: "lantern/LanternView",
            param: null,
            activityid: 6189
        };
        this.wishingTree = {
            id: 72,
            url: "wishingtree/WishingTreeView",
            param: null,
            activityid: 0
        };
        this.vipview = {
            id: 73,
            url: "welfare/RechargeView",
            param: {
                type: 1
            },
            activityid: 0
        };
        this.jieqiview = {
            id: 74,
            url: "jieqi/JieqiView",
            param: null,
            activityid: 6211
        };
        this.luckyCarp = {
            id: 75,
            url: "xianyu/LuckyCarp",
            param: null,
            activityid: 6214
        };
        this.tangyuan = {
            id: 76,
            url: "tangyuan/TangyuanView",
            param: null,
            activityid: 6015
        };
        this.worldtree = {
            id: 77,
            url: "flower/FlowerTree",
            param: null,
            activityid: 0
        };
        this.girlsDay = {
            id: 78,
            url: "girlsday/GirlsDayView",
            param: null,
            activityid: 6220
        };
        this.arbodday = {
            id: 79,
            url: "arborday/ArborDaySelect",
            param: null,
            activityid: 6221
        };
        this.qingming = {
            id: 80,
            url: "qingming/QingMingView",
            param: null,
            activityid: 6222
        };
        this.spell = {
            id: 81,
            url: "spell/SpellView",
            param: null,
            activityid: 6223
        };
        this.lion = {
            id: 82,
            url: "lion/LionView",
            param: null,
            activityid: 6224
        };
        this.superRecharge = {
            id: 83,
            url: "limitactivity/SuperRecharge",
            param: null,
            activityid: 6225
        };
        this.gaodian = {
            id: 84,
            url: "tangyuan/GaodianView",
            param: null,
            activityid: 6231
        };
        this.readingDay = {
            id: 85,
            url: "readingday/ReadingDayView",
            param: null,
            activityid: 6228
        };
        this.luckyTable = {
            id: 86,
            url: "luckytable/LuckyTableView",
            param: null,
            activityid: 6227
        };
        this.singleRecharge = {
            id: 87,
            url: "singlerecharge/SingleRechargeMain",
            param: null,
            activityid: 6226
        };
        this.laborday = {
            id: 88,
            url: "laborday/LaborDaySelect",
            param: null,
            activityid: 6229
        };
        this.dragonBoat = {
            id: 89,
            url: "dragonboat/DragonBoatView",
            param: null,
            activityid: 6230
        };
        this.xianyun = {
            id: 90,
            url: "xianyun/XianYunView",
            param: null,
            activityid: 0
        };
        this.balloon = {
            id: 91,
            url: "balloon/BalloonView",
            param: null,
            activityid: 6232
        };
        this.chenghao = {
            id: 92,
            url: "chenghao/ChengHaoView",
            param: null,
            activityid: 0
        };
        this.fourking = {
            id: 93,
            url: "fourking/FourkingView",
            param: null,
            activityid: 6233
        };
        this.kuachongbang = {
            id: 94,
            url: "cross/CrossActivityView",
            param: null,
            activityid: 22
        };
        this.hedeng = {
            id: 95,
            url: "hedeng/HeDengView",
            param: null,
            activityid: 6234
        };
        this.thirtydays = {
            id: 97,
            url: "thirtydays/ThirtyDaysView",
            param: null,
            activityid: 6500
        };
        this.fengxiandian = {
            id: 96,
            url: "cross/FengXianHallView",
            param: null,
            activityid: 0
        };
        this.qixi = {
            id: 98,
            url: "qixi/QiXiView",
            param: null,
            activityid: 6241
        };
        this.guanggao = {
            id: 99,
            url: "",
            param: null,
            activityid: 0
        };
        this.zhongyuan = {
            id: 100,
            url: "zhongyuan/ZhongYuanView",
            param: null,
            activityid: 6244
        };
        this.friend = {
            id: 101,
            url: "friends/FriendView",
            param: null,
            activityid: 0
        };

    this.openView = function(t, e) {
        void 0 === e && (e = null);
        if (!i.utils._isExit) {
            null == this.alls && this.init();
            var o = localcache.getItem(localdb.table_iconOpen, t);
            if (o) {
                if (
                    t == this.purchase.id &&
                    l.Config.version_code < l.Config.target_version_code
                ) {
                    a.apiUtils.open_download_url();
                    return;
                }
                if (!this.isOpen(o)) {
                    i.alertUtil.alert(o.errmsg);
                    if (!l.Config.DEBUG) return;
                }
                if (t == this.shopping.id) {
                    n.shopProxy.sendList();
                    return;
                }
                if (t == this.unionView.id) {
                    n.unionProxy.enterUnion();
                    facade.send(n.guideProxy.UPDATE_TRIGGER_GUIDE, {
                        type: 4,
                        value: t + "|" + n.taskProxy.mainTask.id
                    });
                    return;
                }
                if (
                    (r = this.alls[t]) &&
                    0 != r.activityid &&
                    !n.limitActivityProxy.isHaveTypeActive(r.activityid)
                ) {
                    i.alertUtil.alert(o.title + i18n.t("GAME_LEVER_UNOPENED"));
                    return;
                }
                if (r) {
                    i.utils.openPrefabView(r.url, !1, e || r.param);
                    facade.send(n.guideProxy.UPDATE_TRIGGER_GUIDE, {
                        type: 4,
                        value: r.id + "|" + n.taskProxy.mainTask.id
                    });
                }
            } else {
                i.alertUtil.alert(i18n.t("COMMON_FUN_UNDEFINE") + t);
                if (l.Config.DEBUG) {
                    var r;
                    if ((r = this.alls[t])) {
                        i.utils.openPrefabView(r.url, !1, e || r.param);
                        facade.send(n.guideProxy.UPDATE_TRIGGER_GUIDE, {
                            type: 4,
                            value: r.id + "|" + n.taskProxy.mainTask.id
                        });
                    }
                }
            }
        }
    };
    this.openViewUrl = function(t, e) {
        void 0 === e && (e = !1);
        if (!i.utils._isExit)
            if (i.stringUtil.isBlank(t))
                i.alertUtil.alert(i18n.t("MAIN_FUN_UNOPEN"));
            else {
                null == this.alls && this.init();
                for (var r in this.alls) {
                    var a = this.alls[r];
                    if (a && a.url == t) {
                        var s = localcache.getItem(
                            localdb.table_iconOpen,
                            a.id
                        );
                        if (
                            s &&
                            !this.isOpen(s) &&
                            s.id != exports.funUtils.chatView.id
                        ) {
                            i.alertUtil.alert(s.errmsg);
                            if (!l.Config.DEBUG) return;
                        }
                        if (a.id == this.unionView.id) {
                            n.unionProxy.enterUnion();
                            facade.send(n.guideProxy.UPDATE_TRIGGER_GUIDE, {
                                type: 4,
                                value: a.id + "|" + n.taskProxy.mainTask.id
                            });
                            return;
                        }
                        i.utils.openPrefabView(t, !1, null, e);
                        facade.send(n.guideProxy.UPDATE_TRIGGER_GUIDE, {
                            type: 4,
                            value: a.id + "|" + n.taskProxy.mainTask.id
                        });
                        return;
                    }
                }
                i.utils.openPrefabView(t);
            }
    };
    this.isCanOpenViewUrl = function(t) {
        if (i.utils._isExit) return !0;
        if (i.stringUtil.isBlank(t)) {
            i.alertUtil.alert(i18n.t("MAIN_FUN_UNOPEN"));
            return !1;
        }
        null == this.alls && this.init();
        var e = this.getOpenFun(t);
        if (e && !this.isOpen(e)) {
            i.alertUtil.alert(e.errmsg);
            return !1;
        }
        return !0;
    };
    this.getOpenFun = function(t) {
        for (var e in this.alls) {
            var o = this.alls[e];
            if (o && o.url == t) {
                return localcache.getItem(localdb.table_iconOpen, o.id);
            }
        }
        return null;
    };
    this.isOpen = function(t) {
        if (null == t) return !0;
        switch (t.type) {
            case 9:
                if (n.playerProxy.userData.mmap < t.pram) return !1;
                break;

            case 2:
                if (n.playerProxy.userData.level < t.pram) return !1;
                break;

            case 8:
                if (
                    n.servantProxy.servantList &&
                    n.servantProxy.servantList.length < t.pram
                )
                    return !1;
                break;

            case 6:
                if (
                    n.sonProxy.unMarryList &&
                    n.sonProxy.unMarryList.length < t.pram &&
                    0 == n.sonProxy.sonMarryList.length
                )
                    return !1;
                break;

            case 5:
                if (
                    n.wifeProxy.wifeList &&
                    n.wifeProxy.wifeList.length < t.pram
                )
                    return !1;
                break;

            case 4:
                if (
                    n.servantProxy.servantList &&
                    n.servantProxy.servantList.length <
                        i.utils.getParamInt("gongdou_unlock_servant")
                )
                    return !1;
                for (
                    var e = i.utils.getParamInt("gongdou_unlock_level"), o = 0;
                    o < n.servantProxy.servantList.length;
                    o++
                )
                    if (n.servantProxy.servantList[o].level >= e) return !0;
                return !1;

            case 3:
                if (n.playerProxy.userData.bmap < t.pram) return !1;
                break;

            case 10:
                if (n.taskProxy.mainTask && n.taskProxy.mainTask.id <= t.pram)
                    return !1;
        }
        return !0;
    };
    this.isOpenFun = function(t) {
        var e = localcache.getItem(localdb.table_iconOpen, t.id);
        return null == e || this.isOpen(e);
    };
    this.isOpenActivity = function(t) {
        if (null == t || 0 == t) return !1;
        var e = localcache.getItem(localdb.table_iconOpen, t);
        if (null == e) return !1;
        if (!this.isOpen(e)) return !1;
        null == this.alls && this.init();
        var o = this.alls[t];
        return !(
            o &&
            0 != o.activityid &&
            !n.limitActivityProxy.isHaveTypeActive(o.activityid)
        );
    };
    this.getWillOpen = function() {
        null == this.alls && this.init();
        for (var t in this.alls) {
            var e = this.alls[t],
                o = localcache.getItem(localdb.table_iconOpen, e.id);
            if (o && !this.isOpen(o)) return e;
        }
        return null;
    };
    this.getFunName = function(t) {
        var e = localcache.getItem(localdb.table_iconOpen, t);
        return e ? e.title : "";
    };
    this.init = function() {
        this.alls = new Map();
        this.alls[2] = this.battleView;
        this.alls[3] = this.bossView;
        this.alls[4] = this.prisonView;
        this.alls[5] = this.yamenView;
        this.alls[6] = this.jiulouView;
        this.alls[7] = this.unionView;
        this.alls[8] = this.jcView;
        this.alls[9] = this.lDView;
        this.alls[11] = this.xunFangView;
        this.alls[12] = this.chatView;
        this.alls[13] = this.wifeView;
        this.alls[14] = this.childView;
        this.alls[15] = this.servantView;
        this.alls[16] = this.zhengwuView;
        this.alls[17] = this.jingyingView;
        this.alls[19] = this.skilView;
        this.alls[20] = this.gzjView;
        this.alls[21] = this.fzView;
        this.alls[22] = this.jibanView;
        this.alls[23] = this.feigeView;
        this.alls[24] = this.jibanViewWife;
        this.alls[25] = this.rankView;
        this.alls[26] = this.achieveView;
        this.alls[27] = this.cityView;
        this.alls[28] = this.bookView;
        this.alls[29] = this.kitchenView;
        this.alls[30] = this.marryView;
        this.alls[31] = this.placeView;
        this.alls[32] = this.backView;
        this.alls[33] = this.bagView;
        this.alls[34] = this.battleBossView;
        this.alls[35] = this.treasureView;
        this.alls[36] = this.userView;
        this.alls[37] = this.userClothe;
        this.alls[38] = this.mainTask;
        this.alls[39] = this.shopping;
        this.alls[40] = this.fuli;
        this.alls[41] = this.firstRecharge;
        this.alls[42] = this.servanDay;
        this.alls[43] = this.atList;
        this.alls[44] = this.limitActivity;
        this.alls[45] = this.rechargActivity;
        this.alls[46] = this.monthCard;
        this.alls[47] = this.duihuan;
        this.alls[48] = this.support;
        this.alls[49] = this.voice;
        this.alls[50] = this.xianli;
        this.alls[51] = this.recharge;
        this.alls[52] = this.qifu;
        this.alls[53] = this.treasureTidy;
        this.alls[54] = this.dayday;
        this.alls[55] = this.duihuanShop;
        this.alls[56] = this.trunTable;
        this.alls[57] = this.dailyRecharge;
        this.alls[58] = this.childLilian;
        this.alls[59] = this.stronger;
        this.alls[60] = this.prince;
        this.alls[61] = this.clothepve;
        this.alls[62] = this.clothepvp;
        this.alls[63] = this.snowman;
        this.alls[64] = this.levelgift;
        this.alls[65] = this.purchase;
        this.alls[66] = this.continuityrecharge;
        this.alls[67] = this.luckybrand;
        this.alls[68] = this.guoli;
        this.alls[69] = this.flower;
        this.alls[70] = this.spring;
        this.alls[71] = this.lantern;
        this.alls[72] = this.wishingTree;
        this.alls[73] = this.vipview;
        this.alls[74] = this.jieqiview;
        this.alls[75] = this.luckyCarp;
        this.alls[76] = this.tangyuan;
        this.alls[78] = this.girlsDay;
        this.alls[79] = this.arbodday;
        this.alls[80] = this.qingming;
        this.alls[81] = this.spell;
        this.alls[82] = this.lion;
        this.alls[83] = this.superRecharge;
        this.alls[84] = this.gaodian;
        this.alls[85] = this.readingDay;
        this.alls[86] = this.luckyTable;
        this.alls[87] = this.singleRecharge;
        this.alls[88] = this.laborday;
        this.alls[89] = this.dragonBoat;
        this.alls[90] = this.xianyun;
        this.alls[91] = this.balloon;
        this.alls[92] = this.chenghao;
        this.alls[93] = this.fourking;
        this.alls[94] = this.kuachongbang;
        this.alls[95] = this.hedeng;
        this.alls[96] = this.fengxiandian;
        this.alls[97] = this.thirtydays;
        this.alls[98] = this.qixi;
        this.alls[99] = this.guanggao;
        this.alls[100] = this.zhongyuan;
        this.alls[101] = this.friend;
    };
}
exports.FunUtils = FunUtils;

var FunItem = function() {
    this.id = 0;
    this.url = "";
    this.param = null;
    this.activityid = 0;
};
exports.FunItem = FunItem;
exports.funUtils = new FunUtils();
