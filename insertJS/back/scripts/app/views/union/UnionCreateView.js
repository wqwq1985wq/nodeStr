var i = require("../../utils/Utils");
var n = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        editorName: cc.EditBox,
        editorPs: cc.EditBox,
        editorDes: cc.EditBox,
        lblCost: cc.Label,
        toggle: cc.Toggle,
    },
    ctor() {},
    onLoad() {
        this.editorName.placeholder = this.editorPs.placeholder = this.editorDes.placeholder = i18n.t("COMMON_INPUT_TXT");
        facade.subscribe("UNION_CREATE_SUCESS", this.eventClose, this);
        var t = i.utils.getParamInt("union_build_cost");
        this.lblCost.string = t + "";
    },
    eventClose() {
        i.utils.closeView(this);
    },
    eventCreate() {
        n.unionProxy.sendCreateUnion(this.editorName.string, "", "", this.editorPs.string, this.editorDes.string, this.toggle.isChecked);
    },
});
