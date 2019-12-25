var LoginData = require('LoginData');
var LocalData = require('LocalData');
var PlayerData = require('PlayerData');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');

cc.Class({
    extends: cc.Component,

    properties: {
    	prefabChargeBuyDlg: cc.Prefab,
    	prefabChargeDlg: cc.Prefab,
    	prefabDailiDlg: cc.Prefab,
        prefabSearchDlg: cc.Prefab,

    	btnSetDaili: cc.Node,
    	btnUnsetDaili: cc.Node,
        btnSearch: cc.Node,
    },

    onLoad: function(){
        this.registerMsg();

        this.pnlTop = this.node.getChildByName("pnlTop");
        this.pnlTop.setScale(LocalData.getPnlScale());

        this.txtId = this.node.getChildByName("txtId").getComponent(cc.Label);

        this.txtDiamond = this.node.getChildByName('txtDiamond').getComponent(cc.Label);

        this.txtId.string = "您的ID："+PlayerData.getPlayerId();

        if (PlayerData.getPlayerAttrData() != null) {
            this.updateUI();
        };
        
        if (PlayerData.getPlayerId() == 520110 || PlayerData.getPlayerId() == 520160) {
            this.btnSetDaili.active = true;
            this.btnUnsetDaili.active = true;
            this.btnSearch.active = true;
        }else{
            this.btnSetDaili.active = false;
            this.btnUnsetDaili.active = false;
            this.btnSearch.active = false;
        };
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.SYNC_PLAYERINFO,this.updateUI,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.SYNC_PLAYERINFO,this.updateUI,this);
    },

    start:function() {
        
    },

    updateUI: function(){
    	this.txtDiamond.string = "剩余钻石："+PlayerData.getPlayerAttrData().diamond;
    },

    onChargeCallback: function(){
    	var chargeDlg = cc.instantiate(this.prefabChargeDlg);
        this.node.addChild(chargeDlg);
        chargeDlg.position = cc.p(0, 0);
    },

    onBuyRecordCallback: function(){
    	var chargeBuyDlg = cc.instantiate(this.prefabChargeBuyDlg);
        this.node.addChild(chargeBuyDlg);
        chargeBuyDlg.getComponent('ChargeBuyDlg').updateUI(1);
        chargeBuyDlg.position = cc.p(0, 0);
    },

    onChargeRecordCallback: function(){
    	var chargeBuyDlg = cc.instantiate(this.prefabChargeBuyDlg);
        this.node.addChild(chargeBuyDlg);
        chargeBuyDlg.getComponent('ChargeBuyDlg').updateUI(2);
        chargeBuyDlg.position = cc.p(0, 0);
    },

    onSetDailiCallback: function(){
    	var dailiDlg = cc.instantiate(this.prefabDailiDlg);
        this.node.addChild(dailiDlg);
        dailiDlg.getComponent('DailiDlg').updateUI(1);
        dailiDlg.position = cc.p(0, 0);
    },

    onUnsetDailiCallback: function(){
    	var dailiDlg = cc.instantiate(this.prefabDailiDlg);
        this.node.addChild(dailiDlg);
        dailiDlg.getComponent('DailiDlg').updateUI(0);
        dailiDlg.position = cc.p(0, 0);
    },

    onSearchCallback: function(){
        var searchDlg = cc.instantiate(this.prefabSearchDlg);
        this.node.addChild(searchDlg);
        searchDlg.position = cc.p(0,0);
    },

    onExitCallback: function(){
        cc.director.loadScene("HomeMain");
    },

});
