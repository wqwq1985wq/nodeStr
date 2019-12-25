var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        wifeList: i,
        servantList: i,
        btnWife: cc.Button,
        btnHero: cc.Button,
        lblWife: cc.Label,
        lblHero: cc.Label,
        norColor: cc.Color,
        selColor: cc.Color,
        imgWife: cc.Sprite,
        imgHero: cc.Sprite,
        selectFrame: cc.SpriteFrame,
        wifeNode: cc.Node,
        servantNode: cc.Node,
        lblTxt: cc.Label,
    },
    ctor() {
        this._curSelect = 1;
        this._heroList = null;
        this._wifeList = null;
    },
    onLoad() {
        var t = this.node.openParam;
        t && t.select ? this.onTabSelect(null, t.select) : this.onTabSelect(null, 1);
        facade.subscribe(l.jibanProxy.UPDATE_JIBAN, this.updateList, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
        l.playerProxy.userData.level < 15 ? (this.lblTxt.string = i18n.t("WISHING_WEI_KAI_QI")) : (this.lblTxt.string = i18n.t("WISHING_YI_KAI_QI"));
        // r.funUtils.isOpenFun(r.funUtils.wishingTree) && facade.send("DOWNLOAD_SOUND", {
        //     type: 3,
        //     param: r.funUtils.wishingTree.id
        // });
    },
    onTabSelect(t, e) {
        var o = parseInt(e);
        this._curSelect = o;
        this.btnWife.interactable = 2 != this._curSelect;
        this.btnHero.interactable = 1 != this._curSelect;
        this.lblWife.node.color = 2 == this._curSelect ? this.selColor: this.norColor;
        this.lblHero.node.color = 1 == this._curSelect ? this.selColor: this.norColor;
        this.imgHero.spriteFrame = 1 == this._curSelect ? this.selectFrame: null;
        this.imgWife.spriteFrame = 2 == this._curSelect ? this.selectFrame: null;
        this.wifeNode.active = 2 == this._curSelect;
        this.servantNode.active = 1 == this._curSelect;
        this.lblTxt.node.active = 1 == this._curSelect;
        this.updateList();
    },
    updateList() {
        if (1 == this._curSelect) {
            null == this._heroList && (this._heroList = l.jibanProxy.getJibanFirst(this._curSelect));
            this.servantList.data = this._heroList;
        } else if (2 == this._curSelect) {
            null == this._wifeList && (this._wifeList = l.jibanProxy.getJibanFirst(this._curSelect));
            this.wifeList.data = this._wifeList;
        }
    },
    onClickClost() {
        let max = l.taskProxy.mainTask.max;
        let num = l.taskProxy.mainTask.num;
        if(max == num)
        {
            facade.send(l.guideProxy.UPDATE_TRIGGER_GUIDE, {
                type: 4,
                value: l.taskProxy.mainTask.id
            });
        }
        n.utils.closeView(this, !0);
    },
    onClickOpen(t, e) {
        if (e && e.data) {
            var o = e.data;
            if (o) {
                var i = {};
                if (2 == o.type) {
                    i.wifeid = o.roleid;
                    n.utils.openPrefabView("jiban/JibanView", !1, i);
                } else if (1 == o.type) {
                    i.heroid = o.roleid;
                    n.utils.openPrefabView("jiban/JibanDetailView", !1, i);
                }
            }
        }
    },
    onClickTxt() {
        if (l.playerProxy.userData.level >= 15) {
            n.utils.closeView(this, !0);
            r.funUtils.openView(r.funUtils.wishingTree.id);
        }
    },
});
