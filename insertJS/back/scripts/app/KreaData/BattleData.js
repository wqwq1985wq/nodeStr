var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var ViewCommon = require('ViewCommon');
var ErrorData = require('ErrorData');
var PlayerData = require('PlayerData');
var LoginData = require('LoginData');
var Util = require('Util');

module.exports={
    registerMsg: function()
    {   
        this.init();

        EventEmitter.on("BattleDataInit",this.init,this);

    	EventEmitter.on(SocketID.SYNC_ROOMINFO,this.onSyncRoomInfo,this);

        EventEmitter.on(SocketID.ROOM_READY,this.onRoomReady,this);

        EventEmitter.on(SocketID.ROOM_LEAVE,this.onRoomLeave,this);

        EventEmitter.on(SocketID.ROOM_REFRESH,this.onRoomRefresh,this);

        EventEmitter.on(SocketID.CARD_RECORD,this.onCardRecord,this);

        EventEmitter.on(SocketID.GET_POSITION,this.onGetPosition,this);

        EventEmitter.on(SocketID.ONLINE_NOTICE,this.onlineNotice,this);

        EventEmitter.on(SocketID.SEND_VOICECHAT,this.onSendVoiceChat,this);

        EventEmitter.on(SocketID.ROOM_KICK,this.onRoomKick,this);
    },

    init: function(){
        this.roomInfo = null;

        this.roomBaseInfo = null;

        this.roomPlayerInfo = null;

        this.myPlayerInfo = null;
    },

    setRoomPlayerDetailInfo: function(data){
        this.roomPlayerDetailInfo.push(data);
    },

    getRoomPlayerDetailInfoByPos: function(pos){
        for (var i = 0; i < this.roomPlayerDetailInfo.length; i++) {
            if (this.roomPlayerDetailInfo[i].pos == pos) {
                return this.roomPlayerDetailInfo[i];
            };
        };
        return null;
    },

    getPosGender: function(pos){
        var pInfo = this.getRoomPlayerInfoByPos(pos);
        return pInfo.pdata.gender;
    },

    getRoomInfo: function(){
    	return this.roomInfo;
    },

    getRoomBaseInfo: function(){
        return this.roomBaseInfo;
    },

    getRoomPlayerInfo: function(){
        return this.roomPlayerInfo;
    },

    getRoomId: function(){
        return this.roomBaseInfo.room_id;
    },

    isCardRecord: function(){
        return this.isRecord;
    },

    onlineNotice: function(data){
        for (var i = 0; i < this.roomInfo.roomPlayerInfo.length; i++) {
            var info = this.roomInfo.roomPlayerInfo[i];
            if (info.uid == data['player_id']) {
                this.roomInfo.roomPlayerInfo[i].online_state = data['online_state'];
                break;
            };
        };
        EventEmitter.emit("Client"+SocketID.SYNC_ROOMINFO);
    },

    onSendVoiceChat: function(data){
        EventEmitter.emit("Client"+SocketID.SEND_VOICECHAT,data);
    },

    onGetPosition: function(data){
        if (data['status'] == 0) {
            var addr = data['address'];
            var lat = data['lat'];
            var lng = data['lng'];
            var pos = data['pos'];
            for (var i = 0; i < this.roomInfo.roomPlayerInfo.length; i++) {
                var info = this.roomInfo.roomPlayerInfo[i];
                if (info.pos == pos) {
                    this.roomInfo.roomPlayerInfo[i].address = addr;
                    this.roomInfo.roomPlayerInfo[i].lat = lat;
                    this.roomInfo.roomPlayerInfo[i].lng = lng;
                    break;
                };
            };
        };
        EventEmitter.emit("Client"+SocketID.SYNC_ROOMINFO);
    },

    onCardRecord: function(data){
        this.isRecord = true;

        this.recordRoomInfos = data.records;

        EventEmitter.emit("Client"+SocketID.CARD_RECORD,this.recordRoomInfos)
    },

    setRecordIdx: function(idx){
        this.recordIdx = idx;
    },

    enterRecordRoom: function(data,isShare){
        this.init();

        this.isRecord = true;

        this.roomInfo = JSON.parse(data['records']['room_info']);

        this.roomBaseInfo = this.roomInfo.roomBaseInfo;

        var recordId = data['records']['record_id'];
        var curTimes = recordId % 10;
        this.roomBaseInfo.cur_times = curTimes;

        this.roomPlayerInfo = this.roomInfo.roomPlayerInfo;

        this.roomPlayerInfo.sort(function(a,b){
            return a.pos - b.pos;
        });

        if (cc.director.getScene().getName() == "HomeMain" && !isShare) {
            this.roomPlayerDetailInfo = new Array();
            
            cc.director.loadScene("BattleMain");
        };

        this.updateMyPlayerInfo();

        if (!isShare) {
            EventEmitter.emit("Client"+SocketID.SYNC_ROOMINFO);
        };
    },

    getRoomPlayerInfoByPos: function(pos){
        for (var i = 0; i < this.roomPlayerInfo.length; i++) {
            if (this.roomPlayerInfo[i].pos == pos) {
                return this.roomPlayerInfo[i];
            };
        };
    },

    onSyncRoomInfo: function(data){
        var prePlayerInfo = null;
        if (this.roomPlayerInfo != null) {
            prePlayerInfo = this.roomPlayerInfo;
        };
        var preRoomInfo = null;
        if (this.roomBaseInfo != null) {
            preRoomInfo = this.roomBaseInfo;
        };

        this.init();

        this.isRecord = false;

    	this.roomInfo = data.room_info;

        this.roomBaseInfo = this.roomInfo.roomBaseInfo;

        this.roomPlayerInfo = this.roomInfo.roomPlayerInfo;

        this.roomPlayerInfo.sort(function(a,b){
            return a.pos - b.pos;
        });

        this.updateMyPlayerInfo();

        if (prePlayerInfo != null) {
            var enterArr = new Array();
            for (var i = 0; i < prePlayerInfo.length; i++) {
                var info = prePlayerInfo[i];
                if (info.pos_state == 0 && this.roomPlayerInfo[i].pos_state == 1) {
                    enterArr.push(info.pos);
                };
            };

            if (enterArr.length > 0) {
                EventEmitter.emit("PlayerEnterEvent",enterArr);
            };
        };

        if (preRoomInfo != null) {
            if (preRoomInfo.room_state != 2 && this.roomBaseInfo.room_state == 2) {
                Util.playAudio("resources/newImg/audio/effect/game_start3.mp3");

                EventEmitter.emit("BattleBeginEvent");
            };
        };

    	if (cc.director.getScene().getName() == "HomeMain") {
            this.roomPlayerDetailInfo = new Array();

    		// cc.director.loadScene("BattleMain");
            cc.director.preloadScene("BattleMain",function(){
                cc.director.loadScene("BattleMain");
            }.bind(this));
    	};
    	EventEmitter.emit("Client"+SocketID.SYNC_ROOMINFO);
    },

    getMyPlayerInfo: function(){
        return this.myPlayerInfo;
    },

    updateMyPlayerInfo: function(){
        // if (this.isRecord) {
        //     this.myPlayerInfo = this.roomPlayerInfo[0];
        //     return;
        // };
        for (var i = 0; i < this.roomPlayerInfo.length; i++) {
            var info = this.roomPlayerInfo[i];
            if (info.uid == PlayerData.getPlayerId()) {
                this.myPlayerInfo = info;
                if (!this.isRecord) {
                    EventEmitter.emit("BattleMyPlayerInfo",info);
                };
                break;
            };
        };

        if (this.myPlayerInfo == null) {
            this.myPlayerInfo = this.roomPlayerInfo[0];
        };
    },

    isRoomLeader: function(){
        if (this.roomBaseInfo && this.roomBaseInfo.room_leader == PlayerData.getPlayerId()) {
            return true;
        };
        return false;
    },

    getRoomInfoByPid: function(pid){
        for (var i = 0; i < this.roomPlayerInfo.length; i++) {
            if (pid == this.roomPlayerInfo[i].uid) {
                return this.roomPlayerInfo[i];
            };
        };
        return null;
    },

    //房间准备
    onRoomReady: function(data){

    },

    onRoomRefresh: function(){
        EventEmitter.emit("Client"+SocketID.ROOM_REFRESH);
    },
    
    //离开房间通知
    onRoomLeave: function(data){
        EventEmitter.emit("Client"+SocketID.ROOM_LEAVE);

    },

    onRoomKick: function(data){
        if (data.flag) {
            cc.director.loadScene("HomeMain");
            ViewCommon.showAlertDlg("您已被踢出房间！");
        };
    },

    getRad: function(d){
        return d*Math.PI/180.0;
    },

    getFlatternDistance: function(lat1,lng1,lat2,lng2){
        var f = this.getRad((lat1 + lat2)/2);
        var g = this.getRad((lat1 - lat2)/2);
        var l = this.getRad((lng1 - lng2)/2);

        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);

        var s,c,w,r,d,h1,h2;
        var a = 6378137.0;
        var fl = 1/298.257;        

        sg = sg*sg;
        sl = sl*sl;
        sf = sf*sf;        

        s = sg*(1-sl) + (1-sf)*sl;
        c = (1-sg)*(1-sl) + sf*sl;        

        w = Math.atan(Math.sqrt(s/c));
        r = Math.sqrt(s*c)/w;
        d = 2*w*a;
        h1 = (3*r -1)/2/c;
        h2 = (3*r +1)/2/s;
        return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
    },
};