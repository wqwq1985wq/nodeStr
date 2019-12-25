var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../utils/Utils");
var a = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        lblTime:cc.Label,
        nodeTip:cc.Node,
        urlLoad:n,
    },

    onClickSelect() {
        var t = this._data;
        t && (0 == t.hid || null == t.hid ? r.utils.openPrefabView("book/BookSelectView", !1, t) : t.cd && t.cd.next <= r.timeUtil.second ? a.bookProxy.sendOver(t.id) : r.alertUtil.alert18n("BOOK_TIME_LIMIT"));
    },
    showData() {
        var t = this._data;
        if (t) {
            this.nodeTip.active = 0 == t.hid || null == t.hid;
            this.urlLoad.node.active = this.lblTime.node.active = !this.nodeTip.active;
            this.lblTime.node.active && 0 != t.cd.next && t.cd.next > r.timeUtil.second ? l.uiUtils.countDown(t.cd.next, this.lblTime,
            function() {
                facade.send(a.bookProxy.UPDATE_BOOK_LIST);
            },
            !0) : this.lblTime.unscheduleAllCallbacks();
            t.cd.next <= r.timeUtil.second && (this.lblTime.string = i18n.t("ACHIEVE_OVER"));
            this.urlLoad.url = 0 != t.hid ? l.uiHelps.getServantSmallSpine(t.hid) : "";
        }
    },
});
