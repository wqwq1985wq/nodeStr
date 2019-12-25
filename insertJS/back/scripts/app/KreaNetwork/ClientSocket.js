var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var NetworkUI = require('NetworkUI');
NetworkUI.registerMsg();
var EventEmitter = require('EventEmitter');
var ReconnectFunc = require('ReconnectFunc');
var NetData = require('NetData');

//1开发测试平台 2微信小游戏平台 3 h5平台
var GamePlatform = 1;

module.exports = {
	HeartBeatsTime:10000,
	GamePlatform: GamePlatform,

	registerMsg: function(){
		EventEmitter.on("ClientSocketReconnect",this.reconnect,this);

		EventEmitter.on("NetworkUIhideExceptionDlg",this.onHideExceptionDlg,this);

		ReconnectFunc.init();
	},

	doHeartBeat: function(){
		if (this.beatHeartSchedule != null) {
			clearInterval(this.beatHeartSchedule);
			this.beatHeartSchedule = null;
		};

		var self = this;
		this.beatHeartSchedule = setInterval(function(){
			self.setRequestData({"socketID":SocketID.HEART_BEAT})
		},this.HeartBeatsTime);
	},

	getNeedDelaySocketId: function(socketID){
		return socketID == SocketID.BACK_ROOM ||
			   socketID == SocketID.JOIN_ROOM ||
			   socketID == SocketID.ROOM_REFRESH ||
			   socketID == SocketID.CARD_RECORD_BY_ID ||
			   socketID == SocketID.GET_ROOM_BY_ID;
	},

	setRequestData: function(params){
		if (params.socketID == SocketID.HEART_BEAT) {
			this.socket.send(JSON.stringify(params));
			return;
		};

		if (this.socket == null || this.socket.readyState != WebSocket.OPEN) {
			if (this.delayData == null) {
				this.delayData = new Array();
			};
			if (!this.getNeedDelaySocketId(params.socketID)) {
				return;
			};
			var exist = false;
			for (var i = 0; i < this.delayData.length; i++) {
				if (this.delayData[i].socketID == params.socketID) {
					exist = true;
					break;
				};
			};
			if (!exist) {
				this.delayData.push(params);
			};
			return;
		};

		if (this.checkSendReq(params.socketID)) {
			return;
		};

		this.canSendReq = false;
		this.socketID = params.socketID;
		this.socket.send(JSON.stringify(params));

		// if (this.canSendReq) {
		// 	this.canSendReq = false;
		// 	this.socketID = params.socketID;
		// 	this.socket.send(JSON.stringify(params));
		// }else{
		// 	if (this.socketID == params.socketID &&
		// 		params.socketID != SocketID.GET_PLAYER_BASICINFO) {
		// 		return;
		// 	};
		// 	if (this.delayData == null) {
		// 		this.delayData = new Array();
		// 	};
		// 	this.delayData.push(params);
		// };
	},

	checkSendReq: function(socketID){
		if (this.socketID != socketID) {
			return false;
		};

		if (this.canSendReq) {
			return false;
		};

		return true;
	},

	wsSendBinaryOpen: function(strData){
		if (cc.director.getScene().getName() == "LoginMain") {
            NetworkUI.hideConnecting();
        };
		this.doHeartBeat();

		EventEmitter.emit("SocketPushConnectSucc");

		this.canSendReq = true;

		EventEmitter.emit("wsSendBinaryOpenEvent");

	},

	onHideExceptionDlg: function(){
		NetworkUI.hideConnecting();
	},

	sendDelayData: function(){
		if (this.delayData && this.delayData.length > 0) {
			this.setRequestData(this.delayData[0]);
			this.delayData.shift();
		};
	},

	wsSendBinaryMessage: function(paramTable){
		var data = JSON.parse(paramTable.data);

		if (this.socketID == data.socketID) {
			this.canSendReq = true;
			this.sendDelayData();
		};

		if (data.err_code && data.err_code > 0) {
			var arr = new Array();
			arr.errcode = data.err_code;
			EventEmitter.emit(SocketID.ERROR_CODE,arr);
			return;
		};

		EventEmitter.emit(data.socketID,data);
	},

	wsSendBinaryClose: function(strData){
		if (this.beatHeartSchedule != null) {
			clearInterval(this.beatHeartSchedule);
			this.beatHeartSchedule = null;
		};

		if (this.socket != null && this.socket.readyState == WebSocket.CLOSED) {
			ReconnectFunc.excute();
		};
	},

	wsSendBinaryError: function(strData){
		if (this.beatHeartSchedule != null) {
			clearInterval(this.beatHeartSchedule);
			this.beatHeartSchedule = null;
		};

		ReconnectFunc.excute();
	},

	init: function(ip,port){
		if (NetData.serverIp[ip] != null) {
			this.ip = NetData.serverIp[ip];
		}else{
			this.ip = "www.hlntcp.top"
		};

		if (port != null) {
			this.port = port;
		}else{
			this.port = "8283";
		};

		NetworkUI.showConnecting(this.createNodeCb.bind(this));
	},

	createNodeCb: function(){
		if (this.socket == null) {
			//if (this.GamePlatform == 2) {
				this.socket = new WebSocket("wss://"+this.ip+":"+this.port);
			//}else{
			//	var path = cc.url.raw("resources/chain.pem");
			//	if (cc.loader.md5Pipe) {
	        //        path = cc.loader.md5Pipe.transformURL(path);
	        //    };
			//	this.socket = new WebSocket("wss://"+this.ip+":"+this.port,null,path);
			//};
		};

		this.socket.onopen = this.wsSendBinaryOpen.bind(this);

		this.socket.onmessage = this.wsSendBinaryMessage.bind(this);

		this.socket.onerror = this.wsSendBinaryError.bind(this);
 
		this.socket.onclose = this.wsSendBinaryClose.bind(this);
	},

	reconnect: function(ip,port){
		if (this.socket != null) {
			this.socket.close();
			this.socket = null;
		};
		this.init(ip,port);
	},
};