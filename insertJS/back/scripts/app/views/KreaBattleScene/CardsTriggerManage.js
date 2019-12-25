var EventEmitter = require('EventEmitter');
var CardData = require('CardData');
var Cards = require('Cards');
var Enum = require('Enum');
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var BattleNetHelper = require('BattleNetHelper');

cc.Class({
    extends: cc.Component,

    properties: {
    	prefabBtnManage: cc.Prefab,
        prefabBattleTipDlg: cc.Prefab,
        prefabTwo: cc.Prefab,
    },

    onLoad:function(){
        this.registerMsg();

        this.manageArr = new Array();

        this.moreArr = new Array();
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
    	this.myCardsInfo = data;
    	this.baseCardsInfo = CardData.getBaseCardsInfo();

    	// for (var i = 0; i < this.manageArr.length; i++) {
    	// 	var node = this.manageArr[i];
    	// 	node.destroy();
    	// };
    	// this.manageArr.splice(0,this.manageArr.length);
        this.clearBtns();

        if (this.btlTipDlg) {
            this.btlTipDlg.destroy();
            this.btlTipDlg = null;
        };

        if (!this.baseCardsInfo.zhuang_over) {
            return;
        };

    	if (this.myCardsInfo.pos == this.baseCardsInfo.trigger_pos) {
            if (this.myCardsInfo.trigger_hu || this.myCardsInfo.trigger_tianhu) {
                var btn = this.createBtnPrefab();
                btn.getComponent('BtnManage').init(Enum.ManageType.Hu);
            }

            if (this.myCardsInfo.trigger_tianting) {
                var btn = this.createBtnPrefab();
                btn.getComponent('BtnManage').init(Enum.ManageType.Ting);
            };

            if (this.myCardsInfo.trigger_jiao) {
                var btn = this.createBtnPrefab();
                btn.getComponent('BtnManage').init(Enum.ManageType.Jiao,this.myCardsInfo.jiao_cards);
            }

            if (this.myCardsInfo.trigger_long) {
                var btn = this.createBtnPrefab();
                btn.getComponent('BtnManage').init(Enum.ManageType.Long,this.myCardsInfo.long_cards);
            }
            
            if (this.myCardsInfo.trigger_peng) {
                var btn = this.createBtnPrefab();
                btn.getComponent('BtnManage').init(Enum.ManageType.Peng,this.myCardsInfo.peng_cards);
            };

            if (this.myCardsInfo.trigger_showgang || this.myCardsInfo.trigger_angang) {
                var show = this.myCardsInfo.showgang_cards.slice(0);
                var an = this.myCardsInfo.angang_cards.slice(0);
                show = show.concat(an);
                var btn = this.createBtnPrefab();
                btn.getComponent('BtnManage').init(Enum.ManageType.Gang,show);
            };

            var btn = this.createBtnPrefab();
            btn.getComponent('BtnManage').init(Enum.ManageType.Guo);

            for (var i = 0; i < this.manageArr.length; i++) {
                var btn = this.manageArr[i];
                btn.getComponent('BtnManage').updateUI(i,this.manageArr.length,this.btnManageCb.bind(this));

            };
    	};

    },

    btnManageCb: function(data,manageType){
        this.clearBtns();

        for (var i = 0; i < data.length; i++) {
            var card = data[i];
            var node = cc.instantiate(this.prefabTwo);
            this.node.addChild(node);
            node.setScale(0.8);
            node.getComponent('TwoCardNode').updateUI(card,manageType,this.manageCb.bind(this));

            var posX = 200;
            posX = 200 + i*84;
            node.position = cc.p(posX+cc.winSize.width,-140);
            node.runAction(
                    cc.sequence(
                        cc.delayTime(i*0.2),
                        cc.moveTo(0.2,cc.p(posX,-140))));

            this.moreArr.push(node);
        };
    },

    manageCb: function(card,manageType){
        if (card > 0) {
            this.reqManage(card,manageType);
        };
    },

    reqManage: function(card,manageType){
        console.log(card,manageType);
        if (manageType == Enum.ManageType.Jiao) {
            BattleNetHelper.reqTrigger(card,1);
        }else if(manageType == Enum.ManageType.Long){
            BattleNetHelper.reqTrigger(card,2);
        }else if(manageType == Enum.ManageType.Hu){
            BattleNetHelper.reqTrigger(0,3);
        }else if(manageType == Enum.ManageType.Gang){
            BattleNetHelper.reqTrigger(card,5);
        }else if(manageType == Enum.ManageType.Peng){
            BattleNetHelper.reqTrigger(card,4);
        }else if(manageType == Enum.ManageType.Guo){
            BattleNetHelper.reqTrigger(0,6);
        };
    },

    createBtnPrefab: function(){
    	var btn = cc.instantiate(this.prefabBtnManage);
    	this.manageArr.push(btn);
        this.node.addChild(btn);
        return btn;
    },

    clearBtns: function(){
        this.node.removeAllChildren();
        this.manageArr = new Array();
        this.moreArr = new Array();
    },

    init:function(){

    },

});