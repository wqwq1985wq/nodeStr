/*************************
//初始化全局zy变量
*************************/

(function () {
    console.log("wqinfo zyEngineInitialer")
    cc.zy = {}
    cc.zy.zyConfig = require("zyEngineConfig").Config
    cc.zy.zyUtils = require("zyEngineUtils").utils
    cc.zy.uiUtils = require("zyEnginUiUtils").uiUtils
    cc.zy.alertUtil = require("zyEngineUtils").alertUtil
    cc.zy.http = require("zyEngineHTTP")
    cc.zy.http.setURL("http://127.0.0.1:9000")
    cc.zy.http1 = require("zyEngineHTTP")

    //数据类
    cc.zyDatas = {}
    cc.zyDatas.loginProxy = require("LoginProxy").LoginProxy
})();
