var i = require("../../component/RenderListItem");
var n = require("../item/ItemSlotUI");
var l = require("../../utils/UIUtils");
var r = require("../../Initializer");
var a = require("../../utils/Utils");
var s = require("../../component/SelectMax");
cc.Class({
    extends: i,
    properties: {
        slot: n,
        lblName: cc.Label,
        bar: s,
    },
    ctor() {},
    showData() {
        var t = this._data,
        e = localcache.getItem(localdb.table_item, t);
        if (e) {
            var o = new l.ItemSlotData();
            o.id = e.id;
            this.slot.data = o;
            var i = r.bagProxy.getItemCount(e.id),
            n = a.utils.getParamInt("show_slider_count");
            this.bar.node.active = i >= n;
            this.bar.max = i;
            this.bar.curValue = 1;
            this.lblName.string = e.name + i18n.t("SERVANT_ITEM_HAVE", {
                value: i
            });
        }
    },
    onClickUse() {
        if (r.bagProxy.getItemCount(parseInt(this._data + "")) <= 0) a.alertUtil.alertItemLimit(this._data);
        else {
            r.bagProxy.sendUseItemHero(parseInt(this._data + ""), this.bar.curValue ? this.bar.curValue: 1, r.servantProxy.curSelectId);
            a.alertUtil.alert(i18n.t("SERVANT_TRAIN_SUCCESS"));
        }
    },
});
