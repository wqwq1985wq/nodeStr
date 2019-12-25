var i = require("../../component/RenderListItem");
cc.Class({
    extends: i,
    properties: {
        lblContext: cc.Label,
    },
    ctor() {},
    showData() {
        var t = this._data;
        t && (this.lblContext.string = t.context);
    },
});
