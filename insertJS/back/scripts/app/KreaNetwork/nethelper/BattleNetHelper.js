var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var BattleData = require('BattleData');
var PlayerData = require('PlayerData');

module.exports = {

	//请求数据
    reqRoomReady: function(){
    	var pInfo = BattleData.getRoomInfoByPid(PlayerData.getPlayerId());
    	if (pInfo == null) {
            var arr = new Array();
            arr.errcode = 3;
            EventEmitter.emit(SocketID.ERROR_CODE,arr);
    		return;
    	};
    	var ready = pInfo.state;
    	if (ready == 0) {
    		ready = 1;
    	}else if(ready == 1){
    		ready = 0;
    	};
        ClientSocket.setRequestData({"socketID":SocketID.ROOM_READY,"room_id":BattleData.getRoomId(),"ready":ready});
    },

    //请求刷新数据
    reqRefreshRoom: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.ROOM_REFRESH,"room_id":BattleData.getRoomId()});
    },

    //请求刷新数据
    reqRefreshRoom2: function(){
        ClientSocket.reconnect();

        ClientSocket.setRequestData({"socketID":SocketID.ROOM_REFRESH,"room_id":BattleData.getRoomId()});
    },

    //请求买庄
    reqBuyZhuang: function(flag){
        console.log(BattleData.getRoomId());
    	ClientSocket.setRequestData({"socketID":SocketID.BUY_ZHUANG,"room_id":BattleData.getRoomId(),"state":flag});
    },

    //请求离开房间
    reqExitRoom: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.ROOM_EXIT,"room_id":BattleData.getRoomId()});
    },

    //请求解散房间
    reqDestroyRoom: function(){
    	ClientSocket.setRequestData({"socketID":SocketID.ROOM_DESTROY,"room_id":BattleData.getRoomId()});
    },

    //响应解散房间
    reqDestroyRoomAck: function(flag){
    	ClientSocket.setRequestData({"socketID":SocketID.ROOM_DESTROY_ACK,"room_id":BattleData.getRoomId(),"flag":flag});
    },

    //请求操作(叫龙、撂龙、胡、碰、杠、过)
    reqTrigger: function(card,triggerType){
        ClientSocket.setRequestData({"socketID":SocketID.TRIGGER_CARD,"room_id":BattleData.getRoomId(),"card_type":card,"trigger_type":triggerType});
    },

    //出牌
    reqSendCard: function(card){
        ClientSocket.setRequestData({"socketID":SocketID.SEND_CARD,"room_id":BattleData.getRoomId(),"card":card});
    },

    //获取回放大的信息
    reqRecord: function(){
        ClientSocket.setRequestData({"socketID":SocketID.CARD_RECORD});
    },

    //根据record记录拉取小局信息
    reqRecordById: function(record_id){
        EventEmitter.emit("WaitingDlgShowEvent");
        ClientSocket.setRequestData({"socketID":SocketID.CARD_RECORD_BY_ID,"record_id":record_id});
    },

    reqShareRecordById: function(record_id){
        ClientSocket.setRequestData({"socketID":SocketID.CARD_RECORD_BY_ID,"record_id":record_id});
    },

    //请求发送消息
    reqSendMsg: function(msg_type,msg_idx){
        ClientSocket.setRequestData({"socketID":SocketID.SEND_MSG,"room_id":BattleData.getRoomId(),"msg_type":msg_type,"msg_idx":msg_idx});
    },

    //请求发送互动表情
    reqSendInteractMsg: function(to_pos,msg_idx){
        ClientSocket.setRequestData({"socketID":SocketID.SEND_INTERACTMSG,"room_id":BattleData.getRoomId(),"to_pos":to_pos,"msg_idx":msg_idx});
    },

    //请求位置信息
    reqGetLocation: function(lat,lng){
        ClientSocket.setRequestData({"socketID":SocketID.GET_POSITION,"room_id":BattleData.getRoomId(),"lat":lat,"lng":lng});
    },

    //语音聊天相关
    reqSendVoiceChat: function(path){
        ClientSocket.setRequestData({"socketID":SocketID.SEND_VOICECHAT,"room_id":BattleData.getRoomId(),"path":path});
    },

    //踢人
    reqRoomKick: function(uid){
        ClientSocket.setRequestData({"socketID":SocketID.ROOM_KICK,"room_id":BattleData.getRoomId(),"uid":uid});
    },

    //和牌
    reqRoomHe: function(){
        ClientSocket.setRequestData({"socketID":SocketID.ROOM_HE,"room_id":BattleData.getRoomId()});
    },
    //和牌响应
    reqRoomHeAck: function(flag){
        ClientSocket.setRequestData({"socketID":SocketID.ROOM_HE_ACK,"room_id":BattleData.getRoomId(),"flag":flag});
    },

};