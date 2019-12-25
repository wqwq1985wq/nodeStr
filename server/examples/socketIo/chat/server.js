let httpServer = require('http').Server();
let io = require('socket.io')(httpServer);
httpServer.listen(3000);
const gf = require("./tools/globalFuncs")

io.on('connection', function (socket) {
    console.log(socket.id, "connected")

    // socket.emit("myevent2")
    // socket.emit("myevent1")
    //本socket自身message事件消息
    socket.emit("message", socket.id)
    //全服广播，包括自己
    // io.emit("message",socket.id)
    //全服广播，除了自己
    socket.broadcast.emit("message", socket.id)
    // io.sockets.emit('message', 'everyone')
    // socket.on('message', function (data) {
    //     console.log("message",data)
    //   });
    socket.name = socket.id
    connectSuc.apply(socket)
    
})
//io方法
//房间内所有socket监测，每次有新的socket来临，会触发
io.clients((error, clients) => {
    if (error) throw error;
    console.log("clients:")
    console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
});
//socket方法
//todo：区分玩家在线离线
var connectSuc = function () {
    const getSocketsDataOfRooms = async function(rooms)
    {
        return new Promise(function (resolve, reject) {
            var allSockets = io.sockets.sockets
            let data = {}
            for (let roomName of rooms.values()) {
                let arr = new Array()
                io.in(roomName).clients((error, clients) => {
                    if (error) throw error;
                    clients.forEach(client => {
                    
                        let socket = allSockets[client]
                        // console.log("2222",socket.name,socket.id)
                        arr.push({name:socket.name,id:socket.id,room:roomName})
                    });
                    
                })
                data[roomName] = arr
            }
            resolve(data)
        });
    }
    
    //this == socket
    //离开
    this.on('disconnect', function (data) {
        console.log("disconnect", this.id)
    });
    //每个socket可以给一个默认房间，大厅
    this.join('room0', () => {
        let rooms = Object.keys(this.rooms);
        console.log(`房间列表:${rooms}`); //
        //全服广播
        // io.broadcast.emit("message",`${this.id} connected}`)
        //多个room广播
        // this.to('room1').to('room2').emit('hello');
        //单个room广播
        io.to('room0').emit("join room", { id: this.id, roomName: "room0" }); // broadcast to everyone in the room
        this.emit("initOver")
    });
    
    //设置名字,todo:名字绑定登陆信息,每次登陆socket id会变，名字/token作为唯一标识
    this.on('setName', function (name) {
        this.name = name
    });
    //获取总表：{roomName:[players]}
    this.on('getRoomTotalList', function (func) {
         getSocketsDataOfRooms(Object.keys(this.rooms)).then((roomData)=>{
            var jsonstr = gf.jsonStringfy(roomData)
            console.log(roomData)
            func(jsonstr)
        })
        
    });
    //获取房间列表
    this.on('getRoomList', function (func) {
        let rooms = Object.keys(this.rooms);
        // this.emit("getRoomList", rooms)
        func(rooms)
    });
    // //离开房间监听
    this.on('leave room', function (roomName, func) {
        //前端回调
        func(`leave room ${roomName}suc`)
        this.leave(roomName, () => {
            let rooms = Object.keys(this.rooms);
            //空间->发送给指定房间的所有socket
            //io.to   //error
            io.to(roomName).emit("message", 'a new user has leaved the ' + roomName); // broadcast to everyone in the room
        });
    });
    //加入房间监听
    this.on('join room', function (roomName,func) {
        this.join(roomName, () => {
            let rooms = Object.keys(this.rooms);
            console.log(`房间列表:${rooms}`); //
            //空间->发送给指定房间的所有socket
            //io.to   //error
            var id = this.id
            let name = this.name
            func()
            io.to(roomName).emit("join room", {id,roomName,name}); // broadcast to everyone in the room
        });
    });
    //房间聊天
    this.on('roomMsg', function (content,func) {
        var roomName = content.room
        var msg = content.msg
        var from = content.from
        func()
        io.to(roomName).emit("roomMsg", {roomName,from,msg}); // broadcast to everyone in the room
    });
}
