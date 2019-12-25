var Util = require('Util');

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

    playCommAnim: function(str){
    	Util.playAudio("resources/newImg/audio/effect/enter.mp3");
        this.animation.play(str);
    },

});