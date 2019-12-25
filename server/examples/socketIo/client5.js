var io = require('socket.io-client')
// var chat = io.connect('http://localhost:3000/chat')
// let news = io.connect('http://localhost:3000/news');

let socket  = io.connect('http://localhost:3000');
socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    socket.emit('ferret', 'tobi', 'woot', function (data) { // args are sent in order to acknowledgement function
      console.log(data); // data will be 'tobi says woot'
    });
  });