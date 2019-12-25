var EventEmitter = require('EventEmitter');
var ExceptionDlg = require('ExceptionDlg');
var ConnectingNode = require('ConnectingNode');

module.exports = {

	connectingNode: null,
	exceptionDlg: null,

	registerMsg: function(){
		EventEmitter.on("NetworkUIshowExceptionDlg",this.showExceptionDlg,this);

		EventEmitter.on("NetworkUIhideExceptionDlg",this.hideException,this);
	},
	
	showExceptionDlg: function(){
		this.hideConnecting();
		var self = this;
		if (this.exceptionDlg == null) {
			cc.loader.loadRes("newImg/prefab/ExceptionDlg", function (err, prefab) {
	            if (err) {
	                console.log(err);
	                return;
	            }
	            self.exceptionDlg = cc.instantiate(prefab);
	            self.exceptionDlg.position = cc.v2(cc.winSize.width/2,cc.winSize.height/2);
	            cc.director.getScene().addChild(self.exceptionDlg);
	            self.exceptionDlg.getComponent(ExceptionDlg).setCallback(function(){
	            	self.hideException();
	            });
	        });
		};
		
	},

	hideException: function(){
		if (this.exceptionDlg != null) {
			this.exceptionDlg.destroy();
			this.exceptionDlg = null;
		};
	},

	showConnecting: function(func){
		var self = this;
		if (this.connectingNode == null) {
			cc.loader.loadRes("newImg/prefab/ConnectingNode", function (err, prefab) {
	            if (err) {
	                console.log(err);
	                return;
	            }
	            self.connectingNode = cc.instantiate(prefab);
	            self.connectingNode.position = cc.v2(cc.winSize.width/2,cc.winSize.height/2);
	            cc.director.getScene().addChild(self.connectingNode);

	            func();
	            // this.connectingNode = node.getComponent("ConnectingNode");
	        });
		}else{
			func();
		};
	},

	hideConnecting: function(){
		if (this.connectingNode != null) {
			this.connectingNode.destroy();
			this.connectingNode = null;
		};
	},
};