var indexJS = require("./index")
const fs = require('fs');
//简单说promise就是用来执行异步任务的，可以解决上面所说的回调地狱问题，
//语法：new Promise(function(callback){})
var promise = new Promise(function (resolve, reject) {
    //两个参数： resolve 成功的回调函数名  ， reject失败的回调函数名
    fs.readFile('./files/111.txt', 'utf8', function (err, data) {
      if (err) {
        //说明失败了，要执行失败的回调函数
        reject(err);
      } else {
        //成功的逻辑
        resolve(data);
      }
      //等价于
      // err ? reject(err) : resolve(data);
    })
  });
  
  //new Promise返回的是一个promise对象，
  //这个对象有一个方法叫做then,在其原型对象上
  //通过这then方法可以指定成功和失败的回调函数
  //语法：promise.then(successCallback,errorCallback);
  promise.then(function (data) {
    //then第一个函数是成功的回调，参数是resolve(err)中的data
    console.log('成功：' + data); // 若成功，运行结果：成功：111
  }, function (err) {
    //then第二个函数是失败的回调函数，参数是reject(err)中的err错误对象
    console.log('失败：' + err);
  });