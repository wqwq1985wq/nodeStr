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

        txtTitle: cc.Label,
        txtBtnDaili: cc.Label,
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
		this.node.on("touchend", this.onTouchEnded, this);
    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
            if (LoginData.GamePlatform == 2) {
                wx.offKeyboardComplete();
                wx.hideKeyboard();
            };
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
        if (LoginData.GamePlatform == 2) {
            wx.offKeyboardComplete();
            wx.hideKeyboard();
        };
        this.node.destroy();
    },

    onChangeCallback: function(){
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

        EventEmitter.on("Client"+SocketID.CHG_DAILI,this.onChgDaili,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.GET_SINGLE_PLAYERINFO,this.onSinglePlayerInfo,this);

        EventEmitter.off("Client"+SocketID.CHG_DAILI,this.onChgDaili,this);
    },

    onSinglePlayerInfo: function(data){
        var params = new Array();
        if (this.state == 1) {
        	params["title"] = "是否要把"+data.name+"("+data.id+")设为代理?";
        }else{
        	params["title"] = "是否要把"+data.name+"("+data.id+")取消代理?";
        };
        params['ok_func'] = this.agreeCb.bind(this);
        ViewCommon.showDlgTwo(params);
        
    },

    updateUI: function(state){
    	this.state = state;

    	if (this.state == 1) {
    		this.txtTitle.string = "设置代理";
    		this.txtBtnDaili.string = "设置代理";
    	}else if (this.state == 0) {
    		this.txtTitle.string = "取消代理";
    		this.txtBtnDaili.string = "取消代理";
    	};

    },

    onChgDaili: function(data){
        ViewCommon.showAlertDlg("操作成功！");
    },

    agreeCb: function(){
        GmData.reqChgDaili(parseInt(this.editBox1.string),this.state);
    },

});