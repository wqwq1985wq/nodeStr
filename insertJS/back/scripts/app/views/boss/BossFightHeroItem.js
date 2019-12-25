var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../utils/ShaderUtils");
var a = require("../../Initializer");
var s = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        lblMeili: cc.Label,
        servantUrl: n,
        itemNode: cc.Sprite,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblMeili.string = i18n.t("WIFE_MEI_LI") + s.utils.formatMoney(t.aep.e4);
            this.servantUrl.url = l.uiHelps.getServantSmallSpine(t.id);
            r.shaderUtils.setImageGray(this.itemNode, 0 == a.bossPorxy.getServantHitCount(t.id));
        }
    },
});
