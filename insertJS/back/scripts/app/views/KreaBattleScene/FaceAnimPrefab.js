
cc.Class({
    extends: cc.Component,

    properties: {
    	animation: cc.Animation,
    },

    onLoad:function(){
    	this.animation = this.node.getComponent(cc.Animation);

        // this.node.opacity = 0;
    	//注册
    	this.animation.on('finished',this.onFinished,this);
    },

    start:function() {

    },

    onDestroy:function(){

    },

    onFinished: function(){
    	this.node.destroy();
    },

    playAnim: function(idx){
        this.animation.play("fc"+idx);
    },

});