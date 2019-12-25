const WebSocket = require('ws');
class client {
    //函数参数解构赋值
    constructor({name="",roomIndex=0}={}){
      this._name = name
      this._roomIndex = roomIndex 
      
      let ws = new WebSocket(`ws://localhost:3000/ws/chat?name=${name}&roomIndex=${roomIndex}`);
      ws.name = name
      this._ws = ws
      ws.parent = this
      ws.on('open', function () {
            console.log(`[CLIENT] open()${this.name}`);
            // ws.send('Hello!');
            var name = this.name
            this.parent.reqLogin({name})
            this.parent.connected = true;

      });
      ws.on('message', function (msg) {
            // console.log(`[CLIENT] Received: ${msg}`);
            var jsonData = JSON.parse(msg)
            if(jsonData && jsonData.cmd)
            {
                this.parent.onEventTCPSocketRead(jsonData.cmd,jsonData)
            }
        });
    }
    sendMsg(cmd,data)
    {
        if(!this.isLoinged){
            console.log("login first")
            return;
        }
        var str = JSON.stringify({cmd,data})
        console.log("client send:",str)
        this._ws.send(str)
    }
    onEventTCPSocketRead(cmd, msg) {
        switch(cmd){
            case "login":
                this.resLogin(msg)
                break;
            case "commonBroad":
                this.resCommonBroad(msg)
                break;
            case "roomBroad":
                this.resRoomBroad(msg)
                break;
            case "personChat":
                this.resPersonchat(msg)
                break;
                
            default:
                console.log("no access handler")
        }
    }
    reqLogin({name}={})
    {
        //login消息自己发送，不用判断是否已登录
        var cmd = "login"
        var data = {name}
        var str = JSON.stringify({cmd,data})
        console.log("client send:",str)
        this._ws.send(str)
    }
    resLogin(msg){
        if(msg.ret == 0)
        {
            console.log("登录成功")
            this.isLoinged = true;
        }else{
            console.log("登录失败")
            this.isLoinged = false;
        }
        
    }
    //全服广播
    reqCommonBroad(msg)
    {
        this.sendMsg("commonBroad",{msg})
    }
    resCommonBroad(msg){
        msg = JSON.stringify(msg)
        console.log(`1全服广播${msg}`)
    }
    //本房间广播
    reqRoomBroad(msg)
    {
        this.sendMsg("roomBroad",{msg})
    }
    resRoomBroad(msg){
        msg = JSON.stringify(msg)
        console.log(`房间广播${msg}`)
    }
    //玩家私聊
    reqPersonchat(name,msg)
    {
        this.sendMsg("personChat",{name,msg})
    }
    resPersonchat(msg){
        msg = JSON.stringify(msg)
        console.log(`私聊${msg}`)
    }
  }
  module.exports = client