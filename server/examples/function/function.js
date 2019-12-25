// //默认参数。null是有效的参数，不会触发默认参数
// function fn(name,age=17){
//     console.log(name+","+age);
// }
// fn("Amy",null); // Amy,null
// // 不定参数
// function f(...values){
//     console.log(values.length);
// }
// f(1,2);      //2
// f(1,2,3,4);  //4
//箭头函数
var f = v => v;
//等价于
var f = function(a){
 return a;
}
f(1);  //1
// 当箭头函数没有参数或者有多个参数，要用 () 括起来。
var f = (a,b) => a+b;
// 当箭头函数要返回对象的时候，为了区分于代码块，要用 () 将对象包裹起来
var f = (id,name) => ({id: id, name: name});
//箭头函数 没有 this、super、arguments 和 new.target 绑定。
// 箭头函数体中的 this 对象，是定义函数时的对象，而不是使用函数时的对象。