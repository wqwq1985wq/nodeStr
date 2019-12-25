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
    	EventEmitter.on(SocketID.GET_SINGLE_PLAYERINFO,this.onGetSinglePlayerInfo,this);

    	EventEmitter.on(SocketID.CHARGE_FOR_PLAYER,this.onChargeForPlayer,this);

    	EventEmitter.on(SocketID.CHARGE_RECORD,this.onChargeRecord,this);

        EventEmitter.on(SocketID.CHG_DAILI,this.onChgDaili,this);

    },

    onChgDaili: function(data){

        EventEmitter.emit("Client"+SocketID.CHG_DAILI,data);
    },

    onGetSinglePlayerInfo: function(data){
    	
    	EventEmitter.emit("Client"+SocketID.GET_SINGLE_PLAYERINFO,data['msg']);
    },

    onChargeForPlayer: function(data){
    	EventEmitter.emit("Client"+SocketID.CHARGE_FOR_PLAYER);
    },

    onChargeRecord: function(data){
    	EventEmitter.emit("Client"+SocketID.CHARGE_RECORD,data);
    },

    reqSinglePlayerInfo: function(uid){
    	ClientSocket.setRequestData({"socketID":SocketID.GET_SINGLE_PLAYERINFO,"uid":uid});
    },

    reqChargeForPlayer: function(uid,diamond){
    	ClientSocket.setRequestData({"socketID":SocketID.CHARGE_FOR_PLAYER,"uid":uid,"diamond":diamond});
    },

    reqChgDaili: function(uid,state){
        ClientSocket.setRequestData({"socketID":SocketID.CHG_DAILI,"pid":uid,"state":state});
    },

    reqChargeRecord: function(ctype){
    	ClientSocket.setRequestData({"socketID":SocketID.CHARGE_RECORD,'ctype':ctype});
    },
    
};