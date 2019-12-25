var EventEmitter = require('EventEmitter');
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var Cards = require('Cards');
var Enum = require('Enum');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	prefabXiCard: cc.Prefab,
    },

    onLoad: function(){
        //初始化喜牌
        this.xiNodeArr = new Array();

        this.getCards = null;

        this.registerMsg();
    },

    start:function() {
        
    },

    onDestroy:function(){
    	this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("GetXiCardsEvent",this.onGetXiCardsEvent,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("GetXiCardsEvent",this.onGetXiCardsEvent,this);
    },

    onGetXiCardsEvent: function(data){
        this.getCards = data;
    },

    updateUI: function(data){
        //喜牌更新
        this.myInfo = BattleData.getMyPlayerInfo();
        this.myPos = this.myInfo.pos;

        this.pos = data.pos;
        this.xiCards = data.xi_cards;
        this.xiCards.sort(function(a,b){
            return a - b;
        });
        this.updateXiCards();

    },

    updateXiCards: function(){
        if (this.xiCards.length == 0) {
            this.clearCards();
        };
        //等待买庄状态则返回
        if (Cards.instance.cardState == Enum.CardState.WaitZhuang) {
            return;
        }
        //处理喜牌
        if (this.xiCards.length < this.xiNodeArr.length) {
            this.xiNodeArr.splice(this.xiCards.length,(this.xiNodeArr.length-this.xiCards.length));
        }else if(this.xiCards.length > this.xiNodeArr.length){
            for (var i = this.xiNodeArr.length; i < this.xiCards.length; i++) {
                var prefabXiCard = cc.instantiate(this.prefabXiCard);
                this.node.addChild(prefabXiCard);
                this.xiNodeArr.push(prefabXiCard);
                prefabXiCard.getComponent('XiCard').init(Enum.CardType.Xi,this.pos,this.myPos);
            };
        };

        for (var i = 0; i < this.xiCards.length; i++) {
            var card = this.xiCards[i];
            var prefabXiCard = this.xiNodeArr[i];
            if (this.getCards && this.pos == this.getCards.pos) {
                prefabXiCard.getComponent('XiCard').setGetXiCards(this.getCards);
            };
            prefabXiCard.getComponent('XiCard').updateUI(card,i,this.xiCards);
        };

        this.getCards = null;
    },

    clearCards: function(){
        this.node.removeAllChildren();
        this.xiNodeArr = new Array();
        this.getCards = null;
    },

    init:function(){
        
    },

});