var Enum = require('Enum');
var Util = require('Util');
var ViewCommon = require('ViewCommon');
var BattleNetHelper = require('BattleNetHelper');

cc.Class({
    extends: cc.Component,

    properties: {
    	pnlCardArr:{
    		default: [],
            type: cc.Node,
    	},
        pnlMid: cc.Node,
        btn1: cc.Button,
        btn2: cc.Button,
        btn3: cc.Button,

        atlasCard:cc.SpriteAtlas,
    },

    onLoad: function(){
    	this.animation = this.node.getComponent(cc.Animation);
    	this.animation.play();
    },

    start:function() {

    },

    //叫牌
    onBtn1Callback: function(){
    	BattleNetHelper.reqTrigger(this.cards[this.selectedIdx],1);
    },

    //撂龙
    onBtn2Callback: function(){
    	BattleNetHelper.reqTrigger(this.cards[this.selectedIdx],2);
    },

    //过
    onBtn3Callback: function(){
    	BattleNetHelper.reqTrigger(0,6);
    },

    onCard1Callback: function(){
    	this.selectCard(0);
    },

    onCard2Callback: function(){
    	this.selectCard(1);
    },

    onCard3Callback: function(){
    	this.selectCard(2);
    },

    onCard4Callback: function(){
    	this.selectCard(3);
    },

    onCard5Callback: function(){
    	this.selectCard(4);
    },

    onCard6Callback: function(){
    	this.selectCard(5);
    },

    selectCard: function(idx){
    	//老的置灰
    	var node = this.pnlCardArr[this.selectedIdx].getChildByName('btn');
    	node.color = new cc.Color(200,200,200,255);
    	//新的置亮
    	this.selectedIdx = idx;
    	var node = this.pnlCardArr[this.selectedIdx].getChildByName('btn');
    	node.color = new cc.Color(255,255,255,255);
    },

    updateUI: function(manageType,data,data1){
    	this.cards = data;
    	this.selectedIdx = 0;

        //对应2张将牌的是只能撂龙，不能叫牌且不能过
        if (data1.length == 0) {
            this.btn1.node.active = false;
        };
        this.btn3.node.active = false;

    	var posX = 0;
    	if (this.cards.length%2 == 1) {
    		posX = -(this.cards.length-1)/2*120;
    	}else{
    		posX = 60-this.cards.length/2*120;
    	};

    	for (var i = 0; i < 6; i++) {
    		if (i < this.cards.length) {
    			this.pnlCardArr[i].setPositionX(posX+i*120);
    			this.pnlCardArr[i].getChildByName("btn").getComponent(cc.Sprite).spriteFrame = this.atlasCard.getSpriteFrame(Util.getCardSpriteFrameByType(this.cards[i]));
    			this.pnlCardArr[i].active = true;
    		}else{
    			this.pnlCardArr[i].active = false;
    		}
    	};

    	this.selectCard(0);
    },

});
