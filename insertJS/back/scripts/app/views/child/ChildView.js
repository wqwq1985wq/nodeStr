var i = require("../../utils/Utils");
var n = require("../../utils/UIUtils");
var l = require("../../Initializer");
var r = require("../../component/List");
var a = require("../../component/UrlLoad");
var s = require("../../component/StateImg");
var c = require("../servant/ServantStarShow");
var _ = require("../../component/ChildSpine");
cc.Class({
    extends: cc.Component,
    properties: {
        lblName: cc.Label,
        lblLevel: cc.Label,
        lblExp: cc.Label,
        lblTime: cc.Label,
        lblAllProp: cc.Label,
        lblEp1: cc.Label,
        lblEp2: cc.Label,
        lblEp3: cc.Label,
        lblEp4: cc.Label,
        lblMonther: cc.Label,
        lblLover: cc.Label,
        lblChildNum: cc.Label,
        list: r,
        nodeRename: cc.Node,
        nodeFeed: cc.Node,
        nodeInfo: cc.Node,
        nodeChildName: cc.Node,
        nodeLimit: cc.Node,
        nodeResume: cc.Node,
        nodeKeju: cc.Node,
        urlLoad: a,
        prg: cc.ProgressBar,
        stateImg: s,
        lblSex: cc.Label,
        lblHuoLi_Time: cc.Label,
        starShow: c,
        techangImg: cc.Sprite,
        imgArr: [cc.SpriteFrame],
        checkPeiYang: cc.Toggle,
        checkHuiFu: cc.Toggle,
        childSpine: _,
        cdNode: cc.Node,
        cdPrg: cc.ProgressBar,
    },
    ctor() {},
    onLoad() {
        facade.subscribe(l.sonProxy.UPDATE_SON_INFO, this.updateSonInfo, this);
        facade.subscribe(l.sonProxy.UPDATE_SON_SEAT, this.updateSeat, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
        this.prg.progress = 0;
        var t = this;
        this.list.selectHandle = function(e) {
            t.updateSon();
        };
        l.sonProxy.actList.sort(this.sortChild);
        this.updateSeat();
        this.list.selectIndex = 0;
    },
    updateSonInfo() {
        this.updateSeat();
        this.list.selectIndex = this.list.selectIndex;
    },
    updateSeat() {
        var t = [],
        e = l.sonProxy.base.seat;
        if (l.sonProxy.actList) for (var o = 0; o < l.sonProxy.actList.length; o++) t.push(l.sonProxy.actList[o]);
        for (o = t.length; o < e; o++) t.push({});
        localcache.getItem(localdb.table_seat, e + 1) && t.push({
            isLock: !0
        });
        this.list.data = t;
        this.lblChildNum.string = i18n.t("SON_SEAT_NUM", {
            value1: l.sonProxy.actList.length,
            value2: e
        });
    },
    onClickClost() {
        i.utils.closeView(this, !0);
    },
    updateSon() {
        var t = this.list.selectData;
        if (t && null != t.sex) {
            t = l.sonProxy.getSon(t.id);
            this.nodeInfo.active = !0;
            this.nodeChildName.active = !0;
            this.nodeLimit.active = !1;
            var e = localcache.getItem(localdb.table_minor, t.talent),
            o = localcache.getItem(localdb.table_lvUp, t.level),
            r = localcache.getItem(localdb.table_vip, l.playerProxy.userData.vip),
            a = l.wifeProxy.getWifeData(t.mom),
            s = t.exp / o.exp;
            this.lblLevel.string = i18n.t("SON_LEVEL", {
                l: t.level,
                m: e.level_max
            });
            this.nodeFeed.active = (t.state == proto_sc.SomState.baby || t.state == proto_sc.SomState.Child) && t.power > 0;
            this.nodeResume.active = (t.state == proto_sc.SomState.baby || t.state == proto_sc.SomState.Child) && 0 == t.power;
            this.nodeKeju.active = t.state == proto_sc.SomState.Student;
            this.childSpine.setKid(t.id, t.sex, !1);
            this.lblExp.string = i18n.t("COMMON_NUM", {
                f: t.exp,
                s: o.exp
            });
            if (t.state != proto_sc.SomState.Student) {
                if (this.prg.progress != s) {
                    var c = this;
                    n.uiUtils.showPrgChange(this.prg, this.prg.progress, 0 == s ? 0 : s, 1, 5,
                    function() {
                        c.prg.progress = s;
                    });
                }
            } else {
                this.prg.progress = 1;
                this.lblExp.string = "";
            }
            t.power < r.sonpow ? n.uiUtils.countDown(t.cd.next, this.lblTime,
            function() {
                t.cd.label = "sonpow";
                l.playerProxy.sendAdok(t.cd.label);
            },
            0 == t.power) : this.lblTime.unscheduleAllCallbacks();
            if (t.power > 0) {
                this.lblTime.string = i18n.t("COMMON_NUM", {
                    f: t.power,
                    s: r.sonpow
                });
                this.lblHuoLi_Time.string = i18n.t("SON_CUR_HUO_LI");
                this.cdNode.active = !1;
            } else {
                this.lblHuoLi_Time.string = i18n.t("SON_HUI_FU_TIME");
                this.cdNode.active = !0;
                var _ = 10800 - (t.cd.next - i.timeUtil.second);
                this.cdPrg.progress = _ / 10800;
            }
            this.stateImg.total = r.sonpow;
            this.stateImg.value = t.power;
            this.nodeRename.active = t.state == proto_sc.SomState.tName;
            this.lblSex.string = 1 == t.sex ? i18n.t("CREATE_NAN") : i18n.t("CREATE_NV");
            this.nodeRename.active ? (this.lblName.string = i18n.t("SON_NAME_NEED")) : (this.lblName.string = t.name);
            this.lblAllProp.string = i18n.t("SON_ZONG_HE_SHU_XING", {
                value: t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4
            });
            this.lblEp1.string = t.ep.e1 + "";
            this.lblEp2.string = t.ep.e2 + "";
            this.lblEp3.string = t.ep.e3 + "";
            this.lblEp4.string = t.ep.e4 + "";
            this.lblLover.string = a.love + "";
            this.lblMonther.string = i18n.t("SON_MONTHER") + " " + l.playerProxy.getWifeName(t.mom);
            this.starShow.setValue(t.talent);
            var d = localcache.getItem(localdb.table_wife, t.mom);
            this.techangImg.spriteFrame = this.imgArr[d.type - 1];
            0 == l.sonProxy.getChengList().length && t.state == proto_sc.SomState.Student && facade.send(l.guideProxy.UPDATE_TRIGGER, 15e3);
        } else {
            this.childSpine.clearKid();
            this.nodeChildName.active = !1;
            this.nodeInfo.active = !1;
            this.nodeLimit.active = !0;
        }
    },
    onClickLvUp() {
        var t = this.list.selectData;
        t && null != t.sex && (this.checkPeiYang.isChecked ? l.sonProxy.sendAllPlay() : l.sonProxy.sendPlay(t.id));
    },
    onClickWeiShi() {
        var t = this,
        e = this.list.selectData;
        if ((e = l.sonProxy.getSon(e.id)).power <= 0) {
            var o = i.utils.getParamInt("zs_cost_item_hl");
            i.utils.showConfirmItem(i18n.t("SON_RESUME_CONFIRM", {
                t: n.uiUtils.getItemNameCount(o, 1)
            }), o, l.bagProxy.getItemCount(o),
            function() {
                l.bagProxy.getItemCount(o) <= 0 ? i.alertUtil.alertItemLimit(o) : t.checkHuiFu.isChecked ? l.sonProxy.sendAllFood() : l.sonProxy.sendOnFood(e.id);
            },
            "SON_RESUME_CONFIRM");
        }
    },
    onClickName() {
        var t = this.list.selectData;
        if (t && null != t.sex) {
            l.sonProxy.renameId = t.id;
            i.utils.openPrefabView("child/RenameView");
        }
    },
    onClickKeju() {
        var t = this.list.selectData;
        if (t && null != t.sex) {
            0 == l.sonProxy.getChengList().length && t.state == proto_sc.SomState.Student && facade.send(l.guideProxy.UPDATE_TRIGGER, 15001);
            l.sonProxy.sendKeJu(t.id);
        }
    },
    onClickGoTo() {
        i.utils.closeView(this);
        i.utils.openPrefabView("wife/WifeSelectView");
    },
    sortChild(t, e) {
        return e.level - t.level;
    },
});
