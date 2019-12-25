var i = require("../../utils/Utils");
var n = require("../../Initializer");
var l = require("../../component/SelectMax");
var r = require("./BagHeItem");
cc.Class({
    extends: cc.Component,
    properties: {
        item: r,
        silder: l,
    },
    ctor() {
        this._data = null;
    },
    onClickHeCheng() {
        if (this._data) {
            this.item.onClickHeCheng();
            this.onClickClost();
        }
    },
    onClickClost() {
        i.utils.closeView(this);
    },
    onClickOther(t) {
        this._data = t;
        this.updateShow();
    },
    updateShow() {
        var t = this._data;
        if (t) {
            this.item.data = t;
            var e = t.need[0],
            o = n.bagProxy.getItemCount(e.id),
            i = 99;
            i = Math.floor(o / e.count) < i ? Math.floor(o / e.count) : i;
            0 != t.totonum && (i = t.times < i ? t.times: i);
            this.silder.max = i <= 0 ? 1 : i;
            this.item.nodeGold.active && (this.item.lblGold.string = this._data.need[1].count * this.silder.curValue + "");
        }
    },
    onLoad() {
        var t = this;
        this._data = this.node.openParam;
        this.updateShow();
        var e = this;
        this.silder.changeHandler = function() {
            e.item.nodeGold.active && (e.item.lblGold.string = e._data.need[1].count * t.silder.curValue + "");
        };
        facade.subscribe("BAG_CLICK_BLANK", this.onClickClost, this);
        facade.subscribe("BAG_CLICK_HECHENG", this.onClickOther, this);
        facade.subscribe("BAG_CLICK_USE", this.onClickClost, this);
    },
});
