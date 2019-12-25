var i = require("../../utils/Utils");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../utils/ApiUtils");
var a = require("../../Config");
cc.Class({
    extends: cc.Component,
    properties: {
        lblName_1:cc.Label,
        lblName_2:cc.Label,
        lblMeiLi:cc.Label,
        urlload:n,
        nodeShare:cc.Node,
        logo:cc.Node,
    },
    onLoad() {
        // this.btnShare.active = a.Config.isShowShare;
        facade.subscribe("SHARE_SUCCESS", this.onShareShow, this);
        var t = this.node.openParam;
        if (t) {
            var e = localcache.getItem(localdb.table_wife, t.id);
            this.lblName_1.string = e.wname2;
            this.lblMeiLi.string = t.flower + "";
            var o = localcache.getGroup(localdb.table_wifeSkill, "wid", t.id),
            n = localcache.getItem(localdb.table_hero, o[0].heroid);
            this.lblName_2.string = n.name;
            this.urlload.url = l.uiHelps.getWifeBody(e.res);
            i.audioManager.playSound("wife/" + e.voice, !0, !0);
        }
    },
    onClickClose() {
        i.utils.closeView(this);
    },
    onClickShare() {
        this.nodeShare.active = this.logo.active = !0;
        // this.btnShare.active = !1;
        this.scheduleOnce(this.delayShare, 0.1);
    },
    delayShare() {
        r.apiUtils.share_game("wife");
    },
    onShareShow() {
        this.nodeShare.active = this.logo.active = !1;
        // this.btnShare.active = !0;
    },
});
