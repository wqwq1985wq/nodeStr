/*************************
//代理模式：代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。
分类：保护代理（诸葛门童）,虚拟代理（图片预加载）,缓存代理(缓存计算结果例子)
保护代理：通过代理（门童）来处理一些不必要的东西，过滤掉无用信息，这可以理解为 保护代理
////////////////////////
代理模式包括许多小分类，在JavaScript开发中最常用的是虚拟代理和缓存代理。
虽然代理模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模。
当真正发现不方便直接访问某个对象的时候，再编写代理也不迟
*************************/
////////////////////////实现1，乘积运算
// // 乘积函数
// var mult = function(){
//   console.log( '开始计算乘积' );
//   var a = 1;
//   for ( var i = 0, l = arguments.length; i < l; i++ ){
//     a = a * arguments[i];
//   }
//   return a;
// };
// // 缓存代理函数

// var proxyMult = (function(){
//   // 缓存结果
//   var cache = {};
//   return function(){
//     // 将参数转化为字符串
//     var args = Array.prototype.join.call( arguments, ',' );
//     // 遍历缓存结果如果存在直接返回结果
//     if ( args in cache ){
//       return cache[ args ];
//     }
//     // 不存在进行计算并保存结果
//     return cache[ args ] = mult.apply( this, arguments );
//   }
// })();

// proxyMult( 1, 2, 3, 4 ); // 输出：24 
// proxyMult( 1, 2, 3, 4 ); // 输出：24
////////////////////实现2，乘积运算,加入工厂模式，让代理成为缓存通用代理
/**************** 计算乘积 *****************/
var mult = function(){
  var a = 1;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a * arguments[i];
  }
  return a;
}
/**************** 计算加和 *****************/
var plus = function(){
  var a = 0;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a + arguments[i];
  }
  return a;
}
/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function( fn ){
  // 缓存结果
  var cache = {};
  return function(){
    // 将参数转换成字符串
    var args = Array.prototype.join.call( arguments, ',' );
    // 遍历缓存结果如果存在直接返回结果
    if ( args in cache ){
      return cache[ args ];
    }
    // 不存在进行相应的计算并保存结果
    return cache[ args ] = fn.apply( this, arguments );
  }
};

// 创建乘法和加法
var proxyMult = createProxyFactory( mult ),proxyPlus = createProxyFactory( plus )

alert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24 
alert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24 
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10 
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10