const WebSocket = require('ws');
var io = require('socket.io-client')
class client {
    //函数参数解构赋值
    constructor({ name = "", roomName = "room0" } = {}) {
        this.name = name
        this.socket = io.connect('http://localhost:3000')
        this.socket.on('connect', function () {
            // this==this.socket
            console.log("connect success");
        });
        //设置前端名字
        this.setClientName(name)
        //获得房间列表
        this.getRoomList()

        //消息监听
        this.socket.on('message', this.onmessageRec)
        this.socket.on('chatMsg', () => {
            // this==socketIo
        })
        this.socket.on('reconnecting', () => {
            console.log("前端正在重连")
        });
        this.socket.on('reconnect_attempt', () => {
            console.log("前端发起重连")
        });
        this.socket.on('reconnect', () => {
            console.log("重连成功")
        });
        this.socket.on('reconnect', (reason) => {

            //断开后可以手动重连
            // socket.open();//连接,默认是connect后自动连接。
            if (reason === 'io server disconnect') {
                // 服务器主动断开，需要自己重新手动连接
                this.socket.connect()
            }
        });
        //加入房间广播
        this.socket.on('join room', ({ id, roomName }) => {
            console.log(`${id} join room ${roomName} suc`);
        })
    }
    //获取总表：{roomName:[players]}
    getRoomTotalList() {
        this.socket.emit('getRoomTotalList', (roomList) => {

            roomList = JSON.parse(roomList)
            console.log("getRoomTotalList suc", roomList)
        })
    }
    //获取房间列表
    getRoomList() {
        this.socket.emit('getRoomList', (roomList = []) => {
            roomList = roomList.filter(p => {
                return p.indexOf("room") >= 0
            })
            console.log("getroomlist suc", roomList)
        })
    }
    //获取房间里的人员
    getSocketsOfRoom(roomName) {
        this.socket.emit('get sockets of room', roomName, ({ sockets, roomName }) => {
            console.log(`sockets List of ${roomName}}`)
        })
    }
    //设置名字
    setClientName(name) {
        this.socket.emit("setName",name)
    }
    //连接成功
    onEventWebSocketOpen() {
        console.log("client connect success")
    }
    //消息监听处理函数
    onmessageRec(data) {
        console.log('client rec a message:', data);
    }
    //加入房间
    addToRoom(roomName) {
        this.socket.emit("join room", roomName, (msg) => console.log(msg))
    }
    //离开房间
    leaveRoom(roomName) {
        this.socket.emit("leave room", roomName, (msg) => console.log(msg))
    }
    //发消息
    sendMsg(msgId, content) {
        this.socket.emit(msgId, content, (msg) => {
            //消息回复
            console.log(msg)
        })
    }
}
module.exports = client