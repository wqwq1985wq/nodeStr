var i = require("../../Initializer");
var n = require("../../utils/Utils");
var l = require("../item/ItemSlotUI");
var r = require("../../component/UrlLoad");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        servantShow:r,
        itemRwd:l,
        btnQianDao:cc.Button,
        btnYiQianDao: cc.Button,
        lblTime: cc.Label,
    },
    ctor() {
        this.curItem = null;
    },
    onLoad() {
        facade.subscribe(i.thirtyDaysProxy.THIRTY_DAY_DATA_UPDATE, this.onUpdateShow, this);
        i.thirtyDaysProxy.sendOpenActivity();
        this.onUpdateShow();
    },
    onUpdateShow() {
        var t = this,
        e = i.thirtyDaysProxy.data;
        if (e) {
            this.curItem = e.rwd[e.days - 1];
            this.curItem || (this.curItem = e.rwd[e.rwd.length - 1]);
            a.uiUtils.countDown(e.info.eTime, this.lblTime,
            function() {
                n.timeUtil.second >= e.info.eTime && (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
            });
            this.itemRwd.data = e.rwd[this.curItem.id - 1].items[0];
            this.btnYiQianDao.node.active = !(this.btnQianDao.node.active = 0 == this.curItem.get);
            this.setRoleShow(e);
        }
    },
    setRoleShow(t) {
        var e = this;
        if (this.servantShow) {
            this.servantShow.loadHandle = function() {
                var t = e.servantShow.node.children[0];
                t && (t = t.children[0]) && (t.color = n.utils.BLACK);
            };
            var o = "",
            i = t.rwd[6].items[0].id;
            if (i > 200) {
                var l = localcache.getItem(localdb.table_wife, i - 200);
                l && l.res && (o = a.uiHelps.getWifeBody(l.res));
            } else o = a.uiHelps.getServantSpine(i);
            this.servantShow.url = o;
        }
    },
    onClickTab(t, e) {
        if (0 == e) {
            if (this.curItem && 0 != this.curItem.get) {
                1 == this.curItem.get && n.alertUtil.alert18n("TIRTY_DAY_YI_QIAN_DAO");
                return;
            }
            i.thirtyDaysProxy.sendGet();
        } else 1 == e && n.utils.openPrefabView("thirtydays/DailyCheckView");
    },
    onClickClose() {
        n.utils.closeView(this);
    },
});
