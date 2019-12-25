var Card = require('Card');
var Enum = require('Enum');
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

        this.initPg();
    },

    updateUI:function(card,idx,cards,len1,len2,pgType){
        this._super(card,idx,cards);

        this.btnCard.node.color = new cc.Color(255,255,255,255); 
        this.imgBg.node.color = new cc.Color(255,255,255,255);

        this.pgType = pgType;
        this.updatePg(len1,len2);
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

    initPg: function(){
        this.node.setScale(0.5);
        if (this.deltaPos == 0) {
            this.node.angle = -180;
        }else if (this.deltaPos == 1) {
            this.node.angle = -90;
        }else if (this.deltaPos == 2) {
            this.node.angle = -270;
        };
    },

    updatePg: function(len1,len2){
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

    	this.imgLong.node.active = (this.pgType == Enum.PgType.Long) && len1 == 1;
        this.imgJiao.node.active = (this.pgType == Enum.PgType.Jiao) && len1 == 1;
        
        //暗杠肯定4张牌
        if (this.pgType == Enum.PgType.AnGang && len1 == 4) {
            this.btnCard.getComponent(cc.Sprite).spriteFrame = this.atlasCard.getSpriteFrame("pai_di_1");
        };
        if (this.deltaPos == 0) {
            this.node.position = cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+25+deltaWidth*(len2+1),-cc.winSize.height/2/LocalData.getPnlScale()+40*scaleM*len1);
        }else if (this.deltaPos == 1) {
            this.node.position = cc.p(cc.winSize.width/2/LocalData.getPnlScale()-210-40*scaleM*(len1-1),cc.winSize.height/2/LocalData.getPnlScale()-100-deltaWidth*len2);
        }else if (this.deltaPos == 2) {
            this.node.position = cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+210+40*scaleM*(len1-1),cc.winSize.height/2/LocalData.getPnlScale()-100-deltaWidth*len2);
        };
        this.node.setLocalZOrder(4-len1);
    },

});
