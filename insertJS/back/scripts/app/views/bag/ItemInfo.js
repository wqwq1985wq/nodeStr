var i = require("../../utils/Utils");
var n = require("../item/ItemSlotUI");
var l = require("../../models/BagProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        itemSlot: n,
        lblName: cc.Label,
        lblEffect: cc.Label,
        lblOut: cc.Label,
        lblCount: cc.Label,
    },
    ctor() {},
    onLoad() {
        var t = this.node.openParam;
        t ? this.showInfo(t) : this.onClickClose();
    },
    showInfo(t) {
        if (null != t) {
            this.itemSlot.data = t;
            var e = t.id ? t.id: t.itemid;
            switch (t.kind ? t.kind: 1) {
            case l.DataType.HEAD_BLANK:
                var o = localcache.getItem(localdb.table_userblank, e);
                this.lblName.string = o ? o.name: "";
                this.lblOut.string = o ? o.des: "";
                this.lblEffect.string = "";
                break;
            case l.DataType.CLOTHE:
                var n = localcache.getItem(localdb.table_userClothe, e);
                this.lblName.string = n.name;
                this.lblOut.string = n.text;
                this.lblEffect.string = n.des;
                break;
            case l.DataType.JB_ITEM:
                var r = localcache.getItem(localdb.table_heropve, e);
                this.lblName.string = r.name + i18n.t("WISHING_JB_JU_QING");
                this.lblEffect.string = r.msg;
                this.lblOut.string = 6 == r.unlocktype ? i18n.t("WISHING_GET_WAY_2") : i18n.t("WISHING_GET_WAY");
                break;
            case l.DataType.HERO_CLOTHE:
                var a = localcache.getItem(localdb.table_heroClothe, t.id);
                this.lblName.string = a.name;
                this.lblOut.string = a.way;
                this.lblEffect.string = a.txt;
                break;
            case l.DataType.CHENGHAO:
                var s = localcache.getItem(localdb.table_fashion, t.id);
                this.lblName.string = s ? s.name: "";
                this.lblOut.string = s ? s.des: "";
                this.lblEffect.string = "";
                break;
            default:
                var c = localcache.getItem(localdb.table_item, e),
                _ = c.explain.split("|");
                this.lblName.string = c.name;
                this.lblEffect.string = _.length > 1 ? _[1] : c.explain;
                this.lblOut.string = i.stringUtil.isBlank(c.source) ? i18n.t("COMMON_NULL") : c.source;
            }
            this.lblCount && (this.lblCount.string = t.count && t.count > 1 ? i18n.t("COMMON_COUNT", {
                c: t.count
            }) : "");
        }
    },
    onClickClose() {
        i.utils.closeView(this);
    },
});
