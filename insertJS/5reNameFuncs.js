var UglifyJS = require("Uglify-js");
// var code = "function add(first, second) { return first + second; }";
// var result = UglifyJS.minify(code);
// console.log(code); // runtime error, or `undefined` if no error
// console.log(result.code);  // minified output: function add(n,d){return n+d}
var fs = require('fs');
var path = require('path');
//读文件
function readDir (dir,des) {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir), subpath
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            readDir(subpath,des);
        }
        else if (stat.isFile() && path.extname(subpath).toLowerCase() === '.js') {
            let fileContent = fs.readFileSync(subpath,"utf-8")
            console.log(subpath)
            //    console.log(fileContent)
            let newCode = UglifyJS.minify(fileContent)
            
            var basename = path.basename(subpath)
            console.log("---------",basename)
            fs.writeFileSync(path.join(des, basename),newCode.code);
            console.log(newCode)
        }
    }
}
let src = "./src/"
let des = "./output"
readDir(src,des);