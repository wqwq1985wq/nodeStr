var i = require("../../component/UrlLoad");
var n = require("../../utils/UIUtils");
var l = require("../../utils/Utils");
var r = require("../../utils/ApiUtils");
var a = require("./ServantStarShow");
var s = require("../../component/List");
var c = require("../../Config");
var initializer = require("../../Initializer");

cc.Class({
    extends: cc.Component,
    properties: {
        lblEps: [cc.Label],
        lblAllZZ: cc.Label,
        urlload: i,
        lblName: cc.Label,
        lblRecruit: cc.Label,
        nodeShare: cc.Node,
        logo: cc.Node,
        stars: a,
        list: s,
    },
    ctor() {},
    onLoad() {
        facade.subscribe("SHARE_SUCCESS", this.onShareShow, this);
        // this.btnShare.active = c.Config.isShowShare;
        var t = this.node.openParam;
        if (t) {
            for (var e = 0; e < this.lblEps.length; e++) {
                var o = e + 1;
                this.lblEps[e].string = 10 * t.zz["e" + o] + "";
            }
            var i = localcache.getItem(localdb.table_hero, t.id);
            n.uiUtils.showNumChange(this.lblAllZZ, 0, t.zz.e1 + t.zz.e2 + t.zz.e3 + t.zz.e4, 30, "SERVANT_ZHZZ", "zz");
            this.urlload.url = n.uiHelps.getServantSpine(t.id);
            this.lblName.string = i ? i.name: "";
            var r = localcache.getItem(localdb.table_heroinfo, t.id);
            this.lblRecruit.string = r ? r.recruit: "";
            this.stars.setValue(i.star);
            this.list.node.x = -this.list.node.width / 2;
            l.audioManager.playSound("servant/" + i.voice, !0, !0);
        }
    },
    onClickClost() {
        l.audioManager.playSound("", !0);
        if(initializer.taskProxy.mainTask.id == 110)
        {
            facade.send(initializer.guideProxy.UPDATE_TRIGGER_GUIDE, {
                type: 4,
                value: initializer.taskProxy.mainTask.id
            });
        }
        l.utils.closeView(this);
    },
    onClickShare() {
        this.nodeShare.active = this.logo.active = !0;
        // this.btnShare.active = !1;
        this.scheduleOnce(this.delayShare, 0.1);
    },
    delayShare() {
        r.apiUtils.share_game("servant");
    },
    onShareShow() {
        this.nodeShare.active = this.logo.active = !0;
        // this.btnShare.active = !0;
    },
});
