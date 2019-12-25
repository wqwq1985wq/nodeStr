var fs = require('fs');
var path = require('path');
var events = require('events');
var event = new events.EventEmitter();
var randomString = require('random-string');
var writeFuncToFile = require('./writeFuncToFile').writeFuncToFile;
var tools = require('./tools');


console.log("1.修改js变量名,函数名------------------------")
setTimeout(() => {
    require("./2reNameFuncs")
    event.emit('2reNameFuncs'); 
}, 1000);



event.on('2reNameFuncs', function() { 
    console.log("2.插入混淆目录结构------------------------")
    require("./3insertEmptyDir")
    event.emit('3insertEmptyDir'); 
})
event.on('3insertEmptyDir', function() { 
    console.log("3.插入杂质------------------------")
    require("./4insertBinary")
    event.emit('4insertBinary'); 
})
event.on('4insertBinary', function() { 
    
    console.log("4插入杂质完成----------")
})