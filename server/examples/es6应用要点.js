// //1.let取代var
// if (true) {
//     let x = 'hello';
//   }
  
//   for (let i = 0; i < 10; i++) {
//     console.log(i);
//   }
//   // bad
// var a = 1, b = 2, c = 3;

// // good
// const a = 1;
// const b = 2;
// const c = 3;

// // best
// const [a, b, c] = [1, 2, 3];
// //2.字符串
// // 静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
// const a = 'foobar';
// const b = `foo${a}bar`;

// console.log(a,b)
// //4.对象定义
// // 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
// const a = { k1: v1, k2: v2 };
// const b = {
//   k1: v1,
//   k2: v2,
// };
// //5.数组
// // 使用扩展运算符（...）拷贝数组。
// // bad
// const len = items.length;
// const itemsCopy = [];
// let i;

// for (i = 0; i < len; i++) {
//   itemsCopy[i] = items[i];
// }

// // good
// const itemsCopy = [...items];
// 6.函数
// 立即执行函数可以写成箭头函数的形式。
// bad
// [1, 2, 3].map(function (x) {
//     return x * x;
//   });
  
//   // good
//   [1, 2, 3].map((x) => {
//     return x * x;
//   });
  
//   // best
//   var na = [1, 2, 3].map(x => x * x);
// console.log(na)
//使用...args替代arguments
// // bad
// function concatenateAll() {
//     const args = Array.prototype.slice.call(arguments);
//     return args.join('');
//   }
  
//   // good
//   function concatenateAll(...args) {
//     return args.join('');
//   }
// 使用默认值语法设置函数参数的默认值。
// // bad
// function handleThings(opts) {
//   opts = opts || {};
// }

// // good
// function handleThings(opts = {}) {
//   // ...
// }
// 7.Map 结构
// 注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。
// 如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
var map = new Map([[1, 2], [2, 3]])
// var first = new Map([
//     [1, 'one'],
//     [2, 'two'],
//     [3, 'three'],
//   ]);

for (let key of map.keys()) {
  console.log(key);
}
// 8.使用class和继承，减少使用protoType