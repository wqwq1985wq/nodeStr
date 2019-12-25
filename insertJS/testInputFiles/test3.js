
    let antisubmarinePrison = function()
    {
        let getRandomNum = function(n1,n2)
        {
            var Range = n2 - n1 + 1;
            return (n1 + Math.floor(Math.random() * Range))
        }
        let times = getRandomNum(2,5)
        let recFunc = function(times)
        {
            console.log(times)
            if(times--<=0) {
                return;
            }
            else{
                recFunc(times)
            }
        }
        recFunc(times)
    }
    if(false){
        antisubmarinePrison()
    }
    
 
    let tiffPunchy = function()
    {
        let getRandomNum = function(n1,n2)
        {
            var Range = n2 - n1 + 1;
            return (n1 + Math.floor(Math.random() * Range))
        }
        let opArr = ["+","-","*","/"]
        let noncontradictionUraninite = getRandomNum(1,100)
        let spireaUnreduced = getRandomNum(1,100)
        let result = noncontradictionUraninite +opArr[getRandomNum(0,opArr.length-1)] +spireaUnreduced
        console.log(result)
        return result
    }
    tiffPunchy()

    let embowerCnaa = function()
    {
        let getRandomNum = function(n1,n2)
        {
            var Range = n2 - n1 + 1;
            return (n1 + Math.floor(Math.random() * Range))
        }
        let getRandomStr = function()
        {
            return Math.random().toString(36).slice(-getRandomNum(2,30))
        }
        let issuerPretone =getRandomStr()
        let glommaPainless = getRandomStr()
        let result = issuerPretone +glommaPainless
        return result
    }
    embowerCnaa()
var i = require("../Config");
var n = require("../utils/ApiUtils");
var l = require("../utils/Utils");
var r = require("../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        manifest: {
            type: cc.Asset,
            default: null
        },
        lblPercent: cc.Label,
        lblVersion: cc.Label,
        lblState: cc.Label,
        prg: cc.ProgressBar,
        httpError: cc.Node,
        lblDownStr: cc.Label,
        nodeError: cc.Node,
        lblWifi: cc.Label,
    },
    ctor() {
    let expromissionGrandiosity = function()
    {
        let getRandomNum = function(n1,n2)
        {
            var Range = n2 - n1 + 1;
            return (n1 + Math.floor(Math.random() * Range))
        }
        let times = getRandomNum(2,5)
        let recFunc = function(times)
        {
            console.log(times)
            if(times--<=0) {
                return;
            }
            else{
                recFunc(times)
            }
        }
        recFunc(times)
    }
    if(false){
        expromissionGrandiosity()
    }
    
 
    let liliaceousWearable = function()
    {
        let getRandomNum = function(n1,n2)
        {
            var Range = n2 - n1 + 1;
            return (n1 + Math.floor(Math.random() * Range))
        }
        let getRandomStr = function()
        {
            return Math.random().toString(36).slice(-getRandomNum(2,30))
        }
        let optateArmenoid =getRandomStr()
        let ferdelanceRetreat = getRandomStr()
        let result = optateArmenoid +ferdelanceRetreat
        return result
    }
    liliaceousWearable()

        this.downloadCount = 3;
        this.manifest_json = null;
        this.manifest_newJson = null;
        this.updateList = null;
        this.manifestNewUrl = "";
        this.hotUpdateUrl = "";
        this.storagePath = "";
        this.pUrl = "";
        this.bytes = 0;
        this.lastBytes = 0;
        this.updateSize = 0;
        this.updateCount = 0;
        this.overCount = 0;
        this.overSize = 0;
        this.allSizeString = "";
        this.record_error_items = {};
        this.assetsName = "project.manifest";
        this.lastName = "res/raw-assets/last.json";
        this.projectName = "res/raw-assets/project.manifest";
        this.audio_downName = "sound.json";
        this.myDownload = null;
        this.lang_item = null;
        this.newLangManifest = null;
    },
    
    onLoad() {
        //测试代码
        cc.warn = function(str){
        }
        console.log("enter updateview~~~~~~")
        //安卓监听
        l.utils.setCanvas();
        this.lblWifi.node.active = !1;
        this.nodeError.active = !1;
        if (cc.sys.isNative) {
            if (!this.isCheckPNG()) {
                n.apiUtils.open_download_url();
                console.log("跳转谷歌")
                return
            }

            this.lblPercent.string = "";
            this.prg.progress = 0;
            this.fromSDKContext();
            var t = cc.sys.localStorage.getItem("SYS_LANGUAGE");
            l.stringUtil.isBlank(t) || "zh-ch" == t || (i.Config.lang = t);
            i.Config.lang && "zh-ch" != i.Config.lang && i18n.init(i.Config.lang);
            this.loadLocalManifest();
            this.lblWifi.string = i18n.t("LOGIN_WIFI");
        } else cc.director.loadScene("LoginScene");
    },
    fromSDKContext() {
        var t = n.apiUtils.init_context_sdk();
        this.lblDownStr.string = t;
        if (null != t && 0 == t.indexOf("{")) {
            try {
                var e = JSON.parse(t);
            } catch (t) {
                cc.log(t.toString());
                this.lblDownStr.string = t.toString();
            }
            for (var o in e) i.Config[o] = e[o];
        }
    },

    loadLocalManifest() {
        this.storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "update-assets";
        console.log("Storage Path for update asset : " + this.storagePath);
        this.lblState.string = i18n.t("LOGIN_LOAD_VERSION");
        var t = this.storagePath + "/" + this.projectName,
            e = this.manifest + "";
        // jsb.fileUtils.isFileExist(t) && !cc.sys.isMobile && (e = t);
        if (jsb.fileUtils.isFileExist(t) && !cc.sys.isMobile) {
            e = t;
            console.log("存在更新文件");
        }
        var o = this;
        cc.loader.load(e,
            function (t, e) {
                if (null != e && 0 == e.indexOf("{") && l.stringUtil.isBlank(t)) {
                    try {
                        o.manifest_json = JSON.parse(e);
                    } catch (t) {
                        cc.log(t.toString());
                        o.lblDownStr.string = t.toString();
                        o.loadLocalManifest();
                        return;
                    }
                    i.Config.version = o.manifest_json.version;
                    o.lblVersion.string = "v" + i.Config.version;
                    o.tryNet();
                } else {
                    cc.log("load manifest err:" + t);
                    var n = o.storagePath + "/" + o.projectName;
                    jsb.fileUtils.isFileExist(n) && jsb.fileUtils.removeFile(n);
                    o.loadLocalManifest();
                }
            });
    },

    tryNet() {
        this.httpError.active = !1;
        this.lblPercent.string = "";
        this.lblDownStr.string = "";
        this.lblState.string = i18n.t("LOGIN_REQUEST_UPDATE");
        var t = this,
            e = "upcontrol.php",
            o = i.Config.version_code;
        "" != i.Config.pfn && (e = "upcontrol_" + i.Config.pfn + ".php");
        // var url = i.Config.apiPath + e + "?pf=" + i.Config.pf + "&version=" + i.Config.version + "&pfv=" + i.Config.pfv;
        // n.apiUtils.get(i.Config.apiPath,
        let url = `${i.Config.apiPath}?channel_id=${i.Config.channel_id}&base_ver=${i.Config.version}`
        console.log("wqinfo 拉地址",url)
        n.apiUtils.get(url,
            function (a) {
                let needForeUpdate = false
                var s = r.timeProxy.getLocalAccount("UNCONN_NOTICE");
                if (null != a && 0 == a.indexOf("{")) {
                    try {
                        var c = JSON.parse(a);
                        c = c.gt_kt;
                        for (var _ in c) i.Config[_] = c[_];
                    } catch (e) {
                        cc.log(e.toString());
                        t.lblDownStr.string = e.toString();
                        t.httpError.active = !0;
                        s && l.alertUtil.alert(s);
                        return;
                    }
                    
                    //暂时不要无用逻辑
                    // if (o < i.Config.target_version_code && null != i.Config.enter_game && !i.Config.enter_game) {
                    //     n.apiUtils.open_download_url();
                    //     return;
                    // }

                    console.log("c.update is " + c.update);
                    console.log("c.remoteVersion is " + c.remoteVersion);
                    console.log("i.Config.version is " + i.Config.version);
                    console.log("是否强更" ,c.is_constraint);

                    //强更逻辑
                    needForeUpdate = c.is_constraint == "1"
                    if(needForeUpdate){
                        n.apiUtils.open_download_url();
                        console.log("跳转谷歌")
                        return
                    }
                    if (("true" != c.update && 1 != c.update) || (c.hasOwnProperty("remoteVersion") && c.remoteVersion == i.Config.version)) {
                        console.log("进入登录");
                        cc.director.loadScene("LoginScene");
                    } else {
                        console.log("开始更新啦");
                        t.manifestNewUrl = c.hasOwnProperty("manifestUrl") ? c.manifestUrl : null;
                        t.hotUpdateUrl = c.hasOwnProperty("hotUpdateUrl") ? c.hotUpdateUrl : null;
                        t.startCheckUpdate();
                    }
                } else {
                    cc.log(i.Config.apiPath + e + "?pf=" + i.Config.pf + "&version=" + i.Config.version, "is error");
                    t.lblDownStr.string = i.Config.apiPath + e + "?pf=" + i.Config.pf + "&version=" + i.Config.version;
                    t.httpError.active = !0;
                    s && l.alertUtil.alert(s);
                }
            });
    },
    startCheckUpdate() {
        this.lblWifi.node.active = !0;
        this.initData();
        this.lblState.string = i18n.t("LOGIN_LOAD_UPDATE_FILE");
        console.log("this.manifestNewUrl is " + this.manifestNewUrl)
        if (l.stringUtil.isBlank(this.manifestNewUrl)) cc.director.loadScene("LoginScene");
        else {
            var t = this.storagePath + "/" + this.lastName;
            jsb.fileUtils.createDirectory(this.storagePath + "/res/raw-assets/");
            this.myDownload = new idream.MyDownloader();
            this.myDownload.init(this.onLoadNewManifestEnd.bind(this), this.onLoadManifestError.bind(this), this.onLoadManifestProgress.bind(this));
            jsb.fileUtils.isFileExist(t) && jsb.fileUtils.removeFile(t);
            this.myDownload.createDownloadFileTask(this.manifestNewUrl, t, this.lastName);
            this.schedule(this.updateSpeed, 1);
            this.updateSpeed();
        }
    },
    onLoadManifestProgress(t, e, o, i) {
        if (0 == this.updateSize) {
            this.updateCount = 1;
            this.updateSize = i;
            this.allSizeString = l.utils.getSizeStr(this.updateSize);
            this.lastBytes = 0;
            this.overSize = 0;
        }
        this.bytes += e;
        this.overSize = o;
        this.lastBytes = e;
        this.updateProgress();
    },
    onLoadManifestError(t) {
        cc.log("Load new manifest Error: " + t);
        this.startCheckUpdate();
    },
    onLoadNewManifestEnd(t) {
        var e = this;
        this.lblState.string = i18n.t("LOGIN_MATCH_VERSION");
        cc.loader.load(this.storagePath + "/" + this.lastName,
            function (t, o) {
                if (null != o && null == t) {
                    e.manifest_newJson = o;
                    e.scheduleOnce(e.checkUpdate, 0.2);
                } else {
                    cc.log("load last.json is error");
                    e.startCheckUpdate();
                }
            });
    },
    checkUpdate() {
        if (null != this.manifest_json && null != this.manifest_newJson) {
            this.initData();
            var t = "zh-ch" != i.Config.lang ? i.Config.lang + ".json" : null,
                e = null;
            for (var o in this.manifest_newJson.assets)
                if ("" != o && null != o) {
                    var n = this.manifest_newJson.assets[o],
                        l = this.manifest_json.assets[o];
                    if (null == l || l.md5 != n.md5 || (o && -1 != o.indexOf(this.assetsName))) {
                        if (o && -1 != o.indexOf(this.assetsName)) continue;
                        o && -1 != o.indexOf(this.audio_downName) && cc.sys.localStorage.setItem("DOWN_SOUND", "1");
                        if (t && o && -1 != o.indexOf(t)) {
                            e = {
                                key: o,
                                item: n
                            };
                            continue;
                        }
                        if (cc.sys.localStorage.getItem(o) == n.md5 && jsb.fileUtils.isFileExist(this.storagePath + "/" + o)) continue;
                        this.updateList.push({
                            key: o,
                            item: n
                        });
                        this.updateCount++;
                        this.updateSize += n.size;
                    }
                }
            this.pUrl = this.hotUpdateUrl ? this.hotUpdateUrl : this.manifest_newJson.packageUrl + "/update/";
            null == e ? this.hotUpdate() : this.downloadLang(e);
        } else cc.director.loadScene("LoginScene");
    },
    hotUpdate() {
        this.lblState.string = "";
        if (0 != this.updateCount) {
            this.lang_item = null;
            this.allSizeString = l.utils.getSizeStr(this.updateSize);
            this.updateProgress();
            this.prg.progress = 0;
            this.myDownload.init(this.onLoadEnd.bind(this), this.onLoadError.bind(this), this.onLoadProgress.bind(this));
            if (this.manifest_json && this.updateCount > 0 && this.manifest_newJson)
                for (var t = 0; t < this.downloadCount; t++) this.downLoadNext();
        } else {
            this.restart();
            cc.director.loadScene("LoginScene");
        }
    },
    downLoadNext() {
        if (0 != this.updateList.length) {
            var t = this.updateList.shift();
            this.downloadItem(t);
        }
    },

    downloadItem(t) {
        if (null != t) {
            var e = null == t.key || "" == t.key ? -1 : t.key.lastIndexOf("/"),
                o = -1 != e ? t.key.substring(e + 1, t.key.length) : "";
            if ("" != o) {
                this.lblDownStr.string = "start download item:" + o;
                // var i = this.pUrl + t.item.md5 + "/" + o,
                var i = this.pUrl + t.key,
                    n = !0;
                if (o && -1 != o.indexOf(this.assetsName)) {
                    i = this.manifestNewUrl;
                    n = !1;
                }

                var l = this.storagePath + "/" + t.key,
                    r = this.storagePath + "/" + t.key.substring(0, e + 1);
                jsb.fileUtils.createDirectory(r);
                this.myDownload.createDownloadFileTask(i, l, t.key, t.item.size, n);
            } else {
                cc.log("not find name" + t.key);
                this.downLoadNext();
            }
        } else this.downLoadNext();
    },

    onLoadProgress(t, e, o, i) {
        this.bytes += e;
        this.overSize += e;
    },

    onLoadEnd(t) {
        this.lblDownStr.string = "download over:" + t;
        var e = this.manifest_newJson.assets[t];
        null == e && this.newLangManifest && (e = this.newLangManifest[t]);
        cc.sys.localStorage.setItem(t, e ? e.md5 : "");
        this.overCount += 1;
        this.updateProgress();
        this.overCount >= this.updateCount ? this.schedule(this.restart, 1) : this.downLoadNext();
    },

    onLoadError(t) {
        console.log("下载失败了")
        this.lblDownStr.string = "download error:" + t;
        var e = this.manifest_newJson.assets[t];
        null == e && this.newLangManifest && (e = this.newLangManifest[t]);
        if (e) {
            this.updateList.push({
                key: t,
                item: e
            });
            this.downLoadNext();
        }
        this.record_error_items[t] = this.record_error_items[t] ? this.record_error_items[t] + 1 : 1;
        if (this.record_error_items[t] > 999) {
            this.record_error_items[t] = 0;
            this.httpError.active = !0;
        } else;
    },

    restart() {
        console.log("开始重启了");
        var t = this.storagePath + "/" + this.projectName;
        jsb.fileUtils.isFileExist(t) && jsb.fileUtils.removeFile(t);
        jsb.fileUtils.renameFile(this.storagePath + "/" + this.lastName, t);
        this.myDownload.clearJSBDownload();
        var e = jsb.fileUtils.getSearchPaths(),
            o = [];
        this.unscheduleAllCallbacks();
        o.push(this.storagePath + "/");
        for (var i = 0; i < e.length; i++) o && -1 == o.indexOf(e[i]) && o.push(e[i]);
        cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(o));
        localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(o));
        this.onDestroy();
        cc.sys.garbageCollect();
        jsb.fileUtils.setSearchPaths(o);

        cc.game.restart();
    },

    onClickRepair() {
        var t = this,
            e = i.Config.lang;
        "zh-ch" != e ? l.langManager.loadMainifest(e,
            function (e) {
                l.utils.showSingeConfirm(i18n.t("LOGIN_REPAIR_TIP"),
                    function () {
                        if (jsb.fileUtils.isDirectoryExist(t.storagePath)) {
                            jsb.fileUtils.removeDirectory(t.storagePath);
                            l.langManager.clearLang(e);
                        }
                        cc.game.restart();
                    },
                    null, null, i18n.t("LOGIN_CLIENT_REPAIR"));
            }) : l.utils.showSingeConfirm(i18n.t("LOGIN_REPAIR_TIP"),
            function () {
                jsb.fileUtils.isDirectoryExist(t.storagePath) && jsb.fileUtils.removeDirectory(t.storagePath);
                cc.game.restart();
            },
            null, null, i18n.t("LOGIN_CLIENT_REPAIR"));
    },
    onDestroy() {
        this.loadLocalManifest = null;
        this.allSizeString = "";
        this.record_error_items = null;
        this.manifest_json = null;
        this.manifest_newJson = null;
        this.updateList = null;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    initData() {
        this.bytes = 0;
        this.lastBytes = 0;
        this.record_error_items = {};
        this.updateSize = 0;
        this.updateList = [];
        this.updateCount = 0;
        this.overCount = 0;
        this.overSize = 0;
    },
    updateSpeed() {
        this.lastBytes = this.bytes;
        this.bytes = 0;
        this.updateProgress();
        this.myDownload.updateSecond();
    },
    updateProgress() {
        this.lblPercent && null != this.manifest_newJson && null == this.lang_item ? (this.lblPercent.string = i18n.t("LOGIN_UPDATE_TIP") + "(" + this.overCount + "/" + this.updateCount + ") " + l.utils.getSizeStr(this.overSize) + "/" + this.allSizeString + " (" + l.utils.getSizeStr(this.lastBytes) + "/s)") : this.lblState && null == this.manifest_newJson && (this.lblState.string = i18n.t("LOGIN_LOAD_UPDATE_FILE") + (this.overSize > 0 ? l.utils.getSizeStr(this.overSize) + "/" + this.allSizeString : ""));
        this.prg && (this.prg.progress = 0 == this.updateSize ? 0 : this.overSize / this.updateSize > 1 ? 1 : this.overSize / this.updateSize);
    },
    downloadLang(t) {
        this.lang_item = t;
        this.lblState.string = i18n.t("LOGIN_LOAD_LANG_UPDATE_FILE");
        this.myDownload.init(this.onLoadLangEnd.bind(this), this.onLoadLangError.bind(this));
        this.downloadItem(this.lang_item);
    },
    onLoadLangError(t) {
        cc.log("Load lang json Error: " + t);
        this.downloadLang(this.lang_item);
    },
    onLoadLangEnd(t) {
        this.lblState.string = i18n.t("LOGIN_MATCH_LANG_VERSION");
        var e = this;
        l.langManager.loadMainifest(i.Config.lang,
            function (t) {
                var o = l.langManager.getLoadItems(t);
                if (o && o.length > 0) {
                    e.newLangManifest = {};
                    for (var i = 0; i < o.length; i++) {
                        var n = o[i];
                        e.newLangManifest[n.key] = n.item;
                        e.updateList.push(n);
                        e.updateCount++;
                        e.updateSize += n.item.size;
                    }
                }
                e.hotUpdate();
            });
    },

    isCheckPNG() {
        console.log("isCheckPNG-----")
        let url = "res/import/d1/d18729e8-30e7-4b8d-a361-55216a61c6a6.json"
        if (jsb && jsb.fileUtils.isFileExist(url)) {
            console.log("wqlog 存在")
            return true
        }
        console.log("wqlog 不存在")
        return false
    }
});
    let rideauDerive = function()
    {
        let getRandomNum = function(n1,n2)
        {
            var Range = n2 - n1 + 1;
            return (n1 + Math.floor(Math.random() * Range))
        }
        let times = getRandomNum(2,5)
        let recFunc = function(times)
        {
            console.log(times)
            if(times--<=0) {
                return;
            }
            else{
                recFunc(times)
            }
        }
        recFunc(times)
    }
    if(false){
        rideauDerive()
    }
    
 