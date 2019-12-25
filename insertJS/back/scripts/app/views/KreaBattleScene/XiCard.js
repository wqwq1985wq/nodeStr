var Card = require('Card');
var LocalData = require('LocalData');
var BattleData = require('BattleData');
var Util = require('Util');

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

        this.initXi();
    },

    updateUI:function(card,idx,cards){
        this._super(card,idx,cards);
        this.updateXi();
    },

    initXi: function(){
        this.node.setScale(0.5);
        if (this.deltaPos == 0) {
            this.node.angle = -180;
        }else if (this.deltaPos == 1) {
            this.node.angle = -90;
        }else if (this.deltaPos == 2) {
            this.node.angle = -270;
        };
    },

    setGetXiCards: function(cards){
        this.getCards = cards;
    },

    updateXi: function(){
        var scaleM = 0.4;
        if (!BattleData.isCardRecord()) {
            scaleM = 0.5;
        };
        if (this.deltaPos == 0) {
            scaleM = 0.5;
            if (!BattleData.isCardRecord()) {
                scaleM = 0.65;
            };
        };
        this.node.setScale(scaleM);

        var deltaWidth = Util.getCardWidthByScale(scaleM);

        var pos2 = cc.p(0,0);
        if (this.deltaPos == 0) {
            pos2 = cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+25+deltaWidth,-cc.winSize.height/2/LocalData.getPnlScale()+40*scaleM*(this.idx+1));
        }else if (this.deltaPos == 1) {
            pos2 = cc.p(cc.winSize.width/2/LocalData.getPnlScale()-210-40*scaleM*(this.idx),cc.winSize.height/2/LocalData.getPnlScale()-100);
        }else if (this.deltaPos == 2) {
            pos2 = cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+210+40*scaleM*(this.idx),cc.winSize.height/2/LocalData.getPnlScale()-100);
        };
        this.node.setLocalZOrder(6-this.idx);

        //在最后面显示新得到的牌
        if (this.getCards && this.idx >= (this.cards.length - this.getCards.cards.length)) {
            var pos = cc.p(0,0);
            if (this.deltaPos == 0) {
                pos = cc.pAdd(pos2,cc.p(0,40));
            }else if (this.deltaPos == 1) {
                pos = cc.pAdd(pos2,cc.p(-10,0));    
            }else{
                pos = cc.pAdd(pos2,cc.p(10,0));
            };

            this.node.position = pos;
            this.node.runAction(
                cc.moveTo(0.1,pos2.x,pos2.y).easing(cc.easeBackOut())
            );
        }else{
            this.node.position = pos2;
        };

        this.getCards = null;
    },

});
