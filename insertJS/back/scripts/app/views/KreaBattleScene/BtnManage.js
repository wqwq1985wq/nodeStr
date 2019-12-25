var Enum = require('Enum');
var Util = require('Util');
var BattleNetHelper = require('BattleNetHelper');

cc.Class({
    extends: cc.Component,

    properties: {
    	prefabTwo: cc.Prefab,
        atlasCard:cc.SpriteAtlas,

        imgPeng: cc.Node,
        imgGuo: cc.Node,
        imgGang: cc.Node,
        imgHu: cc.Node,
        imgJiao: cc.Node,
        imgLiao: cc.Node,
        imgTing: cc.Node,
    },

    onManageCallback: function(){
        if (this.manageType == Enum.ManageType.Jiao) {
            if (this.data.length == 1) {
                this.reqManage(this.data[0]);
            }else{
                this.showManageCards();
            };
        }else if(this.manageType == Enum.ManageType.Long){
            if (this.data.length == 1) {
                this.reqManage(this.data[0]);
            }else{
                this.showManageCards();
            };
        }else if(this.manageType == Enum.ManageType.Hu){
            this.reqManage(0);
        }else if(this.manageType == Enum.ManageType.Gang){
            if (this.data.length == 1) {
                this.reqManage(this.data[0]);
            }else{
                this.showManageCards();
            };
        }else if(this.manageType == Enum.ManageType.Peng){
            if (this.data.length == 1) {
                this.reqManage(this.data[0]);
            }else{
                this.showManageCards();
            };
        }else if(this.manageType == Enum.ManageType.Guo){
            this.reqManage(0);
        }else if(this.manageType == Enum.ManageType.Ting){
            this.reqManage(0);
        };
    },

    reqManage: function(card){
        if (this.manageType == Enum.ManageType.Jiao) {
            BattleNetHelper.reqTrigger(card,1);
        }else if(this.manageType == Enum.ManageType.Long){
            BattleNetHelper.reqTrigger(card,2);
        }else if(this.manageType == Enum.ManageType.Hu){
            BattleNetHelper.reqTrigger(0,3);
        }else if(this.manageType == Enum.ManageType.Gang){
            BattleNetHelper.reqTrigger(card,5);
        }else if(this.manageType == Enum.ManageType.Peng){
            BattleNetHelper.reqTrigger(card,4);
        }else if(this.manageType == Enum.ManageType.Guo){
            BattleNetHelper.reqTrigger(0,6);
        }else if(this.manageType == Enum.ManageType.Ting){
            BattleNetHelper.reqTrigger(0,7);
        };
    },

    showManageCards: function(){
        this.func(this.data,this.manageType);

        
    },

    manageCb: function(card){
        if (card > 0) {
            this.reqManage(card);
        };

    },

    onLoad: function(){
        this.childArr = new Array();
    },

    start:function() {

    },

    clearChilds: function(){
        for (var i = 0; i < this.childArr.length; i++) {
            if (this.childArr[i]) {
                this.childArr[i].destroy();
            };
        };
        this.childArr = new Array();
    },

    init: function(manageType,data){
        this.manageType = manageType;
        this.data = data;

        this.imgPeng.active = false;
        this.imgGuo.active = false;
        this.imgGang.active = false;
        this.imgHu.active = false;
        this.imgTing.active = false;
        this.imgJiao.active = false;
        this.imgLiao.active = false;

        if (this.manageType == Enum.ManageType.Jiao) {
            this.imgJiao.active = true;
        }else if(this.manageType == Enum.ManageType.Long){
            this.imgLiao.active = true;
        }else if(this.manageType == Enum.ManageType.Hu){
            this.imgHu.active = true;
        }else if(this.manageType == Enum.ManageType.Gang){
            this.imgGang.active = true;
        }else if(this.manageType == Enum.ManageType.Peng){
            this.imgPeng.active = true;
        }else if(this.manageType == Enum.ManageType.Guo){
            this.imgGuo.active = true;
        }else if(this.manageType == Enum.ManageType.Ting){
            this.imgTing.active = true;
        };
    },

    updateUI: function(idx,length,func){
        this.func = func;

        var posX = 0;
        var width = 180;
        var delta = 20;
        posX = cc.winSize.width/2-200 - (length-idx-1)*150;
        this.node.position = cc.p(posX+cc.winSize.width,-140);
        this.node.runAction(
                cc.sequence(
                    cc.delayTime(idx*0.2),
                    cc.moveTo(0.2,cc.p(posX,-140))));
    },

});
