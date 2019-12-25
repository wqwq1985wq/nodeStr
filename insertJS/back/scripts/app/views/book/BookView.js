var i = require("../../utils/Utils");
var n = require("../../Initializer");
var l = require("../../utils/UIUtils");
var r = require("./BookItem");
var a = require("../../component/UrlLoad");
cc.Class({
    extends: cc.Component,
    properties: {
        lblCount:cc.Label,
        nodeAdd:cc.Node,
        sp:a,
        nodeAll:cc.Node,
        nodeLeft:cc.Node,
        ndoeRight:cc.Node,
        items:[r],
        gais:[cc.Node],
        lblCosts:[cc.Label],
        lblAdd:cc.Label,
        lblLv:cc.Label,
        lblExp:cc.Label,
        prg:cc.ProgressBar,
        btnOneKeyStudy:cc.Node,
    },

    ctor(){
        this.max = 0;
        this.curIndex = 0;
    },

    onLoad() {
        this.updateSeatCount();
        facade.subscribe(n.bookProxy.UPDATE_BOOK_BASE, this.updateBase, this);
        facade.subscribe(n.bookProxy.UPDATE_BOOK_LIST, this.updateSeatCount, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onMoveLeft, this);
        facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onMoveRight, this);
        facade.subscribe(n.bookProxy.UPDATE_BOOK_LEVEL, this.updateLvShow, this);
        this.updateAdd();
        l.uiUtils.scaleRepeat(this.nodeLeft, 0.95, 1.05);
        l.uiUtils.scaleRepeat(this.ndoeRight, 0.95, 1.05);
        this.lblAdd.string = i18n.t("BOOK_ADD_TIP", {
            d: i.utils.getParamInt("school_study_exp"),
            t: i.utils.getParamInt("school_skill_exp")
        });
        this.updateLeftShow();
        this.updateLvShow();
        this.onPlayVoice();
    },
    onMoveLeft() {
        this.onClickSelect(null, -1);
    },
    onMoveRight() {
        this.onClickSelect(null, 1);
    },
    updateLvShow() {
        var t = n.bookProxy.level.level,
        e = n.bookProxy.level.exp,
        o = localcache.getItem(localdb.table_schoollv, t),
        i = o ? o.school_exp: 1;
        this.lblLv.string = i18n.t("BOOK_LEVEL_TIP", {
            d: t
        });
        this.lblExp.string = null == o || 0 == i ? i18n.t("COMMON_MAX") : i18n.t("COMMON_NUM", {
            f: e,
            s: i
        });
        this.prg.progress = null == o || 0 == i ? 1 : e / i;
    },
    updateLeftShow() {
        var t = Math.floor((n.bookProxy.base.desk + 1) / this.items.length);
        this.ndoeRight.active = this.nodeLeft.active = t > 0;
    },
    updateBase() {
        this.updateLeftShow();
        this.updateSeatCount();
    },
    updateAdd() {
        var t = i.timeUtil.getCurData();
        this.sp.node.active = t > 0 && t < 5;
        this.sp.node.active && (this.sp.url = l.uiHelps.getLangSp(t));
        this.nodeAll.active = !this.sp.node.active;
    },
    updateSeatCount() {
        0 == this.max && (this.max = localcache.getList(localdb.table_school).length);
        this.nodeAdd.active = n.bookProxy.base.desk <= this.max;
        this.lblCount.string = i18n.t("BOOK_CUR_SEAT", {
            n: this.getCur(),
            m: n.bookProxy.base.desk
        });
        for (var t = localcache.getItem(localdb.table_school, n.bookProxy.base.desk), e = this.curIndex * this.items.length, o = 0; o < this.items.length; o++) {
            this.gais[o].active = o + e >= n.bookProxy.base.desk;
            this.lblCosts[o].string = t ? t.cash + "": "";
            this.lblCosts[o].node.parent.active = o + e == n.bookProxy.base.desk && null != t;
            this.items[o].node.active = n.bookProxy.base.desk > o + e;
            this.items[o].node.active && (this.items[o].data = n.bookProxy.list.length > o + e ? n.bookProxy.list[o + e] : null);
        }
        var l = n.timeProxy.getLoacalValue("BOOK_STUDY_PARAM"),
        r = !1;
        for (o = 0; o < n.bookProxy.list.length; o++) if (n.bookProxy.list[o].hid && 0 != n.bookProxy.list[o].hid) {
            r = !0;
            break;
        }
        i.stringUtil.isBlank(l) || r ? (this.btnOneKeyStudy.active = !1) : (this.btnOneKeyStudy.active = !0);
    },
    getCur() {
        for (var t = 0,
        e = 0; e < n.bookProxy.list.length; e++) {
            t += 0 != n.bookProxy.list[e].hid ? 1 : 0;
        }
        return t;
    },
    onPlayVoice() {
        if (null != n.bookProxy.list) {
            for (var t = [], e = 0; e < n.bookProxy.list.length; e++) t.push(n.bookProxy.list[e].hid);
            if (0 != t.length) {
                var o = n.voiceProxy.randomHeroVoice(t[Math.floor(Math.random() * t.length)]);
                o && i.audioManager.playSound("servant/" + o.herovoice, !0, !0);
            }
        }
    },
    onClickAdd() {
        var t = localcache.getItem(localdb.table_school, n.bookProxy.base.desk);
        if (t) {
            var e = n.bagProxy.getItemCount(1);
            i.utils.showConfirmItem(i18n.t("BOOK_BUY_SEAT", {
                c: t.cash
            }), 1, e,
            function() {
                e < t.cash ? i.alertUtil.alertItemLimit(1) : n.bookProxy.sendBuyDesk();
            },
            "BOOK_BUY_SEAT");
        }
    },
    onClickClost() {
        i.utils.closeView(this);
    },
    onClickSelect(t, e) {
        var o = parseInt(e);
        if (0 != this.curIndex || -1 != o) {
            var i = Math.floor((n.bookProxy.base.desk + 1) / this.items.length);
            this.curIndex += o;
            this.curIndex = this.curIndex < 0 ? i: this.curIndex;
            this.curIndex = this.curIndex > i ? 0 : this.curIndex;
            this.updateSeatCount();
        } else this.onClickClost();
    },
    onClickOneKey() {
        if (n.playerProxy.userData.vip < 5) i.alertUtil.alert18n("BOOK_VIP_ONE_KEY_STUDY");
        else {
            var t = n.timeProxy.getLoacalValue("BOOK_STUDY_PARAM"),
            e = JSON.parse(t);
            if (null != e) {
                var o = [],
                l = 0;
                for (var r in e) {
                    var a = {};
                    if (0 != e[r]) {
                        if (n.xianyunProxy.isXianYun(e[r])) {
                            l = e[r];
                            break;
                        }
                        a.id = parseInt(r);
                        a.hid = e[r];
                        o.push(a);
                    }
                }
                if (0 == l) n.bookProxy.sendOneKeyStudy(o);
                else {
                    var s = localcache.getItem(localdb.table_hero, l);
                    i.alertUtil.alert(i18n.t("BOOK_HERO_IS_XIAN_YUN", {
                        name: s.name
                    }));
                }
            } else i.alertUtil.alert18n("BOOK_ONE_KEY_LIMIT");
        }
    },
    onClickOneKeyOver() {
        if (n.playerProxy.userData.vip < 4) i.alertUtil.alert18n("BOOK_VIP_ONE_KEY_FINISH");
        else {
            for (var t = !1,
            e = 0; e < n.bookProxy.list.length; e++) if (0 != n.bookProxy.list[e].hid) {
                t = !0;
                break;
            }
            t ? n.bookProxy.sendOneKyOver() : i.alertUtil.alert18n("BOOK_NO_HERO_STUDY");
        }
    },
});
