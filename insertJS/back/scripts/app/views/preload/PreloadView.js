var i = require("../../Initializer");
var n = require("../../utils/Utils");
var l = require("../../utils/UIUtils");
var r = require("../../utils/ApiUtils");
var a = require("../../Config");
var s = require("../story/StoryView");
cc.Class({
    extends: cc.Component,
    properties: {
        lbl: cc.Label,
        progress: cc.ProgressBar,
    },
    ctor() {
        this.dbList = [
                "chenghao",
                "chengjiu",
                "club",
                "dailyrwd",
                "guan",
                "guidesay",
                "guide",
                "guozijian",
                "hanlin",
                "help",
                "hero",
                "hunt",
                "iconopen",
                "item",
                "boite",
                "pve",
                "qiandao",
                "school",
                "silkroad",
                "soncareer",
                "son",
                "taofa",
                "task",
                "xuanxiang",
                "user",
                "vip",
                "wife",
                "wordboss",
                "xunfang",
                "yamen",
                "zw",
                "param",
                "heropve",
                "email",
                "jyevent",
                "story2",
                "story3",
                "story4",
                "battledialo",
                "lunzhan",
                "jybase",
                "kitchen",
                "treasure",
                "zwevent",
                "prisoner",
                "practice",
                "tips",
                "yingyuan",
                "talk",
                "shengyin",
                "story5",
                "power",
                "lv",
                "story6",
                "clothepve",
                "monday",
                "flower",
                "exam",
                "worldtree",
                "treecoor",
                "dafuweng",
                "liondance",
                "chungeng",
                "activityduanwu",
                "reqiqiu",
                "haoyou",
                "zhongyuan"
            ];
        this.loadList = [];
        this.loadCount = 0;
    },
    onLoad() {
        n.utils.setCanvas();
        this.loadList = [this.loadDb, this.loadRoleData, this.loadScene, this.loadCompleted];
        this.newMethod();
        localcache.init({},
        localdb.KEYS);
        facade.subscribe("USER_DATA_OVER", this.onRoleData, this);
        facade.subscribe("SHOW_RETRY_SEND", this.onRetrySend, this);
        n.utils.clearLayer();
        this.next();
        cc.sys.isMobile ? this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onClick, this, !0) : this.node.parent.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this, !0);
    },
    newMethod() {
        this.loadCount = this.loadList.length;
    },
    loadDb() {
        if (i.playerProxy.userData) this.next();
        else {
            var t = this;
            if (0 != this.dbList.length) {
                var e = this.dbList.shift();
                n.stringUtil.isBlank(e) ? this.next() : cc.loader.loadRes(l.uiHelps.getDataUrl(e),
                function(o, i) {
                    if (null != i && null == o) {
                        localcache.addData(i.json);
                        t.loadDb();
                    } else {
                        cc.log(o.toString());
                        t.loadDb();
                    }
                    n.utils.releaseAsset(l.uiHelps.getDataUrl(e));
                });
            } else this.next();
        }
    },
    loadRoleData() {
        i.playerProxy.userData ? this.next() : i.loginProxy.getPlayerInfo();
    },
    onRoleData() {
        this.next();
    },
    loadScene() {
        var t = i.playerProxy.userData ? i.playerProxy.userData.name: "",
        e = this;
        n.stringUtil.isBlank(t) ? cc.director.preloadScene("CreateScene",
        function() {
            e.next();
        }) : cc.director.preloadScene("MainScene",
        function() {
            e.next();
        });
    },
    checkStory() {
        var t = i.timeProxy.getLoacalValue("StoryId"),
        e = i.playerProxy.getFirstStoryId(); (n.stringUtil.isBlank(t) || t == e) && i.playerProxy.guide.gnew < 1 && i.playerProxy.addStoryId(e);
    },
    loadCompleted() {
        if (null != i.playerProxy.userData) {
            var t = i.playerProxy.userData ? i.playerProxy.userData.name: "";
            if (n.stringUtil.isBlank(t)) cc.director.loadScene("CreateScene");
            else {
                this.checkStory();
                var e = i.timeProxy.getLoacalValue("SYS_MUSIC"),
                o = i.timeProxy.getLoacalValue("SYS_SOUND"),
                l = i.timeProxy.getLoacalValue("SYS_ACTION"),
                c = i.timeProxy.getLoacalValue("SYS_SOUND_BLANK"),
                _ = i.timeProxy.getLoacalValue("SYS_SOUND_ROLE"),
                d = i.timeProxy.getLoacalValue("SYS_SOUND_NPC"),
                u = i.timeProxy.getLoacalValue("STORY_AUTO_PLAYER");
                n.audioManager.setSoundOff(null != e && 0 == parseInt(e));
                n.audioManager._isSayOff = null != o && 0 == parseInt(o);
                n.audioManager._isBlank = null != c && 0 == parseInt(c);
                n.audioManager._isNpc = null != d && 0 == parseInt(d);
                n.audioManager._isRole = null != _ && 0 == parseInt(_);
                a.Config.main_tuoluo_action = null != l && 1 == parseInt(l);
                s.isAutoPlay = null != u && 1 == parseInt(u);
                cc.director.loadScene("MainScene");
                r.apiUtils.loginSuccess();
            }
        } else n.alertUtil.alert18n("CLUB_NO_DATA");
    },
    next() {
        var t = this.loadCount - this.loadList.length,
        e = i18n.t("PRELOAD_" + t);
        this.lbl.string = e;
        this.progress.progress = (t + 1) / this.loadCount;
        this.loadList.shift().call(this);
    },
    onClick(t) {
        l.clickEffectUtils.showEffect(t);
        n.audioManager.playClickSound();
    },
    onRetrySend() {
        n.utils.showSingeConfirm(i18n.t("LOGIN_SERVER_DELAY"),
        function() {
            JsonHttp.sendLast();
        },
        null, null, i18n.t("COMMON_RETRY"));
    },
});
