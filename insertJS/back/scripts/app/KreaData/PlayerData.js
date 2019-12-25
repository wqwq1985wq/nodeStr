var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');

module.exports={

    registerMsg: function()
    {
        this.init();

    	EventEmitter.on(SocketID.ACCOUNT_LOGIN,this.onAccountLogin,this);

        EventEmitter.on(SocketID.USER_LOGIN,this.onUserLogin,this);

        EventEmitter.on(SocketID.GET_PLAYER_BASICINFO,this.onGetPlayerBasicInfo,this);

        EventEmitter.on(SocketID.SYNC_PLAYERINFO,this.onSyncPlayerInfo,this);
    },

    init: function(){
        this.attrData = null;

        this.data = null;
    },

    onAccountLogin: function(data){
        if (data.user_msg) {
            this.data = data.user_msg;
        };

    },

    onUserLogin: function(data){
        if (data.user_msg) {
            this.data = data.user_msg;
        };
    },

    getPlayerData: function(){
        return this.data;
    },

    onSyncPlayerInfo: function(data){
        this.attrData = data.data;

        EventEmitter.emit("Client"+SocketID.SYNC_PLAYERINFO);
    },

    getPlayerAttrData: function(){
        return this.attrData;
    },

    onGetPlayerBasicInfo: function(data){
        EventEmitter.emit("Client"+SocketID.GET_PLAYER_BASICINFO,data.data);
    },

    getPlayerId: function(){
    	return this.data.id;
    },


    reqGetPlayerBasicInfo: function(uids){
        ClientSocket.setRequestData({"socketID":SocketID.GET_PLAYER_BASICINFO,"uids":uids});
    },
    
};