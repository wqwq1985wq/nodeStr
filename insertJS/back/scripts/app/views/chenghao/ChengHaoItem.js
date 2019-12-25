var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        chengHaoUrl: n,
        lblChengHao: cc.Label,
        urlNode: cc.Node,
        txtNode: cc.Node,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblChengHao.string = t.name;
            this.chengHaoUrl.url = l.uiHelps.getChengHaoUrl(t.img);
        }
    },
});
