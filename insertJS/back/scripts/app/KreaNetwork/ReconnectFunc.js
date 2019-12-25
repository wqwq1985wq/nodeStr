var EventEmitter = require('EventEmitter');

module.exports = {
	init: function(){
		if (!this.bInit) {
			this.bInit = true;
			EventEmitter.on("SocketPushConnectSucc",this.onConnected,this);
		};
		this.retryCnt = 1;
	},

	excute: function(cnt){
		if (cnt) {
			this.retryCnt = cnt;
		}else{
			this.retryCnt = this.retryCnt + 1;
		};

		if (this.retryCnt > 3) {
			EventEmitter.emit("NetworkUIshowExceptionDlg");
		}else{
			EventEmitter.emit("ClientSocketReconnect");
		};
	},

	onConnected: function(){
		this.retryCnt = 1;
	},
};