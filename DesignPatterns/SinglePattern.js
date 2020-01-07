//单例模式是创建对象的一种模式，保证一个类仅有一个实例，并提供一个访问它的全局访问点。
//优点：1.在内存里只有一个实例，减少了内存的开销，尤其是频繁的创建和销毁实例
//2.避免对资源的多重占用（比如写文件操作）
//使用场景：
//只需要生成一个唯一对象的时候，比如说页面登录框，只可能有一个登录框，
//那么你就可以用单例的思想去实现他，当然你不用单例的思想实现也行，那带来的结果可能就是你每次要显示登陆框的时候都要重新生成一个登陆框并显示（耗费性能），或者是不小心显示出了两个登录框

//js文件天生就是一个单例。每次require实际是同一个js

//一个单例类一个文件，调用
// let instance1 = require("./SinglePattern/singleFile1").getInstance
// let instance2 = require("./SinglePattern/singleFile1").getInstance
// console.log(instance1 === instance2 ) //true

//实现4，直接命名空间对象
//// 使用命名空间
//// 在JavaScript里，实现单例的方式有很多种，其中最简单的一个方式是使用对象字面量的方法，其字面量里可以包含大量的属性和方法：

// let people = {
//   name: "Jack",
//   age: 18,
//   play() {
//     console.log('i like game');
//   }
// }
// //还可以动态地创建命名空间

// // 定义对象
// var MyApp = {};
// // 对象的方法
// MyApp.namespace = function( name ){
//   // 将参数分割成数组
//   var parts = name.split( '.' );
//   // 定义变量
//   var current = MyApp;
//   // 创建对象里面的属性
//   for ( var i in parts ){
//     if ( !current[ parts[ i ] ] ){
//       current[ parts[ i ] ] = {};
//     }
//     current = current[ parts[ i ] ];
//   }
// };
// MyApp.namespace( 'event' );
// MyApp.namespace( 'dom.style' );

// /******************* 上面没看懂没关系 ***********************/
// // 上述代码等价于
// var MyApp = {
//   event: {},
//   dom: {
//     style: {}
//   } 
// };
//实现3，闭包实现
// var Instance = (function(){
//     var obj;
//     return function(){
//         if(obj === undefined) obj = new Date();
//         return obj;
//     }
// })();
// var ibs = Instance();
/////实现2 ，解耦，init 和getinstance分离
// var CreateDiv = function (param) {
//     this.param = param;
//     this.init();
// };

// CreateDiv.prototype.init = function () {
//     //do init
// };
// let getInstance = (function () {
//     var instance;
//     return function (param) {
//         if (!instance) {
//             instance = new CreateDiv(param);
//         }
//         return instance;
//     }
// })();

// var a = new getInstance();
// var b = new getInstance();
// console.log(a === b)//true


////////////////////////实现1，又臭又长的基于“类”的单例
// var Singleton = function( name ){
//     this.name = name;
// };

// Singleton.prototype.getName = function(){
// 　　 alert ( this.name );
// };

// Singleton.getInstance = (function(){ 
// 　　var instance = null;

// 　　return function( name ){
// 　　　　　　　　　　if ( !instance ){
// 　　　　　　　　　　　　instance = new Singleton( name );
// 　　　　　　　　　　}
// 　　　　　　　　return instance;
// 　　　　　　 }
// })();
// console.log(Singleton.getInstance("wq").name)
// let obj = Singleton.getInstance("cc")
// console.log(obj.name)