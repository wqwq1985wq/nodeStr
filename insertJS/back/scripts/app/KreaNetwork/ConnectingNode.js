
cc.Class({
    extends: cc.Component,

    properties: {
        imgCircle:cc.Sprite,
    },

    start:function() {
        var anim = this.imgCircle.getComponent(cc.Animation);
        anim.play();
    },


});