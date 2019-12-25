var fs = require('fs');
var path = require('path');
var tools = require('../tools');
let excuteObj= {
    "00":true,
    "0a":true,
}
let includeObj= {
    "00":true,
    "0a":true,
}
let fromDir = "build/jsb-link/res/raw-assets"
let toDir1 = "obb"
let toDir2 = "apk"
tools.recRemoveDir(toDir1)
tools.recRemoveDir(toDir2)
tools.copyFolderInclude(fromDir,toDir1,includeObj)
tools.copyFolderExcute(fromDir,toDir2,excuteObj)
