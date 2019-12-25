var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
    },
    ctor() {},
    onLoad() {
        if (l.fightProxy.isBoss) {
            this.list.data = l.fightProxy.pvbData ? l.fightProxy.pvbData.items: null;
            l.fightProxy.isBoss = !1;
        } else this.list.data = l.fightProxy.pveData ? l.fightProxy.pveData.items: null;
        this.list.node.x = -this.list.node.width / 2;
    },
    onClickView() {
        if (n.utils.closeView(this)) {
            facade.send("FIGHT_CLOST_WIN_VIEW");
            l.fightProxy.initSmapData();
            l.taskProxy.setDelayShow(!1);
        }
    },
});
