var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../utils/Utils");
var a = require("../../Initializer");
var s = require("../../component/ChildSpine");
cc.Class({
    extends: i,
    properties: {
        imgHead: n,
        wife: n,
        lblName: cc.Label,
        lblChapt: cc.Label,
        nodeReaded: cc.Node,
        nodeUnread: cc.Node,
        childSpine: s,
        childSpineSmall: s,
        btnBg: cc.Button,
    },
    ctor() {},
    onClick() {
        if (a.feigeProxy.readingSonMail) r.alertUtil.alert18n("SON_IS_READING_MAIL");
        else if (a.feigeProxy.lookSonFeige) {
            var t = this._data;
            r.utils.openPrefabView("feige/FeigeDetail", !1, t);
            a.feigeProxy.sonFeigeData = t;
        } else {
            var e = this._data;
            e && r.utils.openPrefabView("feige/FeigeDetail", !1, e);
        }
    },
    showData() {
        var t = this._data;
        if (a.feigeProxy.lookSonFeige && t && null != t.sid) {
            var e = a.sonProxy.getSon(t.sid);
            this.lblName.string = e.name;
            var o = localcache.getItem(localdb.table_lookBuild, t.city);
            this.lblChapt.string = i18n.t("SON_LI_LIAN_MAIL_TXT", {
                son: e.name,
                city: o ? o.name: ""
            });
            this.lblName.node.color = t.select.length > 0 ? cc.color(91, 74, 78) : cc.color(226, 0, 53);
            this.lblChapt.node.color = t.select.length > 0 ? cc.color(96, 87, 87) : cc.color(135, 49, 49);
            this.nodeReaded.active = t.select.length > 0;
            this.nodeUnread.active = 0 == t.select.length;
            this.btnBg.interactable = 0 == t.select.length;
            e.state > 3 ? this.childSpine.setKid(e.id, e.sex) : this.childSpineSmall.setKid(e.id, e.sex, !1);
            this.childSpine.node.active = e.state > 3;
            this.childSpineSmall.node.active = e.state <= 3;
            this.imgHead && (this.imgHead.node.active = !1);
            this.wife && (this.wife.node.active = !1);
        } else {
            this.childSpine.node.active = !1;
            this.childSpineSmall.node.active = !1;
            var i = this._data;
            if (i && null != i.title) {
                this.lblName.string = i.title;
                this.lblChapt.string = i.des;
                this.nodeReaded.active = a.feigeProxy.isRead(i.id);
                this.nodeUnread.active = !this.nodeReaded.active;
                this.btnBg.interactable = !a.feigeProxy.isRead(i.id);
                this.lblName.node.color = a.feigeProxy.isRead(i.id) ? cc.color(91, 74, 78) : cc.color(226, 0, 53);
                this.lblChapt.node.color = a.feigeProxy.isRead(i.id) ? cc.color(96, 87, 87) : cc.color(135, 49, 49);
                switch (i.fromtype) {
                case 1:
                    this.wife && (this.wife.node.active = !1);
                    this.imgHead.node.active = !0;
                    this.imgHead.url = l.uiHelps.getServantSmallSpine(i.heroid);
                    break;
                case 2:
                    this.imgHead && (this.imgHead.node.active = !1);
                    var n = localcache.getItem(localdb.table_wife, i.heroid);
                    this.wife.node.active = !0;
                    this.wife.url = l.uiHelps.getWifeSmallBody(n.res);
                }
            }
        }
    },
});
