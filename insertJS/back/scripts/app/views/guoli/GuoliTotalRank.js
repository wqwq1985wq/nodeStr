var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("./GuoliTodayRankRender");
var a = require("../rank/RankItem");
cc.Class({
    extends: cc.Component,
    properties: {
        lblRank:cc.Label,
        lblTotal:cc.Label,
        btns:[cc.Button],
        lblRwd:cc.Label,
        lblXiangqing:cc.Label,
        selectImg:cc.SpriteFrame,
        norColor:cc.Color,
        selColor:cc.Color,
        rwdImg:cc.Sprite,
        rankImg:cc.Sprite,
        rwdList:i,
        rwdNode:cc.Node,
        rankList:i,
        rankNode:cc.Node,
        btnRe: cc.Button,
        lblRe: cc.Label,
    },
    onLoad() {
        facade.subscribe(l.guoliPorxy.GUO_LI_RREWARDS_DATA, this.onRewards, this);
        facade.subscribe(l.guoliPorxy.GUO_LI_RANK_DATA, this.onRanks, this);
        facade.subscribe(l.guoliPorxy.GUO_LI_MY_RANK, this.onMyRank, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        this.onClickTabs(null, "0");
        l.guoliPorxy.sendLookRank(9);
        this.onTimer();
        this.schedule(this.onTimer, 1);
    },
    onClickTabs(t, e) {
        for (var o = 0; o < this.btns.length; o++) this.btns[o].interactable = o != parseInt(e);
        this.lblRwd.node.color = 0 == e ? this.selColor: this.norColor;
        this.lblXiangqing.node.color = 1 == e ? this.selColor: this.norColor;
        this.rankNode.active = "1" == e;
        this.rwdNode.active = "0" == e;
        this.rwdImg.spriteFrame = "0" == e ? this.selectImg: null;
        this.rankImg.spriteFrame = "1" == e ? this.selectImg: null;
        this.rwdNode.active = "0" == e;
        this.rankNode.active = "1" == e;
    },
    onRewards() {
        this.rwdList.data = l.guoliPorxy.rewards;
    },
    onRanks() {
        this.rankList.data = l.guoliPorxy.ranks;
        this.onTimer();
    },
    onMyRank() {
        this.myRwdNode.data = l.guoliPorxy.myRank;
    },
    onClickClose() {
        n.utils.closeView(this);
    },
    onClickClost() {
        n.utils.closeView(this);
        facade.send("GUO_LI_CLOSE_ALL");
    },
    onTimer() {
        var t = n.timeUtil.second - l.rankProxy.lastTime;
        t >= 60 && (this.btnRe.interactable = !0);
        this.btnRe.interactable = t >= 60;
        this.lblRe.string = t >= 60 ? i18n.t("COMMON_REFRESH") : i18n.t("FLOWER_SHENG_YU_SHI_JIAN", {
            num: 60 - t
        });
    },
    onClickRe() {
        l.guoliPorxy.sendRefreshRank(9);
    },
});
