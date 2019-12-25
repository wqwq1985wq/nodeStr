var i = require("../../Initializer");
var n = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        nodeScroll: cc.Node,
        lblName: cc.Label,
        lblLead: cc.Label,
        lblLv: cc.Label,
        lblRich: cc.Label,
        lblShili: cc.Label,
        lblCount: cc.Label,
        lblDes: cc.Label,
        editorCid: cc.EditBox,
    },
    ctor() {},
    onLoad() {
        this.editorCid.placeholder = i18n.t("COMMON_INPUT_TXT");
        facade.subscribe("UPDATE_SEARCH_INFO", this.UPDATE_SEARCH_INFO, this);
        this.nodeScroll.active = !1;
    },
    eventClose() {
        n.utils.closeView(this);
    },
    eventLookUp() {
        i.unionProxy.sendSearchUnion(parseInt(this.editorCid.string));
    },
    eventApply() {
        i.unionProxy.sendApplyUnion(parseInt(this.editorCid.string));
    },
    UPDATE_SEARCH_INFO() {
        this.nodeScroll.active = null != i.unionProxy.clubInfo;
        var t = i.unionProxy.clubInfo;
        if (t) {
            var e = i.unionProxy.getMengzhu(t.members);
            this.lblCount.string = i18n.t("UNION_MENBER_COUNT") + i18n.t("COMMON_NUM", {
                f: t.members.length,
                s: i.unionProxy.getUnionLvMaxCount(t.level)
            });
            this.lblName.string = i18n.t("UINON_NAME_TXT") + t.name;
            this.lblLead.string = i18n.t("UNION_MASTER_TXT") + (e ? e.name: "");
            this.lblLv.string = i18n.t("UNION_EXP_TXT") + t.exp;
            this.lblRich.string = i18n.t("UNION_MONEY_TXT") + t.fund;
            this.lblShili.string = i18n.t("UNION_TOTAL_POWER") + "：" + i.unionProxy.getAllShili(t.members);
            this.lblDes.string = i18n.t("UNION_GONG_GAO_2") + (i18n.has(t.outmsg) ? i18n.t(t.outmsg) : t.outmsg);
        }
    },
});
