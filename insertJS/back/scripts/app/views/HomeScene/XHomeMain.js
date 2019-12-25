var LoginData = require('LoginData');
var LocalData = require('LocalData');
var PlayerData = require('PlayerData');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgHead: cc.Sprite,

    	imgBg: cc.Node,

    	//人物信息
        txtName: cc.Label,
        txtId: cc.Label,

        prefabHistory: cc.Prefab,
    },

    onLoad: function(){
        this.imgBg.setScale(LocalData.getScreenScale());

        this.registerMsg();

        this.pnlMid = this.node.getChildByName("pnlMid");
        this.pnlMid.setScale(LocalData.getPnlScale());

        this.pnlTop = this.node.getChildByName("pnlTop");
        this.pnlTop.setScale(LocalData.getPnlScale());
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
        if (PlayerData.getPlayerAttrData() != null) {
            this.updateUI();
        };
    },

    updateUI: function(){
    	this.txtName.string = PlayerData.getPlayerData().name;

    	this.txtId.string = "ID:"+PlayerData.getPlayerId();

        if (LoginData.GamePlatform == 2) {
            var self = this;
            cc.loader.load({url: PlayerData.getPlayerData().avatarurl, type: 'jpg'},function (err, texture) {
                 var frame = new cc.SpriteFrame(texture);
                 self.imgHead.spriteFrame=frame;
            });
        };
    },

    onEnterCallback:function(){
    	cc.director.loadScene("XBattleMain");
    },

    onHelpCallback: function(){
    	var historyDlg = cc.instantiate(this.prefabHistory);
        this.node.addChild(historyDlg);
        historyDlg.position = cc.p(0,0);
    },

    onExitCallback: function(){
        if (LoginData.GamePlatform == 2) {
            wx.exitMiniProgram();
        }else{
            cc.director.end();
        };
    },

});
