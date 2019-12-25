var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        head: n,
    },
    ctor() {},
    showData() {
        var t = this._data;
        t && (this.head.url = l.uiHelps.getServantHead(t.id));
    },
});
