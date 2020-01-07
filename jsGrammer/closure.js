/*************************
//闭包是指有权访问另一个函数作用域中的变量的函数
优点：
缺点：闭包虽然好，但是之所以我们能从外部访问到函数的内部，是因为函数内部的作用域没有被回收，
而这部分没有被回收的作用域是需要占用内存的。所以当不需要用到声明的闭包的时候，我们应该对他进行显性标记。如上例我们可以执行moneyCount = null;来清空引用。
*************************/
// var money = 0
// function moneyCount(){
//     var money = 0;
//     return {
//         getMoney:function (){
//             return money;
//         },
//         increase:function (){
//             money += 1;
//         },
//         decrease:function (){
//             money -= 1;
//         }
//     };
// }
// var moneyCount = moneyCount();
// money = 99999;//此money非彼money
// console.log(moneyCount.getMoney())//0
// console.log(moneyCount.increase())
// console.log(moneyCount.getMoney())//1
////////////////////////词法作用域
// var value = 1;
// function foo() {
//     console.log(value);
// }
// function bar() {
//     var value = 2;
//     foo();
// }
// bar();//1
// var value = 1;
// function foo() {
//     console.log(value);
// }
// function bar() {
//     value = 2;
//     foo();
// }
// bar();//2
// var value = 1;
// function bar() {
//     var value = 2;
//     function foo() {
//         console.log(value);
//     }
//     foo();
// }
// bar();//2
////////////////////////es5 变量提升和解决办法
////////////////////////es6 直接let,const 解决
// for(var i=0; i<10; i++){
//     console.info(i)
// }
// console.log(i)  // 变量提升，弹出10

// //为了避免i的提升可以这样做
// (function () {
//     for(var i=0; i<10; i++){
//          console.info(i)
//     }
// })()
// console.log(i)   // underfined   因为i随着闭包函数的退出，执行环境销毁，变量回收
////////////////////////闭包解决递归
// function  factorial(num) {
//     if(num<= 1) {
//         return 1;
//     } else {
//        return num * factorial(num-1)
//     }
//  }
//  var anotherFactorial = factorial
//  factorial = null
//  anotherFactorial(4)
////////////////////////this指向问题
// var object = {
//     name: "object",
//     getName: function() {
//        return function() {
//             console.info(this.name)
//        }
//    }
// }
// object.getName()()    // underfined
// 因为里面的闭包函数是在window作用域下执行的，也就是说，this指向windows
////////////////////////引用的变量发生了变化
// function outer() {
//     var result = [];
//     for (var i = 0; i<10;i++){
//       result[i] = function () {
//           console.info(i)
//       }
//    }
//    return result
// }
// let a1 = outer()
// for (let index = 0; index < a1.length; index++) {
//     const element = a1[index];
//     element()
// }
//10个10