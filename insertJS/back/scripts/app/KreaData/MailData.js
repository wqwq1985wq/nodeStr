var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var ViewCommon = require('ViewCommon');
var ErrorData = require('ErrorData');
var LoginData = require('LoginData');
var BattleNetHelper = require('BattleNetHelper');

module.exports={

    registerMsg: function()
    {
    	EventEmitter.on(SocketID.GET_MAILINFO,this.onGetMailInfo,this);

    	EventEmitter.on(SocketID.DEL_MAIL_SINGLE,this.onDelMailSingle,this);

    	EventEmitter.on(SocketID.READ_MAIL_SINGLE,this.onReadMailSingle,this);
    },

    onGetMailInfo: function(data){
    	this.mailInfo = data.data;

    	EventEmitter.emit("Client"+SocketID.GET_MAILINFO);
    },

    getMailInfo: function(){
    	return this.mailInfo;
    },

    onDelMailSingle: function(data){
    	for (var i = 0; i < this.mailInfo.length; i++) {
    		if (this.mailInfo[i].id == data.id) {
    			this.mailInfo.splice(i,1);
    			break;
    		};
    	};

    	if (data.reward && data.reward != "") {
    		ViewCommon.showAwardDlg(data.reward);
    	};

    	EventEmitter.emit("Client"+SocketID.GET_MAILINFO);

    	EventEmitter.emit("Client"+SocketID.DEL_MAIL_SINGLE,data);
    },

    onReadMailSingle: function(data){
    	if (!data.hasOwnProperty('id')) {
    		return;
    	};
    	for (var i = 0; i < this.mailInfo.length; i++) {
    		if (this.mailInfo[i].id == data.id) {
    			this.mailInfo[i].is_get = 1;
    			break;
    		};
    	};

    	EventEmitter.emit("Client"+SocketID.GET_MAILINFO);
    },

    reqGetMailInfo: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.GET_MAILINFO});
    },

    reqDelMailSingle: function(id){
    	ClientSocket.setRequestData({"socketID":SocketID.DEL_MAIL_SINGLE,"mail_id":id});
    },

    reqReadMailSingle: function(id){
    	ClientSocket.setRequestData({"socketID":SocketID.READ_MAIL_SINGLE,"mail_id":id});
    },
    
};