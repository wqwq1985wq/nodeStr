var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var ViewCommon = require('ViewCommon');
var ErrorData = require('ErrorData');
var LocalData = require('LocalData');
var CardData = require('CardData');
var PlayerData = require('PlayerData');
var BattleNetHelper = require('BattleNetHelper');

//1开发测试平台 2微信小游戏平台 3 h5平台
var GamePlatform = ClientSocket.GamePlatform;

module.exports={

    GamePlatform: GamePlatform,

    registerMsg: function()
    {
        this.init();

    	EventEmitter.on(SocketID.ACCOUNT_LOGIN,this.onAccountLogin,this);

        EventEmitter.on(SocketID.USER_LOGIN,this.onUserLogin,this);

        EventEmitter.on(SocketID.SERVER_MSG,this.onServerMsg,this);

    	EventEmitter.on(SocketID.ERROR_CODE,this.onErrorCode,this);

        EventEmitter.on("reqAccountLogin",this.reqAccountLogin,this);

        EventEmitter.on("wsSendBinaryOpenEvent",this.wsSendBinaryOpenEvent,this);

        EventEmitter.on("reqWxLocation",this.reqWxLocation,this);
    },

    init: function(){
        this.ggShow = true;

        this.isOpen = false;
    },

    setShowGonggao: function(flag){
        this.ggShow = flag;
    },

    wsSendBinaryOpenEvent: function(){
        if (this.GamePlatform == 2) {
            this.onWechatLogin();
        }else{
            if (cc.director.getScene().getName() != "LoginMain") {
                EventEmitter.emit("reqAccountLogin");
            };
        };
    },

    onServerMsg: function(data){
        this.leisure = data.leisure;
    },

    //微信转发监听
    onWechatShare: function(){
        var self = this;
        wx.onShow(function(res){
            self.onShow(res.query);
        });

        wx.onHide(function(res){
            self.onHide();
        });

        var res = wx.getLaunchOptionsSync();
        this.onShow(res.query);
    },

    onShow: function(query){
        var sceneName = query.scene;
        if (sceneName =="BattleScene" || sceneName == "HomeScene") {
            this.isOpen = true;
        };
        var deltaTime = setInterval(function(){
            EventEmitter.emit("sceneBackToShowEvent");
            var sceneName = query.scene;
            if (sceneName) {
                if (sceneName == "BattleScene") {
                    var roomId = query.room_id;
                    EventEmitter.emit("saveShareRoomId",parseInt(roomId));
                }else if (sceneName == "HomeScene") {
                    var shareType = query.share_type;
                    if (shareType == "huifang") {
                        EventEmitter.emit("saveHuifangRoomId",parseInt(query.watch_id));
                    }else if (shareType == "createroom") {
                        EventEmitter.emit("saveCreateRoom");
                    };
                };
            };

            clearInterval(deltaTime);
        },1000);
    },

    onHide: function(){
        cc.audioEngine.stopAll();
    },

    onWechatLogin: function(){
        this.loginCode = "";
        
        var self = this;
        wx.login({
            success: function (data) {
                self.loginCode = data.code;

                wx.getUserInfo({
                    fail: function (res) {
                        if (cc.director.getScene().getName() != "LoginMain") {
                            cc.director.loadScene("LoginMain");
                        }else{
                            EventEmitter.emit("wechatAuthorInfo");
                        };
                    },
                    success: function(data){
                        var agreeState = LocalData.getAgreementState();
                        if (cc.director.getScene().getName() == "LoginMain" && agreeState == 0) {
                            EventEmitter.emit("wechatAuthorInfo");
                            return;
                        }
                        self.reqWxLogin(data);
                    },
                })
            },
            fail: function(){
                ViewCommon.showAlertDlg("小游戏登录失败，请关闭重新登陆！")
            },
        })
    },

    reqWxLogin: function(data){
        var data = JSON.parse(data.rawData);
        this.reqUserLogin(data);
    },

    onErrorCode: function(data){
        ViewCommon.showAlertDlg(ErrorData.errString[data.errcode-1]);

        if (data.errcode == 3 || data.errcode == 4 || data.errcode == 14 || data.errcode == 15) {
            EventEmitter.emit("WaitingDlgCloseEvent");

            if (cc.director.getScene().getName() == "BattleMain") {
                CardData.init();
                if (PlayerData.getPlayerData().state == 0 && PlayerData.getPlayerId() != 520110) {
                    cc.director.loadScene("XHomeMain");
                }else{
                    cc.director.loadScene('LoadingMain');
                    //cc.director.loadScene("HomeMain");
                };

            };
        //重新登陆
        }else if (data.errcode == 2) {

            // cc.director.loadScene("LoginMain");
        };
    },

    onAccountLogin: function(data){
        EventEmitter.emit("NetworkUIhideExceptionDlg");
    	if (cc.director.getScene().getName() == "LoginMain") {
    		if (PlayerData.getPlayerData().state == 0 && PlayerData.getPlayerId() != 520110) {
                cc.director.loadScene("XHomeMain");
            }else{
                cc.director.loadScene('LoadingMain');
                //cc.director.loadScene("HomeMain");
            };
    	};
    },

    onUserLogin: function(data){
        EventEmitter.emit("NetworkUIhideExceptionDlg");
        if (cc.director.getScene().getName() == "LoginMain") {
            if (PlayerData.getPlayerData().state == 0 && PlayerData.getPlayerId() != 520110) {
                cc.director.loadScene("XHomeMain");
            }else{
                cc.director.loadScene('LoadingMain');
                //cc.director.loadScene("HomeMain");
            };
        };
    },

    setToken: function(token){
    	this.token = token;
    },

    reqAccountLogin: function(token){
    	if (!token) {
    		if (this.token != null) {
    			token = this.token;
    		}else{
    			token = "123456789";
    		};
    	};

    	var wxkey = "123456789";

    	ClientSocket.setRequestData({"socketID":SocketID.ACCOUNT_LOGIN,"token":token,"wxkey":wxkey});
    },

    reqUserLogin: function(data){
        if (this.isOpen) {
            ClientSocket.setRequestData({"socketID":SocketID.USER_LOGIN,"code":this.loginCode,"data":data,"is_open":true});
        }else{
            ClientSocket.setRequestData({"socketID":SocketID.USER_LOGIN,"code":this.loginCode,"data":data});
        };
    },


    reqWxLocation: function(needShowSetting)
    {
        if (this.GamePlatform == 2) {
            var self = this;
            wx.getLocation({
                success: function(res) {
                    var latitude = res.latitude;
                    var longitude = res.longitude;
                    BattleNetHelper.reqGetLocation(latitude,longitude);
                },
                fail: function(res) {
                    console.log(res);
                    ViewCommon.showAlertDlg("您的定位权限未打开，点击右上角的···按钮来开启权限");
                },
            });
        };
    },
    
};