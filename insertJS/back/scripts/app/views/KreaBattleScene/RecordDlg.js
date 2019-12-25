var ViewCommon = require('ViewCommon');
var LoginData = require('LoginData');
var BattleNetHelper = require('BattleNetHelper');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgRecord: cc.Sprite,
    },

    onLoad: function(){
        this.recordState = 0; //0默认 1开始录音 2开始录音成功
        this.willStopRecord = false;

     // 	this.recorderManager = wx.getRecorderManager();

     // 	var self = this;
     // 	this.recorderManager.onStart(function(){
    	// 	self.onBeganCallback();
    	// });

    	// this.recorderManager.onStop(function(path){
    	// 	self.onStopCallback(path);
    	// });

    	// this.recorderManager.onPause(function(){
    	// 	self.onPauseCallback();
    	// });

    	// this.recorderManager.onError(function(errMsg){
    	// 	self.onErrorCallback(errMsg);
    	// });

    	// this.curStep = 0;

    	// this.setVoice();
    },

    setVoice: function(){
    	this.imgRecord.fillStart = this.curStep;
    	this.curStep = this.curStep + 0.1;
    	if (this.curStep >= 1) {
    		this.curStep = 0;
    	};
    	this.node.runAction(cc.sequence(
    			cc.delayTime(0.1),
    			cc.callFunc(function(){
    				this.setVoice()
    			}.bind(this))
    		));
    },

    //录音开始
    onBeganCallback: function(){
        this.recordState = 2;
        if (this.willStopRecord) {
            this.stopRecord();
            this.willStopRecord = false;
        };
    },

    //录音结束
    onStopCallback: function(data){
    	if (data.duration <= 1000) {
    		ViewCommon.showAlertDlg("说话时间过短！")
    		this.node.destroy();
    		return;
    	};
    	wx.uploadFile({
    		url: 'https://hlntcp.top/ntcp/FileGet.php',
    		filePath: data.tempFilePath,
    		name: 'file',
    		success: function(res){
                console.log(res,'success');
    			var result = JSON.parse(res.data);
    			if (result['result'] == 'ok') {
    				BattleNetHelper.reqSendVoiceChat(result['path']);
    			};
    		}.bind(this),
    		fail: function(res){
                console.log(res,'fail');
    		}.bind(this)
    	});
    	this.node.destroy();
    },

    setCallback: function(func){
        this.recorderManager = wx.getRecorderManager();

        var self = this;
        this.recorderManager.onStart(function(){
            self.onBeganCallback();
        });

        this.recorderManager.onStop(function(path){
            self.onStopCallback(path);
        });

        this.recorderManager.onPause(function(){
            self.onPauseCallback();
        });

        this.recorderManager.onError(function(errMsg){
            self.onErrorCallback(errMsg);
        });

        this.curStep = 0;

        this.setVoice();

        this.func = func;

        this.beginRecord();
    },

    //录音暂停
    onPauseCallback: function(){
    	this.recorderManager.stop();
    	this.node.destroy();
    },

    onErrorCallback: function(errMsg){

        var self = this;
        wx.getSetting({
            success: function(res) {
                if (!res.authSetting['scope.record']) {
                    self.func(1);
                };
                self.node.destroy();
            },
            fail: function(res){
                self.node.destroy();
            },
        });
    	
    },

    onDestroy: function(){
        this.func();
    },

    start:function() {
    	// this.beginRecord();
    },

    stopRecord: function(){
        if (this.recordState == 2) {
            this.recorderManager.stop();
        }else{
            this.willStopRecord = true;
        };
    },

    beginRecord: function(){
        this.recordState = 1;

    	const options = {
    		duration: 10000,
    		sampleRate: 44100,
    		numberOfChannels: 1,
    		encodeBitRate: 96000,
    		format: 'mp3',
    		frameSize: 50,
    	};

    	this.recorderManager.start(options);


    },

});