var fs = require('fs');
var path = require('path');
var tools = require('./tools');
let excuteObj= {
    "00":true,"0e":true,"01":true,"1d":true,"02":true,
    "4a":true,"9e":true,"13":true,"35":true,"67":true,
    "68":true,"94":true,"a0":true,"a1":true,"ad":true,
    "cd":true,"d0":true,"e4":true,"f2":true,
}
let includeObj= {
    "00":true,"0e":true,"01":true,"1d":true,"02":true,
    "4a":true,"9e":true,"13":true,"35":true,"67":true,
    "68":true,"94":true,"a0":true,"a1":true,"ad":true,
    "cd":true,"d0":true,"e4":true,"f2":true,
}
let fromDir = "../build/jsb-link/res/raw-assets"
let toDirObb = "raw-assets"
let toDir2 = "apk"
// tools.recRemoveDir(toDirObb)
// tools.recRemoveDir(toDir2)
// tools.copyFolderExcute(fromDir,toDirObb,excuteObj)
//改代码，资源不变，仅删除多余资源
tools.recRemoveDirByObj(fromDir,excuteObj)
tools.recRemoveDirByObj(fromDir,excuteObj)//第二遍删空文件夹
// let ver = process.argv[2]
// let zipName = "main."+ver+".org.cocos2d.helloworld.obb"
// const compressing = require('compressing');
// compressing.zip.compressDir(toDirObb, "./"+zipName)
// .then(() => {
//     console.log('success');
// })
// .catch(err => {
//     console.error(err);
// });
