var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ShareData = require('ShareData');
var ShaderUtils = require("ShaderUtils");
var ViewCommon = require('ViewCommon');
var LoginData = require('LoginData');
var PlayerData = require('PlayerData');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
        txtGet: cc.Label,
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

        ShareData.reqGetShareInfo();
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.GET_SHAREINFO,this.updateUI,this);

        EventEmitter.on("Client"+SocketID.GET_SHAREAWARD,this.onGetShareAward,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.GET_SHAREINFO,this.updateUI,this);

        EventEmitter.off("Client"+SocketID.GET_SHAREAWARD,this.onGetShareAward,this);
    },

    onGetShareAward: function(){

    },

    updateUI: function(){
        var reward = ShareData.ShareCfg;
        var num = (reward.split("|"))[1];

        this.data = ShareData.shareInfo;
        var signDay = this.data.share_day;
        var nowDay = this.data.now_day;

        //已领取
        // if (signDay == nowDay) {
        //     this.txtGet.string = "今日分享奖励已领取！";
        //     this.txtGet.node.color = new cc.Color(100,100,100,255);
        // }else{
        //     this.txtGet.string = "今日分享奖励尚未领取！";
        //     this.txtGet.node.color = new cc.Color(34,230,42,255);
        // };
    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    onWechatCallback: function(){
        if (LoginData.GamePlatform == 2) {
            var path = cc.url.raw("resources/newImg/share/share2.jpg");
            if (cc.loader.md5Pipe) {
                path = cc.loader.md5Pipe.transformURL(path);
            }
            path = wx.env.USER_DATA_PATH + '/' + path;
            console.log(path,'onWechatCallback');
            wx.shareAppMessage({
                    title:"我正在玩咱南通人自己的长牌游戏，快来加入吧~",
                    query:"scene=HomeScene&age=11",
                    imageUrl:path,
                    success: function(e){
                        // ShareData.reqGetShareAward();
                        ViewCommon.showAlertDlg("分享成功！");
                    },
                    fail: function(e){
                        ViewCommon.showAlertDlg("分享失败！");
                    }
                });
        }else{
            // ShareData.reqGetShareAward();
            ViewCommon.showAlertDlg("分享成功！");
        }
    },

    start:function() {

    },

});