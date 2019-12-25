var EventEmitter = require('EventEmitter');
var PlayerData = require('PlayerData');
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var LocalData = require('LocalData');

cc.Class({
    extends: cc.Component,

    properties: {
    	prefabPlayer: cc.Prefab,

    	playerArr: {
            default: [],
            type: cc.Node,
        },
    },

    onLoad:function(){
    	
    },

    start:function() {
        this.registerMsg();
    },

    onDestroy:function(){
    	this.unRegisterMsg();
    },

    registerMsg:function(){
    	EventEmitter.on("Client"+SocketID.SYNC_ROOMINFO,this.updateUI,this);
    },

    unRegisterMsg:function(){
    	EventEmitter.off("Client"+SocketID.SYNC_ROOMINFO,this.updateUI,this);
    },

    updateUI: function(){
    	this.roomBaseInfo = BattleData.getRoomBaseInfo();

    	this.roomPlayerInfo = BattleData.getRoomPlayerInfo();


    	var myPos = -1;
    	for (var i = 0; i < this.roomPlayerInfo.length; i++) {
            var info = this.roomPlayerInfo[i];
            this.playerArr[i].getChildByTag(100).getComponent('BattlePlayerHead').updateUI(info,this.roomBaseInfo);
            this.playerArr[i].getChildByTag(100).getComponent('BattlePlayerHead').setCallback(this.onHeadCallback.bind(this));

            if (this.hasSetPos == false && info.uid == PlayerData.getPlayerId()) {
            	myPos = i;
            };
        };

        //回放处理
        if (this.hasSetPos == false && myPos == -1 && BattleData.isCardRecord()) {
            myPos = 0;
        };

        if (this.hasSetPos == false && myPos > -1) {
        	this.hasSetPos = true;
        	this.playerArr[myPos].position = cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+95,-cc.winSize.height/2/LocalData.getPnlScale()+370);
        	var pos = myPos + 1;
        	if (pos == 3) {
        		pos = 0;
        	};
        	this.playerArr[pos].position = cc.v2(cc.winSize.width/2/LocalData.getPnlScale()-95,cc.winSize.height/2/LocalData.getPnlScale()-250);
        	pos = pos + 1;
        	if (pos == 3) {
        		pos = 0;
        	};
        	this.playerArr[pos].position = cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+95,cc.winSize.height/2/LocalData.getPnlScale()-200);
        };
    },

    onHeadCallback: function(){
        
    },

    init: function(){
    	//用于处理我的位置永远在正前方
    	this.hasSetPos = false;
    	

    	for (var i = 0; i < 3; i++) {
    		var playerNode = cc.instantiate(this.prefabPlayer);	
    		var anchor = this.playerArr[i];
    		anchor.addChild(playerNode,1,100);
    		var playerJS = playerNode.getComponent('BattlePlayerHead');
    		playerJS.init(i);
    		playerNode.position = cc.v2(0,0);
    	};

    	this.updateUI();
    },

});