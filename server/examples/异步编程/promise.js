// Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
// 它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。
//promise用于解决地狱回调
//---------------------------------------------------promise链式写法,执行一串动作
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
//---------------------------------------------------带then和catch捕捉错误中断链条
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
//---------------------------------------------------all,并行执行，所有任务都完成后，执行then
//有错误则中断
let p = Promise.all([promise1, promise2, promise3]);
p.then(function (datas) {
    console.log(datas);
})
 .catch(function (err) {
    console.log(err);
});
//---------------------------------------------------race，并行执行，只要有一个任务完成，执行then
//其他任务依然继续执行，但是结果被丢弃，状态改变，不会再逆转
let p = Promise.race([p1, p2]);

p.then(function (data) {
    console.log(data);
})
 .catch(function (err) {
    console.log(err);
});