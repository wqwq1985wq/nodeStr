cc.Class({
    extends:cc.Component,

    properties: {
        manifest:{type:cc.Asset,default:null},
        lbVersion:cc.Label,
        lbDownProcess:cc.Label,
        lbDownState:cc.Label,
        btnCheck:cc.Node,
        progressBar: cc.ProgressBar,
    },

    ctor(){
        this.initData();
    },
    /**下载进度监控 */
    updateProgress : function () {
        if (this.lbDownProcess && this.manifest_newJson != null) {
            this.lbDownProcess.string = "下载" +
                "(" + this.overCount + "/" + this.updateCount + ") " +
                cc.zyUtils.utils.getSizeStr(this.overSize) + "/" + this.allSizeString +
                " (" + cc.zyUtils.utils.getSizeStr(this.lastBytes) + "/s)";
        }
        if (this.progressBar) {
            this.progressBar.progress = this.updateSize == 0 ? 0 : (this.overSize / this.updateSize > 1 ? 1 : this.overSize / this.updateSize);
        }
    },
    updateSpeed : function () {
        this.lastBytes = this.bytes;
        this.bytes = 0;
        this.updateProgress();
        this.myDownload.updateSecond();
    },
    updateFalseSpeed() {
        this.progressBar.progress += 0.005
        this.progressBar.progress = this.progressBar.progress >=1 ? 1:this.progressBar.progress
        
    },
    initData : function () {
        this.downloadCount = 3//并行下载数量
        this.bytes = 0;
        this.lastBytes = 0;
        this.record_error_items = {};
        this.updateSize = 0;
        this.updateList = [];
        this.updateCount = 0;
        this.overCount = 0;
        this.overSize = 0;
    },
    onLoad : function () {
        console.log("2048updateView in~~~~~")
        
        this.hotManifestFile = cc.zy.zyConfig.hotManifestFile
        this.lastName = cc.zy.zyConfig.lastName
        this.assetsName = cc.zy.zyConfig.assetsName
        this.lbVersion.string =cc.zy.zyConfig.version
        this.progressBar.progress = 0;
        this.lbDownProcess.node.active = false
        this.lbDownState.node.active = false;
        //非本地平台直接进
        if (!cc.sys.isNative) {
            this.schedule(this.updateFalseSpeed, 0.01);
            this.updateFalseSpeed();
            this.updateEnd()
            return;
        }
        
        this.loadLocalManifest();
    },
   
    /**加载本地manifest,检查版本 */
    loadLocalManifest : function () {
        this.lbDownState.node.active = true;
        let self = this
        console.log(this.manifest+ "")
        let gameName = cc.zy.zyConfig.gameName
        this.storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') +gameName;
        
        var hotManifest = this.storagePath + "/" + this.hotManifestFile;
        let localManifest = this.manifest+ ""
        let manifest = localManifest 
        //存在热更
        console.log("wqinfo hotManifest:",hotManifest)
        console.log("wqinfo localManifest:",localManifest)
        if (jsb.fileUtils.isFileExist(hotManifest)) {
            manifest = hotManifest
        }
        console.log("wqinfo manifest地址:",manifest)
        console.log("wqinfo 1.获取本地manifest版本信息:",manifest)
        this.lbDownState.string = "读取本地manifest"
        cc.loader.load(manifest, function (err, json) {
            console.log("wqinfo json",json)
            
            if (json != null && json.indexOf("{") == 0 ) {
                try {
                    self.manifest_json = JSON.parse(json);
                    console.log("wqinfo load manifest success",self.manifest_json.version);
                    cc.zy.zyConfig.version = self.manifest_json.version;
                    self.lbVersion.string = "v " + cc.zy.zyConfig.version;
                    self.tryNet();
                }
                catch (e) {
                    console.log(e.toString());
                    // self.lbDownProcess.string = e.toString();
                    console.log("wqinfo load manifest err1");
                    self.scheduleOnce(self.loadLocalManifest, 1);
                    return;
                }
            }
            else {
                console.log("wqinfo load manifest err:" );
                var manifest = self.storagePath + "/" + self.hotManifestFile;
                if (jsb.fileUtils.isFileExist(hotManifest)) {
                    jsb.fileUtils.removeFile(hotManifest);
                }
                // self.scheduleOnce(self.loadLocalManifest, 1);
            }
        });
    },
    tryNet() {
        var self = this
        
        let url = cc.zy.zyConfig.httpUrl1 +cc.zy.zyConfig.gameName+"/testJson.json"
        // let url = cc.zy.zyConfig.httpUrl1 +cc.zy.zyConfig.gameName+"/1.0.0.4/project.manifest"
        let needForeUpdate =false
        console.log("wqinfo 2.获取入口信息,检查版本信息",url)
        this.lbDownState.string = "拉服务器版本信息" + url
        zyHttp.get(url,
            function (json) {
                console.log(json)
                if (null != json && 0 == json.indexOf("{")) {
                    try {

                        var jsonData = JSON.parse(json);
                        console.log("wqinfo 是否跳转:",jsonData.needForeUpdate)
                        console.log("wqinfo remoteVersion:",jsonData.remoteVersion)
                        console.log("wqinfo localVersion:",cc.zy.zyConfig.version)

                        needForeUpdate = jsonData.needForeUpdate
                        //服务器数据覆盖本地数据
                        // jsonData = jsonData.gt_kt;
                        // for (var _ in jsonData) i.Config[_] = c[_];
                    } catch (e) {
                        cc.log(e.toString());
                        return;
                    }
                    
                    //强更逻辑
                    if(needForeUpdate){
                        // zyHttp.open_download_url();
                        console.log("强更跳转")
                        return
                    }
                    
                    if (jsonData.hasOwnProperty("remoteVersion") && jsonData.remoteVersion == cc.zy.zyConfig.version){
                        console.log("3.版本检查完成进入登录");
                        self.updateEnd()
                    } else {
                        console.log("wqinfo 3.获取远程manifest信息,开始更新");
                        self.manifestNewUrl = jsonData.hasOwnProperty("manifestUrl") ? jsonData.manifestUrl : null;
                        self.hotUpdateUrl = jsonData.hasOwnProperty("hotUpdateUrl") ? jsonData.hotUpdateUrl : null;
                        self.startCheckUpdate();
                    }
                } else {
                    console.log("2.1 wqinfo 入口json下载错误",url)
                }
            });
    },
    ///下载新的版本文件-----------------------------------------------------------------------
    startCheckUpdate : function () {
        this.lbDownState.string = "下载新版本manifest"
        this.lbDownProcess.node.active = true;
        this.initData();
        if (cc.zyUtils.stringUtil.isBlank(this.manifestNewUrl)) {
            this.updateEnd()
            console.log("wqinfo 没有远程manifestUrl,进入登录")
            return;
        }
        var storeManifestUrl = this.storagePath + "/" + this.lastName;
        jsb.fileUtils.createDirectory(this.storagePath + "/res/raw-assets/");
        this.myDownload = new idream.MyDownloader();
        this.myDownload.init(this.onLoadNewManifestEnd.bind(this), this.onLoadManifestError.bind(this), this.onLoadManifestProgress.bind(this));
        if (jsb.fileUtils.isFileExist(storeManifestUrl)) {
            jsb.fileUtils.removeFile(storeManifestUrl);
        }
        console.log("wqinfo ",this.manifestNewUrl, storeManifestUrl, this.lastName)
        this.myDownload.createDownloadFileTask(this.manifestNewUrl, storeManifestUrl, this.lastName);
        this.schedule(this.updateSpeed, 1);
        this.updateSpeed();
    },
    onLoadManifestProgress : function (key, bytes, total, expected) {
        if (this.updateSize == 0) {
            this.updateCount = 1;
            this.updateSize = expected;
            this.allSizeString = cc.zyUtils.utils.getSizeStr(this.updateSize);
            this.lastBytes = 0;
            this.overSize = 0;
        }
        this.bytes += bytes;
        this.overSize = total;
        this.lastBytes = bytes;
        this.updateProgress();
    },
    onLoadManifestError : function (key) {
        cc.log("3.1 wqinfo Load new manifest Error: " + key);
        this.startCheckUpdate();
    },
    onLoadNewManifestEnd : function (key) {
        var self = this;
        cc.loader.load(this.storagePath + "/" + this.lastName, function (err, json) {
            if (json != null && err == null) {
                self.manifest_newJson = json;
                console.log("3.1 wqinfo manifest下载完成")
                self.scheduleOnce(self.checkUpdate, 0.2);
            }
            else {
                console.log("3.1 wqinfo manifest下载错误")
                self.scheduleOnce(self.startCheckUpdate, 1);
            }
        });
    },
    ////检验更新文件-----------------------------------------------------------------------
    checkUpdate : function () {
        this.lbDownState.string = "对比manifest"
        console.log("3.2 wqinfo manifest对比")
        if (this.manifest_json == null || this.manifest_newJson == null) {
            this.updateEnd()
            console.log("wqinfo 检验更新文件失败,manifest_json文件不存在")
            return;
        }
        //清理下载缓存
        this.initData();

        for (var key in this.manifest_newJson.assets) {
            if (key == "" || key == null)
                continue;
            var nItem = this.manifest_newJson.assets[key];
            var oItem = this.manifest_json.assets[key];
            if (oItem == null || oItem.md5 != nItem.md5 || (key && key.indexOf(this.assetsName) != -1)) {
                if (key && key.indexOf(this.assetsName) != -1) {
                    continue;
                }
                
                if (cc.sys.localStorage.getItem(key) == nItem.md5 && jsb.fileUtils.isFileExist(this.storagePath + "/" + key)) {
                    continue;
                }
                 //manifest不下载
                 if(key.indexOf(".manifest") >=0) continue;
                this.updateList.push({ key: key, item: nItem });
                this.updateCount++;
                this.updateSize += nItem.size;
            }
        }
        this.pUrl = this.hotUpdateUrl ? this.hotUpdateUrl : this.manifest_newJson.packageUrl + "/update/";
        console.log(`wqinfo 更新概览，更新文件数：${this.updateCount},文件总大小：${this.updateSize}`)
        console.log('wqinfo updateList：');
        this.updateList.forEach((item, index) => {
            console.log(item.key);
        })
        
        this.hotUpdate();
    },

    hotUpdate : function () {
        console.log("wqinfo 开始下载")
        this.lbDownState.string = "开始下载文件"
        if (this.updateCount == 0) {
            console.log("wqinfo 待下载数量为0，下载完成")
            this.restart();
            return;
        }
        this.allSizeString = cc.zyUtils.utils.getSizeStr(this.updateSize);
        this.updateProgress();
        this.progressBar.progress = 0;
        this.myDownload.init(this.onLoadEnd.bind(this), this.onLoadError.bind(this), this.onLoadProgress.bind(this));
        if (this.manifest_json && this.updateCount > 0 && this.manifest_newJson) {
            for (var i = 0; i < this.downloadCount; i++) {
                this.downLoadNext();
            }
        }
    },

    downLoadNext : function () {
        if (this.updateList.length == 0) {
            return;
        }
        var item = this.updateList.shift();
        this.downloadItem(item);
    },

    downloadItem : function (item) {
        if (item == null) {
            this.downLoadNext();
            return;
        }
        var index = item.key == null || item.key == "" ? -1 : item.key.lastIndexOf("/");
        var name = index != -1 ? item.key.substring(index + 1, item.key.length) : "";
        if (name == "") {
            cc.log("not find name" + item.key);
            this.downLoadNext();
            return;
        }
       
        this.lbDownState.string = "start download item:" + name;
        var url = this.pUrl + item.key;
        var isReload = true;
        if (name && name.indexOf(this.assetsName) != -1) {
            url = this.manifestNewUrl;
            isReload = false;
        }
        var storeUrl = this.storagePath + "/" + item.key;
        var directory = this.storagePath + "/" + item.key.substring(0, index + 1);
        jsb.fileUtils.createDirectory(directory);
        console.log('wqinfo downloadItem',url, storeUrl,);
        this.myDownload.createDownloadFileTask(url, storeUrl, item.key, item.item.size, isReload);
    },

    onLoadProgress : function (key, bytes, total, expected) {
        this.bytes += bytes;
        this.overSize += bytes;
    },

    onLoadEnd : function (key) {
        console.log("wqinfo onLoadEnd ",key)
        this.lbDownState.string = "download over:" + key;
        var nItem = this.manifest_newJson.assets[key];
        if (nItem == null && this.newLangManifest) {
            nItem = this.newLangManifest[key];
        }
        cc.sys.localStorage.setItem(key, nItem ? nItem.md5 : "");
        this.overCount += 1;
        this.updateProgress();
        if (this.overCount >= this.updateCount) {
            this.restart();
            return;
        }
        this.downLoadNext();
    },

    onLoadError : function (key) {
        console.log("wqinfo down item error",key)
       
        this.lbDownState.string = "download error:" + key;
        var nItem = this.manifest_newJson.assets[key];
        if (nItem == null && this.newLangManifest) {
            nItem = this.newLangManifest[key];
        }
        if (nItem) {
            this.updateList.push({ key: key, item: nItem });
            this.downLoadNext();
        }
        this.record_error_items[key] = this.record_error_items[key] ? this.record_error_items[key] + 1 : 1;
        if (this.record_error_items[key] > 999) {
            this.record_error_items[key] = 0;
            this.httpError.active = true;
            return;
        }
    },
    //下载完成------------------------------------------------------------
    restart : function () {
        console.log("wqinfo 覆盖新的manifest文件")
        this.lbDownState.string = "加载完成"
        if(this.storagePath)
        {
            var manifest = this.storagePath + "/" + this.hotManifestFile;
            if (jsb.fileUtils.isFileExist(manifest)) {
                jsb.fileUtils.removeFile(manifest);
            }

            jsb.fileUtils.renameFile(this.storagePath + "/" + this.lastName, manifest);
            //这里会报错
            // this.myDownload.clearJSBDownload();
        }
        // //更新版本信息
        cc.zy.zyConfig.version = this.manifest_newJson.version;
        var searchPaths = jsb.fileUtils.getSearchPaths();
        var arr = [];
        this.unscheduleAllCallbacks();
        arr.push(this.storagePath + "/");
        for (var i = 0; i < searchPaths.length; i++) {
            if (arr && arr.indexOf(searchPaths[i]) == -1) {
                arr.push(searchPaths[i]);
            }
        }
        
        cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(arr));
        this.onDestroy();
        cc.sys.garbageCollect();
        jsb.fileUtils.setSearchPaths(arr);
        cc.game.restart();
    },
    //update完成，进入下一步
    updateEnd(){
        console.log("wqinfo update 结束 2048" + cc.zy.zyConfig.gameName)
        setTimeout(() => {
            cc.director.loadScene("loginScene");
        }, 1000);
        
    },
    onDestroy : function () {
        this.loadLocalManifest = null;
        this.allSizeString = "";
        this.record_error_items = null;
        this.manifest_json = null;
        this.manifest_newJson = null;
        this.updateList = null;
    },
    
    onClickCheck:function(){

    }
    

});