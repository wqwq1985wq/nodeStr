let httpServer = require('http').Server();
let io = require('socket.io')(httpServer);
httpServer.listen(3000);
var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    //只有自己会受到
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    //chat组内所有人收到
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var news = io
  .of('/news')
  .on('connection', function (socket) {
    //自己收到
    socket.emit('a message', { news: 'item' });
    //news组内所有人收到
    news.emit('a message', {
        everyone: 'in'
      , '/news': 'will get'
    });
  });