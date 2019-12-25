var i = require("./UrlLoad");
var n = require("../utils/UIUtils");
var l = require("../Initializer");
var r = require("../Config");
cc.Class({
    extends: cc.Component,
    properties: {
        body: i,
        head: i,
        headDesF: i,
        headDesH: i,
        earH: i,
        earF: i,
        effF: i,
        effH: i,
        animalH: i,
        animalF: i,
        isLoadPlayer:{ default:false, tooltip: "是否加载主角形象" },
        isStop:{ default:false, tooltip: "是否停止 用于头像用" },
        isShowBody:{ default:true, tooltip: "是否不显示身体 用于头像用" },
        isMainScene:{default:false, tooltip: "是否用于主场景" }
    },
    ctor() {
        this.bodySp = null;
        this.headSp = null;
        this.headHSp = null;
        this.headFSp = null;
        this.earHSp = null;
        this.earFSp = null;
        this.aStr = "";
        this._headArray = null;
    },
    onLoad() {
        this.addSp(this.body, "bodySp");
        this.addSp(this.head, "headSp", this.aStr);
        this.addSp(this.headDesH, "headHSp");
        this.addSp(this.headDesF, "headFSp");
        this.addSp(this.earF, "earFSp");
        this.addSp(this.earH, "earHSp");
        this.isLoadPlayer && this.updatePlayerShow();
    },
    addSp(t, e, o) {
        void 0 === o && (o = "zhengchang");
        var i = this;
        t && (t.loadHandle = function() {
            var n = t.getComponentInChildren(sp.Skeleton);
            i[e] = n;
            if (n) {
                n.animation = i.isStop ? "": o;
                i.setDelayAction();
            }
        });
    },
    setDelayAction() {
        this.unscheduleAllCallbacks();
        this.scheduleOnce(this.setAstrAction, 0.1);
    },
    setAstrAction() {
        this.actionString(this.aStr, !1);
    },
    updatePlayerShow() {
        var t = l.playerProxy ? l.playerProxy.userData: null;
        var level = t.level;
        if (level === 0 && this.isMainScene) {
            // 主场景level为0时直接level 1；
            level = 1;
        }
        this.setClothes(t.sex, t.job, level, l.playerProxy.userClothe);
    },
    actionString(t, e) {
        void 0 === t && (t = "zhengchang");
        void 0 === e && (e = !0);
        if (! ((this.aStr == t && e) || this.isStop)) {
            this.aStr = t;
            // this.bodySp && (this.bodySp.animation = "zhengchang");
            // this.headFSp && (this.headFSp.animation = "zhengchang");
            // this.headHSp && (this.headHSp.animation = "zhengchang");
            // this.earFSp && (this.earFSp.animation = "zhengchang");
            // this.earHSp && (this.earHSp.animation = "zhengchang");
            // this.headSp && (this.headSp.animation = t);
            if(this.bodySp) {
                this.bodySp.animation = this.bodySp.findAnimation("zhengchang") ? "zhengchang" : "animation";
            }
            if (this.headFSp) {
                this.headFSp.animation = this.headFSp.findAnimation("zhengchang") ? "zhengchang" : "animation";
            }
            if (this.headHSp) {
                this.headHSp.animation = this.headHSp.findAnimation("zhengchang") ? "zhengchang" : "animation";
            }
            if (this.earFSp) {
                this.earFSp.animation = this.earFSp.findAnimation("zhengchang") ? "zhengchang" : "animation";
            }
            if (this.earHSp) {
                this.earHSp.animation = this.earHSp.findAnimation("zhengchang") ? "zhengchang" : "animation";
            }
            this.headSp && (this.headSp.animation = t);
        }
    },
    setRoleLevel(t) {
        var e = l.playerProxy ? l.playerProxy.userData: null,
        o = null;
        null != l.playerProxy.userClothe && 0 != l.playerProxy.userClothe.ear && (o = {
            body: 0,
            head: 0,
            ear: l.playerProxy.userClothe.ear
        });
        this.setClothes(e.sex, e.job, t, o);
    },
    setLevel(t, e, o) {
        this.setClothes(t, e, o, null);
    },

    setCreateClothes (sex, key, lv, clothe) {
        var body = l.playerProxy.getPartId(2, "body_0_" + "50");
        var head = l.playerProxy.getPartId(1, "headf_0_" + "50");
        var obj = {};
        obj.body = body;
        obj.animal = clothe ? clothe.animal : 0;
        obj.ear = clothe ? clothe.ear : 0;
        obj.effect = clothe ? clothe.effect : 0;
        obj.head = head;
        this.setClothePart(sex, key, obj);
    },

    setClothes(t, e, o, i) {
        var n = null == i ? 0 : i.body,
        r = null == i ? 0 : i.head;
        if (0 == r || 0 == n) {
            var a = localcache.getItem(localdb.table_officer, o);
            if (null == a) return;
            var s = localcache.getItem(localdb.table_roleSkin, a.shizhuang);
            0 == n && (n = l.playerProxy.getPartId(2, "body_0_" + s.body));
            0 == r && (r = l.playerProxy.getPartId(1, "headf_0_" + s.headf));
            0 == r && (r = l.playerProxy.getPartId(1, "headh_0_" + s.headh));
        }
        var c = {};
        c.body = n;
        c.animal = i ? i.animal: 0;
        c.ear = i ? i.ear: 0;
        c.effect = i ? i.effect: 0;
        c.head = r;
        this.setClothePart(t, e, c);
    },
    getHeadArr() {
        if (null == this._headArray) {
            this._headArray = [];
            for (var t = localcache.getList(localdb.table_userjob), e = 0; e < t.length; e++)(null != t[e].display && 0 != t[e].display.length && -1 == t[e].display.indexOf(r.Config.pf)) || this._headArray.push(t[e].id);
        }
        return this._headArray;
    },
    setClothePart(t, e, o) {
        0;
        e = parseInt(e);
        e = isNaN(e) ? 1 : e;
        var i = this.getHeadArr();
        r.Config.addShowCreateHeadId && r.Config.addShowCreateHeadId.length > 0 && (i = i.concat(r.Config.addShowCreateHeadId));
        e = -1 == i.indexOf(e) ? 3 : e;
        if (this.head) {
            this.head.url = "";
            this.head.url = n.uiHelps.getHead(0, e);
        }
        var l = localcache.getItem(localdb.table_userClothe, o.body);
        l && this.isShowBody && this.body && (this.body.url = n.uiHelps.getRoleSpinePart(l.model));
        this.setPartUrl(o.head, this.headDesH, this.headDesF, "headh", "headf");
        this.setPartUrl(o.ear, this.earF, this.earH, "earf", "earh");
        this.setPartUrl(o.effect, this.effH, this.effF, "effh", "efff");
        this.setPartUrl(o.animal, this.animalH, this.animalF, "anih", "anif");
        this.actionString();
    },
    setPartUrl(t, e, o, i, l) {
        e && (e.url = "");
        o && (o.url = "");
        var r = localcache.getItem(localdb.table_userClothe, t);
        if (r) for (var a = r.model.split("|"), s = 0; s < a.length; s++) {
            e && -1 != a[s].indexOf(i) && e.node.active && (e.url = n.uiHelps.getRoleSpinePart(a[s]));
            o && -1 != a[s].indexOf(l) && o.node.active && (o.url = n.uiHelps.getRoleSpinePart(a[s]));
        }
    },
});
