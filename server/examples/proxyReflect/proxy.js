//Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
//改变操作对象的方式,handler对象基本上是一个包含一组“拦截”的对象，每当访问对象属性时都会被触发。
//-------------------------基本用法
// let target = {
//     name: 'Tom',
//     age: 24
// }
// let handler = {
//     get: function(target, key) {
//         console.log('getting '+key);
//         return target[key]; // 不是target.key
//     },
//     set: function(target, key, value) {
//         console.log('setting '+key);
//         target[key] = value;
//     }
// }
// let proxy = new Proxy(target, handler)
// proxy.name     // 实际执行 handler.get
// proxy.age = 25 // 实际执行 handler.set
// // getting name
// // setting age
// // 25
//-------------------------基本用法