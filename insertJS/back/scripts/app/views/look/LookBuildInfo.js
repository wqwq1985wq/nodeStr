var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
        lblBuildName: cc.Label,
        lblCost: cc.Label,
        nodeLook: cc.Node,
        btnLook: cc.Button,
    },
    ctor() {
        this._curBuiliId = 0;
    },
    onLoad() {
        var t = (this._curBuiliId = this.node.openParam);
        if (t) {
            for (var e = localcache.getGroup(localdb.table_lookCityEvent, "city", t), o = [], i = 0; i < e.length; i++) {
                var n = !0;
                0 != e[i].disappear && (1 == e[i].disappear ? (n = l.lookProxy.isOpen(e[i].dp_para)) : 2 == e[i].disappear ? (n = l.taskProxy.mainTask.id < e[i].dp_para) : 3 == e[i].disappear ? (n = l.playerProxy.userData.bmap >= e[i].dp_para) : 4 == e[i].disappear && (n = l.playerProxy.userData.level >= e[i].dp_para));
                n && o.push(e[i]);
            }
            var r = localcache.getItem(localdb.table_lookBuild, t);
            this.lblBuildName.string = r.name;
            o.sort(this.sortList);
            this.list.data = o;
            this.updateCost();
            this.nodeLook.active = l.playerProxy.userData.level > 5 && l.playerProxy.userData.bmap > r.lock;
        }
        facade.subscribe(l.lookProxy.UPDATE_XUNFANG_XFINFO, this.updateCost, this);
    },
    updateCost() {
        this.lblCost.string = n.utils.formatMoney(this.getCost());
        this.btnLook.interactable = !0;
    },
    getCost() {
        return (n.utils.getParamInt("xunfang_city_jiage") + n.utils.getParamInt("xunfang_city_jiage_add") * (l.lookProxy.xfinfo.lastTime < n.timeUtil.getTodaySecond() ? 0 : null == l.lookProxy.xfinfo.count ? 0 : l.lookProxy.xfinfo.count));
    },
    onClickLook() {
        if (0 != this._curBuiliId) if (l.playerProxy.userData.cash < this.getCost()) n.alertUtil.alertItemLimit(1);
        else if (l.lookProxy.xfinfo.num <= 0) {
            var t = n.utils.getParamInt("xf_cost_item_tl"),
            e = l.bagProxy.getItemCount(t);
            n.utils.showConfirmItem(i18n.t("LOOK_USE_RECY_CONFIRM", {
                n: l.playerProxy.getKindIdName(1, t),
                c: 1
            }), t, e,
            function() {
                e < 1 ? n.alertUtil.alertItemLimit(t) : l.lookProxy.sendRecover();
            },
            "LOOK_USE_RECY_CONFIRM");
        } else {
            this.btnLook.interactable = !1;
            l.lookProxy.sendXunfan(100 + this._curBuiliId);
            this.onClickClose();
        }
    },
    sortList(t, e) {
        var o = l.lookProxy.isLock(t) ? 0 : 1,
        i = l.lookProxy.isLock(e) ? 0 : 1;
        return o > i ? 1 : o < i ? -1 : o == i ? t.id - e.id: -1;
    },
    onClickClose() {
        n.utils.closeView(this);
    },
});
