var HomeData = require('HomeData');
var ShopData = require('ShopData');
var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
        pnlContent: cc.Node,

        prefabShopItem: cc.Prefab,
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

        this.updateUI();
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){

    },

    unRegisterMsg: function(){

    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    updateUI: function(){
        var data = ShopData.ShopCfg;
        for (var i = 0; i < data.length; i++) {
            var item = cc.instantiate(this.prefabShopItem);
            this.pnlContent.addChild(item);
            item.getComponent('ShopItem').updateUI(data[i],i);
        };
    },

    start:function() {

    },

});