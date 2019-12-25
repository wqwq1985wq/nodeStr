var i = require("../../component/RenderListItem");
var n = require("../../utils/ShaderUtils");
var l = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        bgs: [cc.Sprite],
        btn: cc.Button,
    },
    ctor() {},
    onLoad() {
        this.addBtnEvent(this.btn);
    },
    showData() {
        var t = this._data;
        if (t) {
            var e = null == t.mname;
            this.lblName.string = e ? t.name: t.mname;
            var o = e ? l.playerProxy.userData.bmap > t.id: l.playerProxy.userData.mmap > t.id;
            this.btn.interactable = o;
            for (var i = 0; i < this.bgs.length; i++) n.shaderUtils.setImageGray(this.bgs[i], !o);
        }
    },
});
