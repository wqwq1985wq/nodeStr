var HomeData = require('HomeData');
var PlayerData = require('PlayerData');
var SocketID = require('SocketID');
var SignData = require('SignData');
var ShareData = require('ShareData');
var RelationData = require('RelationData');
var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');
var BattleNetHelper = require('BattleNetHelper');
var LocalData = require('LocalData');
var LoginData = require('LoginData');
var MailData = require('MailData');
var CardData = require('CardData');
var ClientSocket = require('ClientSocket');
// var EnterRoomDlg = require('EnterRoomDlg');

cc.Class({
    extends: cc.Component,

    properties: {
        btnCreate:cc.Button,
        btnEnter:cc.Button,
        btnShop:cc.Button,
        btnDiamond:cc.Button,
        imgCreate:cc.Sprite,

        imgHead:cc.Sprite,

        imgBg: cc.Node,

        tipNode: cc.Prefab,

        //人物信息
        txtName: cc.Label,
        txtId: cc.Label,
        txtDiamond: cc.Label,

        btnChgState: cc.Node,

        enterRoomDlg:cc.Prefab,
        prefabCreateRoom:cc.Prefab,
        prefabSettingDlg:cc.Prefab,
        prefabShareDlg: cc.Prefab,
        prefabInviteDlg: cc.Prefab,
        prefabFuliDlg: cc.Prefab,
        prefabMailDlg: cc.Prefab,
        prefabSignDlg: cc.Prefab,
        prefabRelationDlg: cc.Prefab,
        prefabShopDlg: cc.Prefab,
        prefabDailiDlg: cc.Prefab,

        prefabChgState: cc.Prefab,

        prefabWaitingRoomDlg: cc.Prefab,

        prefabGonggaoDlg: cc.Prefab,

        prefabHistory: cc.Prefab,
        prefabHelp: cc.Prefab,
        spResume: cc.SpriteFrame,

        imgInviteRed: cc.Node,
        imgBangdingRed: cc.Node,
        imgRelationRed: cc.Node,
        imgMailRed: cc.Node,
        txtMailNum: cc.Label,
    },

    showWaitingRoomDlg: function(params){
        if (this.waitingRoomDlg) {
            return;
        };
        this.waitingRoomDlg = cc.instantiate(this.prefabWaitingRoomDlg);
        this.node.addChild(this.waitingRoomDlg);
        this.waitingRoomDlg.position = cc.p(0,0);
        this.waitingRoomDlg.getComponent('WaitingRoomDlg').setCallback(params,this.waitingRoomCb.bind(this));
    },

    waitingRoomCb: function(params){
        this.hideWaitingRoomDlg();
        if (params) {
            EventEmitter.emit("WaitingDlgShowEvent",params);
            ClientSocket.setRequestData({"socketID":params.socketID,"room_id":params.roomId});
        }else{
            ViewCommon.showAlertDlg("网络不好，请关闭微信后台，再重新进入！");
        };
    },

    hideWaitingRoomDlg: function(){
        if (this.waitingRoomDlg) {
            this.waitingRoomDlg.destroy();
            this.waitingRoomDlg = null;
        };
    },
 
    onLoad: function(){
        var tipNode = cc.instantiate(this.tipNode);
        tipNode.position = cc.v2(0,0);
        this.node.addChild(tipNode);
        tipNode.setLocalZOrder(10);

        CardData.init();

        this.imgBg.setScale(LocalData.getScreenScale());

        this.btnDiamond.node.active = false;
        // this.btnShop.node.active = false;

        this.pnlBottom = this.node.getChildByName("pnlBottom");
        this.pnlBottom.setScale(LocalData.getPnlScale());

        this.pnlMid = this.node.getChildByName("pnlMid");
        this.pnlMid.setScale(LocalData.getPnlScale());

        this.pnlTop = this.node.getChildByName("pnlTop");
        this.pnlTop.setScale(LocalData.getPnlScale());
    },

    start:function() {

        this.registerMsg();

        cc.audioEngine.playMusic(cc.url.raw("resources/newImg/audio/bg_music.mp3"),true);


        if (HomeData.isHaveRoom()) {
        	this.imgCreate.spriteFrame = this.spResume;

            this.showWaitingRoomDlg();

            HomeData.reqBackRoom();
        }else{
            if(!HomeData.reqShareRoom()){
                if (!HomeData.reqHuifangRoom()) {
                    if(!HomeData.shareCreateRoom()){
                        if (LoginData.ggShow) {
                            LoginData.setShowGonggao(false);
                            this.showGonggao();
                        }else{
                            if (SignData.signInfo != null && SignData.signInfo.sign_day != SignData.signInfo.now_day) {
                                this.showSignDlg();
                            };
                        };
                    };
                };
            };
        }

        if (PlayerData.getPlayerAttrData() != null) {
            this.updateUI();
        };

        //每日分享红点
        if (ShareData.shareInfo != null) {
            this.onGetShareInfo();
        };

        //邮件红点
        if (MailData.mailInfo != null) {
            this.onGetMailInfo();
        };

        this.onGetRelationInfo();

        this.btnChgState.active = PlayerData.getPlayerId() == 520110;
    },

    showGonggao: function(){
        var ggDlg = cc.instantiate(this.prefabGonggaoDlg);
        this.node.addChild(ggDlg);
        ggDlg.position = cc.p(0,0);
        ggDlg.getComponent('GonggaoDlg').setCallback(this.gonggaoCb.bind(this));
    },

    gonggaoCb: function(){
        if (SignData.signInfo != null && SignData.signInfo.sign_day != SignData.signInfo.now_day) {
            this.showSignDlg();
        };
    },

    showSignDlg: function(){
        var signDlg = cc.instantiate(this.prefabSignDlg);
        this.node.addChild(signDlg);
        signDlg.position = cc.p(0,0);
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.SYNC_PLAYERINFO,this.updateUI,this);

        EventEmitter.on("WaitingDlgCloseEvent",this.onWaitingDlgCloseEvent,this);
        
        EventEmitter.on("WaitingDlgShowEvent",this.showWaitingRoomDlg,this);

        EventEmitter.on("Client"+SocketID.GET_SHAREINFO,this.onGetShareInfo,this);

        EventEmitter.on("Client"+SocketID.GET_SIGNINFO,this.onGetSignInfo,this);

        EventEmitter.on("Client"+SocketID.GET_RELATIONINFO,this.onGetRelationInfo,this);

        EventEmitter.on("Client"+SocketID.GET_MAILINFO,this.onGetMailInfo,this);

        EventEmitter.on("SaveCreateRoomEvent",this.onCreateCallback,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.SYNC_PLAYERINFO,this.updateUI,this);

        EventEmitter.off("WaitingDlgCloseEvent",this.onWaitingDlgCloseEvent,this);

        EventEmitter.off("WaitingDlgShowEvent",this.showWaitingRoomDlg,this);

        EventEmitter.off("Client"+SocketID.GET_SHAREINFO,this.onGetShareInfo,this);

        EventEmitter.off("Client"+SocketID.GET_SIGNINFO,this.onGetSignInfo,this);

        EventEmitter.off("Client"+SocketID.GET_RELATIONINFO,this.onGetRelationInfo,this);

        EventEmitter.off("Client"+SocketID.GET_MAILINFO,this.onGetMailInfo,this);

        EventEmitter.off("SaveCreateRoomEvent",this.onCreateCallback,this);
    },

    onGetMailInfo: function(){
        var info = MailData.getMailInfo();
        var noReadNum = 0;
        for (var i = 0; i < info.length; i++) {
            if(info[i].is_get == 0){
                noReadNum = noReadNum + 1;
            };
        };
        this.imgMailRed.active = (noReadNum > 0);
        this.txtMailNum.string = noReadNum;
    },

    onGetSignInfo: function(){

    },

    onGetRelationInfo: function(){
        var info = RelationData.relationInfo;
        if (info == null) {
            return;
        };

        this.imgBangdingRed.active = (info.relation_uid == 0);

        var cfgData = RelationData.RelationCfg;
        var inviteNum = info.invite_num;
        var gotTimes = info.got_times;
        var canGotTimes = 0;
        var showRed = false;
        for (var i = 0; i < cfgData.length; i++) {
            if (inviteNum >= cfgData[i].num) {
                canGotTimes = canGotTimes + 1;
                if (gotTimes < canGotTimes) {
                    showRed = true;
                    break;
                };
            };
        };
        this.imgRelationRed.active = showRed;
    },

    onGetShareInfo: function(){
        var info = ShareData.shareInfo;
        var signDay = info.share_day;
        var nowDay = info.now_day;
        // //已领取
        // if (signDay == nowDay) {
        this.imgInviteRed.active = false;//(signDay != nowDay);
        // }else{

        // };
    },

    onWaitingDlgCloseEvent: function(){
        this.hideWaitingRoomDlg();
    },

    updateUI: function(){
        this.txtDiamond.string = PlayerData.getPlayerAttrData().diamond;

        this.txtId.string = "ID:"+PlayerData.getPlayerId();

        this.txtName.string = PlayerData.getPlayerData().name;


        if (LoginData.GamePlatform == 2) {
            var self = this;
            cc.loader.load({url: PlayerData.getPlayerData().avatarurl, type: 'jpg'},function (err, texture) {
                 var frame = new cc.SpriteFrame(texture);
                 self.imgHead.spriteFrame=frame;
            });
        };
    },

    onEnterCallback: function(){
        var enterRoomDlg = cc.instantiate(this.enterRoomDlg);
        this.node.addChild(enterRoomDlg);
        enterRoomDlg.position = cc.p(0, 0);
    },

    onGoldMatchCallback: function(){
        ViewCommon.showAlertDlg("暂未开放！")
    },

    autoEnterRoom: function(){
        if (HomeData.isHaveRoom()) {
            HomeData.reqBackRoom();
        }else{
            HomeData.reqCreateRoom();
        };
    },

    //福利界面
    onFuliCallback: function(){
        var nodeFuli = cc.instantiate(this.prefabFuliDlg);
        this.node.addChild(nodeFuli);
        nodeFuli.getComponent("FuliDlg").setCallback(this.onCloseFuliCallback.bind(this));
        nodeFuli.position = cc.p(0,0);
    },

    onShopCallback: function(){
        // ViewCommon.showAlertDlg("暂未开放！")
        if (PlayerData.getPlayerData().daili == 1 || 
            PlayerData.getPlayerId() == 520110 ||
            PlayerData.getPlayerId() == 520160) {
            cc.director.loadScene("GmHomeMain");
        }else{
            ViewCommon.showAlertDlg("暂未开放！")
            // var dailiDlg = cc.instantiate(this.prefabDailiDlg);
            // this.node.addChild(dailiDlg);
            // dailiDlg.position = cc.p(0,0);
        };
        // var nodeShop = cc.instantiate(this.prefabShopDlg);
        // this.node.addChild(nodeShop);
        // nodeShop.position = cc.p(0,0);
    },

    onCloseFuliCallback: function(state){
        if (state == 1) {
            this.showSignDlg();
        }else if (state == 2) {
            this.onBangCallback();
        }else if (state == 3) {
            this.onShareCallback();
        };
    },

    //绑定激活码界面
    onBangCallback: function(){
        var nodeBang = cc.instantiate(this.prefabInviteDlg);
        this.node.addChild(nodeBang);
        nodeBang.position = cc.p(0,0);
    },

    //根据id添加钻石


    //邮件界面
    onMailCallback: function(){
        var nodeMail = cc.instantiate(this.prefabMailDlg);
        this.node.addChild(nodeMail);
        nodeMail.position = cc.p(0,0);
    },

    //分享界面
    onShareCallback: function(){
        var nodeShare = cc.instantiate(this.prefabShareDlg);
        this.node.addChild(nodeShare);
        nodeShare.position = cc.p(0,0);
    },

    //邀请得奖励
    onRelationCallback: function(){
        var nodeRelation = cc.instantiate(this.prefabRelationDlg);
        this.node.addChild(nodeRelation);
        nodeRelation.position = cc.p(0,0);
    },

    //改变玩家状态
    onChgStateCallback: function(){
        var nodeRelation = cc.instantiate(this.prefabChgState);
        this.node.addChild(nodeRelation);
        nodeRelation.position = cc.p(0,0);
    },

    //设置界面
    onSettingCallback: function(){
        var nodeSetting = cc.instantiate(this.prefabSettingDlg);
        this.node.addChild(nodeSetting);
        nodeSetting.position = cc.p(0,0);
    },

    //查看玩法帮助
    onHelpCallback: function(){
        var nodeHelp = cc.instantiate(this.prefabHelp);
        this.node.addChild(nodeHelp);
        nodeHelp.position = cc.p(0,0);
    },

    onCreateCallback: function(){
        if (HomeData.isHaveRoom()) {
            HomeData.reqBackRoom();
        }else{
            var createRoomDlg = cc.instantiate(this.prefabCreateRoom);
            this.node.addChild(createRoomDlg);
            createRoomDlg.position = cc.p(0,0);
        };
    },


    //查看历史战绩
    onHistoryCallback: function(){
        var nodeHistory = cc.instantiate(this.prefabHistory);
        this.node.addChild(nodeHistory);
        nodeHistory.position = cc.p(0, 0);
    },


    // update (dt) {},
});
