// let mySet = new Set();
 
// mySet.add(1); // Set(1) {1}
// mySet.add(5); // Set(2) {1, 5}
// mySet.add(5); // Set(2) {1, 5} 这里体现了值的唯一性
// mySet.add("some text"); 
// // Set(3) {1, 5, "some text"} 这里体现了类型的多样性
// var o = {a: 1, b: 2}; 
// mySet.add(o);
// mySet.add({a: 1, b: 2}); 
// // Set(5) {1, 5, "some text", {…}, {…}} 
// // 这里体现了对象之间引用不同不恒等，即使值相同，Set 也能存储
// // Array 转 Set
// var mySet = new Set(["value1", "value2", "value3"]);
// // 用...操作符，将 Set 转 Array
// var myArray = [...mySet];
// String
// // String 转 Set
// var mySet = new Set('hello');  // Set(4) {"h", "e", "l", "o"}
// // 注：Set 中 toString 方法是不能将 Set 转换成 String
var mySet = new Set([1, 2, 3, 4, 4]);
console.log(mySet)