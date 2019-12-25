var i = require("../../component/RenderListItem");
cc.Class({
    extends: i,
    properties: {
        lblName1: cc.Label,
        lblShengFen1: cc.Label,
        lblShuXing1: cc.Label,
        lblTime: cc.Label,
        lblName2: cc.Label,
        lblShengFen2: cc.Label,
        lblShuXing2: cc.Label,
        lblQinjia: cc.Label,
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
            this.lblName1.string = t.name;
            this.lblName2.string = t.spouse.sname;
        }
    },
});
