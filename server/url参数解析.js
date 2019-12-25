var http = require('http');
var url = require('url');
var util = require('util');
// http://localhost:3000/user?name=菜鸟教程&url=www.runoob.com
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);