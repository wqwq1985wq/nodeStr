var i = require("../../utils/Utils");
var n = require("../../component/UrlLoad");
var l = require("../../utils/UIUtils");
var r = require("./DalishiServantItem");
var a = require("../../Initializer");
cc.Class({
    extends: cc.Component,

    properties: {
        lblEnemy:cc.Label,
        lblEnemyZZ:cc.Label,
        lblEnemyPer:cc.Label,
        prgEnemy:cc.ProgressBar,
        enemyUrl:n,
        enemy:r,
        lblEnemyTalk:cc.Label,
        nodeEnemyTalk:cc.Node,
        rightSp:sp.Skeleton,
        lblDamge2:cc.Label,
        servant:r,
        lblName:cc.Label,
        lblZZ:cc.Label,
        lblPer:cc.Label,
        prg:cc.ProgressBar,
        url:n,
        lblTalk:cc.Label,
        nodeTalk:cc.Node,
        leftSp:sp.Skeleton,
        lblDamge1:cc.Label,
    },

    ctor(){
        this._curIndex = 0;
        this._enemyHp = 0;
        this._meHp = 0;
        this._enemyMax = 0;
        this._meMax = 0;
    },

    onLoad() {
        var t = a.dalishiProxy.win.fight,
        e = t.base[0],
        o = localcache.getItem(localdb.table_hero, e.hid);
        this.url.url = l.uiHelps.getServantHead(e.hid);
        this.servant.data = {
            id: e.hid
        };
        this.lblName.string = i18n.t("DALISI_NAME_SERVANT", {
            n: o ? o.name: "",
            d: e.level
        });
        this.lblZZ.string = i18n.t("SERVANT_ZHZZ", {
            zz: e.azz
        });
        this.lblPer.string = i18n.t("COMMON_NUM", {
            f: e.hp,
            s: e.hpmax
        });
        this.prg.progress = e.hp / e.hpmax;
        this._meHp = e.hp;
        this._meMax = e.hpmax;
        var i = t.base[1],
        n = localcache.getItem(localdb.table_hero, i.hid);
        this.enemyUrl.url = l.uiHelps.getServantHead(i.hid);
        this.enemy.data = {
            id: i.hid
        };
        this.lblEnemy.string = i18n.t("DALISI_NAME_SERVANT", {
            n: n ? n.name: "",
            d: i.level
        });
        this.lblEnemyZZ.string = i18n.t("SERVANT_ZHZZ", {
            zz: i.azz
        });
        this.lblEnemyPer.string = i18n.t("COMMON_NUM", {
            f: i.hpmax,
            s: i.hpmax
        });
        this.prgEnemy.progress = i.hp / i.hpmax;
        this._enemyHp = this._enemyMax = i.hpmax;
        this._curIndex = 0;
        this.showCurIndex();
    },
    showCurIndex() {
        var t = a.dalishiProxy.win.fight,
        e = t ? t.log[this._curIndex] : null;
        if (null != e) {
            if (1 == e.aid) {
                var o = this._meHp / this._meMax;
                this._meHp -= e.damge;
                this._meHp = this._meHp < 0 ? 0 : this._meHp;
                this.lblPer.string = i18n.t("COMMON_NUM", {
                    f: this._meHp,
                    s: this._meMax
                });
                l.uiUtils.showPrgChange(this.prg, o, this._meHp / this._meMax);
                this.nodeTalk.active = !1;
                this.nodeEnemyTalk.active = !0;
                i.utils.showNodeEffect(this.nodeEnemyTalk, 0);
                this.lblEnemyTalk.string = a.dalishiProxy.getTalkType(4);
                l.uiUtils.showShake(this.servant);
                this.leftSp.node.active = !0;
                this.leftSp.animation = "animation";
                this.lblDamge1.string = "-" + i.utils.formatMoney(e.damge);
                this.lblDamge1.node.active = !0;
                i.utils.showEffect(this.lblDamge1, 0);
            } else if (0 == e.aid) {
                o = this._enemyHp / this._enemyMax;
                this._enemyHp -= e.damge;
                this._enemyHp = this._enemyHp < 0 ? 0 : this._enemyHp;
                this.lblEnemyPer.string = i18n.t("COMMON_NUM", {
                    f: this._enemyHp,
                    s: this._enemyMax
                });
                l.uiUtils.showPrgChange(this.prgEnemy, o, this._enemyHp / this._enemyMax);
                this.nodeTalk.active = !0;
                this.nodeEnemyTalk.active = !1;
                i.utils.showNodeEffect(this.nodeTalk, 0);
                this.lblTalk.string = a.dalishiProxy.getTalkType(3);
                l.uiUtils.showShake(this.enemy);
                this.rightSp.node.active = !0;
                this.rightSp.animation = "animation";
                this.lblDamge2.string = "-" + i.utils.formatMoney(e.damge);
                this.lblDamge2.node.active = !0;
                i.utils.showEffect(this.lblDamge2, 0);
            }
            this._curIndex += 1;
            this.scheduleOnce(this.showCurIndex, 2);
        } else this.onClickSkip();
    },
    onClickSkip() {
        var t = a.dalishiProxy.win.fight;
        t && 1 == t.win ? i.utils.openPrefabView("dalishi/FightWin") : t && 0 == t.win && i.utils.openPrefabView("dalishi/FightLost");
        this.onClickClost();
    },
    onClickClost() {
        i.utils.closeView(this);
    },
});
