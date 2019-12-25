var indexJS = require("./index")
const fs = require('fs');
//简单说promise就是用来执行异步任务的，可以解决上面所说的回调地狱问题，
//语法：new Promise(function(callback){})
var promise = new Promise(function(resolve,reject){
  //这里就是写异步的代码，只要new  Promise操作，就会立刻执行这里的代码
  //两个参数 resolve 异步执行成功的回调函数,reject异步执行失败的回调函数
  fs.readFile('./files/1.txt', 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
  })
});