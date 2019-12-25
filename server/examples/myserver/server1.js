const WebSocket = require('ws');
const gf = require("./tools/globalFuncs")
var RoomManager = require("./room/RoomManager")
var playerManager = require("./roles/PlayerManager")
var Player = require("./roles/Player")
const WebSocketServer = WebSocket.Server;
const url = require('url');
var wsMap = new Map()//连接
//web相关处理
let app = require("./app")

//public methods
function getChatMsg(cmd,ret=0, player={}, data="") {
    messageIndex ++;
    switch(cmd)
    {
        // case "broad join":
            // return JSON.stringify({
            //     id: messageIndex,
            //     cmd: cmd,
            //     player: player.name,
            //     room: player.room.roomIndex,
            //     data: data
            // });
        case "chatBroad":
            return JSON.stringify({
                id: messageIndex,
                cmd: cmd,
                ret: ret,
                player: player.name,
                data: data
            });
            
        case "roomBroad":
        case "commonBroad":
        case "personChat":
            return JSON.stringify({
                cmd: cmd,
                data: data
            });
            
        case "login":
            return JSON.stringify({
                cmd: cmd,
                ret: ret,
                player: player.name,
                data: data
            });
        default:
            return JSON.stringify({
                id: messageIndex,
                cmd: cmd,
                ret: ret,
                player: player.name,
                data: data
            });
    }
    
}
var getMsgFromClient = function(msg)
{
    console.log(`[SERVER] Received: ${msg}`);
    ws.send(`What's your name?`, (err) => {
        if (err) {
            console.log(`[SERVER] error: ${err}`);
        }
    });
}
//房间名合法
var isRoomLegal = function()
{

}
///////////////wss methods
//wss表示webSocketServer对象
//wss可以包含若干个ws连接，一个ws表示一个用户连接
function createWebSocketServer(onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        port: 3000
    });
    //wss.clients 遍历所有的ws
    
    //全服广播
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    //房间隔离-----------
    //房间广播
    wss.broadcastRoom = function broadcastRoom(roomIndex,data) {
        if(!roomIndex || roomIndex <=0) return;
        
        wss.clients.forEach(function each(client) {
            console.log(client.player.roomIndex,roomIndex)
            if(client.player && client.player.roomIndex == roomIndex)
            {
                client.send(data);
            }
        });
    };
    //todo:玩家对玩家对话
    wss.sendToPlayer = function sendToPlayer(name,data) {
        if(!name ) return;
        wss.clients.forEach(function each(client) {
            if(client.player && client.player.name == name)
            {
                client.send(data);
            }
        });
    };
    //todo:小群广播
    onConnection = onConnection || function () {
        console.log('[WebSocket] connected.');
    };
    onMessage = onMessage || function (msg) {
        console.log('[WebSocket] message received: ' + msg);
    };
    onClose = onClose || function (code, message) {
        console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
    onError = onError || function (err) {
        console.log('[WebSocket] error: ' + err);
    };
    //每次connection 产生一个ws
    //todo:处理重复登录踢下线
    //todo:把消息处理独立出去
    //todo:用户信息查询独立出去
    wss.on('connection', function (ws,req) {
        ws.upgradeReq = req
        let location = url.parse(ws.upgradeReq.url, true);
        var name = location.query.name
        if(!name)
        {
            name = "guest"+gf.getClientTime()
        }
        console.log('[WebSocketServer] connection: ' + name);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        if (location.pathname !== '/ws/chat') {
            // close ws:
            ws.close(4000, 'Invalid URL');
        }
        var roomIndex = location.query.roomIndex || 0
        var room = RoomManager.getOneRoom(roomIndex)
        let player = playerManager.getOnePlayer(name)
        
        RoomManager.addPlayerToRoom(player,room)
        RoomManager.toString()
        //每个ws有指向wss的指针
        ws.player = player;
        ws.wss = wss;
        
        onConnection.apply(ws);
    });
    console.log('WebSocketServer was attached.');
    return wss;
}
//属于每个ws的实例方法
var messageIndex = 0;


function onEventTCPSocketRead(cmd,data) {
    console.log("handle cmd ",cmd,data)
    switch(cmd){
        case "login":
            resLogin.call(this,cmd,data)
            break;
        case "commonBroad":
            resCommonBroad.call(this,cmd,data)
            break;
        case "roomBroad":
            resRoomBroad.call(this,cmd,data)
            break;
        case "personChat":
            resPersonChat.call(this,cmd,data)
            break;
        default:
            console.log("no access handler")
    }
}
//登录成功
function resLogin(cmd,data) {
    let msg1 = getChatMsg("login",0,data.name,"token")
    //通知本人，登录成功
    this.send(msg1);
     //广播给所有人知道，有人加入了某个房间
    let msgBroad = getChatMsg("commonBroad",0,null,`玩家${data.name}上线`)
    this.wss.broadcast(msgBroad);
}
//普通广播
function resCommonBroad(cmd,data) {
     //广播给所有人知道，有人加入了某个房间
    let msgBroad = getChatMsg("commonBroad",0,null,data)
    this.wss.broadcast(msgBroad);
}
//房间广播
function resRoomBroad(cmd,data) {
    //本房间广播，房间聊天
   let msgBroad = getChatMsg("roomBroad",0,null,data)
   console.log("房间广播",this.player.roomIndex,msgBroad)
   this.wss.broadcastRoom(this.player.roomIndex, msgBroad);
}
//玩家私聊
function resPersonChat(cmd,data) {
    let target = data.name
    var dataSend = {from:this.player.name,to:target}
   let msg = getChatMsg("personChat",0,null,dataSend)
   console.log(`玩家私聊,${this.player.name} to ${target},${msg}`)
   this.wss.sendToPlayer(target, msg);
}


//todo,记录是否已经登录成功
function onConnect() {
    this.isconnected = true;
}

function onMessage(message) {
    console.log("server rec:",message);
    let json = JSON.parse(message)
    if(json && json.cmd)
    {
        onEventTCPSocketRead.call(this,json.cmd,json.data)
    }
    
}

function onClose() {
    let player = this.player;
    let msg = getChatMsg('left', player, `${player.name} is left.`);
    this.wss.broadcast(msg);
    RoomManager.leaveRoom(player)
}
var globalWss = createWebSocketServer( onConnect, onMessage, onClose);
console.log('ws server started at port 3000...');

