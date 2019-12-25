var PlayerData = require('PlayerData');
var SocketID = require('SocketID');
var EventEmitter = require('EventEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        txtId: cc.Label,
        txtRound: cc.Label,
        txtTime: cc.Label,
        txtName1: cc.Label,
        txtName2: cc.Label,
        txtName3: cc.Label,
        txtScore1: cc.Label,
        txtScore2: cc.Label,
        txtScore3: cc.Label,
    },

    onLoad: function(){
     	this.registerMsg();

    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.GET_PLAYER_BASICINFO,this.onGetPlayerBasicInfo,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.GET_PLAYER_BASICINFO,this.onGetPlayerBasicInfo,this);
    },

    onGetPlayerBasicInfo: function(data){
        // 名字啊（ID：999999）
        if (data.length != 3) {
            return;
        };
        this.data['names'] = data;
        if (this.data['player1'] == data[0].id &&
            this.data['player2'] == data[1].id &&
            this.data['player3'] == data[2].id) {
            for (var i = 0; i < data.length; i++) {
                this['txtName'+(i+1)].string = data[i].name+"（ID："+data[i].id+"）";
            };
        };
        
    },

    onSubItemCallback: function(){
        this.func(this.data)
    },

    setCallback: function(func){
        this.func = func;
    },

    updateUI: function(data,idx){
        this.data = data;
        this.idx = idx;
        
        var roomInfo = JSON.parse(data['room_info']);
        var roomBaseInfo = roomInfo['roomBaseInfo'];
        this.txtId.string = "房间ID:"+roomBaseInfo.room_id;
        this.txtRound.string = "局数:"+roomBaseInfo.times;

        this.txtTime.string = data['create_time'];

        var scoreInfo = JSON.parse(data['score_info']);
        var roomScore = scoreInfo['room_score'];
        for (var i = 0; i < roomScore.length; i++) {
            this['txtScore'+(i+1)].string = roomScore[i];
        };

        var roomPlayerInfo = roomInfo['roomPlayerInfo'];
        for (var i = 0; i < roomPlayerInfo.length; i++) {
            var pinfo = roomPlayerInfo[i];
            this['txtName'+pinfo.pos].string = pinfo.pdata.name+"（ID："+pinfo.pdata.id+"）";
        };

        // var pids = new Array();
        // pids.push(data['player1']);
        // pids.push(data['player2']);
        // pids.push(data['player3']);
        // PlayerData.reqGetPlayerBasicInfo(pids);
    },

    start:function() {

    },

});