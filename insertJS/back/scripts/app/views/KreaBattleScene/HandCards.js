var EventEmitter = require('EventEmitter');
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var Cards = require('Cards');
var CardData = require('CardData');
var LocalData = require('LocalData');
var Enum = require('Enum');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	prefabHandCard: cc.Prefab,
    },

    onLoad: function(){
        //初始化手牌
        this.handNodeArr = new Array();

        this.getCards = null;

        this.registerMsg();
    },

    start:function() {
        
    },

    onDestroy:function(){
    	this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("CardReUpEvent",this.onCardReUpEvent,this);

        EventEmitter.on("GetCardsEvent",this.onGetCardsEvent,this);

        EventEmitter.on("Client"+SocketID.SEND_CARD,this.onSendCard,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("CardReUpEvent",this.onCardReUpEvent,this);

        EventEmitter.off("GetCardsEvent",this.onGetCardsEvent,this);

        EventEmitter.off("Client"+SocketID.SEND_CARD,this.onSendCard,this);
    },

    onSendCard: function(){
        this.getCards = null;
    },

    onGetCardsEvent: function(data){
        this.getCards = data;
    },

    onCardReUpEvent: function(card){
        for (var i = 0; i < this.handNodeArr.length; i++) {
            var cardJS = this.handNodeArr[i].getComponent('HandCard');
            if (cardJS.getCard() == card) {
                cardJS.checkCardCallback();
            };
        };
    },

    //判断牌是否存在
    checkGetCards: function(){
        if (this.getCards && this.pos == this.getCards.pos) {
            if (this.getCards.cards.length > 1) {
                return;
            };
            for (var i = 0; i < this.handCards.length; i++) {
                if (this.handCards[i] == this.getCards.cards[0]) {
                    return;
                };
            };
        };

        this.getCards = null;
    },

    updateUI: function(data){
        this.data = data;
        //喜牌更新
        this.myInfo = BattleData.getMyPlayerInfo();
        this.myPos = this.myInfo.pos;

        this.pos = data.pos;
        //手牌
        this.handCards = data.hand_cards;

        this.checkGetCards();
        //买完庄后就重新排序
        if (Cards.instance.cardState == Enum.CardState.Zhuang) {

            if (this.getCards && this.pos == this.getCards.pos) {

                this.handCards.splice(this.handCards.length-this.getCards.num,this.getCards.num);
            };
            this.handCards.sort(function(a,b){
                return a - b;
            });

            if (this.getCards && this.pos == this.getCards.pos) {
                var cards = this.getCards.cards;
                for (var i = 0; i < cards.length; i++) {
                    this.handCards.push(cards[i]);
                };
            };
        };
        this.updateHandCards();
    },



    updateHandCards: function(){
        //我的位置永远放在正前面
        if (this.myPos == this.pos || BattleData.isCardRecord()) {
            if (this.handCards.length < this.handNodeArr.length) {
                for (var i = this.handNodeArr.length-1; i >= this.handCards.length; i--) {
                    this.handNodeArr[i].destroy();
                };
                this.handNodeArr.splice(this.handCards.length,(this.handNodeArr.length-this.handCards.length));
            }else if(this.handCards.length > this.handNodeArr.length){
                for (var i = this.handNodeArr.length; i < this.handCards.length; i++) {
                    var prefabHandCard = cc.instantiate(this.prefabHandCard);
                    this.node.addChild(prefabHandCard);
                    this.handNodeArr.push(prefabHandCard);
                    prefabHandCard.getComponent('HandCard').init(Enum.CardType.Hand,this.pos,this.myPos);
                };
            };
            var maxNum = this.handCards.length;
            if (Cards.instance.cardState == Enum.CardState.WaitZhuang) {
                maxNum = 5;
            };

            var hCards = this.handCards.slice(0);
            var showType = LocalData.getBtlCardState();
            if (showType == 2 && Cards.instance.cardState != Enum.CardState.WaitZhuang) {
                var hsCards = new Array();
                if (this.getCards && this.pos == this.getCards.pos) {
                    hCards.splice(hCards.length-this.getCards.num,this.getCards.num);
                };
                hsCards = this.getManagedCards(hCards,hsCards);

                if (this.getCards && this.pos == this.getCards.pos) {
                    var cards = this.getCards.cards;
                    for (var i = 0; i < cards.length; i++) {
                        var arr = new Array();
                        arr.push(cards[i]);
                        hsCards.push(arr);
                    };
                    
                };
                this.updateNewUI(hsCards);
            }else{
                for (var i = 0; i < maxNum; i++) {
                    var card = this.handCards[i];
                    var prefabHandCard = this.handNodeArr[i];
                    if (this.getCards && this.pos == this.getCards.pos) {
                        prefabHandCard.getComponent('HandCard').setGetCards(this.getCards);
                    };
                    prefabHandCard.getComponent('HandCard').updateUI(card,i,this.handCards,this.data);
                };
            };

        };

        // this.getCards = null;
    },

    updateNewUI: function(cards){
        var cIdx = 0;
        for (var i = 0; i < cards.length; i++) {
            var subCards = cards[i];
            for (var j = 0; j < subCards.length; j++) {
                cIdx = cIdx + 1;
                var card = subCards[j];
                var prefabHandCard = this.handNodeArr[cIdx-1];

                if (this.getCards && this.pos == this.getCards.pos) {
                    prefabHandCard.getComponent('HandCard').setGetCards(this.getCards);
                };
                prefabHandCard.getComponent('HandCard').updateUI(card,cIdx-1,this.handCards,this.data,j+1,i+1,cards.length);
            };
        };
    },

    getManagedCards: function(cards,hsCards){
        var arr = new Array();
        if (cards.length == 1) {
            arr.push(cards[0]);
            hsCards.push(arr);
            return hsCards;
        };
        if (cards.length == 0) {
            return hsCards;
        };

        var ctype = Math.ceil(cards[0]/4);
        var ctype1 = Math.ceil(cards[1]/4);

        if (ctype == ctype1) {
            arr.push(cards[0]);
            arr.push(cards[1]);

            if (cards.length >= 3) {
                if (Math.ceil(cards[2]/4) == ctype) {
                    arr.push(cards[2]);
                    if (cards.length >= 4) {
                        if (Math.ceil(cards[3]/4) == ctype) {
                            arr.push(cards[3]);
                            hsCards.push(arr);
                            cards.splice(0,4);
                            return this.getManagedCards(cards,hsCards);
                        }else{
                            hsCards.push(arr);
                            cards.splice(0,3);
                            return this.getManagedCards(cards,hsCards);
                        }
                    }else{
                        hsCards.push(arr);
                        cards.splice(0,3);
                        return this.getManagedCards(cards,hsCards);
                    };
                }else{
                    hsCards.push(arr);
                    cards.splice(0,2);
                    return this.getManagedCards(cards,hsCards);
                };
            }else{
                hsCards.push(arr);
                cards.splice(0,2);
                return this.getManagedCards(cards,hsCards);
            };
        }else if ((ctype1-ctype) == 1 && ((ctype >= 1 && ctype <= 7) || (ctype >= 10 && ctype <= 16) || (ctype >= 19 && ctype <= 25))) {
            if (cards.length >= 3) {
                if (Math.ceil(cards[2]/4) == (ctype1+1)) {
                    if (cards.length >= 4) {
                        if (Math.ceil(cards[3]/4) == (ctype1+1)) {
                            arr.push(cards[0]);
                            hsCards.push(arr);
                            cards.splice(0,1);
                            return this.getManagedCards(cards,hsCards);
                        }else{
                            arr.push(cards[0]);
                            arr.push(cards[1]);
                            arr.push(cards[2]);
                            hsCards.push(arr);
                            cards.splice(0,3);
                            return this.getManagedCards(cards,hsCards);
                        };
                    }else{
                        arr.push(cards[0]);
                        arr.push(cards[1]);
                        arr.push(cards[2]);
                        hsCards.push(arr);
                        cards.splice(0,3);
                        return this.getManagedCards(cards,hsCards);
                    };
                }else{
                    arr.push(cards[0]);
                    hsCards.push(arr);
                    cards.splice(0,1);
                    return this.getManagedCards(cards,hsCards);
                };
            }else{
                arr.push(cards[0]);
                hsCards.push(arr);
                cards.splice(0,1);
                return this.getManagedCards(cards,hsCards);
            };
        }else{
            arr.push(cards[0]);
            hsCards.push(arr);
            cards.splice(0,1);
            return this.getManagedCards(cards,hsCards);
        };

    },

    clearCards: function(){
        this.node.removeAllChildren();
        this.handNodeArr = new Array();
        this.getCards = null;
    },

    init:function(){
        
    },

});