var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
  
app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});
  
http.listen(3004, function(){
    console.log('listening on *:3004');
});
 
io.on('connection', function(socket){
    console.log('a user connected');
});