var EventEmitter = require('EventEmitter');
var CardData = require('CardData');
var Cards = require('Cards');
var Enum = require('Enum');
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var BattleNetHelper = require('BattleNetHelper');
var ViewCommon = require('ViewCommon');
var LoginData = require('LoginData');
var Util = require('Util');

var Cards = cc.Class({
    extends: cc.Component,

    properties: {
    	animPrefab: cc.Prefab,
        faceAnimPrefab: cc.Prefab,
        interactAnimPrefab: cc.Prefab,
        prefabShowCard: cc.Prefab,
        atlasCard:cc.SpriteAtlas,
        btlCommAnimPrefab: cc.Prefab,
        sayPrefab: cc.Prefab,
    },

    onLoad:function(){
        this.onSyncRoomInfo();
        this.registerMsg();
    },

    start:function() {
        if (CardData.getCardsInfo() != null) {
            this.onShowTriggerCard();
        };
    },

    onDestroy:function(){
    	this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.SYNC_ROOMINFO,this.onSyncRoomInfo,this);

    	EventEmitter.on("PlayXiAnimEvent",this.onSyncXiInfo,this);

        EventEmitter.on("Client"+SocketID.SYNC_PLAYANIM,this.onSyncPlayAnim,this);

        EventEmitter.on("BattleBeginEvent",this.onBattleBegin,this);

        EventEmitter.on("Client"+SocketID.SYNC_PLAYER_ZHUANG,this.onSyncPlayZhuang,this);

        EventEmitter.on("Client"+SocketID.SEND_CARD,this.onSendCard,this);

        EventEmitter.on("Client"+SocketID.SEND_MSG,this.onSendMsg,this);

        EventEmitter.on("Client"+SocketID.SEND_INTERACTMSG,this.onSendInteractMsg,this);

        EventEmitter.on("PlayerEnterEvent",this.onPlayerEnter,this);

        EventEmitter.on("Client"+SocketID.SEND_VOICECHAT,this.onSendVoiceChat,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.SYNC_ROOMINFO,this.onSyncRoomInfo,this);

        EventEmitter.off("PlayXiAnimEvent",this.onSyncXiInfo,this);

        EventEmitter.off("Client"+SocketID.SYNC_PLAYANIM,this.onSyncPlayAnim,this);

        EventEmitter.off("BattleBeginEvent",this.onBattleBegin,this);

        EventEmitter.off("Client"+SocketID.SYNC_PLAYER_ZHUANG,this.onSyncPlayZhuang,this);

        EventEmitter.off("Client"+SocketID.SEND_CARD,this.onSendCard,this);

        EventEmitter.off("Client"+SocketID.SEND_MSG,this.onSendMsg,this);

        EventEmitter.off("Client"+SocketID.SEND_INTERACTMSG,this.onSendInteractMsg,this);

        EventEmitter.off("PlayerEnterEvent",this.onPlayerEnter,this);

        EventEmitter.off("Client"+SocketID.SEND_VOICECHAT,this.onSendVoiceChat,this);
    },

    onSyncRoomInfo: function(){
        var roomPlayerInfo = BattleData.getRoomPlayerInfo();
        if (!roomPlayerInfo) {
            return;
        };
        var isFull = true;
        for (var i = 0; i < roomPlayerInfo.length; i++) {
            var info = roomPlayerInfo[i];
            if (info.pos_state == 0) {
                isFull = false;
                break;
            };
        };

        this.playWaitingAnim(isFull);
    },

    playWaitingAnim: function(full){
        if (!full) {
            if (this.waitingAnim) {
                return;
            };
            this.waitingAnim = cc.instantiate(this.animPrefab);
            this.waitingAnim.position = cc.p(0,0);
            this.node.addChild(this.waitingAnim);
            this.waitingAnim.getComponent('AnimPrefab').playWaitingAnim();
        }else{
            if (this.waitingAnim) {
                this.waitingAnim.destroy();
                this.waitingAnim = null;
            };
        };
    },

    onBattleBegin: function(){
        ViewCommon.playBeginAnim(this.node,this.animPrefab);
    },

    onSyncPlayZhuang: function(data){
        ViewCommon.playZhuangAnim(CardData.getUIPos(data.pos),this.node,this.animPrefab,data);
    },

    onSendCard: function(data){
        this.triggerCard = data;
        if (this.showCardNode) {
            this.showCardNode.destroy();
        };

        if (this.triggerCard) {
            if (this.showCardNode) {
                this.showCardNode.destroy();
            };
            var tPos = this.triggerCard['pos'];
            var deltaPos = CardData.getUIPos(tPos);
            if (deltaPos == 0) {
                return;
            };
            var posArr = new Array(cc.p(210,-100),cc.p(310,160),cc.p(-310,160));
            this.showCardNode = cc.instantiate(this.prefabShowCard);
            this.showCardNode.position = posArr[deltaPos];
            this.showCardNode.setScale(0.85);
            this.showCardNode.angle = -180;

            this.node.addChild(this.showCardNode);
            this.showCardNode.getChildByName('imgCard').getComponent(cc.Sprite).spriteFrame = this.atlasCard.getSpriteFrame(Util.getCardSpriteFrame(this.triggerCard['card']));
            var guang = this.showCardNode.getChildByName('imgKuang');
            guang.runAction(
                    cc.repeatForever(cc.sequence(
                        cc.fadeIn(0.6),
                        cc.fadeOut(0.6))));
        };
    },

    onShowTriggerCard: function(data){
        // this.baseCardsInfo = CardData.getBaseCardsInfo();
        if (CardData.getCardsInfo().base_cards && CardData.getCardsInfo().base_cards.trigger_card) {
            this.triggerCard = CardData.getCardsInfo().base_cards.trigger_card;

            if (this.showCardNode) {
                this.showCardNode.destroy();
            };

            if (this.triggerCard) {
                if (this.showCardNode) {
                    this.showCardNode.destroy();
                };
                var tPos = this.triggerCard['pos'];
                var deltaPos = CardData.getUIPos(tPos);
                if (deltaPos == 0) {
                    return;
                };
                var posArr = new Array(cc.p(210,-100),cc.p(310,160),cc.p(-310,160));
                this.showCardNode = cc.instantiate(this.prefabShowCard);
                this.showCardNode.position = posArr[deltaPos];
                this.showCardNode.setScale(0.85);
                this.showCardNode.angle = -180;

                this.node.addChild(this.showCardNode);
                this.showCardNode.getChildByName('imgCard').getComponent(cc.Sprite).spriteFrame = this.atlasCard.getSpriteFrame(Util.getCardSpriteFrame(this.triggerCard['card']));
                var guang = this.showCardNode.getChildByName('imgKuang');
                guang.runAction(
                        cc.repeatForever(cc.sequence(
                            cc.fadeIn(0.6),
                            cc.fadeOut(0.6))));
            };
        };
    },

    clearAnims: function(){
        if (this.showCardNode) {
            this.showCardNode.destroy();
            this.showCardNode = null;
        };
    },

    onSyncPlayAnim: function(data){
        var data = data.data.data;
        if (data.anim_type == 1 || data.anim_type == 2) {
            ViewCommon.playLongAnim(CardData.getUIPos(data.pos),this.node,this.animPrefab,data);
        }else if (data.anim_type == 3) {
            ViewCommon.playHuAnim(CardData.getUIPos(data.pos),this.node,this.animPrefab,data);
        }else if (data.anim_type == 4) {
            ViewCommon.playPengAnim(CardData.getUIPos(data.pos),this.node,this.animPrefab);
        }else if (data.anim_type == 5 || data.anim_type == 11 || data.anim_type == 13) {
            ViewCommon.playGangAnim(CardData.getUIPos(data.pos),this.node,this.animPrefab);
        //喜牌动画
        }else if (data.anim_type == 7) {
            ViewCommon.playXiAnim(CardData.getUIPos(data.pos),this.node,this.animPrefab);
        }else if (data.anim_type == 14) {
            ViewCommon.playTingAnim(CardData.getUIPos(data.pos),this.node,this.animPrefab);
        };
    },

    onSendMsg: function(data){
        if (data.msg_type == 2) {
            ViewCommon.playFaceAnim(CardData.getUIPos(data.pos),this.node,this.faceAnimPrefab,data.msg_idx);
        }else{
            var params = new Array();
            params.voicetype = 1;
            params.msg_idx = data.msg_idx;
            params.pos = data.pos;
            ViewCommon.playVoiceAnim(CardData.getUIPos(data.pos),this.node,this.sayPrefab,params)
        };
    },

    onSendVoiceChat: function(data) {
        if (LoginData.GamePlatform == 2) {
            var params = new Array();
            params.voicetype = 2;
            params.path = data.path;
            ViewCommon.playVoiceAnim(CardData.getUIPos(data.pos),this.node,this.sayPrefab,params);
        };
    },

    onSendInteractMsg: function(data){
        ViewCommon.playInteractAnim(CardData.getUIPos(data.to_pos),CardData.getUIPos(data.from_pos),this.node,this.interactAnimPrefab,data.msg_idx);
    },

    onSyncXiInfo: function(params){
        //播放动画
        var pos = params.pos;
        if (params.delay) {
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(1+params.pos*0.2),
                    cc.callFunc(function(){
                        ViewCommon.playXiAnim(CardData.getUIPos(pos),this.node,this.animPrefab);
                    }.bind(this))
                )
            );
        }else{
            ViewCommon.playXiAnim(CardData.getUIPos(pos),this.node,this.animPrefab);
        };
    },

    onPlayerEnter: function(posArr){
        //播放动画
        for (var i = 0; i < posArr.length; i++) {
            ViewCommon.playCommAnim(CardData.getUIPos(posArr[i]),this.node,this.btlCommAnimPrefab,"playerenter");  
        };
    },

});