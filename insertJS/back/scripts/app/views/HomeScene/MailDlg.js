var HomeData = require('HomeData');
var LocalData = require('LocalData');
var MailData = require('MailData');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
    	prefabMailItem: cc.Prefab,
    	prefabMailDetailDlg: cc.Prefab,
    	pnlContent: cc.Node,
        txtEmpty: cc.Node,
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

        this.txtEmpty.active = false;

        MailData.reqGetMailInfo();
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.GET_MAILINFO,this.onGetMailInfo,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.GET_MAILINFO,this.onGetMailInfo,this);
    },

    onGetMailInfo: function(){
        this.data = MailData.getMailInfo();

        this.pnlContent.removeAllChildren();

        for (var i = 0; i < this.data.length; i++) {
            var node = cc.instantiate(this.prefabMailItem);
            node.getComponent('MailItem').updateUI(this.data[i],this.onItemClickCallback.bind(this));
            this.pnlContent.addChild(node);
        };

        this.txtEmpty.active = this.data.length == 0;
    },

    onItemClickCallback: function(data){
    	var node = cc.instantiate(this.prefabMailDetailDlg);
    	node.getComponent('MailDetailDlg').updateUI(data,this.onDetailCallback.bind(this));
    	this.node.addChild(node);
    	node.position = cc.v2(0,0);
    },

    onDetailCallback: function(){
    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    start:function() {

    },

});