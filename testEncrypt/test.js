var CryptoJS=require('crypto-js');
// var CryptoJS = require("crypto-js");
 //秘钥
const CRYPTOJSKEY= "fj4324F#410^%@da";
 
//加密
  /*
  * {param} plaintText 加密明文
  * return  str 加密结果
  */
 let encryptf =function(plaintText) {
    var plaintText = plaintText;
    var options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    };
    var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
    var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
    var encryptedBase64Str = encryptedData.toString();
    return encryptedBase64Str;
  }
  //解密
  /*
  * {param} plaintText 解密密文
  
  * return  str 解密结果
  */
  let decrypt =function(encryptedBase64Str, type) {
   
    var encryptedBase64Str = encryptedBase64Str;
    var options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    };
    var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
    // 解密
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, options);
    // 解密后，需要按照Utf8的方式将明文转位字符串
    var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
  }
let result = encryptf("dajdoteirlsdsd")
console.log(result)
