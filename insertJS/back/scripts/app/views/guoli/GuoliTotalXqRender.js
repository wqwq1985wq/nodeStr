var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        lblTitle: cc.Label,
        lblToday: cc.Label,
        lblTotal: cc.Label,
        iconUrl: n,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblTitle.string = i18n.t("GUO_LI_TITLE_" + t.id);
            this.lblToday.string = i18n.t("GUO_LI_JIN_RI_GUO_LI") + t.day;
            this.lblTotal.string = i18n.t("GUO_LI_TOTAL_VALUE_TXT") + t.total;
            this.lblToday.node.color = this.lblTotal.node.color = r.guoliPorxy.getFontColor(t.id);
            this.iconUrl.url = l.uiHelps.getGuoliIcon(t.id);
        }
    },
});
