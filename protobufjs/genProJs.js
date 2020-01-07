
let tools=require('../tools');
var path = require('path');
let fileList = tools.readFileList("protos")
let fileStr = ""
fileList.map(function(fileName,index){
    fileStr = fileStr + fileName + " "
    return fileName
}).filter(function(fileName){
    var extname=path.extname(fileName);
    return extname == ".proto"
})
let cmd = "pbjs -t static-module -w commonjs -o Msg.js " + fileStr
console.log("cmd is :",fileStr)
tools.execCMD(cmd,()=>{
    console.log("over")
})
