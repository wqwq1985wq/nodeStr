var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        heroHead: n,
        selectImg: cc.Node,
        selectImg_1: cc.Node,
        selectImg_2: cc.Node,
        select:{
            set: function(t) {
                this.selectImg.active = t;
                this.selectImg_1.active = t;
                this.selectImg_2.active = t;
            },
            enumerable: !0,
            configurable: !0
        },
    },
    ctor() {},
    showData() {
        var t = this._data;
        null != t && (this.heroHead.url = l.uiHelps.getServantHead(t.hid));
    },
});
