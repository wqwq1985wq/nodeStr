var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../utils/UIUtils");
var a = require("../../component/UrlLoad");
cc.Class({
    extends: i,
    properties: {
        lblTitle:cc.Label,
        lblRank:cc.Label,
        lblDes:cc.Label,
        iconUrl:a,
    },
    showData() {
        var t = this._data;
        if (t) {
            var e = "GUO_LI_TITLE_" + t.id;
            this.lblTitle.string = i18n.t(e);
            this.lblRank.string = i18n.t("GUO_LI_JIN_RI") + (0 == t.rid ? i18n.t("RAKN_UNRANK") : t.rid);
            this.lblDes.node.color = this.lblRank.node.color = n.guoliPorxy.getFontColor(t.id);
            this.iconUrl.url = r.uiHelps.getGuoliIcon(t.id);
        }
    },
    onClickItem() {
        l.utils.openPrefabView("guoli/GuoliTodayRankRwd", null, {
            id: this._data.id
        });
    },
});
