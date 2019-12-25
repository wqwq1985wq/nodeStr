var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
cc.Class({
    extends: i,
    properties: {
        lblItem: cc.Label,
        lblCount: cc.Label,
        btn: cc.Button,
    },
    ctor() {},
    onLoad() {
        this.addBtnEvent(this.btn);
    },
    showData() {
        var t = this._data;
        if (t) {
            for (var e = localcache.getGroup(localdb.table_midPve, "bmap", t.id), o = 0, i = n.playerProxy.userData.mmap, l = 0; l < e.length; l++) o += e[l].id < i ? 1 : 0;
            o += n.playerProxy.userData.bmap > t.id ? 1 : 0;
            this.lblItem.string = i18n.t("FIGHT_BIG_TIP", {
                s: t.id
            }) + t.name;
            this.lblCount.string = i18n.t("COMMON_NUM", {
                f: o,
                s: e.length + 1
            });
        }
    },
});
