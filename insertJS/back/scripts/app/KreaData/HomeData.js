var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var ViewCommon = require('ViewCommon');
var ErrorData = require('ErrorData');
var LoginData = require('LoginData');
var BattleNetHelper = require('BattleNetHelper');

var ZhuangCfg = [
    "1|2|3",
    "2|3|4",
    "3|4|5",
    "5|7|10",
];

var CostCfg2 = [
    {
        round:6,
        cost:1,
    },
    {
        round:9,
        cost:2,
    },
    {
        round:12,
        cost:2,
    },
];

var CostCfg1 = [
    {
        round:6,
        cost:3,
    },
    {
        round:9,
        cost:5,
    },
    {
        round:12,
        cost:6,
    },
];

module.exports={
    ZhuangCfg:ZhuangCfg,
    CostCfg1:CostCfg1,
    CostCfg2:CostCfg2,

    registerMsg: function()
    {
        this.init();

    	EventEmitter.on(SocketID.CREATE_ROOM,this.onCreateRoom,this);

    	EventEmitter.on(SocketID.GET_ROOM,this.onGetRoom,this);

    	EventEmitter.on(SocketID.GET_ROOM_BY_ID,this.onGetRoomById,this);

    	EventEmitter.on(SocketID.JOIN_ROOM,this.onJoinRoom,this);

        EventEmitter.on(SocketID.ROOM_LEAVE,this.onRoomLeave,this);

        EventEmitter.on(SocketID.SERVER_TIME,this.onServerTime,this);

        EventEmitter.on(SocketID.SERVER_MSG,this.onServerMsg,this);

        EventEmitter.on("reqGetRoomById",this.reqGetRoomById,this);

        EventEmitter.on("saveShareRoomId",this.onSaveShareRoomId,this);

        EventEmitter.on("saveHuifangRoomId",this.onSaveHuifangRoomId,this);

        EventEmitter.on("saveCreateRoom",this.onSaveCreateRoom,this);
    },

    init: function(){
        this.shareRoomId = 0;
        this.huifangRoomId = 0;
        this.isShareCreateRoom = false;
    },

    onSaveCreateRoom: function(){
        this.isShareCreateRoom = true;
        this.shareCreateRoom();
    },

    shareCreateRoom: function(){
        if (this.isShareCreateRoom) {
            var sceneName = cc.director.getScene().getName();
            if (sceneName == "HomeMain" || sceneName == "LoginMain") {
                if (sceneName == "HomeMain") {
                    this.isShareCreateRoom = false;
                    if (!this.isHaveRoom()) {
                        EventEmitter.emit("SaveCreateRoomEvent");
                        return true;
                    };
                };
            }else if (sceneName == "BattleMain") {
                this.isShareCreateRoom = false;
            };
        };
        return false;
    },

    onSaveShareRoomId: function(room_id){
        this.shareRoomId = room_id;
        this.reqShareRoom();
    },

    onSaveHuifangRoomId: function(room_id){
        this.huifangRoomId = room_id;
        this.reqHuifangRoom();
    },

    reqHuifangRoom: function(){
        if (this.huifangRoomId > 0) {
            var sceneName = cc.director.getScene().getName();
            if (sceneName == "HomeMain" || sceneName == "LoginMain") {
                if (sceneName == "HomeMain") {
                    BattleNetHelper.reqRecordById(parseInt(this.huifangRoomId));
                    this.huifangRoomId = 0;
                    return true;
                };
            }else if (sceneName == "BattleMain") {
                this.huifangRoomId = 0;
            };
        };
        return false;
    },

    reqShareRoom: function(){
        if (this.shareRoomId > 0) {
            if (cc.director.getScene().getName() == "HomeMain") {
                var params = new Array();
                params.socketID = SocketID.GET_ROOM_BY_ID;
                params.roomId = parseInt(this.shareRoomId);
                EventEmitter.emit("WaitingDlgShowEvent",params);
                this.reqGetRoomById(parseInt(this.shareRoomId));
                this.shareRoomId = 0;
                return true;
            }else{
                if (cc.director.getScene().getName() == "BattleMain") {
                    ViewCommon.showAlertDlg("你已在房间中，退出该房间才能加入其它房间！");
                };
            };
        };
        return false;
    },

    onServerTime: function(data){
        this.serverTime = data.data;
        this.localTime = parseInt(Date.now()/1000);
        this.deltaTime = this.localTime - this.serverTime;
    },

    onServerMsg: function(data){
        this.isFree = data.free;
        this.gonggao = data.gonggao;
        this.leisure = data.leisure;
    },

    getDeltaTime: function(){
        return this.deltaTime;
    },

    getLocalTime: function(){
        return parseInt(Date.now()/1000);
    },

    getServerNowTime: function(){
        return this.getLocalTime() - this.getDeltaTime();
    },

    onCreateRoom: function(data){

    },

    onRoomLeave: function(data){
        console.log('onRoomLeave');
        this.myRoomInfo = null;
    },

    isHaveRoom: function(){
        return this.myRoomInfo;
    },

    onGetRoom: function(data){
        this.myRoomInfo = data.data;

        //在房间中

        // bug 这里无线循环了 哈哈哈
        if (cc.director.getScene().getName() == "BattleMain") {
            //调用刷新按钮的方法
            if (this.isHaveRoom()) {
                BattleNetHelper.reqRefreshRoom();
            }else{
                var arr = new Array();
                arr.errcode = 3;
                EventEmitter.emit(SocketID.ERROR_CODE,arr);
            };
        };
    },

    onGetRoomById: function(data){
    	var info = data.data;
    	if (info) {
    		ClientSocket.reconnect(info.server_ip,info.server_port);

    		ClientSocket.setRequestData({"socketID":SocketID.JOIN_ROOM,"room_id":info.room_id})
    	};
    },

    onJoinRoom: function(data){

    },

    reqGetRoomById: function(room_id){
    	ClientSocket.setRequestData({"socketID":SocketID.GET_ROOM_BY_ID,"room_id":room_id});
    },

    reqBackRoom: function(){
    	ClientSocket.reconnect(this.myRoomInfo.server_ip,this.myRoomInfo.server_port);

    	ClientSocket.setRequestData({"socketID":SocketID.BACK_ROOM,"room_id":this.myRoomInfo.room_id});
    },

    reqCreateRoom: function(paytype,model,xipai,times,zhuang){
    	ClientSocket.setRequestData({"socketID":SocketID.CREATE_ROOM,"model":model,"zhuang":zhuang,"xipai":xipai,"paytype":paytype,"times":times});
    },

    
    
};