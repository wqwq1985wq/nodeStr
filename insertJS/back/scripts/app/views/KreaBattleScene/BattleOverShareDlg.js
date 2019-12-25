var BattleData = require('BattleData');
var CardData = require('CardData');
var LoginData = require('LoginData');
var EventEmitter = require('EventEmitter');
var PlayerData = require('PlayerData');
var LocalData = require('LocalData');

cc.Class({
    extends: cc.Component,

    properties: {
    	pnlPlayer1: cc.Node,
        pnlPlayer2: cc.Node,
        pnlPlayer3: cc.Node,
        pnlRight1: cc.Node,
        pnlRight2: cc.Node,
        pnlRight3: cc.Node,
    },

    onLoad: function(){
    	this.registerMsg();

    	this.numLoaded = 0;

        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);

        this.pnlMid = this.node.getChildByName("pnlMid");
        if (this.pnlMid) {
            this.pnlMid.setScale(LocalData.getPnlScale());
        };
    },

    showPlayerImg: function(pos,avatarurl){
        var self = this;
        cc.loader.load({url: avatarurl, type: 'jpg'},function (err, texture) {
        	self.numLoaded = self.numLoaded + 1;
            var frame = new cc.SpriteFrame(texture);
            self['pnlPlayer'+pos].getChildByName('imgPlayer').getComponent(cc.Sprite).spriteFrame=frame;
        
            if (self.numLoaded == 3) {
            	self.onShareCallback();
            };
        });
    },

    setCallback: function(func){
    	this.func = func;
    },

    onShareCallback: function(){
    	var canvas = cc.game.canvas;
        var height = this.pnlMid.getContentSize().height*LocalData.getPnlScale();
        var width = this.pnlMid.getContentSize().width*LocalData.getPnlScale();

        var self = this;
        if (!this.isHistory) {
        	canvas.toTempFilePath({
	            x: (cc.winSize.width-width)/2,
	            y: (cc.winSize.height-height)/2,
	            width: width,
	            height: height,
	            // destWidth: width,
	            // destHeight: height,
	            fileType:"jpg",
	            success (res) {
	                wx.shareAppMessage({
	                    title:PlayerData.getPlayerData().name+"完成了一局比赛，赶紧去开一局吧！",
	                    query:"scene=HomeScene&share_type=createroom",
	                    imageUrl:res.tempFilePath,
	                    success: function(e){
	                    	self.func();
	                    },
	                    fail: function(e){
	                        self.func();
	                    }
	                });
	            }
	        })
        }else{
        	var self = this;
            canvas.toTempFilePath({
	            x: (cc.winSize.width-width)/2,
	            y: (cc.winSize.height-height)/2,
	            width: width,
	            height: height,
	            // destWidth: width,
	            // destHeight: height,
	            fileType:"jpg",
	            success (res) {
	                wx.shareAppMessage({
	                    title:PlayerData.getPlayerData().name+"分享了一局比赛，点击可以进入查看~",
	                    query:"scene=HomeScene&share_type=huifang&watch_id="+self.data.id,
	                    imageUrl:res.tempFilePath,
	                    success: function(e){
	                    	self.func();
	                    },
	                    fail: function(e){
	                        self.func();
	                    }
	                });
	            }
	        })
        };

        
    },

    updateUI: function(data,isHistory){
    	this.data = data;
    	this.isHistory = isHistory;
    	console.log(this.data.id,'111');
    	this.huInfo = data.data.hu_info;
    	this.baseCards = data.data.base_cards;
    	for (var i = 0; i < this.huInfo.length; i++) {
            var info = this.huInfo[i];
            var detail = info.detail;
            var pos = info.pos;
            var pInfo = BattleData.getRoomPlayerInfoByPos(pos);
            this["pnlPlayer"+pos].getChildByName("txtName").getComponent(cc.Label).string = pInfo.pdata.name;
            
            var myPos = BattleData.getMyPlayerInfo().pos;
            if (myPos == pos) {
                this["pnlPlayer"+pos].getChildByName('txtName').color = new cc.Color(36,194,36,255);
            };
            
            if (LoginData.GamePlatform == 2) {
                this.showPlayerImg(pos,pInfo.pdata.avatarurl);
            };

            this["pnlPlayer"+pos].getChildByName("imgZhuang").active = (detail.zhuang == 2);
            this["pnlPlayer"+pos].getChildByName("imgFirst").active = (pos==this.baseCards.round_firstpos);

            this["pnlRight"+pos].getChildByName("labelXi").getComponent(cc.Label).string = "喜牌 x"+detail.xi_cards.length;
            this["pnlRight"+pos].getChildByName("labelHu").getComponent(cc.Label).string = "胡数 "+info.hu;

            if (info.score >= 0) {
                this["pnlRight"+pos].getChildByName("labelScoreLose").getComponent(cc.Label).string = "";
                this["pnlRight"+pos].getChildByName("labelScoreWin").getComponent(cc.Label).string = "/"+info.score;
            }else{
                this["pnlRight"+pos].getChildByName("labelScoreLose").getComponent(cc.Label).string = "/"+Math.abs(info.score);
                this["pnlRight"+pos].getChildByName("labelScoreWin").getComponent(cc.Label).string = "";
            }
        };

        //清除carddata数据
        if (this.isHistory) {
            CardData.init();
        };
    },

    registerMsg: function(){
    	EventEmitter.on("sceneBackToShowEvent",this.onSceneBackToShow,this);
    },

    onDestroy: function(){
    	EventEmitter.off("sceneBackToShowEvent",this.onSceneBackToShow,this);
    },

    onSceneBackToShow: function(){
    	this.func();
    },

    start:function() {

    },

});