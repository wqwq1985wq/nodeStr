var HomeData = require('HomeData');
var RelationData = require('RelationData');
var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ShaderUtils = require("ShaderUtils");
var LoginData = require('LoginData');
var PlayerData = require('PlayerData');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
    	proBar: cc.ProgressBar,
    	btnAward1: cc.Button,
    	btnAward2: cc.Button,
    	btnAward3: cc.Button,
    	btnAward4: cc.Button,
    	btnAward5: cc.Button,

        btnGotAward1: cc.Button,
        btnGotAward2: cc.Button,
        btnGotAward3: cc.Button,
        btnGotAward4: cc.Button,
        btnGotAward5: cc.Button,

        txtAward1: cc.Label,
        txtAward2: cc.Label,
        txtAward3: cc.Label,
        txtAward4: cc.Label,
        txtAward5: cc.Label,

    	txtNum: cc.Label,
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
        
    	this.registerMsg();

		this.node.on("touchend", this.onTouchEnded, this);

		// this.btnAward1.interactable = false;
		// this.btnAward2.interactable = false;
		// this.btnAward3.interactable = false;
		// this.btnAward4.interactable = false;
		// this.btnAward5.interactable = false;

		RelationData.reqGetRelationInfo();
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.GET_RELATIONINFO,this.onGetRelationInfo,this);

        EventEmitter.on("Client"+SocketID.GET_RELATION_AWARD,this.onGetRelationAward,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.GET_RELATIONINFO,this.onGetRelationInfo,this);

        EventEmitter.off("Client"+SocketID.GET_RELATION_AWARD,this.onGetRelationAward,this);
    },

    onGetRelationInfo: function(data){
    	this.data = data;
    	var cfgData = RelationData.RelationCfg;
    	var inviteNum = this.data.invite_num;
    	this.gotTimes = this.data.got_times;

    	this.txtNum.string = inviteNum;

    	this.canGotTimes = 0;
    	for (var i = 0; i < cfgData.length; i++) {
    		if (inviteNum >= cfgData[i].num) {
    			this.canGotTimes = this.canGotTimes + 1;
    			if (this.gotTimes < this.canGotTimes) {
    				//可领取但未领取
    				// this['btnAward'+(i+1)].interactable = true;
                    this['btnAward'+(i+1)].node.active = true;
                    this['btnGotAward'+(i+1)].node.active = false;
                    ViewCommon.playShakeAction(this['btnAward'+(i+1)].node.getComponent(cc.Sprite).node);
    			}else{
    				//领取了
    				this['btnAward'+(i+1)].node.active = false;
                    this['btnGotAward'+(i+1)].node.active = true;
    			};
    		}else{
    			//未到达领取条件
    			// this['btnAward'+(i+1)].interactable = false;
                this['btnAward'+(i+1)].node.active = true;
                this['btnGotAward'+(i+1)].node.active = false;
    		};

            this['txtAward'+(i+1)].string = inviteNum+"/"+cfgData[i].num;

    	};
    	this.proBar.progress = this.canGotTimes/cfgData.length;
    },

    onGetRelationAward: function(data){

    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onBtnAwardCallback: function(event,data){
        if (this.canGotTimes < data) {
            var award = RelationData.RelationCfg[data-1].award;
            ViewCommon.showAlertDlg("达到条件可获得"+(award.split("|"))[1]+"钻石");
        }else{
            RelationData.reqGetRelationAward();
        };
    },

    onBtnAwardCallback2: function(event,data){
        ViewCommon.showAlertDlg("该阶段奖励已领取！");
    },

    onShareCallback: function(){
        if (LoginData.GamePlatform == 2) {
            var path = cc.url.raw("resources/newImg/share/share3.jpg");
            if (cc.loader.md5Pipe) {
                path = cc.loader.md5Pipe.transformURL(path);
            }
            path = wx.env.USER_DATA_PATH + '/' + path;
            wx.shareAppMessage({
                    title:"我正在玩南通长牌,我的ID为"+PlayerData.getPlayerId()+",填写我的ID领钻石喽~",
                    query:"scene=HomeScene&age=11",
                    imageUrl:path,
                    success: function(e){
                        ViewCommon.showAlertDlg("分享成功！");
                    },
                    fail: function(e){
                        ViewCommon.showAlertDlg("分享失败！");
                    }
                });
        }else{
            ViewCommon.showAlertDlg("分享成功！");
        }
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    start:function() {

    },

});