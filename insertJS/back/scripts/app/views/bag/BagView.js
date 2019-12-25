var i = require("../../utils/Utils");
var n = require("../../component/List");
var l = require("../../Initializer");
var r = require("../../component/RedDot");
cc.Class({
    extends: cc.Component,
    properties: {
        btns: [cc.Button],
        nodes: [cc.Node],
        lists: [n],
        nodeEmpty: cc.Node,
        lblItem: cc.Label,
        lblMix: cc.Label,
        seColor: cc.Color,
        norColor: cc.Color,
        selectImg: cc.SpriteFrame,
        itemImg: cc.Sprite,
        mixImg: cc.Sprite,
        box1Widget: cc.Widget,
    },
    ctor() {},
    onLoad() {
        facade.subscribe(l.bagProxy.UPDATE_BAG_CHENGHAO, this.onUpdateChList, this);
        facade.subscribe(l.bagProxy.UPDATE_BAG_HECHENG, this.onUpdateHeList, this);
        facade.subscribe(l.bagProxy.UPDATE_BAG_ITEM, this.onUpdateItemList, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        this.onClickTab(null, 1);
    },
    onClickItem(t, e) {
        var o = e.data;
        if (o) {
            o.isNew = !1;
            e.showData();
            var n = l.bagProxy.getHecheng(o.id);
            null != n ? i.utils.openPrefabView("bag/BagHecheng", !1, n) : i.utils.openPrefabView("bag/BagUse", !1, o);
        }
    },
    onClickTab(t, e) {
        for (var o = parseInt(e) - 1, i = 0; i < this.btns.length; i++) {
            this.btns[i].interactable = i != o;
            this.nodes[i].active = i == o;
        }
        this.lblItem.node.color = "1" == e ? this.seColor: this.norColor;
        this.lblMix.node.color = "2" == e ? this.seColor: this.norColor;
        this.itemImg.spriteFrame = "1" == e ? this.selectImg: null;
        this.mixImg.spriteFrame = "2" == e ? this.selectImg: null;
        switch (o) {
        case 0:
            this.onUpdateItemList();
            break;
        case 1:
            this.onUpdateHeList();
            break;
        case 2:
            this.lists[2].data = l.bagProxy.chInfo.list;
        }
    },
    onUpdateItemList() {
        var t = l.bagProxy.getItemList();
        this.lists[0].data = t;
        this.nodeEmpty.active = 0 == l.bagProxy.itemList.length;
        this.onUpdateHeList();
    },
    onUpdateHeList() {
        null == l.bagProxy.heChengList && l.bagProxy.initHeChengList();
        this.lists[1].data = l.bagProxy.heChengList;
    },
    onUpdateChList() {},
    onClickBlack() {
        facade.send("BAG_CLICK_BLANK");
    },
    onClickClose() {
        r.change("bagview", !1);
        i.utils.closeView(this, !0);
    },
});
