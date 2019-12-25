var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        lbl: cc.Label,
        bg: cc.Button,
        bg1: cc.Button,
        effect: cc.Node,
        anima: cc.Animation,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            var e = n.achievementProxy.getDailyRwd(t.id);
            this.lbl.string = null == e || 0 == e.rwd ? t.need + "": i18n.t("ACHIEVE_GETED");
            this.bg.interactable = this.bg1.interactable = null != e && 1 != e.rwd;
            this.effect.active = n.achievementProxy.score >= t.need && this.bg.interactable;
            this.anima.play(this.effect.active ? "shake": "");
        }
    },
    onClickShow() {
        var t = this._data;
        if (t) {
            var e = n.achievementProxy.getDailyRwd(t.id);
            n.achievementProxy.score >= t.need && (null == e || 1 != e.rwd) ? n.achievementProxy.sendGetDalyRwd(t.id) : l.utils.openPrefabView("achieve/TaskDayRwdView", !1, this.data);
        }
    },
});
