var io = require('socket.io-client')
var chat = io.connect('http://localhost:3000/chat')
,news = io.connect('http://localhost:3000/news');

// var chat = io.connect('http://localhost/chat:3000')
// , news = io.connect('http://localhost/news:3000');

chat.on('connect', function () {
  chat.emit('hi!');
  chat.on('a message',  (data)=>{
    console.log('chat rec a message:',data);
  });
});

news.on('connect', function () {
  news.emit('woot');
  news.on('a message',  (data)=>{
    console.log('news rec a message:',data);
  });
});