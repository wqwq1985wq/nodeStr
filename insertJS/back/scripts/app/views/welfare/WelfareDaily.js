var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../utils/ShaderUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        list: i,
        weaklist: i,
        btn: cc.Button,
        img: cc.Sprite,
        animation: cc.Animation,
        btns: [cc.Button],
        nodes: [cc.Node],
    },
    ctor() {},
    onLoad() {
        this.updateList();
        this.updataWeakList();
        facade.subscribe(n.welfareProxy.UPDATE_WELFARE_QIANDAO, this.updateList, this);
        facade.subscribe(n.welfareProxy.UPDATE_WELFARE_ZHOUQIAN, this.updataWeakList, this);
        this.btn.interactable = 0 == n.welfareProxy.qiandao.qiandao;
        this.onclickTab(0, 1 == n.welfareProxy.zhouqian.isrwd ? 2 : 1);
    },
    updateList() {
        this.list.data = n.welfareProxy.getDailyList();
        r.shaderUtils.setImageGray(this.img, 0 != n.welfareProxy.qiandao.qiandao);
        if (0 != n.welfareProxy.qiandao.qiandao) {
            this.animation.enabled = !1;
            this.animation.play("");
            this.animation.stop();
        } else l.utils.showEffect(this.animation, 0);
    },
    updataWeakList() {
        for (var t = localcache.getList(localdb.table_monday).length, e = [], o = 0; o < t; o++) {
            var i = localcache.getItem(localdb.table_monday, o + 1);
            i && e.push(i);
        }
        this.weaklist.data = e;
    },
    onClickItem() {
        0 == n.welfareProxy.qiandao.qiandao ? n.welfareProxy.sendQiandao() : l.alertUtil.alert18n("WELFARE_QIANDAO_LIMIT");
    },
    onClickClost() {
        l.utils.closeView(this);
    },
    onclickTab(t, e) {
        for (var o = parseInt(e) - 1, i = 0; i < this.btns.length; i++) {
            this.btns[i].interactable = i != o;
            this.nodes[i].active = i == o;
        }
        switch (o) {
        case 0:
            this.updateList();
            break;
        case 1:
            this.updataWeakList();
        }
    },
});
