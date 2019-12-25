var i = require("../../Initializer");
var n = require("../../utils/Utils");
var l = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        lblTen: cc.RichText,
        lblFree: cc.Label,
        lblCost: cc.Label,
        nodeFree: cc.Node,
        nodeCost: cc.Node,
        eff_pt: sp.Skeleton,
        eff_bj: sp.Skeleton,
    },
    ctor() {
        this.cost = 0;
        this.isFirst = !0;
        this.isPlaying = !1;
        this.count = 0;
    },
    onLoad() {
        facade.subscribe(i.playerProxy.PLAYER_QIFU_UPDATE, this.qifuUpdate, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        this.qifuUpdate();
    },
    qifuUpdate() {
        var t = localcache.getItem(localdb.table_officer, i.playerProxy.userData.level);
        this.count = i.playerProxy.qifuData.lastTime >= n.timeUtil.getTodaySecond(0) ? t.pray - i.playerProxy.qifuData.free: t.pray;
        this.nodeFree.active = this.count > 0;
        this.nodeCost.active = this.count <= 0;
        if (this.count > 0) this.lblFree.string = i18n.t("QIFU_FREE_COUNT", {
            num: this.count,
            total: t.pray
        });
        else {
            var e = i.playerProxy.qifuData.buy + 1;
            this.cost = e * (1 + Math.floor(e / 10)) * 2;
            this.lblCost.string = this.cost + "";
        }
        var o = n.utils.getParamInt("qifu_ten_count");
        o - i.playerProxy.qifuData.ten == 0 ? (this.lblTen.string = i18n.t("QIFU_CUR_FREE")) : (this.lblTen.string = i18n.t("QIFU_TEN_TXT", {
            num: o - i.playerProxy.qifuData.ten
        }));
        if (this.isFirst) this.isFirst = !1;
        else {
            if (0 == i.playerProxy.qifuData.isten) {
                this.eff_pt.node.active = !0;
                this.eff_pt.animation = "pt";
            } else {
                this.eff_bj.node.active = !0;
                this.eff_bj.animation = "bj";
            }
            this.scheduleOnce(this.onTimer, 1);
        }
    },
    onTimer() {
        i.timeProxy.floatReward();
        this.isPlaying = !1;
    },
    onClickQifu(t, e) {
        var o = this;
        if (!this.isPlaying) if (this.count <= 0) n.utils.showConfirmItem(i18n.t("QIFU_COST_TIP", {
            num: this.cost
        }), 1, i.playerProxy.userData.cash,
        function() {
            if (i.playerProxy.userData.cash < o.cost) n.alertUtil.alertItemLimit(1);
            else {
                i.playerProxy.sendQifu(parseInt(e));
                o.isPlaying = !0;
            }
        },
        "QIFU_COST_TIP");
        else {
            i.playerProxy.sendQifu(parseInt(e));
            this.isPlaying = !0;
        }
    },
    onClickClose() {
        n.utils.closeView(this);
    },
    onClickRecharge() {
        l.funUtils.openView(l.funUtils.recharge.id);
    },
});
