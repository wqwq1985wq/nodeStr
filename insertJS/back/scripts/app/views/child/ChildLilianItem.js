var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../utils/UIUtils");
var a = require("../../component/ChildSpine");
var s = require("../servant/ServantStarShow");
var c = require("../../component/List");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblTime: cc.Label,
        lockNode: cc.Node,
        timeNode: cc.Node,
        rewardNode: cc.Node,
        selectNode: cc.Node,
        mailNode: cc.Node,
        roleImg: a,
        nameNode: cc.Node,
        yunNode: cc.Node,
        roleSmallImg: a,
        lblPrice: cc.Label,
        costNode: cc.Node,
        starNode: cc.Node,
        stars: s,
        list: c,
    },
    ctor() {},
    showData() {
        var t = this,
        e = this._data.data,
        o = parseInt(this._data.id);
        if (o <= n.sonProxy.lilianSeat.desk) {
            this.costNode.active = !1;
            this.lockNode.active = !1;
            if (null != e && 0 != e.sid) {
                var i = n.sonProxy.getSon(e.sid);
                this.lblName.string = i.name;
                r.uiUtils.countDown(e.cd.next, this.lblTime,
                function() {
                    i.cd.label = "lilian";
                    n.playerProxy.sendAdok(i.cd.label);
                    t.lblTime.string = "00:00:00";
                });
                this.rewardNode.active = 0 == e.cd.next;
                this.timeNode.active = e.cd.next > 0;
                this.selectNode.active = !1;
                this.mailNode.active = 0 != e.msgId;
                this.roleImg.node.active = i.state > 3;
                this.roleSmallImg.node.active = i.state <= 3;
                i.state > 3 ? this.roleImg.setKid(i.id, i.sex) : this.roleSmallImg.setKid(i.id, i.sex, !1);
                this.nameNode.active = this.yunNode.active = !0;
                this.starNode.active = !0;
                this.stars.setValue(i.talent);
                this.list.node.x = -this.list.node.width / 2;
            } else {
                this.timeNode.active = !1;
                this.selectNode.active = !0;
                this.mailNode.active = !1;
                this.lblName.string = "";
                this.roleImg.clearKid();
                this.roleImg.node.active = !1;
                this.roleSmallImg.clearKid();
                this.roleSmallImg.node.active = !1;
                this.nameNode.active = this.yunNode.active = !1;
                this.rewardNode.active = !1;
                this.starNode.active = !1;
            }
        } else {
            this.lblName.string = i18n.t("JINGYING_WEIJIESUO");
            this.lockNode.active = !0;
            this.timeNode.active = !1;
            this.selectNode.active = !1;
            this.mailNode.active = !1;
            this.roleImg.clearKid();
            this.roleImg.node.active = !1;
            this.roleSmallImg.clearKid();
            this.roleSmallImg.node.active = !1;
            this.rewardNode.active = !1;
            var l = localcache.getItem(localdb.table_practiceSeat, n.sonProxy.lilianSeat.desk + 1);
            this.lblPrice.string = l.cost + "";
            n.sonProxy.lilianList.length;
            this.costNode.active = o == n.sonProxy.lilianSeat.desk + 1;
            this.starNode.active = !1;
        }
    },
    onClickFeige() {
        l.utils.openPrefabView("feige/FeigeView", null, {
            flag: !0
        });
    },
});
