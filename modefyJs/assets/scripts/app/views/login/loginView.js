cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        lblVer:cc.Label,
        passEdit:cc.EditBox,
        userEdit:cc.EditBox,
    },

    // use this for initialization
    onLoad: function () {
        this.count = 0
        var $protobuf = require("protobufjs/minimal");
        // this.label.string = this.text;
        // this.lblVer.string ="v " + cc.zy.zyConfig.version
    },
    onLoginClick()
    {
        console.log(this.userEdit.string)
        let user = this.userEdit.string
        let pass = this.passEdit.string
        cc.zy.uiUtils.openPrefabView({url:"login/testView"});
        // cc.zy.alertUtil.alert("111")
        // facade.send("WAIT_SHOW")
        // setTimeout(() => {
        //     facade.send("WAIT_HIDE")
        // }, 5000);
        // cc.zy.alertUtil.alert(this.count++)
        // let url = "http://127.0.0.1:9000/getServerInfo"
        //http同步获取例子
        // let onLogin =function(serverData)
        // {
        //     console.log(serverData)
        // }
        // cc.zy.http.sendBufferRequest("/getServerInfo", "msg",
        // {
        //     name: "hello", 
        //     pwd: "pwd"
        // }
        // , onLogin);
        // cc.zy.http.sendRequest("/getServerInfo",
        // {
        //     name: "hello", 
        //     pwd: "pwd"
        // }
        // , onLogin);
        //正常方式登录，无加密
        // let onLogin = function(serverData){
        //     console.log(serverData)
        // }
        //  cc.zy.http.sendRequest("/auth",
        // {
        //     account: user, 
        //     password: pass
        // }
        // , onLogin);
        //aa
        //md5:"4124bc0a9335c27f086f24ba207a4912"
    },
    onRegistClick()
    {

    },

    // called every frame
    update: function (dt) {

    },
    onClickGame2:function()
    {
        cc.zy.zyUtils.enterGame("game3","game2UpdateView")
    },
    onClickBack:function()
    {
    },
    onClickXxl:function()
    {
        cc.zy.zyUtils.enterGame("xxl","game2UpdateView")
    },
});
