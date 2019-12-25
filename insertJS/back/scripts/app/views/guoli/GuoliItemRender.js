var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../component/UrlLoad");
var r = require("../../utils/UIUtils");
var a = require("../../utils/Utils");
cc.Class({
    extends: i,

    properties: {
        lblTitle:cc.Label,
        lblCost:cc.Label,
        lblScore:cc.Label,
        iconUrl:l,
        lblTodayRank: cc.Label,
    },
    showData() {
        var t = this._data;
        if (t) {
            this.lblTitle.string = i18n.t("GUO_LI_TITLE_" + t.id);
            this.lblCost.string = i18n.t("GUO_LI_COST_" + t.id, {
                num: t.cons
            });
            this.lblScore.string = i18n.t("GUO_LI_TEXT_" + t.id) + "+" + t.add + i18n.t("GUO_LI_ADD_SCORE", {
                num: t.add
            });
            this.lblCost.node.color = this.lblScore.node.color = this.lblTodayRank.node.color = n.guoliPorxy.getFontColor(t.id);
            this.iconUrl.url = r.uiHelps.getGuoliIcon(t.id);
            this.lblTodayRank.string = i18n.t("GUO_LI_JIN_RI") + (0 == n.guoliPorxy.getTodayRank(t.id) ? i18n.t("RAKN_UNRANK") : n.guoliPorxy.getTodayRank(t.id));
        }
    },
    onClickItem() {
        a.utils.openPrefabView("guoli/GuoliTodayRankRwd", null, {
            id: this._data.id
        });
    },
});
