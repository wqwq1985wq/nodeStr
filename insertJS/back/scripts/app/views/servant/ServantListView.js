var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        list1: i,
        list2: i,
        wzmNode: cc.Node,
    },
    ctor() {
        this.arr = [
                {
                    type: 0
                },
                {
                    type: 1
                },
                {
                    type: 2
                },
                {
                    type: 3
                }
            ];
    },
    onLoad() {
        facade.subscribe("XIAN_YUN_OPEN_END", this.onXianYun, this);
        facade.subscribe(n.xianyunProxy.XIAN_YUN_HERO_LIST, this.onXianYunUpdate, this);
        var t = this;
        this.list1.selectHandle = function(e) {
            var o = e;
            l.utils.openPrefabView("servant/ServantView", !1, {
                hero: o,
                tab: 4
            });
            l.utils.closeView(t);
        };
        this.list2.selectHandle = function(t) {
            var e = t;
            l.utils.openPrefabView("servant/ServantInfo", !1, e);
        };
        this.wzmNode.active = n.servantProxy.getHeroList(!1).length > 0;
        r.funUtils.isOpenFun(r.funUtils.xianyun) ? n.xianyunProxy.sendOpenXianYun() : this.scheduleOnce(this.oepnView, 0.25);
    },
    onXianYun() {
        this.oepnView();
    },
    oepnView() {
        this.list1.data = n.servantProxy.getHeroList(!0).sort(this.sortStar);
        this.list2.data = n.servantProxy.getHeroList(!1);
    },
    sortLevel(t, e) {
        var o = n.servantProxy.getHeroData(t.heroid),
        i = n.servantProxy.getHeroData(e.heroid);
        return o.level > i.level ? -1 : 1;
    },
    sortZiZhi(t, e) {
        var o = n.servantProxy.getHeroData(t.heroid),
        i = n.servantProxy.getHeroData(e.heroid);
        return o.zz.e1 + o.zz.e2 + o.zz.e3 + o.zz.e4 > i.zz.e1 + i.zz.e2 + i.zz.e3 + i.zz.e4 ? -1 : 1;
    },
    sortId(t, e) {
        return t.heroid < e.heroid ? -1 : 1;
    },
    sortProp(t, e) {
        var o = n.servantProxy.getHeroData(t.heroid),
        i = n.servantProxy.getHeroData(e.heroid);
        return o.aep.e1 + o.aep.e2 + o.aep.e3 + o.aep.e4 > i.aep.e1 + i.aep.e2 + i.aep.e3 + i.aep.e4 ? -1 : 1;
    },
    sortStar(t, e) {
        var o = n.xianyunProxy.isXianYun(t.heroid) ? 1 : 0,
        i = n.xianyunProxy.isXianYun(e.heroid) ? 1 : 0,
        l = n.servantProxy.getHeroData(t.heroid),
        r = n.servantProxy.getHeroData(e.heroid);
        return o != i ? o - i: t.star != e.star ? e.star - t.star: r.level - l.level;
    },
    onClickClose() {
        l.utils.closeView(this, !0);
    },
    onXianYunUpdate() {
        this.oepnView();
    },
});
