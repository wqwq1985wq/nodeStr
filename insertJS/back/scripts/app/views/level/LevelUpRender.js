var i = require("../../component/RenderListItem");
var n = require("../../models/TimeProxy");
var l = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        lblTitle: cc.Label,
        lblDes: cc.Label,
    },
    ctor() {},
    showData() {
        var t = this.data;
        if (t) {
            this.lblTitle.string = t.title;
            this.lblDes.string = t.text;
        }
    },
    onClickGo() {
        var t = this.data;
        if (t) {
            n.funUtils.openView(t.iconopenid);
            l.utils.closeNameView("stronger/LevelUpView");
        }
    },
});
