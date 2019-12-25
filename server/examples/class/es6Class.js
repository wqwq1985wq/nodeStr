// //es5对象原型的办法实现类和对象
// function Point(x, y) {
//     this.x = x;
//     this.y = y;
//   }
  
//   Point.prototype.toString = function () {
//     return '(' + this.x + ', ' + this.y + ')';
//   };
  
// //   var p = new Point(1, 2);
// //es6 class，是原型的一个语法糖
class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
    get prop() {
        return 'getter';
      }
      set prop(value) {
        console.log('setter: '+value);
    }
    // static var;//error 静态属性只能写到外边
    static classMethod() {
        return 'static method' + this.v1;
      }
}
Point.v1 = 10 //静态属性只能写到外边
var p = new Point(1, 2);
console.log(p.toString())
//es6类的实质，就是es5的原型实现类
//类的构造函数指向类本身
//所有方法都定义再prototype上
// Point.prototype.constructor === Point // true
// 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
// 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
//出发直接把方法定义到类上，作为静态函数。否则都是在原型上
// point.hasOwnProperty('toString') // false
// point.__proto__.hasOwnProperty('toString') // true
//类的所有实例共享一个prototype.
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__ //true
//set和get会拦截属性的读取
p1.prop = 123;
// 类和模块的内部，默认就是严格模式,
// 未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式
//静态方法加static
console.log(Point.classMethod())
// console.log(p1.classMethod())//error
//子类继承父类的所有静态非静态方法
class sp extends Point {
    constructor(x,y,color)
    {
        super(x,y)//必须使用
    }
}
sp.v1 = 30
console.log(Point.classMethod())//10
console.log(sp.classMethod())//30  两个静态量是独立的
console.log("-----------------------------------继承")
// Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。


