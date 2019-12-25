var initializer = require("../../Initializer");
var utils = require("../../utils/Utils");

cc.Class({
    extends:cc.Component,

    properties: {
        key:{
            visible:false,
            get: function () {
                return utils.stringUtil.isBlank(this._key) ? "" : "-" + this._key;
            },
            set: function (value) {
                this.onDestroy();
                this._key = value;
                this.start();
            },
        },

        btnUI:"",
        btnName:"",
    },

    ctor(){
        this._key = "";
    },

    start : function () {
        if (initializer.guideProxy.guideUI)
            initializer.guideProxy.guideUI.setItem(this.btnUI + "-" + this.btnName + this.key, this);
    },

    onDestroy : function () {
        if (initializer.guideProxy.guideUI)
            initializer.guideProxy.guideUI.setItem(this.btnUI + "-" + this.btnName + this.key, null);
    },

});
