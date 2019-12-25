var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        servant: n,
        nameUrl: n,
        btn: cc.Button,
    },
    ctor() {},
    onLoad() {
        this.addBtnEvent(this.btn);
    },
    showData() {
        var t = this._data;
        if (t) {
            this.servant.url = l.uiHelps.getServantSpine(t.id);
            this.nameUrl.url = l.uiHelps.getStoryRoleName(t.id);
        }
    },
});
