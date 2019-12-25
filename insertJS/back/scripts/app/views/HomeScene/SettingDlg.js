var HomeData = require('HomeData');
var LocalData = require('LocalData');
var ViewCommon = require('ViewCommon');
var LoginData = require('LoginData');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
    	slider1: cc.Slider,
    	slider2: cc.Slider,

    	imgSlider1: cc.Node,
    	imgSlider2: cc.Node,

        pnl1:cc.Node,
        btnExit:cc.Button,

        toggle1: cc.Toggle,
        toggle2: cc.Toggle,
    },

    onChgLanguage: function(event,data){
        LocalData.setLanguage(data);
    },

    onExitCallback: function(){
        if (LoginData.GamePlatform == 2) {
            wx.exitMiniProgram();
        }else{
            cc.director.end();
        };
    },

    onLoad: function(){
        this.pnlMid = this.node.getChildByName("pnlMid");
        if (this.pnlMid) {
            ViewCommon.playDlgAction(this.pnlMid);
        };
        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);
		this.node.on("touchend", this.onTouchEnded, this);

		this.updateAudio(LocalData.getAudioVolume()/100);
		this.updateMusic(LocalData.getMusicVolume()/100);

		this.slider1.node.on("touchend",this.onSlider1TouchEnded,this);
		this.slider2.node.on("touchend",this.onSlider2TouchEnded,this);
		this.slider1.node.on("touchcancel",this.onSlider1TouchEnded,this);
		this.slider2.node.on("touchcancel",this.onSlider2TouchEnded,this);
		this.slider1.handle.node.on("touchend",this.onSlider1TouchEnded,this);
		this.slider2.handle.node.on("touchend",this.onSlider2TouchEnded,this);

        if (cc.director.getScene().getName() == "HomeMain") {
            this.btnExit.node.active = true;
        }else{
            this.btnExit.node.active = false;
        };

        if (LocalData.getLanguage() == 1) {
            this.toggle1.check();
        }else if (LocalData.getLanguage() == 2) {
            this.toggle2.check();
        };
    },

    updateMusic: function(percent){
    	this.slider1.progress = percent;
    	this.imgSlider1.scaleX = percent;
    },

    updateAudio: function(percent){
    	this.slider2.progress = percent;
    	this.imgSlider2.scaleX = percent;
    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
    	this.node.destroy();
    },

    onSlider1TouchEnded: function(){
    	LocalData.setMusicVolume(parseInt(this.slider1.progress*100));
    },

    onSlider2TouchEnded: function(){
    	LocalData.setAudioVolume(parseInt(this.slider2.progress*100));
    },

    onMusicCallback: function(event){
    	this.imgSlider1.scaleX = this.slider1.progress;
    },

    onAudioCallback: function(){
    	this.imgSlider2.scaleX = this.slider2.progress;
    },

    start:function() {

    },

});