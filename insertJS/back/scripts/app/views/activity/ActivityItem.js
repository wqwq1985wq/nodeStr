var i = require("../../component/RenderListItem");
var n = require("../../component/RedDot");
var l = require("../../component/UrlLoad");
var r = require("../../models/TimeProxy");
var a = require("../../Initializer");
var s = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        reddot: n,
        btnimg: l,
        btnEff: l,
    },
    ctor() {},
    onClickItem() {
        var t = this._data;
        if (t) {
            var e = a.limitActivityProxy.getActivityData(t.id);
            e && e.id == a.limitActivityProxy.SNOWMAN_ID && e.hdtype && 2 == e.hdtype ? r.funUtils.openView(r.funUtils.spring.id) : e && e.id == a.limitActivityProxy.GAO_DIAN_ID ? r.funUtils.openView(r.funUtils.gaodian.id) : r.funUtils.openView(t.funitem.id);
        }
    },
    updateShow() {
        var t = this._data;
        t && (this.node.active = a.limitActivityProxy.isHaveTypeActive(t.id) && r.funUtils.isOpenFun(t.funitem));
    },
    showData() {
        var t = this._data;
        if (t) {
            this.reddot.addBinding(t.binding);
            this.updateShow();
            var e = a.limitActivityProxy.getActivityData(t.id);
            var o = e && e.id == a.limitActivityProxy.SNOWMAN_ID && e.hdtype && 2 == e.hdtype;
            var i = t.url.split("|");
            2 == t.isEff ? o ? (this.btnimg.url = s.uiHelps.getActivityBtn(i[1])) : (this.btnEff.url = s.uiHelps.getActivityUrl(i[0])) : (this.btnimg.url = s.uiHelps.getActivityBtn(i[0]));
            this.btnimg.node.active = 2 != t.isEff || o;
            this.btnEff.node.active = 2 == t.isEff;
        }
    },
});
