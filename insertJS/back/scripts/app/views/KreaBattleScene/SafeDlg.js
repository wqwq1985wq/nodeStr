var HomeData = require('HomeData');
var LocalData = require('LocalData');
var BattleNetHelper = require('BattleNetHelper');
var LoginData = require('LoginData');
var BattleMain = require('BattleMain');
var PlayerData = require('PlayerData');
var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');
var BattleData = require('BattleData');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
    	pnl1: cc.Node,
    	pnl2: cc.Node,
    	pnl3: cc.Node,
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

    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    updateUI: function(){
    	this.roomPlayerInfo = BattleData.getRoomPlayerInfo();
    	this.roomBaseInfo = BattleData.getRoomBaseInfo();

    	var myPos = -1;

    	for (var i = 0; i < this.roomPlayerInfo.length; i++) {
    		var info = this.roomPlayerInfo[i];
    		if (info.uid == PlayerData.getPlayerId()) {
    			myPos = i;
    		};
    	};

    	if (myPos > -1) {
    		this.updateMsg(this.roomPlayerInfo[myPos],1,myPos);

    		var pos = myPos + 1;
        	if (pos == 3) {
        		pos = 0;
        	};
        	this.updateMsg(this.roomPlayerInfo[pos],2,pos);

        	var pos = pos + 1;
        	if (pos == 3) {
        		pos = 0;
        	};
        	this.updateMsg(this.roomPlayerInfo[pos],3,pos);

    	};
    },

    updateMsg: function(info,i,pos){
    	var imgPlayer = this["pnl"+i].getChildByName("imgPlayer").getComponent(cc.Sprite);
		var imgLv = this["pnl"+i].getChildByName("imgLv");
		var imgHong = this["pnl"+i].getChildByName("imgHong");
		var txtDis = this["pnl"+i].getChildByName("txtDis").getComponent(cc.Label);
		
		if (info.pos_state == 0) {
			imgLv.active = false;
			imgHong.active = false;
			txtDis.string = "距离未知";
		}else{
			if (LoginData.GamePlatform == 2) {
	            cc.loader.load({url: info.pdata.avatarurl, type: 'jpg'},function (err, texture) {
	                 var frame = new cc.SpriteFrame(texture);
	                 imgPlayer.spriteFrame=frame;
	            });
	        };

			var address = info.address;
			if (address) {
				imgLv.active = true;
				imgHong.active = false;

				var pos = pos + 1;
		    	if (pos == 3) {
		    		pos = 0;
		    	};
				var nextInfo = this.roomPlayerInfo[pos];
				if (address) {
					console.log(info.lat,info.lng);
					if (nextInfo.pos_state == 0 || !nextInfo.address) {
						txtDis.string = "距离未知";
					}else{
						var dis = BattleData.getFlatternDistance(info.lat,info.lng,nextInfo.lat,nextInfo.lng);
						if (dis <= 10) {
							txtDis.string = Math.ceil(dis)+"米";
						}else if (dis > 1000) {
							txtDis.string = "大于1000米";
						}else{
							txtDis.string = Math.ceil(dis)+"米";
						};
					};
				};

			}else{
				imgLv.active = false;
				imgHong.active = true;
				txtDis.string = "距离未知";
			};
		};
    },

    start:function() {

    },

});