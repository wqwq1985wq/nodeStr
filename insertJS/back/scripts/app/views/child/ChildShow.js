var i = require("../../utils/Utils");
var n = require("../../component/ChildSpine");
var l = require("../../Initializer");
var r = require("../servant/ServantStarShow");
var a = require("../../component/List");
cc.Class({
    extends: cc.Component,
    properties: {
        childSpine:n,
        e1:cc.Label,
        e2:cc.Label,
        e3:cc.Label,
        e4:cc.Label,
        lblDes:cc.Label,
        stars:r,
        list:a,
    },

    ctor() {
        this.cList = [];
        this.curIndex = 0;
    },
    onLoad() {
        this.cList = this.node.openParam;
        this.showChild();
    },
    showChild() {
        var t = this.node.openParam;
        if (null != t) {
            var e = t[this.curIndex];
            if (e) {
                var o = localcache.getItem(localdb.table_wife, e.wifeid);
                this.lblDes.string = i18n.t("WIFE_CHU_YOU_CHILD_" + e.babysex, {
                    name: o.wname2
                });
                var i = l.sonProxy.getSon(e.babyid);
                this.e1.string = i.ep.e1 + "";
                this.e2.string = i.ep.e2 + "";
                this.e3.string = i.ep.e3 + "";
                this.e4.string = i.ep.e4 + "";
                this.childSpine.setKid(i.id, i.sex, !1);
                this.stars.setValue(i.talent);
                this.list.node.x = -this.list.node.width / 2;
            }
        }
    },
    onClickClose() {
        if (this.cList.length - 1 <= this.curIndex) i.utils.closeView(this);
        else {
            this.curIndex++;
            this.showChild();
        }
    },
});
