var i = require("./UserUpEffectItem");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../../component/RoleSpine");
cc.Class({
    extends: cc.Component,
    properties: {
        leftItem: i,
        rightItem: i,
        spine: sp.Skeleton,
        leftSpine: r,
        rightSpine: r,
        showSpine: r,
        nodeBg: cc.Node,
        nodeInfo: cc.Node,
    },
    ctor() {},
    onLoad() {
        this.nodeInfo.active = !1;
        this.onShowEffect();
    },
    onShowEffect() {
        var t = l.playerProxy.userData.level;
        this.showSpine.setRoleLevel(t - 1);
        this.scheduleOnce(this.delayShow, 0.6);
    },
    delayShow() {
        var t = l.playerProxy.userData.level;
        this.showSpine.setRoleLevel(t);
        this.scheduleOnce(this.onHideSpine, 2.4);
    },
    onHideSpine() {
        this.nodeInfo.active = !0;
    },
    onClickClost() {
        n.utils.closeView(this);
        l.timeProxy.floatReward();
        null != l.playerProxy.userClothe && 0 != l.playerProxy.userClothe.body && n.utils.showConfirm(i18n.t("USER_CHANGE_CLOTHE"),
        function() {
            var t = l.playerProxy.userClothe;
            l.playerProxy.sendCloth(0, 0, t.ear, t.background, t.effect, t.animal, !1);
        });
    },
});
