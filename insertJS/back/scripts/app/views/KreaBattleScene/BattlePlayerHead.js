var EventEmitter = require('EventEmitter');
var CardData = require('CardData');
var BattleData = require('BattleData');
var BattleMain = require('BattleMain');
var PlayerData = require('PlayerData');
var LoginData = require('LoginData');
var SocketID = require('SocketID');
var BattleNetHelper = require('BattleNetHelper');

cc.Class({
    extends: cc.Component,

    properties: {
    	pnlPlayer: cc.Node,
    	txtName: cc.Label,
        imgOnline: cc.Sprite,
    	imgPlayer: cc.Sprite,
    	imgZhuang: cc.Sprite,
    	imgFirst: cc.Sprite,
    	labelLeft: cc.Label,
    	imgReady: cc.Sprite,
        imgLeftDi: cc.Sprite,
        imgPlayer2: cc.Sprite,
        imgPlayer3: cc.Sprite,

        imgScoreDi: cc.Node,
        txtScore: cc.Label,

        btnKick: cc.Node,

        prefabHeadDlg: cc.Prefab,
    },

    onLoad: function(){
        this.registerMsg();
    },

    start:function() {
        this.txtScore.string = 0;
    },

    onDestroy:function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){

    },

    unRegisterMsg: function(){
        EventEmitter.off("PlayerCardChgEvent"+this.pos,this.onPlayerCardChgEvent,this);
    },

    onPlayerCardChgEvent: function(data){
        this.baseCardsInfo = CardData.getBaseCardsInfo();

        this.imgFirst.node.active = this.baseCardsInfo.round_firstpos == this.pos;

        if ((this.baseCardsInfo.trigger_pos > 0 && this.baseCardsInfo.trigger_pos == this.pos)
            ||(this.baseCardsInfo.trigger_pos == 0 && this.baseCardsInfo.turn_pos == this.pos)) {
            this.imgPlayer2.node.active = true;
            this.imgPlayer2.node.stopAllActions();
            this.imgPlayer2.node.runAction(
                cc.repeatForever(cc.sequence(
                    cc.fadeIn(0.6),
                    // cc.delayTime(0.1),
                    cc.fadeOut(0.6))));

            this.imgPlayer3.node.active = true;
            this.imgPlayer3.node.stopAllActions();
            this.imgPlayer3.node.runAction(
                cc.repeatForever(cc.sequence(
                    cc.scaleTo(0,1),
                    cc.fadeIn(0.3),
                    cc.spawn(
                        cc.fadeOut(0.3).easing(cc.easeIn(0.6)),
                        cc.scaleTo(0.3,1.4).easing(cc.easeIn(0.6))
                    ),
                    cc.delayTime(0.6)
                )));
        }else{
            this.imgPlayer2.node.active = false;
            this.imgPlayer3.node.active = false;
        };

        //剩余卡牌数量
        this.labelLeft.node.active = true;
        this.labelLeft.string = data.hand_cards.length;

        this.imgLeftDi.node.active = true;

        //是否买庄
        if (data.zhuang == 2) {
            this.imgZhuang.node.active = true;
        }else{
            this.imgZhuang.node.active = false;
        };

        //得分显示
        this.txtScore.string = data.total_score;
        if (data.total_score > 0) {
            this.txtScore.node.color = new cc.Color(0,255,0,255);
        }else{
            this.txtScore.node.color = new cc.Color(255,0,0,255);
        };
    },

    init: function(pos){
        this.pos = pos+1;
        //特殊监听
        EventEmitter.on("PlayerCardChgEvent"+this.pos,this.onPlayerCardChgEvent,this);

        this.resetUI();
    },

    updateUI: function(data,room_info){
        this.data = data;

        this.imgScoreDi.active = false;
        //位置是否空闲
        if (room_info.room_state == 2) {
            this.pnlPlayer.active = true;
            this.imgReady.node.active = false;
            this.btnKick.active = false;
            this.imgScoreDi.active = !BattleData.isCardRecord();

            this.txtName.string = data.pdata.name;

            if (LoginData.GamePlatform == 2) {
                var self = this;
                cc.loader.load({url: data.pdata.avatarurl, type: 'jpg'},function (err, texture) {
                     var frame = new cc.SpriteFrame(texture);
                     self.imgPlayer.spriteFrame=frame;
                });
            };

            if (this.headDlg) {
                this.headDlg.getComponent('BattlePlayerDlg').updateUI(this.data);
            };
        }else{
            this.imgScoreDi.active = false;
            if (data.pos_state == 0) {
                this.pnlPlayer.active = false;

                if (this.headDlg) {
                    this.headDlg.destroy();
                    this.headDlg = null;
                };

            }else if(data.pos_state == 1){
                this.pnlPlayer.active = true;
                
                //准备状态
                if (data.state == 0) {
                    this.imgReady.node.active = false;
                    if (BattleData.isRoomLeader() && data.uid != PlayerData.getPlayerId()) {
                        this.btnKick.active = true;
                    }else{
                        this.btnKick.active = false;
                    };
                }else if(data.state == 1){
                    this.imgReady.node.active = true;
                    this.btnKick.active = false;
                };

                
                this.txtName.string = data.pdata.name;

                if (LoginData.GamePlatform == 2) {
                    var self = this;
                    cc.loader.load({url: data.pdata.avatarurl, type: 'jpg'},function (err, texture) {
                         var frame = new cc.SpriteFrame(texture);
                         self.imgPlayer.spriteFrame=frame;
                    });
                };

                if (this.headDlg) {
                    this.headDlg.getComponent('BattlePlayerDlg').updateUI(this.data);
                };

            };
        };
        if (BattleData.isCardRecord()) {
            this.imgOnline.node.active = false;
        }else{
            if (data.online_state == 1) {
                this.imgOnline.node.active = false;
            }else{
                this.imgOnline.node.active = true;
            };
        };



    },

    setCallback: function(func){
        this.func = func;
    },

    onKickCallback: function(){
        if (BattleData.isCardRecord()) {
            return;
        };
        BattleNetHelper.reqRoomKick(this.data.uid);
    },

    onHeadCallback: function(){
        if (BattleData.isCardRecord()) {
            return;
        };
        if (this.data.pos_state != 0) {
            this.headDlg = cc.instantiate(this.prefabHeadDlg);
            BattleMain.instance.node.addChild(this.headDlg);
            this.headDlg.getComponent('BattlePlayerDlg').updateUI(this.data);
            this.headDlg.getComponent('BattlePlayerDlg').setHeadDlgCallback(function(){
                this.headDlg = null;
            }.bind(this));
            this.headDlg.position = cc.p(0,0);
        };
    },



    resetUI: function(){
        this.pnlPlayer.active = false;
        this.imgZhuang.node.active = false;
        this.imgFirst.node.active = false;
        this.imgLeftDi.node.active = false;
        this.labelLeft.node.active = false;
        this.imgReady.node.active = false;
        this.imgPlayer2.node.active = false;
        this.imgPlayer3.node.active = false;

        this.getMsg = false;
    },

});
