
cc.Class({
    extends: cc.Component,

    properties: {
    	txt: cc.Label,
    },

    start:function() {

    },

    updateUI: function(str){
    	this.txt.string = str;
    	var action = cc.moveBy(0.16,0,26);//.easing(cc.easeElasticOut(1.0))
    	this.node.runAction(cc.sequence(
    			cc.spawn(action,cc.fadeIn(0.16)),
    			cc.delayTime(1.16),
    			cc.fadeOut(0.1),
    			cc.callFunc(this.actComplete,this)
    		));
    },

    actComplete: function(){
    	this.node.destroy();
    },


});