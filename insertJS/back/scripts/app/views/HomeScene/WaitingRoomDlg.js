var HomeData = require('HomeData');

cc.Class({
    extends: cc.Component,

    properties: {
    	txtMsg1:cc.Node,
    	txtMsg2:cc.Node,
    	txtMsg3:cc.Node,
    	txtMsg4:cc.Node,
    	txtMsg5:cc.Node,
    	txtMsg6:cc.Node,
    	txtMsg7:cc.Node,
    	txtMsg8:cc.Node,
    	txtMsg9:cc.Node,
    	txtMsg10:cc.Node,
    	txtMsg11:cc.Node,
    	txtMsg12:cc.Node,
    	txtMsg13:cc.Node,
    },

    onLoad: function(){
        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);

        this.delayTime = 0;
        this.maxDelayTime = 5;
    },

    start:function() {
    	for (var i = 1; i < 14; i++) {
    		this['txtMsg'+i].runAction(cc.repeatForever(
		                    	cc.sequence(
		                    		cc.delayTime(0.08*(i-1)),
			                        cc.moveBy(0.15,0,30),
			                        cc.moveBy(0.15,0,-30),
			                        cc.delayTime(0.08*(14-i)+0.4)
			                    )));
    	};
    },

    setCallback: function(params,func){
        this.func = func;
        this.params = params;
    },

    update: function (dt) {
        this.delayTime = this.delayTime + dt;
        if (this.delayTime >= this.maxDelayTime) {
            this.func(this.params);
        };
    },

});