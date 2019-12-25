var HomeData = require('HomeData');
var RelationData = require('RelationData');
var LoginData = require('LoginData');
var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
        editBox: cc.EditBox,
        pnlNoBind: cc.Node,
        pnlBind: cc.Node,
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

        RelationData.reqGetRelationInfo();
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.GET_RELATIONINFO,this.onGetRelationInfo,this);

        EventEmitter.on("Client"+SocketID.SET_RELATION,this.onSetRelation,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.GET_RELATIONINFO,this.onGetRelationInfo,this);

        EventEmitter.off("Client"+SocketID.SET_RELATION,this.onSetRelation,this);
    },

    onGetRelationInfo: function(data){
        this.pnlNoBind.active = data.relation_uid == 0;
        this.pnlBind.active = data.relation_uid > 0;
    },

    onSetRelation: function(){
        this.onCloseCallback();
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

    onBangCallback: function(){
        var str = this.editBox.string;
        if (str == "" || str == " ") {
            ViewCommon.showAlertDlg("邀请人ID不能为空！")
            return;
        };
        RelationData.reqSetRelation(parseInt(this.editBox.string));
    },

    start:function() {

    },

});