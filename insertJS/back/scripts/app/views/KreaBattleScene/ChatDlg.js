var Enum = require('Enum');
var Util = require('Util');
var Cards = require('Cards');
var CommMsg = require("CommMsg");
var BattleNetHelper = require('BattleNetHelper');
var EventEmitter = require('EventEmitter');
var ViewCommon = require('ViewCommon');
var LocalData = require('LocalData');

cc.Class({
    extends: cc.Component,

    properties: {
    	pnl1: cc.Node,
    	pnl2: cc.Node,
    	pnlContent: cc.Node,
    	pnlChatItem: cc.Prefab,
        imgDi: cc.Node,
    	btnArr: {
            default: [],
            type: cc.Button,
        },
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

    	this.pnl1.active = true;
    	this.pnl2.active = false;

    	this.chatMsgs = CommMsg.chatMsgs;
    	this.chatNode = new Array();
    	for (var i = 0; i < this.chatMsgs.length; i++) {
    		var node = cc.instantiate(this.pnlChatItem);
    		this.pnlContent.addChild(node);
    		this.txtMsg = node.getChildByName("btnChatMsg").getChildByName("txtMsg").getComponent(cc.Label).string = this.chatMsgs[i];
    		var btn = node.getChildByName("btnChatMsg").getComponent(cc.Button);
    		var clickEventHandler = new cc.Component.EventHandler();
	        clickEventHandler.target = this.node;
	        clickEventHandler.component = "ChatDlg";
	        clickEventHandler.handler = "onChatMsgCallback";
	        clickEventHandler.customEventData = i;
	        btn.clickEvents.push(clickEventHandler);
    	};
    },

    onTouchEnded: function(event){
        if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
            this.node.destroy();
        };
    },

    start:function() {

    },

    onChatMsgCallback: function(event,data){
    	BattleNetHelper.reqSendMsg(1,data);
    	this.node.destroy();
    },

    onChatCallback: function(){
    	this.pnl1.active = true;
    	this.pnl2.active = false;
    },

    onFaceCallback: function(){
    	this.pnl1.active = false;
    	this.pnl2.active = true;
    },

    onExpreCallback: function(event,data){
    	BattleNetHelper.reqSendMsg(2,data);
    	this.node.destroy();
    },

});