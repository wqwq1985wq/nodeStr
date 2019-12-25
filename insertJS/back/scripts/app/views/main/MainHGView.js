var i = require("../../Initializer");
var n = require("../../component/ChildSpine");
var l = require("../../utils/Utils");
var r = require("../../models/TimeProxy");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        nodeChild:cc.Node,
        nodeWife:cc.Node,
        nodeMarry:cc.Node,
        nodeLilian:cc.Node,
        childSpine:n,
        scrollView:cc.ScrollView,
        title_Marry:cc.Node,
        title_Lilian:cc.Node,
        title_Child:cc.Node,
        title_Wife:cc.Node,
    },

    ctor(){

        this._lastX = 999;
    },
    onLoad() {
        facade.subscribe(i.sonProxy.UPDATE_SON_INFO, this.onSonUpdate, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onCheckClost, this);
        this.onSonUpdate();
        a.uiUtils.floatPos(this.title_Marry, 0, 10, 2);
        a.uiUtils.floatPos(this.title_Lilian, 0, 10, 4);
        a.uiUtils.floatPos(this.title_Child, 0, 10, 2);
        a.uiUtils.floatPos(this.title_Wife, 0, 10, 4);
    },
    onClickOpen(t, e) {
        r.funUtils.openViewUrl(e);
    },
    onCheckClost() {
        var t = Math.abs(this.scrollView.getScrollOffset().x);
        Math.abs(this.scrollView.getScrollOffset().x) < 10 && this._lastX < 10 && this.onClickClost();
        this._lastX = t;
    },
    onClickClost() {
        l.utils.closeView(this, !0);
    },
    onSonUpdate() {
        var t = i.sonProxy.childList;
        this.nodeLilian.active = t && t.length > 0;
        if (t.length > 0) {
            for (var e = t[0], o = 0; o < t.length; o++) if (i.sonProxy.isTraveling(t[o].id)) {
                e = t[o];
                break;
            }
            e.state > 3 ? this.childSpine.setKid(e.id, e.sex) : this.childSpine.setKid(e.id, e.sex, !1);
        }
    },
});
