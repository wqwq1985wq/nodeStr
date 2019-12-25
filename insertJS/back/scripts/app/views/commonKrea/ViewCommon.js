var ComAlert = require('ComAlert');
var ComDlgTwo = require('ComDlgTwo');
var LocalData = require('LocalData');

module.exports = {
	showAlertDlg:function(str){
		cc.loader.loadRes("newImg/prefab/ComAlert", function (err, prefab) {
            if (err) {
                console.log(err);
                return;
            }
            var dlg = cc.instantiate(prefab);
            dlg.position = cc.v2(cc.winSize.width/2,cc.winSize.height/2);
            cc.director.getScene().addChild(dlg);
            dlg.getComponent(ComAlert).updateUI(str);
        });
	},

    showDlgTwo: function(params){
        cc.loader.loadRes("newImg/prefab/ComDlgTwo", function (err, prefab) {
            if (err) {
                console.log(err);
                return;
            }
            var dlg = cc.instantiate(prefab);
            dlg.getComponent(ComDlgTwo).updateUI(params);
            dlg.position = cc.v2(cc.winSize.width/2,cc.winSize.height/2);
            cc.director.getScene().addChild(dlg);
        });
    },



    showAwardDlg:function(data){
        cc.loader.loadRes("newImg/prefab/AwardDlg", function (err, prefab) {
            if (err) {
                console.log(err);
                return;
            }
            var dlg = cc.instantiate(prefab);
            dlg.position = cc.v2(cc.winSize.width/2,cc.winSize.height/2);
            cc.director.getScene().addChild(dlg);
            dlg.getComponent('AwardDlg').updateUI(data);
        });
    },

    playXiAnim: function(pos,node,animPrefab){
        var animPos = new Array(cc.p(0,-100),cc.p(cc.winSize.width/2/LocalData.getPnlScale()-400,cc.winSize.height/2/LocalData.getPnlScale()-210),cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+400,cc.winSize.height/2/LocalData.getPnlScale()-160));

        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        node.addChild(anim);
        anim.getComponent("AnimPrefab").playXiAnim();
    },

    playLongAnim: function(pos,node,animPrefab,data){
        var animPos = new Array(cc.p(0,-100),cc.p(cc.winSize.width/2/LocalData.getPnlScale()-400,cc.winSize.height/2/LocalData.getPnlScale()-210),cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+400,cc.winSize.height/2/LocalData.getPnlScale()-160));

        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        node.addChild(anim);
        anim.getComponent("AnimPrefab").playLongAnim(data);
    },

    playTingAnim: function(pos,node,animPrefab,data){
        var animPos = new Array(cc.p(0,-100),cc.p(cc.winSize.width/2/LocalData.getPnlScale()-400,cc.winSize.height/2/LocalData.getPnlScale()-210),cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+400,cc.winSize.height/2/LocalData.getPnlScale()-160));

        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        node.addChild(anim);
        anim.getComponent("AnimPrefab").playTingAnim(data);
    },

    playFaceAnim: function(pos,node,animPrefab,idx){
        var animPos = new Array(
                        cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+95,-cc.winSize.height/2/LocalData.getPnlScale()+410),
                        cc.v2(cc.winSize.width/2/LocalData.getPnlScale()-95,cc.winSize.height/2/LocalData.getPnlScale()-210),
                        cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+95,cc.winSize.height/2/LocalData.getPnlScale()-160));

        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        node.addChild(anim);
        anim.getComponent("FaceAnimPrefab").playAnim(idx);
    },

    playVoiceAnim: function(pos,node,animPrefab,data){
        var animPos = new Array(
                        cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+195,-cc.winSize.height/2/LocalData.getPnlScale()+410),
                        cc.v2(cc.winSize.width/2/LocalData.getPnlScale()-195,cc.winSize.height/2/LocalData.getPnlScale()-210),
                        cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+195,cc.winSize.height/2/LocalData.getPnlScale()-160));

        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        node.addChild(anim);
        anim.getComponent("SayDlg").playAnim(pos+1,data);
    },

    playCommAnim: function(pos,node,animPrefab,str){
        var animPos = new Array(
                        cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+95,-cc.winSize.height/2/LocalData.getPnlScale()+410),
                        cc.v2(cc.winSize.width/2/LocalData.getPnlScale()-95,cc.winSize.height/2/LocalData.getPnlScale()-210),
                        cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+95,cc.winSize.height/2/LocalData.getPnlScale()-160));
        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        node.addChild(anim);
        anim.getComponent("BtlCommAnim").playCommAnim(str);
    },

    playInteractAnim: function(to_pos,from_pos,node,animPrefab,idx){
        var animPos = new Array(
                        cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+95,-cc.winSize.height/2/LocalData.getPnlScale()+410),
                        cc.v2(cc.winSize.width/2/LocalData.getPnlScale()-95,cc.winSize.height/2/LocalData.getPnlScale()-210),
                        cc.v2(-cc.winSize.width/2/LocalData.getPnlScale()+95,cc.winSize.height/2/LocalData.getPnlScale()-160));

        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[from_pos];
        node.addChild(anim);
        if (idx == 3 || idx == 5 || idx == 7) {
            anim.setScale(1.8);
        };
        anim.getComponent("InteractAnimPrefab").playAnim(idx);

        var pos1 = animPos[from_pos];
        var pos3 = animPos[to_pos];

        var maxY = pos1.y;
        if (pos1.y < pos3.y) {
            maxY = pos3.y;
        };
        var pos2 = cc.p((pos3.x+pos1.x)/2,maxY+130);

        var bezier = [pos1,pos2,pos3];
        var bezierForward = cc.bezierTo(0.5, bezier);
        anim.runAction(bezierForward);
    },

    playPengAnim: function(pos,node,animPrefab){
        var animPos = new Array(cc.p(0,-100),cc.p(cc.winSize.width/2/LocalData.getPnlScale()-400,cc.winSize.height/2/LocalData.getPnlScale()-210),cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+400,cc.winSize.height/2/LocalData.getPnlScale()-160));

        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        node.addChild(anim);
        anim.getComponent("AnimPrefab").playPengAnim();
    },

    playBeginAnim: function(node,animPrefab){
        var anim = cc.instantiate(animPrefab);
        anim.position = cc.p(0,-100);
        node.addChild(anim);
        anim.getComponent("AnimPrefab").playBeginAnim();
    },

    playWaitingAnim: function(node,animPrefab){
        var anim = cc.instantiate(animPrefab);
        anim.position = cc.p(0,0);
        node.addChild(anim);
        anim.getComponent('AnimPrefab').playWaitingAnim();
    },

    playZhuangAnim: function(pos,node,animPrefab,data){
        var animPos = new Array(cc.p(0,-100),cc.p(cc.winSize.width/2/LocalData.getPnlScale()-400,cc.winSize.height/2/LocalData.getPnlScale()-210),cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+400,cc.winSize.height/2/LocalData.getPnlScale()-160));
        
        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        anim.anchor = cc.p(1,0.5);
        node.addChild(anim);
        anim.getComponent('AnimPrefab').playZhuangAnim(data);
    },

    playGangAnim: function(pos,node,animPrefab){
        var animPos = new Array(cc.p(0,-100),cc.p(cc.winSize.width/2/LocalData.getPnlScale()-400,cc.winSize.height/2/LocalData.getPnlScale()-210),cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+400,cc.winSize.height/2/LocalData.getPnlScale()-160));

        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        node.addChild(anim);
        anim.getComponent("AnimPrefab").playGangAnim();
    },

    playHuAnim: function(pos,node,animPrefab,data){
        var animPos = new Array(cc.p(0,-100),cc.p(cc.winSize.width/2/LocalData.getPnlScale()-400,cc.winSize.height/2/LocalData.getPnlScale()-210),cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+400,cc.winSize.height/2/LocalData.getPnlScale()-160));
        
        var anim = cc.instantiate(animPrefab);
        anim.position = animPos[pos];
        node.addChild(anim);
        anim.getComponent("AnimPrefab").playHuAnim(data);
    },

    playDlgAction: function(node){
        var scale = this.getPnlScale();
        node.runAction(
            cc.sequence(
                cc.scaleTo(0,0),
                cc.scaleTo(0.6,scale).easing(cc.easeElasticOut(0.6))));
    },

    getPnlScale: function(){
        if (cc.winSize.width/cc.winSize.height < 1334/750) {
            return cc.winSize.width/cc.winSize.height / (1334/750)
        };
        return 1;
    },

    playShakeAction: function(node){
        node.stopAllActions();
        node.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.repeat(
                        cc.sequence(
                            cc.rotateTo(0.12,15),
                            cc.rotateTo(0.12,-15)
                        ),4
                    ),
                    cc.rotateTo(0.1,0),
                    cc.delayTime(2)
                )     
        ));
    },
};