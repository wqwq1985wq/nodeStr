var fs = require('fs');
var path = require('path');
var events = require('events');
var randomString = require('random-string');
var randomFunc = require('./funcs');
//立即调用
let writeFuncToFile = function({
    funcName,randomVal1,randomVal2,funcType,desPath,insertType,insertReg,needRun,unUseStr
})
{
    let funcStr = randomFunc.getFuncStr({
        funcName,randomVal1,randomVal2,funcType,desPath,needRun,unUseStr
    })
    
    if(!funcStr){
        console.log("获取函数类型失败",funcType)
        return;
    }
    //代码段注入别的文件
    //获取文件内容
    let fileSrc =  fs.readFileSync(desPath, "utf8");
    // 函数名去重,简单放弃本次操作
    
    if(fileSrc.indexOf(funcName) >=0) 
    {
        console.log(`发生单词重复${funcName} inpath ${desPath}`)
        return;
    }
    //找到插入位置1:文件头
    let newStr 
    if(insertType == 1)
    {
        newStr= funcStr + fileSrc
    }else if(insertType == 2)//文件尾部
    {
        newStr= fileSrc + funcStr
    }else if (insertType >= 3 && insertReg)//标准onLoad函数
    {
        let res = insertReg.exec(fileSrc)
        if(res && res.index > 0 )
        {
            let start = res.index + RegExp.$1.length 
            newStr = fileSrc.slice(0, start) + funcStr + fileSrc.slice(start)
            console.log(`文件${desPath},插入${insertReg},${start}`)
        }else{
            console.log(`插入文件${desPath}特殊位置失败，没有找到插入位置`)
            return;
        }
        
    }else if (insertType == 4)//标准ctor函数
    {
        
    }
    
    //写入文件
    newStr && newStr.length > fileSrc.length &&
    fs.writeFileSync(desPath,newStr)
    
}
exports.writeFuncToFile = writeFuncToFile
