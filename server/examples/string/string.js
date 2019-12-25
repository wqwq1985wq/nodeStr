// ES6 之前判断字符串是否包含子串，用 indexOf 方法，ES6 新增了子串的识别方法。
let string = "apple,banana,orange";
string.includes("banana");     // true
string.startsWith("apple");    // true
string.endsWith("apple");      // false
string.startsWith("banana",6)  // true
// 这三个方法只返回布尔值，如果需要知道子串的位置，还是得用 indexOf 和 lastIndexOf 。
// 这三个方法如果传入了正则表达式而不是字符串，会抛出错误。
// 而 indexOf 和 lastIndexOf 这两个方法，它们会将正则表达式转换为字符串并搜索它。
// repeat()：返回新的字符串，表示将字符串重复指定次数返回。
console.log("Hello,".repeat(112));  // "Hello,Hello,"
console.log("h".padStart(5,"o"));  // "ooooh"
console.log("h".padEnd(5,"o"));    // "hoooo"
console.log("h".padStart(5));      // "    h"
// 常用于补全位数：
console.log("123".padStart(10,"0"));  // "0000000123"
// 模板字符串
// 模板字符串相当于加强版的字符串，用反引号 `,除了作为普通字符串，
// 还可以用来定义多行字符串，还可以在字符串中加入变量和表达式。
let name = "Mike";
let age = 27;
let info = `My Name is ${name},I am ${age+1} years old next year.`
console.log(info);
// 字符串中调用函数：
function f(){
  return "have fun!";
}
let string2= `Game start,${f()}`;
console.log(string2);  // Game start,have fun!