
cc.Class({
    extends: cc.Component,

    properties: {
        imgFirst: cc.Sprite,
        imgSecond: cc.Sprite,
        pnlWaiting: cc.Node,

        img1: cc.Node,
        img2: cc.Node,
        img3: cc.Node,
        img4: cc.Node,
        img5: cc.Node,
        img6: cc.Node,

        imgTing: cc.SpriteFrame,

        atlasOperate:cc.SpriteAtlas,
    },

    onLoad:function(){

        this.imgFirst.node.opacity = 0;

        this.imgSecond.node.opacity = 0;

        this.pnlWaiting.active = false;

        // this.imgBg.node.opacity = 0;
        // this.imgBg.node.setScale(0.45);
    	//注册
    },

    start:function() {

    },

    onDestroy:function(){

    },

    playXiAnim: function(){
        // this.animation.play("xiAnim");
        this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new5');
        this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new5');
        this.playAnim(0.3,1);
    },

    playZhuangAnim: function(data){
        if (data.zhuang == 2) {
            this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new13');
            this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new13');
        }else{
            this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new14');
            this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new14');
        };
        this.playAnim(0.25,0.5);
    },

    playPengAnim: function(){
    	// this.animation.play("pengAnim");
        this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new1');
        this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new1');
        this.playAnim(0.3,1);
    },

    playGangAnim: function(){
    	// this.animation.play("gangAnim");
        this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new2');
        this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new2');
        this.playAnim(0.3,1);
    },

    playTingAnim: function(){
        // this.animation.play("tingAnim");
        this.imgFirst.spriteFrame = this.imgTing;
        this.imgSecond.spriteFrame = this.imgTing;
        this.playAnim(0.3,1);
    },

    playWaitingAnim: function(){
        this.imgFirst.node.active = false;
        this.imgSecond.node.active = false;
        this.pnlWaiting.active = true;
        for (var i = 1; i < 7; i++) {
            this['img'+i].runAction(cc.repeatForever(
                cc.sequence(
                    cc.delayTime(0.1*(i-1)),
                    cc.moveBy(0.15,0,20),
                    cc.moveBy(0.15,0,-20),
                    cc.delayTime(0.1*(7-i)+1)
                )));
        };
    },

    playBeginAnim: function(){
        this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new6');
        this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new6');
        this.imgSecond.node.stopAllActions();
        this.imgSecond.node.opacity = 0;
        this.imgFirst.node.stopAllActions();
        this.imgFirst.node.opacity = 0;
        this.imgFirst.node.setPositionX(-cc.winSize.width/2);
        this.imgFirst.node.setScale(0.2);
        this.imgFirst.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(0.2,cc.winSize.width/2,0).easing(cc.easeBackOut()),
                    cc.fadeIn(0.2).easing(cc.easeIn(0.5))
                ),
                cc.delayTime(1),
                cc.fadeOut(0.2).easing(cc.easeIn(0.6)),
                cc.callFunc(function(){
                    this.node.destroy();
                }.bind(this))
            )
        );
    },

    playLongAnim: function(data){
    	// this.animation.play("longAnim");
        if (data.trigger_type == 1) {
            this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new11');
            this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new11');
        }else{
            this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new12');
            this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new12');
        };
        this.playAnim(0.3,1);
    },

    playHuAnim: function(data){
        // this.animation.play("huAnim");
        if (data.zimo) {
            this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new4');
            this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new4');
        }else{
            this.imgFirst.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new3');
            this.imgSecond.spriteFrame = this.atlasOperate.getSpriteFrame('myworkspace-hetu1-new3');
        };
        this.playAnim(0.3,1);
    },

    playAnim: function(scale,bigScale){
        scale = scale || 0.45;
        bigScale = bigScale || 2;
        this.imgFirst.node.stopAllActions();
        this.imgSecond.node.stopAllActions();
        this.imgFirst.node.opacity = 0;
        this.imgSecond.node.opacity = 0;
        this.imgSecond.node.runAction(
            cc.sequence(
                cc.scaleTo(0,bigScale),
                cc.fadeIn(0),
                cc.scaleTo(0.3,scale).easing(cc.easeElasticOut(0.6)),
                cc.delayTime(0.7),
                cc.fadeOut(0.1),
                cc.callFunc(function(){
                    this.node.destroy();
                }.bind(this))
            )
        );
        this.imgFirst.node.runAction(
            cc.sequence(
                cc.delayTime(0.1),
                cc.scaleTo(0,scale),
                cc.fadeIn(0),
                cc.spawn(
                    cc.fadeOut(0.3).easing(cc.easeIn(0.6)),
                    cc.scaleTo(0.3,scale*1.3).easing(cc.easeIn(0.6))
                )
            )
        );
    },

});