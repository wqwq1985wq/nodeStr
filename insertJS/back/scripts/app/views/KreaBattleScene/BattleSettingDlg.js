var BattleNetHelper = require('BattleNetHelper');
var BattleData = require('BattleData');
var ComDlgTwo = require('ComDlgTwo');

cc.Class({
    extends: cc.Component,

    properties: {
    	pnl: cc.Node,
        imgBg: cc.Node,
    	btnExit: cc.Button,
    	btnSetting: cc.Button,
    	btnPos: cc.Button,
    },

    onWaitCallback: function(){
    	this.deleteMe();
    },

    onExitCallback: function(){
        this.roomBaseInfo = BattleData.getRoomBaseInfo();
        if (this.roomBaseInfo.room_state == 1) {
            var self = this;
            if (this.twoDlg == null) {
                if (BattleData.isRoomLeader()) {
                    BattleNetHelper.reqDestroyRoom();
                }else{
                    BattleNetHelper.reqExitRoom();
                }
            };
        }else{
            var self = this;
            if (this.twoDlg == null) {
                cc.loader.loadRes("newImg/prefab/ComDlgTwo", function (err, prefab) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    self.twoDlg = cc.instantiate(prefab);
                    var params = new Array();
                    params["title"] = "是否要发起解散房间？"
                    self.twoDlg.getComponent(ComDlgTwo).updateUI(params);
                    self.twoDlg.position = cc.v2(0,0);
                    self.node.parent.addChild(self.twoDlg);
                    
                    self.twoDlg.getComponent(ComDlgTwo).setCallback(function(){
                        BattleNetHelper.reqDestroyRoom();
                    });
                });
            };
        };
    	this.deleteMe();
    },

    onSettingCallback: function(){
    	this.deleteMe();
    },

    onPosCallback: function(){
    	this.deleteMe();
    },

    onLoad: function(){
    	this.pnl.position = cc.p(cc.winSize.width/2-100, 50);

    	this.node.on("touchend", this.onTouchEnded, this);
    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgBg.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
            this.node.destroy();
        };
    },

    start:function() {


    },

    deleteMe: function(){
    	this.node.destroy();
    },

});
