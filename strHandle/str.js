var str= "https://kortest-gtmz.meogames.com/servers/s1.php?sevid=1&ver=1.0.0.118&uid=1000185&token=9cc2723d31e65796c85f5465c865eaee&platform=local&lang=zh-ch"
var start = str.indexOf("php?")+4;
var railStr = str.substr(start);
let headStr = str.substr(0,start);
console.log(headStr)
console.log(railStr)