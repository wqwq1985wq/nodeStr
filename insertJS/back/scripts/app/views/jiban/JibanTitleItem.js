var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        titleUrl: n,
        wordUrl: n,
        lblNum: cc.Label,
    },
    ctor() {},
    showData() {
        var t = this._data,
        e = t.star;
        this.titleUrl.url = l.uiHelps.getJbTitle(e);
        this.wordUrl.url = l.uiHelps.getJbTitleWord(e);
        this.lblNum.string = t.num + "";
    },
});
