var i = require("../../utils/Utils");
var n = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        lblUpNeed: cc.Label,
        lblCurEff: cc.Label,
        lblNextEff: cc.Label,
        lblName: cc.Label,
        lblExp: cc.Label,
    },
    ctor() {
        this._curSkillData = null;
        this._curHero = null;
        this.skill = null;
        this._oldLv = 0;
    },
    onLoad() {
        facade.subscribe("SERVANT_SKILL_UP", this.onDataUpdate, this);
        var t = this.node.openParam;
        this.skill = t._skill;
        this._curHero = t._hero;
        this._oldLv = this.skill.level;
        this.onSkillUpdate();
    },
    onDataUpdate() {
        this._curHero = n.servantProxy.getHeroData(this._curHero.id);
        for (var t = 0; t < this._curHero.pkskill.length; t++) if (this._curHero.pkskill[t].id == this.skill.id) {
            this._oldLv < this._curHero.pkskill[t].level && i.alertUtil.alert(i18n.t("SERVANT_TE_CHANG_LEVEL_UP"));
            this.skill = this._curHero.pkskill[t];
            break;
        }
        this.onSkillUpdate();
    },
    onSkillUpdate() {
        if (this.skill) {
            this._curSkillData = this.skill;
            var t = localcache.getItem(localdb.table_pkSkill, this.skill.id),
            e = localcache.getItem(localdb.table_pkLvUp, this.skill.level);
            this.lblName.string = i18n.t("SERVANT_SKILL_NAME_TXT", {
                name: t.name,
                lv: this._curSkillData.level
            });
            this.lblUpNeed.string = e.exp + "";
            this.lblExp.string = this._curHero.pkexp + "";
            this.lblCurEff.string = (t.base + t.upgrade * this.skill.level) / 100 + "%" + t.comm;
            this.skill.level < t.maxLevel ? (this.lblNextEff.string = (t.base + t.upgrade * (this.skill.level + 1)) / 100 + "%" + t.comm) : (this.lblNextEff.string = i18n.t("SERVANT_MAX_LEVEL"));
        }
    },
    onClickSkillUp(t, e) {
        var o = this._curSkillData,
        l = localcache.getItem(localdb.table_pkSkill, o.id),
        r = localcache.getItem(localdb.table_pkLvUp, o.level);
        if (o.level < l.maxLevel) if (r.exp > this._curHero.pkexp) i.alertUtil.alert(i18n.t("SERVANT_SKILL_EXP_LIMIT"));
        else {
            n.servantProxy.sendUpPkSkill(this._curHero.id, o.id);
            i.audioManager.playSound("levelup", !0, !0);
        }
    },
    onClickClose() {
        i.utils.closeView(this);
    },
});
