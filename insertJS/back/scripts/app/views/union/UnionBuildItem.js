var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../utils/UIUtils");
var r = require("../../utils/Utils");
var a = require("../../component/UrlLoad");
cc.Class({
    extends: i,
    properties: {
        lblCost:cc.Label,
        lblGoldCost:cc.Label,
        lblDes:cc.Label,
        lblName:cc.Label,
        nodeState:cc.Node,
        nodeBtn:cc.Node,
        nodeMoney:cc.Node,
        nodeGold:cc.Node,
        btn:cc.Button,
        icon:a,
        img_4:cc.Node,
        img_5:cc.Node,
    },
    onLoad() {
        this.btn && this.btn.clickEvents && this.btn.clickEvents.length > 0 && (this.btn.clickEvents[0].customEventData = this);
    },
    onClickItem() {
        this.data;
    },
    onClickBuild() {
        var t = this._data;
        if (1 == t.pay[0].id) {
            if (n.playerProxy.userData.cash < t.pay[0].count) {
                r.alertUtil.alertItemLimit(1);
                return;
            }
        } else if (n.bagProxy.getItemCount(t.pay[0].id) < t.pay[0].count) {
            r.alertUtil.alertItemLimit(t.pay[0].id);
            return;
        }
        t && n.unionProxy.sendBuild(t.id);
    },
    showData() {
        var t = this._data;
        if (t) {
            this.lblCost.string = "" + t.pay[0].count;
            this.lblGoldCost.string = t.pay[0].count;
            this.lblDes.string = i18n.t("union_build_effect", {
                exp: t.get.exp,
                rich: t.get.fund,
                gx: t.get.gx
            });
            this.lblName.string = t.msg;
            this.nodeGold.active = 1 == t.pay[0].id;
            this.nodeMoney.active = 1 != t.pay[0].id;
            this.nodeBtn.active = n.unionProxy.memberInfo.dcid <= 0;
            this.nodeState.active = n.unionProxy.memberInfo.dcid == t.id;
            this.nodeBtn.active = 0 == n.unionProxy.memberInfo.dcid;
            this.icon.url = l.uiHelps.getItemSlot(t.icon);
            this.img_4.active = 4 == t.id;
            this.img_5.active = 5 == t.id;
        }
    },
});
