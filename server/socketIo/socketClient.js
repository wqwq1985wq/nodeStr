// 打开一个WebSocket:
const WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:3001/test');
ws.onopen = function(){
  console.log("connected")
  ws.send("sss"); }; 