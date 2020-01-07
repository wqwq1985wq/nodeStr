cc.Class({
    extends: cc.Component,

    properties:{ 
        sp1:cc.Node,
        sp2:cc.Node,
        manifest: {
            type: cc.Asset,
            default: null
        },
     },
    onLoad: function () {
        console.log("onLoad launch:");
        //切换到loading//

        //添加launch 动画
        var finished1 = cc.callFunc(function() {
            cc.director.loadScene('UpdateView');
        })
        //大厅需要splash        
        if(cc.zy.zyConfig.gameName == "hall")
        {
            //添加launch 动画
            var finished1 = cc.callFunc(function() {
                cc.director.loadScene('UpdateView');
            })
            this.node.opacity = 0
            var myAction1 = cc.sequence(cc.fadeIn(2),cc.delayTime(1),cc.fadeOut(1),cc.delayTime(0.3),finished1);
            this.node.runAction(myAction1)
        }else{
            //其他游戏直接过
            cc.director.loadScene('UpdateView');
        }
       
    },
});
