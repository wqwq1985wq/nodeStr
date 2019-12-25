var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
        lblRank: cc.Label,
        lblGuoli: cc.Label,
    },
    ctor() {},
    onLoad() {
        facade.subscribe(l.guoliPorxy.GUO_LI_TODAY_RANKS, this.onTodayRanks, this);
        facade.subscribe("GUO_LI_CLOSE_ALL", this.onClickClose, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        l.guoliPorxy.sendLookDayRank();
        this.lblGuoli.string = i18n.t("GUO_LI_JIN_RI_GUO_LI") + l.guoliPorxy.data.daygl;
        this.lblRank.string = i18n.t("GUO_LI_JIN_RI") + l.guoliPorxy.data.dayRank;
    },
    onTodayRanks() {
        this.list.data = l.guoliPorxy.todayRanks;
    },
    onClickRank() {
        n.utils.openPrefabView("guoli/GuoliTodayRankRwd", null, {
            id: 0
        });
    },
    onClickClose() {
        n.utils.closeView(this);
    },
    onClickClost() {
        n.utils.closeView(this);
        facade.send("GUO_LI_CLOSE_ALL");
    },
});
