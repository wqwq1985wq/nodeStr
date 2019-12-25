var io = require('socket.io-client')
// var chat = io.connect('http://localhost:3000/chat')
// let news = io.connect('http://localhost:3000/news');



let socket1 = io.connect('http://localhost:3000');
//连接成功事件,默认事件
socket1.on('connect', function () {
  // socket1.id,本次session唯一表示，连接和重连后会更新
  //this===socket2 true this相当于socket1对象
  console.log(socket1.connected, socket1.disconnected); // true
  //发送消息后，接受服务端回调函数。接受服务端消息确认机制
  // socket.emit('ferret', 'tobi', 'woot', function (data) { // args are sent in order to acknowledgement function
  //   console.log(data); // data will be 'tobi says woot'
  // });
  //msg rec,可以有多个参数，以及回调参数
  socket1.on('message', (data1, data2, func) => {
    console.log('socket1 rec a message:', data1);
  })
  socket1.on('myevent2', () => {
    console.log("myevent2", this.id)
  });
  socket1.emit("setName","wq1")
  //手动关闭连接
  // socket1.close()
  // socket1.disconnect()
  //重连事件
  socket1.on('disconnect', (reason) => {
    //断开后可以手动重连
    // socket.open();//连接,默认是connect后自动连接。
    if (reason === 'io server disconnect') {
      // 服务器主动断开，需要自己重新手动连接
      socket.connect();
    }
    //其他情况自动重连
  });
  socket1.on('reconnect', (attemptNumber) => {
    console.log("重连成功")
  });
  socket1.on('reconnect_attempt', (attemptNumber) => {
    console.log("前端发起重连")
  });
  socket1.on('reconnecting', (attemptNumber) => {
    console.log("前端正在重连")
  });
  socket1.on('reconnect_failed', () => {
    console.log("重连失败")
  });
  socket1.on('join room', ({ id, roomName }) => {
    console.log(`${id} join room ${roomName} suc`);
  })
 
  //获取房间里的人员
  socket1.emit('get sockets of room', "room0",( sockets,roomName ) => {
    console.log(`sockets List of ${roomName}`)
    console.log(sockets)
    sockets = new Map(sockets)
    for (let value of sockets.values()) {
        console.log(value);
      }
  })
  socket1.emit("getRoomList",(roomList)=>{
      
      roomList = roomList.filter(p=>{
          return p.indexOf("room")>=0
      })
    //   console.log(roomList)
  })

});

//放在connect外的事件，不会在每次connect成功后都去注册一次
//myevent2在里边注册，会在重连后重复注册，得到两次事件
// socket1.on('myevent1', () => {
//   console.log("myevent1",socket1.id)
// });
// let socket2  = io.connect('http://localhost:3000');
// socket2.on('connect', function () { 
//   socket2.on('message',  (data)=>{
//       console.log('socket2 rec a message:',data);
//     })
//   });
// let socketNews  = io.connect('http://localhost:3000/news');
// socketNews.on('connect', function () { 
//   socketNews.on('message',  (data)=>{
//       console.log('socketNews rec a message:',data);
//     })
//   });
//玩家1
// let socketChat1  = io.connect('http://localhost:3000/chat');
// socketChat1.on('connect', function () { 
//   socketChat1.on('message',  (data)=>{
//       console.log('socketChat1 rec a message:',data);
//     })
//   //加入房间
//   socketChat1.emit("join room","room1",(msg)=>console.log(msg))
//   socketChat1.emit("join room","room2",(msg)=>console.log(msg))
//  });

//  let socketChat2  = io.connect('http://localhost:3000/chat');
//   //玩家2
//   socketChat2.on('connect', function () { 
//     socketChat2.on('message',  (data)=>{
//       console.log('socketChat2 rec a message:',data);
//     })
//   //加入房间
//   socketChat2.emit("join room","room1",(msg)=>console.log(msg))
//   socketChat2.emit("join room","room2",(msg)=>console.log(msg))
//   socketChat2.emit("leave room","room1",(msg)=>console.log(msg))
//  });