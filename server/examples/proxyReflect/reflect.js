//Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。
//也就是说，从Reflect对象上可以拿到语言内部的方法
//------------------基本用法
var obj = {
    "foo" : 1,
    get bar() {
        return this.foo;
    }
};
var foo = {};
foo.foo = "heheda";
console.log(Reflect.get(obj, "bar", foo));
//----------------实例监听观察者
// const queuedObservers = new Set();

// const observe = fn => queuedObservers.add(fn);
// const observable = obj => new Proxy(obj, {set});

// function set(target, key, value, receiver) {
//   const result = Reflect.set(target, key, value, receiver);
//   queuedObservers.forEach(observer => observer());
//   return result;
// }
// const person = observable({
//     name: '张三',
//     age: 20
// });
  
//   function print() {
//     console.log(`${person.name}, ${person.age}`)
//   }
  
//   observe(print);
//   person.name = '李四';
//   // 输出
//   // 李四, 20
