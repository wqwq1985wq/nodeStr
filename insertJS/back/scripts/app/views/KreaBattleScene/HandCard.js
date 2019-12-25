var Card = require('Card');
var Cards = require('Cards');
var CardData = require('CardData');
var BattleData = require('BattleData');
var LocalData = require('LocalData');
var Enum = require('Enum');
var Util = require('Util');
var EventEmitter = require('EventEmitter');

cc.Class({
    extends: Card,

    onLoad: function(){
        this._super();

        this.waitZhuangFlag = true;

        this.isJiao = false;

        this.getCards = null;
    },

    start:function() {
        this._super();
        this.touched = false;

        EventEmitter.on("btlmain_touchend",this.onBtlMainTouchEnd,this);
    },

    onDestroy: function(){
        EventEmitter.off("btlmain_touchend",this.onBtlMainTouchEnd,this);
    },

    onBtlMainTouchEnd: function(){
        if (this.touched) {
            var params = new Array();
            params['card'] = this;
            params['state'] = "down";
            EventEmitter.emit("TouchCardEvent",params);
        };
    },

    onCardCallback: function(){
        Util.playAudio("resources/newImg/audio/effect/card_click.mp3");
        if (!this.touched) {
            this.touched = true;
            var params = new Array();
            params['card'] = this;
            params['state'] = "up";
            EventEmitter.emit("TouchCardEvent",params);
            this.node.position = cc.pAdd(this.node.position,cc.p(0,30));
            this.btnCard.node.color = new cc.Color(200,200,200,255);
            this.imgBg.node.color = new cc.Color(200,200,200,255);

            params = new Array();
            params['card'] = this.getCard();
            params['is_show'] = true;
            EventEmitter.emit("PutCardUpEvent",params)
        }else{
            if (this.data.pos == CardData.getBaseCardsInfo().turn_pos &&
                                    !this.isJiao &&
                                    (!this.data.tianting || (this.data.tianting && !CardData.getBaseCardsInfo().first_send)) &&
                                    (CardData.getBaseCardsInfo().trigger_pos == 0
                                    || CardData.getBaseCardsInfo().trigger_pos == CardData.getBaseCardsInfo().turn_pos)) {
                var params = new Array();
                params['card'] = this;
                params['state'] = "up";
                EventEmitter.emit("TouchCardEvent",params);
            }else{
                var params = new Array();
                params['card'] = this;
                params['state'] = "down";
                EventEmitter.emit("TouchCardEvent",params);
            };

        };
    },

    checkCardCallback: function(){
        if (!this.isJiao) {
            this.onCardCallback();
        };
    },

    pushCardDown: function(){
        this.touched = false;
        this.node.position = cc.pSub(this.node.position,cc.p(0,30));
        this.btnCard.node.color = new cc.Color(255,255,255,255);
        this.imgBg.node.color = new cc.Color(255,255,255,255);

        var params = new Array();
        params['card'] = this.getCard();
        params['is_show'] = false;
        EventEmitter.emit("PutCardUpEvent",params)
    },

    init:function(cardType,pos,my_pos){
        this._super(cardType,pos,my_pos);
        
        this.initHand();
    },

    isCardInPgCards:function(card,pgCards){
        for (var i = 0; i < pgCards.length; i++) {
            var cards = pgCards[i].cards;
            if (pgCards[i].pg_type == 1) {
                for (var j = 0; j < cards.length; j++) {
                    if (card == cards[j]) {
                        return true;
                    };
                };
            };
        };
        return false;
    },

    updateUI:function(card,idx,cards,data,len1,len2,maxLen){
        this._super(card,idx,cards);

        this.node.stopAllActions();

        this.touched = false;
        this.btnCard.node.color = new cc.Color(255,255,255,255);
        this.imgBg.node.color = new cc.Color(255,255,255,255);

        this.data = data;

        var pgCards = data.pg_cards;

        //判断手牌是否在叫牌中
        this.imgJiao.node.active = this.isCardInPgCards(card,pgCards);

        if (this.isCardInPgCards(card,pgCards)) {
            this.imgJiao.node.active = true;
            this.isJiao = true;
        }else{
            this.imgJiao.node.active = false;
            this.isJiao = false;
        };

        this.isJiao = this.isCardInPgCards(card,pgCards);

        if (len1 != null) {
            this.updateNewHand(len1,len2,maxLen);
        }else{
            this.updateHand(cards.length);
        };

        if (BattleData.isCardRecord()) {
            this.btnCard.interactable = false;
        }else{
            if (Cards.instance.cardState == Enum.CardState.WaitZhuang) {
                this.btnCard.interactable = false;
            }else if(Cards.instance.cardState == Enum.CardState.Zhuang){
                //如果有triggerPos则不能出牌操作 叫的牌也不能操作
                this.btnCard.interactable = !this.isJiao;//(this.data.pos == CardData.getBaseCardsInfo().turn_pos &&
                                             //!this.isJiao &&
                                             //CardData.getBaseCardsInfo().trigger_pos == 0);
            };
        };

        this.getCards = null;
    },

    updateNewHand: function(len1,len2,maxLen){
        var pgCards = this.data.pg_cards.slice(0);
        for (var i = pgCards.length-1; i >= 0; i--) {
            if (pgCards[i].pg_type == Enum.PgType.Jiao) {
                pgCards.splice(i,1);
            };
        };

        this.imgJiao.node.position = cc.p(0,-40);

        var pgScaleM = 0.4;
        if (!BattleData.isCardRecord()) {
            pgScaleM = 0.5;
        };
        if (this.deltaPos == 0) {
            pgScaleM = 0.5;
            if (!BattleData.isCardRecord()) {
                pgScaleM = 0.65;
            };
        };

        var pgWidth = Util.getCardWidthByScale(pgScaleM);

        var handMaxWidth = cc.winSize.width/LocalData.getPnlScale()-50-pgWidth*(pgCards.length+1)-76-40
        var handWidth = maxLen*76

        var scaleM = 1;
        if (BattleData.isCardRecord()) {
            scaleM = 0.65;
        }
        if (this.deltaPos != 0) {
            scaleM = 0.4;
        };
        if (maxLen > 10) {
            if (this.deltaPos == 0) {
                if (handMaxWidth < handWidth) {
                    scaleM = handMaxWidth / handWidth;
                };
                if (BattleData.isCardRecord()) {
                    if (scaleM > 0.65) {
                        scaleM = 0.65; 
                    };
                };
            }else{
                scaleM = 0.4 - 0.1*(maxLen-10)/12;
            }
        };
        this.node.setScale(scaleM);
        var deltaWidth = Util.getCardWidthByScale(scaleM);

        var pos2 = cc.p(0,0);
        if (this.deltaPos == 0) {
            var offsetY = 0;
            if (!BattleData.isCardRecord()) {
                offsetY = 30;
            };
            var py = 55;
            if (BattleData.isCardRecord()) {
                py = 32;
            };
            pos2 = cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+50+pgWidth*(pgCards.length+1)+deltaWidth*len2,(-cc.winSize.height+offsetY)/2/LocalData.getPnlScale()-py+py*len1);
        }else if (this.deltaPos == 1) {
            pos2 = cc.p(cc.winSize.width/2/LocalData.getPnlScale()-210-20*(len1-1),cc.winSize.height/2/LocalData.getPnlScale()-100-pgWidth*(pgCards.length+1)-deltaWidth*len2);
        }else if (this.deltaPos == 2) {
            pos2 = cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+210+20*(len1-1),cc.winSize.height/2/LocalData.getPnlScale()-100-pgWidth*(pgCards.length+1)-deltaWidth*len2);
        };
        this.node.setLocalZOrder(4-len1);

        //在最后面显示新得到的牌
        if (this.getCards && this.idx >= (this.cards.length - this.getCards.num)) {
            var pos = cc.p(0,0);
            if (this.deltaPos == 0) {
                pos2 = cc.pAdd(pos2,cc.p(40,0));
                if (pos2.x < cc.winSize.width/2 - 120) {
                    pos2 = cc.p(cc.winSize.width/2-120,pos2.y);
                };
                pos = cc.pAdd(pos2,cc.p(0,60));
            }else{
                pos2 = cc.pAdd(pos2,cc.p(0,-20));
                if (this.deltaPos == 1) {
                    pos = cc.pAdd(pos2,cc.p(-10,0));
                }else{
                    pos = cc.pAdd(pos2,cc.p(10,0));
                }
            };

            this.node.position = pos;
            this.node.runAction(
                cc.moveTo(0.1,pos2.x,pos2.y).easing(cc.easeBackOut())
            );
        }else{
            this.node.position = pos2;
        };
    },

    initHand: function(){
    	this.node.setScale(0);
        if (this.deltaPos == 0) {
            this.node.angle = -180;
        }else if (this.deltaPos == 1) {
            this.node.angle = -90;
        }else if (this.deltaPos == 2) {
            this.node.angle = -270;
        };
    },

    setGetCards: function(cards){
        this.getCards = cards;
    },

    setCardState: function(state){
        this.state = state;
    },

    updateHand: function(maxLen){
        var pgCards = this.data.pg_cards.slice(0);
        for (var i = pgCards.length-1; i >= 0; i--) {
            if (pgCards[i].pg_type == Enum.PgType.Jiao) {
                pgCards.splice(i,1);
            };
        };

        var pgScaleM = 0.4;
        if (!BattleData.isCardRecord()) {
            pgScaleM = 0.5;
        };
        if (this.deltaPos == 0) {
            pgScaleM = 0.5;
            if (!BattleData.isCardRecord()) {
                pgScaleM = 0.65;
            };
        };

        this.imgJiao.node.position = cc.p(0,0);

        var pgWidth = Util.getCardWidthByScale(pgScaleM);

        var handMaxWidth = cc.winSize.width/LocalData.getPnlScale()-50-pgWidth*(pgCards.length+1)-76-40
        var handWidth = maxLen*76

        var scaleM = 1;
        if (BattleData.isCardRecord()) {
            scaleM = 0.65;
        }
        if (this.deltaPos != 0) {
            scaleM = 0.4;
        }; 
        if (maxLen > 10) {
            if (this.deltaPos == 0) {
                if (handMaxWidth < handWidth) {
                    scaleM = handMaxWidth / handWidth;
                };
                if (BattleData.isCardRecord()) {
                    if (scaleM > 0.65) {
                        scaleM = 0.65; 
                    };
                };
            }else{
                scaleM = 0.4 - 0.1*(maxLen-10)/12;
            }
        };
        if (Cards.instance.cardState == Enum.CardState.WaitZhuang && this.deltaPos == 0) {
            scaleM = 1;
            if (BattleData.isCardRecord()) {
                scaleM = 0.65;
            }
        };

        var deltaWidth = Util.getCardWidthByScale(scaleM);

        var pos2 = cc.p(0,0);
        if (this.deltaPos == 0) {
            var offsetY = 0;
            if (!BattleData.isCardRecord()) {
                offsetY = 30;
            };
            pos2 = cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+50+pgWidth*(pgCards.length+1) + (this.idx+1)*deltaWidth,(-cc.winSize.height+offsetY)/2/LocalData.getPnlScale());
        }else if (this.deltaPos == 1) {
            pos2 = cc.p(cc.winSize.width/2/LocalData.getPnlScale()-210,cc.winSize.height/2/LocalData.getPnlScale()-80-pgWidth*(pgCards.length+1)-(this.idx+1)*deltaWidth);
        }else if(this.deltaPos == 2) {
            pos2 = cc.p(-cc.winSize.width/2/LocalData.getPnlScale()+210,cc.winSize.height/2/LocalData.getPnlScale()-80-pgWidth*(pgCards.length+1)-(this.idx+1)*deltaWidth);
        };

        //在最后面显示新得到的牌
        if (this.getCards && this.idx >= (this.cards.length - this.getCards.num)) {
            var pos = cc.p(0,0);
            if (this.deltaPos == 0) {
                pos2 = cc.pAdd(pos2,cc.p(40,0));
                if (pos2.x < cc.winSize.width/2 - 120) {
                    pos2 = cc.p(cc.winSize.width/2-120,pos2.y);
                };
                pos = cc.pAdd(pos2,cc.p(0,60));
            }else{
                pos2 = cc.pAdd(pos2,cc.p(0,-20));
                if (this.deltaPos == 1) {
                    pos = cc.pAdd(pos2,cc.p(-10,0));
                }else{
                    pos = cc.pAdd(pos2,cc.p(10,0));
                }
            };

            this.node.position = pos;
            this.node.runAction(
                cc.moveTo(0.1,pos2.x,pos2.y).easing(cc.easeBackOut())
            );
        }else{
            this.node.position = pos2;
        };

        if (Cards.instance.cardState == Enum.CardState.WaitZhuang && this.waitZhuangFlag) {
            this.waitZhuangFlag = false;
            if (this.deltaPos == 0) {
                this.node.position = cc.pAdd(this.node.position,cc.p(0,60));
            }else if (this.deltaPos == 1) {
                this.node.position = cc.pAdd(this.node.position,cc.p(-10,0));
            }else{
                this.node.position = cc.pAdd(this.node.position,cc.p(10,0));
            };
            this.node.setScale(0);
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(this.idx*1),
                    cc.scaleTo(0,scaleM),
                    cc.callFunc(function(){
                        Util.playAudio("resources/newImg/audio/effect/Playing_cards.mp3");
                    }),
                    cc.moveTo(0.1,pos2.x,pos2.y).easing(cc.easeBackOut())
                )
            );
        }else{
            this.node.setScale(scaleM);
        };
    },

});
