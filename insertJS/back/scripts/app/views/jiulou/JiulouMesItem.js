var i = require("../../component/RenderListItem");
var n = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblScore: cc.Label,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblName.string = t.name;
            this.lblScore.string = "+" + n.utils.formatMoney(t.ep ? t.ep: 0);
        }
    },
});
