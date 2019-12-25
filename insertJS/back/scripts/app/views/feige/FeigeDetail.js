var i = require("../../utils/Utils");
var n = require("../../Initializer");
var l = require("../../component/RenderListItem");
cc.Class({
    extends: cc.Component,
    properties: {
        itemPrefab: cc.Node,
        itemPrefabLeft: cc.Node,
        contextNode: cc.Node,
        recyclyNode: cc.Node,
        waitNode: cc.Node,
        lblContext1: cc.Label,
        lblContext2: cc.Label,
        scrollView: cc.ScrollView,
        nodeUnhave: cc.Node,
        nodeBtn: cc.Node,
        btnNext: cc.Node,
    },
    ctor() {
        this.curEmailGroup = null;
        this.curSelect = 0;
        this.curItem = null;
        this.isWait = !1;
        this.items = [];
        this.isRev = !1;
    },
    onLoad() {
        var t = this.node.openParam;
        if (null == t) {
            var e = this.node.openParam;
            t = n.feigeProxy.getSonfeigeData(e.id);
        }
        this.curEmailGroup = t;
        facade.subscribe(n.feigeProxy.UPDATE_READ, this.updateShowData, this);
        facade.subscribe("UPDATE_READ_SON", this.updateShowData, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickBack, this);
        this.updateShowData();
    },
    updateShowData() {
        var t = this.curEmailGroup,
        e = n.feigeProxy.getFeigeData(t.id),
        o = e ? e.select: [];
        if (n.feigeProxy.lookSonFeige) {
            o = n.feigeProxy.getSonFeigeItem(n.feigeProxy.sonFeigeData.id, n.feigeProxy.sonFeigeData.sid, n.feigeProxy.sonFeigeData.time).select;
        }
        var l = [],
        r = n.playerProxy.getEmailGroup(t.id, "group");
        this.recyclyNode.active = !1;
        this.itemPrefab.active = !1;
        this.itemPrefabLeft.active = !1;
        this.waitNode.active = !1;
        this.nodeUnhave.active = !1;
        r.sort(function(t, e) {
            return t.index - e.index;
        });
        for (var a = 0; a < r.length; a++) {
            this.curItem = r[a];
            var s = {};
            s.id = this.curItem.id;
            s.select = 0;
            l.push(s);
            if (! (o && o.length > a)) break; (s = {}).id = this.curItem.id;
            s.select = o && o.length > a ? o[a] : 0;
            l.push(s);
        }
        for (a = 0; a < l.length; a++) this.createAddItem(a, l[a]);
        this.recyclyNode.active = l.length % 2 == 1 && !i.stringUtil.isBlank(this.curItem.select1);
        this.isRev = 10 * Math.random() < 5;
        this.lblContext1.string = this.isRev ? this.curItem.select2: this.curItem.select1;
        this.lblContext2.string = this.isRev ? this.curItem.select1: this.curItem.select2;
        this.nodeUnhave.active = !this.recyclyNode.active;
        i.utils.showNodeEffect(this.nodeBtn, 0);
        this.scrollView.scrollToBottom();
        this.btnNext.active = !this.recyclyNode.active && n.feigeProxy.lookSonFeige && n.feigeProxy.hasSonFeige();
    },
    onClickText(t, e) {
        var o = parseInt(e);
        this.isWait = !0;
        this.curSelect = this.isRev ? (1 == o ? 2 : 1) : o;
        this.waitNode.active = !0;
        this.recyclyNode.active = !1;
        if (this.hasNext()) {
            this.createAddItem(1, {
                id: this.curItem.id,
                select: 1 == this.curSelect ? this.curItem.award1: this.curItem.award2
            });
            this.scheduleOnce(this.saveSelect, 2 * Math.random() + 2);
        } else this.saveSelect();
        this.scrollView.scrollToBottom();
    },
    hasNext() {
        var t = this.curEmailGroup,
        e = n.playerProxy.getEmailGroup(t.id, "group");
        return e[e.length - 1] != this.curItem;
    },
    createAddItem(t, e) {
        var o = this.items.length > t ? this.items[t].data: null;
        if (!o || o.id != e.id || o.select != e.select) {
            var i = t % 2 == 0 ? cc.instantiate(this.itemPrefab) : cc.instantiate(this.itemPrefabLeft);
            i.active = !0;
            var n = i.getComponent(l);
            n.data = e;
            this.items.push(n);
            this.contextNode.addChild(i);
        }
    },
    saveSelect() {
        if (0 != this.curSelect) {
            this.isWait = !1;
            this.waitNode.active = !1;
            n.feigeProxy.lookSonFeige ? n.feigeProxy.sendReadSonFeige(n.feigeProxy.sonFeigeData.sid, 1 == this.curSelect ? this.curItem.award1: this.curItem.award2, n.feigeProxy.sonFeigeData.time) : n.feigeProxy.sendReadFeige(1 == this.curSelect ? this.curItem.award1: this.curItem.award2);
        }
    },
    onClickClost() {
        this.isWait && this.saveSelect();
        i.utils.closeView(this);
        i.utils.closeNameView("feige/FeigeView", !0);
    },
    onClickBack() {
        this.isWait && this.saveSelect();
        i.utils.closeView(this);
    },
    onClickNext() {
        this.contextNode.removeAllChildren();
        this.items = [];
        this.scrollView.scrollToTop();
        if (n.feigeProxy.hasSonFeige()) {
            var t = n.feigeProxy.getUnReadSonMail();
            n.feigeProxy.sonFeigeData = t;
            var e = n.feigeProxy.getSonfeigeData(t.id);
            this.curEmailGroup = e;
            this.scrollView.scrollToTop();
            this.updateShowData();
        }
    },
});
