var HomeData = require('HomeData');
var EventEmitter = require('EventEmitter');
var ViewCommon = require('ViewCommon');
var LocalData = require('LocalData');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgDi: cc.Node,
        txtCost1: cc.Label,
        txtCost2: cc.Label,
        txtCost3: cc.Label,
        imgCost1: cc.Node,
        imgCost2: cc.Node,
        imgCost3: cc.Node,
        txtRound1: cc.Label,
        txtRound2: cc.Label,
        txtRound3: cc.Label,

        toggleCost1: cc.Toggle,
        toggleCost2: cc.Toggle,

        toggleRound1: cc.Toggle,
        toggleRound2: cc.Toggle,
        toggleRound3: cc.Toggle,

        toggleJiang1: cc.Toggle,
        toggleJiang2: cc.Toggle,

        toggleXi1: cc.Toggle,
        toggleXi2: cc.Toggle,

        toggleZhuang1: cc.Toggle,
        toggleZhuang2: cc.Toggle,
        toggleZhuang3: cc.Toggle,
        toggleZhuang4: cc.Toggle,

        imgFree: cc.Node,
    },

    onLoad: function(){
        if (HomeData.isFree) {
            this.txtCost1.node.active = false;
            this.txtCost2.node.active = false;
            this.txtCost3.node.active = false;

            this.imgCost1.active = false;
            this.imgCost2.active = false;
            this.imgCost3.active = false;

            this.imgFree.active = true;
        }else{
            this.txtCost1.node.active = true;
            this.txtCost2.node.active = true;
            this.txtCost3.node.active = true;

            this.imgCost1.active = true;
            this.imgCost2.active = true;
            this.imgCost3.active = true;

            this.imgFree.active = false;
        };
        
        this.pnlMid = this.node.getChildByName("pnlMid");
        if (this.pnlMid) {
            ViewCommon.playDlgAction(this.pnlMid);
        };

        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);
		this.node.on("touchend", this.onTouchEnded, this);

        this.paytype = LocalData.getCostState();
        if (this.paytype == 1) {
            this.toggleCost1.check();
        }else if (this.paytype == 2) {
            this.toggleCost2.check();
        };

		this.model = 2;

        this.xipai = LocalData.getXiState();
        if (this.xipai == 1) {
            this.toggleXi1.check();
        }else if (this.xipai == 2) {
            this.toggleXi2.check();
        };

        var round = LocalData.getRoundState();
        if (round == 1) {
            this.times = 6;
            this.toggleRound1.check();
        }else if (round == 2) {
            this.times = 9;
            this.toggleRound2.check();
        }else if (round == 3) {
            this.times = 12;
            this.toggleRound3.check();
        };

        this.zhuang = LocalData.getZhuangState();
        if (this.zhuang == 1) {
            this.toggleZhuang1.check();
        }else if (this.zhuang == 2) {
            this.toggleZhuang2.check();
        }else if (this.zhuang == 3) {
            this.toggleZhuang3.check();
        }else if (this.zhuang == 4) {
            this.toggleZhuang4.check();
        };


        this.chgCostTxt();

    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onCloseCallback: function(){
    	this.node.destroy();
    },

    onCreateCallback: function(){
        EventEmitter.emit("WaitingDlgShowEvent");
    	HomeData.reqCreateRoom(this.paytype,this.model,this.xipai,this.times,this.zhuang);
    },

    onXiCallback: function(event,data){
        this.xipai = data;

        LocalData.setXiState(data);
    },

    onPayCallback: function(event,data){
    	this.paytype = data;
        this.chgCostTxt();

        LocalData.setCostState(data);
    },

    chgCostTxt: function(){
        var cfg = HomeData.CostCfg1;
        if (this.paytype == 1) {
            cfg = HomeData.CostCfg1;
        }else if (this.paytype == 2) {
            cfg = HomeData.CostCfg2;
        };
        for (var i = 0; i < cfg.length; i++) {
            this['txtCost'+(i+1)].string = "X"+cfg[i].cost;
            this['txtRound'+(i+1)].string = cfg[i].round+"局";
        };
    },

    onRoundCallback: function(event,data){
    	if (data == 1) {
    		this.times = 6;
    	}else if (data == 2) {
    		this.times = 9;
    	}else if (data == 3) {
    		this.times = 12;
    	};

        LocalData.setRoundState(data);
    },

    onZhuangCallback: function(event,data){
    	this.zhuang = data;

        LocalData.setZhuangState(data);
    },

    start:function() {

    },



});
