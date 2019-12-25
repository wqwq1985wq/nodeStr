var i = require("../../component/RenderListItem");
var n = require("../item/ItemSlotUI");
var l = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        slot: n,
        imgMask: cc.Node,
        btn: cc.Button,
        eff: cc.Node,
    },
    ctor() {
        this._isShow = !1;
    },
    onLoad() {
        this.addBtnEvent(this.btn);
    },
    showData() {
        var t = this._data;
        if (t && null != t.id) {
            this.slot.data = t;
            if (!this._isShow) {
                this._isShow = !0;
                l.utils.showNodeEffect(this.eff, 0);
            }
        }
    },
});
