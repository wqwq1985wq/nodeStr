/*************************
//观察者模式，属于行为型模式的一种，它定义了一种一对多的依赖关系，
让多个观察者对象同时监听某一个主题对象。
这个主题对象在状态变化时，会通知所有的观察者对象，使他们能够自动更新自己。
事件机制就是最好的例子
优点：实现表示层和数据逻辑层的分离，并在观察目标和观察者之间建立一个抽象的耦合，支持广播通信

*************************/

/**
 * 发布订阅模式(观察者模式)
 * handles: 事件处理函数集合
 * on: 订阅事件
 * emit: 发布事件
 * off: 删除事件
**/

class PubSub {
    constructor() {
      this.handles = {};
    }
  
    // 订阅事件
    on(eventType, handle) {
        console.log("订阅事件",eventType)
      if (!this.handles.hasOwnProperty(eventType)) {
        this.handles[eventType] = [];
      }
      if (typeof handle == 'function') {
        this.handles[eventType].push(handle);
      } else {
        throw new Error('缺少回调函数');
      }
      return this;
    }
  
    // 发布事件
    emit(eventType, ...args) {
        console.log("发送事件",eventType)
      if (this.handles.hasOwnProperty(eventType)) {
        this.handles[eventType].forEach((item, key, arr) => {
          item.apply(null, args);
        })
      } else {
        throw new Error(`"${eventType}"事件未注册`);
      }
      return this;
    }
  
    // 删除事件
    off(eventType, handle) {
        console.log("关闭事件",eventType)
      if (!this.handles.hasOwnProperty(eventType)) {
        throw new Error(`"${eventType}"事件未注册`);
      } else if (typeof handle != 'function') {
        throw new Error('缺少回调函数');
      } else {
        this.handles[eventType].forEach((item, key, arr) => {
          if (item == handle) {
            arr.splice(key, 1);
          }
        })
      }
      return this; // 实现链式操作
    }
  }
  
  let callback = function (p) {
    console.log('事件处理函数',p);
  }
  let pubsub = new PubSub();
  pubsub.on('completed',callback)

  pubsub.emit("completed",123)
  pubsub.off("completed",callback)
  pubsub.emit("completed",123)
//   let pubsub = new PubSub();
//   pubsub.on('completed', (...args) => {
//     console.log(args.join(' '));
//   }).on('completed', callback);
  
//   pubsub.emit('completed', 'what', 'a', 'fucking day');
//   pubsub.off('completed', callback);
//   pubsub.emit('completed', 'fucking', 'again');