// //创建数组
// console.log(Array.of(1, '2', true)); // [1, '2', true]
// // Array.from()
// // 将类数组对象或可迭代对象转化为数组。
// console.log(Array.from([1, , 3])); // [1, undefined, 3]
// //可选处理函数
// console.log(Array.from([1, 2, 3], (n) => n * 2)); // [2, 4, 6]
// // 一个类数组对象必须含有 length 属性，且元素属性名必须是数值或者可转换为数值的字符。
// let str = 'abc';
// console.log(Array.from(str)); // ["a", "b", "c"]
// // 查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素。
// let arr = Array.of(1, 2, 3, 4);
// console.log(arr.find(item => item > 2)); // 3
// let arr = Array.of(1, 4, 1, 3);
// // 参数1：回调函数
// // 参数2(可选)：指定回调函数中的 this 值
// console.log(arr.findIndex(item => item == 4)); // 1
// let arr = Array.of(1, 2, 3, 4);
// // 参数1：用来填充的值
// // 参数2：被填充的起始索引
// // 参数3(可选)：被填充的结束索引，默认为数组末尾
// console.log(arr.fill(0,1,2)); // [1, 0, 3, 4]
// 参数1：被修改的起始索引
// 参数2：被用来覆盖的数据的起始索引
// 参数3(可选)：被用来覆盖的数据的结束索引，默认为数组末尾
// console.log([1, 2, 3, 4].copyWithin(0,2,4)); // [3, 4, 3, 4]
// includes()
// 数组是否包含指定值。
// 注意：与 Set 和 Map 的 has 方法区分；Set 的 has 方法用于查找值；Map 的 has 方法用于查找键名。
// 参数1：包含的指定值
// [1, 2, 3].includes(1);    // true
// 嵌套数组转一维数组
// console.log([1 ,[2, 3]].flat()); // [1, 2, 3]
// 复制数组
// let arr = [1, 2],
//     arr1 = [...arr];
// console.log(arr1); // [1, 2]
// 合并数组
// console.log([...[1, 2],...[3, 4]]); // [1, 2, 3, 4]