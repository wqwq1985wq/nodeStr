var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/UIUtils");
var r = require("../../utils/Utils");
var a = require("../../utils/ShaderUtils");
var s = require("../../component/ChildSpine");
var c = require("../servant/ServantStarShow");
cc.Class({
    extends: cc.Component,
    properties: {
        unMarryNode: cc.Node,
        marryedNode: cc.Node,
        lblMother: cc.Label,
        lblQinMi: cc.Label,
        lblSonName: cc.Label,
        lblWuLi: cc.Label,
        lblZhiLi: cc.Label,
        lblShuXing: cc.Label,
        lblMeiLi: cc.Label,
        lblZhengZhi: cc.Label,
        unMarryList: i,
        sonImg: s,
        lblQinJia: cc.Label,
        lblJiaCheng: cc.Label,
        lblTime: cc.Label,
        roleMan: s,
        roleWoman: s,
        marryedList: i,
        txt_info: cc.Node,
        txt_info2: cc.Node,
        btnLianYin: cc.Node,
        btnZhongZhiLianYin: cc.Node,
        lblLianYinTime: cc.Label,
        lblTiQin: cc.Label,
        marry_name1: cc.Label,
        marry_name2: cc.Label,
        marry_shuxing1: cc.Label,
        marry_shuxing2: cc.Label,
        bgNode: cc.Node,
        iconArr: [cc.SpriteFrame],
        techangIcon: cc.Sprite,
        btns: [cc.Button],
        norColor: cc.Color,
        selColor: cc.Color,
        lblYH: cc.Label,
        lblWH: cc.Label,
        bg: cc.Sprite,
        selectImg: cc.SpriteFrame,
        yjjImg: cc.Sprite,
        wjjImg: cc.Sprite,
        btnRequest: cc.Node,
        stars_1: c,
        stars_2: c,
        stars_3: c,
    },
    ctor() {
        this.curData = null;
    },
    onLoad() {
        var t = this;
        facade.subscribe(n.sonProxy.UPDATE_SON_INFO, this.onSonInfoUpdate, this);
        facade.subscribe("MARRY_EFFECT_END", this.onMarryEffectEnd, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        a.shaderUtils.setBlur(this.bg);
        n.sonProxy.sendMeiPo();
        var e = this;
        this.unMarryList.selectHandle = function(o) {
            var i = o;
            t.curData = i;
            n.sonProxy.tiQinObj.mySid = i.id;
            e.showUnMarryNode(i);
        };
        this.marryedList.selectHandle = function(t) {
            var o = t;
            e.showMarryedNode(o);
        };
        this.onClickTabs(null, "0");
    },
    onClickTabs(t, e) {
        for (var o = 0; o < this.btns.length; o++) this.btns[o].interactable = o != parseInt(e);
        this.lblYH.node.color = 0 == e ? this.selColor: this.norColor;
        this.lblWH.node.color = 1 == e ? this.selColor: this.norColor;
        "0" == e ? this.onClickUnMarry() : "1" == e && this.onClickMarryed();
        this.wjjImg.spriteFrame = "1" == e ? this.selectImg: null;
        this.yjjImg.spriteFrame = "0" == e ? this.selectImg: null;
        this.btnRequest.active = "0" == e;
    },
    showUnMarryNode(t) {
        var e = n.wifeProxy.getWifeData(t.mom),
        o = localcache.getItem(localdb.table_wife, t.mom);
        this.lblMother.string = o.wname2;
        this.lblQinMi.string = "" + e.love.toString();
        var i = localcache.getItem(localdb.table_adult, t.honor);
        this.lblSonName.string = t.name + "(" + i.name + ")";
        var r = t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4;
        this.lblShuXing.string = r + "";
        this.lblWuLi.string = "" + t.ep.e1;
        this.lblZhiLi.string = "" + t.ep.e2;
        this.lblZhengZhi.string = "" + t.ep.e3;
        this.lblMeiLi.string = "" + t.ep.e4;
        this.sonImg.setKid(t.id, t.sex);
        this.btnLianYin.active = t.state != proto_sc.SomState.request && t.state != proto_sc.SomState.pass && t.state != proto_sc.SomState.timeout && 10 != t.state;
        this.btnZhongZhiLianYin.active = t.state == proto_sc.SomState.request || t.state == proto_sc.SomState.pass || t.state == proto_sc.SomState.timeout || t.state == proto_sc.SomState.requestAll;
        this.lblLianYinTime.node.active = t.state == proto_sc.SomState.request || t.state == proto_sc.SomState.pass || t.state == proto_sc.SomState.requestAll;
        if (t.state == proto_sc.SomState.request || t.state == proto_sc.SomState.requestAll) 0 == t.tqcd.next || (t.state != proto_sc.SomState.request && t.state != proto_sc.SomState.requestAll) ? this.lblLianYinTime.unscheduleAllCallbacks() : l.uiUtils.countDown(t.tqcd.next, this.lblLianYinTime,
        function() {
            n.playerProxy.sendAdok(t.tqcd.label);
        },
        !0, null, null, "HH:mm:ss");
        else if (t.state == proto_sc.SomState.pass) {
            this.lblLianYinTime.unscheduleAllCallbacks();
            this.lblLianYinTime.string = i18n.t("MARRY_REQUEST_PASS");
        }
        this.techangIcon.spriteFrame = this.iconArr[o.type - 1];
        this.stars_1.setValue(t.talent);
    },
    showMarryedNode(t) {
        this.lblQinJia.string = i18n.t("SON_QIN_JIA", {
            name: t.spouse.fname
        });
        this.lblTime.string = r.timeUtil.format(t.sptime, "yyyy-MM-dd");
        this.roleMan.setKid(t.id, t.sex);
        this.roleWoman.setKid(t.spouse.sonuid, t.spouse.sex);
        this.marry_name1.string = t.name;
        this.marry_name2.string = t.spouse.sname;
        this.marry_shuxing1.string = t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4 + "";
        var e = t.spouse.ep.e1 + t.spouse.ep.e2 + t.spouse.ep.e3 + t.spouse.ep.e4;
        this.lblJiaCheng.string = i18n.t("SON_LIAN_YIN_JIA_CHENG", {
            value: e
        });
        this.marry_shuxing2.string = e + "";
        this.stars_2.setValue(t.talent);
        this.stars_3.setValue(t.spouse.talent);
    },
    onClickUnMarry() {
        this.isLookMarry = !1;
        this.unMarryList.data = n.sonProxy.unMarryList;
        this.unMarryNode.active = n.sonProxy.unMarryList.length > 0;
        this.marryedNode.active = !1;
        n.sonProxy.unMarryList.length > 0 && (this.unMarryList.selectIndex = 0);
        this.txt_info.active = 0 == n.sonProxy.unMarryList.length;
        this.txt_info2.active = !1;
        this.bgNode.active = n.sonProxy.unMarryList.length > 0;
    },
    onClickMarryed() {
        this.isLookMarry = !0;
        this.marryedList.data = n.sonProxy.sonMarryList;
        this.marryedList.node.active = n.sonProxy.sonMarryList.length > 1;
        this.unMarryNode.active = !1;
        this.marryedNode.active = n.sonProxy.sonMarryList.length > 0;
        n.sonProxy.sonMarryList.length > 0 && (this.marryedList.selectIndex = 0);
        this.txt_info2.active = 0 == n.sonProxy.sonMarryList.length;
        this.txt_info.active = !1;
        this.bgNode.active = n.sonProxy.sonMarryList.length > 0;
    },
    onClickLianYin() {
        r.utils.openPrefabView("marry/SelectView", null, this.curData);
    },
    onClickZhongZhiLianYin() {
        var t = this;
        r.utils.showConfirm(i18n.t("SON_ZHONG_ZHI_LIAN_YIN_2"),
        function() {
            n.sonProxy.sendCancel(t.curData.id);
        });
    },
    onClickQingQiu() {
        n.sonProxy.sendRefreshTiQin();
        r.utils.openPrefabView("marry/BringUpRequestView", null, this.curData);
    },
    onClickClose() {
        r.utils.closeView(this, !0);
    },
    onSonInfoUpdate(t) {
        this.curData = n.sonProxy.getSon(this.curData.id);
        if (this.isLookMarry) {
            this.marryedList.data = n.sonProxy.sonMarryList;
            this.showMarryedNode(this.curData);
        } else {
            this.unMarryList.data = n.sonProxy.unMarryList;
            this.showUnMarryNode(this.curData);
        }
    },
    onClickOpenChild() {
        r.utils.closeView(this);
        r.utils.openPrefabView("child/ChildView");
    },
    onMarryEffectEnd() {
        this.onClickUnMarry();
    },
});
