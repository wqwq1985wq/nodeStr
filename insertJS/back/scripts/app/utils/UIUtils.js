var utils = require("./Utils");
var getEffectItem = require("../component/GetEffectItem");
var config = require("../Config");
var initializer = require("../Initializer");

function UIUtils() {
    //震动效果
    this.shakeArr = [[1, 1], [-1, -1], [-1, 1], [1, -1]];
    //
    //倒计时

        this.countDown = function(t, e, o, n, l, r, a) {
            void 0 === n && (n = !0);
            if (null != e && 0 != t) {
                e.unscheduleAllCallbacks();
                e.schedule(s, 1);
                s();
            }
            function s() {
                var s = t - utils.timeUtil.second;
                if (s > 0 && n)
                    if (r && "" != l) {
                        var c = {};
                        c[r] = utils.timeUtil.second2hms(s, a);
                        e.string = i18n.t(l, c);
                    } else
                        e.string =
                            (l && "" != l ? i18n.t(l) : "") +
                            utils.timeUtil.second2hms(s, a);
                else if (s <= 0) {
                    o && o();
                    e.unscheduleAllCallbacks();
                }
            }
        };
        this.scaleRepeat = function(t, e, o, i) {
            void 0 === e && (e = 0.8);
            void 0 === o && (o = 1.2);
            void 0 === i && (i = 1);
            if (null != t) {
                var n = t.scaleX,
                    l = t.scaleY;
                t.scaleX = n * e;
                t.scaleY = l * e;
                t.runAction(
                    cc.repeatForever(
                        cc.sequence(
                            cc.scaleTo(i, n * o, l * o),
                            cc.scaleTo(i, n * e, l * e)
                        )
                    )
                );
            }
        };
        this.fadeRepeat = function(t, e, o, i) {
            void 0 === e && (e = 0);
            void 0 === o && (o = 255);
            void 0 === i && (i = 1);
            if (null != t) {
                t.opacity = e;
                t.runAction(
                    cc.repeatForever(
                        cc.sequence(cc.fadeTo(i, o), cc.fadeTo(i, e))
                    )
                );
            }
        };
        this.fadeOver = function(t, e, o) {
            void 0 === e && (e = 0);
            void 0 === o && (o = 1);
            null != t && t.runAction(cc.fadeTo(o, e));
        };
        this.showText = function(t, e, o, i) {
            void 0 === o && (o = 0.1);
            if (null != t && "" != e && 0 != e.length)
                if (1 != e.length) {
                    t.string = "";
                    t.unscheduleAllCallbacks();
                    t.isRunShowText = !0;
                    t.context = e;
                    t.schedule(n, o);
                    n();
                } else {
                    t.unscheduleAllCallbacks();
                    t.isRunShowText = !1;
                    i && i();
                    t.string = e;
                }
            function n() {
                var o = t.string ? t.string.length : 0;
                if (o < e.length) t.string = e.substring(0, o + 1);
                else {
                    t.unscheduleAllCallbacks();
                    t.isRunShowText = !1;
                    i && i();
                }
            }
        };
        this.showNumChange = function(t, e, o, n, l, r, a, s) {
            void 0 === n && (n = 30);
            void 0 === s && (s = !0);
            if (null != t)
                if (e != o) {
                    t.numIndex = 1;
                    t.unscheduleAllCallbacks();
                    t.schedule(c, 0.04);
                    c();
                } else {
                    t.numIndex = n;
                    c();
                }
            function c() {
                var c = t.numIndex++,
                    _ = e + Math.floor(((o - e) / n) * c);
                _ = c >= n ? o : _;
                var d = s ? utils.utils.formatMoney(_) : _ + "";
                if (l)
                    if (r) {
                        var u = {};
                        u[r] = d;
                        d = i18n.t(l, u);
                    } else d = i18n.t(l) + " " + d;
                t.string = d;
                if (c >= n) {
                    t.unscheduleAllCallbacks();
                    a && a();
                }
            }
        };
        this.showPrgChange = function(t, e, o, i, n, l) {
            void 0 === e && (e = 0);
            void 0 === o && (o = 1);
            void 0 === i && (i = 1);
            void 0 === n && (n = 30);
            if (null != t) {
                n = n;
                i = i;
                e = e;
                o = null != o ? o : 1;
                t.progress = e;
                if (e != o) {
                    t.numIndex = 1;
                    t.unscheduleAllCallbacks();
                    t.schedule(r, 0.04);
                    r();
                }
            }
            function r() {
                var r = t.numIndex++,
                    a = e + ((o - e) / n) * ((r % n) + 1);
                a = (a = a < 0.05 ? 0 : a) > 1 ? 1 : a;
                t.progress = a;
                if (r + 1 >= n * i) {
                    t.unscheduleAllCallbacks();
                    l && l();
                }
            }
        };
        this.getRwd = function(t) {
            for (
                var e = new Array(), o = t.split(","), i = 0;
                i < o.length;
                i++
            ) {
                var n = o[i].split("|"),
                    l = new s();
                l.id = n.length > 0 ? parseInt(n[0]) : 0;
                l.count = n.length > 1 ? parseInt(n[1]) : 0;
                l.kind = n.length > 2 ? parseInt(n[2]) : 0;
                e.push(l);
            }
            return e;
        };
        this.getRwdItem = function(t) {
            for (var e = new Array(), o = {}, i = 0; t && i < t.length; i++) {
                var n = t[i].itemid;
                if (1 != o[n]) {
                    o[n] = 1;
                    e.push({
                        id: n
                    });
                }
            }
            return e;
        };
        this.getItemNameCount = function(t, e) {
            var o = localcache.getItem(localdb.table_item, t);
            return i18n.t("COMMON_ADD", {
                n: o ? o.name : "",
                c: e
            });
        };
        this.showShake = function(t, e, o, i) {
            void 0 === e && (e = 4);
            void 0 === o && (o = 12);
            if (null != t) {
                var n = this;
                if (t.orgx) {
                    t.node.x = t.orgx;
                    t.node.y = t.orgy;
                } else {
                    t.orgx = t.node.x;
                    t.orgy = t.node.y;
                }
                t.numIndex = 1;
                t.unscheduleAllCallbacks();
                t.schedule(l, 0.04);
                l();
            }
            function l() {
                var l = t.numIndex++,
                    r = (o - l) / o,
                    a = l % 4;
                t.node.x = n.shakeArr[a][0] * r * e + t.orgx;
                t.node.y = n.shakeArr[a][1] * r * e + t.orgy;
                if (l >= o) {
                    t.node.x = t.orgx;
                    t.node.y = t.orgy;
                    t.unscheduleAllCallbacks();
                    i && i();
                }
            }
        };
        this.showShakeNode = function(t, e, o, i) {
            void 0 === e && (e = 4);
            void 0 === o && (o = 12);
            if (null != t) {
                var n = t.getComponent(cc.Component);
                n && this.showShake(n, e, o, i);
            }
        };
        this.floatPos = function(t, e, o, i) {
            void 0 === e && (e = 0);
            void 0 === o && (o = 0);
            void 0 === i && (i = 1);
            if (null != t) {
                if (t.orgx) {
                    t.x = t.orgx;
                    t.y = t.orgy;
                } else {
                    t.orgx = t.x;
                    t.orgy = t.y;
                }
                t.x = t.orgx + e;
                t.y = t.orgy + o;
                t.runAction(
                    cc.repeatForever(
                        cc.sequence(
                            cc.moveTo(i, t.orgx - e, t.orgy - o),
                            cc.moveTo(i, t.orgx + e, t.orgy + o)
                        )
                    )
                );
            }
        };
    }
exports.UIUtils = UIUtils;
exports.uiUtils = new UIUtils();

var ItemSlotData = function() {
    this.count = 0;
    this.id = 0;
    this.kind = 0;
    this.itemid = 0;
}
exports.ItemSlotData = ItemSlotData;

function UIHelp() {

    this.getItemSlot = function(t) {
        return config.Config.skin + "/res/ico/" + t;
    };
    this.getItemColor = function(t) {
        return config.Config.skin + "/res/itemslot/simg_c" + t;
    };
    this.getStory = function(t) {
        return config.Config.skin + "/res/story/" + t;
    };
    this.getStoryBg = function(t) {
        return config.Config.skin + "/prefabs/story/" + t;
    };
    this.getServantHead = function(t) {
        return config.Config.skin + "/res/servanthead/" + t;
    };
    this.getServantSpine = function(t) {
        return 0 != initializer.servantProxy.getHeroUseSkin(t)
            ? this.getServantSkinSpine(t)
            : config.Config.skin + "/prefabs/servant/mk_" + t;
    };
    this.getServantSmallSpine = function(t) {
        return 0 != initializer.servantProxy.getHeroUseSkin(t)
            ? this.getServantSkinSmallSpine(t)
            : config.Config.skin + "/prefabs/servantsmall/mk_" + t;
    };
    this.getHead = function(t, e) {
        return (
            config.Config.skin + "/prefabs/role/head_" + (1 == t ? 1 : 0) + "_" + e
        );
    };
    this.getHeadH = function(t, e) {
        return (
            config.Config.skin + "/prefabs/role/headh_" + (1 == t ? 1 : 0) + "_" + e
        );
    };
    this.getHeadF = function(t, e) {
        return (
            config.Config.skin + "/prefabs/role/headf_" + (1 == t ? 1 : 0) + "_" + e
        );
    };
    this.getBody = function(t, e) {
        return (
            config.Config.skin + "/prefabs/role/body_" + (1 == t ? 1 : 0) + "_" + e
        );
    };
    this.getRoleSpinePart = function(t) {
        return config.Config.skin + "/prefabs/role/" + t;
    };
    this.getRolePart = function(t) {
        return config.Config.skin + "/res/clothe/" + t;
    };
    this.getEnemy = function(t) {
        return this.getServantSmallSpine(0 == t ? 1 : t);
    };
    this.getResIcon = function(t) {
        return config.Config.skin + "/res/resIcon/" + t;
    };
    this.getWifeHead = function(t) {
        return config.Config.skin + "/res/servanthead/" + t;
    };
    this.getWifeBody = function(t) {
        return config.Config.skin + "/prefabs/servant/mk_" + t;
    };
    this.getWifeSmallBody = function(t) {
        return config.Config.skin + "/prefabs/servantsmall/mk_" + t;
    };
    this.getSonHead = function(t, e) {
        return (
            config.Config.skin + "/res/childhead/" + (1 == e ? "boy" : "girl") + "_1"
        );
    };
    this.getSonBody = function(t, e) {
        return (
            config.Config.skin + "/prefabs/child/" + (1 == t ? "boy" : "girl") + "_1"
        );
    };
    this.getSonChengHead = function(t, e) {
        return (
            config.Config.skin +
            "/res/childhead/" +
            (1 == e ? "man" : "woman") +
            "_1"
        );
    };
    this.getSonChengBody = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/child/" +
            (1 == t ? "man" : "woman") +
            "_1"
        );
    };
    this.getStoryPrefab = function(t) {
        return config.Config.skin + "/prefabs/effect/story/" + t;
    };
    this.getBabyBody = function() {
        return config.Config.skin + "/prefabs/child/baby_0";
    };
    this.getKejuBody = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "man" : "woman") +
            "_1"
        );
    };
    this.getHonourIcon = function(t) {
        return config.Config.skin + "/res/honour/honour_" + t;
    };
    this.getSevenDay = function(t) {
        return config.Config.skin + "/res/active/seven/icon_day" + t;
    };
    this.getSevenDayLbl = function(t) {
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/res/active/seven/day" + t
            : config.Config.skin + "_" + config.Config.lang + "/res/ui/day" + t;
    };
    this.getSevenDayNum = function(t) {
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/res/active/seven/d" + t
            : config.Config.skin + "_" + config.Config.lang + "/res/ui/d" + t;
    };
    this.getCellBody = function(t) {
        return config.Config.skin + "/prefabs/pet/" + t;
    };
    this.getCellHeadIcon = function(t) {
        return config.Config.skin + "/res/pet/" + t;
    };
    this.getLookBuild = function(t) {
        return config.Config.skin + "/res/ui/look/" + t;
    };
    this.getDataUrl = function(t) {
        return (
            config.Config.skin +
            ("zh-ch" == config.Config.lang ? "" : "_" + config.Config.lang) +
            "/res/db/" +
            t
        );
    };
    this.getUIPrefab = function(t) {
        return config.Config.skin + "/prefabs/ui/" + t;
    };
    this.getJYPic = function(t) {
        return config.Config.skin + "/prefabs/jy/" + t;
    };
    this.getJYIcon = function(t) {
        return config.Config.skin + "/res/jingying/" + t;
    };
    this.getMatchFind = function(t) {
        return config.Config.skin + "/res/baowu/" + t;
    };
    this.getTreasureGroup = function(t) {
        return config.Config.skin + "/res/baowu/" + t;
    };
    this.getTreasure = function(t) {
        return config.Config.skin + "/res/baowu/" + t;
    };
    this.getAvatar = function(t) {
        return config.Config.skin + "/res/avatar/" + t;
    };
    this.getBlank = function(t) {
        return config.Config.skin + "/prefabs/avatar/blank" + t;
    };
    this.getChargeItem = function(t) {
        return config.Config.skin + "/res/charge/" + t;
    };
    this.getStoryRoleName = function(t) {
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/res/storyname/" + t
            : config.Config.skin + "_" + config.Config.lang + "/res/storyname/s" + t;
    };
    this.getXunfangIcon = function(t) {
        return config.Config.skin + "/res/xufang/" + t;
    };
    this.getLimitActivityBg = function(t) {
        return (
            config.Config.skin +
            ("zh-ch" == config.Config.lang ? "" : "_" + config.Config.lang) +
            "/res/limitactivity/" +
            t
        );
    };
    this.getTaskIcon = function(t) {
        return config.Config.skin + "/res/dailyrwd/" + t;
    };
    this.getAchieveIcon = function(t) {
        return config.Config.skin + "/res/chengjiu/" + t;
    };
    this.getServantSkillIcon = function(t) {
        return config.Config.skin + "/res/servantskill/" + t;
    };
    this.getKidSmallHead = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "boy" : "girl") +
            "_head_" +
            t
        );
    };
    this.getKidSmallBody = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "boy" : "girl") +
            "_body_" +
            t
        );
    };
    this.getKidChengHead = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "man" : "woman") +
            "_head_" +
            t
        );
    };
    this.getKidChengBody = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/child/" +
            (1 == e ? "man" : "woman") +
            "_body_" +
            t
        );
    };
    this.getKidMarryBody = function(t) {
        return (
            config.Config.skin +
            "/prefabs/child/" +
            (1 == t ? "man" : "woman") +
            "_body_0"
        );
    };
    this.getChuXingIcon = function(t) {
        return config.Config.skin + "/res/chuxing/" + t;
    };
    this.getXingLiIcon = function(t) {
        return config.Config.skin + "/res/xingli/" + t;
    };
    this.getKidSmallHead_2 = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/childsmall/" +
            (1 == e ? "boy" : "girl") +
            "_head_" +
            t
        );
    };
    this.getKidSmallBody_2 = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/childsmall/" +
            (1 == e ? "boy" : "girl") +
            "_body_" +
            t
        );
    };
    this.getKidChengHead_2 = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/childsmall/" +
            (1 == e ? "man" : "woman") +
            "_head_" +
            t
        );
    };
    this.getKidChengBody_2 = function(t, e) {
        return (
            config.Config.skin +
            "/prefabs/childsmall/" +
            (1 == e ? "man" : "woman") +
            "_body_" +
            t
        );
    };
    this.getVoiceName = function(t, e) {
        return (
            config.Config.skin +
            ("zh-ch" == config.Config.lang ? "" : "_" + config.Config.lang) +
            "/res/voice/" +
            (1 == t ? "hero_" : "wife_") +
            e
        );
    };
    this.getLogo = function() {
        return config.Config.skin + "/res/logo/" + config.Config.logo;
    };
    this.getLangSprite = function(t) {
        return "zh-ch" == config.Config.lang
            ? ""
            : config.Config.skin + "_" + config.Config.lang + "/res/ui/" + t;
    };
    this.getLangPrefab = function(t) {
        return "zh-ch" == config.Config.lang
            ? ""
            : config.Config.skin + "_" + config.Config.lang + "/prefabs/" + t;
    };
    this.getLangSp = function(t) {
        t = 4 == t ? 1 : 1 == t ? 4 : t;
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/res/ui/servantsp/pinz0" + t
            : config.Config.skin + "_" + config.Config.lang + "/res/ui/pinz0" + t;
    };
    this.getActivityBtn = function(t) {
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/res/ui/activity/" + t
            : config.Config.skin + "_" + config.Config.lang + "/res/ui/" + t;
    };
    this.getSnowmanIcon = function(t) {
        return config.Config.skin + "/res/snowman/snowman_" + t;
    };
    this.getGuWuIcon = function(t) {
        return config.Config.skin + "/res/ui/zhongyuan/guwu_" + t;
    };
    this.getHedengIcon = function(t) {
        return config.Config.skin + "/res/hedeng/hedeng_" + t;
    };
    this.getChatBlank = function(t) {
        return config.Config.skin + "/res/avatar/chat/" + t + "k";
    };
    this.getPurchaseIcon = function(t) {
        return config.Config.skin + "/res/ui/purchase/" + t;
    };
    this.getActivityUrl = function(t) {
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/prefabs/activity/" + t
            : config.Config.skin + "_" + config.Config.lang + "/prefabs/" + t;
    };
    this.getChengHaoUrl = function(t) {
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/res/chenghao/" + t
            : config.Config.skin + "_" + config.Config.lang + "/res/ui/" + t;
    };
    this.getChengHaoIcon = function(t) {
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/res/chenghao/" + t
            : config.Config.skin + "_" + config.Config.lang + "/res/ui/" + t;
    };
    this.getRankIcon = function(t) {
        return config.Config.skin + "/res/ui/rank/" + t;
    };
    this.getFlowerPlant = function(t, e) {
        if (0 == t) return "";
        switch (e) {
            case 0:
                t = 1e4;
                break;

            case 1:
                t = 2e4;
        }
        return config.Config.skin + "/prefabs/plant/" + t;
    };
    this.getChatSpine = function(t) {
        return config.Config.skin + "/prefabs/avatar/chat" + t;
    };
    this.getGuoliIcon = function(t) {
        return config.Config.skin + "/res/ui/guoli/img_qd" + t;
    };
    this.getDeatilBg = function(t) {
        return config.Config.skin + "/res/ui/servant/pro_bg" + t;
    };
    this.getSpringBz = function(t) {
        return config.Config.skin + "/res/ui/spring/baozhu_" + t;
    };
    this.getJbTitleBg = function(t) {
        return config.Config.skin + "/res/jiban/title_bg_" + t;
    };
    this.getJbTitle = function(t) {
        return config.Config.skin + "/res/jiban/jb_title_" + t;
    };
    this.getJbTitleWord = function(t) {
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/res/jiban/jiban_word_" + t
            : config.Config.skin + "_" + config.Config.lang + "/res/ui/jiban_word_" + t;
    };
    this.getWorldTree = function(t) {
        t = (t = Math.ceil(t / 5)) > 3 ? 3 : t;
        return config.Config.skin + "/prefabs/ui/flower/tree" + t;
    };
    this.getServantSkinIcon = function(t) {
        return config.Config.skin + "/res/servant_skin_icon/" + t;
    };
    this.getServantSkinSpine = function(t) {
        return config.Config.skin + "/prefabs/servant_skin/" + t;
    };
    this.getServantSkinSmallSpine = function(t) {
        return config.Config.skin + "/prefabs/servant_skin_small/" + t;
    };
    this.getClotheProImg = function(t, e) {
        return "zh-ch" == config.Config.lang
            ? config.Config.skin + "/res/ui/clothe/clothe_pro_" + t + "_" + e
            : config.Config.skin +
                  "_" +
                  config.Config.lang +
                  "/res/ui/clothe_pro_" +
                  t +
                  "_" +
                  e;
    };
    this.getChouQianImg = function(t, e) {
        return config.Config.skin + "/res/ui/qixi/qian/" + t + "_" + e;
    };
    this.getChouQianKuangImg = function(t) {
        return config.Config.skin + "/res/ui/qixi/qian/" + t;
    };

}
exports.UIHelp = UIHelp;
exports.uiHelps = new UIHelp();

function GetEffect() {
    this.list = new Array();
    //获取显示效果动画
    this.prefab = null;

    this.showClick = function(t, e, o, i) {
        void 0 === i && (i = 5);
        this.show(e, t.getLocation(), o, i);
    };
    this.show = function(t, e, o, i) {
        void 0 === i && (i = 5);
        if (null == this.prefab) this.loadItem(t, e, o, i);
        else {
            t.x -= cc.winSize.width / 2;
            t.y -= cc.winSize.height / 2;
            e.x -= cc.winSize.width / 2;
            e.y -= cc.winSize.height / 2;
            for (var n = 0; n < i; n++) this.showItem(t, e, o);
        }
    };
    this.loadItem = function(t, e, o, i) {
        void 0 === i && (i = 5);
        var n = this;
        cc.loader.loadRes(config.Config.skin + "/prefabs/ui/GetEffectItem", function(
            l,
            r
        ) {
            if (null != r) {
                // utils.utils.saveAssets(config.Config.skin + "/prefabs/ui/GetEffectItem");
                n.prefab = r;
                n.show(t, e, o, i);
            } else cc.warn(l + " name load error!!!");
        });
    };
    this.showItem = function(t, e, o) {
        var i = cc.instantiate(this.prefab),
            l = i.getComponent(getEffectItem);
        cc.director
            .getScene()
            .getChildByName("Canvas")
            .addChild(i);
        this.list.push(l);
        l.node.x = e.x + 100 * Math.random() - 50;
        l.node.y = e.y;
        if (l) {
            l.url = o;
            l.des = t;
        }
    };
}
exports.GetEffect = GetEffect;
exports.getEffectUtils = new GetEffect();

function ClickEffect() {
    //获取显示效果动画
    this.prefab = null;
    this.curItem = null;

    this.showEffect = function(t) {
        this.show(t.getLocation());
    };
    this.show = function(t) {
        if (null == this.prefab) this.loadItem(t);
        else {
            t.x -= cc.winSize.width / 2;
            t.y -= cc.winSize.height / 2;
            this.showItem(t);
        }
    };
    this.loadItem = function(t) {
        var e = this;
        cc.loader.loadRes(config.Config.skin + "/prefabs/effect/point", function(
            o,
            i
        ) {
            if (null != i) {
                // utils.utils.saveAssets(config.Config.skin + "/prefabs/effect/point")
                e.prefab = i;
                e.show(t);
            } else cc.warn(o + " name load error!!!");
        });
    };
    this.showItem = function(t) {
        if (null != this.curItem && null == this.curItem.parent) {
            this.curItem.removeFromParent();
            this.curItem.destroy();
            this.curItem = null;
        }
        null == this.curItem && (this.curItem = cc.instantiate(this.prefab));
        var e = this.curItem;
        if (e) {
            null == e.parent &&
                cc.director
                    .getScene()
                    .getChildByName("Canvas")
                    .addChild(e);
            e.active = !0;
            e.x = t.x;
            e.y = t.y;
            var o = e.getComponent(cc.Component);
            o.unscheduleAllCallbacks();
            o &&
                o.scheduleOnce(function() {
                    e.active = !1;
                }, 0.8);
        }
    };
}

exports.ClickEffect = ClickEffect;
exports.clickEffectUtils = new ClickEffect();
