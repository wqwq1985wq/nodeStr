var i = require("../../Initializer");
var n = require("../../utils/Utils");
var l = require("../../Config");
var r = require("../../utils/ApiUtils");
var a = require("../user/UserHeadItem");
var s = require("../../component/List");
var crypto = require("crypto");

cc.Class({
    extends: cc.Component,
    properties: {
        lblName: cc.Label,
        lblId: cc.Label,
        lblSer: cc.Label,
        music: cc.Toggle,
        sound: cc.Toggle,
        action: cc.Toggle,
        actionNode: cc.Node,
        nodeLang: cc.Node,
        nodeAct: cc.Node,
        nodeUserCenter: cc.Node,
        nodeServer: cc.Node,
        nodeSet: cc.Node,
        nodeCdk: cc.Node,
        btns: [cc.Button],
        editBox: cc.EditBox,
        nodeGG: cc.Node,
        nodeSound: cc.Node,
        blank: cc.Toggle,
        role: cc.Toggle,
        npc: cc.Toggle,
        userHead: a,
        lblLang: cc.Label,
        list: s,
        nodeChange: cc.Node,
        nodeCom: cc.Node,
        nodeSS: cc.Node,
    },
    ctor() {
        this.langData = null;
    },
    onLoad() {
        this.editBox.placeholder = i18n.t("COMMON_INPUT_TXT");
        this.lblName.string = i.playerProxy.userData.name;
        this.lblId.string = i.playerProxy.userData.uid + "";
        this.lblSer.string = i.loginProxy.pickServer.name;
        var t = i.timeProxy.getLoacalValue("SYS_MUSIC"),
        e = i.timeProxy.getLoacalValue("SYS_SOUND"),
        o = i.timeProxy.getLoacalValue("SYS_ACTION"),
        n = i.timeProxy.getLoacalValue("SYS_SOUND_BLANK"),
        r = i.timeProxy.getLoacalValue("SYS_SOUND_ROLE"),
        a = i.timeProxy.getLoacalValue("SYS_SOUND_NPC");
        this.music.isChecked = null == t || 1 == parseInt(t);
        this.sound.isChecked = null == e || 1 == parseInt(e);
        this.action.isChecked = null == o || 1 == parseInt(o);
        this.blank.isChecked = (null == n || 1 == parseInt(n)) && this.sound.isChecked;
        this.role.isChecked = (null == r || 1 == parseInt(r)) && this.sound.isChecked;
        this.npc.isChecked = (null == a || 1 == parseInt(a)) && this.sound.isChecked;
        this.nodeAct.active = !l.Config.isHideChangeAccount();
        this.nodeUserCenter.active = l.Config.isOpenUserCenter;
        this.nodeServer.active = !this.nodeAct.active;
        this.onSoundOver();
        this.onClickTab(null, 1);
        // this.nodeLang.active = l.Config.showLang || l.Config.DEBUG;
        this.nodeGG.active = i.timeProxy.noticeMsg && i.timeProxy.noticeMsg.length > 0;
        this.lblLang.string = i18n.t("COMMON_" + l.Config.lang);
        this.list.node.active = !1;
        this.nodeChange.scaleX = 1;
        facade.subscribe(i.playerProxy.PLAYER_UPDATE_HEAD, this.updateHead, this);
        facade.subscribe("SOUND_DOWN_LOAD_OVER", this.onSoundOver, this);
        facade.subscribe(i.playerProxy.PLAYER_USER_UPDATE, this.updateName, this);
    },
    updateName() {
        this.lblName.string = i.playerProxy.userData.name;
    },
    onSoundOver() {
        // this.nodeSound.active = n.audioManager.isNeedDown() && l.Config.isShowMonthCard;
        // this.nodeGG.x = this.nodeSound.active ? this.nodeGG.x: 0;
        // this.nodeSound.x = this.nodeGG.active ? this.nodeSound.x: 0;
    },
    updateHead() {
        this.userHead.updateUserHead();
    },
    onClickTab(t, e) {
        for (var o = parseInt(e) - 1, i = 0; i < this.btns.length; i++) {
            this.btns[i].interactable = i != o;
            2 == i && (this.btns[2].node.active = l.Config.isShowMonthCard);
        }
        this.nodeSet.active = 0 == o;
        this.nodeSS.active = 1 == o;
        this.nodeCom.active = 0 == o || 1 == o;
        this.nodeCdk.active = 2 == o;
    },
    onClickDui() {
        var t = this.editBox.string;
        n.stringUtil.isBlank(t.trim()) ? n.alertUtil.alert18n("SYS_CDK_NULL") : i.timeProxy.sendCDK(t);
    },
    onClickChange(t, e) {
        var o = this;
        n.utils.showConfirm(i18n.t(2 == parseInt(e) ? "SYS_CHANGE_SERVER_CONFIRM": "SYS_CHANGE_CONFIRM"),
        function() {
            n.utils.closeView(o);
            i.loginProxy.loginOut();
        });
    },
    onClickUserCenter() {
        r.apiUtils.open_user_center();
    },
    onClickMusic() {
        n.audioManager.setSoundOff(!this.music.isChecked);
        i.timeProxy.saveLocalValue("SYS_MUSIC", this.music.isChecked ? "1": "0");
    },
    onClickSound(t) {
        void 0 === t && (t = !0);
        n.audioManager._isSayOff = !this.sound.isChecked;
        i.timeProxy.saveLocalValue("SYS_SOUND", this.sound.isChecked ? "1": "0");
        if (n.audioManager._isSayOff && t) {
            this.blank.isChecked = this.npc.isChecked = this.role.isChecked = !1;
            n.audioManager._isBlank = n.audioManager._isNpc = n.audioManager._isRole = !0;
        } else if (t) {
            var e = i.timeProxy.getLoacalValue("SYS_SOUND_BLANK"),
            o = i.timeProxy.getLoacalValue("SYS_SOUND_ROLE"),
            l = i.timeProxy.getLoacalValue("SYS_SOUND_NPC");
            this.blank.isChecked = null == e || 1 == parseInt(e);
            this.role.isChecked = null == o || 1 == parseInt(o);
            this.npc.isChecked = null == l || 1 == parseInt(l);
            n.audioManager._isNpc = !this.npc.isChecked;
            n.audioManager._isBlank = !this.blank.isChecked;
            n.audioManager._isRole = !this.role.isChecked;
        }
    },
    onClickAction() {
        l.Config.main_tuoluo_action = this.action.isChecked;
        i.timeProxy.saveLocalValue("SYS_ACTION", this.action.isChecked ? "1": "0");
        facade.send("MAIN_SET_ACTION_CHANGE");
    },
    onClickOpen(t, e) {
        n.utils.openPrefabView(e);
    },
    onClickBlack(t) {
        void 0 === t && (t = !0);
        n.audioManager._isBlank = !this.blank.isChecked;
        i.timeProxy.saveLocalValue("SYS_SOUND_BLANK", this.blank.isChecked ? "1": "0");
        t && this.updateSound();
    },
    onClickNpc(t) {
        void 0 === t && (t = !0);
        n.audioManager._isNpc = !this.npc.isChecked;
        i.timeProxy.saveLocalValue("SYS_SOUND_NPC", this.npc.isChecked ? "1": "0");
        t && this.updateSound();
    },
    onClickRole(t) {
        void 0 === t && (t = !0);
        n.audioManager._isRole = !this.role.isChecked;
        i.timeProxy.saveLocalValue("SYS_SOUND_ROLE", this.role.isChecked ? "1": "0");
        t && this.updateSound();
    },
    updateSound() {
        if (!n.audioManager._isBlank || !n.audioManager._isNpc || !n.audioManager._isRole) {
            var t = this.sound.isChecked;
            this.sound.isChecked = !0;
            this.onClickSound(!t);
        }
    },
    onClickRename() {
        var t = i.bagProxy.getItemCount(1);
        n.utils.showConfirmInput(i18n.t("USER_RENAME_CONFIRM", {
            v: 100
        }),
        function(e) {
            t < 100 ? n.alertUtil.alertItemLimit(1) : n.stringUtil.isBlank(e) ? n.alertUtil.alert18n("CREATE_IS_LIMIT") : e != i.playerProxy.userData.name ? i.playerProxy.sendResetName(e) : n.alertUtil.alert18n("CLUB_NAME_USERED");
        });
    },
    onClickClost() {
        n.utils.closeView(this);
    },
    onClickDown() {
        facade.send("DOWNLOAD_SOUND");
    },
    onClickLang() {
        this.nodeChange.scaleY *= -1;
        if (null == this.langData) {
            this.langData = [];
            this.langData.push({
                account: i18n.t("COMMON_zh-ch"),
                lang: "zh-ch"
            });
            this.langData.push({
                account: i18n.t("COMMON_tw"),
                lang: "tw"
            });
            if (l.Config.changeLang && l.Config.changeLang.length > 0) for (var t = 0; t < l.Config.changeLang.length; t++) {
                var e = l.Config.changeLang[t];
                this.langData.push({
                    account: i18n.t("COMMON_" + e),
                    lang: e
                });
            }
            this.list.data = this.langData;
        }
        this.list.node.active = -1 == this.nodeChange.scaleY;
    },
    onClickSelectLang(t, e) {
        var o = e.data;
        l.Config.DEBUG ? n.utils.showConfirm(i18n.t("SYS_CHANGE_LANG_CONFIRM"),
        function() {
            l.Config.lang = o.lang;
            cc.sys.localStorage.setItem("SYS_LANGUAGE", o.lang);
            i.loginProxy.loginOut();
        }) : o && o.lang != l.Config.lang && facade.send("DOWNLOAD_LANG", o.lang);
    },

    onClickkeFu(){
        var uid = (i.playerProxy.userData.uid).toString();
        var algorithm = "AES-256-CBC"
        var key = "skyent"
        var cipher = crypto.createCipher(algorithm, key)
        var crypted =cipher.update(uid,'utf8','hex');
        crypted+=cipher.final('hex');
        var message=crypted;
        
        var hasher=crypto.createHash("md5");
        hasher.update(uid);
        var hashmsg=hasher.digest('hex');
        var hasher2=crypto.createHash("md5");
        hasher2.update(hashmsg);
        var hashmsg2=hasher2.digest('hex');
        let url = "https://sky-ent.net/MLF/helpList.php?uid="+hashmsg+"&enc="+hashmsg2;
        cc.sys.openURL(url);
    }
});
