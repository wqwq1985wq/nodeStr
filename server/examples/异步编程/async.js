// ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
// async 函数是什么？一句话，它就是 Generator 函数的语法糖。
//------------------------------------------------------------概念
// async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
//-yeild写法
const gen = function* () {
  const f1 = yield readFile('./1.txt');
  const f2 = yield readFile('./2.txt');
  console.log(f1.toString());
  console.log(f2.toString());
};
// f = gen();
// f.next();
// f.next();
//async写法
const asyncReadFile = async function () {
  const f1 = await readFile('./1.txt');
  const f2 = await readFile('./2.txt');
  console.log(f1.toString());
  console.log(f2.toString());
  return f1.toString()
};
console.log(asyncReadFile().then())
// async函数对 Generator 函数的改进，体现在以下四点：
// 1.Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。
// 也就是说，async函数的执行，与普通函数一模一样，只要一行。
// 2.yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，
// 可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
// 3.async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了
//------------------------------------------------------------基本用法
//实现休眠
// function sleep(interval) {
//   return new Promise(resolve => {
//     setTimeout(resolve, interval);
//   })
// }

// // 用法
// async function one2FiveInAsync() {
//   for(let i = 1; i <= 5; i++) {
//     console.log(i);
//     await sleep(1000);
//   }
// }
// one2FiveInAsync();
//------------------------------------------------------------async 函数的实现原理
// async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里,自动执行
// async function fn(args) {
//   // ...
// }

// // 等同于

// function fn(args) {
//   return spawn(function* () {
//     // ...
//   });
// }
// function spawn(genF) {
//   return new Promise(function(resolve, reject) {
//     const gen = genF();
//     function step(nextF) {
//       let next;
//       try {
//         next = nextF();
//       } catch(e) {
//         return reject(e);
//       }
//       if(next.done) {
//         return resolve(next.value);
//       }
//       Promise.resolve(next.value).then(function(v) {
//         step(function() { return gen.next(v); });
//       }, function(e) {
//         step(function() { return gen.throw(e); });
//       });
//     }
//     step(function() { return gen.next(undefined); });
//   });
// }

