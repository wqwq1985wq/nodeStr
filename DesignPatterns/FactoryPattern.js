//工厂函数就是做一个对象创建的封装，并将创建的对象return出去
/*************************
//优点：
//1. 一个调用者想创建一个对象，只要知道其名称就可以了,不需要知道细节，减少出错
//2. 初始化对象，把太长的初始化工作从构造函数中分离出来
//3. 可扩展，要增加一个对象类型，增加一个“工厂”就行了
*************************/
function newObj(name,age){
    var o = new Object();
    o.name = name;
    o.age = age;
    return o;
}
var obj = newObj();
console.log(obj)

//抽象工厂：工厂的工厂，根据传入的工厂类型，生产工厂