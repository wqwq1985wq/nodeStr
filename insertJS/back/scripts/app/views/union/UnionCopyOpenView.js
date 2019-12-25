var i = require("../../Initializer");
var n = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        lblName: cc.Label,
        lblRich1: cc.Label,
        lblRich2: cc.Label,
        lblNeedRich1: cc.Label,
        lblNeedRich2: cc.Label,
    },
    ctor() {},
    onLoad() {
        this.lblRich1.string = i.unionProxy.clubInfo.fund + "";
        this.lblRich2.string = i.playerProxy.userData.cash + "";
        this.lblNeedRich1.string = i.unionProxy.openCopyParam.payFund;
        this.lblNeedRich2.string = i.unionProxy.openCopyParam.payDia;
        this.lblName.string = i.unionProxy.openCopyParam.name;
    },
    eventClose() {
        n.utils.closeView(this);
    },
    onClickOpen(t, e) {
        var o = parseInt(e);
        if (2 == o) {
            if (i.unionProxy.clubInfo.fund < i.unionProxy.openCopyParam.payFund) {
                n.alertUtil.alert(i18n.t("union_nofund"));
                return;
            }
        } else if (1 == o && i.playerProxy.userData.cash < i.unionProxy.openCopyParam.payDia) {
            n.alertUtil.alertItemLimit(1);
            return;
        }
        i.unionProxy.sendReqOpen(i.unionProxy.openCopyParam.id, o);
        this.eventClose();
    },
});
