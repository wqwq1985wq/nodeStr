var i = require("../../Initializer");
var n = require("../../formula");
var l = require("../../utils/Utils");
var r = require("../../models/TimeProxy");
cc.Class({
    extends: cc.Component,
    properties: {
        lblCostOnce: cc.Label,
        lblCostTen: cc.Label,
        lblDes: cc.Label,
        lblYl: cc.Label,
        effOnce: sp.Skeleton,
        effTen: sp.Skeleton,
        aniOnce: cc.Animation,
        aniTen: cc.Animation,
        lblWishCount: cc.Label,
        haveNum: cc.Label,
        scencArr: [cc.Node],
        btns: [cc.Node],
    },
    ctor() {
        this.flag = !1;
        this.costOnce = 0;
        this.costTen = 0;
        this.wishMax = 0;
        this.treeNum = 0;
        this.treeTypeArr = null;
        this.countData = null;
    },
    onLoad() {
        facade.subscribe(i.playerProxy.PLAYER_USER_UPDATE, this.onYueliUpdate, this);
        facade.subscribe(i.jibanProxy.UPDATE_WISHING_COUNT, this.onShowTree, this);
        this.treeTypeArr = localcache.getList(localdb.table_treeType);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
        facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onClickRight, this);
        this.wishMax = l.utils.getParamInt("tree_daycount");
        this.onYueliUpdate();
        this.onShowTree();

        // r.funUtils.isOpenFun(r.funUtils.wishingTree) && facade.send("DOWNLOAD_SOUND", {
        //     type: 3,
        //     param: r.funUtils.wishingTree.id
        // });
    },
    onShowTree() {
        this.wishMax = this.treeTypeArr[this.treeNum].daycount;
        for (var t = 0; t < i.jibanProxy.wishing.countInfo.length; t++) i.jibanProxy.wishing.countInfo[t].id == this.treeTypeArr[this.treeNum].id && (this.countData = i.jibanProxy.wishing.countInfo[t]);
        var e = this.countData.count + 1;
        this.costOnce = n.formula["tree_ms" + this.treeTypeArr[this.treeNum].id](e);
        for (var o = 0,
        l = e; l < e + 10; l++) o += n.formula["tree_ms" + this.treeTypeArr[this.treeNum].id](l);
        this.costTen = o;
        this.lblCostOnce.string = i18n.t("WISHING_TREE_COST_TXT", {
            num: this.costOnce
        });
        this.lblCostTen.string = i18n.t("WISHING_TREE_COST_TXT", {
            num: this.costTen
        });
        this.lblWishCount.string = i18n.t("WISHING_TREE_COUNT_TXT", {
            num: this.countData.count
        });
        var r = localcache.getGroup(localdb.table_heropve, "tree", this.treeTypeArr[this.treeNum].id);
        this.haveNum.string = i.jibanProxy.getTreeTypeCount(this.treeTypeArr[this.treeNum].id) + "/" + r.length;
    },
    onClickJiBan(t, e) {
        l.utils.openPrefabView("wishingtree/WishingJiBanView", null, {
            index: parseInt(e)
        });
    },
    onYueliUpdate() {
        this.lblYl.string = l.utils.formatMoney(i.playerProxy.userData.army);
    },
    onClickOnce() {
        if (!this.flag) {
            if (this.costOnce > i.playerProxy.userData.army) {
                l.alertUtil.alertItemLimit(4);
                return;
            }
            if (this.wishMax - this.countData.count <= 0) {
                l.alertUtil.alert18n("WISHING_TREE_COUNT_LIMIT");
                return;
            }
            this.flag = !0;
            this.effOnce.animation = "shanzi-open";
            this.aniOnce.node.active = !0;
            this.aniOnce.play();
            this.scheduleOnce(this.onTimer1, 1.6);
        }
    },
    onClickTen() {
        if (!this.flag) {
            if (this.costTen > i.playerProxy.userData.army) {
                l.alertUtil.alertItemLimit(4);
                return;
            }
            if (this.wishMax - this.countData.count < 10) {
                l.alertUtil.alert18n("WISHING_TREE_COUNT_LIMIT");
                return;
            }
            this.flag = !0;
            this.effTen.animation = "shanzi-open";
            this.aniTen.node.active = !0;
            this.aniTen.play();
            this.scheduleOnce(this.onTimer2, 1.6);
        }
    },
    onTimer1() {
        this.flag = !1;
        this.effOnce.animation = "shanzi-idle";
        i.jibanProxy.sendWishing(this.treeTypeArr[this.treeNum].id, 1);
    },
    onTimer2() {
        this.flag = !1;
        this.effTen.animation = "shanzi-idle";
        i.jibanProxy.sendWishing(this.treeTypeArr[this.treeNum].id, 10);
    },
    onClickClose() {
        l.utils.closeView(this);
    },
    onClickAdd() {
        l.utils.openPrefabView("JingYingView");
    },
    onClickGo() {
        l.utils.closeView(this);
        l.utils.openPrefabView("jiban/JibanSelect");
    },
    onClickTab(t, e) {
        var o = parseInt(e);
        this.treeNum = this.treeNum + o < 0 ? this.treeTypeArr.length - 1 : this.treeNum + o >= this.treeTypeArr.length ? 0 : this.treeNum + o;
        if (this.treeNum < this.treeTypeArr.length) {
            var i = this.treeTypeArr[this.treeNum];
            l.alertUtil.alert(i18n.t("WISHING_QIE_HUAN", {
                name: i.treename
            }));
        }
        for (var n = 0; n < this.scencArr.length; n++) {
            this.scencArr[n].active = n == this.treeNum;
            this.btns[n].active = n == this.treeNum;
        }
        this.onShowTree();
    },
    onClickLeft() {
        this.onClickTab(null, "-1");
    },
    onClickRight() {
        this.onClickTab(null, "1");
    },
});
