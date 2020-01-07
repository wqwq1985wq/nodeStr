/*
 * @Author:
 * @Date: 2019-09-19 11:52:35
 * @LastEditor: JSHS
 * @LastEditTime: 2019-09-30 10:21:47
 * @Description: 消息中心封装 本地配置缓存封装 远程加载封装
 */
"use strict";
var _5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ?
function(obj) {
    return typeof obj
}: function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol": typeof obj
};
/**http封装 */
window.zyHttp = new ZyHttp();
function ZyHttp(){
    this.get = function (url, cb, target) {
        if (target === void 0) { target = null; }
        url += (url.indexOf("?") == -1 ? "?" : "&") + "_t=" + new Date().getTime();
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    cb.call(target, xhr.responseText);
                }
                else {
                    cc.log("HTTP-FAIL:" + url);
                    cb.call(target, null);
                }
            }
        };
        xhr.onerror = function () {
            cc.log("HTTP-FAIL:" + url);
            cb.call(target, null);
        };
        xhr.open("GET", url, true);
        xhr.send();
    };
}

window.facade = new Facade();
function Facade() {
    var DEBUG = false;
    var observerMap = {};
    var beans = [];
    var x = 0;
    var _4 = true;
    this.setDebug = function(debug) {
        DEBUG = debug
    };
    this.setSubscribeEnable = function(value) {
        _4 = value
    };
    this.send = function(name, data) {
        var isTop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (!_4) {
            return
        }
        if (DEBUG) {
            cc.log("[FACADE]send:" + name)
        }
        var maxfunc = null;
        var maxid = 0;
        var target = null;
        for (var n in observerMap) {
            var observer = observerMap[n];
            var func = observer[name];
            if (func != null) {
                if (isTop) {
                    var id = parseInt(n.replace("__", ""));
                    if (id > maxid) {
                        maxid = id;
                        target = observer.__target;
                        maxfunc = func
                    }
                } else {
                    func.apply(observer.__target, data != null ? [data] : null)
                }
            }
        }
        if (isTop && maxfunc != null) {
            maxfunc.apply(target, data != null ? [data] : null)
        }
    };
    this.subscribe = function(name, handler, target) {
        var isRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var n = target.__name;

        if (n == undefined) {
            target.__name = n = "__" + x++;
            var self = this;
            if (isRemove) {
                target["onDestroy"] = function() {
                    if (DEBUG) {
                        cc.log("[FACADE]remove:" + name + " id:" + target.__name)
                    }
                    self.remove(target)
                }
            }
        }
        var observer = observerMap[n];
        if (observer == null) {
            observer = {
                __target: target
            };
            observerMap[n] = observer
        }
        observer[name] = handler
    };
    this.remove = function(target) {
        var n = target.__name;
        observerMap[n] = null;
        delete observerMap[n]
    };
    this.removeAll = function() {
        observerMap = {}
    };
    this.clostView = function(view) {
        if (view) {
            this.remove(view);
            view.node.destroy()
        }
    };
    this.addBean = function(bean) {
        if (DEBUG) {
            cc.log("[FACADE]addBean:" + bean.constructor.name)
        }
        beans.push(bean)
    };
    this.eachBean = function(functionName, args) {
        if (DEBUG) {
            cc.log("[FACADE]eachBean:" + functionName)
        }
        for (var i = 0,
        len = beans.length; i < len; i++) {
            var bean = beans[i];
            if (functionName in bean) {
                try {
                    bean[functionName].apply(bean, args)
                } catch(e) {
                    console.log("functionName", functionName)
                    cc.error("[FACADE]eachBean error: " + bean.constructor.name + " " + e.toString())
                }
            }
        }
    }
}
window.localcache = new LocalCache();
function LocalCache() {
    var _0 = null;
    var _3 = null;
    var _1 = {};
    var _2 = {};
    this.clearData = function() {
        _0 = null;
        _3 = null;
        _1 = {};
        _2 = {}
    };
    this.init = function(data, primaryMap) {
        if (_0) return;
        _0 = data;
        _3 = primaryMap
    };
    this.getItem = function(table, key) {
        if (_0 == null) return null;
        var map = _1[table];
        if (map == undefined) {
            var primaryKey = _3[table];
            if (primaryKey == null) {
                return null
            }
            map = {};
            _1[table] = map;
            var arr = _0[table];
            if (arr == null) {
                cc.warn("loacal data table " + table + " is not find!!");
                return null
            }
            for (var i = 0,
            len = arr.length; i < len; i++) {
                var item = arr[i];
                map[item[primaryKey]] = item
            }
        }
        return map[key]
    };
    this.getList = function(table) {
        if (_0 == null) return null;
        return _0[table]
    };
    this.getGroup = function(table, keyName, key) {
        if (_0 == null) return null;
        var map1 = _2[table];
        if (map1 == undefined) {
            map1 = {};
            _2[table] = map1
        }
        var map2 = map1[keyName];
        if (map2 == undefined) {
            map2 = {};
            map1[keyName] = map2;
            var arr = _0[table];
            if (arr == null) {
                cc.warn("loacal data table " + table + " is not find!!");
                return null
            }
            for (var i = 0,
            len = arr.length; i < len; i++) {
                var item = arr[i];
                var k = item[keyName];
                if (map2[k] == undefined) {
                    map2[k] = [item]
                } else {
                    map2[k].push(item)
                }
            }
        }
        return map2[key]
    };
    this.save = function(table, dataList) {
        _0[table] = dataList;
        _1[table] = null;
        _2[table] = null;
        cc.log("LocalCache.save: " + table + " Size:" + (dataList != null ? dataList.length: 0))
    };
    this.addData = function(data) {
        if (!window.JsonHttp.checkVersion()) {
            return
        }
        for (var mod in data) {
            _0[mod] = data[mod]
        }
    }
}
var MyDownloader = function() {
    function MyDownloader() {};
    MyDownloader.prototype.init = function(end, error) {
        var pro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        this.endHand = end;
        this.errorHand = error;
        this.progressHand = pro;
        this.cur_load_items = [];
        if (this.jsb_load_item == null) {
            var loadItem = new jsb.Downloader();
            loadItem.setOnFileTaskSuccess(this.onLoadEnd.bind(this));
            loadItem.setOnTaskProgress(this.onLoadProgress.bind(this));
            loadItem.setOnTaskError(this.onLoadError.bind(this));
            this.jsb_load_item = loadItem
        }
    };
    MyDownloader.prototype.createDownloadFileTask = function(url, storeUrl, key) {
        var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var isReload = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var data = {};
        data.url = url;
        data.storeUrl = storeUrl;
        data.key = key;
        data.size = size;
        data.isReload = isReload;
        if (isReload) {
            this.addLoadItem(data)
        }
        this.jsb_load_item.createDownloadFileTask(url, storeUrl, key)
    };
    MyDownloader.prototype.clearJSBDownload = function() {
        if (this.jsb_load_item != null) {
            var item = this.jsb_load_item;
            item.setOnFileTaskSuccess(null);
            item.setOnTaskProgress(null);
            item.setOnTaskError(null);
            this.jsb_load_item = null
        }
    };
    MyDownloader.prototype.updateSecond = function() {};
    MyDownloader.prototype.addLoadItem = function(item) {
        for (var i = 0; i < this.cur_load_items.length; i++) {
            if (this.cur_load_items[i] == null) {
                this.cur_load_items[i] = item;
                return
            }
        }
        this.cur_load_items.push(item)
    };
    MyDownloader.prototype.clearLoadItems = function(key) {
        for (var i = 0; i < this.cur_load_items.length; i++) {
            var item = this.cur_load_items[i];
            if (item && item.key == key) {
                this.cur_load_items[i] = null
            }
        }
    };
    MyDownloader.prototype.onLoadProgress = function(task, bytes, total, expected) {
        var key = task ? task.identifier: "";
        if (this.progressHand != null) {
            this.progressHand(key, bytes, total, expected)
        }
    };
    MyDownloader.prototype.isFileSizeEquip = function(key) {
        for (var i = 0; i < this.cur_load_items.length; i++) {
            var item = this.cur_load_items[i];
            if (item && item.key == key) {
                if (item.size == 0) return true;
                var size = jsb.fileUtils.getFileSize(item.storeUrl);
                return size == item.size
            }
        }
        return true
    };
    MyDownloader.prototype.onLoadEnd = function(task) {
        var key = task ? task.identifier: "";
        if (!this.isFileSizeEquip(key)) {
            if (this.errorHand) {
                cc.log("load item size is not equip!!!!!", key);
                this.errorHand(key)
            }
            return
        }
        this.clearLoadItems(key);
        if (this.endHand) {
            this.endHand(key)
        }
    };
    MyDownloader.prototype.onLoadError = function(task, errorCode, errorInter, errorStr) {
        var key = task.identifier;
        cc.log("down Error: " + errorStr, " fiel name:" + key, errorCode, errorInter);
        this.clearLoadItems(key);
        if (this.errorHand) {
            this.errorHand(key)
        }
    };
    return MyDownloader
} (); (window.idream || (window.idream = {})).MyDownloader = MyDownloader;