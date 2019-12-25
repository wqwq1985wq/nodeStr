var indexJS = require("./index")
const fs = require('fs');
fs.readFile('./files/1.txt','utf8',function(err,data){
    if(err){
      throw err;
    }
    console.log(data);
  })
 
  fs.readFile('./files/1.txt','utf8',function(err,data){
    if(err){
      throw err;
    }
    console.log(data);
  })
 
  fs.readFile('./files/1.txt','utf8',function(err,data){
    if(err){
      throw err;
    }
    console.log(data);
  })
 /*
  结果：111 222 333。（好像满足需求啊）
 */