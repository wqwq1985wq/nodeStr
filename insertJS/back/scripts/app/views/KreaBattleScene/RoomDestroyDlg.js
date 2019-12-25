var EventEmitter = require('EventEmitter');
var BattleNetHelper = require('BattleNetHelper');
var PlayerData = require('PlayerData');
var BattleData = require('BattleData');
var HomeData = require('HomeData');
var SocketID = require('SocketID');
var Util = require('Util');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	btnOk: cc.Button,
    	btnCancel: cc.Button,
        txtTime: cc.Label,
        txtName1: cc.Label,
        txtName2: cc.Label,
        txtName3: cc.Label,
        txtTip1: cc.Label,
        txtTip2: cc.Label,
        txtTip3: cc.Label,

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

        this.txtName1.string = "";
        this.txtName2.string = "";
        this.txtName3.string = "";
        this.txtTip1.string = "";
        this.txtTip2.string = "";
        this.txtTip3.string = "";
    },

    start:function() {
        this.registerMsg();
    },

    onDestroy:function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){

    },

    unRegisterMsg: function(){

    },

    syncRoomInfo: function(){

    },

    onOkCallback: function(){
        BattleNetHelper.reqDestroyRoomAck(true)
    },

    onCancelCallback: function(){
        BattleNetHelper.reqDestroyRoomAck(false)
    },

    updateUI: function(time,pid,arr){
        this.actFlagTime = time;
        this.actPid = pid;
        this.actArr = arr;
        this.myPid = PlayerData.getPlayerId();
        if (pid == PlayerData.getPlayerId() || this.isPidInArr(this.myPid)) {
            this.btnOk.node.active = false;
            this.btnCancel.node.active = false;
        }else{
            this.btnOk.node.active = true;
            this.btnCancel.node.active = true;
        };

        this.roomPlayerInfo = BattleData.getRoomPlayerInfo();

        for (var i = 0; i < this.roomPlayerInfo.length; i++) {
            var pdata = this.roomPlayerInfo[i].pdata;
            console.log(pdata.id,this.actPid,pdata.name);
            if (pdata.id == this.actPid) {
                console.log(pdata.name+"(发起者)");
                this['txtName'+(i+1)].string = pdata.name+"(发起者)";
                this['txtTip'+(i+1)].node.color = new cc.Color(0,195,0,255);
                this['txtTip'+(i+1)].string = "同意";
            }else{
                this['txtName'+(i+1)].string = pdata.name;
                if (this.isPidInArr(pdata.id)) {
                    this['txtTip'+(i+1)].node.color = new cc.Color(230,34,34,255);
                    this['txtTip'+(i+1)].string = "拒绝";
                }else{
                    this['txtTip'+(i+1)].node.color = new cc.Color(181,93,33,255);
                    this['txtTip'+(i+1)].string = "尚未响应";
                }
            };
        };

    },

    isPidInArr: function(pid){
        for (var i = 0; i < this.actArr.length; i++) {
            if (pid == this.actArr[i]) {
                return true;
            };
        };
        return false;
    },

    update:function(dt){
        var lTime = 300;
        if (this.actFlagTime) {
            lTime = lTime - (HomeData.getServerNowTime() - this.actFlagTime);
            if (lTime < 0) {
                lTime = 0;
            };
        };
        this.txtTime.string = Util.getMinSec(lTime);
    },


});