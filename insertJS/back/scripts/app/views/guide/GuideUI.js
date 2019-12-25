var i = require("../../Initializer");
var n = require("../../utils/Utils");
var l = require("../../utils/UIUtils");
var config = require("../../Config");
var apiUtil = require("../../utils/ApiUtils");

cc.Class({
    extends: cc.Component,
    properties: {
        lblContext: cc.Label,
        guideJump: cc.Node,
        guide: cc.Node,
        guide1: cc.Node,
        frames: [cc.Node],
        texts: [cc.Label],
        nodeContinue: cc.Node,
    },
    ctor() {
        this._guide = null;
        this._target = null;
        this._listenClick = !1;
        this._state = 0;
        this._isBlank = !1;
        this._press = !1;
        this._triggerId = 0;
        this._waitActiveGuide = null;
        this.itemPool = new Map();
        this._isShowEffect = !1;
        this._helpGuideType = 0;
        this._isTrigger = true;
    },
    onLoad() {
        i.guideProxy.guideUI = this;
        this._triggerId = i.playerProxy.guide.gnew;
        facade.subscribe("STORY_END", this.triggerFist, this);
        facade.subscribe("GUIDE_HELP", this.onHelpGuide, this);
        facade.subscribe(i.guideProxy.UPDATE_TRIGGER_GUIDE, this.triggerGuide, this);
        facade.subscribe(i.guideProxy.UPDATE_TRIGGER, this.trigger, this);
        this.triggerFist();
        l.uiUtils.scaleRepeat(this.nodeContinue, 0.95, 1.05);
    },
    onHelpGuide(t) {
        var e = parseInt(t),
        o = localcache.getGroup(localdb.table_tips, "type", e);
        this._helpGuideType = t;
        for (var i = 0; i < o.length; i++) if (0 != o[i].guide) {
            this.trigger(o[i].guide);
            break;
        }
    },
    trigger(t) {
        var e = localcache.getItem(localdb.table_guide, t);
        this._isShowEffect = !0;
        this.setGuide(e);
    },
    triggerFist() {
        if (i.playerProxy.guide.gnew <= 1 && (null == i.playerProxy.storyIds || 0 == i.playerProxy.storyIds.length)) {
            var t = n.utils.getParamInt("guide_first_id");
            t = 0 == t ? 1 : t;
            var e = localcache.getItem(localdb.table_guide, t);
            this._isShowEffect = !0;
            this.setGuide(e);
            i.guideProxy.sendGuide(t);
            i.playerProxy.userData.level < 1 && i.guideProxy.sendGuideUpGuan();
        }
    },
    onDestroy() {
        this.removeListenClick();
        facade.remove(this);
    },
    update() {
        this.checkFocusItem(null);
        this.triggerAfterItemActive();
    },
    triggerGuide(t) {
        for (var e = t.type,
        o = t.value,
        l = localcache.getList(localdb.table_guide), r = 0, a = l.length; r < a; r++) {
            var s = l[r];
            if (s.trigger == e && s.trigger_val == o && this._triggerId <= s.guide_id) {
                this._triggerId = s.guide_id;
                this._isShowEffect = !0;
                if (n.stringUtil.isBlank(s.button_name) || this.isItemActive(s)) {
                    this.setGuide(s);
                    i.guideProxy.sendGuide(s.guide_id);
                } else this._waitActiveGuide = s;
                break;
            }
        }
    },
    triggerAfterItemActive() {
        var t = this._waitActiveGuide;
        null != t && this.isItemActive(t) && this.setGuide(t);
    },
    startupListenClick() {
        if (!this._listenClick) {
            this._listenClick = !0;
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, !0);
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, !0);
        }
    },
    removeListenClick() {
        if (this._listenClick) {
            this._listenClick = !1;
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, !0);
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, !0);
        }
    },
    onTouchStart(t) {
        if (1 == this._state) {
            this._isBlank ? n.alertUtil.alert18n("GUIDE_LIMIT") : this.nextGuide();
            t.stopPropagationImmediate();
        } else if (2 == this._state) {
            if (this._target == t.target || t.target == this.guideJump) {
                if (!this._guide || 99 != this._guide.trigger) return;
                t.stopPropagationImmediate();
            }
            if (null != this._target) {
                if (this._target.activeInHierarchy) {
                    var e = t.getLocationInView(),
                    o = this.guide1.getPosition();
                    Math.abs(e.x - (o.x + this.node.x)) < 100 && Math.abs(e.y - (this.node.y - o.y)) < 100 && (this._press = !0);
                }
                this._guide && 99 == this._guide.trigger && (this._press = !0);
            }
            t.stopPropagationImmediate();
        }
    },
    onTouchEnd(t) {
        if (this._press) {
            this._press = !1;
            if (2 == this._state && null != this._target) {
                var e = this._target.getComponent(cc.Button);
                null == e && (e = this._target.getComponent(cc.Toggle));
                if (null != e) {
                    t.target = this._target; (null != this._guide && 99 == this._guide.trigger) || cc.Component.EventHandler.emitEvents(e.clickEvents, t);
                    this.onClick(t);
                } else if (this._guide && 99 == this._guide.trigger) {
                    t.target = this._target;
                    this.onClick(t);
                }
            }
        }
    },
    addGuideHandler(t) {
        if (null != t && null == t._GH) {
            t._GH = !0;
            t.on("click", this.onClick, this);
            cc.log("[GUIDE]Listen click event:" + t.name);
        }
    },
    removeGuideHandler(t) {
        if (null != t && t._GH) {
            t._GH = void 0;
            t.off("click", this.onClick, this);
        }
    },
    onClick(t) {
        if (2 == this._state && (this._target == t.target || (this._guide && 99 == this._guide.trigger))) {
            cc.log("[GUIDE]onClick:" + t.target.name);
            this._state = 0;
            this.nextGuide();
        }
    },
    onClickJump() {
        var t = this._guide;
        null != t && 0 != t.guide_next && (this._guide = localcache.getItem(localdb.table_guide, t.guide_next));
        this.setGuide(null);
    },
    showJump() {
        this.guideJump.active = this.guide1.active;
    },
    setItem(t, e) {
        null == this.itemPool.get(t) && this.itemPool.set(t, e);
        null == e && null != this.itemPool.get(t) && this.itemPool.set(t, e);
        this.checkFocusItem(t);
    },
    setGuide(t) {
        if (null == t && null != this._guide && 99 != this._guide.trigger) {
            this._triggerId = this._guide.guide_id;
            i.guideProxy.sendGuide(this._guide.guide_id);
        }
        this._guide = t;
        this._state = 0;
        this._isBlank = !1;
        this.removeGuideHandler(this._target);
        this._target = null;
        this._waitActiveGuide = null;
        this.guideJump.active = !1;
        if (null != t) {
            cc.log("[GUIDE]" + t.guide_id + ":" + t.dialog);
            this.startupListenClick();
            if (n.stringUtil.isBlank(t.button_name)) {
                this._state = 1;
                this._isBlank = n.stringUtil.isBlank(t.dialog);
                this.guide.active = !this._isBlank;
                if (this._isShowEffect) {
                    n.utils.showNodeEffect(this.guide);
                    this._isShowEffect = !1;
                }
                this.guide1.active = !1;
                this.lblContext.string = t.dialog.replace("#name#", i.playerProxy.userData.name);
            } else {
                this._state = 2;
                this.guide.active = !1;
                this.guide1.active = !0;
                this.scheduleOnce(this.showJump, 3);
                for (var e = 0; e < 4; e++) {
                    var o = e + 1 == t.fangxiang;
                    this.frames[e].active = o;
                    this.texts[e].string = o ? t.dialog: null;
                }
                this.checkFocusItem(null);
            }
        } else this.scheduleOnce(this.delayHide, 0.1);
    },
    delayHide() {
        this.guide.active = !1;
        this.guide1.active = !1;
        if (0 != this._helpGuideType) {
            n.utils.openPrefabView("HelpWindow", !1, {
                type: this._helpGuideType
            });
            this._helpGuideType = 0;
        }
    },
    isHideShow() {
        return ! this.guide.active && !this.guide1.active;
    },
    checkFocusItem(t) {
        if (2 == this._state) {
            var e = this._guide;
            if (null != e) {
                var o = e.button_ui + "-" + e.button_name + (n.stringUtil.isBlank(e.button_item + "") ? "": "-" + e.button_item);
                if (null == t || t == o) {
                    var i = this.itemPool.get(o);
                    if (null != i) {
                        this._target = i.node;
                        if (i.node.activeInHierarchy) {
                            var l = n.utils.getWorldPos(i.node, this.node);
                            this.guide1.setPosition(l); (l.x < -360 || l.y > 360) && facade.send("GUIDE_MOVE_ITEM", l.x);
                            this.addGuideHandler(i.node);
                        } else 99 == e.trigger && this.nextGuide();
                    } else(99 != e.trigger && 98 != e.trigger) || this.nextGuide();
                }
            }
        }
    },
    isItemActive(t) {
        var e = t.button_ui + "-" + t.button_name,
        o = this.itemPool.get(e);
        return ! (null == o || !o.node.activeInHierarchy);
    },
    nextGuide() {
        var t = this._guide;
        null != t && (0 != t.guide_next ? this.setGuide(localcache.getItem(localdb.table_guide, t.guide_next)) : this.setGuide(null));
        if(null == t || (t.guide_next == 0 && config.Config.login_by_sdk))
        {
            apiUtil.apiUtils.callSMethod3("finishNewGuild");
        }
    },
});
