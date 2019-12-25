var i = require("../utils/Utils");
var n = require("../component/RedDot");
var l = require("../Initializer");
var r = require("./TimeProxy");
function LimitActivityProxy() {

    this.UPDATE_LIMIT_ACTIVE_SEVEN = "UPDATE_LIMIT_ACTIVE_SEVEN";
    this.UPDATE_DUIHUAN_HUODONG = "UPDATE_DUIHUAN_HUODONG";
    this.UPDATE_DAYDAY_HUODONG = "UPDATE_DAYDAY_HUODONG";
    this.UPDATE_DUIHUAN_SHOP = "UPDATE_DUIHUAN_SHOP";
    this.LIMIT_ACTIVITY_HUO_DONG_LIST = "LIMIT_ACTIVITY_HUO_DONG_LIST";
    this.UPDATE_BOSS_LIST = "UPDATE_BOSS_LIST";
    this.UPDATE_BOSS_INFO = "UPDATE_BOSS_INFO";
    this.huodongList = null;
    this.curSelectData = null;
    this.sevenSign = null;
    this.cbRankList = null;
    this.cbMyRank = null;
    this.duihuan = null;
    this.dayday = null;
    this.duihuanShop = null;
    this.bossList = null;
    this.bossMyDmg = null;
    this.bossInfo = null;
    this.bossHit = null;
    this.bossRankList = null;
    this.superRecharge = null;
    this.curExchangeId = 0;
    this.SEVEN_DAY_ID = 287;
    this.SUPPORT_ID = 6136;
    this.DUIHUAN_ID = 6152;
    this.DAYDAY_ID = 6121;
    this.DUIHUANSHOP_ID = 6122;
    this.CLOTHEPVE_ID = 6123;
    this.CLOTHEPVP_ID = 6142;
    this.VOICE_ID = 6137;
    this.TRUN_TABLE_ID = 6169;
    this.DAILY_RECHARGE = 6168;
    this.PRINCE_ID = 6181;
    this.LEVEL_GIFT_ID = 6182;
    this.CZLB_ID = 6180;
    this.SNOWMAN_ID = 6183;
    this.LXCZ_ID = 6184;
    this.GUO_LI_ID = 6187;
    this.LUCKY_BRAND_ID = 6188;
    this.LEI_TIAN_RECHARGE = 262;
    this.LANTERN_ID = 6189;
    this.ACT_BOSS_ID = 6010;
    this.JIE_QI_ID = 6211;
    this.LUCKY_CARP = 6214;
    this.TANG_YUAN_ID = 6015;
    this.GIRLS_DAY_ID = 6220;
    this.ARBOR_DAY_ID = 6221;
    this.QING_MING_ID = 6222;
    this.SPELL_ID = 6223;
    this.LION_ID = 6224;
    this.SUPER_RECHARGE_ID = 6225;
    this.SINGLE_RECHAGR_ID = 6226;
    this.LUCKY_TABLE_ID = 6227;
    this.READING_DAY_ID = 6228;
    this.LABOR_DAY_ID = 6229;
    this.DRAGON_BOAT_ID = 6230;
    this.GAO_DIAN_ID = 6231;
    this.BALLOON_ID = 6232;
    this.FOURKING_ID = 6233;
    this.HEDENG_ID = 6234;
    this.KUA_SHILI_ID = 313;
    this.KUA_LOV_ID = 314;
    this.SHILI_ID = 252;
    this.LOV_ID = 253;
    this.THIRTYDAYS_ID = 6500;
    this.QIXI_ID = 6241;
    this.ZHONGYUAN_ID = 6244;
    this.LIMIT_ACTIVITY_TYPE = 2;
    this.AT_LIST_TYPE = 3;
    this.RECHARGE_TYPE = 4;
    this.SUPPORT_TYPE = 10;
    this.GIRLS_TYPE = 990;
    this.ARBOR_TYPE = 991;
    this.QING_MING_TYPE = 992;
    this.READING_TYPE = 993;
    this.SPRING_TYPE = 995;
    this.SNOWMAN_TYPE = 996;
    this.LABOR_TYPE = 997;
    this.DRAGON_BOAT_TYPE = 998;
    this.LUCKY_TABLE_TYPE = 999;
    this.BALLOON_TYPE = 1e3;
    this.HEDENG_TYPE = 1001;
    this.QIXI_TYPE = 1002;
    this.KUA_CHONG_BANG_TYPE = 22;
    this.ZHONGYUAN_TYPE = 1003;
    this.SUPER_RECHARGE_UPDATE = "SUPER_RECHARGE_UPDATE";
    this.ACTIVITY_SHOP_UPDATE = "ACTIVITY_SHOP_UPDATE";
    this.AT_LIST_RANK_UPDATE = "AT_LIST_RANK_UPDATE";
    this.AT_LIST_MY_RANK_UPDATE = "AT_LIST_MY_RANK_UPDATE";

    this.ctor = function() {
        JsonHttp.subscribe(proto_sc.xshuodong.cash, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.amy, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.coin, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.juanzhou, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.qinmi, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.shili, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.zhengwu, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.login, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.yamen, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.lianyin, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.school, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.jingshang, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.nongchan, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.zhaomu, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.jishag2d, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.cjfanren, this.onCash, this);
        JsonHttp.subscribe(
            proto_sc.xshuodong.tiaozhanshu,
            this.onCash,
            this
        );
        JsonHttp.subscribe(proto_sc.xshuodong.zhenzai, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.tilidan, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.huolidan, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.meilizhi, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.fuyanhui, this.onCash, this);
        JsonHttp.subscribe(
            proto_sc.xshuodong.clubbosshit,
            this.onCash,
            this
        );
        JsonHttp.subscribe(
            proto_sc.xshuodong.clubbossjs,
            this.onCash,
            this
        );
        JsonHttp.subscribe(proto_sc.xshuodong.jiulouzf, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.xsRank, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.food, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.huolidan, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.treasure, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.qifu, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.jinglidan, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.chuyou, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.wenhou, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.jiaoji, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.yingyuan, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.xufang, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.lilian, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.pengren, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.dzlogin, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.stealdew, this.onCash, this);
        JsonHttp.subscribe(proto_sc.xshuodong.plant, this.onCash, this);
        JsonHttp.subscribe(
            proto_sc.czhuodong.onceRecharge,
            this.onCash,
            this
        );
        JsonHttp.subscribe(proto_sc.czhuodong.day, this.onCash, this);
        JsonHttp.subscribe(proto_sc.czhuodong.total, this.onCash, this);
        JsonHttp.subscribe(proto_sc.czhuodong.leitian, this.onCash, this);
        JsonHttp.subscribe(
            proto_sc.huodonglist.all,
            this.onHuodongList,
            this
        );
        JsonHttp.subscribe(proto_sc.sevenSign.cfg, this.onSevenSign, this);
        JsonHttp.subscribe(proto_sc.cbhuodong.shili, this.onClub, this);
        JsonHttp.subscribe(proto_sc.cbhuodong.love, this.onClub, this);
        JsonHttp.subscribe(proto_sc.cbhuodong.treasure, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.shililist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.lovelist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.treasurelist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myshiliRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myloveRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myTreaRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.duihuodong.duihuan,
            this.onDuihuan,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.guanqia, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.guanqialist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myguanqiaRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.yinliang, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.yinlianglist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myYinLiangRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.liangshi, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.liangshilist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myLiangShiRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.jiulou, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.jiuloulist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myJiuLouRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.shibing, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.shibinglist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myShiBingRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.shibing, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.shibinglist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myShiBingRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.herojb, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.herojblist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myHerojbRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.herozz, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.herozzlist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myHerozzRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.meili, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.meililist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myMeiLiRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.yamen, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.yamenlist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myyamenRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.clubyamen, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.clubyamenlist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myclubyamen,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.stealcl, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.stealcllist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myStealclRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.plants, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.plantslist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myPlantsRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.wifeskillexp,
            this.onClub,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.wifeskillexplist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.myWifeskillexpRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.cbhuodong.sonshili, this.onClub, this);
        JsonHttp.subscribe(
            proto_sc.cbhuodong.sonshililist,
            this.onCbRank,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cbhuodong.mySonshiliRid,
            this.onMyCbRank,
            this
        );
        JsonHttp.subscribe(proto_sc.daydaybuy.dayday, this.onDayDay, this);
        JsonHttp.subscribe(
            proto_sc.duihuanshop.shop,
            this.onDuihuanShop,
            this
        );
        JsonHttp.subscribe(proto_sc.actboss.flist, this.onBossList, this);
        JsonHttp.subscribe(proto_sc.actboss.hit, this.onBossHit, this);
        JsonHttp.subscribe(proto_sc.actboss.info, this.onBossInfo, this);
        JsonHttp.subscribe(proto_sc.actboss.myDmg, this.onBossMyDmg, this);
        JsonHttp.subscribe(
            proto_sc.actboss.rankList,
            this.onBossRankList,
            this
        );
        JsonHttp.subscribe(
            proto_sc.cjttczhuodong.cjttcz,
            this.onSuperRecharge,
            this
        );
    };
    this.clearData = function() {
        this.huodongList = null;
        this.curSelectData = null;
        this.sevenSign = null;
        this.cbRankList = null;
        this.cbMyRank = null;
        this.duihuan = null;
        this.dayday = null;
        this.duihuanShop = null;
        this.bossList = null;
        this.bossInfo = null;
        this.bossHit = null;
        this.bossMyDmg = null;
        this.bossRankList = null;
        this.superRecharge = null;
        this.curExchangeId = null;
    };
    this.onDuihuanShop = function(t) {
        this.duihuanShop = t;
        n.change(
            "duihuanshop",
            null != t && t.info && 1 == t.info.news
        );
        facade.send(this.UPDATE_DUIHUAN_SHOP);
    };
    this.onDayDay = function(t) {
        this.dayday = t;
        n.change("dayday", null != t && t.info && 1 == t.info.news);
        facade.send(this.UPDATE_DAYDAY_HUODONG);
    };
    this.onDuihuan = function(t) {
        this.duihuan = t;
        n.change(
            "duihuan",
            null != t && t.info && 1 == t.info.news
        );
        facade.send(this.UPDATE_DUIHUAN_HUODONG);
    };
    this.onCash = function(t) {
        facade.send("LIMIT_ACTIVITY_UPDATE", t);
    };
    this.onClub = function(t) {
        facade.send("AT_LIST_UPDATE", t);
    };
    this.onHuodongList = function(t) {
        null == this.huodongList
            ? (this.huodongList = t)
            : i.utils.copyList(this.huodongList, t);
        for (var e = {}, o = 0; o < this.huodongList.length; o++)
            this.huodongList[o] &&
                1 == this.huodongList[o].news &&
                (e[this.huodongList[o].type] = 1);
        n.change("limitactivity", 1 == e[this.LIMIT_ACTIVITY_TYPE]);
        n.change("atlist", 1 == e[this.AT_LIST_TYPE]);
        null == this.duihuan &&
            n.change("duihuan", 1 == e[this.DUIHUAN_ID]);
        null == this.dayday &&
            n.change("dayday", 1 == e[this.DAYDAY_ID]);
        n.change("support", 1 == e[this.SUPPORT_ID]);
        n.change("rechage_activity", 1 == e[this.RECHARGE_TYPE]);
        n.change("daily_recharge", 1 == e[this.DAILY_RECHARGE]);
        n.change("prince", 1 == e[this.PRINCE_ID]);
        n.change("clothepve", 1 == e[this.CLOTHEPVE_ID]);
        n.change("levelgift", 1 == e[this.LEVEL_GIFT_ID]);
        n.change("snowman_activity", 1 == e[this.SNOWMAN_TYPE]);
        n.change("snowman", 1 == e[this.SNOWMAN_ID]);
        n.change("hedeng_activity", 1 == e[this.HEDENG_TYPE]);
        n.change("hedeng", 1 == e[this.HEDENG_ID]);
        n.change("clothepvp", 1 == e[this.CLOTHEPVP_ID]);
        n.change("continuity_recharge", 1 == e[this.LXCZ_ID]);
        n.change("purchase", 1 == e[this.CZLB_ID]);
        n.change("lucky_brand", 1 == e[this.LUCKY_BRAND_ID]);
        n.change("lantern", 1 == e[this.LANTERN_ID]);
        n.change("jieqi", 1 == e[this.JIE_QI_ID]);
        n.change("snowman_activity", 1 == e[this.SPRING_TYPE]);
        n.change("tangyuan", 1 == e[this.TANG_YUAN_ID]);
        n.change("girlsday", 1 == e[this.GIRLS_DAY_ID]);
        n.change("girlsday_activity", 1 == e[this.GIRLS_TYPE]);
        n.change("arborday", 1 == e[this.ARBOR_DAY_ID]);
        n.change("arbor_activity", 1 == e[this.ARBOR_TYPE]);
        n.change("spell", 1 == e[this.SPELL_ID]);
        n.change("qingming_activity", 1 == e[this.QING_MING_TYPE]);
        n.change("qingming", 1 == e[this.QING_MING_ID]);
        n.change("super_recharge", 1 == e[this.SUPER_RECHARGE_ID]);
        n.change("readingday", 1 == e[this.READING_DAY_ID]);
        n.change("readingday_activity", 1 == e[this.READING_TYPE]);
        n.change("single_recharge", 1 == e[this.SINGLE_RECHAGR_ID]);
        n.change("laborday", 1 == e[this.LABOR_DAY_ID]);
        n.change("laborday_activity", 1 == e[this.LABOR_TYPE]);
        n.change("lion", 1 == e[this.LION_ID]);
        n.change("luckytable", 1 == e[this.LUCKY_TABLE_ID]);
        n.change(
            "dragonboat_activity",
            1 == e[this.DRAGON_BOAT_TYPE]
        );
        n.change("dragonboat", 1 == e[this.DRAGON_BOAT_ID]);
        n.change(
            "luckytable_activity",
            1 == e[this.LUCKY_TABLE_TYPE]
        );
        n.change("balloon_activity", 1 == e[this.BALLOON_TYPE]);
        n.change("balloon", 1 == e[this.BALLOON_ID]);
        n.change("fourking", 1 == e[this.FOURKING_ID]);
        n.change("gaodian", 1 == e[this.GAO_DIAN_ID]);
        n.change("thirtydays", 1 == e[this.THIRTYDAYS_ID]);
        n.change("cross", 1 == e[this.KUA_CHONG_BANG_TYPE]);
        n.change("qixi", 1 == e[this.QIXI_ID]);
        n.change("qixi_activity", 1 == e[this.QIXI_TYPE]);
        n.change("zhongyuan", 1 == e[this.ZHONGYUAN_ID]);
        n.change("zhongyuan_activity", 1 == e[this.ZHONGYUAN_TYPE]);
        facade.send(this.LIMIT_ACTIVITY_HUO_DONG_LIST);
    };
    this.isHaveTypeActive = function(t) {
        if (null == this.huodongList) return !1;
        for (var e = 0; e < this.huodongList.length; e++)
            if (
                this.huodongList[e].type == t &&
                i.timeUtil.second < this.huodongList[e].showTime
            )
                return !0;
        return !1;
    };
    this.onCbRank = function(t) {
        this.cbRankList = t;
        facade.send(this.AT_LIST_RANK_UPDATE);
    };
    this.onMyCbRank = function(t) {
        this.cbMyRank = t;
        facade.send("AT_LIST_MY_RANK_UPDATE");
    };
    this.getHuodongList = function(t) {
        var e = [];
        if (null == this.huodongList) return e;
        for (var o = 0; o < this.huodongList.length; o++)
            this.huodongList[o].type == t
                ? e.push(this.huodongList[o])
                : this.huodongList[o].type == t &&
                  e.push(this.huodongList[o]);
        e.sort(this.sortHuodong);
        return e;
    };
    this.sortHuodong = function(t, e) {
        return t.news > e.news ? -1 : t.news == e.news ? t.id - e.id : 1;
    };
    this.sendLookActivityData = function(t, e) {
        void 0 === e && (e = null);
        JsonHttp.send(
            new proto_cs.huodong["hd" + t + "Info"](),
            function() {
                e && e();
            }
        );
    };
    this.sendGetActivityReward = function(t, e) {
        void 0 === e && (e = 0);
        var o = new proto_cs.huodong["hd" + t + "Rwd"]();
        0 != e && (o.id = e);
        JsonHttp.send(o, function() {
            l.timeProxy.floatReward();
        });
    };
    this.sendActivityShopExchange = function(t, e) {
        void 0 === e && (e = 0);
        var o = new proto_cs.huodong["hd" + t + "exchange"]();
        0 != e && (o.id = e);
        JsonHttp.send(o, function() {
            l.timeProxy.floatReward();
        });
    };
    this.onSevenSign = function(t) {
        this.sevenSign = t;
        for (var e = !1, o = 0; o < this.sevenSign.level.length; o++)
            if (1 == this.sevenSign.level[o].type) {
                e = !0;
                break;
            }
        n.change("sevenday", e);
        facade.send(this.UPDATE_LIMIT_ACTIVE_SEVEN);
    };
    this.sendSevenRwd = function(t) {
        var e = new proto_cs.huodong.hd287Get();
        e.id = t;
        JsonHttp.send(e, function() {
            l.timeProxy.floatReward();
        });
    };
    this.sendHdList = function() {
        JsonHttp.send(new proto_cs.huodong.hdList());
    };
    this.getActivityData = function(t) {
        var e = null;
        if (this.huodongList)
            for (var o = 0; o < this.huodongList.length; o++)
                if (t == this.huodongList[o].id) {
                    e = this.huodongList[o];
                    break;
                }
        return e;
    };
    this.onBossList = function(t) {
        this.bossList = t;
        facade.send(this.UPDATE_BOSS_LIST);
    };
    this.onBossHit = function(t) {
        this.bossHit = t;
    };
    this.onBossInfo = function(t) {
        this.bossInfo = t;
        facade.send(this.UPDATE_BOSS_INFO);
    };
    this.onBossMyDmg = function(t) {
        this.bossMyDmg = t;
    };
    this.onBossRankList = function(t) {
        this.bossRankList = t;
    };
    this.onSuperRecharge = function(t) {
        this.superRecharge = t;
        facade.send("SUPER_RECHARGE_UPDATE");
    };
    this.sendBossRank = function(t) {
        var e = this;
        JsonHttp.send(new proto_cs.huodong.hd6010Rank(), function() {
            var t = {};
            t.rank = e.bossMyDmg.g2dmyrank;
            t.value = e.bossMyDmg.g2dmydamage;
            i.utils.openPrefabView("RankCommon", null, {
                rankType: "ACTBOSS_RANK",
                list: e.bossRankList,
                mine: t
            });
        });
    };
    this.sendBossBack = function(t) {
        var e = new proto_cs.huodong.hd6010Add();
        e.id = t;
        JsonHttp.send(e);
    };
    this.sendBossHit = function(t, e) {
        var o = new proto_cs.huodong.hd6010Fight();
        o.id = t;
        o.type = e;
        JsonHttp.send(o, function() {
            l.timeProxy.floatReward();
        });
    };
    this.sendSpecialBuy = function(t, e, o) {
        var n = this.getActivityData(t);
        if (n && i.timeUtil.second > n.eTime)
            i.alertUtil.alert18n("ACTHD_OVERDUE");
        else {
            var r = new proto_cs.huodong["hd" + t + "buy"]();
            r.id = e;
            r.num = o;
            JsonHttp.send(r, function() {
                l.timeProxy.floatReward();
            });
        }
    };
    this.sendOpenSuperRecharge = function() {
        JsonHttp.send(new proto_cs.huodong.hd6225Info());
    };
    this.sendGetSuperRechargeRwd = function(t) {
        var e = new proto_cs.huodong.hd6225Rwd();
        e.id = t;
        JsonHttp.send(e, function() {
            l.timeProxy.floatReward();
        });
    };
    this.sendGetSuperRechargeTotal = function(t) {
        var e = new proto_cs.huodong.hd6225TotalRwd();
        e.id = t;
        JsonHttp.send(e, function() {
            l.timeProxy.floatReward();
        });
    };
    this.sendScoreChange = function(t, e) {
        var o = new proto_cs.huodong["hd" + t + "duihuan"]();
        o.id = e;
        JsonHttp.send(o, function() {
            l.timeProxy.floatReward();
        });
    };
}
exports.LimitActivityProxy = LimitActivityProxy;

var ActivityUtils = function() {

    this._list = null;

    this.initLeftList = function() {
        if (!this._list) {
            this._list = [];
            this._list.push({
                funitem: r.funUtils.zhongyuan,
                url: "btn_zy",
                binding: ["zhongyuan", "zhongyuan_activity"],
                type: 1,
                id: l.limitActivityProxy.ZHONGYUAN_ID
            });
            this._list.push({
                funitem: r.funUtils.thirtydays,
                url: "btn_td",
                binding: ["thirtydays"],
                type: 1,
                id: l.limitActivityProxy.THIRTYDAYS_ID
            });
            this._list.push({
                funitem: r.funUtils.hedeng,
                url: "btn_hdr",
                binding: ["hedeng_activity", "hedeng"],
                type: 1,
                id: l.limitActivityProxy.HEDENG_ID
            });
            this._list.push({
                funitem: r.funUtils.dragonBoat,
                url: "btn_slz",
                binding: ["dragonboat", "dragonboat_activity"],
                type: 1,
                id: l.limitActivityProxy.DRAGON_BOAT_ID
            });
            this._list.push({
                funitem: r.funUtils.lion,
                url: "btn_wsdh",
                binding: ["lion"],
                type: 1,
                id: l.limitActivityProxy.LION_ID
            });
            this._list.push({
                funitem: r.funUtils.laborday,
                url: "btn_cghd",
                binding: ["laborday", "laborday_activity"],
                type: 1,
                id: l.limitActivityProxy.LABOR_DAY_ID
            });
            this._list.push({
                funitem: r.funUtils.readingDay,
                url: "btn_csg",
                binding: ["readingday", "readingday_activity"],
                type: 1,
                id: l.limitActivityProxy.READING_DAY_ID
            });
            this._list.push({
                funitem: r.funUtils.qingming,
                url: "btn_qmj",
                binding: ["qingming", "qingming_activity"],
                type: 1,
                id: l.limitActivityProxy.QING_MING_ID
            });
            this._list.push({
                funitem: r.funUtils.spell,
                url: "btn_xbmh",
                binding: ["spell"],
                type: 1,
                id: l.limitActivityProxy.SPELL_ID
            });
            this._list.push({
                funitem: r.funUtils.arbodday,
                url: "btn_zsj",
                binding: ["arborday", "arbor_activity"],
                type: 1,
                id: l.limitActivityProxy.ARBOR_DAY_ID
            });
            this._list.push({
                funitem: r.funUtils.girlsDay,
                url: "btn_girls",
                binding: ["girlsday", "girlsday_activity", "girlsday_num"],
                type: 1,
                id: l.limitActivityProxy.GIRLS_DAY_ID
            });
            this._list.push({
                funitem: r.funUtils.luckyCarp,
                url: "btn_fxjl",
                binding: [""],
                type: 1,
                id: l.limitActivityProxy.LUCKY_CARP
            });
            this._list.push({
                funitem: r.funUtils.guoli,
                url: "btn_glsd",
                binding: ["guoli"],
                type: 1,
                id: l.limitActivityProxy.GUO_LI_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.snowman,
                url: "btn_xr|btn_fbz",
                binding: ["snowman_activity", "snowman"],
                type: 1,
                id: l.limitActivityProxy.SNOWMAN_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.clothepve,
                url: "btn_szcx",
                binding: ["clothepve"],
                type: 1,
                id: l.limitActivityProxy.CLOTHEPVE_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.clothepvp,
                url: "btn_zxdy",
                binding: ["clothepvp"],
                type: 1,
                id: l.limitActivityProxy.CLOTHEPVP_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.duihuanShop,
                url: "btn_dh",
                binding: ["duihuanshop"],
                type: 1,
                id: l.limitActivityProxy.DUIHUANSHOP_ID
            });
            this._list.push({
                funitem: r.funUtils.atList,
                url: "btn_cbhd",
                binding: [""],
                type: 1,
                id: l.limitActivityProxy.AT_LIST_TYPE,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.support,
                url: "btn_yy",
                binding: ["support"],
                type: 1,
                id: l.limitActivityProxy.SUPPORT_TYPE,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.duihuan,
                url: "btn_zm",
                binding: ["duihuan"],
                type: 1,
                id: l.limitActivityProxy.DUIHUAN_ID
            });
            this._list.push({
                funitem: r.funUtils.limitActivity,
                url: "btn_xshd",
                binding: ["limitactivity"],
                type: 1,
                id: l.limitActivityProxy.LIMIT_ACTIVITY_TYPE
            });
            this._list.push({
                funitem: r.funUtils.voice,
                url: "btn_yyb",
                binding: [""],
                type: 1,
                id: l.limitActivityProxy.VOICE_ID
            });
            this._list.push({
                funitem: r.funUtils.balloon,
                url: "btn_rqq",
                binding: ["balloon", "balloon_activity"],
                type: 1,
                id: l.limitActivityProxy.BALLOON_ID
            });
            this._list.push({
                funitem: r.funUtils.kuachongbang,
                url: "btn_kfb",
                binding: ["cross", "huanggong"],
                type: 1,
                id: l.limitActivityProxy.KUA_CHONG_BANG_TYPE,
                isEff: 1
            });
            this._list.push({
                funitem: r.funUtils.qixi,
                url: "btn_qixi",
                binding: ["qixi", "qixi_activity"],
                type: 1,
                id: l.limitActivityProxy.QIXI_ID
            });
            this._list.push({
                funitem: r.funUtils.fourking,
                url: "btn_sdfw",
                binding: ["fourking"],
                type: 2,
                id: l.limitActivityProxy.FOURKING_ID
            });
            this._list.push({
                funitem: r.funUtils.luckyTable,
                url: "btn_xymp",
                binding: ["luckytable_activity"],
                type: 2,
                id: l.limitActivityProxy.LUCKY_TABLE_ID
            });
            this._list.push({
                funitem: r.funUtils.singleRecharge,
                url: "btn_dblc",
                binding: ["single_recharge"],
                type: 2,
                id: l.limitActivityProxy.SINGLE_RECHAGR_ID
            });
            this._list.push({
                funitem: r.funUtils.superRecharge,
                url: "btn_ltcz",
                binding: ["super_recharge"],
                type: 2,
                id: l.limitActivityProxy.SUPER_RECHARGE_ID
            });
            this._list.push({
                funitem: r.funUtils.tangyuan,
                url: "btn_qty",
                binding: ["tangyuan"],
                type: 2,
                id: l.limitActivityProxy.TANG_YUAN_ID
            });
            this._list.push({
                funitem: r.funUtils.gaodian,
                url: "btn_qgd",
                binding: ["gaodian"],
                type: 2,
                id: l.limitActivityProxy.GAO_DIAN_ID
            });
            this._list.push({
                funitem: r.funUtils.jieqiview,
                url: "btn_lchl",
                binding: ["jieqi"],
                type: 2,
                id: l.limitActivityProxy.JIE_QI_ID
            });
            this._list.push({
                funitem: r.funUtils.lantern,
                url: "btn_ddl",
                binding: ["lantern"],
                type: 2,
                id: l.limitActivityProxy.LANTERN_ID
            });
            this._list.push({
                funitem: r.funUtils.purchase,
                url: "btn_czlb",
                binding: ["purchase"],
                type: 2,
                id: l.limitActivityProxy.CZLB_ID
            });
            this._list.push({
                funitem: r.funUtils.luckybrand,
                url: "btn_czfp",
                binding: ["lucky_brand"],
                type: 2,
                id: l.limitActivityProxy.LUCKY_BRAND_ID,
                isEff: 2
            });
            this._list.push({
                funitem: r.funUtils.prince,
                url: "btn_hzzm",
                binding: ["prince"],
                type: 2,
                id: l.limitActivityProxy.PRINCE_ID
            });
            this._list.push({
                funitem: r.funUtils.rechargActivity,
                url: "btn_cz",
                binding: ["rechage_activity"],
                type: 2,
                id: l.limitActivityProxy.RECHARGE_TYPE
            });
            this._list.push({
                funitem: r.funUtils.trunTable,
                url: "btn_mp",
                binding: [""],
                type: 2,
                id: l.limitActivityProxy.TRUN_TABLE_ID
            });
            this._list.push({
                funitem: r.funUtils.dayday,
                url: "btn_ttms",
                binding: ["dayday"],
                type: 2,
                id: l.limitActivityProxy.DAYDAY_ID
            });
            this._list.push({
                funitem: r.funUtils.dailyRecharge,
                url: "btn_ttcz",
                binding: ["daily_recharge"],
                type: 2,
                id: l.limitActivityProxy.DAILY_RECHARGE
            });
            this._list.push({
                funitem: r.funUtils.levelgift,
                url: "btn_djlb",
                binding: ["levelgift"],
                type: 2,
                id: l.limitActivityProxy.LEVEL_GIFT_ID
            });
            this._list.push({
                funitem: r.funUtils.continuityrecharge,
                url: "btn_lxcz",
                binding: ["continuity_recharge"],
                type: 2,
                id: l.limitActivityProxy.LXCZ_ID
            });
        }
    };
    Object.defineProperty(ActivityUtils.prototype, "activityList", {
        get: function() {
            null == this._list && this.initLeftList();
            return this._list;
        },
        enumerable: !0,
        configurable: !0
    });
}
exports.ActivityUtils = ActivityUtils;
var AcitityDataItem = function() {
    this.funitem = null;
    this.url = "";
    this.binding = [];
    this.id = 0;
    this.type = 1;
    this.isEff = 1;
};
exports.AcitityDataItem = AcitityDataItem;
exports.activityUtils = new ActivityUtils();
