var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var ViewCommon = require('ViewCommon');
var ErrorData = require('ErrorData');
var LoginData = require('LoginData');
var BattleNetHelper = require('BattleNetHelper');

var SignCfg = [
	"1|1",
	"1|1",
	"1|1",
	"1|2",
	"1|2",
]

module.exports={

	SignCfg: SignCfg,

    registerMsg: function()
    {
    	this.init();

    	EventEmitter.on(SocketID.GET_SIGNINFO,this.onGetSignInfo,this);

    	EventEmitter.on(SocketID.GET_SIGNAWARD,this.onGetSignAward,this);
    },

    init: function(){
    	this.signInfo = null;
    },

    onGetSignInfo: function(data){
    	this.signInfo = data;

    	EventEmitter.emit("Client"+SocketID.GET_SIGNINFO);
    },

    onGetSignAward: function(data){
    	if (data.reward && data.reward != "") {
    		ViewCommon.showAwardDlg(data.reward);
    	};

    	EventEmitter.emit("Client"+SocketID.GET_SIGNAWARD);
    },

    reqGetSignInfo: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.GET_SIGNINFO});
    },

    reqGetSignAward: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.GET_SIGNAWARD});
    },
    
};