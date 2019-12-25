var i = require("../../component/RenderListItem");
var n = require("../item/ItemSlotUI");
var l = require("../../Initializer");
var r = require("../../utils/Utils");
cc.Class({
    extends: i,
    properties: {
        lblDay: cc.Label,
        lblState: cc.Label,
        itemSlot2: n,
        btn: cc.Button,
        effect: cc.Node,
        qiandao: cc.Node,
    },
    ctor() {},
    showData() {
        var t = this._data;
        if (t) {
            var e = localcache.getItem(localdb.table_qiandaoReward, t.rwdId);
            this.lblDay.string = t.day + "";
            this.lblState.string = 1 == t.isQiandao ? "": i18n.t("WELFARE_UNQIANDAO");
            this.itemSlot2.data = e.qiandaoRwd.length > 0 ? e.qiandaoRwd[0] : null;
            this.itemSlot2.setGray(0 != t.isQiandao);
            this.btn.interactable = 0 == t.isQiandao;
            this.effect.active = t.day == l.welfareProxy.qiandao.days && 0 == t.isQiandao;
            this.qiandao.active = 1 == t.isQiandao;
        }
    },
    onClickItem() {
        var t = this._data;
        t && !t.isQiandao && 0 == l.welfareProxy.qiandao.qiandao ? l.welfareProxy.sendQiandao() : r.alertUtil.alert18n("WELFARE_QIANDAO_LIMIT");
    },
});
