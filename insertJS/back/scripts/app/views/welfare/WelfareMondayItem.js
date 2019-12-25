var i = require("../../component/RenderListItem");
var n = require("../../component/List");
var l = require("../../Initializer");
var r = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        title: cc.Label,
        lblday: cc.Label,
        list: n,
    },
    ctor() {},
    showData() {
        var t = [],
        e = this.data.dayRwd;
        if (e) {
            for (var o = 0; o < e.length; o++) {
                var i = e[o];
                if (null != i.itemid) {
                    i.id = i.itemid;
                    t.push(i);
                }
            }
            this.list.data = t;
            var n = r.timeUtil.getCurData(),
            a = this.data.dayid;
            if (1 == l.welfareProxy.zhouqian.isrwd && n == a) this.lblday.string = i18n.t("WELFARE_CAN_GET");
            else if (2 == l.welfareProxy.zhouqian.isrwd && n == a) this.lblday.string = i18n.t("WELFARE_CANT_GET");
            else {
                var s = a - n;
                s < 0 && (s += 7);
                this.lblday.string = i18n.t("WELFARE_TIME_WEAK", {
                    day: s
                });
            }
            this.title.string = i18n.t("WELFARE_RWD_WEAK", {
                day: this.getWeekly(a)
            });
        }
    },
    onClickItem() {
        var t = this.data,
        e = r.timeUtil.getCurData(),
        o = this.data.dayid;
        if (t && 1 == l.welfareProxy.zhouqian.isrwd && e == o) l.welfareProxy.senMonday();
        else if (2 == l.welfareProxy.zhouqian.isrwd && e == o) {
            var i = i18n.t("WELFARE_WEEK_LIMIT", {
                day: this.getWeekly(o)
            });
            r.alertUtil.alert18n(i);
        } else {
            i = i18n.t("WELFARE_LIMIT_WEAK", {
                day: this.getWeekly(o)
            });
            r.alertUtil.alert18n(i);
        }
    },
    getWeekly(t) {
        return i18n.t("WELFARE_WEEK").split("|")[t - 1];
    },
});
