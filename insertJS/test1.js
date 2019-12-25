var UglifyJS = require("Uglify-js");
// var code = "function add(first, second) { return first + second; }";
// var result = UglifyJS.minify(code);
// console.log(code); // runtime error, or `undefined` if no error
// console.log(result.code);  // minified output: function add(n,d){return n+d}
var fs = require('fs');
let subpath = "../build/jsb-link/js backups (useful for debugging)/project.js"
    let fileContent = fs.readFileSync(subpath,"utf-8")
    let newCode = UglifyJS.minify(fileContent)
    fs.writeFileSync(subpath,newCode.code);