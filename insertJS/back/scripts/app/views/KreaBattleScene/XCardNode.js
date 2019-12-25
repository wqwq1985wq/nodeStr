var LoginData = require('LoginData');
var LocalData = require('LocalData');
var Util = require('Util');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgCard: cc.Sprite,

    	atlasCard:cc.SpriteAtlas,
    },

    onLoad: function(){

    },

    start:function() {
        
    },

    updateUI: function(card){
    	this.idx = card;
    	this.imgCard.spriteFrame = this.atlasCard.getSpriteFrame(Util.getXCardSpriteFrame(this.idx));
    },

    getCard: function(){
    	return this.idx;
    },

    hideAction: function(func){
    	this.node.runAction(
    		cc.sequence(
                cc.delayTime(0.1),
                cc.fadeOut(0.4),
                cc.callFunc(function(){
                	if (func) {
                		func();
                	};
                	this.node.destroy();
                }.bind(this))));
    },
});
