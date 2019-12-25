var LoginData = require('LoginData');
var LocalData = require('LocalData');
var Util = require('Util');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgBg: cc.Node,
    	txt2: cc.Label,
    	imgCardShow: cc.Sprite,

    	pnl1: cc.Node,
    	pnl2: cc.Node,
    	pnl3: cc.Node,
    	pnl4: cc.Node,
    	pnl5: cc.Node,

    	btn1: cc.Button,
    	btn2: cc.Button,
    	btn3: cc.Button,
    	btn4: cc.Button,
    	btn5: cc.Button,

    	atlasCard:cc.SpriteAtlas,

    	prefabCard: cc.Prefab,

    	pnlOver:cc.Node,
    	imgBg2: cc.Node,
    	txtTotalScore: cc.Label,
    },

    onLoad: function(){
        this.imgBg.setScale(LocalData.getScreenScale());

        this.imgBg2.setScale(LocalData.getScreenScale());

        this.registerMsg();

        this.pnlTop = this.node.getChildByName("pnlTop");
        this.pnlTop.setScale(LocalData.getPnlScale());

        this.imgTop = this.node.getChildByName("imgTop");
        this.imgTop.setScaleY(LocalData.getPnlScale());

        this.pnlMid = this.node.getChildByName("pnlMid");
        this.pnlMid.setScale(LocalData.getPnlScale());

        this.totalCards = 35;
        this.score = 0;

        this.tb1 = new Array();
        this.tb2 = new Array();
        this.tb3 = new Array();
        this.tb4 = new Array();
        this.tb5 = new Array();

        this.newCard();

        this.pnlOver.active = false;
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        // EventEmitter.on("wechatAuthorInfo",this.onWechatAuthorInfo,this);
    },

    unRegisterMsg: function(){
        // EventEmitter.off("wechatAuthorInfo",this.onWechatAuthorInfo,this);
    },

    start:function() {
        
    },

    onExitCallback: function(){
    	cc.director.loadScene("XHomeMain");
    },


    onBtnCallback: function(event,state){
    	this.createCard(state);
    	this.checkDisappear(state);
    	//游戏结束
    	if (this['tb'+state].length > 8) {
    		this.pnlOver.active = true;
    		this.txtTotalScore.string = "当前得分：" + this.score;
    	};
    	this.newCard();
    },

    createCard: function(state){
    	var node = cc.instantiate(this.prefabCard);
    	node.getComponent('XCardNode').updateUI(this.cardIdx);
    	this["pnl"+state].addChild(node);
    	node.position = cc.v2(0,524 - this['tb'+state].length*55);
    	this['tb'+state].push(node);
    },

    checkDisappear: function(state){
    	this['btn'+state].interactable = false;

    	var node = this['tb'+state][this['tb'+state].length-1];
    	var card = node.getComponent('XCardNode').getCard();
    	if (card>27) {
    		node.getComponent('XCardNode').hideAction(function(){
    					this['btn'+state].interactable = true;
    				}.bind(this));
    		this['tb'+state].splice(this['tb'+state].length-1,1);
    		if (this['tb'+state].length > 0) {
    			var node1 = this['tb'+state][this['tb'+state].length-1];
    			node1.getComponent('XCardNode').hideAction();
    			this['tb'+state].splice(this['tb'+state].length-1,1);
    		};
    		this.score = this.score+20;
    		this.txt2.string = this.score;
    	}else{
    		if (this['tb'+state].length < 3) {
    			this.score = this.score + 5;
    			this.txt2.string = this.score;

		    	this['btn'+state].interactable = true;
    		}else{
    			var n1 = this['tb'+state][this['tb'+state].length-3];
    			var n2 = this['tb'+state][this['tb'+state].length-2];
    			var n3 = this['tb'+state][this['tb'+state].length-1];
    			var c1 = n1.getComponent('XCardNode').getCard();
    			var c2 = n2.getComponent('XCardNode').getCard();
    			var c3 = n3.getComponent('XCardNode').getCard();
    			if ((c1 <= 9 && c2 <= 9 && c3 <= 9)
    			|| (c1 > 9 && c1 <= 18 && c2 > 9 && c2 <= 18 && c3 > 9 && c3 <= 18)
    			|| (c1 > 18 && c1 <= 27 && c2 > 18 && c2 <= 27 && c3 > 18 && c3 <= 27)) {
    				
    				if (this.checkThreeGang(c1,c2,c3)) {
    					n1.getComponent('XCardNode').hideAction(function(){
	    					this['btn'+state].interactable = true;
	    				}.bind(this));
	    				n2.getComponent('XCardNode').hideAction();
	    				n3.getComponent('XCardNode').hideAction();
	    				this['tb'+state].splice(this['tb'+state].length-3,3);

	    				this.score = this.score + 30;
	    				this.txt2.string = this.score;
    				}else{
    					this.score = this.score + 5;
    					this.txt2.string = this.score;

			    		this['btn'+state].interactable = true;
    				};
    			}else{
    				this.score = this.score + 5;
    				this.txt2.string = this.score;

			    	this['btn'+state].interactable = true;
    			};
    		};
    	};
    },

    checkThreeGang: function(x,y,z){
    	if (x == y && y == z) {
    		return true;
    	};
    	if (x == y || x == z || y == z) {
    		return false;
    	};
    	var tb = new Array();
    	tb.push(x);
    	tb.push(y);
    	tb.push(z);
    	tb.sort(function(a,b){
            return a - b;
        });
        if (Math.abs(tb[0]-tb[1]) == 1 && Math.abs(tb[1]-tb[2]) == 1) {
        	return true;
        };
        return false;
    },

    newCard: function(){
    	this.cardIdx = Math.floor(Math.random()*(this.totalCards+1));
    	if (this.cardIdx > 35) {
			this.cardIdx = 35;
		}else if (this.cardIdx <= 0) {
			this.cardIdx = 1;
		};
    	this.imgCardShow.spriteFrame = this.atlasCard.getSpriteFrame(Util.getXCardSpriteFrame(this.cardIdx));
    },

});
