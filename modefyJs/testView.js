var list = require("List");

cc.Class({
    extends:cc.Component,

    properties: {
        lastList:list,
        list:list,
        quList:list,
    },

    onLoad : function () {
        this.update_ServerList();
    },

    update_ServerList : function () {
        // var _this = this;
        // this.quList.data = initializer.loginProxy.quList;
        // this.quList.selectHandle = function (vo) {
        //     _this.list.data = vo ? vo.list : null;
        // };
        // this.quList.selectIndex = 0;
        // this.lastList.data = initializer.loginProxy.lastList;
    },

    closeBtn : function () {
        cc.zy.uiUtils.closeView(this);
        cc.zy.zyUtils
        cc.zy.zyConfig
    },

    clickItem : function (event, param) {
        var data = param.data;
        if (data) {
            initializer.loginProxy.pick(data.id);
            this.closeBtn();
        }
    },

});