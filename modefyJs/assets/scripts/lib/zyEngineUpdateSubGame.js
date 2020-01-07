cc.Class({
    extends:cc.Component,

    properties: {
        lbVersion:cc.Label,
        lbDownProcess:cc.Label,
        lbDownState:cc.Label,
        progressBar: cc.ProgressBar,
        lbDownSub:cc.Label,
    },

    ctor(){
        this.initData();
    },
    /**下载进度监控 */
    updateProgress : function () {
        if (this.lbDownProcess) {
            this.lbDownProcess.string = "下载" +
                "(" + this.overCount + "/" + this.updateCount + ") " +
                cc.zy.zyUtils.getSizeStr(this.overSize) + "/" + this.allSizeString +
                " (" + cc.zy.zyUtils.getSizeStr(this.lastBytes) + "/s)";
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
        console.log("updateSubGame in~~~~~")
        this.hotManifestFile = cc.zy.zyConfig.hotManifestFile
        this.lastName = cc.zy.zyConfig.lastName
        this.progressBar.progress = 0;
        this.lbDownProcess.node.active = false;
        this.lbDownState.node.active = false;
        
        this.lbVersion.node.active = false;
        if(!cc.loadSubGameName )
        {
            this.downGameEnd()
            return;
        }

        let gameName = cc.loadSubGameName
        this.lbDownSub.string = "下载子游戏:" + gameName
        this.hotRootDir = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') +gameName;
        
        //非本地平台直接进
        if (!cc.sys.isNative) {
            this.schedule(this.updateFalseSpeed, 0.01);
            this.updateFalseSpeed();
            this.downGameEnd()
            return;
        }else{
            this.startDownGame()
        }
    },
    startDownGame(){
        this.lbDownState.node.active = true;
        let gameName = cc.loadSubGameName
        console.log("wqinfo 初次下载子游戏",gameName)
        var self = this
        this.lbDownState.string = "拉取子游戏版本信息"
        let url = cc.zy.zyConfig.httpUrl1 + gameName +"/testJson.json"
        console.log("wqinfo 1.拉游戏最新版本信息",url)
        zyHttp.get(url,
            function (json) {
                if (null != json && 0 == json.indexOf("{")) {
                    try {
                        var jsonData = JSON.parse(json);
                        console.log("wqinfo remoteVersion:",jsonData.remoteVersion)
                    } catch (e) {
                        cc.log(e.toString());
                        this.lbDownState.string = "拉取文件失败，下载失败"
                        console.log("拉取文件失败，下载失败")
                        return;
                    }
                    
                    console.log("wqinfo 2.下载manifest");
                    self.manifestNewUrl = jsonData.hasOwnProperty("manifestUrl") ? jsonData.manifestUrl : null;
                    self.hotUpdateUrl = jsonData.hasOwnProperty("hotUpdateUrl") ? jsonData.hotUpdateUrl : null;
                    self.startCheckUpdate();
                } else {
                    console.log("2.1 wqinfo 入口json下载错误",url)
                }
            });
    },
    ///下载新的版本文件-----------------------------------------------------------------------
    startCheckUpdate : function () {
        this.lbDownProcess.node.active = true;
        this.lbDownState.string = "下载版本文件"
        this.initData();
        if (cc.zy.zyUtils.stringUtil.isBlank(this.manifestNewUrl)) {
            this.downGameEnd()
            console.log("wqinfo 没有远程manifestUrl,进入登录")
            this.lbDownState.string = "没有远程manifestUrl,进入登录"
            return;
        }
        var storeManifestUrl = this.hotRootDir + "/" + this.lastName;
        jsb.fileUtils.createDirectory(this.hotRootDir + "/res/raw-assets/");
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
            this.allSizeString = cc.zy.zyUtils.getSizeStr(this.updateSize);
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
        cc.loader.load(this.hotRootDir + "/" + this.lastName, function (err, json) {
            if (json != null && err == null) {
                self.manifest_newJson = json;
                console.log("3.1 wqinfo manifest下载完成")
                self.lbVersion.node.active = true;
                self.lbVersion.string = "子游戏版本:" + json.version
                self.lbDownState.string = "开始下载子游戏，版本：" + json.version
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
        
        //清理下载缓存
        this.initData();

        for (var key in this.manifest_newJson.assets) {
            if (key == "" || key == null)
                continue;
            var nItem = this.manifest_newJson.assets[key];
            //整个文件夹都要下载
            //重复下载
            
            if (cc.sys.localStorage.getItem(key) == nItem.md5 && jsb.fileUtils.isFileExist(this.hotRootDir + "/" + key)) {
                continue;
            }
            this.updateList.push({ key: key, item: nItem });
            this.updateCount++;
            this.updateSize += nItem.size;
        }
        console.log(`wqinfo 更新概览，更新文件数：${this.updateCount},文件总大小：${this.updateSize}`)
        console.log("wqinfo 4.开始下载项目文件")
        this.hotUpdate();
    },

    hotUpdate : function () {
        if (this.updateCount == 0) {
            console.log("wqinfo 待下载数量为0，下载完成")
            this.downGameEnd();
            return;
        }
        this.allSizeString = cc.zy.zyUtils.getSizeStr(this.updateSize);
        this.updateProgress();
        this.progressBar.progress = 0;
        this.myDownload.init(this.onLoadEnd.bind(this), this.onLoadError.bind(this), this.onLoadProgress.bind(this));
        if (this.updateCount > 0 && this.manifest_newJson) {
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
        console.log("next num :",this.updateList.length)
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
        var url = this.hotUpdateUrl + item.key;
        var isReload = true;
        if (name && name.indexOf("project.manifest") != -1) {
            url = this.manifestNewUrl;
            isReload = false;
        }
        var storeUrl = this.hotRootDir + "/" + item.key;
        var directory = this.hotRootDir + "/" + item.key.substring(0, index + 1);
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
            this.downGameEnd();
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
    downGameEnd : function () {
        console.log("wqinfo 覆盖新的manifest文件")
        if(this.hotRootDir)
        {
            var manifest = this.hotRootDir + "/" + this.hotManifestFile;
            if (jsb.fileUtils.isFileExist(manifest)) {
                jsb.fileUtils.removeFile(manifest);
            }

            jsb.fileUtils.renameFile(this.hotRootDir + "/" + this.lastName, manifest);
            //这里会报错
            // this.myDownload.clearJSBDownload();
        }
        this.lbDownState.string = "子项目下载完成"
        console.log("wqinfo 子项目下载完成")
        cc.SwitchGame(cc.loadSubGameName)
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