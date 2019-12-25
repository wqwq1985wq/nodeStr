var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
    	txtTip: cc.Label,
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

		this.wxgetSystemInfo();

    },

    wxgetSystemInfo: function(){
        this.pixelRatio = 1;
        this.windowWidth = 0;
        this.windowHeight = 0;

        var self = this;
        wx.getSystemInfo({
            success: function(data){
                self.pixelRatio = data.pixelRatio;
                self.windowWidth = data.windowWidth;
                self.windowHeight = data.windowHeight;
                
                self.wxLoginInfo();
            },
        })
    },

    //显示微信登录授权按钮
    wxLoginInfo: function(){
        var x1 = this.windowWidth * (cc.winSize.width/2-95)/cc.winSize.width
        var x2 = this.windowHeight * (cc.winSize.height/2+54-85)/cc.winSize.height

        if (this.wxSettingBtn) {
            return;
        };

        this.wxSettingBtn = wx.createOpenSettingButton({
            type: 'text',
            text: '',
            style: {
                left: x1,
                top: x2,
                width: 190/cc.winSize.height*this.windowHeight,
                height: 170/cc.winSize.height*this.windowHeight,
                lineHeight: 40,
                // backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        });
    },

    setCallback: function(func,strType){
    	this.func = func;
    	this.strType = strType;
    	if (strType == "location") {
    		this.txtTip.string = "点击下方按钮打开微信小游戏设置界面来开启定位权限！";
    	}else if (strType == "record") {
    		this.txtTip.string = "点击下方按钮打开微信小游戏设置界面来开启录音权限！";
    	};
    },

    onDestroy: function(){
    	this.func(this.strType);
    	if (this.wxSettingBtn != null) {
    		this.wxSettingBtn.destroy();
    	};
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
        
    },

    start:function() {

    },

});