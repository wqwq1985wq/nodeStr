

cc.Class({
    extends:cc.Component,

    properties: {
        string:{
            visible:false,
            get: function () {
                return this._str;
            },
            set: function (value) {
                if (this.targetLabel) {
                    this.targetLabel.string = value;
                }
                if (this.shadowLabel) {
                    this.shadowLabel.string = value;
                }
                this._str = value;
            },
        },

        color:{
            visible:false,
            set: function (c) {
                if (this.shadowLabel) {
                    this.shadowLabel.node.color = c;
                }
                else if (this.targetLabel) {
                    this.targetLabel.node.color = c;
                }
                this._color = c;
            },
        },

    },

    ctor(){

        this.targetLabel = null;
        this.shadowLabel = null;
        this._str = null;
        this._color = null;
    },

    onLoad : function () {
        if (this.node.parent.getComponent("LabelShadow")) {
            this.destroy();
            return;
        }
        if (this.targetLabel == null) {
            this.targetLabel = this.node.getComponent(cc.Label);
            if (this.targetLabel == null) {
                return;
            }
        }
        if (this.shadowLabel == null) {
            var node = cc.instantiate(this.targetLabel.node);
            this.shadowLabel = node.getComponent(cc.Label);
            this.targetLabel.node.addChild(node);
            node.x = -1;
            node.y = 1;
            this.targetLabel.node.color = cc.Color.WHITE.fromHEX("#8D2939");
        }
        if (this._str != null) {
            this.string = this._str;
        }
        if (this._color != null) {
            this.color = this._color;
        }
    },

});