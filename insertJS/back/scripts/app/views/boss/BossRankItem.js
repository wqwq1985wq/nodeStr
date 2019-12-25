var i = require("../../component/RenderListItem");
var n = require("../user/UserHeadItem");
cc.Class({
    extends: i,
    properties: {
        lblname: cc.Label,
        lblhaogan: cc.Label,
        userHead: n,
        lblrank: cc.Label,
        rankNode: cc.Node,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            this.lblname.string = t.name;
            this.lblhaogan.string = i18n.t("BOSS_XIAN_LI_TXT") + t.num;
            this.userHead.setUserHead(t.job, t.headavatar);
            this.lblrank.string = t.id + "";
            this.rankNode.active = t.id > 3;
        }
    },
});
