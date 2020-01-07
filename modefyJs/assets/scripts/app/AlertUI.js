

cc.Class({
    extends:cc.Component,

    properties: {
        textLabel:cc.Label,
        lbl:cc.Label,
    },

    ctor(){
        this.text = "";
        this.textOpt = null;
        this.textColor = null;
        this.endCall = null;
    },
    cc.zy.zyConfig
    onLoad : function () {
        if (this.textLabel != null) {
            if (this.textOpt == null) {
                this.textLabel.string = this.text;
            }
            else {
                this.textLabel.string = i18n.t(this.text, this.textOpt);
            }
            if (this.textColor != null) {
                this.textLabel.node.color = this.textColor;
            }
            this.lbl.string = this.textLabel.string;
        }
    },

    onAlertEnd : function () {
        if (this.endCall != null) {
            this.endCall.call();
        }
        this.node.removeFromParent(true);
        this.node.destroy();
    },

});