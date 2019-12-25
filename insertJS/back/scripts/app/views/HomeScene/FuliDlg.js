var HomeData = require('HomeData');
var LocalData = require('LocalData');
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
    		this.node.destroy();
    	};
    },

    setCallback: function(func){
        this.func = func;
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    onSignCallback: function(){
    	this.func(1);
        // this.onCloseCallback();
    },

    onInviteCallback: function(){
        this.func(2);
        // this.onCloseCallback();
    },

    onShareCallback: function(){
    	this.func(3);
        // this.onCloseCallback();
    },

    start:function() {

    },

});