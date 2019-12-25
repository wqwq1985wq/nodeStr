var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/Utils");
var r = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        boss: n,
        lblWuli: cc.Label,
        btn: cc.Button,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.boss.url = r.uiHelps.getServantSmallSpine(t.id);
            this.lblWuli && (this.lblWuli.string = l.utils.formatMoney(t.aep.e1));
        }
    },
    onLoad() {
        this.addBtnEvent(this.btn);
    },
});
