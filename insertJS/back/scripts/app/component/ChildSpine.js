var i = require("./UrlLoad");
var n = require("../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        head: i,
        body: i,
        isSmall:{ default:false, tooltip: "是否使用小套资源" },
    },
    ctor() {},
    onLoad() {},
    setKid(t, e, o) {
        void 0 === o && (o = !0);
        var i = t % 5 == 0 ? 1 : t % 5,
        l = t % 5 == 0 ? 4 : 5 - (t % 5);
        if (this.isSmall) {
            this.head.url = o ? n.uiHelps.getKidChengHead_2(i, e) : n.uiHelps.getKidSmallHead_2(i, e);
            this.body.url = o ? n.uiHelps.getKidChengBody_2(l, e) : n.uiHelps.getKidSmallBody_2(l, e);
        } else {
            this.head.url = o ? n.uiHelps.getKidChengHead(i, e) : n.uiHelps.getKidSmallHead(i, e);
            this.body.url = o ? n.uiHelps.getKidChengBody(l, e) : n.uiHelps.getKidSmallBody(l, e);
        }
    },
    clearKid() {
        this.head.url = "";
        this.body.url = "";
    },
    setMarry(t, e) {
        var o = t % 5 == 0 ? 1 : t % 5;
        this.head.url = n.uiHelps.getKidChengHead(2 == e ? 0 : o, e);
        this.body.url = n.uiHelps.getKidMarryBody(e);
    },
});
