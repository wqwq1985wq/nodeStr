var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        face: n,
        nodeLock: cc.Node,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (null != t.islock) {
            this.nodeLock.active = 1 == t.islock;
            this.face.url = "";
        } else if (null != t.id) {
            this.nodeLock.active = !1;
            this.face.url = l.uiHelps.getServantHead(t.id);
        }
    },
    onClick(t, e) {
        r.utils.openPrefabView("JyWeipai", !1, {
            type: parseInt(e)
        });
    },
});
