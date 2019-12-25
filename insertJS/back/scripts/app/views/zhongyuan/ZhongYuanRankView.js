var i = require("../../Initializer");
var n = require("../../component/List");
var l = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: n,
        lblMyRank: cc.Label,
        lblMyName: cc.Label,
        lblMyScore: cc.Label,
        btnRe: cc.Button,
        lblRe: cc.Label,
    },
    ctor() {},
    onLoad() {
        facade.subscribe(i.zhongyuanProxy.ZHONGYUAN_OPEN_PAIHANG, this.onRank, this);
        facade.subscribe(i.zhongyuanProxy.ZHONGYUAN_MY_RID, this.onMyRid, this);
        this.onRank();
        this.onMyRid();
        this.onTimer();
        this.schedule(this.onTimer, 1);
    },
    onRank() {
        this.list.data = i.zhongyuanProxy.rank;
        var t = i.limitActivityProxy.getActivityData(i.limitActivityProxy.ZHONGYUAN_ID),
        e = !!t && (l.timeUtil.second >= t.sTime && l.timeUtil.second <= t.eTime);
        this.btnRe.node.active = e;
    },
    onMyRid() {
        this.lblMyName.string = i.playerProxy.userData.name;
        var t = null == i.zhongyuanProxy.myRid ? 0 : null == i.zhongyuanProxy.myRid.rid ? 0 : i.zhongyuanProxy.myRid.rid;
        this.lblMyRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
        this.lblMyScore.string = i.zhongyuanProxy.myRid ? i.zhongyuanProxy.myRid.score + "": "0";
    },
    onClickClose() {
        l.utils.closeView(this);
    },
    onClickRe() {
        i.rankProxy.sendRefresh(i.zhongyuanProxy.data.info.id);
    },
    onTimer() {
        var t = l.timeUtil.second - i.rankProxy.lastTime;
        t >= 60 && (this.btnRe.interactable = !0);
        this.btnRe.interactable = t >= 60;
        this.lblRe.string = t >= 60 ? i18n.t("COMMON_REFRESH") : i18n.t("FLOWER_SHENG_YU_SHI_JIAN", {
            num: 60 - t
        });
        var e = i.limitActivityProxy.getActivityData(i.limitActivityProxy.ZHONGYUAN_ID); ( !! e && (l.timeUtil.second >= e.sTime && l.timeUtil.second <= e.eTime)) || (this.btnRe.node.active = !1);
    },
});
