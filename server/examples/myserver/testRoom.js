var RoomManager = require("./room/RoomManager")
var Player = require("./roles/Player")


console.log(RoomManager.getRoomCount())
var r1 = RoomManager.getNewRoom()
RoomManager.addRoom(r1)
console.log(RoomManager.getRoomCount())
var r2 = RoomManager.getNewRoom()
RoomManager.addRoom(r2)
console.log(RoomManager.getRoomCount())
let p1 = new Player()
p1.name = "wq1"
let p2 = new Player({name : "wq2"})
let p3 = new Player({name : "wq3"})

console.log(r1.playerCount)

RoomManager.addPlayerToRoom(p1,r1)
RoomManager.addPlayerToRoom(p1,r1)
RoomManager.addPlayerToRoom(p2,r1)
RoomManager.addPlayerToRoom(p3,r1)
// RoomManager.leaveRoom(p2)
// RoomManager.addPlayerToRoom(p3,r2)
////////重复添加，改房间
// RoomManager.addPlayerToRoom(p1,r2)
// console.log(r1.playerCount)
// console.log(r2.playerCount)
//超过上限，添加失败
// RoomManager.addPlayerToRoom(p3,r1)
// console.log(r1.playerCount)
//观察者可以随便添加
// p3.watchType = 0
// RoomManager.addPlayerToRoom(p3,r1)
// console.log(r1.playerCount)
console.log('------------------------')
console.log(r1.toString())
console.log(r2.toString())

