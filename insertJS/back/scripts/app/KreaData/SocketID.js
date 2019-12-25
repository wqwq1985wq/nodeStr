
module.exports = {
	/*  心跳

	*/
	HEART_BEAT : "heart_beat",

	ACCOUNT_LOGIN : "account_login",

	USER_LOGIN : "user_login",

	/*  创建房间
		"model":2,"zhuang":2,"xipai":2,"paytype":2,"times":3
	*/
	CREATE_ROOM : "create_room",

	ERROR_CODE : "error_code", 

	/*  加入房间
		room_id:房间id
	*/
	JOIN_ROOM : "join_room",

	/*  回到房间
		room_id:房间id
		
	*/
	BACK_ROOM : "back_room",

	SEND_CARD : "send_card",

	GET_ROOM : "get_room",

	/*  根据房间id获取房间信息
	
	*/
	GET_ROOM_BY_ID : "get_room_by_id",

	SYNC_ROOMINFO : "sync_roominfo",

	//同步卡牌信息
	SYNC_CARDSINFO: "sync_cardsinfo",
	//同步玩家庄信息
	SYNC_PLAYER_ZHUANG: "sync_playerzhuang",
	//同步房间庄信息
	SYNC_ZHUANG: "sync_zhuang",

	ROUND_OVER: "round_over",

	SYNC_PLAYANIM: "sync_playanim",

	/*  房间准备
		ready: 0:取消准备 1：准备
		room_id:房间id,
	*/
	ROOM_READY : "room_ready",

	/*  离开房间
		room_id:房间id,
	*/
	ROOM_EXIT : "room_exit",

	/*  买庄
		state : true or false ,是否买庄,
		room_id: 房间id,
	*/
	BUY_ZHUANG : "buy_zhuang",

	/*  刷新房间信息
		room_id:房间id,
	*/
	ROOM_REFRESH : "room_refresh",

	/*  解散房间：
		room_id：房间id，

	*/
	ROOM_DESTROY : "room_destroy",

	/*  解散房间响应
		room_id：房间id，
		flag: 是否同意解散 true or false
	*/
	ROOM_DESTROY_ACK: "room_destroy_ack",

	/*
		操作牌
		room_id: 房间id,
		card: 卡牌cardtype,
		trigger_type: 1 叫牌 2撂龙 3杠 4碰 5胡,
	*/
	TRIGGER_CARD: "trigger_card",

	/*
		回放记录大信息
	*/
	CARD_RECORD: "card_record",

	/*
		获取回放记录
		record_id:回放记录
	*/
	CARD_RECORD_BY_ID: "card_record_by_id",

	/*
		发送聊天消息
		msg_type msg_idx
	*/
	SEND_MSG: "send_msg",

	/*
		发送互动表情
	*/
	SEND_INTERACTMSG: "send_interactmsg",

	/*
		服务器回的数据
	*/


	/*
		离开房间通知
	*/
	ROOM_LEAVE: "room_leave",

	/*
		同步服务器时间
	*/
	SERVER_TIME: "servertime",

	//服务器信息
	SERVER_MSG: "server_msg",

	//获取玩家数据 uid
	GET_PLAYER_BASICINFO: "get_playerbasicinfo",

	//查询玩家数据
	GET_SINGLE_PLAYERINFO: "get_singleplayerinfo",

	//替玩家充值
	CHARGE_FOR_PLAYER: "charge_forplayer",

	//查看充值记录
	CHARGE_RECORD: "charge_record",

	//同步玩家钻石等信息
	SYNC_PLAYERINFO: "sync_playerinfo",

	//获取玩家地理位置
	GET_POSITION: "get_position",

	//在线离线通知
	ONLINE_NOTICE: "online_notice",


	//发送语音聊天服务器存放文件地址
	SEND_VOICECHAT: "send_voicechat",


	//邮件相关信息
	GET_MAILINFO: "get_mailinfo",
	DEL_MAIL_SINGLE: "del_mail_single",
	READ_MAIL_SINGLE: "read_mail_single",

	//签到相关信息
	GET_SIGNINFO: "get_signinfo",
	GET_SIGNAWARD: "get_signaward",

	//每日分享相关
	GET_SHAREINFO: "get_shareinfo",
	GET_SHAREAWARD: "get_shareaward",

	//邀请信息相关
	GET_RELATIONINFO: "get_relationinfo",
	SET_RELATION: "set_relation",
	GET_RELATION_AWARD: "get_relationaward",

	CHG_PLAYERSTATE: "chg_playerstate",

	CHG_DAILI: "chg_daili",

	//踢人
	ROOM_KICK: "room_kick",
	//和牌
	ROOM_HE: "room_he",
    //和牌响应
	ROOM_HE_ACK: "room_he_ack",
};