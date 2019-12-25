var HomeData = require('HomeData');
var RelationData = require('RelationData');
var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
        editBox: cc.EditBox,
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
        
        this.registerMsg();

		this.node.on("touchend", this.onTouchEnded, this);
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.CHG_PLAYERSTATE,this.onSetRelation,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.CHG_PLAYERSTATE,this.onSetRelation,this);
    },

    onSetRelation: function(){
        this.onCloseCallback();
    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    onBangCallback: function(){
        var str = this.editBox.string;
        if (str == "" || str == " ") {
            ViewCommon.showAlertDlg("ID不能为空！")
            return;
        };
        RelationData.reqChgPlayerState(parseInt(this.editBox.string));
    },

    start:function() {

    },

});