/*************************
//批量修改js，文本替换
*************************/
var fs = require('fs');
var tools = require('./tools');

let filesList = []
tools.readFileListRec("./assets",filesList)
console.log(filesList)
filesList.forEach(desPath => {
    let fileSrc =  fs.readFileSync(desPath, "utf8");
    // if(fileSrc.indexOf("modefyJs") >=0) return
    var reg=/config.Config/g;
    fileSrc=fileSrc.replace(reg,function(){
        return "cc.zy.zyConfig"         
    })
    reg=/exports.utils/g;
    fileSrc=fileSrc.replace(reg,function(){
        return "cc.zy.zyUtils"         
    })
    fs.writeFileSync(desPath,fileSrc)
});


