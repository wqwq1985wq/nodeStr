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
    	prefabPgCard: cc.Prefab,
    },

    onLoad: function(){
        //初始化手牌
        this.pgNodeArr = new Array();

        this.registerMsg();
    },

    start:function() {
        
    },

    onDestroy:function(){
    	this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("PutCardUpEvent",this.onPutCardUpEvent,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("PutCardUpEvent",this.onPutCardUpEvent,this);
    },

    onPutCardUpEvent: function(params){
        var card = params['card'];
        var is_show = params['is_show'];
        for (var i = 0; i < this.pgNodeArr.length; i++) {
            var cardJS = this.pgNodeArr[i].getComponent('PgCard');
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
        this.pgCards = data.pg_cards.slice(0);

        this.updatePgCards();

    },

    updatePgCards: function(){
        if (this.pgCards.length == 0) {
            this.clearCards();
        };
    	//等待买庄状态则返回
        if (Cards.instance.cardState == Enum.CardState.WaitZhuang) {
            return;
        }
        
        //我的位置永远放在正前面
        if (this.myPos == this.pos) {
            for (var i = this.pgCards.length-1; i >= 0; i--) {
                if (this.pgCards[i].pg_type == Enum.PgType.Jiao) {
                    this.pgCards.splice(i,1);
                };
            };
        };

        var cIdx = 0;
        for (var i = 0; i < this.pgCards.length; i++) {
            var cards = this.pgCards[i].cards;
            var pgType = this.pgCards[i].pg_type;
            for (var j = 0; j < cards.length; j++) {
                // if (pgType != Enum.PgType.Jiao) {
                    cIdx = cIdx + 1;
                    var card = cards[j];
                    var prefabPgCard = null;
                    if (this.pgNodeArr.length >= cIdx) {
                        prefabPgCard = this.pgNodeArr[cIdx-1];
                    }else{
                        var prefabPgCard = cc.instantiate(this.prefabPgCard);
                        this.node.addChild(prefabPgCard);
                        this.pgNodeArr.push(prefabPgCard);
                        prefabPgCard.getComponent('PgCard').init(Enum.CardType.Pg,this.pos,this.myPos);
                    };
                    prefabPgCard.getComponent('PgCard').updateUI(card,cIdx,cards,j+1,i+1,pgType);
                // };
            };
        };
    },

    clearCards: function(){
        this.node.removeAllChildren();
        this.pgNodeArr = new Array();
    },

    init:function(){
        
    },

});