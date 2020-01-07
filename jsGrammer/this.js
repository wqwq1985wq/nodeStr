////////////////////////函数中的this基本都指向函数的调用者
function demo1() {

    console.log(this)

}

// 示例二

var demo2 = {

    log() {

        console.log(this)

    }

}

// 示例三

var demo3= {

    log() {

        setTimeout(function print(){ // 给一个函数名方便理解

            console.log(this)

        },1000)

    }

}

demo1() // window；

demo2.log() // {log: f}；

demo3.log() // 函数print
console.log("////////////////////////")
// ////////////////////////全局中的this
//全局中的this默认是一个空对象。并且在全局中this与global对象没有任何的关系：
console.log(this) //{}
this.num = 10;
console.log(this.num); //10
console.log(global.num); //undefined

console.log("////////////////////////")
////////////////////////函数中this
// 在函数中this指向的是global对象，和全局中的this不是同一个对象，
// 简单来说，你在函数中通过this定义的变量就是相当于给global添加了一个属性，
// 此时与全局中的this已经没有关系了。
//global被当前函数所在作用域的其他函数共用
function fn(){
    this.num = 10;
}
function fn2(){
    this.num = 20;
}
fn();
console.log(this); {}
console.log(this.num); //undefined
console.log(global.num);// 10
fn2()
console.log(global.num);// 20

console.log("////////////////////////")
////////////////////////构造函数中this
// 在构造函数中this指向的是它的实例，而不是global。
var fa1= new fn()
console.log(global.num)//20
var fa2= new fn2()
console.log(global.num)//20
console.log(fa1.num) //10
console.log(fa2.num) //20
function fn3(){
    function fn4(){
    
        this.age = 18;
    }
    function fn5(){
    
        this.age = 19;
        }
    fn4();
    fn5();
    // console.log(this); //global
    console.log(this.age); //19
    console.log(global.age); //19
}
fn3();
console.log("////////////////////////")
// 文件全局中的this指向的是module.exports。
console.log("------------------全局")
this.num = 10
console.log(module.exports);// {num:10}
console.log(module.exports.num);//10
console.log(global.num); //20
