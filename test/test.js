/*
 * @Author: wangqiang
 * @Date: 2019-12-03 14:54:30 
 * @Last Modified by: wangqiang
 * @Last Modified time: 2019-12-24 12:43:12
 */



// /**小数点后保留2位四舍五入 */
// let fixFunc = function(str)
// {
//     return str.toFixed(2)
// }

// function testFunc({x = 1 ,y = 2, z} = {}) {
//     console.log("x："+x ,"y："+ y, "z："+ z);
// }
// testFunc();
// testFunc({x:100,y:200});
// testFunc({x:100});

// // 本意是a=b.然后执行函数。
// a = b        // 赋值
// (function(){
//     //....
// })()         // 自执行函数
// // 未加分号，结果被解析成

// a = b(function(){//...})()  //将b()()返回的结果赋值给a

// // 在需要以{}闭合的代码段前增加换行，如：for if
//  // 没有换行，小的代码段无法区分
//  if (wl && wl.length) {
//      for (i = 0, l = wl.length; i < l; ++i) {
//          p = wl[i];
//          type = Y.Lang.type(r[p]);
//          if (s.hasOwnProperty(p)) {
//              if (merge && type == 'object') {
//                  Y.mix(r[p], s[p]);
//              } else if (ov || !(p in r)) {
//                  r[p] = s[p];
//              }
//          }
//      }
//  }
//  // 有了换行，逻辑清楚多了
//  if (wl && wl.length) {

//      for (i = 0, l = wl.length; i < l; ++i) {
//          p = wl[i];
//          type = Y.Lang.type(r[p]);

//          if (s.hasOwnProperty(p)) {
//              // 处理merge逻辑
//              if (merge && type == 'object') {
//                  Y.mix(r[p], s[p]);
//              } else if (ov || !(p in r)) {
//                  r[p] = s[p];
//              }
//          }
//      }
//  }
// 换行可以是空行，也可以是注释

// // 除了三目运算，if,else等禁止简写
//  // 正确的书写
//  if (true) {
//      alert(name);
//  }
//  console.log(name);
//  // 不推荐的书写
//  if (true)
//      alert(name);
//  console.log(name);
//  // 不推荐的书写
//  if (true)
//  alert(name);
//  console.log(name)

// name = config.Config.skin + "/prefabs/ui/" + name + "fwefewew \
// ewewewewewewewewewewewewewewewewewewewewewewewewewewewewew";
// var isDealSub = arguments.length > 4 && arguments[4] !== undefined &&  
// arguments[3] <10? arguments[4] : true;
// // let a
// // [].forEach(element => {
// //     let a
// // });

// let setHandler = function(t,handler)
// {
//     this.target = t
//     this.handler = handler
// }
// if(this.handler && this.target)
// {
//     this.handler.apply(this.target, param)
// }
    
// let name = node.name
// if(node.name && node.name.indexOf("like") > 0 && node.name.indexOf("aa") < 5)
// {
//     let newStr = node.name
// }

// var nowTime = globalFun.getClientTime();
// if(globalFun.getClientTime() > time1){
//     let timeStr1 = globalFun.getClientTime() * globalFun.getClientTime() + (globalFun.getClientTime()/2)
// }
// (function () {
//     for (var i = 0; i < 3; i++) {
//         for (var j = 0; j < 3; j++) {
//             if (i === 1 && j === 1) {
//                 return;
//             }
//             console.log('i=' + i + ',j=' + j);
//         }
//     }
// })();
