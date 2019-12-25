var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');
var LoginData = require('LoginData');
var LocalData = require('LocalData');
var BattleData = require('BattleData');

cc.Class({
    extends: cc.Component,

    properties: {
    	pnlLeft: cc.Node,
    	pnlRight: cc.Node,
    },

    onLoad: function(){
        this.registerMsg();

     	this.pnlLeft.active = false;
        this.pnlRight.active = false;

        if (LoginData.GamePlatform == 2) {
            this.audioContext = wx.createInnerAudioContext();
            this.audioContext.onPlay(function(){
                console.log('222');
                this.onPlayCallback();
            }.bind(this));

            this.audioContext.onEnded(function(){
                console.log('333');
                this.onEndedCallback();
            }.bind(this));

            this.audioContext.onError(function(){
                console.log('444');
                this.onErrorCallback();
            }.bind(this));

            this.audioContext.onStop(function(){
                console.log('555');
                this.onStopCallback();
            }.bind(this));
        };

    },

    registerMsg: function(){
        EventEmitter.on("sceneBackToShowEvent",this.onSceneBackToShow,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("sceneBackToShowEvent",this.onSceneBackToShow,this);
    },

    onSceneBackToShow: function(){
        this.node.destroy();
    },

    onDestroy: function(){
        this.unRegisterMsg();

        if (LoginData.GamePlatform == 2) {
            this.audioContext.destroy();
        };
    },

    onEndedCallback: function(){
        this.node.destroy();
    },

    onPlayCallback: function(){
        var pnl = null;
        if (this.pos == 1 || this.pos == 3) {
            this.pnlLeft.active = true;
            this.pnlRight.active = false;
            pnl = this.pnlLeft;
        }else if (this.pos == 2){
            this.pnlLeft.active = false;
            this.pnlRight.active = true;
            pnl = this.pnlRight;
        };

        var actTime = 1;
        var img2 = pnl.getChildByName('img2');
        var img3 = pnl.getChildByName('img3');
        var img4 = pnl.getChildByName('img4');
        img2.runAction(
            cc.repeatForever(cc.sequence(
                cc.show(),
                cc.delayTime(actTime/3),
                cc.hide(),
                cc.delayTime(actTime*2/3))));

        img3.runAction(
            cc.repeatForever(cc.sequence(
                cc.hide(),
                cc.delayTime(actTime/3),
                cc.show(),
                cc.delayTime(actTime/3),
                cc.hide(),
                cc.delayTime(actTime/3))));

        img4.runAction(
            cc.repeatForever(cc.sequence(
                cc.hide(),
                cc.delayTime(actTime*2/3),
                cc.show(),
                cc.delayTime(actTime/3))));
    },

    onErrorCallback: function(){
        this.node.destroy();
    },

    onStopCallback: function(){
        this.node.destroy();
    },



    start:function() {

    },

    playComAudio: function(idx,pos){
        this.onPlayCallback();
        var gender = BattleData.getPosGender(pos);
        var genderStr = "man";
        if (gender == 2) {
            genderStr = "woman";
        };

        var audioId = cc.audioEngine.playEffect(cc.url.raw("resources/newImg/audio/chat/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+(idx+1)+".mp3"),false);
        cc.audioEngine.setFinishCallback(audioId, function () {
            this.node.destroy();
        }.bind(this));
    },

    playAudio: function(path){
        if (LoginData.GamePlatform == 2) {
            console.log(path,'1111');
            this.audioContext.src = "https://hlntcp.top/ntcp/"+path;
            this.audioContext.play();
        };
    },

    playAnim: function(pos,data){
        this.pos = pos;
        if (data.voicetype == 1) {
            this.playComAudio(data.msg_idx,data.pos);
        }else if (data.voicetype == 2){
            this.playAudio(data.path);
        };
    },

});