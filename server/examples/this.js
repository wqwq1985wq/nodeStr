// //function里的this永远指向function的调用者，这里a的调用者是global
// // this的指向在函数创建的时候是决定不了的，在调用的时候才能决定
// function a(){
//     var user = "追梦子";
//     console.log(this.user); //undefined
//     console.log(this); //Window/global
// }
// a();// == global.a()
// //这里调用者是o
// var o = {
//     user:"追梦子",
//     fn:function(){
//         console.log(this.user);  //追梦子
//     }
// }
// o.fn();
//严格模式,es6，模块全局量不会自动赋值给全局global
// var o = {
//     user:"追梦子",
//     fn:function(){
//         console.log(this.user); //追梦子
//     }
// }
// var a = 10
// console.log(global.a)
//this指向的是上一级对象，而不是最外层对象
// var o = {
//     a:10,
//     b:{
//         a:12,
//         fn:function(){
//             console.log(this.a); //12
//         }
//     }
// }
// o.b.fn();
// var o = {
//     a:10,
//     b:{
//         // a:12,
//         fn:function(){
//             console.log(this.a); //undefined
//         }
//     }
// }
// o.b.fn();
//this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的
//也就是赋值有很多层，但是最后调用是global 调用的j
// var o = {
//     a:10,
//     b:{
//         a:12,
//         fn:function(){
//             console.log(this.a); //undefined
//             console.log(this); //global
//         }
//     }
// }
// var j = o.b.fn;
// j();
//new 相当于创建一个对象实例，改变了this指向,
// function Fn(){
//     this.user = "追梦子";
// }
// var a = new Fn();
// console.log(a.user); //追梦子
//如果返回值是一个对象，那么this指向的就是那个返回的对象，
// function fn()  
// {  
//     this.user = '追梦子';  
//     return {};  
// }
// var a = new fn;  
// console.log(a.user); //undefined
// // 如果返回值不是一个对象那么this还是指向函数的实例。
// function fn()  
// {  
//     this.user = '追梦子';  
//     return undefined;//return 1
// }
// var a = new fn;  
// console.log(a.user); //追梦子
//在严格版中的默认的this不再是window，而是undefined。
//new操作符会改变函数this的指向问题
//applay会改变函数的调用者
function fn()  
{  
    console.log(this.a)//10
}
var o = {
    a:10
}
fn.apply(o)