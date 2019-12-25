var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../Initializer");
var r = require("../../utils/UIUtils");
var a = require("../../utils/Utils");
var s = require("../../utils/ShaderUtils");
cc.Class({
    extends: i,
    properties: {
        lblName: cc.Label,
        lblPro: cc.Label,
        lblLv: cc.Label,
        title_bg: n,
        jiban_title: n,
        word: n,
        bar: cc.ProgressBar,
        btn: cc.Button,
        lblExp: cc.Label,
        yuyin: cc.Node,
        buf: cc.Node,
        lock: cc.Node,
    },
    ctor() {
        this.allJiBan = [];
        this.id = 0;
        this.isOpen = !1;
    },
    onLoad() {
        this.addBtnEvent(this.btn);
        for (var t = l.jibanProxy.jbItem,
        e = 0; e < t.length; e++) for (var o = 0; o < t[e].jibans.length; o++) {
            if (null == t[e].jibans[o]) return;
            this.allJiBan.push(t[e].jibans[o]);
        }
    },
    showData() {
        var t = this.data;
        this.yuyin.active = t.voice > 0;
        if (l.jibanProxy.getJiBan(t.id)) {
            this.id = t.roleid;
            this.isOpen = !0;
            this.lock.active = !1;
            this.buf.active = !0;
            this.lblName.string = t.name;
            this.lblName.node.color = this.lblLv.node.color = cc.color(255, 255, 255);
            s.shaderUtils.clearNodeShader(this.yuyin);
            for (var e = 0,
            o = this.allJiBan; e < o.length; e++) {
                var i = o[e];
                if (i.id == t.id) {
                    this.lblLv.string = i18n.t("SERVANT_JI_BAN_ITEM_LEVEL_TXT", {
                        lv: i.level
                    });
                    var n = l.jibanProxy.getJbItemAddPro(i.id, i.level);
                    this.lblPro.string = i18n.t("SERVANT_JI_BAN_SHU_XING_ADD", {
                        name: i18n.t("COMMON_PROP" + n.pro),
                        value: n.value
                    });
                    var a = localcache.getItem(localdb.table_heropveJbLevel, i.level);
                    if (a) {
                        this.bar.progress = i.exp / a.story_num;
                        this.lblExp.string = i18n.t("COMMON_NUM", {
                            f: i.exp,
                            s: a.story_num
                        });
                    }
                }
            }
            this.title_bg.url = r.uiHelps.getJbTitleBg(t.star);
            this.jiban_title.url = r.uiHelps.getJbTitle(t.star);
            this.word.url = r.uiHelps.getJbTitleWord(t.star);
            1 == t.star ? (this.lblPro.node.color = this.lblLv.node.color = cc.color(10, 53, 64)) : 2 == t.star ? (this.lblPro.node.color = this.lblLv.node.color = cc.color(42, 10, 64)) : 3 == t.star ? (this.lblPro.node.color = this.lblLv.node.color = cc.color(87, 9, 9)) : 4 == t.star && (this.lblPro.node.color = this.lblLv.node.color = cc.color(104, 43, 9));
        } else {
            s.shaderUtils.setNodeGray(this.yuyin);
            this.isOpen = !1;
            this.title_bg.url = r.uiHelps.getJbTitleBg(5);
            this.lblName.string = i18n.t("JINGYING_WEIJIESUO");
            this.lock.active = !0;
            this.buf.active = !1;
            this.jiban_title.url = null;
            this.word.url = null;
            this.lblName.node.color = this.lblLv.node.color = cc.color(70, 55, 55);
        }
    },
    onClickBtn() {
        if (this.isOpen) {
            var t = {};
            t.heroid = this.id;
            a.utils.openPrefabView("jiban/JibanDetailView", !1, t);
        }
    },
});
