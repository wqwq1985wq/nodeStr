/*************************
//观察者模式：观察者模式（又被称为发布-订阅（Publish/Subscribe）模式，属于行为型模式的一种，它定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象。
这个主题对象在状态变化时，会通知所有的观察者对象，使他们能够自动更新自己
观察者模式 在软件设计中是一个对象，维护一个依赖列表，当任何状态发生改变自动通知它们。
发布-订阅模式 消息的发送方，叫做发布者（publishers），消息不会直接发送给特定的接收者，叫做订阅者。
优点：
时间上的解耦
对象之间的解耦
缺点：
创建订阅者本身要消耗一定的时间和内存
当订阅一个消息时，也许此消息并没有发生，但这个订阅者会始终存在内存中。
观察者模式弱化了对象之间的联系，这本是好事情，但如果过度使用，对象与对象之间的联系也会被隐藏的很深，会导致项目的难以跟踪维护和理解
*************************/

// 定义商家
let merchants = {}
// 定义预定列表
merchants.orderList = {}
// 将增加的预订者添加到预定客户列表中
merchants.listen = function(id, info) {
  if(!this.orderList[id]) {
    this.orderList[id] = []
  }
  this.orderList[id].push(info)
  console.log('预定成功')
}
//发布消息
merchants.publish = function(id) {
  let infos = this.orderList[id]
  // 判断是否有预订信息
  if(!infos || infos.length === 0) {
    console.log('您还没有预订信息!')
    return
  }
  // 如果有预订信息，则循环打印
  infos.forEach((el, index) => {
    console.log('尊敬的客户：')
    el.call(this, arguments)
    console.log('已经到货了')
  })
}
merchants.remove = function(id, fn) {
  // 撤销订单 
  var infos = this.orderList[id]
  if(infos instanceof Array){
    infos.forEach((el, index) => {
      el === fn &&  this.orderList[id].splice(index, 1)
    })
  }
  console.log('撤销成功')
}
// 定义一个预订者customerA，并指定预定信息
let customerA = function() {
    console.log('黑色至尊版一台')
}
let customerB = function() {
    console.log('白色至尊版一台')
}
let customerC = function() {
    console.log('红色至尊版一台')
}
// customerA 预定手机，并留下预约电话
merchants.listen('15888888888', customerA) // 预定成功
merchants.listen('15888888888', customerB) // 预定成功
merchants.listen('15777777777', customerB) // 预定成功
merchants.listen('15777777777', customerC) // 预定成功
merchants.remove('15888888888', customerB) // 撤销成功
// 商家发布通知信息
merchants.publish('15888888888')
merchants.publish('15777777777')