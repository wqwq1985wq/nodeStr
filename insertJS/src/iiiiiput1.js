const fs = require('fs');
/*
常规解决办法：
在第一个异步任务读取成功之后再读取第二个异步任务，
第二成功后，在读取第三个异步任务
*/
//读取第一个异步任务
fs.readFile('./files/1.txt','utf8',function(err,data){
    if(err){
      throw err;
    }
    console.log(data);
    //读取第二个异步任务
    fs.readFile('./files/2.txt','utf8',function(err,data){
      console.log(data);
      //读取第三个异步任务
      fs.readFile('./files/3.txt','utf8',function(err,data){
        console.log(data);
      })
    })
  })
  
  /* 
  结果： 111 222 333 （这必须按照顺序输出的，结果杠杆的）  
  */
  
  /*
  问题：
  以上按照顺序执行多个异步任务产生的问题：`回调地狱`问题（层层包裹进行回调，代码也不够优雅）
  */
  
  /* 
  解决办法：采用es6,提供的promise来解决上述产生的问题。
  */