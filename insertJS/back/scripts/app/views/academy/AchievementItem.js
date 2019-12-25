var renderListItem = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../component/UrlLoad");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: renderListItem,

    properties: {
        node_Doing:cc.Node,
        node_Fishing:cc.Node,
        nodeGet:cc.Node,
        img:r,
        bar:cc.ProgressBar,
        label:cc.Label,
        lblName:cc.Label,
    },

    showData() {
        var t = this._data;
        if (t) {
            this.lblName.string = t.title;
            this.label.string = t.isOver ? "": i18n.t("COMMON_NUM", {
                f: t.num,
                s: t.need
            });
            this.bar.progress = t.isOver ? 1 : t.percent;
            this.nodeGet.active = t.percent >= 1 && !t.isOver;
            this.node_Doing.active = t.percent < 1 && !t.isOver;
            this.node_Fishing.active = t.isOver;
            this.img.url = a.uiHelps.getAchieveIcon(t.id);
        }
    },
    onClickGet() {
        var t = this._data;
        t && n.achievementProxy.sendGetRwd(t.id);
    },
    onClickDetail(t, e) {
        var o = this._data;
        if (o) {
            n.achievementProxy.setSelectInfo(o.id);
            n.achievementProxy.selectDetail && l.utils.openPrefabView("achieve/AchieveDetail");
        }
    },
    onClickGo() {
        this._data;
    },
});
