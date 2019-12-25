var i = require("../../component/List");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        unionWeath: cc.Label,
        list: i,
    },
    ctor() {},
    onLoad() {
        this.UPDATE_SEARCH_INFO();
        facade.subscribe("UPDATE_SEARCH_INFO", this.UPDATE_SEARCH_INFO, this);
        facade.subscribe("UPDATE_TRANS_LIST", this.UPDATE_TRANS_LIST, this);
        l.unionProxy.sendTranList();
    },
    eventClose() {
        n.utils.closeView(this);
    },
    onClickTran(t, e) {
        var o = e.data;
        if (o) {
            l.unionProxy.dialogParam = {
                type: "tran",
                id: o.id
            };
            l.unionProxy.sendTran("", o.id);
            n.utils.closeView(this);
        }
    },
    UPDATE_SEARCH_INFO() {
        this.unionWeath.string = l.unionProxy.clubInfo.fund + "";
        this.UPDATE_TRANS_LIST();
    },
    UPDATE_TRANS_LIST() {
        this.list.data = l.unionProxy.transList;
    },
});
