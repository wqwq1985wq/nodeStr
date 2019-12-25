var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        lblTime: cc.Label,
        lblCur: cc.Label,
        lblTotal: cc.Label,
        list: i,
        welcome: cc.Node,
    },
    ctor() {},
    onLoad() {
        facade.subscribe(l.guoliPorxy.GUO_LI_DATA_UPDATE, this.onDataUpdate, this);
        facade.subscribe("GUO_LI_CLOSE_ALL", this.onClickClose, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        l.guoliPorxy.sendLookDayRank();
        l.guoliPorxy.sendOpenActivity();
    },
    onDataUpdate() {
        var t = this;
        r.uiUtils.countDown(l.guoliPorxy.data.info.eTime, this.lblTime,
        function() {
            n.timeUtil.second >= l.guoliPorxy.data.info.eTime && (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
        });
        this.list.data = l.guoliPorxy.rule;
        this.lblCur.string = Math.floor(l.guoliPorxy.data.allgl) + "";
        this.lblTotal.string = l.guoliPorxy.data.totalRank + "";
    },
    onClickTab(t, e) {
        "0" == e ? n.utils.openPrefabView("guoli/GuoliTotalRwd") : "1" == e ? n.utils.openPrefabView("ActivityShopView", null, l.guoliPorxy.dhShop) : "2" == e && n.utils.openPrefabView("guoli/GuoliTotalRank");
    },
    onClickClose() {
        n.utils.closeView(this);
    },
    onClickCloseWelcome() {
        this.welcome.active = !1;
    },
});
