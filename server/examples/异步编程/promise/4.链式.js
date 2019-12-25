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
  },function(err){
    console.log("失败："+err);
    return getFileByPath('./files/2.txt');
  }) 
  .then(function(data){ 
    console.log("成功："+data);
    return getFileByPath('./files/3.txt');
  },function(err){
    console.log("失败："+err);
    return getFileByPath('./files/3.txt');
  })
  .then(function(data){
    console.log("成功："+data);
  },function(err){
    console.log("失败："+err);
  });