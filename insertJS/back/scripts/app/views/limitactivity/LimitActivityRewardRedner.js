var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../component/List");
cc.Class({
    extends: i,
    properties: {
        lblIndex: cc.Label,
        lblCount: cc.RichText,
        btnYLQ: cc.Node,
        btnGet: cc.Button,
        list: r,
        itemBg: cc.Node,
        bottom: cc.Node,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            var e = n.limitActivityProxy.curSelectData,
            o = e.cons >= t.need ? "LIMIT_NEED_VALUE_1": "LIMIT_NEED_VALUE_2";
            if (e.cfg.info.id == n.limitActivityProxy.LEI_TIAN_RECHARGE) {
                this.lblCount.string = i18n.t(o, {
                    name: e.cfg.info.title,
                    have: l.utils.formatMoney(e.cons),
                    need: l.utils.formatMoney(t.need)
                });
                this.lblIndex.string = i18n.t("LIMIT_LEI_TIAN_RECHARGE_TITLE", {
                    num: t.day,
                    value: t.need
                });
                this.lblCount.string = i18n.t("LIMIT_LEI_TIAN_DAY_TXT", {
                    num: t.rachargeDay ? t.rachargeDay: 0,
                    need: t.day
                });
                this.btnGet.interactable = t.id == e.rwd + 1 && t.rachargeDay >= t.day;
                this.btnGet.node.active = !(t.id <= e.rwd);
            } else {
                this.lblIndex.string = i18n.t("LIMIT_REWARD_NUMBER", {
                    value: t.id
                });
                this.lblCount.string = i18n.t(o, {
                    name: e.cfg.info.title,
                    have: l.utils.formatMoney(e.cons),
                    need: l.utils.formatMoney(t.need)
                });
                e.cfg.info.type == n.limitActivityProxy.RECHARGE_TYPE && (this.lblCount.string += i18n.t("COMMON_CASH"));
                this.btnGet.interactable = t.id == e.rwd + 1 && e.cons >= t.need;
                this.btnGet.node.active = !(t.id <= e.rwd);
            }
            this.list.data = t.items;
            this.btnYLQ.active = t.id <= e.rwd;
        }
    },
    setWidthHeigth(t, e) {
        this.node.height = e;
        this.itemBg.height = e;
        this.bottom.y = -(e - 250);
    },
    onClickGet() {
        n.limitActivityProxy.sendGetActivityReward(n.limitActivityProxy.curSelectData.cfg.info.id);
    },
});
