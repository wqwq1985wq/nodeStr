var LocalData = require('LocalData');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
    	txtName: cc.Label,
    	txtId: cc.Label,
    	imgPlayer: cc.Sprite,
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
    	// if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    	// 	this.node.destroy();
    	// };
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    start:function() {

    },

    updateUI: function(data){
    	var self = this;
    	console.log(data.avatarurl,'111');
        cc.loader.load({url: data.avatarurl, type: 'jpg'},function (err, texture) {
             var frame = new cc.SpriteFrame(texture);
             self.imgPlayer.spriteFrame=frame;
        });

        this.txtName.string = data.name;

        this.txtId.string = data.id;
    },

});