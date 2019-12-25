var i = require("../../utils/Utils");
var n = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        lblCount: cc.Label,
        lblExp: cc.Label,
        lblNum: cc.Label,
        lblWinCount: cc.Label,
        lblRemainCount: cc.Label,
    },
    ctor() {
        this.flag = !0;
    },
    onLoad() {
        var t = n.dalishiProxy.win.fight;
        if (t) {
            this.lblNum.string = i18n.t("DALISI_SCORE_ADD", {
                d: t.items[0].count
            });
            this.lblExp.string = i18n.t("DALISI_SKILL_ADD_RWD", {
                d: t.items[1].count
            });
            this.lblCount.string = t.items[2].count + "";
            this.lblWinCount.string = i18n.t("DALISI_LIAN_WIN", {
                d: t.winnum
            });
            this.lblRemainCount.string = i18n.t("DALISI_WIN_RWD", {
                d: t.nrwd
            });
        }
        this.scheduleOnce(this.onTimer, 0.5);
    },
    onClost() {
        if (!this.flag) {
            2 == n.dalishiProxy.fight.fstate ? i.utils.openPrefabView("dalishi/AwardDView") : n.dalishiProxy.openShop();
            i.utils.closeView(this);
        }
    },
    onTimer() {
        this.flag = !1;
    },
});
