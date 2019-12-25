var Player = require("./Player")
var gv = require("../tools/globalVar")
const gf = require("../tools/globalFuncs")
class PlayerManager {
  
  constructor()
  {
    this.playerIndex = 1
    this.playerMap = new Map();
  }
  static getInstance(){   /*单例*/
    if(!PlayerManager.instance){

      PlayerManager.instance=new PlayerManager();
    }
    return PlayerManager.instance;
  }
  getOnePlayer(name)
  {
    if(!name)
    {
        name = "guest"+gf.getClientTime()
    }
    if(this.playerMap.has(name)) return this.playerMap.get(name)
    var player = new Player({name})
    this.playerMap.set(name,player)
    return player
  }
  
};

module.exports =PlayerManager.getInstance()