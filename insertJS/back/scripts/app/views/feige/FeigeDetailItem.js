var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("../../Initializer");
var a = require("../../component/ChildSpine");
var FeigeDetailItem = cc.Class({
    extends: i,

    properties: {
        lblContext: [cc.Label],
        lblTitle: cc.Label,
        model: n,
        wife: n,
        childSpine: a,
        childSpineSmall: a,
    },

    ctor() {
        // this.lblContext = [];
        // this.lblTitle = null;
        // this.model = null;
        // this.wife = null;
        // this.childSpine = null;
        // this.childSpineSmall = null;
    },

    showData() {
        var t = this._data;
        if (t) {
            var e = r.playerProxy.getEmailData(t.id);
            if (e) {
                for (var o = localcache.getItem(localdb.table_emailgroup, e.group), i = t.select, n = 0 == i ? e.context: i == e.award1 ? e.text1: e.text2, a = this.getLabels(n), s = 0; s < this.lblContext.length; s++) this.lblContext[s].string = a.length > s ? a[s] : "";
                if (0 == i) switch (o.fromtype) {
                case 1:
                    localcache.getItem(localdb.table_hero, o.heroid).name;
                    this.wife && (this.wife.node.active = !1);
                    if (this.model) {
                        this.model.node.active = !0;
                        this.model.url = l.uiHelps.getServantSmallSpine(o.heroid);
                    }
                    break;

                case 2:
                    var c = localcache.getItem(localdb.table_wife, o.heroid);
                    r.playerProxy.getWifeName(o.heroid);
                    this.model && (this.model.node.active = !1);
                    if (this.wife) {
                        this.wife.node.active = !0;
                        this.wife.url = l.uiHelps.getWifeSmallBody(c.res);
                    }
                    break;

                case 3:
                    var _ = r.sonProxy.getSon(r.feigeProxy.sonFeigeData.sid);
                    _.state > 3 ? this.childSpine.setKid(_.id, _.sex) : this.childSpineSmall.setKid(_.id, _.sex, !1);
                }
            }
        }
    },
    getLabels(t) {
        for (var e = [], i = (t = r.playerProxy.getReplaceName(t)).split("\n"), n = 0; n < i.length; n++) {
            var l = 0,
            a = i[n].length;
            if (a < FeigeDetailItem.countMax) e.push(i[n]);
            else for (; l < a;) {
                e.push(i[n].substr(l, a - l > FeigeDetailItem.countMax ? FeigeDetailItem.countMax: a - l));
                l += FeigeDetailItem.countMax;
            }
        }
        return e;
    },

});

FeigeDetailItem.countMax = 20;