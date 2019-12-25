var EventEmitter = require('EventEmitter');
var CardData = require('CardData');
var Cards = require('Cards');
var Enum = require('Enum');
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var BattleNetHelper = require('BattleNetHelper');

var Cards = cc.Class({
    extends: cc.Component,

    properties: {
        btnZhuang: cc.Button,
        btnZhuangNo: cc.Button,
        pnlZhuang: cc.Node,
        pnlManage: cc.Node,
    },

    onLoad:function(){
        this.pnlZhuang.active = false;

        this.pnlManage.active = true;

        this.registerMsg();

        this.touchCardJS = null;

        this.card = 0;

    },

    onZhuangCallback: function(){
        BattleNetHelper.reqBuyZhuang(true);
    },

    onZhuangNoCallback: function(){
        BattleNetHelper.reqBuyZhuang(false);
    },

    start:function() {

    },

    onDestroy:function(){
    	this.unRegisterMsg();
    },

    registerMsg: function(){
    	EventEmitter.on("TouchCardEvent",this.onTouchCardEvent,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("TouchCardEvent",this.onTouchCardEvent,this);
    },

    onTouchCardEvent: function(params){
        var card = params['card'];

        if (card.getCard() > 120) {
            return;
        };

        var state = params['state'];
        if (state == "up") {
            if (this.touchCardJS) {
                if (this.touchCardJS.getCard() == card.getCard()) {
                    BattleNetHelper.reqSendCard(card.getCard());
                    this.touchCardJS.pushCardDown();
                    this.touchCardJS = null;
                    this.card = 0;
                }else{
                    this.touchCardJS.pushCardDown();
                    this.touchCardJS = card;
                }
            }else{
                this.card = card.getCard();
                this.touchCardJS = card;
            }
        }else if (state == "down") {
            if (this.touchCardJS && card.getCard() == this.touchCardJS.getCard()) {
                this.touchCardJS.pushCardDown();
                this.touchCardJS = null;
                this.card = 0;
            }else{
                console.log('have a error!')
            }
        };
    },

    updateUI: function(){

        if (BattleData.isCardRecord()) {
            this.pnlZhuang.active = false;
            return;
        };

        if (this.touchCardJS) {
            this.touchCardJS = null;
        };

        if (this.card > 0) {
            var card = this.card;
            this.card = 0;
            EventEmitter.emit("CardReUpEvent",card);
        };

        this.playerCardsInfo = CardData.getPlayerCardsInfo();

        this.baseCardsInfo = CardData.getBaseCardsInfo();

        for (var i = 0; i < this.playerCardsInfo.length; i++) {
            //是否显示买庄按钮
            if (this.playerCardsInfo[i].pos == BattleData.getMyPlayerInfo().pos) {
                if (this.baseCardsInfo.zhuang_over) {
                    this.pnlZhuang.active = false;
                }else{
                    this.pnlZhuang.active = true;
                    this.btnZhuang.node.active = this.playerCardsInfo[i].zhuang == 0;
                    this.btnZhuangNo.node.active = this.playerCardsInfo[i].zhuang == 0;
                };

                //我自己的操作按钮
                this.pnlManage.getComponent('CardsTriggerManage').updateUI(this.playerCardsInfo[i]);
            };
        };
    },

    clearBtns: function(){
        this.pnlZhuang.active = false;
        this.pnlManage.getComponent('CardsTriggerManage').clearBtns();
    },

    init:function(){

    },

});