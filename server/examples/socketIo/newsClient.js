var io = require('socket.io-client')
let news = io.connect('http://localhost:3000/news');

news.on('connect', function () {
  news.emit('woot');
  news.on('a message',  (data)=>{
    console.log('news rec a message:',data);
  });
});