var fs = require('fs');

var rs = fs.createReadStream('1.js');
var ws = fs.createWriteStream('2.js');

rs.pipe(ws);