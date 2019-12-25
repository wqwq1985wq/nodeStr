var i = require("../../utils/Utils");
var n = require("../../utils/UIUtils");
var l = require("../../component/List");
var r = require("../../component/StateImg");
var a = require("../../Initializer");
var s = require("../../models/PlayerProxy");
var c = require("../../models/JiulouProxy");
var _ = require("../../component/SelectMax");
cc.Class({
    extends: cc.Component,
    properties: {
        lblMoeny: cc.Label,
        lblFood: cc.Label,
        lblGold: cc.Label,
        lblCurLuck: cc.Label,
        luckCount: _,
        autoMoney: cc.Toggle,
        autoFood: cc.Toggle,
        list: l,
        luckImg: r,
    },
    ctor() {
        this.lastData = new s.RoleData();
        this.l = [];
    },
    onLoad() {
        this.updateRole();
        this.udpateCurLuck();
        this.updateZhenzai();
        facade.subscribe(a.playerProxy.PLAYER_USER_UPDATE, this.updateRole, this);
        facade.subscribe(a.lookProxy.UPDATE_XUNFANG_RECOVER, this.udpateCurLuck, this);
        facade.subscribe(a.lookProxy.UPDATE_XUNFANG_ZHENZAI, this.updateZhenzai, this);
    },
    updateZhenzai() {
        this.l = [];
        for (var t = 1; t < 4; t++) {
            var e = new c.JiulouChooseData();
            e.type = t;
            e.add = 3 == t ? 10 : 2;
            e.cost = 3 == t ? 0 : 2e4;
            e.itemId = 1 == t ? 2 : 2 == t ? 3 : 1;
            this.l.push(e);
        }
        this.list.data = this.l;
    },
    updateZhenzaiCost() {
        this.list.data = this.l;
    },
    udpateCurLuck() {
        this.luckImg.total = 10;
        this.luckImg.value = Math.floor(a.lookProxy.recover.num / 10);
        this.autoFood.isChecked = 1 == a.lookProxy.recover.auto3;
        this.autoMoney.isChecked = 1 == a.lookProxy.recover.auto2;
        this.luckCount.max = 90;
        this.luckCount.curValue = 1 == a.lookProxy.recover.ysSet ? 80 : a.lookProxy.recover.ysSet;
        this.lblCurLuck.string = a.lookProxy.recover.num + "";
    },
    updateRole() {
        n.uiUtils.showNumChange(this.lblMoeny, this.lastData.coin, a.playerProxy.userData.coin);
        n.uiUtils.showNumChange(this.lblFood, this.lastData.food, a.playerProxy.userData.food);
        n.uiUtils.showNumChange(this.lblGold, this.lastData.cash, a.playerProxy.userData.cash);
        this.lastData.coin = a.playerProxy.userData.coin;
        this.lastData.food = a.playerProxy.userData.food;
        this.lastData.cash = a.playerProxy.userData.cash;
    },
    onClickSet() {
        a.lookProxy.sendYunshi(this.autoMoney.isChecked ? 1 : 0, this.autoFood.isChecked ? 1 : 0, this.luckCount.curValue);
    },
    onClickClost() {
        i.utils.closeView(this);
    },
});
