var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/ShaderUtils");
var r = require("../../Initializer");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        lblLock:cc.Label,
        url:n,
        img:cc.Sprite,
        nodeLock:cc.Node,
    },
    showData() {
        var t = this._data;
        if (t) {
            l.shaderUtils.setImageGray(this.img, t.lock < r.playerProxy.userData.bmap);
            var e = localcache.getItem(localdb.table_bigPve, t.lock);
            this.lblLock.string = i18n.t("CELL_OPEN_TIP", {
                n: i18n.t("FIGHT_BIG_TIP", {
                    s: e.id
                }) + e.name
            });
            this.nodeLock.active = t.lock < r.playerProxy.userData.bmap;
            this.url.url = a.uiHelps.getLookBuild(t.id);
        }
    },
});
