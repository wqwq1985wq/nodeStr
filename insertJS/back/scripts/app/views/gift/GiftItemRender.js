var i = require("../../component/RenderListItem");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../item/ItemSlotUI");
var a = require("../../utils/UIUtils");
var s = require("../../component/SelectMax");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblCount: cc.Label,
        lblInfo: cc.Label,
        icon: cc.Sprite,
        silderCount: s,
        itemSlot: r,
    },
    ctor() {},
    showData() {
        var t = localcache.getItem(localdb.table_item, this._data.id);
        if (t) {
            this.itemId = parseInt(this._data.id);
            this.lblInfo.string = t.explain;
            this.lblName.string = t.name;
            this.lblCount.string = i18n.t("COMMON_COUNT", {
                c: l.bagProxy.getItemCount(t.id)
            });
            var e = l.bagProxy.getItemCount(this._data.id),
            o = n.utils.getParamInt("show_slider_count");
            this.silderCount.max = e;
            this.silderCount.node.active = e >= o;
            this.silderCount.curValue = 1;
            var i = new a.ItemSlotData();
            i.id = this.itemId;
            this.itemSlot.data = i;
        }
    },
    onClickUse(t, e) {
        if (l.bagProxy.getItemCount(this._data.id) <= 0) n.alertUtil.alertItemLimit(this._data.id);
        else if ("1" == e) {
            var o = localcache.getItem(localdb.table_item, this.itemId);
            3 == o.type.length ? l.wifeProxy.sendReward(l.wifeProxy.wifeGiftId, this.itemId, this.silderCount.curValue ? this.silderCount.curValue: 1) : 4 == o.type.length && l.wifeProxy.sendJbGift(l.wifeProxy.wifeGiftId, this.itemId, this.silderCount.curValue ? this.silderCount.curValue: 1);
        } else "2" == e && l.servantProxy.sendHeroGift(l.servantProxy.curSelectId, this._data.id, this.silderCount.curValue ? this.silderCount.curValue: 1);
    },
});
