const url = require('url');


const Cookies = require('cookies');

const Koa = require('koa');

const WebSocket = require('ws');

const app = new Koa();

let count = 0;

let ws = new WebSocket('ws://localhost:3000/ws/chat?name=wq1');

// ws.on('open', function () {
//     console.log(`[CLIENT] open()`);
//     ws.send('Hello!');
// });

// ws.on('message', function (message) {
//     console.log(`[CLIENT] Received: ${message}`);
//     count++;
//     if (count > 3) {
//         var data = 'Goodbye!'
//         sendMsg(1,data)
//         ws.close();
//     } else {
//         setTimeout(() => {
//             var data = `hello${count}`
//             sendMsg(1,data)
//         }, 3000);
//     }
// });

var sendMsg = function(cmd,data)
{
    console.log("client send msg",data)
    ws.send({
        cmd,data
    });
}
