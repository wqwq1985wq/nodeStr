var i = require("../../utils/UIUtils");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../models/TimeProxy");
var a = require("../../component/UrlLoad");
var s = require("../../Config");
var c = require("../../component/RoleSpine");
var _ = require("../../utils/ShaderUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        email: cc.Node,
        nodeHougong: cc.Button,
        nodeZW: cc.Button,
        nodeJY: cc.Button,
        nodeXF: cc.Button,
        nodeJinban: cc.Button,
        nodeTreasure: cc.Button,
        nodeClothe: cc.Button,
        nodeHG: cc.Node,
        jyUrl: a,
        jyUrlSh: a,
        scroll: cc.ScrollView,
        roleSpine: c,
        imgClothe: cc.Sprite,
        imgJingYing: cc.Sprite,
        imgZhengwu: cc.Sprite,
    },
    ctor() {
        this._speed = new cc.Vec2(0, 0);
        this._off = null;
        this._offMax = null;
    },
    onLoad() {
        facade.subscribe("UPDATE_READ", this.updateEmailShow, this);
        facade.subscribe(n.playerProxy.PLAYER_USER_UPDATE, this.updateTitleShow, this);
        facade.subscribe(n.wifeProxy.WIFE_LIST_UPDATE, this.updateTitleShow, this);
        facade.subscribe(n.playerProxy.PLAYER_HERO_SHOW, this.updateJyUrl, this);
        facade.subscribe("MAIN_SET_ACTION_CHANGE", this.setActionChange, this);
        facade.subscribe(n.playerProxy.PLAYER_SHOW_CHANGE_UPDATE, this.onRoleShow, this);
        facade.subscribe(n.playerProxy.PLAYER_RESET_JOB, this.onRoleShow, this);
        facade.subscribe(n.playerProxy.PLAYER_LEVEL_UPDATE, this.onRoleShow, this);
        facade.subscribe("MOON_CARD_BUY_UPDATE", this.moonCardUpdate, this);
        i.uiUtils.floatPos(this.nodeHougong.node, 0, 10, 2);
        i.uiUtils.floatPos(this.nodeZW.node, 0, 10, 2);
        i.uiUtils.floatPos(this.nodeJY.node, 0, 10, 3);
        i.uiUtils.floatPos(this.nodeXF.node, 0, 10, 4);
        i.uiUtils.floatPos(this.nodeJinban.node, 0, 10, 3);
        i.uiUtils.floatPos(this.nodeTreasure.node, 0, 10, 3);
        i.uiUtils.floatPos(this.email, 0, 10, 4);
        i.uiUtils.floatPos(this.nodeClothe.node, 0, 10, 4);
        this.updateJyUrl();
        this.updateTitleShow();
        this.scroll.content.height > s.Config.showHeight + 120 && (this.scroll.content.height = s.Config.showHeight + 120);
        this._off = this.scroll.getScrollOffset();
        this._offMax = this.scroll.getMaxScrollOffset();
        cc.sys.isMobile && this.addEvent();
        n.treasureProxy.updateTreasureRed();
        n.limitActivityProxy.isHaveTypeActive(n.limitActivityProxy.TANG_YUAN_ID) && n.tangyuanProxy.sendOpenActivity();
        n.limitActivityProxy.isHaveTypeActive(n.limitActivityProxy.GAO_DIAN_ID) && n.gaodianProxy.sendOpenActivity();
    },
    onRoleShow() {
        this.roleSpine.updatePlayerShow();
    },
    setActionChange() {
        cc.systemEvent.setAccelerometerEnabled(s.Config.main_tuoluo_action);
    },
    addEvent() {
        cc.systemEvent.setAccelerometerEnabled(s.Config.main_tuoluo_action);
        var t = this,
        e = cc.EventListener.create({
            event: cc.EventListener.ACCELERATION,
            callback: function(e, o) {
                if (s.Config.main_tuoluo_action) {
                    t._speed.x = e.x;
                    t._speed.y = e.y;
                    if (Math.abs(t._speed.x) > 0.5 || Math.abs(t._speed.y) > 0.5) {
                        t._speed.x = t._speed.x < -1 ? -1 : t._speed.x;
                        t._speed.x = t._speed.x > 1 ? 1 : t._speed.x;
                        t._speed.y = t._speed.y < -1 ? -1 : t._speed.y;
                        t._speed.y = t._speed.y > 1 ? 1 : t._speed.y;
                        t.updateScroll();
                    }
                }
            }.bind(this)
        });
        cc.eventManager.addListener(e, this.node);
    },
    updateScroll() {
        this._off = this.scroll.getScrollOffset();
        this._off.x = ((this._speed.x / 50) * this._offMax.x) / 2 - this._off.x;
        this._off.y = (( - (this._speed.y + 0.5) / 40) * this._offMax.y) / 2 + this._off.y;
        this._off.x = this._off.x < 0 ? 0 : this._off.x;
        this._off.y = this._off.y < 0 ? 0 : this._off.y;
        this._off.x = this._off.x > this._offMax.x ? this._offMax.x: this._off.x;
        this._off.y = this._off.y > this._offMax.y ? this._offMax.y: this._off.y;
        this.scroll.scrollToOffset(this._off);
    },
    updateJyUrl() {
        var t = this;
        if (this.jyUrlSh) {
            this.jyUrlSh.loadHandle = function() {
                var e = t.jyUrlSh.node.children[0];
                e && (e = e.children[0]) && (e.color = l.utils.BLACK);
            };
            var e = "";
            if (n.playerProxy.heroShow > 200) {
                var o = localcache.getItem(localdb.table_wife, n.playerProxy.heroShow - 200);
                o && o.res && (e = i.uiHelps.getWifeBody(o.res));
            } else e = i.uiHelps.getServantSpine(n.playerProxy.heroShow);
            this.jyUrl.url = e;
            this.jyUrlSh.url = e;
        }
    },
    updateTitleShow() {
        this.nodeHG.active = this.nodeHougong.node.active = r.funUtils.isOpenFun(r.funUtils.wifeView) || s.Config.DEBUG;
        this.nodeJY.interactable = r.funUtils.isOpenFun(r.funUtils.jingyingView);
        this.nodeZW.interactable = r.funUtils.isOpenFun(r.funUtils.zhengwuView);
        this.nodeClothe.interactable = r.funUtils.isOpenFun(r.funUtils.userClothe);
        _.shaderUtils.setImageGray(this.imgZhengwu, !this.nodeZW.interactable);
        _.shaderUtils.setImageGray(this.imgJingYing, !this.nodeJY.interactable);
        _.shaderUtils.setImageGray(this.imgClothe, !this.nodeClothe.interactable);
        this.nodeXF.node.active = r.funUtils.isOpenFun(r.funUtils.xunFangView);
        this.nodeTreasure.node.active = r.funUtils.isOpenFun(r.funUtils.treasureView);
        this.nodeJinban.node.active = r.funUtils.isOpenFun(r.funUtils.jibanView);
    },
    updateEmailShow() {},
    onClickOpenUnEffect(t, e) {
        r.funUtils.openViewUrl(e + "");
    },
    onClickOpen(t, e) {
        facade.send("SHOW_CLOSE_EFFECT", e);
    },
    onClickLianMeng() {
        n.unionProxy.clubInfo ? l.utils.openPrefabView("union/UnionMain") : l.utils.openPrefabView("union/UnionView");
    },
    moonCardUpdate() {
        this.scheduleOnce(this.onTimerMoon, 3);
    },
    onTimerMoon() {
        n.welfareProxy.sendOrderBack();
    },
});
