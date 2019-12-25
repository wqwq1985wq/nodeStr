var HomeData = require('HomeData');
var RelationData = require('RelationData');
var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');

cc.Class({
    extends: cc.Component,

    properties: {
    	
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

		this.node.on("touchend", this.onTouchEnded, this);
    },

    onTouchEnded: function(event){
    	this.node.destroy();
    },

    start:function() {

    },

});