var i = require("../utils/Utils");
var n = require("../views/item/ItemSlotUI");
var l = require("../utils/UIUtils");
var r = require("./SelectMax");
var ConfirmView = cc.Class({
    extends: cc.Component,
    properties: {
        textLabel: cc.RichText,
        lblLeft: cc.Label,
        lblRight: cc.Label,
        itemSlot: n,
        silder: r,
        edit: cc.EditBox,
        toggle: cc.Toggle,
        lblcount: cc.Label,
    },
    ctor() {},

    onLoad() {
        this.edit && (this.edit.placeholder = i18n.t("COMMON_INPUT_TXT"));
        var t = this.node.openParam;
        if (t) {
            this.textLabel.string = t.txt;
            var e = t.skip;
            this.toggle && (this.toggle.node.active = !i.stringUtil.isBlank(e));
            if (!i.stringUtil.isBlank(e) && ConfirmView.checks[e]) {
                this.node.active = !1;
                this.onClickOK(null, 1);
                return;
            }
            this.toggle && (this.toggle.isChecked = ConfirmView.checks[e]);
            t.color && (this.textLabel.node.color = t.color);
            if (this.itemSlot) {
                var n = new l.ItemSlotData();
                n.id = t.itemId;
                n.count = t.count;
                this.itemSlot.data = n;
                if (this.silder) {
                    this.silder.baseCount = t.baseCount;
                    this.silder.node.active && (t.baseCount && 0 != t.baseCount ? (this.silder.max = Math.floor(t.count / t.baseCount)) : (this.silder.max = t.count));
                }
            }
            this.edit && (this.edit.placeholder = t.txt);
            this.lblcount && (this.lblcount.string = i18n.t("COMMON_HOLD") + this.lblcount.string);
            this.lblLeft && (this.lblLeft.string = t.left ? t.left: i18n.t("COMMON_YES"));
            this.lblRight && (this.lblRight.string = t.right ? t.right: i18n.t("COMMON_NO"));
        }
    },
    onClickOK(t, e) {
        void 0 === e && (e = null);
        var n = this.node.openParam;
        if (n && n.handler) {
            if (this.toggle) {
                var l = n.skip;
                i.stringUtil.isBlank(l) || null != e || (ConfirmView.checks[l] = this.toggle.isChecked);
            }
            n.target ? this.silder ? n.handler.apply(n.target, [this.silder.node.active ? this.silder.curValue: 1]) : this.edit ? n.handler.apply(n.target, [this.edit.string]) : n.handler.apply(n.target) : this.silder ? n.handler(this.silder.node.active ? this.silder.curValue: 1) : this.edit ? n.handler(this.edit.string) : n.handler();
        }
        i.utils.closeView(this);
    },
    onClickCancel() {
        var t = this.node.openParam;
        if(t.cancel)
        {
            console.log("cancel cancel cancel");
            t.cancel()
            return;
        }
        t && t.right && !i.stringUtil.isBlank(t.right) && t && t.handler && (t.target ? t.handler.apply(t.target, ConfirmView.NO) : t.handler(ConfirmView.NO));
        i.utils.closeView(this);
    },
});

ConfirmView.checks = {};
ConfirmView.NO = "NO";
ConfirmView.isSkip = function(t) {
    if (!i.stringUtil.isBlank(t.skip) && ConfirmView.checks[t.skip]) {
        t.target ? t.handler.apply(t.target) : t.handler();
        return ! 0;
    }
    return ! 1;
};