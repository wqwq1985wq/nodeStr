var EventEmitter = require('EventEmitter');
var CardData = require('CardData');
var Enum = require('Enum');
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var BattleNetHelper = require('BattleNetHelper');
var LocalData = require('LocalData');

var Cards = cc.Class({
    extends: cc.Component,

    properties: {
        cardArr: {
            default: [],
            type: cc.Node,
        },
        txtCurHu: cc.RichText,

        pnlCurHu: cc.Node,

        pnlCardZu:cc.Node,

        pnlCardManage:cc.Node,

        prefabCard: cc.Prefab,

        pnlAnim: cc.Node,

        imgUnusedNum1: cc.Sprite,
        imgUnusedNum2: cc.Sprite,

        txtLeftTitle: cc.Node,
        txtRoundTitle: cc.Node,
        txtRound: cc.Label,

        spNumArr:{
            default: [],
            type: cc.SpriteFrame,
        },
    },

    statics: {
        instance: null
    },

    onLoad:function(){
        Cards.instance = this;
        //当前卡牌状态
        this.cardState = Enum.CardState.WaitZhuang;

        this.roundOverDlgShow = false;

        //将牌参数初始化
        this.nodeJiang = this.pnlCardZu.getChildByName("jiang");
        this.jiangNodeArr = new Array();
        for (var i = 0; i < 2; i++) {
            var prefabCard = cc.instantiate(this.prefabCard);
            this.nodeJiang.addChild(prefabCard);
            prefabCard.position = cc.p(0,cc.winSize.height/2-20-i*40);
            this.jiangNodeArr.push(prefabCard);
            prefabCard.getComponent('Card').init(Enum.CardType.Jiang);
        };

        this.imgUnusedNum1.node.active = false;
        this.imgUnusedNum2.node.active = false;

        this.txtLeftTitle.active = false;
        this.txtRoundTitle.active = false;
        this.txtRound.node.active = false;

        this.pnlCurHu.position = cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+95,-cc.winSize.height/2/LocalData.getPnlScale()+250);
        this.pnlCurHu.active = false;

        this.registerMsg();

        this.recordDeltaTime = 0;
        this.recordDeltaSpeed = 1;
        this.recordMaxSpeed = 4;
        this.recordPlaying = true;
    },

    start:function() {
        if (CardData.getCardsInfo() != null) {
            this.updateUI();
        };
    },

    onDestroy:function(){
    	this.unRegisterMsg();
    },

    registerMsg: function(){
    	EventEmitter.on("Client"+SocketID.SYNC_CARDSINFO,this.updateUI,this);

        EventEmitter.on("Client"+SocketID.ROUND_OVER,this.onRoundOver,this);

        EventEmitter.on("Client"+SocketID.ROOM_REFRESH,this.onRoomRefresh,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.SYNC_CARDSINFO,this.updateUI,this);

        EventEmitter.off("Client"+SocketID.ROUND_OVER,this.onRoundOver,this);

        EventEmitter.off("Client"+SocketID.ROOM_REFRESH,this.onRoomRefresh,this);
    },

    onRoundOver: function(){

    },

    onRoomRefresh: function(){
        for (var i = 0; i < this.jiangNodeArr.length; i++) {
            this.jiangNodeArr[i].getComponent('Card').shake();
        };
    },

    resumeCards: function(){
        this.roundOverDlgShow = false;
        this.updateUI();
    },

    clearCards: function(){
        this.roundOverDlgShow = true;

        this.cardState = Enum.CardState.WaitZhuang;

        this.imgUnusedNum1.node.active = false;
        this.imgUnusedNum2.node.active = false;

        this.txtRound.node.active = false;
        this.txtRoundTitle.active = false;
        this.txtLeftTitle.active = false;

        this.pnlCurHu.active = false;

        for (var i = 0; i < this.jiangNodeArr.length; i++) {
            this.jiangNodeArr[i].getComponent('Card').resetCard();
        };

        for (var i = 0; i < this.playerCardsInfo.length; i++) {
            var anchor = this.cardArr[i];
            var pCardJS = anchor.getComponent('PlayerCards');
            pCardJS.clearCards();
        };


        this.pnlCardManage.getComponent('CardsManage').clearBtns();

        this.pnlAnim.getComponent('BattleAnim').clearAnims();

    },

    updateUI: function(flag){
        if (flag) {
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function(){
                        this.updateUI();
                    }.bind(this))
                )
            );
            return;
        };

        this.recordDeltaTime = 0;
        //如果结算面板弹出来则不更新
        if (this.roundOverDlgShow) {
            return;
        };
        this.cardsInfo = CardData.getCardsInfo();

        if (!this.cardsInfo) {
            return;
        };

        this.baseCardsInfo = CardData.getBaseCardsInfo();

        if (this.baseCardsInfo.zhuang_over) {
            this.cardState = Enum.CardState.Zhuang;
        }else{
            this.cardState = Enum.CardState.WaitZhuang;
        }

        this.playerCardsInfo = CardData.getPlayerCardsInfo();

        this.updateBaseCardsInfo();

        this.updatePlayerCardsInfo();

        this.pnlCardManage.getComponent('CardsManage').updateUI();
    },

    updateBaseCardsInfo: function(){
        //还未使用的牌组
        this.unUsedCards = this.baseCardsInfo.unused_cards;
        this.unUsedNum = this.unUsedCards.length;
        //将牌
        this.jiangCards = this.baseCardsInfo.jiang_cards;

        var tens = Math.floor(this.unUsedNum/10);
        var single = this.unUsedNum - 10*tens;
        if (tens == 0) {
            this.imgUnusedNum1.node.active = false;
        }else{
            this.imgUnusedNum1.node.active = true;
            this.imgUnusedNum1.spriteFrame = this.spNumArr[tens];
        };
        this.imgUnusedNum2.node.active = true;
        this.imgUnusedNum2.spriteFrame = this.spNumArr[single];

        if (this.baseCardsInfo.zhuang_over) {
            this.updateJiangCards();

            this.updateCurHu();
        };

        this.txtLeftTitle.active = true;

        this.txtRoundTitle.active = true;

        this.txtRound.node.active = true;
        var baseInfo = BattleData.getRoomBaseInfo();
        this.txtRound.string = baseInfo.cur_times + "/" + baseInfo.times;
    },

    //更新显示将牌信息
    updateJiangCards: function(){
        if (this.jiangCards != null && this.jiangCards.length > 0) {
            for (var i = 0; i < this.jiangCards.length; i++) {
                var card = this.jiangCards[i];
                var prefabCard = this.jiangNodeArr[i];
                prefabCard.getComponent('Card').updateUI(card,i,this.jiangCards);
            };
            
        }else{

        }
    },

    updateCurHu: function(){
        var myPos = BattleData.getMyPlayerInfo().pos;
        for (var i = 0; i < this.playerCardsInfo.length; i++) {
            var data = this.playerCardsInfo[i];
            if (data.pos == myPos) {
                this.pnlCurHu.active = true;
                this.txtCurHu.string = "<color=#ffffff>当前胡</c>\n<color=#ffff00>"+data.cur_hu+"</color>";
            };
        };
    },

    updatePlayerCardsInfo: function(){
        for (var i = 0; i < this.playerCardsInfo.length; i++) {
            var anchor = this.cardArr[i];
            var pCardJS = anchor.getComponent('PlayerCards');
            pCardJS.updateUI(this.playerCardsInfo[i]);
        };
    },

    init:function(){

    },

    update: function(dt) {
        if (!BattleData.isCardRecord()) {
            return;
        };
        if (!this.recordPlaying) {
            return;
        };
        this.recordDeltaTime = this.recordDeltaTime + dt;
        if (this.recordDeltaTime >= (2 / this.recordDeltaSpeed)) {
            CardData.excuteRecordStepMsg();
        };
    },

    speedUp: function() {
        this.recordDeltaSpeed = this.recordDeltaSpeed + 1;
        if (this.recordDeltaSpeed > this.recordMaxSpeed) {
            this.recordDeltaSpeed = this.recordMaxSpeed;
        };
        return this.recordDeltaSpeed;
    },

    speedDown: function() {
        this.recordDeltaSpeed = this.recordDeltaSpeed - 1;
        if (this.recordDeltaSpeed < 1) {
            this.recordDeltaSpeed = 1;
        };
        return this.recordDeltaSpeed;
    },

    pause: function(){
        if (this.recordPlaying) {
            this.recordPlaying = false;
        }else{
            this.recordPlaying = true;
        };
        return this.recordPlaying;
    }

});