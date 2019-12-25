var i = require("../../utils/Utils");
var n = require("../../utils/UIUtils");
var l = require("../../component/List");
var r = require("../../Initializer");
var a = require("../../component/UrlLoad");
var s = require("../../models/TimeProxy");
var c = require("../../utils/ShaderUtils");
var _ = require("../../component/RoleSpine");
var d = require("../../Config");
var u = require("../../models/JibanProxy");

var StoryView = cc.Class({
    extends: cc.Component,
    properties: {
        nodeLeft: cc.Node,
        nodeCon: cc.Node,
        nodeTalk: cc.Node,
        nodeTalkItem: cc.Node,
        nodeSelect: cc.Node,
        lblName: cc.Label,
        lblStone: cc.Label,
        lblContext: cc.Label,
        lblSp: cc.Label,
        imgBg: a,
        imgPrefab: a,
        list: l,
        right: a,
        anima: a,
        nodeSkil: cc.Node,
        nodeSkilAnima: cc.Node,
        nodeImg: cc.Node,
        nodeImg1: cc.Node,
        nodeSp: cc.Node,
        roleSpine: _,
        nodeClost: cc.Node,
        roleName: a,
        animeName: cc.Animation,
        nameNode: cc.Node,
        record: cc.Node,
        autoPlayer: cc.Toggle,
        autoBg: cc.Node,
        prgArmy: cc.ProgressBar,
        lblPrgArmy: cc.Label,
    },
    ctor() {
        this._curId = 0;
        this._curData = null;
        this._isAnima = !1;
        this._heroId = 0;
        this._wifeId = 0;
        this._type = 0;
        this._storyRecords = [];
        this._talkType = 0;
        this.imgbgSprite = null;
        this.nextTime = 1;
        this._isSkip = !1;
        this._skipSelectList = null;
        this._isSkipLook = !1;
    },

    onLoad() {
        var t = this.node.openParam;
        t && t.heroid && (this._heroId = t.heroid);
        t && t.wifeid && (this._wifeId = t.wifeid);
        t && t.type && (this._type = t.type);
        t && t.talkType && (this._talkType = t.talkType);
        n.uiUtils.scaleRepeat(this.nodeCon, 0.95, 1.05);
        facade.subscribe("SHOW_STORY", this.showNextStory, this);
        facade.subscribe("STORY_SHOW_ARMY", this.showArmy, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onMoveLeft, this);
        this.roleSpine.node.active = !1;
        this.right.node.active = !1;
        this.showNextStory();
        this.autoPlayer.isChecked = StoryView.isAutoPlay;
        this.autoBg.active = !this.autoPlayer.isChecked;
        if (t && 1 == t.isSkip && 5 == this._type) {
            this._isSkipLook = !0;
            this._curData && this.scheduleOnce(this.onClickSkip, 0.5);
        }
        this.nodeTalk.getComponent(cc.Animation).on("stop", () => {
            this.resetTalkNode();
        });
    },
    onMoveLeft() {},

    resetTalkNode () {
        if(this.nodeTalkItem.scaleY !== 1) {
            this.nodeTalkItem.scaleY = 1;
        }

        if (this.nodeTalkItem.scaleX !== 1) {
            this.nodeTalkItem.scaleX = 1;
        }

        this.nodeTalkItem.position = cc.p(0,0);
    },
    onClickNext() {
        if (!this._isAnima && !this.is_Show_Hide_Effect) {
            if (this._isSkipLook) {
                this._isSkipLook = !1;
                this.unscheduleAllCallbacks();
                facade.send("UNLOCK_AUTO_LOOK");
            }
            if (this.nodeSelect.active);
            else if (this._curData) {
                this.unscheduleAllCallbacks();
                if (this.nodeImg.active && this.lblStone.isRunShowText) {
                    this.lblStone.unscheduleAllCallbacks();
                    this.lblStone.string = r.playerProxy.getReplaceName(this._curData.txt);
                    this.lblStone.isRunShowText = !1;
                    StoryView.isAutoPlay && this.scheduleOnce(this.onClickNext, this.nextTime);
                } else if (this.nodeImg1.active && this.lblContext.isRunShowText) {
                    this.lblContext.unscheduleAllCallbacks();
                    this.lblContext.string = r.playerProxy.getReplaceName(this._curData.txt);
                    this.lblContext.isRunShowText = !1;
                    StoryView.isAutoPlay && this.scheduleOnce(this.onClickNext, this.nextTime);
                } else if (this.nodeSp.active && this.lblSp.isRunShowText) {
                    this.lblSp.unscheduleAllCallbacks();
                    this.lblSp.string = r.playerProxy.getReplaceName(this._curData.txt);
                    this.lblSp.isRunShowText = !1;
                    StoryView.isAutoPlay && this.scheduleOnce(this.onClickNext, this.nextTime);
                } else this.showNext(this._curData.nextid);
            } else this.showNext("0");
        }
    },
    onClickSkip() {
        if (3 != this._type) {
            var t = this._curData.nextid;
            this._isSkip = !0;
            for (;;) {
                var e = r.playerProxy.getStoryData(t);
                if (null == e) break;
                t = e.nextid;
            }
            this.showNext(t);
            i.audioManager.playSound("", !0);
            this._isSkipLook && this._skipSelectList && this._skipSelectList.length > 0 && this.scheduleOnce(this.onClickAutoSelect, 1);
        } else {
            this.showNext("0");
            i.audioManager.playSound("", !0);
        }
    },
    onClickAutoSelect() {
        var t = Math.floor(Math.random() * this._skipSelectList.length),
        e = this._skipSelectList[t];
        e && this.clickNextId(e);
    },
    onClickSkipAnima() {
        this.unscheduleAllCallbacks();
        this._isAnima = !1;
        this.onClickNext();
    },
    clickNextId(t) {
        if (this.isCanSelect(t)) {
            var e = localcache.getItem(localdb.table_storySelect2, t.id);
            if (e && 1 == e.battle1 && !r.fightProxy.isEnoughArmy() && e.group.split("_").length <= 1) {
                i.alertUtil.alertItemLimit(4, r.fightProxy.needArmy());
                this.nodeClost.active = !0;
            } else {
                this.nodeSelect.active = !1;
                if (t) switch (this._type) {
                case 0:
                case 3:
                case 5:
                    r.jibanProxy.sendGetAward(t.id);
                    facade.send("STORY_SELECT", t);
                    3 != this._type && 5 != this._type && r.timeProxy.saveSelectStory(t.id);
                    this.showNext(t.nextid);
                    break;
                case 1:
                    this.showNext(t.nextid);
                    r.jibanProxy.sendGetJYAward(t.id);
                    break;
                case 2:
                    this.showNext(t.nextid);
                    r.jingyingProxy.sendZwAct(3, t.id);
                    break;
                case 4:
                    this.showNext(t.nextid);
                    r.feigeProxy.sendTalkStory(1 == this._talkType ? this._heroId: this._wifeId, this._talkType, t.id);
                    break;
                case 99:
                    this.showNext(t.nextid);
                    r.timeProxy.saveSelectStory(t.id);
                }
            }
        }
    },
    onClickNextId(t, e) {
        if (this._isSkipLook) {
            this._isSkipLook = !1;
            this.unscheduleAllCallbacks();
            facade.send("UNLOCK_AUTO_LOOK");
        }
        var o = e.data;
        this.clickNextId(o);
    },
    isCanSelect(t, e) {
        void 0 === e && (e = !0);
        if (99 == this._type) return ! 0;
        var o = !0,
        n = t.tiaojian,
        l = t.para;
        switch (n) {
        case 1:
        case 2:
        case 3:
        case 4:
            !(o = r.playerProxy.userEp["e" + n] >= parseInt(l)) && e && i.alertUtil.alert(i18n.t("STORY_NEED_PROP", {
                n: i18n.t("COMMON_PROP" + n),
                v: l
            }));
            break;
        case 5:
            !(o = r.jibanProxy.belief >= parseInt(l)) && e && i.alertUtil.alert(i18n.t("STORY_NEED_PROP", {
                n: i18n.t("SERVANT_ROLE_SW"),
                v: l
            }));
            break;
        case 6:
            var a = l.split("|");
            if (! (o = r.jibanProxy.getHeroJB(parseInt(a[0])) >= parseInt(a[1])) && e) {
                var s = localcache.getItem(localdb.table_hero, a[0]);
                i.alertUtil.alert(i18n.t("STORY_NEED_PROP", {
                    n: i18n.t("SERVANT_JIBAN_HERO", {
                        n: s ? s.name: ""
                    }),
                    v: a[1]
                }));
            }
            break;
        case 7:
            a = l.split("|"); ! (o = r.jibanProxy.getWifeJB(parseInt(a[0])) >= parseInt(a[1])) && e && i.alertUtil.alert(i18n.t("STORY_NEED_PROP", {
                n: i18n.t("SERVANT_JIBAN_WIFE", {
                    n: r.playerProxy.getWifeName(parseInt(a[0]))
                }),
                v: a[1]
            }));
        }
        return o;
    },

    showServantSpine() {
        if (0 != parseInt(this._curData.img1 + "")) {
            var t = 0 != this._heroId ? this._heroId + "": this._curData.img1 + "";
            if (0 != this._wifeId) {
                t = localcache.getItem(localdb.table_wife, this._wifeId).res + "";
            }
            this.right.url = 0 != this._wifeId ? n.uiHelps.getWifeBody(t) : n.uiHelps.getServantSpine(t);
            this.roleSpine.node.active = !1;
            this.right.node.active = !0;
            this.right.node.x = this._curData.x;
            this.right.node.scaleX = this._curData.x < 0 ? 1 : -1;
            var e = !1,
            o = r.timeProxy.getLoacalValue("STORY_SHOW_ID"),
            l = JSON.parse(o);
            l = null == l ? [] : l;
            for (var a = 0; a < l.length; a++) if (l[a] == t) {
                e = !0;
                break;
            }
            this.nameNode.active = !e;
            if (!e) {
                this.nameNode.x = this._curData.x < 0 ? -300 : 300;
                this.roleName.url = n.uiHelps.getStoryRoleName(t);
                i.utils.showEffect(this.animeName, 0);
                l.push(t);
                r.timeProxy.saveLocalValue("STORY_SHOW_ID", JSON.stringify(l));
            }
        } else {
            this.roleSpine.node.active = !i.stringUtil.isBlank(this._curData.say);
            this.roleSpine.node.x = this._curData.x;
            this.roleSpine.node.scaleX = this._curData.x < 0 ? 1 : -1;
            this.right.node.active = !1;
            this.nameNode.active = !1;
            this.roleSpine && (i.stringUtil.isBlank(this._curData.face) ? this.roleSpine.actionString() : this.roleSpine.actionString(this._curData.face));
        }
    },
    showLabelStory() {
        this.showServantSpine();
        this.nodeTalk.active = !0;
        this.nodeSelect.active = !1;
        var t = "role" == this._curData.say.trim(),
        e = i.stringUtil.isBlank(this._curData.say);
        e || this._storyRecords.push(this._curData);
        this.record.active = this._storyRecords.length > 2;
        if (!i.stringUtil.isBlank(this._curData.sound + "")) {
            if (! ((e && i.audioManager._isBlank) || (t && i.audioManager._isRole) || (!e && !t && i.audioManager._isNpc))) {
                var l = this;
                i.audioManager.playSound(this._curData.sound + "", !0, !0,
                function() {
                    l.soundPlayerOver();
                });
            }
        }
        var a = "";
        if (0 != this._heroId) {
            var s = localcache.getItem(localdb.table_hero, this._heroId);
            a = s ? s.name: "";
        }
        0 != this._wifeId && (a = r.playerProxy.getWifeName(this._wifeId));
        this.lblName.string = e ? "": t ? r.playerProxy.userData.name: (0 == this._heroId && 0 == this._wifeId) || i.stringUtil.isBlank(a) ? this._curData.say: a;
        var c = r.playerProxy.getReplaceName(this._curData.txt);
        this.nodeImg.active = !e && 1 != this._curData.teshu;
        this.nodeImg1.active = e && 1 != this._curData.teshu;
        this.nodeSp.active = 1 == this._curData.teshu;
        if (1 != this._curData.teshu) { (2 != this._curData.teshu && 4 != this._curData.teshu) || (this.nodeImg.active ? n.uiUtils.showShakeNode(this.nodeImg) : this.nodeImg1.active && n.uiUtils.showShakeNode(this.nodeImg1));
            if (2 == this._curData.teshu || 5 == this._curData.teshu) {
                n.uiUtils.showShake(this.imgBg);
                n.uiUtils.showShake(this.imgPrefab);
            } (2 != this._curData.teshu && 3 != this._curData.teshu) || n.uiUtils.showShake(this.right);
        }
        i.utils.showNodeEffect(this.nodeTalk, -1);
        if (this.nodeImg.active) n.uiUtils.showText(this.lblStone, c, null != this._curData.time && 0 != this._curData.time ? this._curData.time / 1e3 / c.length: 0.1);
        else if (this.nodeImg1.active) {
            var _ = Math.ceil((26 * c.length) / this.lblContext.node.width);
            this.lblContext.node.y = 15 * _;
            n.uiUtils.showText(this.lblContext, c, null != this._curData.time && 0 != this._curData.time ? this._curData.time / 1e3 / c.length: 0.1);
        } else this.nodeSp.active && n.uiUtils.showText(this.lblSp, c, null != this._curData.time && 0 != this._curData.time ? this._curData.time / 1e3 / c.length: 0.1);
        if (StoryView.isAutoPlay && !i.audioManager.isPlayLastSound()) {
            var d = null != this._curData.time && 0 != this._curData.time ? this._curData.time / 1e3: 0.1 * c.length;
            this.scheduleOnce(this.onClickNext, d + this.nextTime);
        }
    },
    showAnimaStory() {
        this._isAnima = !0;
        this.anima.loadHandle = this.onLoadAnimaOver;
        this.anima.target = this;
        this.anima.url = n.uiHelps.getStoryPrefab(this._curData.eff);
    },
    onLoadAnimaOver() {
        var t = this,
        e = this.anima.node.getComponentsInChildren(cc.Animation);
        if (e && e.length > 0 && e[0].getClips().length > 0) {
            var o = e[0].getClips()[0].duration;
            this.scheduleOnce(function() {
                t._isAnima = !1;
                t.onClickNext();
            },
            o);
            this._curData.id == r.playerProxy.getFirstStoryId() && facade.send("STORY_FIRST_START");
        }
    },
    showStory() {
        var t = !i.stringUtil.isBlank(this._curData.eff);
        var isOPenAnim = (this._curData.eff === "piantoudonghua01" || this._curData.eff === "piantoudonghua02" ||
            this._curData.eff === "piantoudonghua03" || this._curData.eff === "njq001" || this._curData.eff === "njq002"
            || this._curData.eff === "njq003" || this._curData.eff === "njq004"
        );
        this.nodeSkil.active = (!t && d.Config.DEBUG) || 3 == this._type || (5 == this._type && r.playerProxy.getVipValue("is_jump"));
        this.nodeSkilAnima.active = t && (d.Config.DEBUG || isOPenAnim);
        this.nodeLeft.active = !t;
        this.right.node.active = !t;
        this.nameNode.active = !t;
        this.nodeTalk.active = !t;
        this.nodeSelect.active = !t;
        this.anima.node.active = t;
        this.imgBg.node.active = !i.stringUtil.isBlank(this._curData.bg);
        this.imgPrefab.node.active = !i.stringUtil.isBlank(this._curData.bg);
        if (this.imgBg.node.active) {
            this.imgBg.url = n.uiHelps.getStory(this._curData.bg);
            this.imgPrefab.url = n.uiHelps.getStoryBg(this._curData.bg);
            var e = !i.stringUtil.isBlank(this._curData.say);
            null == this.imgbgSprite && (this.imgbgSprite = this.imgBg.node.getComponent(cc.Sprite));
            this.imgbgSprite.unscheduleAllCallbacks();
            // c.shaderUtils.setSlowBlur(this.imgbgSprite, !e); ! e && this.imgbgSprite.blur > 0.1 ? this.scheduleOnce(this.hideImgBg, 1.5) : e || !(null == this.imgbgSprite.blur || this.imgbgSprite.blur <= 0.1) || t || (this.imgBg.node.active = !1);
        }
        t ? this.showAnimaStory() : this.showLabelStory();
        if(this._curData && this._curData.id <= 7)
        {
            var recordStep = new proto_cs.user.recordSteps();
            recordStep.stepId = this._curData.id
            JsonHttp.send(recordStep, function() {
            });
        }
    },
    hideImgBg() {
        this.imgbgSprite && (null == this.imgbgSprite.blur || this.imgbgSprite.blur <= 0.1) && (this.imgBg.node.active = !1);
    },
    showNextStory() {
        if (0 == this._curId) if (0 != r.playerProxy.storyIds.length) {
            this._curId = r.playerProxy.storyIds.shift();
            this._curData = r.playerProxy.getStoryData(this._curId);
            this._curData ? this.showStory() : this.onClickNext();
        } else {
            if (99 != this._type) {
                facade.send("STORY_END");
                facade.send(r.guideProxy.UPDATE_TRIGGER_GUIDE, {
                    type: 5,
                    value: parseInt(r.timeProxy.getLoacalValue("StoryId"))
                });
            } else facade.send("STORY_END_RECORD");
            i.utils.closeView(this);
        }
    },
    clickClost() {
        facade.send("STORY_END_RECORD");
        i.utils.closeView(this);
    },
    showNext(t) {
        var e = r.playerProxy.getStorySelect(t);
        this.nodeClost.active = 99 == this._type;
        if (e && e.length > 0) {
            this.nodeTalk.active = !1;
            this.nodeSelect.active = !0;
            this.anima.url = "";
            var o = [];
            this._skipSelectList = [];
            for (var i = 0; i < e.length; i++) {
                var n = new u.StorySelectData();
                n.nextid = e[i].next1;
                n.context = e[i].text1;
                n.id = e[i].id;
                n.tiaojian = e[i].tiaojian;
                n.para = e[i].para;
                this.isCanSelect(n, !1) ? this._isSkipLook && this._skipSelectList.push(n) : (this.nodeClost.active = !0);
                o.push(n);
            }
            e[0].group.split("_").length > 1 && o.sort(function(t, e) {
                return 10 * Math.random() < 5 ? 1 : -1;
            });
            this.list.data = o;
        } else {
            this._curData && this._curData.skip && 0 != this._curData.skip && s.funUtils.openView(this._curData.skip);
            var l = this._curData ? this._curData.id: 0;
            this._isSkip && (t = "0");
            this._curData = r.playerProxy.getStoryData(t);
            if (this._curData) this.showStory();
            else {
                this._curId = 0;
                0 != l && 99 != this._type && r.timeProxy.saveLocalValue("StoryId", l + "");
                this.showNextStory();
            }

            if(this._curData && this._curData.id <= 7)
            {
                var recordStep = new proto_cs.user.recordSteps();
                recordStep.stepId = this._curData.id
                JsonHttp.send(recordStep, function() {
                });
            }
        }
    },
    showArmy(t) {
        if (! (t <= 0)) {
            var e = r.playerProxy.userData.army,
            o = e + t;
            this.prgArmy.node.active = !0;
            this.prgArmy.node.opacity = 255;
            n.uiUtils.showNumChange(this.lblPrgArmy, o, e);
            n.uiUtils.showPrgChange(this.prgArmy, 1, e / o);
            i.utils.showEffect(this.prgArmy, 0);
        }
    },
    onClickSys(t, e) {
        i.utils.openPrefabView(e);
    },
    onClickWord() {
        i.utils.openPrefabView("StoryWord", !1, this._storyRecords);
    },

    onClickAutoPlay() {
        this.autoBg.active = !this.autoPlayer.isChecked;
        StoryView.isAutoPlay = this.autoPlayer.isChecked;
        r.timeProxy.saveLocalValue("STORY_AUTO_PLAYER", this.autoPlayer.isChecked ? "1": "0");
        if (this.autoPlayer.isChecked) {
            if (!this.nodeSelect.active) {
                var t = "",
                e = r.playerProxy.getReplaceName(this._curData.txt);
                this.nodeImg.active && this.lblStone.isRunShowText ? (t = this.lblStone.string) : this.nodeImg1.active && this.lblContext.isRunShowText ? (t = this.lblContext.string) : this.nodeSp.active && this.lblSp.isRunShowText && (t = this.lblSp.string);
                var i = null != this._curData.time && 0 != this._curData.time ? (this._curData.time / 1e3) * (t.length / e.length) : 0.1 * t.length;
                this.scheduleOnce(this.onClickNext, i + this.nextTime);
            }
        } else this.unscheduleAllCallbacks();
    },
    soundPlayerOver() {
        StoryView.isAutoPlay && this.scheduleOnce(this.onClickNext, this.nextTime);
    },

    onDisable () {
        i.audioManager.stopLastSound();
    }
});

StoryView.isAutoPlay = false;
