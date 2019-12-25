
const fs = require('fs');
const fetch = require("node-fetch")
/////////////////////文件异步读取generator实现
const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      // console.log(data.toString())
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('1.txt');
  const f2 = yield readFile('2.txt');
  console.log(f1);
  console.log(f2);
};
// var f = gen();
// f.next()
// f.next()
// f.next()
/////////////////////文件异步读取async 实现
const asyncReadFile = async function () {
  const f1 = await readFile('1.txt');
  const f2 = await readFile('2.txt');
  console.log(f1.toString());
  console.log(f2.toString());
};
// asyncReadFile()
//使用async读取url内容
var urls = ["http://www.baidu.com","http://www.baidu.com"]
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
logInOrder(urls)