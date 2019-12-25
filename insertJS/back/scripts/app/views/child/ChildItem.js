var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/Utils");
var r = require("../../Initializer");
var a = require("../../component/ChildSpine");
cc.Class({
    extends: i,
    properties: {
        select:{
            set: function(t) {
                this.nodeSelect.active = t;
            },
            visible:false,
        },
        lblLv:cc.Label,
        nodeLock:cc.Node,
        head:n,
        nodeSelect:cc.Node,
        nodeLv:cc.Node,
        nodeFree:cc.Node,
        childSpine:a,        
    },
    showData() {
        var t = this._data;
        if (t && null != t.sex) {
            var e = localcache.getItem(localdb.table_minor, t.talent);
            this.lblLv.string = i18n.t("SON_LEVEL", {
                l: t.level,
                m: e.level_max
            });
            this.nodeLock.active = !1;
            this.nodeLv.active = !0;
            this.childSpine.setKid(t.id, t.sex, !1);
            this.childSpine.node.active = !0;
        } else {
            this.nodeLv.active = !1;
            this.nodeLock.active = t.isLock;
            this.nodeFree.active = null == t.isLock;
            this.childSpine.clearKid();
            this.childSpine.node.active = !1;
        }
    },
    onClickLock() {
        var t = localcache.getItem(localdb.table_seat, r.sonProxy.base.seat + 1);
        t && l.utils.showConfirmItem(i18n.t("SON_LOCK_SEAT", {
            value: t.cash,
            index: t.seat
        }), 1, r.playerProxy.userData.cash,
        function() {
            r.playerProxy.userData.cash < t.cash ? l.alertUtil.alertItemLimit(1) : r.sonProxy.sendBuySeat();
        },
        "SON_LOCK_SEAT");
    },
});
