var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
    },
    ctor() {},
    onLoad() {
        var t = this.node.openParam;
        if (t) {
            for (var e = [], o = 0; o < t.length; o++) {
                var i = t[o],
                n = new l.ItemSlotData();
                n.id = i.id;
                n.count = i.count;
                e.push(n);
            }
            this.list.data = e;
            this.list.node.x = -this.list.node.width / 2;
        }
    },
    onClickClose() {
        n.utils.closeView(this);
    },
});
