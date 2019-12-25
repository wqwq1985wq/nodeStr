var i = require("../../component/RenderListItem");
cc.Class({
    extends: i,
    properties: {
        lblRank: cc.Label,
        lblName: cc.Label,
        lblHurt: cc.Label,
        lblGx: cc.Label,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblRank.string = t.rid;
            this.lblName.string = t.name;
            this.lblHurt.string = t.hit + "";
            this.lblGx.string = t.gx + "";
        }
    },
});
