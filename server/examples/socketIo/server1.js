let httpServer = require('http').Server();
let io = require('socket.io')(httpServer);
httpServer.listen(3000);

// 服务端监听连接状态：io的connection事件表示客户端与服务端成功建立连接，它接收一个回调函数，回调函数会接收一个socket参数。
io.on('connection',  (socket)=>{
  console.log('client connect server, ok!');

  //全服广播，io实例下的所有socket
  // io.emit('server message', { for: 'everyone' });
  //表示向除了自己以外的客户端发送消息
  // socket.broadcast.emit('hi');

  // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
  socket.on('disconnect', ()=>{
    console.log('server connect disconnect');
  });
  
  // 与客户端对应的接收指定的消息
  socket.on('client message', (data)=>{
    console.log(data);// hi server
  });

  // socket.disconnect();
});