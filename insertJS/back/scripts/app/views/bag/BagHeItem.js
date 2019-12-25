var i = require("../../component/RenderListItem");
var n = require("../item/ItemSlotUI");
var l = require("../../utils/Utils");
var r = require("../../Initializer");
var a = require("../../component/SelectMax");
cc.Class({
    extends: i,

    properties: {
        nodeLimit:cc.Node,
        itemSlot:n,
        itemCost:n,
        lblCount:cc.Label,
        lblTime:cc.Label,
        lblNum:cc.Label,
        nodeGold:cc.Node,
        lblGold:cc.Label,
        nodeHC:cc.Node,
        selectMax:a,
    },

    ctor() {
        this.nodeLimit = null;
        this.itemSlot = null;
        this.itemCost = null;
        this.lblCount = null;
        this.lblTime = null;
        this.lblNum = null;
        this.nodeGold = null;
        this.lblGold = null;
        this.nodeHC = null;
        this.selectMax = null;
    },
    onClickHeCheng() {
        var t = this._data,
        e = this.selectMax && this.selectMax.node.active ? this.selectMax.curValue: 1;
        if (t) {
            if (0 != t.totonum && t.times < e) {
                l.alertUtil.alert(i18n.t("BAG_COMPOSE_COUNT_LIMIT"));
                return;
            }
            for (var o = 0; o < t.need.length; o++) {
                var i = t.need[o];
                if (r.bagProxy.getItemCount(i.id) < i.count * e) {
                    l.alertUtil.alertItemLimit(i.id);
                    return;
                }
            }
            r.bagProxy.sendCompose(t.itemid, e);
        }
    },
    showData() {
        var t = this._data;
        if (t) {
            this.itemSlot.data = {
                id: t.itemid
            };
            this.nodeLimit.active = 0 != t.outtime;
            this.lblTime.string = l.timeUtil.getDateDiff(t.outtime);
            this.lblCount.string = 0 != t.totonum ? i18n.t("BAG_REMAIN_COUNT", {
                c: t.times,
                t: t.totonum
            }) : "";
            this.itemCost.data = t.need[0];
            var e = t.need[0],
            o = r.bagProxy.getItemCount(e.id),
            i = 99;
            i = Math.floor(o / e.count) < i ? Math.floor(o / e.count) : i;
            this.lblNum.string = i18n.t("COMMON_NUM", {
                f: o,
                s: e.count
            });
            this.nodeHC.active = 1 == t.need.length;
            this.nodeGold.active = t.need.length > 1;
            this.nodeGold.active && (this.lblGold.string = t.need[1].count + "");
            0 != t.totonum && (i = t.times < i ? t.times: i);
        }
    },
});
