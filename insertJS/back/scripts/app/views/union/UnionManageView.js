var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        lblTips: cc.Label,
        list: i,
        scroll: cc.Node,
    },
    ctor() {},
    onLoad() {
        this.lblTips.string = i18n.t("union_zhuanrang_tip");
        var t = n.unionProxy.memberInfo;
        if (t) {
            var e = n.unionProxy.applyList && n.unionProxy.applyList.length > 0;
            1 == t.post ? (this.list.data = [{
                name: "UNION_MSG_TITLE",
                index: 1
            },
            {
                name: "UNION_APPLY_WORD",
                index: 2,
                red: e
            },
            {
                name: "UNION_ZHUANG_RANG",
                index: 3
            },
            {
                name: "UNION_JIE_SAN",
                index: 4
            }]) : 2 == t.post && (this.list.data = [{
                name: "UNION_MSG_TITLE",
                index: 1
            },
            {
                name: "UNION_APPLY_WORD",
                index: 2,
                red: e
            }]);
        }
        this.scroll.y = 1 == t.post ? 197 : 111;
    },
    eventClose() {
        l.utils.closeView(this);
    },
    onClickBtn(t, e) {
        var o = e.data;
        if (o) {
            switch (o.index) {
            case 1:
                l.utils.openPrefabView("union/UnionModify");
                break;
            case 2:
                l.utils.openPrefabView("union/UnionApply");
                break;
            case 3:
                l.utils.openPrefabView("union/TransferView");
                break;
            case 4:
                n.unionProxy.dialogParam = {
                    type: "dimss"
                };
                l.utils.openPrefabView("union/UnionDismiss");
            }
            this.eventClose();
        }
    },
});
