var Card = require('Card');
var Util = require('Util');
var LocalData = require('LocalData');

cc.Class({
    extends: Card,

    onLoad: function(){
        this._super();
    },

    start:function() {
        this._super();
    },

    init:function(cardType,pos,my_pos){
        this._super(cardType,pos,my_pos);

        this.initSend();
    },

    updateUI:function(card,idx,cards,trigger_card){
        this._super(card,idx,cards);

        this.triggerCard = trigger_card;

        this.btnCard.node.color = new cc.Color(255,255,255,255); 
        this.imgBg.node.color = new cc.Color(255,255,255,255);

        this.updateSend();
    },

    updateCardColor: function(is_show){
        if (is_show) {
            this.btnCard.node.color = new cc.Color(255,50,50,255);
            this.imgBg.node.color = new cc.Color(255,50,50,255);
        }else{
            this.btnCard.node.color = new cc.Color(255,255,255,255);
            this.imgBg.node.color = new cc.Color(255,255,255,255);
        }
    },

    initSend: function(){
        this.node.setScale(0.6);
        this.node.angle = -180;
    },

    updateSend: function(){
        var scaleM = 0.6;
        var deltaWidth = Util.getCardWidthByScale(scaleM)+2;

        var pos2 = cc.p(0,0);
        if (this.deltaPos == 0) {
            pos2 = cc.p(-deltaWidth*3+deltaWidth*(this.idx%7),90-45*scaleM*Math.floor(this.idx/7));
        }else if (this.deltaPos == 1) {
            pos2 = cc.p(deltaWidth*4+4+deltaWidth*Math.floor(this.idx/8),210-45*scaleM*(this.idx%8));
        }else if (this.deltaPos == 2) {
            pos2 = cc.p(-deltaWidth*4-4-deltaWidth*Math.floor(this.idx/8),210-45*scaleM*(this.idx%8));
        };

        var posArr = new Array(cc.p(0,-300),cc.p(cc.winSize.width/2/LocalData.getPnlScale()-95,160),cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+95,160))
        if (this.triggerCard != null && this.card == this.triggerCard['card']) {
            this.node.position = posArr[this.deltaPos];
            this.node.setScale(0);
            this.node.runAction(
                cc.spawn(
                    cc.moveTo(0.1,pos2.x,pos2.y),
                    cc.fadeIn(0.1),
                    cc.scaleTo(0.1,scaleM)
                )
            );
        }else{
            this.node.position = pos2;
            this.node.setScale(scaleM);
        }

        // if (this.deltaPos == 0) {
        //     this.node.position = cc.p(-deltaWidth*3+deltaWidth*(this.idx%7),90-45*scaleM*Math.floor(this.idx/7));
        // }else if (this.deltaPos == 1) {
        //     this.node.position = cc.p(deltaWidth*4+4+deltaWidth*Math.floor(this.idx/8),210-45*scaleM*(this.idx%8));
        // }else if (this.deltaPos == 2) {
        //     this.node.position = cc.p(-deltaWidth*4-4-deltaWidth*Math.floor(this.idx/8),210-45*scaleM*(this.idx%8));
        // };
    },

});
