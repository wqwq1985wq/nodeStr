var EventEmitter = require('EventEmitter');
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var Cards = require('Cards');
var Enum = require('Enum');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	prefabCard: cc.Prefab,
        nodeSend: cc.Node,
        nodePeng: cc.Node,
        nodeHand: cc.Node,
        nodeXi:   cc.Node,
    },

    onLoad: function(){

        this.registerMsg();
    },

    start:function() {
        
    },

    onDestroy:function(){
    	this.unRegisterMsg();
    },

    registerMsg: function(){
        
    },

    unRegisterMsg: function(){

    },

    updateUI: function(data){
        EventEmitter.emit("PlayerCardChgEvent"+data.pos,data);

        this.myInfo = BattleData.getMyPlayerInfo();
        this.myPos = this.myInfo.pos;

        this.cards = data;

        //出的牌
        this.outCards = data.out_cards;

        this.pos = data.pos;
        this.zhuang = data.zhuang;
        this.triggerShowGang = data.trigger_showgang;
        this.triggerPeng = data.trigger_peng;
        this.triggerHu = data.trigger_hu;
        this.triggerTianhu = data.trigger_tianhu;


        this.nodeHand.getComponent('HandCards').updateUI(data);

        this.nodeXi.getComponent('XiCards').updateUI(data);

        this.nodePeng.getComponent('PgCards').updateUI(data);

        this.nodeSend.getComponent('SendCards').updateUI(data);
    },

    clearCards: function(){
        this.nodeHand.getComponent('HandCards').clearCards();

        this.nodeXi.getComponent('XiCards').clearCards();

        this.nodePeng.getComponent('PgCards').clearCards();

        this.nodeSend.getComponent('SendCards').clearCards();
    },

    init:function(){
        
    },

});