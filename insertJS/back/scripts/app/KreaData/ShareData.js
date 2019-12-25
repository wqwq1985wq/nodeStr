var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var ViewCommon = require('ViewCommon');
var ErrorData = require('ErrorData');
var LoginData = require('LoginData');
var BattleNetHelper = require('BattleNetHelper');

var ShareCfg = "1|1";

module.exports={

	ShareCfg: ShareCfg,

    registerMsg: function()
    {
    	this.init();

    	EventEmitter.on(SocketID.GET_SHAREINFO,this.onGetShareInfo,this);

    	EventEmitter.on(SocketID.GET_SHAREAWARD,this.onGetShareAward,this);
    },

    init: function(){
    	this.shareInfo = null;
    },

    onGetShareInfo: function(data){
    	this.shareInfo = data;
    	EventEmitter.emit("Client"+SocketID.GET_SHAREINFO);
    },

    onGetShareAward: function(data){
    	if (data.reward && data.reward != "") {
    		ViewCommon.showAwardDlg(data.reward);
    	};

    	EventEmitter.emit("Client"+SocketID.GET_SHAREAWARD);
    },

    reqGetShareInfo: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.GET_SHAREINFO});
    },

    reqGetShareAward: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.GET_SHAREAWARD});
    },
    
};