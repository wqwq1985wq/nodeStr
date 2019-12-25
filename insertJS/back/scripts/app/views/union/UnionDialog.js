var i = require("../../Initializer");
var n = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        editor: cc.EditBox,
        labelDes: cc.Label,
    },
    ctor() {},
    onLoad() {
        this.editor.placeholder = i18n.t("COMMON_INPUT_TXT");
        "tran" == i.unionProxy.dialogParam.type ? (this.labelDes.string = i18n.t("union_trans")) : "dimss" == i.unionProxy.dialogParam.type && (this.labelDes.string = i18n.t("union_dimss"));
    },
    eventClose() {
        n.utils.closeView(this);
    },
    onClickOk() {
        "tran" == i.unionProxy.dialogParam.type ? i.unionProxy.sendTran(this.editor.string, i.unionProxy.dialogParam.id) : "dimss" == i.unionProxy.dialogParam.type && i.unionProxy.sendJiesan(this.editor.string);
        this.eventClose();
    },
});
