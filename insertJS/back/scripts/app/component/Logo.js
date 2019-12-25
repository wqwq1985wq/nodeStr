var i = require("./UrlLoad");
var n = require("../utils/Utils");
var l = require("../Config");
var r = require("../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        urllogo: i,
    },
    ctor() {},
    onLoad() {
        n.stringUtil.isBlank(l.Config.logo) || (this.urllogo.url = r.uiHelps.getLogo());
    },
});
