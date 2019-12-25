var fs = require('fs');
var path = require('path');
var events = require('events');
var randomString = require('random-string');
var writeFuncToFile = require('./writeFuncToFile').writeFuncToFile;
var tools = require('./tools');
//获取命令行参数
const args = process.argv
// let fileNum = (args[2] && !isNaN(args[2])) && args[2] || 1


let run = function(cb)
{
    fileNum = 300
    function getCommonFileData(path) {
        return new Promise(function (resolve, reject) {
            fs.readFile(path, 'utf8', function (err, data) {
                if (err) {
                    reject(err); //失败
                } else {
                    resolve(data); //成功
                }
            })
        });
    }
    var enArrRail = []//单词尾
    var enArrHead = []//单词头
    var tempStr = ""
    //1.获取单词库
    var event = new events.EventEmitter();
    var promise1 = getCommonFileData('en1.txt');
    var promise2 = getCommonFileData('en2.txt');
    console.log('单词库获取'); 

    Promise.all([promise1,promise2]).then(function(fileDatas){
        //正则匹配单词到数组
        fileDatas.forEach(fileData => {
            var reg = /[a-zA-Z]+/g;
            while (res = reg.exec(fileData)) {
                res = res + ""
                let headWord = res.toLowerCase()
                let railword = headWord.charAt(0).toUpperCase() + headWord.slice(1); 
                enArrHead.push(headWord)
                enArrRail.push(railword)
            }
        });
        console.log('单词头数目：',enArrHead.length); 
        console.log('单词尾数目：',enArrRail.length); 
        event.emit('getWordOver'); 
    },function(err){
        console.log('错误了：'+err);
    })
    //1.随机格式二进制
    let insertOneFile = function(filePath){
        let len = tools.getRandomNum(1,1000000)
        var b = new Buffer(len);
        for (let index = 0; index < len; index++) {
            // str = str + "%" + tools.getRandomNum(1,300)
            b[index] = tools.getRandomNum(1,300)
        }
        console.log("随机插入杂质",filePath)
        fs.writeFileSync(filePath,b,  "binary")
    }
    event.on('getWordOver', function() { 
        //寻找一个随机目录
        let src = "build/jsb-link/res"
        let fileList = []
        tools.recGetDirs(src,fileList)
        console.log("目录总数：",fileList.length)
        console.log("插入杂质总数：",fileNum)
        for (let index = 0; index < fileNum; index++) {
            let randomDir = fileList[tools.getRandomNum(1,fileList.length-1)]
            let fileName =  tools.getRamdomName(enArrHead,enArrRail) 
            insertOneFile( path.join(randomDir, fileName))
        }
        cb && cb()
    });
}

exports.run = run; 