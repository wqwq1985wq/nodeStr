var BattleNetHelper = require('BattleNetHelper');
var BattleData = require('BattleData');
var HomeData = require('HomeData');
var LoginData = require('LoginData');
var SocketID = require('SocketID');
var EventEmitter = require('EventEmitter');
var RoomDestroyDlg = require('RoomDestroyDlg');
var ViewCommon = require('ViewCommon');
var Util = require('Util');
var LocalData = require('LocalData');

var BattleMain = cc.Class({
    extends: cc.Component,

    properties: {
    	btnChat: cc.Button,
        btnPos: cc.Button,
    	btnVoice: cc.Button,
    	btnReady: cc.Button,
    	btnInvite: cc.Button,
        btnSetting: cc.Node,

        imgRecordStart: cc.SpriteFrame,
        imgRecordStop: cc.SpriteFrame,

        imgDiePai: cc.SpriteFrame,
        imgPuPai: cc.SpriteFrame,

        btnPause: cc.Button,
        btnSpeed: cc.Button,
        btnSpeedDown: cc.Button,
        btnRoomMsg: cc.Button,
        btnExit: cc.Button,
        btnRefresh: cc.Button,
        btnChange: cc.Sprite,

        prefabDestroyDlg: cc.Prefab,

        prefabChatDlg: cc.Prefab,

        prefabBattleOverDlg: cc.Prefab,

        prefabRecordDlg: cc.Prefab,

        prefabSettingDlg:cc.Prefab,

        prefabWxSetting: cc.Prefab,

        prefabBattleAllOverDlg: cc.Prefab,

        prefabSafeDlg: cc.Prefab,

        tipNode: cc.Prefab,

        nodePlayers: cc.Node,

        nodeCards: cc.Node,

        txtRoomNum: cc.Label,

        txtZhuang: cc.Label,

        pnlBtlNode: cc.Node,
    },

    statics: {
        instance: null,
    },

    onLoad: function(){
        BattleMain.instance = this;

        var tipNode = cc.instantiate(this.tipNode);
        tipNode.position = cc.v2(0,0);
        this.node.addChild(tipNode);
        tipNode.setLocalZOrder(10);

        this.overFlag = false;

        this.pnlTop = this.pnlBtlNode.getChildByName("pnlTop");
        this.pnlTop.setScale(LocalData.getPnlScale());

        this.imgTop = this.pnlBtlNode.getChildByName("imgTop");
        this.imgTop.setScaleY(LocalData.getPnlScale());

        this.pnlPlayer = this.pnlBtlNode.getChildByName("pnlPlayer");
        this.pnlPlayer.setScale(LocalData.getPnlScale());

        this.pnlCard = this.pnlBtlNode.getChildByName("pnlCard");
        this.pnlCard.setScale(LocalData.getPnlScale());

        this.pnlAnim = this.pnlBtlNode.getChildByName("pnlAnim");
        this.pnlAnim.setScale(LocalData.getPnlScale());

        this.pnlCardZu = this.pnlCard.getChildByName("pnlCardZu");
        this.pnlCardZu.position = cc.v2(0,500*(1-LocalData.getPnlScale()));

        this.btnExit.node.position = cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+50,-39);

        this.txtRoomNum.node.position = cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+82,-39);
        this.txtZhuang.node.position = cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+292,-39);

        this.btnPause.node.position = cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+225,-39);

        this.btnSpeed.node.position = cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+326,-39);
        this.btnSpeedDown.node.position = cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+126,-39);

        if (BattleData.isCardRecord()) {
            this.btnPause.node.active = true;
            this.btnSpeed.node.active = true;
            this.btnSpeedDown.node.active = true;

            this.btnChat.node.active = false;
            this.btnPos.node.active = false;
            this.btnVoice.node.active = false;
            this.btnRefresh.node.active = false;

            this.btnChange.node.position = cc.v2(230*LocalData.getScreenScale()+32,-35);
            this.btnSetting.position = cc.v2(230*LocalData.getScreenScale()+107,-35);

            this.txtRoomNum.node.active = false;
            this.txtZhuang.node.active = false;
        }else{
            this.btnPause.node.active = false;
            this.btnSpeed.node.active = false;
            this.btnSpeedDown.node.active = false;

            this.btnChat.node.active = true;
            this.btnPos.node.active = true;
            this.btnVoice.node.active = true;
            this.btnRefresh.node.active = true;

            this.btnChange.node.position = cc.v2(230*LocalData.getScreenScale()+32,-35);
            this.btnRefresh.node.position = cc.v2(230*LocalData.getScreenScale()+107,-35);
            this.btnSetting.position = cc.v2(230*LocalData.getScreenScale()+182,-35);

            this.txtRoomNum.node.active = true;
            this.txtZhuang.node.active = true;

            //请求定位信息
            this.reqWxLocation();
        };

        this.chgStateBtnImg();

        this.players = this.nodePlayers.getComponent('Players');
        this.players.init();

        this.cards = this.nodeCards.getComponent('Cards');
        this.cards.init();

        this.updateUI();

        this.onBattleMyPlayerInfo();
    },

    chgStateBtnImg: function(){
        var state = LocalData.getBtlCardState();
        if (state == 1) {
            this.btnChange.spriteFrame = this.imgDiePai;
        }else if (state == 2) {
            this.btnChange.spriteFrame = this.imgPuPai;
        };
    },

    reqWxLocation: function()
    {
        if (LoginData.GamePlatform == 2) {
            var self = this;
            wx.getLocation({
                success: function(res) {
                    var latitude = res.latitude;
                    var longitude = res.longitude;
                    BattleNetHelper.reqGetLocation(latitude,longitude);
                },
                fail: function(res) {
                    self.getLocationFail();
                },
            });
        };
    },

    getLocationFail: function(){
        var self = this;
        wx.getSetting({
            success: function(res) {
                if (!res.authSetting['scope.userLocation']) {
                    self.onWxSettingCallback("location");
                }else{
                    ViewCommon.showAlertDlg("获取定位信息失败，请检查手机是否开启定位权限！")
                };
            },
            fail: function(res){
                ViewCommon.showAlertDlg("获取定位信息失败，请检查手机是否开启定位权限！")
            },
        });
    },

    start:function() {
        this.registerMsg();

        cc.audioEngine.stopMusic();

        this.btnVoice.node.on('touchstart', this.onTouchDown, this);
        this.btnVoice.node.on('touchend', this.onTouchUp, this);
        this.btnVoice.node.on('touchcancel', this.onTouchUp, this);

        this.pnlBtlNode.on("touchend", this.onTouchEnded, this);

        // this.onMusicVolumeChg();
    },

    onTouchEnded: function(){
        EventEmitter.emit("btlmain_touchend");
    },

    onTouchDown: function(){
        if (LoginData.GamePlatform == 2) {
            if (this.recordDlg) {
                return;
            };
            this.recordDlg = cc.instantiate(this.prefabRecordDlg);
            this.recordDlg.getComponent('RecordDlg').setCallback(this.recordDlgCb.bind(this));
            this.node.addChild(this.recordDlg);
            this.recordDlg.position = cc.p(0,0);
        }else{
            BattleNetHelper.reqSendVoiceChat('upload/haha.mp3');
        };
    },

    recordDlgCb: function(tag){
        if (tag == 1) {
            this.onWxSettingCallback("record");
            return;
        };
        this.recordDlg = null;
    },

    onTouchUp: function(){
        if (LoginData.GamePlatform == 2) {
            if (this.recordDlg != null) {
                this.recordDlg.getComponent('RecordDlg').stopRecord();
            };
        };
    },

    //回放 离开游戏
    onExitCallback: function(){
        if (BattleData.isCardRecord()) {
            cc.director.loadScene("HomeMain");
        }else{
            this.roomBaseInfo = BattleData.getRoomBaseInfo();
            if (this.roomBaseInfo.room_state == 1) {
                var self = this;
                if (BattleData.isRoomLeader()) {
                    BattleNetHelper.reqDestroyRoom();
                }else{
                    BattleNetHelper.reqExitRoom();
                };
            }else{
                var self = this;
                cc.loader.loadRes("newImg/prefab/ComDlgTwo", function (err, prefab) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    self.twoDlg = cc.instantiate(prefab);
                    var params = new Array();
                    params["title"] = "是否要发起解散房间？"
                    self.twoDlg.getComponent('ComDlgTwo').updateUI(params);
                    self.twoDlg.position = cc.v2(cc.winSize.width/2,cc.winSize.height/2);
                    self.node.parent.addChild(self.twoDlg);
                    
                    self.twoDlg.getComponent('ComDlgTwo').setCallback(function(){
                        BattleNetHelper.reqDestroyRoom();
                    });
                });
            };
        };
    },

    //暂停
    onPauseCallback: function(){
        var isPlaying = this.cards.pause();
        if (!isPlaying) {
            this.btnPause.node.getComponent(cc.Sprite).spriteFrame = this.imgRecordStop;
        }else{
            this.btnPause.node.getComponent(cc.Sprite).spriteFrame = this.imgRecordStart;
        };
    },

    //加速
    onSpeedCallback: function(){
        var num = this.cards.speedUp();
    },

    //减速
    onSpeedDownCallback: function(){
        var num = this.cards.speedDown();
    },

    //房间信息
    onRoomMsgCallback: function(){

    },

    //设置
    onSettingCallback: function(){
    	var prefabSetting = cc.instantiate(this.prefabSettingDlg);
        this.node.addChild(prefabSetting);
        prefabSetting.position = cc.p(0,0);
    },

    //打开授权弹框
    onWxSettingCallback: function(strType){
        var wxSettingPrefab = cc.instantiate(this.prefabWxSetting);
        wxSettingPrefab.getComponent('WxSettingDlg').setCallback(this.wxSettingCb.bind(this),strType);
        this.node.addChild(wxSettingPrefab);
        wxSettingPrefab.position = cc.p(0,0);
    },

    wxSettingCb: function(strType){
        var self = this;
        if (strType == "location") {
            wx.getSetting({
                success: function(res) {
                    if (res.authSetting['scope.userLocation']) {
                        self.reqWxLocation();
                    }else{
                        ViewCommon.showAlertDlg("定位授权未打开，无法定位！")
                    };
                },
            });
        };
    },

    //刷新
    onRefreshCallback: function(){
        BattleNetHelper.reqRefreshRoom2();
    },

    //切换
    onChangeCallback: function(){
        var haha1 = LocalData.getBtlCardState();
        if (haha1 == 1) {
            LocalData.setBtlCardState(2);
        }else if (haha1 == 2) {
            LocalData.setBtlCardState(1);
        };
        this.chgStateBtnImg();

        EventEmitter.emit("Client"+SocketID.SYNC_CARDSINFO);
    },

    //聊天
    onChatCallback: function(){
        var chatDlg = cc.instantiate(this.prefabChatDlg);
        this.node.addChild(chatDlg);
        chatDlg.position = cc.p(0,0);
    },

    //位置信息
    onPosCallback: function(){
        var posDlg = cc.instantiate(this.prefabSafeDlg);
        this.node.addChild(posDlg);
        posDlg.getComponent('SafeDlg').updateUI();
        posDlg.position = cc.p(0,0);
    },

    //语音
    onVoiceCallback: function(){

    },

    //准备
    onReadyCallback: function(){
        BattleNetHelper.reqRoomReady();
    },

    //邀请
    onInviteCallback: function(){
        if (LoginData.GamePlatform == 2) {
            var path = cc.url.raw("resources/newImg/share/share1.jpg");
            if (cc.loader.md5Pipe) {
                path = cc.loader.md5Pipe.transformURL(path);
            }
            path = wx.env.USER_DATA_PATH + '/' + path;
            wx.shareAppMessage({
                    title:"房号:"+this.roomBaseInfo.room_id+",局数:"+this.roomBaseInfo.times+",买庄:"+this.zhuangStr+",支付:"+this.payStr+",喜儿:"+this.xiStr,
                    query:"scene=BattleScene&room_id="+this.roomBaseInfo.room_id,
                    imageUrl:path,
                    success: function(e){
                        ViewCommon.showAlertDlg("发送成功！")
                    },
                    fail: function(e){
                        ViewCommon.showAlertDlg("发送失败！")
                    }
                });
        };
    },

    registerMsg: function(){
    	EventEmitter.on("Client"+SocketID.SYNC_ROOMINFO,this.updateUI,this);
        EventEmitter.on("BattleMyPlayerInfo",this.onBattleMyPlayerInfo,this);
        EventEmitter.on("Client"+SocketID.ROUND_OVER,this.onRoundOver,this);
        EventEmitter.on("Client"+SocketID.ROOM_LEAVE,this.onRoomLeave,this);
    },

    onRoundOver: function(data){
        // this.cards.clearCards();
        this.cards.roundOverDlgShow = true;
        var delay = 1;
        if (data.data.hu_pos == 0) {
            delay = 0;
        };
        this.node.runAction(
            cc.sequence(
                cc.delayTime(delay),
                cc.callFunc(function(){
                    this.cards.clearCards();
                    this.btlOverDlg = cc.instantiate(this.prefabBattleOverDlg);
                    this.btlOverDlg.position = cc.v2(0,0);
                    this.node.addChild(this.btlOverDlg);
                    this.btlOverDlg.getComponent('BattleOverDlg').updateUI(data);
                    this.btlOverDlg.getComponent('BattleOverDlg').setCallback(function () {
                        this.btlOverDlg.destroy();
                        this.cards.resumeCards();
                        //是历史记录回放
                        if (BattleData.isCardRecord()) {
                            cc.director.loadScene("HomeMain");
                        //战斗结束，弹出总战绩框
                        }else if (data.data.over) {
                            this.btlAllOverDlg = cc.instantiate(this.prefabBattleAllOverDlg);
                            this.btlAllOverDlg.position = cc.v2(0,0);
                            this.node.addChild(this.btlAllOverDlg);
                            this.btlAllOverDlg.getComponent('BattleAllOverDlg').updateUI(data,this.roomBaseInfo,this.myPlayerInfo);
                        }else{
                            Util.playAudio("resources/newImg/audio/effect/game_start3.mp3");

                            EventEmitter.emit("BattleBeginEvent");
                        };
                    }.bind(this));
                }.bind(this))
            )
        );
    },

    onBtlOverDlgClosed: function(){
        this.btlOverDlg.destroy();
    },

    onRoomLeave: function(){
        if (!this.cards.roundOverDlgShow && !this.btlAllOverDlg) {
            cc.director.loadScene("HomeMain");
            ViewCommon.showAlertDlg("您已离开房间！")
        }else{
            this.overFlag = true;
        }
    },

    onBattleMyPlayerInfo: function(){
        var data = BattleData.getMyPlayerInfo();
        if (data.state == 0) {
            this.btnReady.node.active = true;
        }else{
            this.btnReady.node.active = false;
        };
    },

    updateUI: function(){
        this.roomBaseInfo = BattleData.getRoomBaseInfo();

        this.myPlayerInfo = BattleData.getMyPlayerInfo();

        if (this.roomBaseInfo["act_flagtime"] > 0) {
            if (this.destroyDlg == null) {
                this.destroyDlg = cc.instantiate(this.prefabDestroyDlg);
                this.destroyDlg.position = cc.v2(0,0);
                this.node.addChild(this.destroyDlg);
            };
            this.destroyDlg.getComponent(RoomDestroyDlg).updateUI(
                this.roomBaseInfo["act_flagtime"],
                this.roomBaseInfo["act_pid"],
                this.roomBaseInfo["act_arr"]);
            
            // return;    
        }else{
            if (this.destroyDlg != null) {
                this.destroyDlg.destroy();
                this.destroyDlg = null;
            };
        };

        var roomPlayerInfo = BattleData.getRoomPlayerInfo();
        if (roomPlayerInfo) {
            var isFull = true;
            for (var i = 0; i < roomPlayerInfo.length; i++) {
                var info = roomPlayerInfo[i];
                if (info.pos_state == 0) {
                    isFull = false;
                    break;
                };
            };

            this.btnInvite.node.active = !isFull;  
        };

        this.txtRoomNum.string = "房号："+this.roomBaseInfo['room_id'];

        var zhuang = this.roomBaseInfo['zhuang'];
        var zhuangData = HomeData.ZhuangCfg[zhuang-1];
        var zhuangMsg = zhuangData.split("|");
        this.zhuangStr = "";
        for (var i = 0; i < zhuangMsg.length; i++) {
            this.zhuangStr = this.zhuangStr+zhuangMsg[i];
        };
        this.payStr = "";
        if (this.roomBaseInfo['paytype'] == 1) {
            this.payStr = "房主付";
        }else{
            this.payStr = "AA制";
        };

        this.xiStr = "";
        if (this.roomBaseInfo['xipai'] == 2) {
            this.xiStr = "带";
        }else{
            this.xiStr = "不带";
        };

        this.txtZhuang.string = "买庄："+this.zhuangStr;

    },

    onDestroy: function(){
        EventEmitter.emit("BattleDataInit");
        this.unRegisterMsg();
    },

    unRegisterMsg: function(){
    	EventEmitter.off("Client"+SocketID.SYNC_ROOMINFO,this.updateUI,this);
        EventEmitter.off("BattleMyPlayerInfo",this.onBattleMyPlayerInfo,this);
        EventEmitter.off("Client"+SocketID.ROUND_OVER,this.onRoundOver,this);
        EventEmitter.off("Client"+SocketID.ROOM_LEAVE,this.onRoomLeave,this);
    },



    // update (dt) {},
});
