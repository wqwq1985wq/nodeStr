var ACCOUNT_PRI_KEY = "^&*#$%()@";
var ROOM_PRI_KEY = "~!@#$(*&^%$&";

let accountClientPort = 9000
let accountIp = "127.0.0.1"

let hallIp = "127.0.0.1"
let hallAcountPort = 9001

//mysql配置
exports.mysql = function(){
	return {
		HOST:'127.0.0.1',
		USER:'root',
		PSWD:'123456',
		DB:'accountsql',
		PORT:3306,
	}
}

//账号服配置
exports.account_server = function(){
	return {
		accountClientPort:accountClientPort,
		hallIp:hallIp,
		hallAcountPort:hallAcountPort,
		ACCOUNT_PRI_KEY:ACCOUNT_PRI_KEY,
		
		VERSION:'20161227',
		APP_WEB:'http://fir.im/2f17',
	};
};
