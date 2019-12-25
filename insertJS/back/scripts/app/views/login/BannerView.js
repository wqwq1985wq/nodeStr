var i = require("../../Initializer");
var n = require("../../utils/Utils");
var l = require("../../utils/UIUtils");
var r = require("../../Config");
var a = require("../../utils/ApiUtils");
var s = require("../../utils/ShaderUtils");
var c = require("../../component/UrlLoad");
var timeProxy = require("../../models/TimeProxy");

cc.Class({
    extends: cc.Component,
    properties: {
        pickServerLable: cc.Label,
        stateImg: cc.Sprite,
        sImgs: [cc.SpriteFrame],
        nodeEnter: cc.Node,
        lblVersion: cc.Label,
        logo: cc.Sprite,
        nodeAccount: cc.Node,
        nodeRepair: cc.Node,
        nodeKefu: cc.Node,
        logoUrl: c,
        banhao: cc.Node,
        logoEffect: sp.Skeleton,
    },
    ctor() {
        this.isEnterGame = !1;
    },

    onLoad() {
        console.log("bannerview~~~~~~~~~~~~~");
        n.utils._isExit = !1;
        n.utils.setCanvas();
        var t = cc.sys.localStorage.getItem("SYS_LANGUAGE");
        t && "zh-ch" != t && (r.Config.lang = t);
        i18n.init(r.Config.lang);
        cc.sys.localStorage.setItem("SYS_LANGUAGE", r.Config.lang);
        new i.Initializer().init();
        n.utils.setWaitUI();
        i.loginProxy.sendServerList();
        l.uiUtils.scaleRepeat(this.nodeEnter, 0.95, 1.05);
        facade.subscribe(i.loginProxy.LOGIN_PICK_SERVER, this.update_PickUp, this);
        this.lblVersion.string = "v" + r.Config.version;
        cc.sys.isMobile ? this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onClick, this, !0) : this.node.parent.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this, !0);
        this.defaultLoginAccount();
        this.nodeAccount.active = !r.Config.isHideChangeAccount();
        this.nodeRepair.active = cc.sys.isMobile;
        this.nodeAccount.active && !this.nodeRepair.active && (this.nodeAccount.y = this.nodeRepair.y);
        this.nodeKefu.active = !n.stringUtil.isBlank(r.Config.freebackUrl);
        // if (n.stringUtil.isBlank(r.Config.logo)) this.scheduleOnce(this.showLogo, 2.5);
        // else {
        //     var e = this;
        //     this.logoUrl.loadHandle = function() {
        //         e.scheduleOnce(e.showLogo, 2.5);
        //     };
        //     this.logoUrl.url = l.uiHelps.getLogo();
        // }
        this.banhao.active = r.Config.isShowBanhao;
        this.showUserProto();

        this.playLogoAnimation();
    },

    playLogoAnimation () {
        this.logoEffect.animation = "appear";
        this.schedule( () => {
            this.logoEffect.animation = "idle";
            this.logoEffect.loop = true;
        },5)

    },

    showUserProto(){
        let userProtoFlag = cc.sys.localStorage.getItem("userProto");
        if (!userProtoFlag)
        timeProxy.funUtils.openViewUrl("userProto/UserProtoPop");
    },

    showLogo() {
        s.shaderUtils.setBright(this.logo, 0.01, 0.005, 0.1);
    },

    defaultLoginAccount() {
        if (!r.Config.login_by_sdk) {
            var t = i.loginProxy.accountList.length > 0 ? i.loginProxy.accountList[0] : null;
            //测试代码
            let account = "testwq1111"
            t ? i.loginProxy.login(t.account, t.password) : i.loginProxy.login(account, "123456");
            // t ? i.loginProxy.login(t.account, t.password) : i.loginProxy.login("test" + Math.ceil(1e6 * Math.random()), "123456");
        }
    },

    inGameBtn() {
        if (null != i.loginProxy.quList && 0 != i.loginProxy.quList.length && null != i.loginProxy.pickServer) {
            if (!this.isEnterGame) {
                this.scheduleOnce(this.cancelEnterGame, 3);
                this.isEnterGame = !0;
                r.Config.login_by_sdk && n.stringUtil.isBlank(r.Config.token) ? a.apiUtils.startLoginTo_sdk() : i.loginProxy.sendInGame();
            }
        } else n.alertUtil.alert(i18n.t("LOGIN_SERVER_DELAY"));
    },
    cancelEnterGame() {
        this.isEnterGame = !1;
    },
    changeAccountBtn() {
        r.Config.login_by_sdk ? a.apiUtils.loginOut_sdk() : n.utils.openPrefabView("login/loginview");
    },
    customerBtn() {
        n.utils.openPrefabView("");
    },
    serverListBtn() {
        n.utils.openPrefabView("login/serverListView");
    },
    update_PickUp() {
        var t = i.loginProxy.pickServer;
        this.pickServerLable.string = t.name;
        this.stateImg.spriteFrame = this.sImgs[t.state - 1];
        r.Config.isAutoLogin && this.inGameBtn();
    },
    onClick(t) {
        l.clickEffectUtils.showEffect(t);
        n.audioManager.playClickSound();
    },
    onClickRepair() {
        var t = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "update-assets",
        e = r.Config.lang;
        "zh-ch" != e ? n.langManager.loadMainifest(e,
        function(e) {
            n.utils.showConfirm(i18n.t("LOGIN_REPAIR_TIP"),
            function() {
                if (jsb.fileUtils.isDirectoryExist(t)) {
                    jsb.fileUtils.removeDirectory(t);
                    n.langManager.clearLang(e);
                }
                cc.game.restart();
            },
            null, null, i18n.t("LOGIN_CLIENT_REPAIR"));
        }) : n.utils.showConfirm(i18n.t("LOGIN_REPAIR_TIP"),
        function() {
            jsb.fileUtils.isDirectoryExist(t) && jsb.fileUtils.removeDirectory(t);
            cc.game.restart();
        },
        null, null, i18n.t("LOGIN_CLIENT_REPAIR"));
    },
    onClickKefu() {
        n.utils.openPrefabView("Web", !1, {
            url: r.Config.freebackUrl
        });
    },
});
