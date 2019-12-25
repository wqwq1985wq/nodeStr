var i = require("../../utils/Utils");
var n = require("../../Initializer");
var l = require("../../utils/UIUtils");
var r = require("../../models/TimeProxy");
var a = require("../../Config");
var s = require("./ActivityItem");
var c = require("../../models/LimitActivityProxy");
var apiUtil = require("../../utils/ApiUtils");

cc.Class({
    extends: cc.Component,
    properties: {
        nodeStoryBg: cc.Node,
        topNode: cc.Node,
        leftNode: cc.Node,
        mainNode: cc.Node,
        setNode: cc.Node,
        nodeQuest: cc.Node,
        nodeSeven: cc.Node,
        nodeFirstRecharge: cc.Node,
        nodeXianli: cc.Node,
        nodeMonthCard: cc.Node,
        nodeRecharge: cc.Node,
        arrowNode: cc.Node,
        activityNode: cc.Node,
        maskNode: cc.Node,
        rightNode: cc.Node,
        rightArrow: cc.Node,
        rightMaskNode: cc.Node,
        activitItemNode: cc.Node,
    },
    ctor() {
        this.isFirst = !1;
        this._startPos = null;
        this._endPos = null;
        this._isMove = !1;
        this._isDown = !1; 
        this._isShow = !1;
        this._isRightShow = !1;
        this._isSendMove = !0;
        this._actMaps = new Map();
        this._curIndex = 0;
    },
    onLoad() {
        if(a.Config.login_by_sdk){
            apiUtil.apiUtils.callSMethod3("enterGame");
        }
        this.activitItemNode.active = !1;
        i.utils.setCanvas();
        facade.subscribe("SHOW_OPEN_EFFECT", this.onShowOpenEffect, this);
        facade.subscribe("SHOW_CLOSE_EFFECT", this.onShowCloseEffect, this);
        facade.subscribe("STORY_END", this.onStoryEnd, this);
        facade.subscribe("STORY_FIRST_START", this.onStoryFirtst, this);
        facade.subscribe("CLOSE_NOTICE", this.openNotice, this);
        facade.subscribe("SHOW_RETRY_SEND", this.onRetrySend, this);
        facade.subscribe("CLOSE_SEND_MOVE", this.sendCloseMove, this);
        facade.subscribe("FIRST_RECHARGE_UPDATE", this.onHuodongUpdata, this);
        facade.subscribe("TIME_RUN_FUN", this.onTimeRun, this);
        facade.subscribe(n.playerProxy.PLAYER_USER_UPDATE, this.onHuodongUpdata, this);
        facade.subscribe(n.bossPorxy.UPDAYE_BOSS_CD_DOWN, this.onUpdateBossBtn, this);
        facade.subscribe(n.limitActivityProxy.LIMIT_ACTIVITY_HUO_DONG_LIST, this.onHuodongUpdata, this);
        facade.subscribe(n.playerProxy.PLAYER_LEVEL_UPDATE, this.onLevelUpdate, this);
        this.scheduleOnce(this.delayCreateWait, 0.1);
        if (n.playerProxy.storyIds && n.playerProxy.storyIds.length > 0) {
            this.nodeStoryBg.active = !0;
            this.node.getComponent("SoundItem").node.active = false;
            i.utils.openPrefabView("StoryView");
        } else this.openNotice(!0);
        if (cc.sys.isMobile) {
            this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onClick, this, !0);
            this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onClickMove, this);
            this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onClickEnd, this);
            this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.onClickEnd, this);
            cc.sys.os == cc.sys.OS_ANDROID && cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        } else {
            this.node.parent.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this, !0);
            this.node.parent.on(cc.Node.EventType.MOUSE_MOVE, this.onClickMove, this);
            this.node.parent.on(cc.Node.EventType.MOUSE_UP, this.onClickEnd, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
        this.loadMainScene();
        this.updateNodeQuest();
        this.updateRed(!1);
        this.onHuodongUpdata();
        this.onUpdateBossBtn();
        this.leftNode.active = this.rightNode.active = a.Config.isShowMonthCard;
        this._curIndex = 0;
        this.schedule(this.createActive, 0.05);

        // var huodong7001 = new proto_cs.huodong.hd7001List();
        // JsonHttp.send(huodong7001, function(data) {
        //     let pdata = data;
        // });
    },
    onKeyUp(t) {
        cc.sys.isMobile ? t.keyCode == cc.KEY.back && facade.send("UI_TOUCH_MOVE_LEFT") : t.keyCode == cc.KEY.escape && facade.send("UI_TOUCH_MOVE_LEFT");
    },
    updateNodeQuest() {
        var t = n.timeProxy.getLoacalValue("QUEST_TIME"),
        e = i.stringUtil.isBlank(t) ? {}: JSON.parse(t),
        o = e[a.Config.questUrl] ? e[a.Config.questUrl] : i.timeUtil.second;
        this.nodeQuest.active = i.timeUtil.second - o < 86400 && (i.timeUtil.second - n.playerProxy.userData.regtime > 43200 || (n.limitActivityProxy.sevenSign && 0 != n.limitActivityProxy.sevenSign.level[1].type)) && !i.stringUtil.isBlank(a.Config.questUrl);
    },
    delayCreateWait() {
        i.utils.setWaitUI();
        this.arrowNode.active = !1;
        this.rightArrow.active = !1;
    },
    createActive() {
        var t = c.activityUtils.activityList,
        e = t[this._curIndex];
        this._curIndex++;
        if (this._curIndex >= t.length) {
            this.unschedule(this.createActive);
            this.scheduleOnce(this.onClickArrow, 0.1);
            this.scheduleOnce(this.onClickRightArrow, 0.1);
            this.arrowNode.active = !0;
            this.rightArrow.active = !0;
            l.uiUtils.scaleRepeat(this.arrowNode, 0.9, 1.2);
            l.uiUtils.scaleRepeat(this.rightArrow, 0.9, 1.2);
        }
        if (e) {
            var o = cc.instantiate(this.activitItemNode);
            o.active = !0;
            var i = o.getComponent(s);
            if (i) {
                this._actMaps[e.id] = i;
                o.x = o.y = 0;
                1 == e.type ? this.activityNode.addChild(o) : this.rightNode.addChild(o);
                i.data = e;
            }
        }
    },

    sendCloseMove(t) {
        this._isSendMove = t;
    },

    loadMainScene() {
        var t = this,
        e = l.uiHelps.getUIPrefab("main/MainScene");
        cc.loader.loadRes(e,
        function(e, o) {
            if (null == e && o) {
                // i.utils.saveAssets(e);
                var n = cc.instantiate(o);
                if (n) {
                    t.mainNode.addChild(n);
                    i.utils.showNodeEffect(n);
                    n.setSiblingIndex(0);
                }
            } else cc.warn(e + " name load error!!!");
        });
    },

    updateRed(t) {
        void 0 === t && (t = !0);
        n.feigeProxy.updateRed();
        n.jibanProxy.updateRed();
        n.jingyingProxy.updateJY();
        n.jingyingProxy.updateZW();
        n.playerProxy.updateRoleLvupRed();
        if (t && (null == n.firstRechargeProxy.data || 0 == n.firstRechargeProxy.data.type) && n.playerProxy.userData.bmap > i.utils.getParamInt("FIRST_RECHARGE_SHOW") && null == n.timeProxy.getLoacalValue("FIRST_RECHARGE_SHOW")) {
            r.funUtils.openView(r.funUtils.firstRecharge.id);
            n.timeProxy.saveLocalValue("FIRST_RECHARGE_SHOW", "1");
        }
    },
    onShowOpenEffect() {
        this.updateRed();
        if (n.guideProxy.guideUI._isTrigger)
        {
            let max = n.taskProxy.mainTask.max;
            let num = n.taskProxy.mainTask.num;
            if(max == num)
            {
                facade.send(n.guideProxy.UPDATE_TRIGGER_GUIDE, {
                    type: 3,
                    value: n.taskProxy.mainTask.id
                });
            }
        }
        n.guideProxy.guideUI._isTrigger = true;
        var t = this;
        i.utils.showEffect(this, 0,
        function() {
            t.scheduleOnce(t.releaseCollect, 0.2);
        });
        this.showRoleUpEffect();
    },
    releaseCollect() {
        i.utils.releaseCollect();
    },
    showRoleUpEffect() {
        var t = n.timeProxy.getLoacalValue("USER_UP_LEVEL_STORY"),
        e = i.stringUtil.isBlank(t) ? 0 : parseInt(t);
        if (0 == e && e < n.playerProxy.userData.level) {
            var o = localcache.getItem(localdb.table_officer, n.playerProxy.userData.level);
            if (o && !i.stringUtil.isBlank(o.storyid) && n.playerProxy.getStoryData(o.storyid)) {
                n.playerProxy.addStoryId(o.storyid);
                i.utils.openPrefabView("StoryView");
                n.timeProxy.saveLocalValue("USER_UP_LEVEL_STORY", n.playerProxy.userData.level + "");
            }
        }
    },
    onShowCloseEffect(t) {
        this.onClickOpen(null, t);
    },
    onClickShop() {
        n.shopProxy.sendList();
    },
    onClickOpenUnEffect(t, e) {
        r.funUtils.openViewUrl(e + "");
    },
    onOpenActivity(t, e) {
        r.funUtils.isCanOpenViewUrl(e + "") && r.funUtils.openViewUrl(e + "");
    },
    onClickOpen(t, e) {
        if (i.stringUtil.isBlank(e)) i.alertUtil.alert(i18n.t("MAIN_FUN_UNOPEN"));
        else if (r.funUtils.isCanOpenViewUrl(e) || a.Config.DEBUG) {
            facade.send("MAIN_TOP_HIDE_PAO_MA");
            i.utils.showEffect(this, 1,
            function() {
                r.funUtils.openViewUrl(e + "", !0);
            });
        }
    },
    onClick(t) {
        l.clickEffectUtils.showEffect(t);
        this._startPos = t.getLocation();
        this._isDown = !0;
        i.audioManager.playClickSound();
    },
    onClickMove(t) {
        this._isMove = this._isDown;
    },
    onClickEnd(t) {
        if (cc.sys.isMobile && t.getTouches().length > 1) this._isMove = this._isDown = !1;
        else {
            this._endPos = t.getLocation();
            this._isDown = !1;
            if (this._isMove && this._startPos.x < 80) {
                this._isMove = !1;
                if (n.guideProxy.guideUI && !n.guideProxy.guideUI.isHideShow()) return;
                var e = this._endPos.x - this._startPos.x,
                o = this._endPos.y - this._startPos.y;
                Math.abs(e) > 100 && Math.abs(e) > Math.abs(o) && this._isSendMove ? facade.send(e < 0 ? "UI_TOUCH_MOVE_RIGHT": "UI_TOUCH_MOVE_LEFT", this._endPos.y, !0) : Math.abs(o) > 100 && Math.abs(o) > Math.abs(e) && this._isSendMove && facade.send(o > 0 ? "UI_TOUCH_MOVE_UP": "UI_TOUCH_MOVE_DOWN", null, !0);
            }
        }
    },
    onStoryEnd() {
        if (this.isFirst) {
            this.node.getComponent("SoundItem").node.active = true;
            i.audioManager.stopBGM(!0);
            this.isFirst = !1;
            this.openNotice(!0);
        }
    },
    openNotice(t) {
        void 0 === t && (t = !1);
        n.timeProxy.noticeMsg && n.timeProxy.noticeMsg.length > 0 && t && n.playerProxy.guide.gnew > 1 ? i.utils.openPrefabView("NoticeView") : n.taskProxy.mainTask.id > i.utils.getParamInt("SHOW_GUAN_TASK_ID") && (n.jingyingProxy.exp.cd.num > 0 || (n.jingyingProxy.coin.num > 0 && n.jingyingProxy.army.num) || n.jingyingProxy.food.num > 0 || n.lookProxy.xfinfo.num > 0) ? i.utils.openPrefabView("GuanView") : t && this.onShowOpenEffect();
    },
    onStoryFirtst() {
        this.nodeStoryBg.active = !1;
        this.isFirst = !0;
    },
    onClickQuest() {
        var t = n.timeProxy.getLoacalValue("QUEST_TIME"),
        e = i.stringUtil.isBlank(t) ? {}: JSON.parse(t);
        null == (e = null == e ? {}: e)[a.Config.questUrl] && (e[a.Config.questUrl] = i.timeUtil.second);
        i.utils.openPrefabView("Web", !1, {
            url: a.Config.questUrl
        });
        n.timeProxy.saveLocalValue("QUEST_TIME", JSON.stringify(e));
        this.nodeQuest.active = !1;
    },
    onClickArrow() {
        var t = this.activityNode.getContentSize().height,
        e = t > 675 ? 690 : t + 15;
        if (this._isShow) {
            this.activityNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, t)));
            this.arrowNode.angle = -180;
            this.arrowNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, -120)));
            this._isShow = !1;
            this.scheduleOnce(this.onTimer, 0.1);
        } else {
            var o = -(e + 100);
            this.activityNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, 0)));
            this.arrowNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, o)));
            this.arrowNode.angle = 0;
            this._isShow = !0;
            this.maskNode.height = 675;
        }
    },
    onHeightChange() {
        var t = this.activityNode.getContentSize().height > 675 ? 690 : this.activityNode.getContentSize().height + 15;
        this._isShow ? (this.arrowNode.y = -(t + 100)) : (this.arrowNode.y = -120);
    },
    onClickRightArrow() {
        var t = this.rightNode.getContentSize().height,
        e = t > 675 ? 690 : t + 15;
        if (this._isRightShow) {
            this.rightNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, t)));
            this.rightArrow.angle = -180;
            this.rightArrow.runAction(cc.moveTo(0.1, new cc.Vec2(0, -150)));
            this._isRightShow = !1;
            this.scheduleOnce(this.onTimer2, 0.1);
        } else {
            var o = -(e + 130);
            this.rightNode.runAction(cc.moveTo(0.1, new cc.Vec2(0, 0)));
            this.rightArrow.runAction(cc.moveTo(0.1, new cc.Vec2(0, o)));
            this.rightArrow.angle = 0;
            this._isRightShow = !0;
            this.rightMaskNode.height = 675;
        }
    },
    onRightHeightChange() {
        var t = this.rightNode.getContentSize().height > 675 ? 690 : this.rightNode.getContentSize().height + 15;
        this._isRightShow ? (this.rightArrow.y = -(t + 130)) : (this.rightArrow.y = -150);
    },
    onRetrySend() {
        i.utils.showSingeConfirm(i18n.t("LOGIN_SERVER_DELAY"),
        function() {
            JsonHttp.sendLast();
        },
        null, null, i18n.t("COMMON_RETRY"));
    },
    onHuodongUpdata() {
        this.nodeFirstRecharge.active = null == n.firstRechargeProxy.data || (2 != n.firstRechargeProxy.data.type && r.funUtils.isOpenFun(r.funUtils.firstRecharge));
        this.nodeSeven.active = null != n.limitActivityProxy.sevenSign && r.funUtils.isOpenFun(r.funUtils.servanDay);
        this.nodeRecharge.active = n.firstRechargeProxy.data && 2 == n.firstRechargeProxy.data.type && r.funUtils.isOpenFun(r.funUtils.firstRecharge);
        for (var t in this._actMaps) {
            var e = this._actMaps[t];
            e && e.updateShow();
        }
        this.scheduleOnce(this.onHeightChange, 0.4);
        this.scheduleOnce(this.onRightHeightChange, 0.4);
    },
    onClickServantDuihuan() {
        n.limitActivityProxy.sendLookActivityData(n.limitActivityProxy.DUIHUAN_ID,
        function() {
            null != n.limitActivityProxy.duihuan && null != n.limitActivityProxy.duihuan.info ? i.utils.openPrefabView("limitactivity/ServantRecruit") : i.alertUtil.alert18n("GAME_LEVER_UNOPENED");
        });
    },
    onTimer() {
        this.maskNode.height = 0;
    },
    onTimer2() {
        this.rightMaskNode.height = 0;
    },
    onUpdateBossBtn() {
        var t = i.utils.getParamInt("world_boss_start_hour"),
        e = i.timeUtil.getTodaySecond(t),
        o = i.utils.getParamInt("world_boss_end_hour"),
        n = i.timeUtil.getTodaySecond(o);
        this.nodeXianli.active = e <= i.timeUtil.second && i.timeUtil.second <= n && r.funUtils.isOpenFun(r.funUtils.xianli);
    },
    onClickStronger() {
        i.utils.openPrefabView("stronger/StrongerView");
    },
    onLevelUpdate() {
        n.limitActivityProxy.sendHdList();
    },
    onClickRehcarge() {
        r.funUtils.openView(r.funUtils.recharge.id);
    },
    onTimeRun(t) {
        var e = t.time,
        o = t.fun;
        null != o && (0 == e || e < 0.05 ? o() : this.scheduleOnce(o, e));
    },
});
