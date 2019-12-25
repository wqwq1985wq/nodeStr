var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../Initializer");
var a = require("../../component/LabelShadow");
cc.Class({
    extends: i,
    properties: {
        lblLock:cc.Label,
        lblInfo:cc.Label,
        icon:n,
        lockNode:cc.Node,
        lblName:a,
    },
    showData() {
        var t = this._data;
        if (t) {
            this.lockNode.active = !r.lookProxy.isLock(t);
            this.lblLock.node.active = !r.lookProxy.isLock(t);
            this.lblInfo.string = t.text;
            this.lblName.string = t.name;
            this.icon.url = t.pic > 100 && t.pic < 200 ? l.uiHelps.getXunfangIcon(t.pic) : l.uiHelps.getServantHead(t.pic);
            var e = "";
            if (0 == t.unlock) return;
            if (1 == t.unlock) {
                e = localcache.getItem(localdb.table_lookBuild, t.uk_para).name;
            } else if (2 == t.unlock) {
                e = localcache.getItem(localdb.table_mainTask, t.uk_para).name;
            } else if (3 == t.unlock) {
                e = localcache.getItem(localdb.table_bigPve, t.uk_para).name;
            } else 4 == t.unlock && (e = t.uk_para + "");
            this.lblLock.string = i18n.t("LOOK_LOCK_TEXT_" + t.unlock, {
                name: e
            });
        }
    },
});
