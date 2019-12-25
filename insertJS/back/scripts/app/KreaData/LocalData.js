var EventEmitter = require('EventEmitter');



var bigVersion = false;

module.exports={
	bigVersion: bigVersion,
	// isBigVersion : function(){
	// 	return bigVersion;
	// },

	setAudioVolume: function(voice){
		cc.sys.localStorage.setItem("audio_volume", voice);

		cc.audioEngine.setEffectsVolume(voice/100);

		cc.audioEngine.setMusicVolume(this.getMusicVolume()/100);
	},

	getAudioVolume: function(){
		var per = cc.sys.localStorage.getItem("audio_volume");
		if (per == null || per === "") {
			per = 100;
		};
		return per;
	},

	setMusicVolume: function(voice){
		cc.sys.localStorage.setItem("music_volume",voice);
		cc.audioEngine.setMusicVolume(voice/100);

		// EventEmitter.emit("MusicVolumeChgEvent");
	},

	getMusicVolume: function(){
		var per = cc.sys.localStorage.getItem("music_volume");
		if (per == null || per === "") {
			per = 100;
		};
		return per;
	},

	setBtlCardState: function(state){
		cc.sys.localStorage.setItem("battle_cardstates",state);
	},

	getBtlCardState: function(){
		var state = cc.sys.localStorage.getItem("battle_cardstates");
		if (state == null || state === "") {
			state = 2;
		};
		return state;
	},

	//用户协议是否同意
	setAgreementState: function(state){
		var num = 0;
		if (state) {
			num = 1;
		};
		cc.sys.localStorage.setItem("agreement_state",num);
	},

	getAgreementState: function(){
		var state = cc.sys.localStorage.getItem("agreement_state");
		if (state == null || state === "") {
			state = 1;
		};
		return state;
	},

	//设置为使用过小游戏
	setFirstEnter: function(){
		cc.sys.localStorage.setItem("first_enter2",1);
	},

	getFirstEnter: function(){
		var state = cc.sys.localStorage.getItem("first_enter2");
		if (state == null || state === "") {
			state = 0;
		};
		return state;
	},

	//设置方言
	setLanguage: function(state){
		cc.sys.localStorage.setItem("set_language",state);
	},

	getLanguage: function(){
		var state = cc.sys.localStorage.getItem("set_language");
		if (state == null || state === "") {
			state = 1;
		};
		return state;
	},

	//创建房间记录数据
	setCostState: function(state){
		cc.sys.localStorage.setItem("set_coststate",state);
	},

	getCostState: function(){
		var state = cc.sys.localStorage.getItem("set_coststate");
		if (state == null || state === "") {
			state = 2;
		};
		return state;
	},

	setRoundState: function(state){
		cc.sys.localStorage.setItem("set_roundstate",state);
	},

	getRoundState: function(){
		var state = cc.sys.localStorage.getItem("set_roundstate");
		if (state == null || state === "") {
			state = 1;
		};
		return state;
	},

	setXiState: function(state){
		cc.sys.localStorage.setItem("set_xistate",state);
	},

	getXiState: function(){
		var state = cc.sys.localStorage.getItem("set_xistate");
		if (state == null || state === "") {
			state = 2;
		};
		return state;
	},

	setZhuangState: function(state){
		cc.sys.localStorage.setItem("set_zhuangstate",state);
	},

	getZhuangState: function(){
		var state = cc.sys.localStorage.getItem("set_zhuangstate");
		if (state == null || state === "") {
			state = 1;
		};
		return state;
	},


	//获取屏幕缩放比例
	getScreenScale: function(){
		if (cc.winSize.width/cc.winSize.height > 1334/750) {
			return cc.winSize.width/cc.winSize.height / (1334/750)
		};
		return 1;
	},

	getPnlScale: function(){
		if (cc.winSize.width/cc.winSize.height < 1334/750) {
			return cc.winSize.width/cc.winSize.height / (1334/750)
		};
		return 1;
	},
    
};