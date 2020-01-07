/*************************
//状态模式：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。
解决问题：对象的行为依赖于它的状态（属性），并且可以根据它的状态改变而改变它的相关行为。
何时使用：代码中包含大量与对象状态有关的条件语句。
用状态模式这样写，在增加其他状态时，就不用修改Light类，只写相应的状态类就可以了。
如果不用状态模式，用if else，增加状态时，就要增加ifelse判断，修改Light类，这样增加了代码耦合性，不利于阅读和管理代码。
*************************/
// 定义一个State类
class State{
    constructor(self){
      this._self = self
    }
    modeSwitch(){
     throw new Error( '父类的 modeSwitch 方法必须被重写' )
    }
  }
// 单曲循环类
class SingleCycle extends State{
    modeSwitch(){
      console.log('现在是单曲循环')
      this._self.setState( this._self.listCirculation )
    }
  }
  // 列表循环类
  class ListCirculation extends State{
    modeSwitch(){
      console.log('现在是列表循环')
      this._self.setState( this._self.sequentialPlay )
    }
  }
  // 顺序播放类
  class SequentialPlay extends State{
    modeSwitch(){
      console.log('现在是顺序播放')
      this._self.setState( this._self.shufflePlay )
    }
  }
  // 随机播放类
  class ShufflePlay extends State{
    modeSwitch(){
      console.log('现在是随机播放')
      this._self.setState( this._self.singleCycle )
    }
  }
  // 音乐类
  class Music{
    constructor(){
      // 为每个状态都创建一个状态对象
      this.singleCycle = new SingleCycle(this)
      this.listCirculation = new ListCirculation(this)
      this.sequentialPlay = new SequentialPlay(this)
      this.shufflePlay = new ShufflePlay(this)
      // 定义初始状态为顺序播放
      this.currState = this.sequentialPlay
    }
    // 切换播放模式
    changeMode(){
      this.currState.modeSwitch()
    }
    // 下一次点击时的播放状态
    setState(newState){
      this.currState = newState;
    }
  }
  // 实例化音乐类
  let music = new Music()
  // 调用切换播放模式方法
  music.changeMode()
  music.changeMode()
