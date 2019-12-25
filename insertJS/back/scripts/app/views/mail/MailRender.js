var i = require("../../component/RenderListItem");
var n = require("../../utils/Utils");
var l = require("../../utils/ShaderUtils");
cc.Class({
    extends: i,
    properties: {
        lblTitle: cc.Label,
        lblTime: cc.Label,
        yidu: cc.Node,
        weidu: cc.Node,
        imgArr: [cc.Sprite],
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblTime.string = n.timeUtil.format(t.fts, "yyyy-MM-dd");
            this.lblTitle.string = i18n.has(t.mtitle) ? i18n.t(t.mtitle) : t.mtitle;
            this.weidu.active = null == t.rts || t.rts <= 0;
            this.yidu.active = t.rts > 0;
            for (var e = 0; e < this.imgArr.length; e++) l.shaderUtils.setImageGray(this.imgArr[e], t.rts > 0);
        }
    },
});
