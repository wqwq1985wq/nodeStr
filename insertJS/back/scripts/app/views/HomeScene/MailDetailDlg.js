var HomeData = require('HomeData');
var LocalData = require('LocalData');
var Util = require('Util');
var MailData = require('MailData');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
    	txtTitle: cc.Label,
    	txtMsg: cc.Label,
        imgIcon: cc.Node,
        txtGet: cc.Label,
        txtNum: cc.Label,

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
    		var self = this;
    		Util.performWithDelay(this.node,function(){
    			self.node.destroy();
    		},0);
    	};
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    onGetCallback: function(){
        MailData.reqDelMailSingle(this.data.id);
    	this.onCloseCallback();
    },

    updateUI: function(data,func){
    	this.func = func;
        this.data = data;

        MailData.reqReadMailSingle(this.data.id);

        this.txtTitle.string = this.data.title;
        this.txtMsg.string = this.data.msg;
        if (this.data.reward && this.data.reward != "") {
            this.imgIcon.active = true;
            var rewardArr = this.data.reward.split("#");
            var reward = rewardArr[0];
            this.txtNum.string = "x"+(reward.split("|"))[1];
            this.txtGet.string = "领取并删除";
        }else{
            this.imgIcon.active = false;
            this.txtGet.string = "删除";
        }
    },

    start:function() {

    },

});