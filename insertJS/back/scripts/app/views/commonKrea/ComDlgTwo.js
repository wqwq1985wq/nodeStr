var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	txtMsg: cc.Label,
        btnOk: cc.Button,
        btnCancel: cc.Button,
    },

    onLoad: function(){
        this.pnlMid = this.node.getChildByName("pnlMid");
        if (this.pnlMid) {
            this.pnlMid.runAction(
                cc.sequence(
                    cc.scaleTo(0,0),
                    cc.scaleTo(0.5,1).easing(cc.easeBackOut())
                )
            );
        };
        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);
        this.btnOk.node.getChildByName("Label").getComponent(cc.Label).string = "确定";
        this.btnCancel.node.getChildByName("Label").getComponent(cc.Label).string = "取消";
    },

    start:function() {

    },

    setCallback:function(okFunc,noFunc){
        this.okFunc = okFunc;
        this.noFunc = noFunc;
    },

    updateUI: function(params){
        this.txtMsg.string = params.title;
        if (params.oktitle) {
            this.btnOk.node.getChildByName("Label").getComponent(cc.Label).string = params.oktitle;
        };
        if (params.notitle) {
            this.btnCancel.node.getChildByName("Label").getComponent(cc.Label).string = params.notitle;
        };

        if (params.ok_func) {
            this.okFunc = params.ok_func;
        };
        if (params.no_func) {
            this.noFunc = params.no_func;
        };
    },

    onOkCallback: function(){
        if (this.okFunc) {
            this.okFunc();
        };
        this.node.destroy();
    },

    onCancelCallback: function(){
    	if (this.noFunc) {
            this.noFunc();
        };
        this.node.destroy();
    },


});