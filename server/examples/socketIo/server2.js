let httpServer = require('http').Server();
let io = require('socket.io')(httpServer);
httpServer.listen(3000);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});