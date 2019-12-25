let express = require("express");
let http = require("http");
var path = require("path");
var url  = require("url")
let https = require("https");
let fs = require("fs");
// Configuare https
const httpsOption = {
    key : fs.readFileSync("./https/2558542_wxlogin.wqtest1.xyz.key"),
    cert: fs.readFileSync("./https/2558542_wxlogin.wqtest1.xyz.pem")
}
// Create service
let app = express();
http.createServer(app).listen(80);
https.createServer(httpsOption, function(req, res){
  var pathname=__dirname+url.parse(req.url).pathname;
  if (path.extname(pathname)=="") {
      pathname+="/";
  }
  if (pathname.charAt(pathname.length-1)=="/"){
      pathname+="index.html";
  }

  fs.exists(pathname,function(exists){
      console.log(exists)
      if(exists){
          switch(path.extname(pathname)){
              case ".html":
                  res.writeHead(200, {"Content-Type": "text/html"});
                  break;
              case ".js":
                  res.writeHead(200, {"Content-Type": "text/javascript"});
                  break;
              case ".css":
                  res.writeHead(200, {"Content-Type": "text/css"});
                  break;
              case ".gif":
                  res.writeHead(200, {"Content-Type": "image/gif"});
                  break;
              case ".jpg":
                  res.writeHead(200, {"Content-Type": "image/jpeg"});
                  break;
              case ".png":
                  res.writeHead(200, {"Content-Type": "image/png"});
                  break;
              default:
                  res.writeHead(200, {"Content-Type": "application/octet-stream"});
          }

          fs.readFile(pathname,function (err,data){
              res.end(data);
          });
      } else {
          res.writeHead(404, {"Content-Type": "text/html"});
          res.end("<h1>404 Not Found</h1>");
      }
  })
}).listen(3000);