var LocalData = require('LocalData');

cc.Class({
    extends: cc.Component,

    properties: {
    	//通用声音
    	audio1: {
    		displayName: "audio1 (通用)",
            default: null,
            type: cc.AudioClip
        },
        //关闭声音
        audio2: {
        	displayName: "audio2 (关闭)",
            default: null,
            type: cc.AudioClip
        },
        //菜单声音
        audio3: {
        	displayName: "audio3 (toggle选中)",
            default: null,
            type: cc.AudioClip
        },
        //菜单声音
        audio4: {
        	displayName: "audio4 (选牌)",
            default: null,
            type: cc.AudioClip
        },
        //菜单声音
        audio5: {
        	displayName: "audio5 (出牌)",
            default: null,
            type: cc.AudioClip
        },
        //菜单声音
        audio6: {
        	displayName: "audio6 (对局开始)",
            default: null,
            type: cc.AudioClip
        },
    },

    playButton: function(idx) {
    	this._playSFX(this["audio"+idx]);
    },

    _playSFX: function(clip) {
        var audioId = cc.audioEngine.playEffect( clip, false);
    },

    playMusic: function(url){
        cc.audioEngine.playMusic(cc.url.raw(url),true);
    },

    playUrlAudio: function(url){
        this._playSFX(cc.url.raw(url));
    },


});