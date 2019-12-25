var i = require("../../component/List");
var n = require("./RankCommonItem");
var l = require("../../utils/Utils");
var r = require("../../component/RoleSpine");
var a = require("../../Initializer");
var s = require("../../component/UrlLoad");
var c = require("../../utils/UIUtils");
var _ = require("../chenghao/ChengHaoItem");
var d = require("../../Config");
var u = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
        lblrank: cc.Label,
        lblcontent: cc.Label,
        rankArr: [n],
        role: r,
        lblTip: cc.Label,
        lblname: cc.Label,
        wsb: cc.Label,
        bgUrl: s,
        lblNoChenghao: cc.Node,
        chengHao: _,
    },
    ctor() {},
    onLoad() {
        this.updateShow();
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
    },
    updateShow() {
        var t = this.node.openParam;
        a.rankProxy.rankType = t.rankType;
        var e = t.list;
        e.sort(a.rankProxy.sortRankList);
        for (var o = [], i = [], n = 0; n < e.length; n++) n < 3 ? i.push(e[n]) : o.push(e[n]);
        this.list.data = o;
        var l = t.mine;
        this.lblrank.string = l.rank + "";
        this.lblrank.node.active = l.rank > 0;
        this.wsb.node.active = l.rank <= 0;
        this.lblname.string = a.playerProxy.userData.name;
        if (d.Config.isShowChengHao && u.funUtils.isOpenFun(u.funUtils.chenghao)) {
            var r = localcache.getItem(localdb.table_fashion, a.playerProxy.userData.chenghao);
            this.chengHao.data = r;
            this.lblNoChenghao.active = !r;
        }
        this.updateRankLbl(l);
        this.list.selectHandle = function(t) {
            var e = t;
            a.playerProxy.sendGetOther(e.uid);
        };
        for (var s = 0; s < this.rankArr.length; s++) this.rankArr[s].data = i[s];
        this.onClickRender(null, this.rankArr[0]);
    },
    updateRankLbl(t) {
        switch (a.rankProxy.rankType) {
        case a.rankProxy.JIU_LOU_RANK:
            this.lblTip.string = i18n.t("JIU_LOU_RANK_TIP");
            this.lblcontent.string = i18n.t("JIULOU_FEN_SHU") + " " + t.value;
            break;
        case a.rankProxy.BOSS_SCORE_RANK:
            this.lblTip.string = i18n.t("BOSS_RANK_JI_FEN_TIP");
            this.lblcontent.string = i18n.t("BOSS_JI_FEN_TXT") + " " + t.value;
            break;
        case a.rankProxy.BOSS_HURT_RANK:
            this.lblTip.string = i18n.t("BOSS_RANK_HAN_GAN_TIP");
            this.lblcontent.string = i18n.t("BOSS_XIAN_LI_TXT") + t.value;
            break;
        case a.rankProxy.TREASURE_RANK:
            this.lblTip.string = i18n.t("TREASURE_RANK");
            this.lblcontent.string = i18n.t("TREASURE_RANK_SCORE", {
                v: t.value
            });
            break;
        case a.rankProxy.TREASURE_TIDY_RANK:
            this.lblTip.string = i18n.t("TREASURE_TIDY_RANK");
            this.lblcontent.string = i18n.t("TREASURE_RANK_TIDY_SCORE", {
                v: t.value
            });
            break;
        case a.rankProxy.CLOTHE_RANK:
            this.lblTip.string = i18n.t("USER_CLOTHE_RANK");
            this.lblcontent.string = i18n.t("USER_CLOTHE_SCORE", {
                v: t.value
            });
            break;
        case a.rankProxy.DALISI_RANK:
            this.lblTip.string = i18n.t("DALISI_RANK_TIP");
            this.lblcontent.string = i18n.t("DALISI_RANK_SCROE", {
                v: t.value
            });
            break;
        case a.rankProxy.CLOTHE_PVE_RANK:
            this.lblTip.string = i18n.t("CLOTHE_PVE_RANK");
            this.lblcontent.string = i18n.t("CLOTHE_PVE_RANK_SCROE", {
                v: t.value
            });
            break;
        case a.rankProxy.CLOTHE_PVP_RANK:
            this.lblTip.string = i18n.t("CLOTHE_PVP_RANK");
            this.lblcontent.string = i18n.t("CLOTHE_PVP_RANK_SCROE", {
                v: t.value
            });
            break;
        case a.rankProxy.FLOWER_RANK:
            this.lblTip.string = i18n.t("FLOWER_RANK_TIP");
            this.lblcontent.string = i18n.t("FLOWER_RANK_NAME", {
                d: t.value
            });
            break;
        case a.rankProxy.FLOWER_RANK_TREE:
            this.lblTip.string = i18n.t("FLOWER_RANK_TREE_TIP");
            this.lblcontent.string = i18n.t("FLOWER_RANK_TREE_NAME", {
                d: t.value
            });
            break;
        case a.rankProxy.ACTBOSS_RANK:
            this.lblTip.string = i18n.t("ACTBOSS_RANK_RANK");
            this.lblcontent.string = i18n.t("ACTBOSS_RANK_SCROE", {
                d: t.value
            });
        }
    },
    onClickRender(t, e) {
        var o = e.data;
        if (null != o) {
            this.role.setClothes(o.sex, o.job, o.level, o.clothe);
            this.bgUrl.node.active = 0 != o.clothe.background;
            if (this.bgUrl.node.active) {
                var i = localcache.getItem(localdb.table_userClothe, o.clothe.background);
                i && (this.bgUrl.url = c.uiHelps.getStoryBg(i.model));
            }
        }
    },
    onClickClose() {
        l.utils.closeView(this);
    },
});
