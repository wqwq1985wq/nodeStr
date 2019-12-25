var HomeData = require('HomeData');
var EventEmitter = require('EventEmitter');
var ViewCommon = require('ViewCommon');
var SocketID = require('SocketID');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
    	imgTitle: cc.Node,

    	label1: cc.Sprite,
    	label2: cc.Sprite,
    	label3: cc.Sprite,
    	label4: cc.Sprite,
    	label5: cc.Sprite,
    	label6: cc.Sprite,

    	spNumFrames: {
            default: [],
            type: cc.SpriteFrame,
        },

    	btn0: cc.Button,
    	btn1: cc.Button,
    	btn2: cc.Button,
    	btn3: cc.Button,
    	btn4: cc.Button,
    	btn5: cc.Button,
    	btn6: cc.Button,
    	btn7: cc.Button,
    	btn8: cc.Button,
    	btn9: cc.Button,
    	btnClear: cc.Button,
    	btnBack: cc.Button,
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
        
     	this.label1.spriteFrame = null;
     	this.label2.spriteFrame = null;
     	this.label3.spriteFrame = null;
     	this.label4.spriteFrame = null;
     	this.label5.spriteFrame = null;
     	this.label6.spriteFrame = null;

    	this.roomId = "";

		this.node.on("touchend", this.onTouchEnded, this);
    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    start:function() {

    },

    onBtnNumCallback:function(event,data){
    	var num = data;
    	if (this.roomId.length < 6) {
    		this.roomId = this.roomId + num;

    		this["label"+this.roomId.length].spriteFrame = this.spNumFrames[num];
    	};

    	if (this.roomId.length == 6) {
            var params = new Array();
            params.socketID = SocketID.GET_ROOM_BY_ID;
            params.roomId = parseInt(this.roomId);
            EventEmitter.emit("WaitingDlgShowEvent",params);
    		HomeData.reqGetRoomById(parseInt(this.roomId));
    	};
    },

    onBackCallback: function(){
    	if (this.roomId.length > 1) {
    		this["label"+this.roomId.length].spriteFrame = null;

    		this.roomId = this.roomId.substring(0,this.roomId.length-1);
    	}else{
    		this.roomId = "";

    		this.label1.spriteFrame = null;
    	};
    },

    onClearCallback: function(){
    	this.roomId = "";

    	for (var i = 0; i < 6; i++) {
    		this["label"+(i+1)].spriteFrame = null;
    	};
    },



});
