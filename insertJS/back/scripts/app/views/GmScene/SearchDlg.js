var LocalData = require('LocalData');
var LoginData = require('LoginData');
var ViewCommon = require('ViewCommon');
var GmData = require('GmData');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,

        editBox1: cc.EditBox,

        txtName: cc.Label,
        txtDiamond: cc.Label,
    },

    onLoad: function(){
        this.registerMsg();

        this.pnlMid = this.node.getChildByName("pnlMid");
        if (this.pnlMid) {
            ViewCommon.playDlgAction(this.pnlMid);
        };

        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);
    },

    onCloseCallback: function(){
        if (LoginData.GamePlatform == 2) {
            wx.offKeyboardComplete();
            wx.hideKeyboard();
        };
        this.node.destroy();
    },

    onChargeCallback: function(){
        var str = this.editBox1.string;
        if (str == "" || str == " ") {
            ViewCommon.showAlertDlg("玩家ID不能为空");
            return;
        };

        GmData.reqSinglePlayerInfo(parseInt(str));
    },

    start:function() {

    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.GET_SINGLE_PLAYERINFO,this.onSinglePlayerInfo,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.GET_SINGLE_PLAYERINFO,this.onSinglePlayerInfo,this);
    },

    onSinglePlayerInfo: function(data){
    	this.txtName.string = "姓名："+data.name;
    	this.txtDiamond.string = "钻石："+data.diamond;
    },

});