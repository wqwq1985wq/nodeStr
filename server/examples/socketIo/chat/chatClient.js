var io = require('socket.io-client')
// var chat = io.connect('http://localhost:3000/chat')
// let news = io.connect('http://localhost:3000/news');
const client = require('./clientMode');

var c1 = new client({name:"wq1",roomName:"room0"})
c1.addToRoom("room1")
c1.addToRoom("room2")
c1.addToRoom("room3")
c1.leaveRoom("room1")

var c2 = new client({name:"wq2",roomName:"room0"})
c2.addToRoom("room1")

var c3 = new client({name:"wq3",roomName:"room0"})
c2.addToRoom("room1")

setTimeout(() => {
    c1.getRoomTotalList()
}, 1000);
