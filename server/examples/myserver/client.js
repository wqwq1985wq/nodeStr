const url = require('url');
const client = require('./clientMode');
const gf = require("./tools/globalFuncs")
const Cookies = require('cookies');

const Koa = require('koa');

const WebSocket = require('ws');

const app = new Koa();

let count = 0;

var getClient = function(name,roomIndex)
{
    return new client({name:name,roomIndex:roomIndex})
}
var name = "wq12"
var roomIndex = 1
var cc = getClient(name,roomIndex)
setInterval(() => {
    // cc.reqCommonBroad(`i'm ${name} in ${roomIndex}`)
    // cc.reqRoomBroad(roomIndex.toString().repeat(10))
    cc.reqPersonchat("wq11",`hello ,i'm ${name}`)
}, 3000);
