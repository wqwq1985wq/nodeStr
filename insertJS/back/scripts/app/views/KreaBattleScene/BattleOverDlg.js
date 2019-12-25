var Util = require('Util');
var Enum = require('Enum');
var BattleData = require('BattleData');
var LoginData = require('LoginData');
var CardData = require('CardData');
var LocalData = require('LocalData');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        btnShare: cc.Button,
        btnNext: cc.Button,
        spOver: cc.SpriteFrame,
        pnlPlayer1: cc.Node,
        pnlPlayer2: cc.Node,
        pnlPlayer3: cc.Node,
        pnlRight1: cc.Node,
        pnlRight2: cc.Node,
        pnlRight3: cc.Node,
        pnlTopRight: cc.Node,

        prefabCard: cc.Prefab,
        atlasCard:cc.SpriteAtlas,

        prefabShareDlg: cc.Prefab,

        txtHu1:cc.Label,
        txtHu2:cc.Label,
        txtHu3:cc.Label,

        imgHu1:cc.Node,
        imgZimo1:cc.Node,

        imgHu2:cc.Node,
        imgZimo2:cc.Node,

        imgHu3:cc.Node,
        imgZimo3:cc.Node,
    },

    onShareCallback:function(){
        if (this.btlShareDlg) {
            return;
        };

        this.btlShareDlg = cc.instantiate(this.prefabShareDlg);
        this.btlShareDlg.position = cc.v2(0,0);
        this.btlShareDlg.getComponent('BattleOverShareDlg').updateUI(this.data,false);
        this.btlShareDlg.getComponent('BattleOverShareDlg').setCallback(function(){
                    if (this.btlShareDlg) {
                        this.btlShareDlg.destroy();
                        this.btlShareDlg = null;
                    };
                }.bind(this));
        this.btlShareDlg.setScale(1/LocalData.getPnlScale());
        this.node.addChild(this.btlShareDlg,100);
    },

    onNextCallback: function(){
        this.func();
    },

    setCallback: function(func){
        this.func = func;
    },

    onLoad: function(){
        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);

        var scale = LocalData.getPnlScale();
        this.node.setScale(scale);
        this.imgBg.setScale(1/scale);
    },

    start:function() {

    },

    init:function(){

    },

    showPlayerImg: function(pos,avatarurl){
        var self = this;
        cc.loader.load({url: avatarurl, type: 'jpg'},function (err, texture) {
             var frame = new cc.SpriteFrame(texture);
             self['pnlPlayer'+pos].getChildByName('imgPlayer').getComponent(cc.Sprite).spriteFrame=frame;
        });
    },

    updateUI:function(data){
        this.data = data;
        this.huInfo = data.data.hu_info;
        this.baseCards = data.data.base_cards;

        for (var i = 0; i < this.huInfo.length; i++) {
            var info = this.huInfo[i];
            var detail = info.detail;
            var pos = info.pos;
            var pInfo = BattleData.getRoomPlayerInfoByPos(pos);
            this["pnlPlayer"+pos].getChildByName("txtName").getComponent(cc.Label).string = pInfo.pdata.name;
            
            var myPos = BattleData.getMyPlayerInfo().pos;
            if (myPos == pos) {
                this["pnlPlayer"+pos].getChildByName('txtName').color = new cc.Color(36,194,36,255);
            };
            
            if (LoginData.GamePlatform == 2) {
                this.showPlayerImg(pos,pInfo.pdata.avatarurl);
            };

            this["pnlPlayer"+pos].getChildByName("imgZhuang").active = (detail.zhuang == 2);
            this["pnlPlayer"+pos].getChildByName("imgFirst").active = (pos==this.baseCards.round_firstpos);

            this["pnlRight"+pos].getChildByName("labelXi").getComponent(cc.Label).string = "喜牌 x"+detail.xi_cards.length;
            this["pnlRight"+pos].getChildByName("labelHu").getComponent(cc.Label).string = "胡数 "+info.hu;

            if (info.score >= 0) {
                this["pnlRight"+pos].getChildByName("labelScoreLose").getComponent(cc.Label).string = "";
                this["pnlRight"+pos].getChildByName("labelScoreWin").getComponent(cc.Label).string = "/"+info.score;
            }else{
                this["pnlRight"+pos].getChildByName("labelScoreLose").getComponent(cc.Label).string = "/"+Math.abs(info.score);
                this["pnlRight"+pos].getChildByName("labelScoreWin").getComponent(cc.Label).string = "";
            }

            var str = "";
            var isHu = false;
            if (info.hu_state == 1) {
                str = "塌子胡";
                isHu = true;
            }else if (info.hu_state == 2) {
                str = "飘胡";
                isHu = true;
            }else if (info.hu_state == 3) {
                str = "清胡";
                isHu = true;
            }else{
                str = "";
            };
            if (isHu) {
                if (info.special_state == 1) {
                    str = str + " 丫子";
                }else if (info.special_state == 2) {
                    str = str + " 边张";
                }else if (info.special_state == 3) {
                    str = str + " 单吊";
                };

                if (info.hu_state == 2 && info.menhu) {
                    str = str + " 闷胡";
                };

                if (info.tianhu) {
                    str = str + " 天胡";
                };

                if (info.qionghu) {
                    str = str + " 穷胡";
                };

                if (info.tianting) {
                    str = str + " 折庄";
                };

                if (info.zimo) {
                    this["pnlRight"+pos].getChildByName("imgHu").active = false;
                    this["pnlRight"+pos].getChildByName("imgZimo").active = true;
                };
                this["pnlRight"+pos].getChildByName("imgHu").active = !info.zimo;
                this["pnlRight"+pos].getChildByName("imgZimo").active = info.zimo;
            }else{
                this["pnlRight"+pos].getChildByName("imgHu").active = false;
                this["pnlRight"+pos].getChildByName("imgZimo").active = false;
            };

            if (info.sanlong) {
                str = str = " 三龙会";
            };

            this["txtHu"+pos].string = str;

            this.updateCards(pos,detail,isHu);
        };

        this.updateJiangCards(this.baseCards.jiang_cards);
    },

    updateJiangCards: function(jiangCards){
        if (jiangCards != null && jiangCards.length > 0) {
            for (var i = 0; i < jiangCards.length; i++) {
                var node = cc.instantiate(this.prefabCard);
                node.getChildByName("imgCard").getComponent(cc.Sprite).spriteFrame = this.atlasCard.getSpriteFrame(Util.getCardSpriteFrame(jiangCards[i]));
                node.getChildByName("imgJiao").active = false
                node.getChildByName("imgLong").active = false
                this.pnlTopRight.addChild(node);
                node.position = cc.p(380,312-40*i);
                node.setScale(0.6);
                node.angle = 90;
            };
            
        }else{

        }
    },

    updateCards:function(pos,detail,is_hu){
        var posY1 = 0;
        if (pos == 1) {
            posY1 = 120;
        }else if (pos == 2) {
            posY1 = -43;
        }else if (pos == 3) {
            posY1 = -204;
        };
        var posY2 = posY1 + 6;

        var posX = this.pnlPlayer1.getPosition().x+104;

        //喜牌
        if (detail.xi_cards.length > 0) {
            for (var i = 0; i < detail.xi_cards.length; i++) {
                var node = this.createCard(detail.xi_cards[i],0);
                node.position = cc.p(posX,posY1+14*i);
                node.setLocalZOrder(detail.xi_cards.length-i);
                node.setScale(0.4);
            };
        };

        //碰杠牌
        var pgCards = detail.pg_cards.slice(0);
        if (pgCards.length > 0) {
            for (var i = pgCards.length-1; i >= 0; i--) {
                if (pgCards[i].pg_type == Enum.PgType.Jiao) {
                    pgCards.splice(i,1);
                };
            };

            for (var i = 0; i < pgCards.length; i++) {
                var cards = pgCards[i].cards;
                var pgType = pgCards[i].pg_type;
                for (var j = 0; j < cards.length; j++) {
                    var card = cards[j];
                    var node = null;
                    if (pgType == Enum.PgType.Long) {
                        node = this.createCard(card,2);
                    }else{
                        if (pgType == Enum.PgType.AnGang && j==(cards.length-1)) {
                            node = this.createCard(card,3);
                        }else{
                            node = this.createCard(card,0);
                        };
                    }
                    node.position = cc.p(posX+Util.getCardWidthByScale(0.4)*(i+1),posY1+14*j);
                    node.setLocalZOrder(cards.length-j);
                    node.setScale(0.4);
                };
            };
        };

        posX = posX + Util.getCardWidthByScale(0.4)*(pgCards.length);

        if (detail.hand_cards.length > 0) {
            var handCards = detail.hand_cards;
            var lastCard = null;
            if (is_hu) {
                lastCard = handCards[handCards.length-1];
                handCards.splice(handCards.length-1,1);
            };
            handCards.sort(function(a,b){
                return a - b;
            });
            if (lastCard) {
                handCards.push(lastCard);
            };
            for (var i = 0; i < handCards.length; i++) {
                var isJiao = this.isCardInPgCards(handCards[i],detail.pg_cards);
                var node = null;
                if (isJiao) {
                    node = this.createCard(handCards[i],1);
                }else{
                    node = this.createCard(handCards[i],0);
                }
                var x = posX+Util.getCardWidthByScale(0.45)*(i+1);
                if (is_hu && i == (handCards.length-1)) {
                    x = x + 10;
                };
                node.position = cc.p(x,posY2);
                node.setScale(0.45);
            };
        };



        //30   132 35
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

    //0不显示 1叫龙 2撂龙
    createCard:function(card,ctype){
        var node = cc.instantiate(this.prefabCard);
        if (ctype == 3) {
            node.getChildByName("imgCard").getComponent(cc.Sprite).spriteFrame = this.atlasCard.getSpriteFrame("pai_di_1");
        }else{
            node.getChildByName("imgCard").getComponent(cc.Sprite).spriteFrame = this.atlasCard.getSpriteFrame(Util.getCardSpriteFrame(card));
        };
            
        if (ctype == 0 || ctype == 3) {
            node.getChildByName("imgJiao").active = false
            node.getChildByName("imgLong").active = false
        }else if (ctype == 1) {
            node.getChildByName("imgJiao").active = true
            node.getChildByName("imgLong").active = false
        }else if (ctype == 2) {
            node.getChildByName("imgJiao").active = false
            node.getChildByName("imgLong").active = true
        };
        this.node.addChild(node);

        return node;
    },

});
