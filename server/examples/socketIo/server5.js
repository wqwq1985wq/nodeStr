let httpServer = require('http').Server();
let io = require('socket.io')(httpServer);
httpServer.listen(3000);

io.on('connection', function (socket) {
  socket.on('ferret', function (name, word, fn) {
    fn(name + ' says ' + word);
  });
});