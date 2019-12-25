var i = require("./UserHeadItem");
var n = require("../../component/List");
var l = require("../../utils/Utils");
var r = require("../../Initializer");
var a = require("../../Config");
cc.Class({
    extends: cc.Component,
    properties: {
        lblName:cc.Label,
        lblDes:cc.Label,
        headItem:i,
        list:n,
        scroll:cc.ScrollView,
        nodeHead:cc.Node,
        nodeBlank:cc.Node,
    },

    ctor(){
        this._head = 1;
        this._blank = 1;
    },

    onLoad() {
        if (null != r.playerProxy.headavatar) {
            this._blank = r.playerProxy.headavatar.blank;
            var t = localcache.getItem(
                localdb.table_userhead,
                r.playerProxy.headavatar.head
            );
            this._head =
                0 == r.playerProxy.headavatar.head ||
                (t && 0 != t.job && t.job != r.playerProxy.userData.job)
                    ? r.playerProxy.userData.job + 1e4
                    : r.playerProxy.headavatar.head;
        } else this._head = r.playerProxy.userData.job + 1e4;
        this.onClickHead(null, -1);
    },
    onClickClost() {
        l.utils.closeView(this);
    },
    onClickOk() {
        null != localcache.getItem(localdb.table_userhead, this._head) &&
            (r.playerProxy.isHaveBlank(this._blank)
                ? r.playerProxy.sendHeadBlank(this._head, this._blank)
                : l.alertUtil.alert18n("USER_UNHAVE_BLANK"));
    },
    onClickHeadItem(t, e) {
        var o = e.data;
        if (null != o.blankmodel) {
            this._blank = o.id;
            this.lblDes.string = o.des + "";
            this.lblName.string = o.name + "";
        } else this._head = o.id;
        this.headItem.setHead(this._head, this._blank);
    },
    onClickHead(t, e) {
        var o = parseInt(e);
        this.nodeHead.active = -1 == o;
        this.nodeBlank.active = 1 == o;
        this.lblDes.node.active = this.lblName.node.active = -1 == o;
        this.list.data = -1 == o ? this.getBlankList() : this.getHeadList();
        this.scroll.scrollToTop();
        if (-1 == o) {
            var i = localcache.getItem(
                localdb.table_userblank,
                this._blank
            );
            if (i) {
                this.lblDes.string = i.des + "";
                this.lblName.string = i.name + "";
            }
        }
    },
    getBlankList() {
        for (
            var t = localcache.getList(localdb.table_userblank),
                e = [],
                o = 0;
            o < t.length;
            o++
        )
            0 != t[o].type &&
                ((null != t[o].display &&
                    0 != t[o].display.length &&
                    -1 == t[o].display.indexOf(a.Config.pf)) ||
                    e.push(t[o]));
        return e;
    },
    getHeadList() {
        for (
            var t = localcache.getList(localdb.table_userhead),
                e = [],
                o = r.playerProxy.userData.job,
                i = 0;
            i < t.length;
            i++
        )
            (0 != t[i].job && t[i].job != o) || e.push(t[i]);
        return e;
    },
});