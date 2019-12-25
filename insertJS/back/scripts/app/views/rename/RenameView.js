var i = require("../../Initializer");
var n = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        editBox: cc.EditBox,
        lblCount: cc.Label,
        lblCost: cc.Label,
        nodeCost: cc.Node,
    },
    ctor() {},
    onLoad() {
        this.editBox.placeholder = i18n.t("COMMON_INPUT_TXT");
        facade.subscribe(i.createProxy.CREATE_RANDOM_NAME, this.upName, this);
        var t = i.sonProxy.getSon(i.sonProxy.renameId);
        this.nodeCost.active = t.state != proto_sc.SomState.tName;
        this.lblCost.string = n.utils.getParamStr("child_cost_gold");
        this.onTextChange();
        this.onClickRandom();
    },
    upName(t) {
        this.editBox.string = t || i.createProxy.randomName;
        this.onTextChange();
    },
    onClickOk() {
        var t = i.sonProxy.getSon(i.sonProxy.renameId);
        if (t && t.state != proto_sc.SomState.tName && i.playerProxy.userData.cash < n.utils.getParamInt("child_cost_gold")) n.alertUtil.alertItemLimit(1);
        else {
            t.state != proto_sc.SomState.tName ? i.sonProxy.sendRname(t.id, this.editBox.string) : i.sonProxy.sendSonName(t.id, this.editBox.string);
            this.onClickCancel();
        }
    },
    onClickCancel() {
        n.utils.closeView(this);
    },
    onClickRandom() {
        i.createProxy.sendRandomName();
    },
    onTextChange() {
        this.lblCount.string = i18n.t("COMMON_NUM", {
            f: this.editBox.string.length,
            s: 6
        });
    },
});
