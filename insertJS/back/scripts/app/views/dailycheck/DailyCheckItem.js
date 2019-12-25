var i = require("../../component/RenderListItem");
var n = require("../item/ItemSlotUI");
var l = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        day: cc.Label,
        item: n,
        yiqiandao: cc.Sprite,
        weiqiandao: cc.Sprite,
        eff: sp.Skeleton,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.day.string = i18n.t("THIRTY_DAY_NUM_DAY", {
                num: t.id
            });
            this.item.data = t.items[0];
            var e = l.thirtyDaysProxy.data.rwd[t.id - 1];
            this.weiqiandao.node.active = !(this.yiqiandao.node.active = 1 == e.get);
            this.eff.node.active = 0 == t.get && t.id == l.thirtyDaysProxy.data.days;
        }
    },
});
