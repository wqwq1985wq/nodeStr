cc.Class({
    extends: cc.Component,
    properties: {
        lblCount: cc.Label,
        left: cc.Button,
        right: cc.Button,
        btnMax: cc.Button,
        baseCount:{
            set: function(t) {
                t <= 0 || (this._baseCount = t);
            },
            enumerable: !0,
            configurable: !0
        },
        showMmin:{
            set: function(t) {
                this._showMin = t;
                this.updateBtn();
            },
            enumerable: !0,
            configurable: !0
        },
        max:{
            get: function() {
                return this._max;
            },
            set: function(t) {
                this._max = t;
                this._max = this._max > 99 ? 99 : this._max;
                this.updateBtn();
            },
            enumerable: !0,
            configurable: !0
        },
        curValue:{
            get: function() {
                return this._curValue;
            },
            set: function(t) {
                this._curValue = t > this._max ? this._max: t;
                this._curValue = this._curValue < 1 ? 1 : this._curValue;
                this.updateBtn();
            },
            enumerable: !0,
            configurable: !0
        },
    },
    ctor() {
        this.changeHandler = null;
        this._max = 99;
        this._curValue = 1;
        this._showMin = 0;
        this._baseCount = 1;
    },

    onClickAdd(t, e) {
        var o = parseInt(e);
        this._curValue += o;
        this._curValue = this._curValue < 1 ? 1 : this._curValue;
        this._curValue = this._curValue > this.max ? this.max: this._curValue;
        this.updateBtn();
    },
    onClickMax(t, e) {
        this._curValue = this.max;
        this.updateBtn();
    },
    updateBtn() {
        this.lblCount && (this.lblCount.string = this._showMin + this.curValue * this._baseCount + "");
        this.left && (this.left.interactable = this.curValue > 1);
        this.right && (this.right.interactable = this.curValue < this.max);
        this.btnMax && (this.btnMax.interactable = this.curValue < this.max);
        this.changeHandler && this.changeHandler();
    },
});
