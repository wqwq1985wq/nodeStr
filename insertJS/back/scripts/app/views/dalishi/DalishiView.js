var i = require("../../component/UrlLoad");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../../utils/UIUtils");
var a = require("../../component/List");
var s = require("../../component/RoleSpine");
var c = require("../../formula");
cc.Class({
    extends: cc.Component,
    properties: {
        servant: i,
        servantName: i,
        nodeServant: cc.Node,
        lblServantTalk: cc.Label,
        roleSpine: s,
        lblName: cc.Label,
        lblTalk: cc.Label,
        lblCd: cc.Label,
        list: a,
        nodeCd: cc.Node,
        nodeFight: cc.Node,
        nodeAdd: cc.Node,
        lblAdd: cc.Label,
        btnClear: cc.Button,
    },
    ctor() {},
    onLoad() {
        l.dalishiProxy.sendYaMen();
        facade.subscribe(l.dalishiProxy.UPDATE_DALISHI_INFO, this.onInfoUpdate, this);
        facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
    },
    onInfoUpdate() {
        var t = l.dalishiProxy.info;
        this.nodeServant.active = 0 != t.qhid;
        this.nodeAdd.active = 3 == t.state;
        this.nodeCd.active = 0 == t.state || 1 == t.state || 3 == t.state || 4 == t.state;
        this.btnClear.node.active = !1;
        switch (t.state) {
        case 0:
            l.dalishiProxy.info.fitnum > 0 && l.dalishiProxy.sendYaMen();
            this.lblCd.string = i18n.t("DALISI_HERO_LIMIT", {
                d: n.utils.getParamInt("gongdou_unlock_level")
            });
            break;
        case 1:
            this.btnClear.node.active = l.dalishiProxy.hasCanFight();
            r.uiUtils.countDown(l.dalishiProxy.info.cd.next, this.lblCd,
            function() {
                l.playerProxy.sendAdok(l.dalishiProxy.info.cd.label);
            });
        case 3:
            this.lblAdd.string = i18n.t("DALISI_BUY_COUNT", {
                f: t.chunum,
                s: t.chumax
            });
            break;
        case 4:
            this.lblCd.string = i18n.t("DALISI_ATTACK_OVER");
        }
        if (this.nodeServant.active) {
            this.servant.url = r.uiHelps.getServantSpine(t.qhid);
            this.servantName.url = r.uiHelps.getStoryRoleName(t.qhid);
            this.lblName.string = t.fuser.name;
            this.roleSpine.setClothes(t.fuser.sex, t.fuser.job, t.fuser.level, t.fuser.clothe);
            this.updateRightTalk();
        }
    },
    updateRightTalk() {
        this.lblServantTalk.node.parent.active = !1;
        this.lblTalk.node.parent.active = !0;
        this.lblTalk.string = l.dalishiProxy.getTalkType(2);
        n.utils.showNodeEffect(this.lblTalk.node.parent, 0);
        this.scheduleOnce(this.updateLeftTalk, 3 * Math.random() + 1);
    },
    updateLeftTalk() {
        this.lblServantTalk.node.parent.active = !0;
        this.lblTalk.node.parent.active = !1;
        this.lblServantTalk.string = l.dalishiProxy.getTalkType(1);
        n.utils.showNodeEffect(this.lblServantTalk.node.parent, 0);
        this.scheduleOnce(this.updateRightTalk, 3 * Math.random() + 1);
    },
    onClickRank() {
        l.dalishiProxy.sendRank();
    },
    onClickInfo() {
        n.utils.openPrefabView("dalishi/MesView");
    },
    onClickServant() {
        2 == l.dalishiProxy.info.state ? l.dalishiProxy.sendPiZun() : n.utils.openPrefabView("dalishi/DalishiServant");
    },
    onClickAddCount() {
        if (l.dalishiProxy.info.chunum < 1) n.alertUtil.alert18n("DALISI_ATTACK_OVER");
        else {
            var t = n.utils.getParamInt("gongdou_add_count_id"),
            e = l.bagProxy.getItemCount(t),
            o = l.playerProxy.getKindIdName(1, t);
            n.utils.showConfirmItem(i18n.t("DALISI_ADD_COUNT_CONFRIM", {
                n: o
            }), t, e,
            function() {
                e < 1 ? n.alertUtil.alertItemLimit(t) : l.dalishiProxy.sendChushi();
            },
            "DALISI_ADD_COUNT_CONFRIM");
        }
    },
    onClickClear() {
        var t = c.formula.gongdou_cost(l.dalishiProxy.info.dayCount ? l.dalishiProxy.info.dayCount: 0);
        n.utils.showConfirmItem(i18n.t("DALISI_CLEAR_CD_CONFIRM", {
            d: t
        }), 1, l.playerProxy.userData.cash,
        function() {
            l.dalishiProxy.sendBuy();
        },
        "DALISI_CLEAR_CD_CONFIRM");
    },
    onClickClost() {
        n.utils.closeView(this);
    },
});
