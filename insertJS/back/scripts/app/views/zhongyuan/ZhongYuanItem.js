var i = require("../../component/RenderListItem");
var n = require("../item/ItemSlotUI");
var l = require("../../utils/UIUtils");
var r = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        selectBg: cc.Node,
        yilinqu: cc.Node,
        itemSlot: n,
        lblCount: cc.Label,
        countNode: cc.Node,
        eff: sp.Skeleton,
        select:{
            set: function(t) {
                this.selectBg.active = t;
                if (this.eff) {
                    this.eff.node.active = t;
                    t && (this.eff.animation = "animation");
                }
            },
            enumerable: !0,
            configurable: !0
        },
    },
    ctor() {},
    onLoad() {
        facade.subscribe(r.zhongyuanProxy.ZHONGYUAN_ITEM_LINQU, this.onItemLinQu, this);
    },
    showData() {
        var t = this._data;
        if (t) {
            var e = new l.ItemSlotData();
            e.itemid = t.kind;
            e.count = t.count;
            r.zhongyuanProxy.isTrun || (this.yilinqu.active = 1 == t.get);
            this.itemSlot.data = e;
            this.lblCount && (this.lblCount.string = t.count > 1 ? t.count + "": "");
            this.countNode.active = t.count > 1;
        }
    },
    onItemLinQu() {
        var t = this._data;
        this.yilinqu.active = 1 == t.get;
    },
});
