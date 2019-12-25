var i = require("../../component/RenderListItem");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../user/UserHeadItem");
var a = require("../../models/TimeProxy");
var s = require("../chenghao/ChengHaoItem");
var c = require("../../Config");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblLv: cc.Label,
        lblRank: cc.Label,
        lblContent: cc.Label,
        headImg: r,
        lblNoChenghao: cc.Node,
        chengHao: s,
    },
    ctor() {},
    onClickItem() {
        var t = this.data;
        t && (t.uid == l.playerProxy.userData.uid ? a.funUtils.openView(a.funUtils.userView.id) : l.playerProxy.sendGetOther(t.uid));
    },
    showData() {
        var t = this._data;
        if (t) {
            if (c.Config.isShowChengHao && a.funUtils.isOpenFun(a.funUtils.chenghao)) {
                var e = localcache.getItem(localdb.table_fashion, t.chenghao);
                this.chengHao.data = e;
                this.lblNoChenghao.active = !e;
            }
            var o = localcache.getItem(localdb.table_officer, t.level);
            this.lblName.string = t.name;
            this.lblLv.string = o ? o.name: "";
            l.rankProxy.isShowGuanKa ? (this.lblContent.string = l.rankProxy.getGuankaString(t.num)) : (this.lblContent.string = i18n.t("MAIN_SHILI", {
                d: n.utils.formatMoney(t.num)
            }));
            1 == l.rankProxy.showRankType ? (this.lblContent.string = i18n.t("MAIN_SHILI", {
                d: n.utils.formatMoney(t.num)
            })) : 2 == l.rankProxy.showRankType ? (this.lblContent.string = l.rankProxy.getGuankaString(t.num)) : 3 == l.rankProxy.showRankType && (this.lblContent.string = i18n.t("RANK_TIP_3") + "：" + n.utils.formatMoney(t.num));
            this.lblRank.string = t.rid + "";
            this.headImg && this.headImg.setUserHead(t.job, t.headavatar);
        }
    },
});
