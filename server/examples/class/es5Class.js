function Person(){

    this.name='张三';  /*属性*/
    this.age=20;
    this.run=function(){

        console.log(this.name+'在运动');
    }

}
//原型链上面的属性会被多个实例共享   构造函数不会
Person.prototype.sex="男";
Person.prototype.work=function(){
    console.log(this.name+'在工作');

}

//----------------------------------------声明静态方法    
Person.getInfo=function(){

    console.log('我是静态方法');
}
// var p=new Person();
// // console.log(p.name);
// // p.run();
// p.work(); //调用原型方法
// //调用静态方法
// Person.getInfo();

// console.log("----------------------------------------继承1,对象冒充实现继承")
//对象冒充实现继承：只能继承构造函数里的方法
// //Web类 继承Person类   使用原型链+对象冒充的组合继承模式
// function Web(){
//     Person.call(this);    /*对象冒充实现继承*/
// }

// var w=new Web();
// // w.run();  //对象冒充可以继承构造函数里面的属性和方法
// w.work();  // error 但是没法继承原型链上面的属性和方法
// // w.getInfo();//error

// console.log("----------------------------------------继承2,原型链实现继承")
// //原型链实现继承:可以继承构造函数里面的属性和方法 也可以继承原型链上面的属性和方法
// function Web(){
  
// }
// Web.prototype=new Person();   //原型链实现继承
// var w=new Web();

// w.run();
// w.work();
// // w.getInfo()//无法继承静态方法，实例化子类无法给父类传参
// console.log("----------------------------------------继承3,两者结合")
// //两者组合
//   function Web(name,age){

//       Person.call(this,name,age);   //对象冒充继承   实例化子类可以给父类传参
//   }
// Web.prototype=new Person();   //原型链实现继承
// var w=new Web();

// w.run();
// w.work();
// w.getInfo()//无法继承静态方法