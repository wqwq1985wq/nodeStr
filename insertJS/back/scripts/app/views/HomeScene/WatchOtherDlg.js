var HomeData = require('HomeData');
var LocalData = require('LocalData');
var BattleNetHelper = require('BattleNetHelper');
var ViewCommon = require('ViewCommon');

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

    onWatchCallback: function(){
    	var str = this.editBox.string;
        if (str == "" || str == " ") {
            ViewCommon.showAlertDlg("回放码不能为空！")
            return;
        };
        BattleNetHelper.reqRecordById(parseInt(this.editBox.string));
    },

    start:function() {

    },

});