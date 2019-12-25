var Room = require("./Room")
var gv = require("../tools/globalVar")
class RoomManager {
  
  constructor()
  {
    this.roomIndex = 1
    this.roomMap = new Map();
  }
  static getInstance(){   /*单例*/
    if(!RoomManager.instance){

      RoomManager.instance=new RoomManager();
    }
    return RoomManager.instance;
  }
  getRoomCount()
  { 
    return this.roomMap.size
  }
  //寻找一个合适的房间,有指定的房间就进去，没有就建立一个新的
  //todo:寻找一个人没有满2人的房间，加入
  getOneRoom(roomIndex)
  {
    var room
    if(roomIndex>0)
    {
      room =  this.roomMap.get(roomIndex.toString())     
    }
    
    if(!room)
    {
      room =  new Room(this.roomIndex++)
    }
    
    if(room)
    {
      this.addRoom(room)
    }
    
    return room
  }
  getNewRoom()
  {
    return new Room(this.roomIndex++)
  }
  //房间号获取房间
  getRoomByindex()
  {

  }
  //获取玩家在哪个房间
  getRoomByPlayer(player)
  {

  }
  addRoom(room)
  {
    this.roomMap.set(room.roomIndex,room)
  }
  delRoom(room)
  {
    console.log(`del room ${room.roomIndex}`)
    this.roomMap.delete(room.roomIndex)
  }
  leaveRoom(player=undefined)
  {
    if(!player || !player.room) return;
    
    player.room.delPlayer(player)
    player.leaveRoom()
    //todo:房间没有玩家以后，房间自动解散
  }
  //todo:添加观察者，房间上限可以提高
  addPlayerToRoom(player,room)
  {
    if(!player || !room) return;
    
    //玩家添加限制，观察者可以随便添加
    if(room.playerCount >=gv.maxRoomPlayerNum && player.watchType !=0)
    {
      console.log("房间添加玩家失败，超过上限")
      return false
    }
    //已经在房间中了，就不用添加了
    // console.log(player.roomIndex,room.roomIndex)
    if(player.roomIndex == room.roomIndex) return;
    
    //先退原来的房间
    this.leaveRoom(player)
    
    room.addPlayer({player})
  }
  //todo:随机添加玩家到某一个房间
  // addPlayerToRandomRoom(player)
  toString() {
    var s = `-----------------`
    this.roomMap.forEach((v,k)=>{
      s += `\n房间${v.roomIndex}:\n`
      s += v.toString()
    })
    console.log(s)
  }
};

module.exports =RoomManager.getInstance()