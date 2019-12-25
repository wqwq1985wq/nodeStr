//生成空目录
var fs = require('fs');
var path = require('path');
var events = require('events');
var randomString = require('random-string');
var writeFuncToFile = require('./writeFuncToFile').writeFuncToFile;
var tools = require('./tools');
//获取命令行参数
const args = process.argv
// let fileNum = (args[2] && !isNaN(args[2])) && args[2] || 1
fileNum = 300
let getRecDir = function(desPath,num )
{
    (!num || num <=1) &&  (num = 1)
    for (let index = 0; index < num; index++) {
        let bLen = tools.getRandomNum(5,10)
        let ranName = randomString({
            length: bLen,
            numeric: true,
            letters: true,
            special: false
        })+ ""
        desPath = path.join(desPath,ranName)
    }
    return desPath
}
//1.随机格式二进制
let insertOneDir = function(filePath){
    
    let dirName = path.join(filePath, ranName) 
    tools.recMkdir(dirName)
    console.log("创建目录:",dirName)
}




let run = function(cb)
{
    //寻找一个随机目录
    let src = "../build/jsb-link/res"//"scripts"
    let fileList = []
    tools.recGetDirs(src,fileList)
    console.log("目录总数：",fileList.length)
    console.log("插入文件总数：",fileNum)
    for (let index = 0; index < fileNum; index++) {
        let randomDir = fileList[tools.getRandomNum(1,fileList.length-1)]
        if(!randomDir) break;
        
        let dirName = getRecDir(randomDir,tools.getRandomNum(1,3))
        console.log("创建目录:",dirName)
        tools.recMkdir(dirName)
        
    }
    cb && cb()
}
 //寻找一个随机目录
 let src = "../build/jsb-link/res"//"scripts"
 let fileList = []
 tools.recGetDirs(src,fileList)
 console.log("目录总数：",fileList.length)
 console.log("插入文件总数：",fileNum)
 for (let index = 0; index < fileNum; index++) {
     let randomDir = fileList[tools.getRandomNum(1,fileList.length-1)]
     if(!randomDir) break;
     
     let dirName = getRecDir(randomDir,tools.getRandomNum(1,3))
     console.log("创建目录:",dirName)
     tools.recMkdir(dirName)
     
 }
exports.run = run; 
