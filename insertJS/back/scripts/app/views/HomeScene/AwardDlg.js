var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        imgDi: cc.Node,
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
            this.node.destroy();
        };
    },

    start:function() {

    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    updateUI: function(data){
        var rewardArr = data.split("#");
        var reward = rewardArr[0];
        this.txtNum.string = "x"+(reward.split("|"))[1];
    },

});