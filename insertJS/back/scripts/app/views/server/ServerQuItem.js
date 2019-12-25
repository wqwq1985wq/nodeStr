var i = require("../../component/RenderListItem");
var n = require("../../component/LabelShadow");
var l = require("../../Config");
var r = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        lblName: n,
    },
    ctor() {},
    showData() {
        var t = this.data;
        t && (l.Config.isNewServerList && !r.stringUtil.isBlank(t.name) ? (this.lblName.string = t.name) : (this.lblName.string = i18n.t("LOGIN_SERVER_ID", {
            s: t.min,
            e: t.max
        })));
    },
});
