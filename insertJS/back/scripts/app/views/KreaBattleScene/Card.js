var Enum = require('Enum');
var Util = require('Util');
var Cards = require('Cards');
var EventEmitter = require('EventEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
    	btnCard:cc.Button,
        imgJiao:cc.Sprite,
        imgLong:cc.Sprite,
        imgBg:cc.Sprite,

        atlasCard:cc.SpriteAtlas,
    },

    onLoad: function(){
        this.imgBg.node.active = false;
    	this.btnCard.node.active = false;
        this.btnCard.interactable = false;

        this.imgJiao.node.active = false;
        this.imgLong.node.active = false;

        this.card = -1;
    },

    start:function() {

    },

    update:function(dt){

    },

    onCardCallback: function(){

    },

    init:function(cardType,pos,my_pos){
        this.cardType = cardType;
        this.pos = pos;
        this.myPos = my_pos;

        if (this.pos >= this.myPos) {
            this.deltaPos = this.pos - this.myPos;
        }else{
            this.deltaPos = this.pos + 3 - this.myPos;
        };
            
        if (this.cardType == Enum.CardType.Jiang) {
            this.initJiang();
        };
    },

    getCard: function(){
        return this.card;
    },

    updateUI:function(card,idx,cards){
        this.preCard = this.card;
        this.card = card;
        this.idx = idx;
        this.cards = cards;
        this.chgCardImg();

        this.imgBg.node.active = true;
        this.btnCard.node.active = true;
    },

    resetCard: function(){
        this.imgBg.node.active = false;
        this.btnCard.node.active = false;
        this.btnCard.interactable = false;
    },

    chgCardImg: function(){
        this.btnCard.getComponent(cc.Sprite).spriteFrame = this.atlasCard.getSpriteFrame(Util.getCardSpriteFrame(this.card));
    },

    initJiang: function(){
        this.node.setScale(0.55);
        this.node.angle = 90;
    },

    shake: function(){
        this.node.runAction(
            cc.sequence(
                cc.fadeOut(0.1),
                cc.fadeIn(0.1)
            )
        );
    },

});
