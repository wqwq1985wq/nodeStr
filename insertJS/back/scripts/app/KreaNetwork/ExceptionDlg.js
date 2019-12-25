var EventEmitter = require('EventEmitter');
var ReconnectFunc = require('ReconnectFunc');
var ViewCommon = require('ViewCommon');
// var LoginData = require('LoginData');

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
            ViewCommon.playDlgAction(this.pnlMid);
        };
        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);
    },

    start:function() {
    	this.txtMsg.string = "你的网络断了呦~~~";
    	this.btnOk.node.getChildByName("Label").getComponent(cc.Label).string = "抢救一下";
    	this.btnCancel.node.getChildByName("Label").getComponent(cc.Label).string = "退出游戏";

    	EventEmitter.on("SocketPushConnectSucc",this.onConnected,this);
    },

    setCallback:function(func){
    	this.func = func;
    },

    onDestroy:function(){
    	EventEmitter.off("SocketPushConnectSucc",this.onConnected,this);
    },

    onConnected:function(){
    	this.node.destroy();
    },

    onOkCallback: function(){
    	this.func();
    	this.checkRetry();
    },

    onCancelCallback: function(){
        // if (LoginData.GamePlatform == 2) {
            wx.exitMiniProgram();
        // }else{
        //     cc.director.end();
        // };
    },

    checkRetry: function(){
    	ReconnectFunc.excute(1);
    },


});