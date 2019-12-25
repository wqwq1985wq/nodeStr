var i = require("../../component/RenderListItem");
var n = require("../../component/List");
var l = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        lblTitle: cc.Label,
        lblScore: cc.Label,
        rwdList: n,
        rwdList_2: n,
        rwdNode: cc.Node,
        isDayRwd:{ default:true, tooltip: "是否今日国力排行" },
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            t.rand.rs == t.rand.re ? (this.lblTitle.string = i18n.t("AT_LIST_RAND_TXT_2", {
                num: t.rand.rs
            })) : (this.lblTitle.string = i18n.t("AT_LIST_RAND_TXT_1", {
                num1: t.rand.rs,
                num2: t.rand.re
            }));
            if (this.isDayRwd) {
                var e = i18n.t("GUO_LI_TITLE_" + l.guoliPorxy.lookType),
                o = i18n.t("GUO_LI_TEXT_" + l.guoliPorxy.lookType);
                this.lblScore.string = i18n.t("GUO_LI_E_WAI_HUO_DE_1", {
                    title: e,
                    name: o,
                    num: t.need
                });
            } else this.lblScore.string = i18n.t("GUO_LI_E_WAI_HUO_DE_2", {
                num: t.need
            });
            this.rwdList.data = t.member;
            this.rwdList_2.data = t.added;
            this.rwdNode.active = t.added && t.added.length > 0;
            this.rwdList.node.x = -this.rwdList.node.width / 2;
            this.rwdList_2.node.x = -this.rwdList_2.node.width / 2;
        }
    },
});
