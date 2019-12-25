var gv = require("../tools/globalVar")
class Room {
    constructor (roomIndex) {
      this.roomIndex = roomIndex.toString();
      //pos --player
      this.playerMap = new Map();
      this.posIndex = -1
      this.maxRoomPlayerNum = gv.maxRoomPlayerNum
    }
    //获得一个位置
    getOneKey()
    {
      for (let i=1;i<=this.maxRoomPlayerNum;i++) {
        if(!this.playerMap.has(i)) return i
      }
      //没有找到,观察者
      return this.posIndex--
    }
    //默认观察者
    addPlayer({player,pos})
    {
      player.roomIndex = this.roomIndex
      player.room = this
      if(!pos)  pos = this.getOneKey()
      player.setPos(pos)//玩家位置
      this.playerMap.set(pos,player)
      console.log(`add player ${player.name} to room ${player.room.roomIndex} pos ${pos}`)
    }
    delPlayer(player)
    {
      console.log(`room ${this.roomIndex} del player ${player.name}`)
      this.playerMap.delete(player.pos)
    }
    
    get playerCount(){
      return `room${this.roomIndex} playerCount:${this.playerMap.size}`
    }
    set playerCount(count){
      console.log("不能手动设置玩家数量")
    }
    toString() {
      var s = `房间(${this.roomIndex})`
      this.playerMap.forEach((v,k)=>{
        s += `(pos:${k},name:${v.name}})`
      })
      return s
    }

  }
  module.exports = Room
