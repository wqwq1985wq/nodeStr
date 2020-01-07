/*************************
//使用静态js proto文件
*************************/
let msg = require("./Msg").msg
let message = msg.Login.create({name: "hello", pwd: "pwd"});//构造对象
let messageBuf = msg.Login.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
console.log(messageBuf,messageBuf.length)

//二进制数据的长度+一个short的长度
var sendBuf = new ArrayBuffer(messageBuf.length + 2);
var dv = new DataView(sendBuf);
dv.setInt16(0,3); //写入一个short值
//将二进制数据写入
var u8view = new Uint8Array(sendBuf, 2); //跳过一个short的距离
for (var i = 0, strLen = messageBuf.length; i < strLen; ++i){
    u8view[i] = messageBuf[i];
}
console.log(sendBuf)


////////////////////////解消息
console.log("解消息")
var dvRec = new DataView(sendBuf);
let arrHead = dvRec.getInt16(0)
console.log(arrHead)

let bodyBuffer = sendBuf.slice(2)
let buffer = Buffer.from(bodyBuffer)
console.log(buffer)

let desMsg = msg.Login.decode(buffer)
console.log(desMsg)

