var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        lblAdd: cc.Label,
        prop: n,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.prop.url = l.uiHelps.getLangSp(t.prop);
            this.lblAdd.string = "+" + t.value;
        }
    },
});
