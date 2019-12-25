var utils = require("../../utils/Utils");

cc.Class({

    extends: cc.Component,

    properties: {
        selectSpNode: cc.Node,
        webview: cc.WebView,
    },

    onLoad () {},

    start () {

    },

    onCloseWeb(){
        this.webview.node.active = false;
    },

    onClickItem1(){
        this.webview.node.active = true;
        this.webview.url = "https://flowermoonlight.meogames.com/service/statement.html "
    },

    onClickItem2(){
        this.webview.node.active = true;
        this.webview.url = "https://flowermoonlight.meogames.com/service/information.html"
    },

    onClickSelect(){
        let isVisible = this.selectSpNode.active;
        this.selectSpNode.active = !isVisible;
        cc.sys.localStorage.setItem("userProto",true);
        utils.utils.closeView(this);
    }

});
