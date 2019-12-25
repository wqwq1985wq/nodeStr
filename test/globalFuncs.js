/*
 * @Author: wangqiang
 * @Date: 2019-12-03 14:54:30 
 * @Last Modified by: wangqiang
 * @Last Modified time: 2019-12-17 10:29:45
 */

/**小数点后保留2位四舍五入 */
let fixFunc = function(str)
{
    return str.toFixed(2)
}

function testFunc({x = 1 ,y = 2, z} = {}) {
    console.log("x："+x ,"y："+ y, "z："+ z);
}
