let httpServer = require('http').Server();
let io = require('socket.io')(httpServer);
httpServer.listen(3000);
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

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
    connectSuc.apply(socket)
})
//io方法
//房间内所有socket监测，每次有新的socket来临，会触发
io.clients((error, clients) => {
    if (error) throw error;
    console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
});
//socket方法
var connectSuc = function () {
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
        // chat.broadcast.emit("message",`${this.id} connected}`)
        //多个room广播
        // this.to('room1').to('room2').emit('hello');
        //单个room广播
        io.to('room0').emit("join room", { id: this.id, roomName: "room0" }); // broadcast to everyone in the room
        
    });
    //获取房间里的玩家
    this.on('get sockets of room', function (roomName,func) {
        // console.log(roomName,func)
        var ss = objToStrMap(io.in(roomName).sockets)
        console.log(`get sockets of room  ${roomName}`)
        const sockets = new Map(
            [...ss].map(([k, v]) => [k, v.name])
              );
        console.log(sockets)
        // func({sockets,roomName})
    });
    //设置名字,todo:名字绑定登陆信息,每次登陆socket id会变，名字/token作为唯一标识
    this.on('setName', function (name) {
        this.name = name
    });
    //获取房间列表
    this.on('getRoomList', function (func) {
        let rooms = Object.keys(this.rooms);
        console.log(`房间列表:${rooms}`); //
        // this.emit("getRoomList", rooms)
        func(rooms)
    });
    // //离开房间监听
    this.on('leave room', function (roomName, func) {
        //前端回调
        func(`leave room ${roomName}suc`)
        this.leave(roomName, () => {
            let rooms = Object.keys(this.rooms);
            console.log(`房间列表:${rooms}`); //
            //空间->发送给指定房间的所有socket
            //io.to   //error
            io.to(roomName).emit("message", 'a new user has leaved the ' + roomName); // broadcast to everyone in the room
        });
    });
    //加入房间监听
    this.on('join room', function (roomName, func) {
        func(`join room ${roomName}suc`)
        this.join(roomName, () => {
            let rooms = Object.keys(this.rooms);
            console.log(`房间列表:${rooms}`); //
            //空间->发送给指定房间的所有socket
            //io.to   //error
            chat.to(roomName).emit("message", 'a player \'sroom changed to ' + roomName); // broadcast to everyone in the room
        });
    });
}


// var roomList = []
//   if()
// //////////////////////房间
//房间内所有socket监测，每次有新的socket来临，会触发
// io.of('/chat').clients((error, clients) => {
//   if (error) throw error;
//   console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
// });
// cvXaJzxlC2f9uD1WAAAA connected
// /chat#cvXaJzxlC2f9uD1WAAAA of chatroom connected
//房间的id实际上是/chat空间名+#+socketId
// const chat = io.of('/chat');
// chat.on('connection', function (socket) {
//   console.log(socket.id,"of chatroom connected")
//   //整个房间广播，包括自己，同io.emit
//   // chat.emit("message",socket.id)
//   chat.broadcast.emit("message",`${socket.id} connected}`)
//   //前端可能收不到的信息，不会重新发送
//   chat.volatile.emit("message",`${socket.id} connected}`)
//   // setInterval(() => {
//   //   // socket.broadcast.to('chat').emit('message', "chat room data");
//   //   io.sockets.in('chat').emit('message', "chat room data");
//   // }, 1000);
//   //每个socket可以给一个默认房间
//   socket.join('room0', () => {
//     let rooms = Object.keys(socket.rooms);
//     console.log(`房间列表:${rooms}`); //
//     //全服广播
//     // chat.broadcast.emit("message",`${socket.id} connected}`)
//     //多个room广播
//     // socket.to('room1').to('room2').emit('hello');
//     //单个room广播
//     chat.to('room0').emit('a new user has joined the room0'); // broadcast to everyone in the room
//   });
//   //加入房间监听
//   socket.on('join room', function (roomName,func) {
//     func(`join room ${roomName}suc`)
//     socket.join(roomName, () => {
//       let rooms = Object.keys(socket.rooms);
//       console.log(`房间列表:${rooms}`); //
//       //空间->发送给指定房间的所有socket
//       //io.to   //error

//       chat.to(roomName).emit("message",'a player \'sroom changed to '+roomName); // broadcast to everyone in the room
//     });
//   });
//   //离开房间监听
//   socket.on('leave room', function (roomName,func) {
//     //前端回调
//     func(`leave room ${roomName}suc`)
//     socket.leave(roomName, () => {
//       let rooms = Object.keys(socket.rooms);
//       console.log(`房间列表:${rooms}`); //
//       //空间->发送给指定房间的所有socket
//       //io.to   //error
//       chat.to(roomName).emit("message",'a new user has leaved the '+roomName); // broadcast to everyone in the room
//     });
//   });

// })
// const news = io.of('/news');
// news.on('connection', function (socket) {
//   console.log(socket.id,"of newsRoom connected")
//   news.emit("message",socket.id)
//   // chat.to('news').emit('message', "news room data");
// })