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
        editBox2: cc.EditBox,

        prefabChargeSearch: cc.Prefab,
    },

    onLoad: function(){
        this.registerMsg();

        this.bReq = false;

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
    },

    onTouchEnded: function(event){
    	// if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    	// 	if (LoginData.GamePlatform == 2) {
     //            wx.offKeyboardComplete();
     //            wx.hideKeyboard();
     //        };
     //        this.node.destroy();
    	// };
    },

    onCloseCallback: function(){
        if (LoginData.GamePlatform == 2) {
            wx.offKeyboardComplete();
            wx.hideKeyboard();
        };
        this.node.destroy();
    },

    onSearchCallback: function(){
        var str = this.editBox1.string;
        if (str == "" || str == " ") {
            ViewCommon.showAlertDlg("玩家ID不能为空");
            return;
        };
        // this.editBox1.string;
        GmData.reqSinglePlayerInfo(parseInt(str));
    },

    onChargeCallback: function(){
        var str = this.editBox1.string;
        if (str == "" || str == " ") {
            ViewCommon.showAlertDlg("玩家ID不能为空");
            return;
        };

        var str1 = this.editBox2.string;
        if (str1 == "" || str1 == " ") {
            ViewCommon.showAlertDlg("充值金额不能为空");
            return;
        };
        if (isNaN(parseInt(str1))) {
            ViewCommon.showAlertDlg("充值金额只能为数字");
            return;
        };

        if (parseInt(str1) <= 0) {
            ViewCommon.showAlertDlg("充值金额只能是一个大于0的数");
            return;
        };

        this.bReq = true;
        GmData.reqSinglePlayerInfo(parseInt(str));
    },

    start:function() {

    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.GET_SINGLE_PLAYERINFO,this.onSinglePlayerInfo,this);

        EventEmitter.on("Client"+SocketID.CHARGE_FOR_PLAYER,this.onChargeForPlayer,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.GET_SINGLE_PLAYERINFO,this.onSinglePlayerInfo,this);

        EventEmitter.off("Client"+SocketID.CHARGE_FOR_PLAYER,this.onChargeForPlayer,this);
    },

    onSinglePlayerInfo: function(data){
        if (this.bReq) {
            this.bReq = false;

            var params = new Array();
            params["title"] = "是否要为"+data.name+"("+data.id+")充值"+parseInt(this.editBox2.string)+"钻石吗?";
            params['ok_func'] = this.agreeCb.bind(this);
            ViewCommon.showDlgTwo(params);
        }else{
            var chargeSearchDlg = cc.instantiate(this.prefabChargeSearch);
            this.node.addChild(chargeSearchDlg);
            chargeSearchDlg.getComponent('ChargeSearchDlg').updateUI(data);
            chargeSearchDlg.position = cc.p(0, 0);
        };
    },

    onChargeForPlayer: function(data){
        ViewCommon.showAlertDlg("充值成功！");
    },

    agreeCb: function(){
        GmData.reqChargeForPlayer(parseInt(this.editBox1.string),parseInt(this.editBox2.string));
    },

});