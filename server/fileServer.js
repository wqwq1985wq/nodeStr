let express = require("express");
let http = require("http");
let https = require("https");
let fs = require("fs");
// Configuare https
const httpsOption = {
    key : fs.readFileSync("./https/2558542_wxlogin.wqtest1.xyz.key"),
    cert: fs.readFileSync("./https/2558542_wxlogin.wqtest1.xyz.pem")
}
// Create service
let app = express();
http.createServer(app).listen(81);
https.createServer(httpsOption, function(request, response){
    //判断HTTP方法，只处理GET 
    if(request.method != "GET"){
      response.writeHead(403);
      response.end();
      return null;
    }
 
    //此处也可使用URL模块来分析URL(https://nodejs.org/api/url.html)
    var sep = request.url.indexOf('?');
    var filePath = sep < 0 ? request.url : request.url.slice(0, sep);
    console.log("GET file: " + filePath);
 
    //当文件存在时发送数据给客户端，否则404
    var fileStat = fs.stat("."+filePath, 
      function(err, stats){
        if(err) {
          response.writeHead(404);
          response.end();
          return null;
        }
        //TODO:Content-Type应该根据文件类型设置
        response.writeHead(200, {"Content-Type": "text/plain", "Content-Length": stats.size});
 
        //使用Stream
        var stream = fs.createReadStream("."+filePath);
 
        stream.on('data',function(chunk){
          response.write(chunk);
        });
 
        stream.on('end',function(){
          response.end();
        });
 
        stream.on('error',function(){
          response.end();
        });
      }
    );
  }
).listen(443);