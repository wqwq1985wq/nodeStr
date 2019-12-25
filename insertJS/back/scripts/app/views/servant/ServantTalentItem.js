var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../component/UrlLoad");
var r = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblDes: cc.Label,
        lblCount: cc.Label,
        bg: cc.Sprite,
        stars: [cc.Node],
        bgs: [cc.SpriteFrame],
        starLay: cc.Layout,
        btn: cc.Button,
        lblLv: cc.Label,
        redNode: cc.Node,
        proUrl: l,
    },
    ctor() {},
    onLoad() {
        this.btn && this.addBtnEvent(this.btn);
    },
    showData() {
        var t = this._data;
        if (t) {
            var e = localcache.getItem(localdb.table_epSkill, t.id + "");
            this.lblName.string = e.name;
            this.lblDes.string = i18n.t("SERVANT_ZZ" + e.ep);
            this.bg.spriteFrame = this.bgs[e.ep - 1];
            this.starLay.spacingX = 2 - e.star;
            for (var o = 0; o < this.stars.length; o++) this.stars[o].active = o < e.star;
            var i = t.level + (t.hlv ? t.hlv: 0);
            i = i < 1 ? 1 : i;
            this.lblCount.string = e.star * i + "";
            this.lblLv.string = 0 == t.level ? "": t.level + "";
            if (n.servantProxy.curSelectId && 0 != n.servantProxy.curSelectId) {
                var l = n.servantProxy.getHeroData(n.servantProxy.curSelectId);
                this.redNode.active = n.servantProxy.tanlentIsEnoughUp(l, t);
            }
            var a = localcache.getItem(localdb.table_epSkill, t.id);
            this.proUrl && (this.proUrl.url = r.uiHelps.getLangSp(a ? a.ep: 1));
        }
    },
});
