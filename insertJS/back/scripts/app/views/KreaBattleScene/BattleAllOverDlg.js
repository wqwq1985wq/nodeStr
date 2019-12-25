var BattleData = require('BattleData');
var LoginData = require('LoginData');
var HomeData = require('HomeData');
var LocalData = require('LocalData');
var Util = require('Util');
var EventEmitter = require('EventEmitter');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	txtRoomId: cc.Label,
    	txtZhuang: cc.Label,
    	txtPay: cc.Label,

    	pnlPlayer1: cc.Node,
    	pnlPlayer2: cc.Node,
    	pnlPlayer3: cc.Node,

        prefabShareDlg: cc.Prefab,
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
    },

    start:function() {

    },

    updateUI: function(data,roomBaseInfo,myPlayerInfo){
        this.data = data;
    	this.roomBaseInfo = roomBaseInfo;
        this.myPlayerInfo = myPlayerInfo;

        var zhuang = this.roomBaseInfo['zhuang'];
        var zhuangData = HomeData.ZhuangCfg[zhuang-1];
        var zhuangMsg = zhuangData.split("|");
        var zhuangStr = "";
        for (var i = 0; i < zhuangMsg.length; i++) {
            zhuangStr = zhuangStr+zhuangMsg[i];
        };
        this.txtZhuang.string = "买庄："+zhuangStr;

        this.txtRoomId.string = "房号："+this.roomBaseInfo['room_id'];

        var payStr = "";
        if (this.roomBaseInfo['paytype'] == 1) {
            payStr = "房主付";
        }else{
            payStr = "AA制";
        };
        this.txtPay.string = "支付："+payStr;


    	this.huInfo = data.data.hu_info;
        this.baseCards = data.data.base_cards;

        var winPos = 1;
        var maxScore = -9999;
        for (var i = 0; i < this.huInfo.length; i++) {
            var info = this.huInfo[i];
            var pos = info.pos;
            var pInfo = BattleData.getRoomPlayerInfoByPos(pos);
            this["pnlPlayer"+pos].getChildByName("txtName").getComponent(cc.Label).string = pInfo.pdata.name;
            this["pnlPlayer"+pos].getChildByName("txtId").getComponent(cc.Label).string = pInfo.pdata.id;
            if (pInfo.pdata.id == this.roomBaseInfo.room_leader) {
            	this["pnlPlayer"+pos].getChildByName("imgFirst").active = true;
            }else{
            	this["pnlPlayer"+pos].getChildByName("imgFirst").active = false;
            };
            var myPos = myPlayerInfo.pos;
            if (myPos == pos) {
                this["pnlPlayer"+pos].getChildByName('txtName').color = new cc.Color(36,194,36,255);
                
                if (info.total_score >= 0) {
                    EventEmitter.emit("WinOrLoseAudioEvent",true);
                }else{
                    EventEmitter.emit("WinOrLoseAudioEvent",false);
                };
            };

            if (LoginData.GamePlatform == 2) {
                this.showPlayerImg(pos,pInfo.pdata.avatarurl);
            };

            this["pnlPlayer"+pos].getChildByName("labelHu1").getComponent(cc.Label).string = "/"+info.max_hu;
            if (info.max_score >= 0) {
            	this["pnlPlayer"+pos].getChildByName("labelScore1").getComponent(cc.Label).string = "/"+info.max_score;
            	this["pnlPlayer"+pos].getChildByName("labelScore2").getComponent(cc.Label).string = "";
            }else{
            	this["pnlPlayer"+pos].getChildByName("labelScore1").getComponent(cc.Label).string = "";
            	this["pnlPlayer"+pos].getChildByName("labelScore2").getComponent(cc.Label).string = "/"+Math.abs(info.max_score);
            };
            if (info.total_score > maxScore) {
                maxScore = info.total_score;
                winPos = pos;
            };

            if (info.total_score >= 0) {
            	this["pnlPlayer"+pos].getChildByName("labelScoreWin").getComponent(cc.Label).string = "/"+info.total_score;
            	this["pnlPlayer"+pos].getChildByName("labelScoreLose").getComponent(cc.Label).string = "";
            }else{
            	this["pnlPlayer"+pos].getChildByName("labelScoreWin").getComponent(cc.Label).string = "";
            	this["pnlPlayer"+pos].getChildByName("labelScoreLose").getComponent(cc.Label).string = "/"+Math.abs(info.total_score);
            };



        };

        for (var i = 0; i < this.huInfo.length; i++) {
            var pos = this.huInfo[i].pos;
            if (pos == winPos) {
                this["pnlPlayer"+pos].getChildByName("imgWin").active = true;
            }else{
                this["pnlPlayer"+pos].getChildByName("imgWin").active = false;
            };
        };
    },

    showPlayerImg: function(pos,avatarurl){
        var self = this;
        cc.loader.load({url: avatarurl, type: 'jpg'},function (err, texture) {
             var frame = new cc.SpriteFrame(texture);
             self['pnlPlayer'+pos].getChildByName('imgPlayer').getComponent(cc.Sprite).spriteFrame=frame;
        });
    },

    onShareCallback:function(){
        if (this.btlShareDlg) {
            return;
        };

        this.btlShareDlg = cc.instantiate(this.prefabShareDlg);
        this.btlShareDlg.position = cc.v2(0,0);
        this.btlShareDlg.getComponent('BattleAllOverShareDlg').updateUI(this.data,this.roomBaseInfo,this.myPlayerInfo);
        this.btlShareDlg.getComponent('BattleAllOverShareDlg').setCallback(function(){
                    if (this.btlShareDlg) {
                        this.btlShareDlg.destroy();
                        this.btlShareDlg = null;
                    };
                }.bind(this));
        this.node.addChild(this.btlShareDlg,100);
    },

    onCloseCallback: function(){
        cc.director.loadScene("HomeMain");
    },

});
