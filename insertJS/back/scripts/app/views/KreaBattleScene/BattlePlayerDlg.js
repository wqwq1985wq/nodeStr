var HomeData = require('HomeData');
var LocalData = require('LocalData');
var BattleNetHelper = require('BattleNetHelper');
var LoginData = require('LoginData');
var BattleMain = require('BattleMain');
var PlayerData = require('PlayerData');
var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
    	imgSex: cc.Sprite,
    	imgPlayer: cc.Sprite,
    	txtName: cc.Label,
        txtId: cc.Label,
        txtIp: cc.Label,
        txtAddr: cc.Label,
        btnAddr: cc.Node,

        imgGirl:cc.SpriteFrame,
        imgBoy:cc.SpriteFrame,
    },

    onLoad: function(){
        this.pnlMid = this.node.getChildByName("pnlMid");
        if (this.pnlMid) {
            ViewCommon.playDlgAction(this.pnlMid);
        };

        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setScale(LocalData.getScreenScale());
        };

		this.node.on("touchend", this.onTouchEnded, this);

        this.btnAddr.active = false;

    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    onAddrCallback: function(){
        BattleMain.instance.reqWxLocation();
        // EventEmitter.emit("reqWxLocation",true);
    },

    onInteractCallback: function(event,data){
    	BattleNetHelper.reqSendInteractMsg(this.data.pos,data);
    	this.onCloseCallback();
    },

    setHeadDlgCallback: function(func){
        this.func = func;
    },

    updateUI: function(data){
    	this.data = data;
    	this.txtName.string = this.data.pdata.name;
        if (this.data.pdata.gender == 1) {
            this.imgSex.spriteFrame = this.imgBoy;
        }else{
            this.imgSex.spriteFrame = this.imgGirl;
        };
        this.txtId.string = this.data.uid;

        this.txtIp.string = this.data.ip;

        var address = this.data.address;
        if (address) {
            this.txtAddr.string = address;
            this.txtAddr.node.color = new cc.Color(170,95,0);
            this.btnAddr.active = false;
        }else{
            if (PlayerData.getPlayerId() == this.data.uid) {
                this.txtAddr.string = "";
                this.btnAddr.active = true;
            }else{
                this.txtAddr.string = "该玩家未获取地理位置";
                this.txtAddr.node.color = new cc.Color(253,48,48,255);
                this.btnAddr.active = false;
            };
        };

        if (LoginData.GamePlatform == 2) {
            var self = this;
            cc.loader.load({url: data.pdata.avatarurl, type: 'jpg'},function (err, texture) {
                 var frame = new cc.SpriteFrame(texture);
                 self.imgPlayer.spriteFrame=frame;
            });
        };
    },

    start:function() {

    },

    onDestroy: function(){
        this.func();
    },

});