function Utils() {
    //-----------------------------------------------------------
    /***颜色品质的颜色*/
    this.BLACK = cc.Color.BLACK;
    this.WHITE = cc.Color.WHITE;
    this.GREEN = cc.Color.WHITE.fromHEX("#12F849");
    this.BLUE = cc.Color.WHITE.fromHEX("#0072f8");
    this.PURPLE = cc.Color.WHITE.fromHEX("#ea00ff");
    this.ORANGE = cc.Color.WHITE.fromHEX("#e55103");
    this.RED = cc.Color.WHITE.fromHEX("#DD1717");
    this.GOLDEN = cc.Color.WHITE.fromHEX("#FFC548");
    this.UNIQUE = cc.Color.WHITE.fromHEX("#FDFAF1");
    this.GRAY = cc.Color.WHITE.fromHEX("#AAAAAA");
    this.BLACK_GREEN = cc.Color.WHITE.fromHEX("#309c1b");
    this._uiMap = {};//prefab ui layer记录
    this._midLayer = null;
    this._topLayer = null;
    this._textCache = {};
    this._isExit = false;//是否已经登出游戏
    this._loadPrefabs = {};//正在加载的prefab
    this.isCollect = false;
    // this.releaseObjs = {};
    //获取等待网络连接的UI
    this.waitUI = null;
    this.retryUI = null;
    //弹出获得提示
    this.poplist = [];
    this.isPop = false;
    //正在加载的界面数量
    this._isLoadingNum = 0;
    //是否正在释放资源
    this._isReleasingNum = 0;
    //资源引用计数
    this.resCountMap = {};

    this.enterGame=function (gameName,sceneName) {
        let oldName = cc.zy.zyConfig.gameName
        console.log(`wqinfo 进入游戏 :old name ${oldName},new game ${gameName}`)
        cc.zy.zyConfig.gameName = gameName
        //直接切换游戏
        if (cc.sys.isNative ) {
            
            cc.curGameHotPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + cc.zy.zyConfig.gameName;
            if(jsb.fileUtils.isFileExist(cc.curGameHotPath + "/src/settings.js"))
            {
                console.log("wqinfo 已经下载过了，直接进入游戏",cc.zy.zyConfig.gameName)
                var searchPaths = jsb.fileUtils.getSearchPaths();
                console.log('addSearchPath before: ' + searchPaths);
                searchPaths.unshift(cc.curGameHotPath);
                jsb.fileUtils.setSearchPaths(searchPaths);
                console.log('addSearchPath after: ' + searchPaths);
                window.require("src/enterGameMain.js")
            }
            else{
                console.log("wqinfo 下载整个游戏")
                cc.loadSubGameName = gameName
                cc.director.loadScene("UpdateSubGame");
            }
        }else{
            console.log("网页版处理进入子游戏")
            if(document)
            {
                var subGameJs = document.createElement('script');
                subGameJs.async = true;
                subGameJs.src = gameName + "/src/project.js"
                subGameJs.id = "src"+gameName
                document.body.appendChild(subGameJs);
                window.bootSubGame(gameName);
            }else{
                console.log("游戏加载错误")
            }
            
        }
        
    },
    this.exitGame= function () {
        let gameName = cc.zy.zyConfig.gameName
        console.log("wqinfo exit game ",cc.zy.zyConfig.gameName)
        //返回游戏，删除子项目搜索路径
		if (cc.sys.isNative){
			var searchPaths = jsb.fileUtils.getSearchPaths();
			console.log('addSearchPath before: ' + searchPaths);
			var m = searchPaths.slice(1);
			jsb.fileUtils.setSearchPaths(m);
			console.log('addSearchPath after: ' + m);
			window.require("src/exitGameMain.js")
        }
        else
        {
            console.log("网页版处理退出子游戏",cc.zy.zyConfig.gameName)
            let node =  document.getElementById("src"+gameName)
            if(node)
            {
                document.body.removeChild(node);
            }
            
            window.boot();
        }
            
    },
    this.getProBufferData= function ({msgName,obj}) {
        let msg = require("protoFile")[msgName]
        let message = msg.Login.create(obj)
        let messageBuf = msg.Login.encode(message).finish();
        
        let msgType = 2//包头号
        //二进制数据的长度+一个short的长度
        var sendBuf = new ArrayBuffer(messageBuf.length + 2);
        var dv = new DataView(sendBuf);
        dv.setInt16(0,msgType); //写入一个short包头
        //将二进制数据写入
        var u8view = new Uint8Array(sendBuf, 2); //跳过一个short的距离
        for (var i = 0, strLen = messageBuf.length; i < strLen; ++i){
            u8view[i] = messageBuf[i];
        }
        return sendBuf //ArrayBuffer
    }
}

cc.zy.zyUtils = Utils
cc.zy.zyUtils = new Utils();

////////////////////////弹窗类
//可以排队列表显示
function Alert() {
    //缓存alertPrefab
    this.alertPrefabmap = {};
    this.alertList = new Array();

    //标准显示隐藏
    this.alert = function (val, opt, color) {
        this.alertBy("AlertUI", { text: val, textOpt: opt, textColor: color });
    };

    this.alert18n = function (val, color) {
        this.alert(val, {}, color);
    };

    this.alertItemLimit = function (id, count) {
        if(id == 1 && PlatUtils.isPingbiBuy()){
            cc.zy.alertUtil.alert("元宝不足");
            return;
        }
        if (count === void 0) { count = 0; }
        var item = localcache.getItem(localdb.table_item, id);
        if (item) {
            this.alert("COMMON_LIMIT", { n: item.name });
        }
        facade.send("ITEM_LIMIT_GO", { id: id, count: count });
    };

    this.alertIcon = function (val, url, color) {
        this.alertBy("AlertIcon", { text: val, url: url, textColor: color });
    };

    this.alertBy = function (name, args) {
        var prefab = this.alertPrefabmap[name];
        if (prefab != null) {
            this.alertShow(name, args);
        }
        else {
            var url = "gb/prefabs/ui/" + name;
            var self = this;
            cc.loader.loadRes(url, function (err, prefab) {
                if (prefab != null) {
                    cc.zy.uiUtils.saveAssets(url);
                    self.alertPrefabmap[name] = prefab;
                    self.alertShow(name, args);
                }
                else {
                    cc.warn(err + " name load error!!!");
                }
            });
        }
    };

    this.alertShow = function (name, args) {
        var node = cc.instantiate(this.alertPrefabmap[name]);
        if (node) {
            node.y = 100;
            var comp = node.getComponent(name);
            for (var k in args) {
                if (comp)
                    comp[k] = args[k];
                else
                    cc.log(name + " is not find");
            }
            this.alertAddToQueue(node, comp);
        }
        else {
            cc.warn("alert show " + name + " is error!!!");
        }
    };

    this.alertAddToQueue = function (node, comp) {
        var self = this;
        comp.endCall = function () {
            self.alertList.splice(self.alertList.indexOf(comp), 1);
        };
        cc.director.getScene().getChildByName("Canvas").addChild(node);
        this.alertList.push(comp);
        //如果当前已后其它Alert，则将其往上顶
        var h = node.height + 60;
        for (var i = 0, len = this.alertList.length - 1; i < len; i++) {
            if (this.alertList[i] && this.alertList[i].node)
                this.alertList[i].node.y += h;
        }
    };

    this.alertVipTips = function (type) {  //判断此一键功能开启的vip等级
        var vipList = localcache.getList(localdb.table_vip);
        var vipLevel = 0;
        for (let i = 0; i < vipList.length; i++) {
            if (vipList[i][type]) {
                vipLevel = vipList[i].vip;
                break;
            }
        }
        console.log("cpc=alertVipTips>",vipLevel);
        return vipLevel;
    };

    this.jumpVipView = function (vipOpen) {  //判断此一键功能开启的vip等级
        initializer.playerProxy.oneKeyVip = vipOpen;
        cc.zy.zyUtils.openPrefabView("welfare/RechargeView");
    };
}

exports.Alert = Alert;
exports.alertUtil = new Alert();

