var fs = require('fs');
var path = require('path');
var events = require('events');
var randomString = require('random-string');
var writeFuncToFile = require('./writeFuncToFile').writeFuncToFile;
var tools = require('./tools');

let countHead = 0 //头部函数
let countRail = 0 //尾部函数
let countOnload = 0 //onload函数
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
//2.无意义随机长度字符串
event.on('getWordOver', function() { 
    console.log("------------------------------")
    console.log('无意义随机长度字符串'); 
    for (let index = 0; index < 500; index++) {
        let res = randomString({
            length: 5,
            numeric: false,
            letters: true,
            special: false
          })+ ""
          let headWord = res.toLowerCase()
          let railword = headWord.charAt(0).toUpperCase() + headWord.slice(1); 
          enArrHead.push(headWord)
          enArrRail.push(railword)
    }
    console.log('随机长度和内容字符串数目:',500)
    event.emit('randomStrOVer'); 
});

//3.创建空函数对象
var globalEmptyFuncObj = {}
let insertToFile = function(filePath,insertNum){
    //暂时固定插入一次
    for(let i=1;i<=insertNum;i++)
    {
        let funcName = tools.getRamdomName(enArrHead,enArrRail) //随机函数名
        let randomVal1 = tools.getRamdomName(enArrHead,enArrRail)//随机变量名1，2
        let randomVal2 = tools.getRamdomName(enArrHead,enArrRail) //
        let unUseStr = randomString({ //无用杂质
            length: 20,
            numeric: false,
            letters: true,
            special: false
          })+ ""
        let funcType = tools.getRandomNum(1,3) //插入的函数内容 funcs.js里定义
        let insertReg = tools.getRandomStrReg()//根据正则表达式确定位置
        let insertType =  tools.getRandomNum(1,4)//插入方式：1 头部，2尾部 34固定位置插入配合正则
        let needRun = tools.getRandomNum(1,6) == 1 //是否调用 1,3表示三分之一几率要调用
        insertType == 1 && countHead++
        insertType == 2 && countRail++
        insertType >= 3 && countOnload++
        writeFuncToFile(
            {
                funcName:funcName,
                randomVal1:randomVal1,
                randomVal2:randomVal2,
                unUseStr:unUseStr,
                funcType:funcType,//函数类型
                desPath :filePath,
                insertType:insertType,
                insertReg: insertReg,
                needRun:needRun,
            }
        )
    }
    
}
event.on('randomStrOVer', function() { 
    console.log("------------------------------")
    console.log('创建空函数对象'); 
   
    let filesList = []
    tools.readFileList("assets2/scripts",filesList)
    filesList.forEach(filePath => {
        insertToFile(filePath,1)
    });
    console.log(filesList.length)
    console.log(`
    一共${filesList.length}个文件，
    累计插入头部次数：${countHead}
    累计插入尾部次数：${countRail}
    累计插入cocos周期函数次数：${countOnload}
    `)
});
//3.
// window.


//循环匹配
// var str = "aaabbbccc1234aaabbbcccaaabbbccc5678aaabbbccc" 
// 　　var reg = /ccc([0-9]+)aaa/g;   
// 　　while(res = reg.exec(str)){   
// 　　  console.log(res);   
// 　　}   
// var str = "aaabbbccc1234aaabbbccc"
// 　　var regExp = /ccc([0-9]+)aaa/;   
// 　　var res = regExp.exec(str);    
// 　　console.log(res);
// console.log(res[0],res[1],res[2],res.length)

// var str = "aaabbbcccaaabbbccc";   
// // 　　var res = str.match(/aaa/g); //没有使用g选项   
// var res = str.match(/aaa/g); //没有使用g选项   
// 　　console.log(res)