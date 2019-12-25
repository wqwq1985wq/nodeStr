var i = require("../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        lblName: cc.Label,
        lblSp: cc.Label,
        lblOrg: cc.Label,
        lblAdd: cc.Label,
        nodeRole: cc.Node,
    },
    ctor() {},
    onLoad() {
        var t = this.node.openParam;
        this.lblName.string = t.name;
        this.lblSp.string = t.sp;
        this.lblOrg.string = t.org;
        this.lblAdd.string = t.add;
        this.nodeRole.active = null != t.role;
    },
    onClickClost() {
        i.utils.closeView(this);
        i.utils.popNext(!1);
    },
});
