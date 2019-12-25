var Enum = require('Enum');
var Util = require('Util');
var Cards = require('Cards');
var EventEmitter = require('EventEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgCard:cc.Sprite,
        imgJiao:cc.Sprite,
        imgLong:cc.Sprite,

        atlasCard:cc.SpriteAtlas,
    },

    onLoad: function(){
        this.imgJiao.node.active = false;
        this.imgLong.node.active = false;
    },

    start:function() {

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

    updateUI:function(card,idx,cards){
        this.preCard = this.card;
        this.card = card;
        this.idx = idx;
        this.cards = cards;
        this.chgCardImg();

        this.btnCard.node.active = true;
    },

    chgCardImg: function(){
        this.btnCard.getComponent(cc.Sprite).spriteFrame = this.atlasCard.getSpriteFrame(Util.getCardSpriteFrame(this.card));
    },

});
