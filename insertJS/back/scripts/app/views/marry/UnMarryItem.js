var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblShengFen: cc.Label,
        tiqiNode: cc.Node,
        selectImg: cc.Node,
        select:{
            set: function(t) {
                this.selectImg.active = t;
            },
            enumerable: !0,
            configurable: !0
        },
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblName.string = t.name;
            this.lblShengFen.string = i18n.t("SON_HONOUR_TEXT", {
                str: n.sonProxy.getHonourStr(t.honor)
            });
            this.tiqiNode && (this.tiqiNode.active = t.state == proto_sc.SomState.request || t.state == proto_sc.SomState.requestAll);
        }
    },
});
