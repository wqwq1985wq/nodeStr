var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
        lblTime: cc.Label,
        lblFuQi: cc.Label,
        lblPaiMing: cc.Label,
    },
    ctor() {},
    onLoad() {
        facade.subscribe(n.zhongyuanProxy.ZHONGYUAN_OPEN_PAIHANG, this.updateMyScore, this);
        var t = Math.ceil(n.zhongyuanProxy.data.rwd[0].member.length / 6),
        e = 80 * t + 10 * (t - 1) + 65;
        this.list.setWidthHeight(550, e);
        this.list.data = n.zhongyuanProxy.data.rwd;
        this.updateMyScore();
    },
    onClickRank() {
        l.utils.openPrefabView("zhongyuan/ZhongYuanRankView");
    },
    updateMyScore() {
        this.lblFuQi.string = i18n.t("HEDENG_LEI_JI_JI_FEN") + ":" + n.zhongyuanProxy.myRid.score;
        this.lblPaiMing.string = i18n.t("ARBOR_DAY_CUR_RANK") + ":" + n.zhongyuanProxy.myRid.rid;
        this.lblTime.string = i18n.t("AT_LIST_ACTIVITY_CD");
        var t = this;
        r.uiUtils.countDown(n.zhongyuanProxy.data.info.eTime, this.lblTime,
        function() {
            t.lblTime.string = i18n.t("ACTHD_OVERDUE");
        },
        !0, "USER_REMAIN_TIME", "d");
    },
    onClickClose() {
        l.utils.closeView(this);
    },
});
