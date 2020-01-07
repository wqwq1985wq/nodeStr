/*************************
//等待菊花界面，添加到场景使用
*************************/
cc.Class({
    extends:cc.Component,

    properties: {
    	nodeShow: cc.Node,
    },

    ctor(){
    	this.isShow = false;
    },

    onLoad : function () {
    	facade.subscribe("WAIT_HIDE", this.onHide, this);
        facade.subscribe("WAIT_SHOW", this.onShow, this);

        this.nodeShow.active = false;
    },

    onShow : function () {
    	this.isShow = true;
    	var self = this;
    	this.node.runAction(cc.sequence(
    		cc.delayTime(0.5),
    		cc.callFunc(function(){
    			if (self.isShow) {
    				self.nodeShow.active = true;
    			}
    		})
    	));
    },

    onHide : function () {
    	this.isShow = false;
        this.nodeShow.active = false;
    },

});