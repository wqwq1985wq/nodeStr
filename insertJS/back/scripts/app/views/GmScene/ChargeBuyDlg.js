var LocalData = require('LocalData');
var ViewCommon = require('ViewCommon');
var GmData = require('GmData');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,

        prefabBuyRecordItem: cc.Prefab,

        pnlContent: cc.Node,
    },

    onLoad: function(){
        this.registerMsg();

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

    updateUI: function(state){
        this.state = state;
        GmData.reqChargeRecord(state);
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.CHARGE_RECORD,this.onChargeRecord,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.CHARGE_RECORD,this.onChargeRecord,this);
    },

    onChargeRecord: function(data){
        this.data = data.msg;

        this.pnlContent.removeAllChildren();

        for (var i = 0; i < this.data.length; i++) {
            var node = cc.instantiate(this.prefabBuyRecordItem);
            node.getComponent('BuyRecordItem').updateUI(this.data[i],this.state);
            this.pnlContent.addChild(node);
        };
    },

});