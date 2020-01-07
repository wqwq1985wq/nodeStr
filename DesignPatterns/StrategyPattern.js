/*************************
//策略模式：将定义的一组算法封装起来，使其相互之间可以替换。封装的算法具有一定的独立性，不会随客户端的变化而变化
优点：
1. 优化多重条件判断，采用策略模式是的算法更利于维护
2. 可扩展性，策略模式提供了对“开闭原则”的完美支持，用户可以在不修改原有系统的基础上选择算法或行为，也可以灵活地增加新的算法或行为。
3. 策略类之间可以自由切换，由于策略类都实现同一个接口，所以使它们之间可以自由切换。
*************************/
//不用策略模式，使用if结构
// 例如要写一个计算两个数加减乘除的方法，会有人这么写
// countNum(type, num1, num2) {
//     if(type === 'add'){
//       return num1 + num2
//     } else if(type === 'subtract'){
//       return num1 - num2
//     } else if(type === 'multiply'){
//       return num1 * num2
//     } else {
//       return num1 / num2
//     }
//   }
  
//   countNum('add', 9, 3)       // 12
//   countNum('subtract', 9, 3)  // 6
//   countNum('multiply', 9, 3)  // 27
//   countNum('', 9, 3)          // 3
//实现1：加减乘除
// let countNum = {
//     add(num1, num2) {
//       return num1 + num2
//     },
//     subtract(num1, num2) {
//       return num1 - num2
//     },
//     multiply(num1, num2) {
//       return num1 * num2
//     },
//     divide(num1, num2) {
//       return num1 / num2
//     },
//   }
  
//   countNum.add(9, 3)      // 12
//   countNum.subtract(9, 3) // 6
//   countNum.multiply(9, 3) // 27
//   countNum.divide(9, 3)   // 3
////////////实现2，圣诞打折
// // 定义一个策略对象
// let priceceStrategy = function(){
//     // 内部算法对象 
//     let strategy = {
//       return30(price){
//         return price + parseInt(price / 100) * 30
//       },
//       return50(price){
//         return price + parseInt(price / 100) * 50
//       },
//       price80(price){
//         return price  * 80 / 100
//       },
//       price90(price){
//         return price  * 90 / 100
//       }
//     }
//     // 策略方法调用接口
//     return {
//       strategyFunction(type, price) {
//         return strategy[type] && strategy[type](price)
//       },
//       // 添加算法
//       addStrategy(type, fn){
//         strategy[type] = fn
//       }
//     }
//   }()
  
//   priceceStrategy.strategyFunction('return30', 100)   // 130
//   priceceStrategy.strategyFunction('return50', 100)   // 150
//   priceceStrategy.strategyFunction('price80', 100)    // 80
//   priceceStrategy.strategyFunction('price90', 100)    // 90
//   // 添加一个算法
//   priceceStrategy.addStrategy('return70', (price) => {
//     return price + parseInt(price / 100) * 70
//   })
//   console.log(priceceStrategy.strategyFunction('return70', 100))  // 170