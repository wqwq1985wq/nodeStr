var RoomManager = require("../room/RoomManager")

class player {
    //函数参数解构赋值
    constructor({name="",roomIndex=0,room=undefined,pos = 0}={}){
    // constructor (name="",roomIndex=0,room=undefined,pos = -1) {
      this._name = name
      this.roomIndex = roomIndex //初始不属于任何房间，也没有名字
      this.room = room
      this.pos = pos//默认是散客0 观察者 负数  位置1,2,3
    }
    /**是否是观察者 */
    isWatcher()
    {
      return this.pos < 0
    }
    //为玩家安排位置
    setPos(pos)
    {
      this.pos = pos
    }
    leaveRoom()
    {
      if(this.roomIndex > 0)
      {
        console.log(`player ${this.name} leave room ${this.roomIndex}`)
      }
      this.roomIndex = 0
      this.room = undefined
    }
    get name(){
       return this._name
    }
    //必须使用_name，不然会循环调用，私有和公有要分开
    set name(name){
      console.log("set player name",name)
      this._name = name
    }
    toString() {
      return `玩家(${this.name})`
    }
  }
  module.exports = player