var indexJS = require("./index")
const fs = require('fs');
//封装一个异步读取文件的内容的函数
//此函数返回对应异步任务的promise对象
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
  
  //由于then通过getFileByPath返回的是一个promise对象，所以可以继续.then串联调用（链式调用）
  getFileByPath('./files/1.txt')
  .then(function(data){
    console.log("成功："+data);
    return getFileByPath('./files/2.txt');
  }) //上面的then通过getFileByPath返回的是一个promise对象，所以可以继续.then串联调用（链式调用）
  .then(function(data){ 
    console.log("成功："+data);
    return getFileByPath('./files/3.txt');
  })
  .then(function(data){
    console.log("成功："+data);
  })
  .catch(function(err){   
    // catch作用： 上面所有的promise如果其中一个有错误，
    //则终止下面所有的promise执行，且直接进入到catch中获取对应promise的异常错误信息
    console.log('catch:'+err);
  }).finally(function(){
    //无论失败成功都会执行
    console.log('完成');
  })
//   注意：如果在then中定义了错误回调则不会进入到上面的catch中，这是因为promise对象指定了对应的错误处理回调。
