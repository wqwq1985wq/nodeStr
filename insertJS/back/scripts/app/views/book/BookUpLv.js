var i = require("../../component/UrlLoad");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../item/ItemSlotUI");
var a = require("../../utils/UIUtils");
var s = require("../../formula");
cc.Class({
    extends: cc.Component,
    properties: {
        lblName: cc.Label,
        lblCur: cc.Label,
        lblNext: cc.Label,
        itemSlot: r,
        itemName1: cc.Label,
        itemName2: cc.Label,
        gailv1: cc.Label,
        gailv2: cc.Label,
        iconArr: [cc.SpriteFrame],
        icon_1: i,
        icon_2: i,
    },
    ctor() {
        this.costSys = null;
        this.heroData = null;
        this.upSys = null;
    },
    onLoad() {
        facade.subscribe("SERVANT_UP", this.updateData, this);
        this.curData = this.node.openParam;
        this.heroData = l.servantProxy.getHeroData(l.servantProxy.curSelectId);
        this.onShowData();
    },
    updateData() {
        var t = this.curData.level;
        this.heroData = l.servantProxy.getHeroData(l.servantProxy.curSelectId);
        if (this.heroData) for (var e = 0; e < this.heroData.epskill.length; e++) if (this.curData.id == this.heroData.epskill[e].id) {
            this.curData = this.heroData.epskill[e];
            break;
        }
        t < this.curData.level ? n.alertUtil.alert(i18n.t("SERVANT_EPSKILL_UP_SUCCESS")) : n.alertUtil.alert(i18n.t("SERVANT_EPSKILL_UP_FAIL"));
        this.onShowData();
    },
    onShowData() {
        if (this.curData) {
            var t = localcache.getItem(localdb.table_epSkill, this.curData.id + ""),
            e = s.formula.partner_prop(this.heroData.level, t.star, this.curData.level - 1),
            o = s.formula.partner_prop(this.heroData.level, t.star, this.curData.level);
            this.lblName.string = t.name + " Lv." + this.curData.level;
            this.lblCur.string = "+" + e;
            this.lblNext.string = "+" + o;
            var i = localcache.getItem(localdb.table_epSkill, this.curData.id);
            this.upSys = localcache.getItem(localdb.table_epLvUp, i.star);
            this.gailv1.string = i18n.t("SERVANT_UP_GAI_LV") + this.upSys.prob_100 + "%";
            this.gailv2.string = i18n.t("SERVANT_UP_GAI_LV") + "100%";
            1 == i.ep ? (this.costSys = localcache.getItem(localdb.table_item, 61)) : 2 == i.ep ? (this.costSys = localcache.getItem(localdb.table_item, 62)) : 3 == i.ep ? (this.costSys = localcache.getItem(localdb.table_item, 63)) : 4 == i.ep && (this.costSys = localcache.getItem(localdb.table_item, 64)); (this.itemName1.string = this.costSys.name + "(" + l.bagProxy.getItemCount(this.costSys.id) + "/" + this.upSys.quantity + ")"),
            (this.itemName2.string = i18n.t("COMMON_SJJY") + "：" + this.heroData.zzexp + "/" + this.upSys.exp);
            var n = new a.ItemSlotData();
            n.id = this.costSys.id;
            this.itemSlot.data = n;
            this.icon_1.url = this.icon_2.url = a.uiHelps.getLangSp(i.ep);
        }
    },
    onClickUp(t, e) {
        if (1 == parseInt(e)) {
            if (this.heroData.zzexp < this.upSys.exp) {
                n.alertUtil.alert(i18n.t("COMMON_LIMIT", {
                    n: i18n.t("COMMON_SJJY")
                }));
                return;
            }
        } else if (2 == parseInt(e)) {
            if (l.bagProxy.getItemCount(this.costSys.id) < 1) {
                n.alertUtil.alertItemLimit(this.costSys.id);
                return;
            }
        }
        l.servantProxy.sendUpZzSkill(l.servantProxy.curSelectId, this.curData.id, parseInt(e));
        n.audioManager.playSound("levelup", !0, !0);
    },
    onClickClose() {
        n.utils.closeView(this);
    },
});
