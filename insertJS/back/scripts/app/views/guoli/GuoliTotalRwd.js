var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        lblTodat: cc.Label,
        lblTotal: cc.Label,
        btns: [cc.Button],
        lblRwd: cc.Label,
        lblXiangqing: cc.Label,
        selectImg: cc.SpriteFrame,
        norColor: cc.Color,
        selColor: cc.Color,
        rwdImg: cc.Sprite,
        xqImg: cc.Sprite,
        rwdList: i,
        rwdNode: cc.Node,
        xqList: i,
        xqNode: cc.Node,
    },
    ctor() {},
    onLoad() {
        facade.subscribe(l.guoliPorxy.GUO_LI_DATA_UPDATE, this.onShowRewards, this);
        this.lblTodat.string = i18n.t("GUO_LI_JIN_RI_GUO_LI") + l.guoliPorxy.data.daygl;
        this.lblTotal.string = i18n.t("GUO_LI_ZONG_GUO_LI_TXT") + Math.floor(l.guoliPorxy.data.allgl);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
        this.onClickTabs(null, "0");
    },
    onClickTabs(t, e) {
        for (var o = 0; o < this.btns.length; o++) this.btns[o].interactable = o != parseInt(e);
        this.lblRwd.node.color = 0 == e ? this.selColor: this.norColor;
        this.lblXiangqing.node.color = 1 == e ? this.selColor: this.norColor;
        "0" == e ? this.onShowRewards() : "1" == e && this.onShowXq();
        this.rwdImg.spriteFrame = "0" == e ? this.selectImg: null;
        this.xqImg.spriteFrame = "1" == e ? this.selectImg: null;
        this.rwdNode.active = "0" == e;
        this.xqNode.active = "1" == e;
    },
    onShowRewards() {
        this.rwdList.data = l.guoliPorxy.data.score.sort(function(t, e) {
            var o = 0 == t.get && l.guoliPorxy.data.allgl >= t.need ? 0 : 1,
            i = 0 == e.get && l.guoliPorxy.data.allgl >= e.need ? 0 : 1;
            return o != i ? o - i: t.get - e.get;
        });
    },
    onShowXq() {
        this.xqList.data = l.guoliPorxy.rule;
    },
    onClickClose() {
        n.utils.closeView(this);
    },
    onClickClost() {
        n.utils.closeView(this);
        facade.send("GUO_LI_CLOSE_ALL");
    },
});
