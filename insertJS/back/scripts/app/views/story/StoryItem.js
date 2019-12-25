var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../utils/ShaderUtils");
cc.Class({
    extends: i,
    properties: {
        lblContent: cc.Label,
        btnSelect: cc.Button,
        nodeSelected: cc.Node,
        ndoeSp: cc.Sprite,
        nodeNor: cc.Sprite,
    },
    ctor() {},
    onLoad() {
        this.addBtnEvent(this.btnSelect);
    },
    showData() {
        var t = this._data;
        if (t) {
            this.lblContent.string = n.playerProxy.getReplaceName(t.context);
            this.ndoeSp.node.active = 0 != t.tiaojian && l.stringUtil.isBlank(t.para);
            var e = n.timeProxy.isSelectedStory(t.id),
            o = localcache.getItem(localdb.table_storySelect2, t.id),
            i = o.group ? o.group.split("_") : "0";
            e = e && i.length <= 1;
            this.nodeSelected.active = e;
            r.shaderUtils.setImageGray(this.ndoeSp, e);
            r.shaderUtils.setImageGray(this.nodeNor, e);
        }
    },
});
