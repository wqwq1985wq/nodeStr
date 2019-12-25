var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var ViewCommon = require('ViewCommon');
var ErrorData = require('ErrorData');
var BattleNetHelper = require('BattleNetHelper');

var RelationCfg = [
	{
		num:1,
		award: "1|2",
	},
	{
		num:3,
		award: "1|5",
	},
	{
		num:6,
		award: "1|9",
	},
	{
		num:10,
		award: "1|14",
	},
	{
		num:15,
		award: "1|20",
	},
];

var WriteRelationCfg = "1|5";

module.exports={
	RelationCfg: RelationCfg,
	WriteRelationCfg: WriteRelationCfg,

    registerMsg: function()
    {
    	this.init();

    	EventEmitter.on(SocketID.GET_RELATIONINFO,this.onGetRelationInfo,this);

    	EventEmitter.on(SocketID.SET_RELATION,this.onSetRelation,this);

        EventEmitter.on(SocketID.CHG_PLAYERSTATE,this.onChgPlayerState,this);

    	EventEmitter.on(SocketID.GET_RELATION_AWARD,this.onGetRelationAward,this);
    },

    init: function(){
        this.relationInfo = null;
    },

    onGetRelationAward: function(data){
    	if (data.reward && data.reward != "") {
    		ViewCommon.showAwardDlg(data.reward);

    		EventEmitter.emit("Client"+SocketID.GET_RELATION_AWARD,data);
    	};
    },

    onGetRelationInfo: function(data){
        this.relationInfo = data;
        
    	EventEmitter.emit("Client"+SocketID.GET_RELATIONINFO,data);
    },

    onSetRelation: function(data){
    	if (data.reward && data.reward != "") {
    		ViewCommon.showAwardDlg(data.reward);

    		EventEmitter.emit("Client"+SocketID.SET_RELATION);
    	};
    },

    onChgPlayerState: function(data){
        ViewCommon.showAlertDlg("添加成功！");
        EventEmitter.emit("Client"+SocketID.CHG_PLAYERSTATE);
    },

    reqGetRelationInfo: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.GET_RELATIONINFO});
    },

    reqSetRelation: function(relation_uid){
    	ClientSocket.setRequestData({"socketID":SocketID.SET_RELATION,"relation_uid":relation_uid});
    },

    reqGetRelationAward: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.GET_RELATION_AWARD});
    },

    reqChgPlayerState: function(pid){
        ClientSocket.setRequestData({"socketID":SocketID.CHG_PLAYERSTATE,'pid':pid});
    },
    
};