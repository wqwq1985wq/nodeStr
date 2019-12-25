// var m1 = new Map()
// var count = 6;
// m1.set(1,{name:"wq1"})
// m1.set(2,{name:"wq2"})
// m1.set(3,{name:"wq2"})
// m1.set(4,{name:"wq4"})
// m1.set(5,{name:"wq5"})
// console.log(m1.size)
// console.log(m1.has(1))
// console.log(m1.has(2))
// console.log(m1.delete(5))
// console.log(m1.has(5))
//遍历所有，不可中断
// m1.forEach(function(v,k,m){
//   console.log(k,v)
//   if(k==1)
//   {
//     return false
//   }
// })
//遍历value，可中断
// for(var v of m1)
// {
//   console.log(v)
//   if(v==1)
//   {
//     break
//   }
// }
//遍历key，可中断,直接has更好
// for (let key of m1.keys()) {
//   console.log(key,m1.get(key));
//   if(key==1)
//   {
//     break
//   }
// }
//遍历value，可中断
// for (let v of m1.values()) {
//   console.log(v);
//   if(v==1)
//   {
//     break
//   }
// }
// //实例：寻找一个恰当的key(空位)
// var getOneKey = function(m1,maxNum)
// {
//   for (let i=1;i<=maxNum;i++) {
//     if(!m1.has(i)) return i
//   }
//   //没有找到
//   return false
// }
// console.log(getOneKey(m1,5))


