var i = require("../views/item/ItemSlotUI");
var n = require("../utils/Utils");
var l = require("../models/BagProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        itemSlot: null,
        lblDes: cc.Label,
        nodeUse: cc.Node,
        nodeBg: cc.Node,
    },
    ctor() {
        this._curData = null;
    },
    onLoad() {
        facade.subscribe("CLOST_ITEM_SHOW", this.onClickClost, this);
        var t = this.node.openParam;
        if (null != t) {
            this._curData = t;
            this.itemSlot.data = t;
            var e = t.id ? t.id: t.itemid,
            o = t.kind ? t.kind: 1;
            this.nodeUse.active = !1;
            switch (o) {
            case l.DataType.HEAD_BLANK:
                var i = localcache.getItem(localdb.table_userblank, e);
                this.lblDes.string = i.des;
                break;
            case l.DataType.CLOTHE:
                var n = localcache.getItem(localdb.table_userClothe, e);
                this.lblDes.string = n.des;
                break;
            case l.DataType.JB_ITEM:
                var r = localcache.getItem(localdb.table_heropve, t.id);
                this.lblDes.string = r.msg;
                break;
            case l.DataType.CHENGHAO:
                var a = localcache.getItem(localdb.table_fashion, t.id);
                this.lblDes.string = a ? a.des: "";
                break;
            default:
                var s = localcache.getItem(localdb.table_item, e),
                c = s ? s.explain.split("|") : [];
                s.explain.split("|");
                this.lblDes.string = c.length > 1 ? c[1] : s ? s.explain: i18n.t("COMMON_NULL");
                this.nodeUse.active = s.type && "item" == s.type[0];
            }
            var _ = this.lblDes.node.getContentSize().height + 10;
            this.nodeBg && (this.nodeBg.parent.height = this.nodeBg.height = _ < 126 ? 126 : _);
        }
    },
    onClickUse() {
        n.utils.openPrefabView("bag/BagUse", !1, this._curData);
        this.onClickClost();
    },
    onClickClost() {
        n.utils.closeView(this);
        n.utils.popNext(!1);
    },
});
