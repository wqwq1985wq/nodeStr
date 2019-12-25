var socket = require('socket.io-client')('http://localhost:3000');
socket.emit('client message',"1234")

// socket.on()用于接收服务端发来的消息
socket.on('connect',  ()=>{
    console.log('client connect server');
  });
  socket.on('disconnect', ()=>{
    console.log('client disconnect');
  });
  socket.on('server message',  (data)=>{
    console.log('server message:',data);
  });

