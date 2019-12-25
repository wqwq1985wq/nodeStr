var BattleData = require('BattleData');
var SocketID = require('SocketID');
var EventEmitter = require('EventEmitter');
var CardData = require('CardData');
var Util = require('Util');
var LocalData = require('LocalData');

cc.Class({
    extends: cc.Component,

    properties: {

        
    },

    playButton: function(idx) {
    	this._playSFX(this["audio"+idx]);
    },

    onLoad: function(){
        EventEmitter.on("PlayXiAnimEvent",this.onSyncXiInfo,this);

    	EventEmitter.on("Client"+SocketID.SEND_CARD,this.onSendCard,this);

    	EventEmitter.on("Client"+SocketID.SYNC_PLAYANIM,this.onSyncPlayAnim,this);

    	EventEmitter.on("Client"+SocketID.SYNC_PLAYER_ZHUANG,this.onSyncPlayZhuang,this);

    	EventEmitter.on("Client"+SocketID.SYNC_ZHUANG,this.onSyncZhuang,this);

    	EventEmitter.on("Client"+SocketID.SEND_INTERACTMSG,this.onSendInteractMsg,this);

        EventEmitter.on("WinOrLoseAudioEvent",this.onWinOrLoseAudioEvent,this);
    },

    onDestroy: function(){
        EventEmitter.off("PlayXiAnimEvent",this.onSyncXiInfo,this);

        EventEmitter.off("Client"+SocketID.SEND_CARD,this.onSendCard,this);

        EventEmitter.off("Client"+SocketID.SYNC_PLAYANIM,this.onSyncPlayAnim,this);

        EventEmitter.off("Client"+SocketID.SYNC_PLAYER_ZHUANG,this.onSyncPlayZhuang,this);

        EventEmitter.off("Client"+SocketID.SYNC_ZHUANG,this.onSyncZhuang,this);

        EventEmitter.off("Client"+SocketID.SEND_INTERACTMSG,this.onSendInteractMsg,this);

        EventEmitter.off("WinOrLoseAudioEvent",this.onWinOrLoseAudioEvent,this);
    },

    onWinOrLoseAudioEvent: function(flag){
        this._playSFX(Util.getPlayerWinOrLoseAudio(flag));
    },

    onSendInteractMsg: function(data){
    	this._playSFX(Util.getInteractAudio(data.msg_idx));
    },

    onSyncZhuang: function(){
    	this._playSFX("resources/newImg/audio/effect/game_start2.mp3");
    },

    onSyncPlayZhuang: function(data){
        var gender = BattleData.getPosGender(data.pos);
        var genderStr = "man";
        if (gender == 2) {
            genderStr = "woman";
        };
    	if (data.zhuang == 2) {
    		this._playSFX("resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_maizhuang.mp3");
    	}else if (data.zhuang == 1) {
            this._playSFX("resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_bumaizhuang.mp3");
        };
    },

    onSendCard: function(data){
        var card = data['card'];
        var pos = data['pos'];
        if (!card || !pos) {
            return;
        };
        var gender = BattleData.getPosGender(pos);
        this._playSFX(Util.getCardAudio(card,gender));

        
    },

    onSyncXiInfo: function(params){
        var gender = BattleData.getPosGender(params.pos);

        if (params.delay) {
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(1+params.pos*0.2),
                    cc.callFunc(function(){
                        this._playSFX(Util.getTriggerAudio(7,gender));
                    }.bind(this))
                )
            );
        }else{
            this._playSFX(Util.getTriggerAudio(7,gender));
        };
    },

    onSyncPlayAnim: function(data){
    	var data = data.data.data;
        var gender = BattleData.getPosGender(data.pos);
        if (data.anim_type == 1) {
            this._playSFX(Util.getTriggerAudio(1,gender));
        }else if (data.anim_type == 2){
            this._playSFX(Util.getTriggerAudio(2,gender));
        }else if (data.anim_type == 3) {
            if (data.zimo) {
                this._playSFX(Util.getTriggerAudio(12,gender));
            }else{
                this._playSFX(Util.getTriggerAudio(3,gender));
            };
        }else if (data.anim_type == 4) {
            this._playSFX(Util.getTriggerAudio(4,gender));
        }else if (data.anim_type == 5) {
            this._playSFX(Util.getTriggerAudio(5,gender));
        //喜牌动画
        }else if (data.anim_type == 7) {
            this._playSFX(Util.getTriggerAudio(7,gender));
        }else if (data.anim_type == 11) {
            this._playSFX(Util.getTriggerAudio(11,gender));
        }else if (data.anim_type == 13) {
            this._playSFX(Util.getTriggerAudio(13,gender));
        }else if (data.anim_type == 14) {
            this._playSFX(Util.getTriggerAudio(14,gender));
        };
    },

    _playSFX: function(path) {
        cc.audioEngine.playEffect( cc.url.raw(path), false );
    },


});