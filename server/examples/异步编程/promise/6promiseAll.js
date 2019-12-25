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
  
  var promise1 = getFileByPath('./files/1.txt');
  var promise2 = getFileByPath('./files/2.txt');
  var promise3 = getFileByPath('./files/3.txt');
  
  //执行多个异步任务，
  Promise.all([promise3,promise1,promise2]).then(function(data){
    console.log(data); 
  },function(err){
    console.log('错误了：'+err);
  })
  //Promise.all尤其是在一个页面上发起多个ajax程序的时候，如果要同时保证他们成功，则使用Promise.all是最合适不过的了。其中一个失败则也可以在then的第二个回调做失败的逻辑。
//   注意：Promise.all的成功结果是返回一个数组，且数组中数据的结果顺序与Promise.all数组的传参顺序是一样的。
