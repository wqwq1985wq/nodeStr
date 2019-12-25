var i = require("../../utils/Utils");
var n = require("../../Initializer");
var l = require("../../models/TimeProxy");
var r = require("../../Config");
var a = require("../../component/LabelShadow");
var s = require("../../utils/ApiUtils");
var c = require("../../component/RedDot");
var _ = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        lblTask: a,
        lblChat: cc.Label,
        lblName: cc.Label,
        lblUnlock: cc.Label,
        nodeUnlock: cc.Node,
        effect: cc.Node,
        btnGuangGao: cc.Button,
        guanggaoNameNode: cc.Node,
        lblGuangGaoCd: cc.Label,
    },
    ctor() {
        this.curMsg = null;
        this._index = 0;
    },
    onLoad() {
        facade.subscribe(n.taskProxy.MAIN_TASK_REFESH, this.updateMainTask, this);
        facade.subscribe(n.chatProxy.UPDATE_NOR_MSG, this.updateNorChat, this);
        facade.subscribe(n.chatProxy.UPDATE_CLUB_MSG, this.updateClubChat, this);
        facade.subscribe(n.chatProxy.UPDATE_SYS_MSG, this.updateSysChat, this);
        facade.subscribe(n.chatProxy.UPDATE_LABA_MSG, this.updateLaba, this);
        facade.subscribe(n.playerProxy.GUANG_GAO_UPDATE, this.onUpdateGuangGao, this);
        this.updateMainTask();
        this.updateNorChat(!1);
        n.chatProxy.addHelloMsg();
        this.updateSysChat(!0);
        this.updateUnlock();
        this.schedule(this.sendChatAdok, 0.1);
        this.onUpdateGuangGao();
    },
    onUpdateGuangGao() {
        var t = cc.sys.localStorage.getItem("GUANGGAO_CD");
        this.btnGuangGao.node.active = null != n.playerProxy.guanggao && n.playerProxy.guanggao.get < n.playerProxy.guanggao.max && l.funUtils.isOpenFun(l.funUtils.guanggao);
        if (this.btnGuangGao.node.active) {
            var e = i.timeUtil.second - (t ? parseInt(t) : 0);
            if (e >= 60) {
                this.lblGuangGaoCd.node.active = !1;
                this.guanggaoNameNode.active = !0;
                this.btnGuangGao.interactable = !0;
            } else {
                this.btnGuangGao.interactable = !1;
                var o = this;
                this.lblGuangGaoCd.node.active = !0;
                this.guanggaoNameNode.active = !1;
                _.uiUtils.countDown(e, this.lblGuangGaoCd,
                function() {
                    o.btnGuangGao.interactable = !0;
                    o.lblGuangGaoCd.node.active = !1;
                    o.guanggaoNameNode.active = !0;
                },
                !0, null, "d", "mm:ss");
            }
        }
    },
    onClickGuangGao() {
        cc.sys.localStorage.setItem("GUANGGAO_CD", i.timeUtil.second);
        n.playerProxy.guanggao && s.apiUtils.showRewarededVideo(r.Config.serId.toString(), n.playerProxy.userData.uid.toString(), n.playerProxy.guanggao.Aid);
    },
    sendChatAdok() {
        this._index++;
        this._index %= 300;
        if (0 == this._index) {
            n.chatProxy.sendChatAdok();
            n.jingyingProxy.sendAdok();
            n.sonProxy.sendChildLilianAdok();
            s.apiUtils.heartFlash();
            i.timeUtil.getTodaySecond(18) < i.timeUtil.second && i.timeUtil.second < i.timeUtil.getTodaySecond(23) && facade.send(n.bossPorxy.UPDAYE_BOSS_CD_DOWN);
            i.timeUtil.second > i.timeUtil.getTodaySecond(23.5) && i.timeUtil.second < i.timeUtil.getTodaySecond(24) && c.change("unionCopy", !1);
            n.timeProxy.sendFlushZero();
        }
    },
    updateNorChat(t) {
        void 0 === t && (t = !0);
        this.setShowChat(n.chatProxy.getLastMsg(n.chatProxy.norMsg));
        t && this.updateLaba();
    },
    updateClubChat(t) {
        void 0 === t && (t = !0);
        this.setShowChat(n.chatProxy.getLastMsg(n.chatProxy.clubMsg));
        t && this.updateLaba();
    },
    updateSysChat(t) {
        void 0 === t && (t = !0);
        n.chatProxy.sysMsg && this.setShowChat(n.chatProxy.getLastMsg(n.chatProxy.sysMsg));
        t && this.updateLaba();
    },
    updateLaba() {
        n.chatProxy.laba && n.chatProxy.laba.length > 0 && n.chatProxy.laba[0].time + 3600 > i.timeUtil.second && this.setShowChat(n.chatProxy.laba[0]);
    },
    onClickChat() {
        l.funUtils.isOpenFun(l.funUtils.chatView) ? (this.curMsg && this.curMsg.type, i.utils.openPrefabView("chat/ChatView")) : l.funUtils.openView(l.funUtils.chatView.id);
    },
    setShowChat(t) {
        this.curMsg = t;
        this.lblName.string = t ? i18n.t("chat_home_show", {
            name: t.user ? t.user.name: i18n.t("CHAT_SYS_TIP")
        }) : "";
        this.lblChat.string = t ? n.chatProxy.getSpMsg(t.msg) : "";
        let chatMsg = this.lblChat.string;
        let chatMsgStr = ""
        for(let i = 0; i < chatMsg.length; i++)
        {
            chatMsgStr = chatMsgStr + (chatMsg[i]);
            this.lblChat.string = chatMsgStr;
            this.lblChat._updateRenderData(true);
            let width = this.lblChat.node.getContentSize().width;
            if(width > 360)
            {
                chatMsgStr = chatMsgStr + "..."
                break;
            }
        }
        chatMsg = chatMsgStr;
        this.lblChat.string = chatMsg;
    },
    updateMainTask() {
        var t = n.taskProxy.mainTask,
        e = localcache.getItem(localdb.table_mainTask, t.id + "");
        e && n.taskProxy.isFiltTaskType(e.type) ? (this.lblTask.string = e ? i18n.t(r.Config.DEBUG ? "MAIN_TASK_SHOW": "MAIN_TASK_UNID_SHOW", {
            id: t.id,
            t: e.name,
            c: t.num < t.max ? 0 : 1,
            m: 1
        }) : i18n.t("MAIN_TASK_OVER")) : (this.lblTask.string = e ? i18n.t(r.Config.DEBUG ? "MAIN_TASK_SHOW": "MAIN_TASK_UNID_SHOW", {
            id: t.id,
            t: e.name,
            c: t.num,
            m: t.max
        }) : i18n.t("MAIN_TASK_OVER"));
        this.effect.active = t.num >= t.max;
        this.lblTask.color = t.num < t.max ? i.utils.WHITE: cc.Color.WHITE.fromHEX("#e4fba4");
    },
    updateUnlock() {
        var t = l.funUtils.getWillOpen();
        if (t) {
            var e = localcache.getItem(localdb.table_iconOpen, t.id);
            e && (this.lblUnlock.string = i18n.t("FUN_UNLOCK", {
                n: e.title
            }));
        }
    },
    onClickMainTask() {
        l.funUtils.openView(l.funUtils.mainTask.id);
    },
    sendAdolHdList() {
        n.limitActivityProxy.sendHdList();
    },
});
