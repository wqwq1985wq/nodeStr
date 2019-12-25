var i = require("../../component/RenderListItem");
var n = require("../../utils/UIUtils");
var l = require("../item/ItemSlotUI");
var r = require("../../models/BagProxy");
var a = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        lblTxt:cc.Label,
        itemSlot:l,
        button:cc.Node,
    },
    showData() {
        var t = this._data;
        if (t) {
            var e = new n.ItemSlotData();
            e.id = t.heroid;
            e.kind = r.DataType.HERO;
            this.itemSlot.data = e;
            var o = a.servantProxy.getHeroData(t.heroid);
            this.lblTxt.string = null == o ? i18n.t("SERVANT_WEI_ZHAO_MU") : i18n.t("SERVANT_YI_ZHAO_MU");
            this.button.active = null != o;
        }
    },
});
