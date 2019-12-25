var ShaderUtils = require("ShaderUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        txtDay: cc.Label,
        imgGuang: cc.Node,
        txtNum: cc.Label,
        imgItem: cc.Sprite,
        imgBg: cc.Sprite,
        
    },

    onLoad: function(){

    },

    start:function() {

    },

    updateUI: function(i,data,times,got){
    	this.txtDay.string = "第"+i+"天";

        var num = (data.split("|"))[1];
        this.txtNum.string = num+"钻石";

        if (i < times) {
            this.imgGuang.active = false;
        }else if (i == times) {
            this.imgGuang.active = !got;
            if (!got) {
                this.imgGuang.runAction(
                    cc.repeatForever(cc.rotateBy(1,60)));
            };
        }else if (i > times) {
            this.imgGuang.active = false;
            ShaderUtils.setShader(this.imgBg, "gray");
        };
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

});