var HomeData = require('HomeData');
var LocalData = require('LocalData');
var Util = require('Util');
var BattleNetHelper = require('BattleNetHelper');

cc.Class({
    extends: cc.Component,

    properties: {
    	btnSelect: cc.Button,
    	atlasCard:cc.SpriteAtlas,
    	imgSelect: cc.Sprite,
    },

    onLoad: function(){

    },

    updateUI: function(card,manageType,func){
    	this.card = card;
        this.manageType = manageType;
    	this.func = func;
    	var cardFrame = this.atlasCard.getSpriteFrame(Util.getCardSpriteFrameByType(card));
    	this.imgSelect.spriteFrame = cardFrame;
    },

    onSelectCallback: function(){
    	this.func(this.card,this.manageType);
    },

    start:function() {

    },

});