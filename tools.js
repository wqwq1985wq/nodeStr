
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
let getRandomNum = function(n1,n2)
{
    var Range = n2 - n1 + 1;
    return (n1 + Math.floor(Math.random() * Range))
}
let getRandomItem = function(array)
{
    var Range = array.length-1 - 0;   
    var index = (0 + Math.round(Math.random() * Range))
    return array[index]
}
let getRamdomName = function(enArrHead,enArrRail)
{
    return getRandomItem(enArrHead) + getRandomItem(enArrRail)
}
let regArr = [
    /(onLoad\s*\(\s*\)\s*{)/,
    /(ctor\s*\(\s*\)\s*{)/
]
let getRandomStrReg = function()
{
    return getRandomItem(regArr) 
}
let readFileList =function (dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {      
            readFileList(path.join(dir, item), filesList);  //递归读取文件
        } else if(path.extname(fullPath) == ".js") {   
            filesList.push(fullPath);                     
        }        
    });
    return filesList;
}
//递归创建文件夹
function recMkdir(str){
    let dirs = str.split('\\'); ///['m','n']；
    let index = 0
    function next(){
        if(index >= dirs.length) return;
        let currentPath = dirs.slice(0,++index).join('/');
        fs.access(currentPath,(err)=>{
                //不存在
                if(err){
                    fs.mkdirSync(currentPath)
                    next();
                }else{
                    //递归他的子目录
                    next();
                }
        })
    };
    next()
}
//递归删除目录
function recRemoveDir(path){
    var files = [];
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    recRemoveDir(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }
}
//递归获取目录列表
let recGetDirs =function (dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {    
            filesList.push(fullPath);         
            recGetDirs(path.join(dir, item), filesList);  //递归读取文件
        }   
    });
    return filesList;
}
//拷贝整个文件夹，排除
function copyFolderExcute(from, to,excuteObj) {        // 复制文件夹到指定目录
    let files = [];
    if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
        files = fs.readdirSync(from);
        files.forEach(function (file, index) {
            var targetPath = from + "/" + file;
            var toPath = to + '/' + file;
            if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
                if(!excuteObj[file])
                {
                    copyFolderExcute(targetPath, toPath,excuteObj);
                }
                
            } else {                                    // 拷贝文件
                fs.copyFileSync(targetPath, toPath);
            }
        });
    } else {
        fs.mkdirSync(to);
        copyFolderExcute(from, to,excuteObj);
    }
}
//拷贝整个文件夹，只包含
function copyFolderInclude(from, to,includeObj ) {        // 复制文件夹到指定目录
    let files = [];
    if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
        files = fs.readdirSync(from);
        files.forEach(function (file, index) {
            var targetPath = from + "/" + file;
            var toPath = to + '/' + file;
            if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
                if(includeObj[file])
                {
                    copyFolderInclude(targetPath, toPath,includeObj);
                }
                
            } else {                                    // 拷贝文件
                fs.copyFileSync(targetPath, toPath);
            }
        });
    } else {
        fs.mkdirSync(to);
        copyFolderInclude(from, to,includeObj);
    }
}
function getDes( ) {
    console.log("wqtools package....")
}  
exports.getDes = getDes
exports.copyFolderInclude = copyFolderInclude
exports.copyFolderExcute = copyFolderExcute
exports.getRandomItem = getRandomItem
exports.getRamdomName = getRamdomName
exports.getRandomNum = getRandomNum
exports.getRandomStrReg = getRandomStrReg
exports.recGetDirs = recGetDirs
exports.recRemoveDir = recRemoveDir
exports.recMkdir = recMkdir
exports.readFileList = readFileList


