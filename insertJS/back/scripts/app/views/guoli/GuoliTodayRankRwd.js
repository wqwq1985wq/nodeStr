var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        lblRank: cc.Label,
        lblTotal: cc.Label,
        btns: [cc.Button],
        lblRwd: cc.Label,
        lblPaihang: cc.Label,
        selectImg: cc.SpriteFrame,
        norColor: cc.Color,
        selColor: cc.Color,
        rwdImg: cc.Sprite,
        rankImg: cc.Sprite,
        rwdList: i,
        raknList: i,
        rwdNode: cc.Node,
        rankNode: cc.Node,
        lblTitle: cc.Label,
        lblRankTitle: cc.Label,
        btnRe: cc.Button,
        lblRe: cc.Label,
    },
    ctor() {},
    onLoad() {
        facade.subscribe(l.guoliPorxy.GUO_LI_RANK_DATA, this.onRankData, this);
        facade.subscribe(l.guoliPorxy.GUO_LI_MY_RANK, this.onMyRank, this);
        facade.subscribe(l.guoliPorxy.GUO_LI_RREWARDS_DATA, this.onRewards, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        this.onTimer();
        this.schedule(this.onTimer, 1);
        var t = this.node.openParam.id;
        l.guoliPorxy.lookType = t;
        l.guoliPorxy.sendLookRank(t);
        this.onClickTabs(null, "0");
        this.lblTitle.string = 0 != t ? i18n.t("GUO_LI_TITLE_" + t) + i18n.t("GUO_LI_TODAY_REWARD") : i18n.t("GUO_LI_TODAY_REWARD");
        this.lblRankTitle.string = i18n.t("GUO_LI_JIN_RI_LEI_XING", {
            name: i18n.t("GUO_LI_TEXT_" + l.guoliPorxy.lookType)
        });
    },
    onClickTabs(t, e) {
        for (var o = 0; o < this.btns.length; o++) this.btns[o].interactable = o != parseInt(e);
        this.lblRwd.node.color = 0 == e ? this.selColor: this.norColor;
        this.lblPaihang.node.color = 1 == e ? this.selColor: this.norColor;
        this.rankNode.active = "1" == e;
        this.rwdNode.active = "0" == e;
        this.rwdImg.spriteFrame = "0" == e ? this.selectImg: null;
        this.rankImg.spriteFrame = "1" == e ? this.selectImg: null;
    },
    onRankData() {
        this.raknList.data = l.guoliPorxy.ranks;
        this.onTimer();
    },
    onMyRank() {
        if (l.guoliPorxy.myRank) {
            this.lblRank.string = i18n.t("GUO_LI_JIN_RI") + (0 == l.guoliPorxy.myRank.myScorerank ? i18n.t("RAKN_UNRANK") : l.guoliPorxy.myRank.myScorerank);
            this.lblTotal.string = i18n.t("GUO_LI_JIN_RI_LEI_XING", {
                name: i18n.t("GUO_LI_TEXT_" + l.guoliPorxy.lookType)
            }) + l.guoliPorxy.myRank.myScore;
        }
    },
    onRewards() {
        this.rwdList.data = l.guoliPorxy.rewards;
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
        l.guoliPorxy.sendRefreshRank(l.guoliPorxy.lookType);
    },
});
