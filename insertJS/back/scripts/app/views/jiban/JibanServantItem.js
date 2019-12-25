var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../component/List");
var r = require("../../Initializer");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        lblName:cc.Label,
        lblJbValue:cc.Label,
        roleUrl:n,
        btnShow:cc.Button,
        list:l,
        lblLimit:cc.Label,
        nodeNew:cc.Node,
    },
    onLoad() {
        this.addBtnEvent(this.btnShow);
    },
    showData() {
        var t = this.data;
        if (t && 1 == t.type) {
            var e = localcache.getItem(localdb.table_hero, t.roleid);
            this.lblName.string = e.name;
            var o = r.jibanProxy.getHeroJB(t.roleid);
            this.lblJbValue.string = o + "";
            this.roleUrl.url = a.uiHelps.getServantSmallSpine(t.roleid);
            for (var i = [], n = 0; n < 5; n++) r.jibanProxy.getJbItemCount(t.roleid, n) > 0 && i.push({
                star: n,
                num: r.jibanProxy.getJbItemCount(t.roleid, n)
            });
            this.list.data = i;
            this.lblLimit.node.active = 0 == i.length;
            this.nodeNew.active = r.jibanProxy.hasNewStory(t.roleid);
        }
    },
});
