/*************************
//如果你想扩展或者改变一个程序的功能，可以增加代码，但是不能改变程序的源码。
软件实体（类、模块、函数）等应该是可以扩展的，但是不可修改。
对于那些码农来说，最快捷的办法就是改变源码，但是我们面向的是更复杂的项目，
我们的目的不是当码农，而是要做一名代码艺术家，想完成一件艺术品一样去完成我们的项目
1.常用两种方法来进行开放-封闭原则代码的编写，放置挂钩和使用回调函数
放置挂钩，即我们在程序有可能发生变化的地方放置一个挂钩，挂钩的返回结果决定了程序的下一步走向
使用回调函数，我们通常把一部分易于变化的逻辑封装在回调函数中，然后将其传入一个处理回调函数的稳定和封闭函数中，
这样不同的回调函数就可以进入不同的分支中进行不同的变化，整个过程也就是封装变化的过程
*************************/
////////////////////////1.状态模式举例
////典型的if语句,如果功能继续发生变化，你必须做的就是改动原来代码的内容，这是极不可取的
// if(state === "auto"){
//     console.log("制热");
//     state = "hot";
// }else if(state === "hot"){
//     console.log("制冷");
//     state = "cold";
// }else if(state === "cold"){
//     console.log("送风");
//     state = "wind";
// }else if(state === "wind"){
//     console.log("除湿");
//     state = "dry";
// }else if(state === "dry"){
//     console.log("自动");
//     state = "auto";
// }
////按照开放封闭原则，用状态模式实现
//定义状态,如果增加状态，不用修改原来代码，增加一个状态就行了
var Auto= function(button){
    this.turn = button;
}
Auto.prototype.press= function(){
    console.log('制热');
    this.turn.setState("hot");
}
var Hot = function(button){
    this.turn = button;
}
Hot.prototype.press= function(){
    console.log('制冷');
    this.turn.setState("cold");
}
var Cold = function(button){
    this.turn = button;
}
Cold.prototype.press= function(){
    console.log('送风');
    this.turn.setState("wind");
}
var Wind = function(button){
    this.turn = button;
}
Wind.prototype.press= function(){
    console.log('除湿');
    this.turn.setState("dry");
}
var Dry = function(button){
    this.turn = button;
}
Dry.prototype.press= function(){
    console.log('自动');
    this.turn.setState("auto");
}
//定义状态仓库
var Remoter = function(){
    this.auto = new Auto(this);
    this.hot = new Hot(this);
    this.cold = new Cold(this);
    this.wind = new Wind(this);
    this.dry = new Dry(this);
    this.state = "auto";
}
Remoter.prototype.setState = function(state){
    this.state=state;
}
Remoter.prototype.press = function(){
    this[this.state].press();  //执行对应状态的press
}
Remoter.prototype.init = function(){  //定义执行者
    document.querySelector('.switch').addEventListener("click",()=>{
        this.press();
    },false);
}
new Remoter.init();  //初始化