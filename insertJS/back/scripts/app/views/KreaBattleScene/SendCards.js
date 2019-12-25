var EventEmitter = require('EventEmitter');
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var Cards = require('Cards');
var Enum = require('Enum');
var Util = require('Util');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	prefabSendCard: cc.Prefab,
    },

    onLoad: function(){
        //初始化手牌
        this.sendNodeArr = new Array();

        this.registerMsg();
    },

    start:function() {
        
    },

    onDestroy:function(){
    	this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("PutCardUpEvent",this.onPutCardUpEvent,this);

        EventEmitter.on("Client"+SocketID.SEND_CARD,this.onSendCard,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("PutCardUpEvent",this.onPutCardUpEvent,this);

        EventEmitter.off("Client"+SocketID.SEND_CARD,this.onSendCard,this);
    },

    onSendCard: function(data){
        this.triggerCard = data;
    },

    onPutCardUpEvent: function(params){
        var card = params['card'];
        var is_show = params['is_show'];
        for (var i = 0; i < this.sendNodeArr.length; i++) {
            var cardJS = this.sendNodeArr[i].getComponent('SendCard');
            if (Util.getCardType(cardJS.getCard()) == Util.getCardType(card)) {
                cardJS.updateCardColor(is_show);
            };
        };
    },

    updateUI: function(data){
        //喜牌更新
        this.myInfo = BattleData.getMyPlayerInfo();
        this.myPos = this.myInfo.pos;

        this.pos = data.pos;
        //手牌
        this.sendCards = data.out_cards;

        this.updateSendCards();

    },

    updateSendCards: function(){
        //等待买庄状态则返回
        if (Cards.instance.cardState == Enum.CardState.WaitZhuang) {
            return;
        };

        if (this.sendCards.length < this.sendNodeArr.length) {
            for (var i = this.sendNodeArr.length-1; i >= this.sendCards.length; i--) {
                this.sendNodeArr[i].destroy();
            };
            this.sendNodeArr.splice(this.sendCards.length,(this.sendNodeArr.length-this.sendCards.length));
        }else if(this.sendCards.length > this.sendNodeArr.length){
            for (var i = this.sendNodeArr.length; i < this.sendCards.length; i++) {
                var prefabSendCard = cc.instantiate(this.prefabSendCard);
                this.node.addChild(prefabSendCard);
                this.sendNodeArr.push(prefabSendCard);
                prefabSendCard.getComponent('SendCard').init(Enum.CardType.Send,this.pos,this.myPos);
            };
        };
        for (var i = 0; i < this.sendCards.length; i++) {
            var card = this.sendCards[i];
            var prefabSendCard = this.sendNodeArr[i];
            prefabSendCard.getComponent('SendCard').updateUI(card,i,this.sendCards,this.triggerCard);
        };

        this.triggerCard = null;
    },

    clearCards: function(){
        this.node.removeAllChildren();
        this.sendNodeArr = new Array();
    },

    init:function(){
        
    },

});