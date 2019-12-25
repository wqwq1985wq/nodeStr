var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../Initializer");
var a = require("../../utils/Utils");
var s = require("../../utils/ShaderUtils");
cc.Class({
    extends: i,
    properties: {
        spriteList: [cc.Sprite],
        nodeOver: cc.Node,
        nodeClost: cc.Node,
        lblName: cc.Label,
        lblKey: cc.Label,
        urlLoad: n,
        nodeBoss: cc.Node,
        btn: cc.Button,
    },
    ctor() {},
    onLoad() {
        this.addBtnEvent(this.btn);
    },
    showData() {
        var t = this._data,
        e = r.playerProxy.userData;
        if (t && t.bmap) {
            var o = t;
            this.lblKey.string = i18n.t("FIGHT_MID_TIP", {
                s: o.mdtext
            });
            this.lblName.string = o.mname;
            for (var i = 0; i < this.spriteList.length; i++) e.mmap <= o.id ? s.shaderUtils.setImageGray(this.spriteList[i],false) : s.shaderUtils.setImageGray(this.spriteList[i]);
            this.nodeBoss.active = !1;
            this.nodeOver.active = this.nodeClost.active = e.mmap > o.id;
            this.urlLoad.url = l.uiHelps.getServantHead(o.index);
        }
        if (t && t.bossname) {
            var n = t,
            c = localcache.getGroup(localdb.table_midPve, "bmap", n.id);
            this.nodeBoss.active = !0;
            this.lblKey.string = i18n.t("FIGHT_MID_TIP", {
                s: c.length + 1
            });
            this.lblName.string = n.bossname;
            this.urlLoad.url = l.uiHelps.getServantHead(n.index);
        }
    },
});
