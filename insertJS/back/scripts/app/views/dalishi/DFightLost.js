var i = require("../../utils/Utils");
var n = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        lblCount: cc.Label,
    },
    ctor() {},
    onLoad() {
        var t = n.dalishiProxy.win.fight;
        t && (this.lblCount.string = i18n.t("DALISI_SCORE_MUL", {
            d: t.items[0].count
        }));
    },
    onClickClost() {
        i.utils.closeView(this); (null != n.dalishiProxy.fight && 0 != n.dalishiProxy.fight.hid) || i.utils.closeNameView("dalishi/DalishiServant");
    },
});
