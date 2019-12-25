var i = require("../../component/RenderListItem");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../component/UrlLoad");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        lblName:cc.Label,
        lblPer:cc.Label,
        lblPro:cc.ProgressBar,
        lblRwd1:cc.Label,
        lblRwd2:cc.Label,
        lblTime:cc.Label,
        btnOpen:cc.Button,
        btnEnter:cc.Button,
        btnLook:cc.Button,
        btnRank:cc.Button,
        imgNpc:cc.Sprite,
        roleUrl:r,
        eff:sp.Skeleton,
    },

    showData() {
        var t = this.data;
        if (t) {
            for (var e = null,
            o = 0; n.unionProxy.bossInfo && o < n.unionProxy.bossInfo.length; o++) if (n.unionProxy.bossInfo[o].id == t.id) {
                e = n.unionProxy.bossInfo[o];
                break;
            }
            this.lblName.string = t.name;
            this.lblRwd1.string = i18n.t("UNION_TOTAL_GONG_XIAN") + "+" + t.rwd.fund;
            this.lblRwd2.string = i18n.t("UNION_EXP_TXT_2") + "+" + t.rwd.exp;
            this.btnOpen.node.active = !0;
            this.btnRank.node.active = !1;
            this.btnEnter.node.active = !1;
            this.btnLook.node.active = !1;
            this.roleUrl.url = a.uiHelps.getServantSmallSpine(t.image);
            if (e && e.id == t.id) {
                this.btnOpen.node.active = !1;
                this.btnEnter.node.active = 1 == e.type;
                this.btnRank.node.active = 1 == e.type;
                this.btnLook.node.active = 2 == e.type;
                var i = e.hp < 0 ? 0 : e.hp;
                this.lblPro.progress = i / t.hp;
                var r = ((i / t.hp) * 100).toFixed(2);
                this.lblPer.string = 1 == e.type ? r + "%": 3 == e.type ? i18n.t("union_scaped") : i18n.t("union_killed");
                var s = l.timeUtil.second > l.timeUtil.getTodaySecond(0) && l.timeUtil.second < l.timeUtil.getTodaySecond(23.5);
                this.eff.node.active = 1 == e.type && s;
                this.eff.animation = "animation";
            } else {
                this.lblPro.progress = 1;
                this.lblPer.string = "100%";
                this.eff.node.active = !1;
            }
        }
    },
    onClickEnter() {
        if (l.timeUtil.second > l.timeUtil.getTodaySecond(0) && l.timeUtil.second < l.timeUtil.getTodaySecond(23.5)) {
            n.unionProxy.openCopyParam = this.data;
            l.utils.openPrefabView("union/UnionFight");
            l.utils.closeNameView("union/UnionCopy");
        } else l.alertUtil.alert18n("UNION_COPY_TIME_PASS");
    },
    onClickOpen() {
        if (n.unionProxy.memberInfo.post > 2) l.alertUtil.alert18n("UNION_COPY_OPEN_LIMIT");
        else {
            n.unionProxy.openCopyParam = this.data;
            l.utils.openPrefabView("union/UnionOpenCopy");
        }
    },
    onClickLook() {
        n.unionProxy.openCopyParam = this.data;
        var t = this.data;
        t && n.unionProxy.sendHitList(t.id);
    },
    onClickRank() {
        n.unionProxy.openCopyParam = this.data;
        var t = this.data;
        t && n.unionProxy.sendHitList(t.id);
    },
    onClickReopen() {
        n.unionProxy.openCopyParam = this.data;
    },
});
