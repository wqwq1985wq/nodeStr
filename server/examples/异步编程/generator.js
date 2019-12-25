//----------------------------------------------------------------------------概念
// Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同
//区别是function后面有一个*， 调用的时候不会立即执行，每一次调用next返回一个值走一步
// 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
// yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的
// “惰性求值”（Lazy Evaluation）的语法功能。
// yield表达式与return语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。
// 区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。
// 一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式
// function* helloWorldGenerator() {
//     yield 'hello';
//     yield 'world';
//     return 'ending';
//   }
//   var hw = helloWorldGenerator();
//   hw.next()
//   // { value: 'hello', done: false }
//   hw.next()
//   // { value: 'world', done: false }
//   hw.next()
//   // { value: 'ending', done: true }
//   hw.next()
//   // { value: undefined, done: true }
//----------------------------------------------------------------------------遍历
// function* foo() {
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;
//     yield 5;
//     return 6;
//   }
  
//   for (let v of foo()) {
//     console.log(v);
//   }
  // 1 2 3 4 5
//----------------------------------------------------------------------------传参
// // 向 Generator 函数内部输入值的例子
// function* dataConsumer() {
//   console.log('Started');
//   console.log(`1. ${yield}`);
//   console.log(`2. ${yield}`);
//   return 'result';
// }

// let genObj = dataConsumer();
// genObj.next();
// // Started
// genObj.next('a')
// // 1. a
// genObj.next('b')
// // 2. b
//----------------------------------------------------------------------------返回值
// yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
// function* f() {
//     for(var i = 0; true; i++) {
//       var reset = yield i;
//       if(reset) { i = -1; }
//     }
//   }
  
//   var g = f();
  
//   g.next() // { value: 0, done: false }
//   g.next() // { value: 1, done: false }
//   g.next(true) // { value: 0, done: false }
//----------------------------------------------------------------------------其他
//   Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。
// yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
// function* demo() {
//     console.log('Hello' + yield); // SyntaxError
//     console.log('Hello' + yield 123); // SyntaxError
  
//     console.log('Hello' + (yield)); // OK
//     console.log('Hello' + (yield 123)); // OK
//   }



