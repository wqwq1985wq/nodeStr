var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
        lblRwd: cc.Label,
    },
    ctor() {
        this.canClose = !1;
        this._curIndex = -1;
    },
    onLoad() {
        this.list.data = [{
            index: 0
        },
        {
            index: 1
        },
        {
            index: 2
        },
        {
            index: 3
        },
        {
            index: 4
        },
        {
            index: 5
        }];
        facade.subscribe(l.dalishiProxy.UPDATE_DALISHI_WIN, this.onUpdateWin, this);
        this.lblRwd.string = "";
    },
    testWin() {
        l.dalishiProxy.win = {};
        l.dalishiProxy.win.rwd = {};
        l.dalishiProxy.win.rwd.items = [];
        l.dalishiProxy.win.rwd.items.push({
            id: l.dalishiProxy.info.qhid,
            count: 12,
            kind: 5
        });
        this._curIndex = Math.floor(6 * Math.random());
        this.onUpdateWin();
    },
    onUpdateWin() {
        var t = [];
        this.canClose = !0;
        for (var e = 0; e < 6; e++) e == this._curIndex ? t.push(l.dalishiProxy.win.rwd.items[0]) : t.push({
            index: e
        });
        var o = l.dalishiProxy.win.rwd.items[0];
        this.lblRwd.string = i18n.t("DALISI_RWD_TIP", {
            n: l.playerProxy.getKindIdName(o.kind, o.id),
            d: o.count
        });
        this.list.data = t;
        this.scheduleOnce(this.onShowEnd, 1);
    },
    onShowEnd() {
        var t = l.dalishiProxy.getAwardReward(l.dalishiProxy.win.rwd.items[0], this._curIndex);
        this.list.data = t;
    },
    onClickItem(t, e) {
        var o = e.data;
        if (null == o.id && -1 == this._curIndex) {
            this._curIndex = o.index;
            l.dalishiProxy.sendRwd();
        }
    },
    onClickClost() {
        if (this.canClose) {
            n.utils.closeView(this);
            l.dalishiProxy.openShop();
        }
    },
});
