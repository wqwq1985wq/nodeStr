var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        imgDi: cc.Node,

    },

    onLoad: function(){
        this.pnlMid = this.node.getChildByName("pnlMid");
        if (this.pnlMid) {
            ViewCommon.playDlgAction(this.pnlMid);
        };
        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);
        this.node.on("touchend", this.onTouchEnded, this);
    },

    onTouchEnded: function(event){
        if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
            this.func(0);
            this.node.destroy();
        };
    },

    start:function() {

    },

    onAgreeCallback: function(){
    	this.func(2);
    	this.node.destroy();
    },

    setCallback: function(func){
    	this.func = func;
    },

    onRefuseCallback: function(){
    	var params = new Array();
        params["title"] = "您确定要拒绝用户协议吗？这将导致您无法进入游戏！";
        params['ok_func'] = this.agreeCb.bind(this);
        params['no_func'] = this.refuseCb.bind(this);
    	ViewCommon.showDlgTwo(params);
    },

    agreeCb: function(){
    	this.func(1);
    	this.node.destroy();
    },

    refuseCb: function(){

    },

    onCloseCallback: function(){
        this.func(0);
        this.node.destroy();
    },

});