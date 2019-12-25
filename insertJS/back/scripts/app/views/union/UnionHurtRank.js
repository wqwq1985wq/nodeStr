var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        lblTxt: cc.Label,
        rankList: i,
        lblRank: cc.Label,
        lblHurt: cc.Label,
        lblGx: cc.Label,
        lblName: cc.Label,
    },
    ctor() {},
    onLoad() {
        this.lblTxt.string = i18n.t("UNION_KILL_BOSS_TXT", {
            name1: n.unionProxy.fightRank.kill,
            name2: n.unionProxy.openCopyParam.name,
            num: n.unionProxy.openCopyParam.rwd.exp
        });
        this.rankList.data = n.unionProxy.fightRank.list;
        this.lblRank.string = n.unionProxy.myFightRankInfo.rid + "";
        this.lblGx.string = n.unionProxy.myFightRankInfo.gx + "";
        this.lblHurt.string = n.unionProxy.myFightRankInfo.hit + "";
        this.lblName.string = n.playerProxy.userData.name;
    },
    onClickClose() {
        l.utils.closeView(this);
    },
});
