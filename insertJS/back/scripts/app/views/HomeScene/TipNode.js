var TipData = require('TipData');
var Util = require('Util');

cc.Class({
    extends: cc.Component,

    properties: {
    	txtTip: cc.RichText,
    	nodeClip: cc.Node,
    	nodeBg: cc.Node,
    },

    onLoad: function(){
    	this.registerMsg();

    	this.cfgData = TipData.TipCfg;

        this.node.active = false;
    	this.updateUI();
    },

    updateUI: function(){
        var self = this;
        Util.performWithDelay(this.nodeBg,function(){
                self.node.active = true;
                var idx = Math.floor(Math.random()*self.cfgData.length);
                self.playAction(self.cfgData[idx]);
            },Math.floor(Math.random()*4)+4);
    	
    },

    playAction: function(txt){
    	this.txtTip.string = txt;
    	this.txtTip.node.setPositionX(this.nodeClip.getContentSize().width/2);

    	var posx = this.txtTip.node.getContentSize().width+this.nodeClip.getContentSize().width;
    	var time = posx/100;
    	this.txtTip.node.runAction(cc.sequence(
                cc.delayTime(1),
    			cc.moveBy(time,-posx,0),
    			cc.callFunc(this.actComplete,this)
    		));
    },

    actComplete: function(){
    	this.node.active = false;
    	this.updateUI();
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){

    },

    unRegisterMsg: function(){

    },

    start:function() {

    },

});