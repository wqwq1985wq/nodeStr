var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var SignData = require('SignData');
var ShaderUtils = require("ShaderUtils");
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        imgDi: cc.Node,
        txtTitle:cc.Label,
        panel1: cc.Node,
        btnGet: cc.Button,

        prefabSignItem: cc.Prefab,
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
    	this.registerMsg();

        this.node.on("touchend", this.onTouchEnded, this);

        SignData.reqGetSignInfo();
    },

    onDestroy: function(){
    	this.unRegisterMsg();
    },

    registerMsg: function(){
    	EventEmitter.on("Client"+SocketID.GET_SIGNINFO,this.updateUI,this);

    	EventEmitter.on("Client"+SocketID.GET_SIGNAWARD,this.onGetSignAward,this);
    },

    unRegisterMsg: function(){
    	EventEmitter.off("Client"+SocketID.GET_SIGNINFO,this.updateUI,this);

    	EventEmitter.off("Client"+SocketID.GET_SIGNAWARD,this.onGetSignAward,this);
    },

    onGetSignAward: function(){
    	this.onCloseCallback();
    },

    updateUI: function(){
    	this.panel1.removeAllChildren();

    	var cfg = SignData.SignCfg;

    	this.data = SignData.signInfo;
    	var signDay = this.data.sign_day;
    	var nowDay = this.data.now_day;
    	
    	this.times = parseInt(this.data.total_times);
    	var got = false;
    	//已领取
    	if (signDay == nowDay) {
    		got = true;
    		this.btnGet.interactable = false;
    		ShaderUtils.setShader(this.btnGet.getComponent(cc.Sprite), "gray");
    		this.btnGet.node.getChildByName("Label").color = new cc.Color(76,79,98,255);
    	}else if ((nowDay-signDay)>24*60*60) {
    		this.times = 1;
    		this.btnGet.interactable = true;
    	}else if ((nowDay-signDay)<=24*60*60) {
    		this.times = this.times + 1;
    		if (this.times > 5) {
    			this.times = 1;
    		};
    		this.btnGet.interactable = true;
    	};

    	var reward = cfg[this.times-1];
    	var num = (reward.split("|"))[1];

    	if (got) {
    		this.txtTitle.string = "今日奖励已领取，请明日再来！";
    	}else{
    		this.txtTitle.string = "连续签到第"+this.times+"天，您今天可以领取"+num+"钻石";
    	};

    	for (var i = 0; i < cfg.length; i++) {
    		var signItem = cc.instantiate(this.prefabSignItem);
	        this.panel1.addChild(signItem);
	        signItem.getComponent('SignItem').updateUI(i+1,cfg[i],this.times,got);
    	};
    },

    onTouchEnded: function(event){
        if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
            this.node.destroy();
        };
    },

    start:function() {

    },

    onGetCallback: function(){
    	SignData.reqGetSignAward();
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

});