const fs = require('fs');
function getFileByPath(path) {
  return new Promise(function (resolve,reject) {
    fs.readFile(path, 'utf8', function (err, data) {
      if(err){
        reject(err);   //失败
      }else{
        resolve(data);    //成功
      }
    })
  });
}
var arr = ["1.txt","2.txt","3.txt"]
//文件数组读取链条
//------------------------------------------------promise写法
// // Promise 的写法比回调函数的写法大大改进，但是一眼看上去，
// // 代码完全都是 Promise 的 API（then、catch等等），操作本身的语义反而不容易看出来。
// function chainReadFiles(fileArr) {

//   // 变量ret用来保存上一个动画的返回值
//   let ret = null;

//   // 新建一个空的Promise
//   let p = Promise.resolve();
//   console.log("chain start")
//   // 使用then方法，添加所有动画
//   for(let file of fileArr) {
//     p = p.then(function(val) {
//       ret = val;
//       if(ret) 
//       {
//         console.log(ret)
//       }
//       return getFileByPath(file);
//     });
//   }

//   // 返回一个部署了错误捕捉机制的Promise
//   return p.catch(function(e) {
//     /* 忽略错误，继续执行 */
//     console.log("error ",e)
//   }).then(function(lastResult) {
//     console.log(lastResult)
//     return lastResult;
//   });

// }
// chainReadFiles(arr).then(ret=>{
//   console.log("chain over")
// })
//------------------------------------------------Generator写法
// spawn和co都是generator的执行器
// var co = require('co')
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
// function chainAnimationsGenerator(fileArr) {
//   // return co(function*() {
//   return spawn(function*() {
//     let ret = null;
//     try {
//       for(let file of fileArr) {
//         ret = yield getFileByPath(file);
//         console.log(ret)
//       }
//     } catch(e) {
//       /* 忽略错误，继续执行 */
//     }
//     return ret;
//   });

// }
// chainAnimationsGenerator(arr)
//------------------------------------------------Generator写法
//async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
// Async 函数的实现最简洁，最符合语义，几乎没有语义不相关的代码。它将 Generator 
// 写法中的自动执行器，改在语言层面提供，不暴露给用户，因此代码量最少。
// 如果使用 Generator 写法，自动执行器需要用户自己提供。
// async function fn(args) {
//   // ...
// }

// // 等同于

// function fn(args) {
//   return spawn(function* () {
//     // ...
//   });
// }
// async function chainAnimationsAsync(fileArr) {
//   let ret = null;
//   try {
//     for(let file of fileArr) {
//       ret = await getFileByPath(file);
//       console.log(ret)
//     }
//   } catch(e) {
//     /* 忽略错误，继续执行 */
//   }
//   return ret;
// }
// chainAnimationsAsync(arr)