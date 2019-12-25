var i = require("../../utils/Utils");
var n = require("../../models/TimeProxy");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {

    },
    ctor() {
        
    },
    onLoad() {

    },
    onClickBtn(t, e) {
        switch (e) {
            case "0":
                if (n.funUtils.isOpenFun(n.funUtils.servantView)) {
                    var o = l.servantProxy.getQishiSys();
                    i.utils.openPrefabView("servant/ServantView", !1, {
                        hero: o,
                        tab: 4
                    });
                }
                break;

            case "1":
                n.funUtils.openView(n.funUtils.bagView.id);
                break;

            case "2":
                if (n.funUtils.isOpenFun(n.funUtils.servantView)) {
                    o = l.servantProxy.getQishiSys();
                    i.utils.openPrefabView("servant/ServantView", !1, {
                        hero: o,
                        tab: 1
                    });
                }
                break;

            case "3":
                if (n.funUtils.isOpenFun(n.funUtils.wifeView)) {
                    var r = l.wifeProxy.getQishiWife(),
                        a = l.wifeProxy.getMarryList(!1).indexOf(r);
                    i.utils.openPrefabView("wife/WifeListView", null, {
                        index: a,
                        openSkill: !0
                    });
                }
                break;

            case "4":
                n.funUtils.isOpenFun(n.funUtils.userClothe) &&
                    i.utils.openPrefabView("user/UserClothe", null, {
                        tab: 2
                    });
        }
        i.utils.closeNameView("battle/FightView");
        this.onClickClost(null, null, 1);
    },
    onClickClost(t, e, o) {
        void 0 === o && (o = 0);
        i.utils.closeView(this);
        facade.send("FIGHT_LOST_CLICK", o);
    },
    onClickDiKang() {
        this.onClickClost(null, null, 0);
    },
});

