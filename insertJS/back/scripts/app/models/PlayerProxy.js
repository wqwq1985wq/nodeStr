var i = require("../utils/Utils");
var n = require("../Initializer");
var l = require("../utils/ApiUtils");
var r = require("./TimeProxy");
var a = require("../component/RedDot");
var PlayerProxy = function() {

    this.PLAYER_USER_UPDATE = "PLAYER_USER_UPDATE";
    this.PLAYER_FUSER_UPDATE = "PLAYER_FUSER_UPDATE";
    this.PLAYER_GUIDE_UPDATE = "PLAYER_GUIDE_UPDATE";
    this.PLAYER_EP_UPDATE = "PLAYER_EP_UPDATE";
    this.PLAYER_LEVEL_UPDATE = "PLAYER_LEVEL_UPDATE";
    this.PLAYER_PAOMA_UPDATE = "PLAYER_PAOMA_UPDATE";
    this.PLAYER_HERO_SHOW = "PLAYER_HERO_SHOW";
    this.PLAYER_CLOTH_UPDATE = "PLAYER_CLOTH_UPDATE";
    this.PLAYER_CLOTH_SUIT_LV = "PLAYER_CLOTH_SUIT_LV";
    this.PLAYER_SHOW_CHANGE_UPDATE = "PLAYER_SHOW_CHANGE_UPDATE";
    this.PLAYER_LIMIT_TIME = "PLAYER_LIMIT_TIME";
    this.PLAYER_UPDATE_HEAD = "PLAYER_UPDATE_HEAD";
    this.PLAYER_RESET_JOB = "PLAYER_RESET_JOB";
    this.PLAYER_CLOTHE_SCORE = "PLAYER_CLOTHE_SCORE";
    this.PLAYER_QIFU_UPDATE = "PLAYER_QIFU_UPDATE";
    this.PLAYER_ADDITION_UPDATE = "PLAYER_ADDITION_UPDATE";
    this.GUANG_GAO_UPDATE = "GUANG_GAO_UPDATE";
    this.PLAYER_ALLJOBS_UPDATE = "PLAYER_ALLJOBS_UPDATE";
    this.userData = null;
    this.userEp = null;
    this.fuser = null;
    this.guide = null;
    this.paoma = null;
    this.clothes = null;
    this.limitTime = null;
    this.blanks = null;
    this.headavatar = null;
    this.blankTime = null;
    this.userClothe = null;
    this.qifuData = null;
    this.addition = null;
    this.suitlv = null;
    this.percentage = null;
    this.guanggao = null;
    this.clotheScore = 0;
    this.heroShow = 1;
    this.storyIds = [];
    this.allJobs = [];
    this._maxLv = 0;
    this._allOffice = null;

    this.ctor = function() {
        JsonHttp.subscribe(proto_sc.user.ep, this.onEpData, this);
        JsonHttp.subscribe(proto_sc.user.fuser, this.onFuserData, this);
        JsonHttp.subscribe(proto_sc.user.guide, this.onGuideData, this);
        JsonHttp.subscribe(proto_sc.user.user, this.onUserData, this);
        JsonHttp.subscribe(proto_sc.user.paomadeng, this.onPaoMa, this);
        JsonHttp.subscribe(proto_sc.user.heroShow, this.onHeroShow, this);
        JsonHttp.subscribe(proto_sc.clothe.clothes, this.onClothes, this);
        JsonHttp.subscribe(
            proto_sc.clothe.limittime,
            this.onLimitTime,
            this
        );
        JsonHttp.subscribe(proto_sc.clothe.suitlv, this.onSuitLv, this);
        JsonHttp.subscribe(proto_sc.userhead.blanks, this.onBlanks, this);
        JsonHttp.subscribe(
            proto_sc.userhead.headavatar,
            this.onHeadAvatar,
            this
        );
        JsonHttp.subscribe(
            proto_sc.userhead.blanktime,
            this.onBlankTime,
            this
        );
        JsonHttp.subscribe(
            proto_sc.clothe.userClothe,
            this.onUserClothe,
            this
        );
        JsonHttp.subscribe(proto_sc.clothe.score, this.onClotheScore, this);
        JsonHttp.subscribe(proto_sc.user.qifu, this.onQifuDat, this);
        JsonHttp.subscribe(proto_sc.user.addition, this.onAddition, this);
        JsonHttp.subscribe(
            proto_sc.user.percentage,
            this.onPercentage,
            this
        );
        JsonHttp.subscribe(
            proto_sc.advert.cfg,
            this.onUpdateGuangGao,
            this
        );
        this.storyIds = [];
    };
    this.clearData = function() {
        this.userEp = null;
        this.storyIds = [];
        this.heroShow = 1;
        this.paoma = null;
        this.guide = null;
        this.fuser = null;
        this.clothes = null;
        this.limitTime = null;
        this.blanks = null;
        this.headavatar = null;
        this.blankTime = null;
        this.userClothe = null;
        this.clotheScore = 0;
        this.suitlv = null;
        this.percentage = null;
        this.guanggao = null;
    };
    this.onSuitLv = function(t) {
        this.suitlv = t;
        facade.send(this.PLAYER_CLOTH_SUIT_LV);
    };
    this.onClotheScore = function(t) {
        this.clotheScore = null == t.score ? 0 : t.score;
        facade.send(this.PLAYER_CLOTHE_SCORE);
    };
    this.onUserClothe = function(t) {
        this.userClothe = t;
        facade.send(this.PLAYER_SHOW_CHANGE_UPDATE);
    };
    this.onBlankTime = function(t) {
        this.blankTime = t;
    };
    this.onBlanks = function(t) {
        this.blanks = t;
    };
    this.onHeadAvatar = function(t) {
        this.headavatar = t;
        facade.send(this.PLAYER_UPDATE_HEAD);
    };
    this.onLimitTime = function(t) {
        this.limitTime = t;
        facade.send(this.PLAYER_LIMIT_TIME);
    };
    this.onUserData = function(t) {
        console.log(t);

        null == this.userData && (this.userData = new proto_sc.user.user());
        var e = this.userData.level,
            o = this.userData.exp,
            n = this.userData.bmap;

        var lastAllJobs = this.userData.allJob;


        i.utils.copyData(this.userData, t);
        facade.send(this.PLAYER_USER_UPDATE);
        if (e != this.userData.level && 0 != e && null != e) {
            facade.send(this.PLAYER_LEVEL_UPDATE);
            l.apiUtils.levelUp();
        }
        null == o ||
            null == e ||
            (o == this.userData.exp && e == this.userData.level) ||
            this.updateRoleLvupRed();
        n != this.userData.bmap && 2 == n && l.apiUtils.completeTutorial();

        if(this.userData.allJob !== lastAllJobs) {
            // 更新allJob
            facade.send(this.PLAYER_ALLJOBS_UPDATE);
        }
    };
    this.updateRoleLvupRed = function() {
        var t = localcache.getItem(
            localdb.table_officer,
            this.userData.level
        );
        if (null != t) {
            var e = this.userData.exp >= t.need_exp;
            if (e) {
                for (
                    var o = i.stringUtil.isBlank(t.condition)
                            ? []
                            : t.condition.split("|"),
                        n = 0;
                    n < o.length;
                    n++
                ) {
                    var l = localcache.getItem(
                        localdb.table_officerType,
                        o[n]
                    );
                    if (!this.officeLvIsOver(l)) {
                        e = !1;
                        break;
                    }
                }
                a.change("rolelvup", e);
            } else a.change("rolelvup", e);
        }
    };
    this.onGuideData = function(t) {
        this.guide = t;
        facade.send(this.PLAYER_GUIDE_UPDATE);
    };
    this.onFuserData = function(t) {
        this.fuser = t;
        facade.send(this.PLAYER_FUSER_UPDATE);
    };
    this.onEpData = function(t) {
        this.userEp = t;
        facade.send(this.PLAYER_EP_UPDATE);
    };
    this.onPaoMa = function(t) {
        if (null != t && 0 != t.length) {
            null == this.paoma && (this.paoma = []);
            for (var e = 0; e < t.length; e++) this.paoma.push(t[e]);
            facade.send(this.PLAYER_PAOMA_UPDATE);
        }
    };
    this.onHeroShow = function(t) {
        this.heroShow = 0 == t.id ? 1 : t.id;
        facade.send(this.PLAYER_HERO_SHOW);
    };
    this.onClothes = function(t) {
        this.clothes = t;
        facade.send(this.PLAYER_CLOTH_UPDATE);
    };
    this.onPercentage = function(t) {
        this.percentage = t;
    };
    this.onUpdateGuangGao = function(t) {
        this.guanggao = t;
        facade.send(this.GUANG_GAO_UPDATE);
    };
    this.addStoryId = function(t) {
        if (-1 == this.storyIds.indexOf(t)) {
            this.storyIds.push(t);
            facade.send("SHOW_STORY");
        }
    };
    this.sendAdok = function(t) {
        var e = new proto_cs.user.adok();
        e.label = t;
        JsonHttp.send(e);
    };
    this.sendUserUp = function() {
        var t = new proto_cs.user.shengguan();
        JsonHttp.send(t, function() {
            i.utils.openPrefabView("user/UserUpEffect");
        });
    };
    this.getPartId = function(t, e) {
        var o = localcache.getGroup(localdb.table_userClothe, "part", t);
        if (null == o) return 0;
        for (var i = 0; i < o.length; i++)
            for (var n = o[i].model.split("|"), l = 0; l < n.length; l++)
                if (n[l] == e) return o[i].id;
        return 0;
    };
    this.sendHeroShow = function(t) {
        var e = new proto_cs.user.serHeroShow();
        e.id = t;
        JsonHttp.send(e);
    };
    this.getStoryData = function(t) {
        if (i.stringUtil.isBlank(t)) return null;
        var e = localcache.getItem(localdb.table_story2, t);
        return (
            e ||
            ((e = localcache.getItem(localdb.table_story3, t))
                ? e
                : (e = localcache.getItem(localdb.table_story4, t))
                ? e
                : (e = localcache.getItem(localdb.table_story5, t))
                ? e
                : (e = localcache.getItem(localdb.table_story6, t))
                ? e
                : (e = localcache.getItem(localdb.table_storyzw, t)) ||
                  null)
        );
    };
    this.getStorySelect = function(t) {
        var e;
        if (
            null ==
            (e = localcache.getGroup(
                localdb.table_storySelect2,
                "group",
                t
            ))
        )
            return null;
        for (var o = [], i = 0; i < e.length; i++) {
            var n = e[i];
            this.stroyIsCanSelect(n.chose1 + "") && o.push(n);
        }
        return o;
    };
    this.stroyIsCanSelect = function(t) {
        if (i.stringUtil.isBlank(t)) return !0;
        var e = t.split("|");
        switch (parseInt(e[0])) {
            case 1:
                return n.bagProxy.getItemCount(parseInt(e[1])) > 0;

            case 2:
                return (
                    n.jibanProxy.getWifeJB(parseInt(e[1])) >= parseInt(e[2])
                );

            case 3:
                return (
                    n.jibanProxy.getHeroJB(parseInt(e[1])) >= parseInt(e[2])
                );

            case 4:
                return this.userData.level >= parseInt(e[1]);

            case 5:
                var o = parseInt(e[1]);
                return n.jibanProxy.getHeroSW(o) >= parseInt(e[2]);

            case 6:
                o = parseInt(e[1]);
                return n.jibanProxy.getMaxSW() <= n.jibanProxy.getHeroSW(o);

            case 7:
                return null == n.servantProxy.getHeroData(parseInt(e[1]));

            case 8:
                return null == n.wifeProxy.getWifeData(parseInt(e[1]));
        }
        return !1;
    };
    this.getEmailData = function(t) {
        return localcache.getItem(localdb.table_email, t);
    };
    this.getEmailGroup = function(t, e) {
        return localcache.getGroup(localdb.table_email, e, t);
    };
    this.getReplaceName = function(t) {
        return null == t || null == this.userData
            ? ""
            : (t = (t = t.replace("#name#", this.userData.name)).replace(
                  "#chenghu#",
                  1 == this.userData.sex
                      ? i18n.t("COMMON_DIANXIA")
                      : i18n.t("COMMON_GEGE")
              ));
    };
    this.getMaxLv = function() {
        this.initOffice();
        return this._maxLv;
    };
    this.initOffice = function() {
        if (0 == this._maxLv) {
            var t = localcache.getList(localdb.table_officer);
            this._allOffice = [];
            for (var e = 0; e < t.length; e++)
                0 != t[e].id && this._allOffice.push(t[e]);
            this._maxLv = t[t.length - 1].id;
        }
    };
    this.getAllOffice = function() {
        this.initOffice();
        return this._allOffice;
    };
    this.getOfficeDes = function(t) {
        if (null == t) return "";
        var e = "",
            o = 1;
        if (0 != t.heroid) {
            var i = localcache.getItem(localdb.table_hero, t.heroid);
            null != i &&
                (e += i18n.t("COMMON_CONTEXT_NUM", {
                    c: o++,
                    n: i18n.t("USER_LOCK_HERO", {
                        n: i.name
                    })
                }));
        }
        var n = localcache.getGroup(localdb.table_jyBase, "guanid", t.id),
            l = {};
        if (n && n.length > 0) {
            for (var r = 0; r < n.length; r++) l[n[r].type] = n[r].name;
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_QINAN_GOLD", {
                    n: t.qingAn
                })
            });
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_SP_TIP4", {
                    n: t.max_zw
                })
            });
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_SP_TIPSP", {
                    n: l[2],
                    c: t.max_jy
                })
            });
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_SP_TIPSP", {
                    n: l[3],
                    c: t.max_jy
                })
            });
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_SP_TIPSP", {
                    n: l[4],
                    c: t.max_jy
                })
            });
            t.pray > 0 &&
                (e += i18n.t("COMMON_CONTEXT_NUM", {
                    c: o++,
                    n: i18n.t("USER_SP_TIP5", {
                        n: t.pray
                    })
                }));
        } else {
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_QINAN_GOLD", {
                    n: t.qingAn
                })
            });
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_SP_TIP1", {
                    n: t.max_jy
                })
            });
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_SP_TIP2", {
                    n: t.max_jy
                })
            });
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_SP_TIP3", {
                    n: t.max_jy
                })
            });
            e += i18n.t("COMMON_CONTEXT_NUM", {
                c: o++,
                n: i18n.t("USER_SP_TIP4", {
                    n: t.max_zw
                })
            });
            t.pray > 0 &&
                (e += i18n.t("COMMON_CONTEXT_NUM", {
                    c: o++,
                    n: i18n.t("USER_SP_TIP5", {
                        n: t.pray
                    })
                }));
        }
        return e;
    };
    this.getWifeName = function(t) {
        var e = localcache.getItem(localdb.table_wife, t);
        return e ? (1 == this.userData.sex ? e.wname : e.wname2) : "";
    };
    this.getFirstStoryId = function() {
        var t = i.utils.getParamInt(
            (2 == this.userData.sex
                ? "guide_first_femaleid"
                : "guide_first_maleid") + this.userData.job
        );
        return 0 == t ? 1 : t;
    };
    this.getKindIdName = function(t, e) {
        switch (t) {
            case 3:
                return (n = localcache.getItem(localdb.table_wife, e))
                    ? (1 == this.userData.sex ? n.wname : n.wname2) +
                          i18n.t("COMMON_QMD")
                    : i18n.t("COMMON_QMD");

            case 4:
                return (n = localcache.getItem(localdb.table_wife, e))
                    ? (1 == this.userData.sex ? n.wname : n.wname2) +
                          i18n.t("COMMON_MLZ")
                    : i18n.t("COMMON_MLZ");

            case 5:
                return (s = localcache.getItem(localdb.table_hero, e))
                    ? s.name + i18n.t("COMMON_SJJY")
                    : i18n.t("COMMON_SJJY");

            case 6:
                return (s = localcache.getItem(localdb.table_hero, e))
                    ? s.name + i18n.t("COMMON_JNJY")
                    : i18n.t("COMMON_JNJY");

            case 7:
                return (s = localcache.getItem(localdb.table_hero, e))
                    ? i18n.t("COMMON_HDMK") + s.name
                    : "";

            case 8:
                return (n = localcache.getItem(localdb.table_wife, e))
                    ? i18n.t("COMMON_HDHY") +
                          (1 == this.userData.sex ? n.wname : n.wname2)
                    : "";

            case 9:
                return (n = localcache.getItem(localdb.table_wife, e))
                    ? (1 == this.userData.sex ? n.wname : n.wname2) +
                          i18n.t("COMMON_HGD")
                    : i18n.t("COMMON_HGD");

            case 10:
                var o = localcache.getItem(localdb.table_fashion, e);
                return o ? o.name : "";

            case 2:
                var i = localcache.getItem(localdb.table_enumItem, e);
                return i ? i.title : "";

            case 12:
                return (n = localcache.getItem(localdb.table_wife, e))
                    ? (1 == this.userData.sex ? n.wname : n.wname2) +
                          i18n.t("COMMON_WIFE_EXP")
                    : i18n.t("COMMON_WIFE_EXP");

            case 90:
                return 0 == e
                    ? i18n.t("SERVANT_ROLE_SW")
                    : (s = localcache.getItem(localdb.table_hero, e))
                    ? i18n.t("SERVANT_HERO_SW", {
                          n: s.name
                      })
                    : "";

            case 91:
                return i18n.t("SERVANT_ROLE_SW");

            case 92:
                return (s = localcache.getItem(localdb.table_hero, e))
                    ? i18n.t("SERVANT_JIBAN_HERO", {
                          n: s.name
                      })
                    : "";

            case 93:
                var n = localcache.getItem(localdb.table_wife, e);
                return s
                    ? i18n.t("SERVANT_JIBAN_WIFE", {
                          n: 1 == this.userData.sex ? n.wname : n.wname2
                      })
                    : "";

            case 94:
                var l = localcache.getItem(localdb.table_userblank, e);
                return l ? l.name : "";

            case 95:
                var r = localcache.getItem(localdb.table_userClothe, e);
                return r ? r.name : "";

            case 96:
                return localcache.getItem(localdb.table_heropve, e).name;

            case 97:
                var a = localcache.getItem(localdb.table_heroClothe, e);
                return a ? a.name : "";

            case 999:
                var s = localcache.getItem(localdb.table_hero, e % 1e4),
                    c = Math.floor(e / 1e4);
                return s
                    ? i18n.t("COMMON_ADD_2", {
                          n: s.name,
                          c: i18n.t("COMMON_PROP" + c)
                      })
                    : "";

            default:
                var _ = localcache.getItem(localdb.table_item, e);
                return _ ? _.name : "";
        }
        return "";
    };
    this.getRwdString = function(t) {
        for (var e = "", o = 0; o < t.length; o++) {
            var n = t[o],
                l = n.hasOwnProperty("kind") ? n.kind : 1,
                r = n.hasOwnProperty("id") ? n.id : n.itemid,
                a = n.hasOwnProperty("count") ? n.count : 1;
            e += i.stringUtil.isBlank(e) ? "" : ",";
            e += i18n.t("COMMON_ADD", {
                n: this.getKindIdName(l, r),
                c: i.utils.formatMoney(a)
            });
        }
        return e;
    };
    this.officeLvIsOver = function(t) {
        if (null == t) return !1;
        var e = t.para + "";
        switch (t.condition) {
            case 1:
                return n.taskProxy.mainTask.id > parseInt(e);

            case 2:
                return null != n.servantProxy.getHeroData(parseInt(e));

            case 3:
                return null != n.wifeProxy.getWifeData(t.para);

            case 4:
                return this.userData.mmap > parseInt(e);

            case 5:
                return this.userData.bmap > parseInt(e);

            case 6:
                var o = localcache.getItem(localdb.table_heropve, t.para);
                if (null == o) return !0;
                var i = n.jibanProxy.getJibanData(o.type, o.roleid);
                return null != i && i.id >= parseInt(e);

            case 7:
                var l = e.split("|");
                return (
                    n.jibanProxy.getHeroJB(parseInt(l[0])) >= parseInt(l[1])
                );

            case 8:
                l = e.split("|");
                return (
                    n.jibanProxy.getWifeJB(parseInt(l[0])) >= parseInt(l[1])
                );
        }
        return !0;
    };
    this.officeOpen = function(t) {
        switch (t.condition) {
            case 1:
                r.funUtils.openView(r.funUtils.mainTask.id);
                break;

            case 4:
            case 5:
                r.funUtils.openView(r.funUtils.battleView.id);
        }
        return !0;
    };
    this.getOfficeLvError = function(t) {
        if (null == t) return "";
        var e = t.para + "";
        switch (t.condition) {
            case 1:
                var o = localcache.getItem(localdb.table_mainTask, e);
                return i18n.t("USER_UP_LV_NEED1", {
                    n: o.name
                });

            case 2:
                var i = localcache.getItem(localdb.table_hero, e);
                return i18n.t("USER_UP_LV_NEED2", {
                    n: i.name
                });

            case 3:
                return i18n.t("USER_UP_LV_NEED3", {
                    n: this.getWifeName(t.para)
                });

            case 4:
                var n = localcache.getItem(localdb.table_midPve, e);
                return i18n.t("USER_UP_LV_NEED4", {
                    n: n.mname
                });

            case 5:
                var l = localcache.getItem(localdb.table_bigPve, e);
                return i18n.t("USER_UP_LV_NEED5", {
                    n: l.name
                });

            case 6:
                var r = localcache.getItem(localdb.table_heropve, t.para);
                return i18n.t("USER_UP_LV_NEED6", {
                    n: r.name
                });

            case 7:
                var a = e.split("|");
                i = localcache.getItem(localdb.table_hero, a[0]);
                return i18n.t("USER_UP_LV_NEED7", {
                    n: i.name,
                    v: a[1]
                });

            case 8:
                a = e.split("|");
                return i18n.t("USER_UP_LV_NEED8", {
                    n: this.getWifeName(t.para),
                    v: a[1]
                });
        }
        return "";
    };
    this.getAllEp = function() {
        return this.userEp
            ? this.userEp.e1 +
                  this.userEp.e2 +
                  this.userEp.e3 +
                  this.userEp.e4
            : 0;
    };
    this.getAllJobs = function () {
        if(this.userData.allJob)
        this.allJobs = JSON.parse(this.userData.allJob);
        return this.allJobs;
    };
    this.isUnlockCloth = function(t) {
        if (0 == t || null == t) return !0;
        var e = localcache.getItem(localdb.table_userClothe, t);
        if (null == e) return !0;
        if (this.clothes && -1 != this.clothes.indexOf(t)) {
            if (0 != e.limit)
                for (
                    var o = 0;
                    this.limitTime && o < this.limitTime.length;
                    o++
                )
                    if (
                        this.limitTime[o].id == t &&
                        this.limitTime[o].time < i.timeUtil.second
                    )
                        return !1;
            return !0;
        }
        return !(!e || 1 != e.unlock) && this.userData.level >= e.para;
    };
    this.getSuitCount = function(t) {
        var e = localcache.getItem(localdb.table_usersuit, t);
        if (null == e) return "";
        for (var o = 0, i = 0; i < e.clother.length; i++)
            this.isUnlockCloth(e.clother[i]) && o++;
        return i18n.t("COMMON_NEED", {
            f: o,
            s: e.clother.length
        });
    };
    this.getRemainClotheTime = function(t) {
        for (var e = 0; this.limitTime && e < this.limitTime.length; e++)
            if (this.limitTime[e].id == t)
                return this.limitTime[e].time - i.timeUtil.second;
        return 0;
    };
    this.sendCloth = function(t, e, o, n, l, r, a) {
        void 0 === a && (a = !0);
        var s = new proto_cs.user.setClothe();
        s.head = t;
        s.body = e;
        s.ear = o;
        s.background = n;
        s.effect = l;
        s.animal = r;
        JsonHttp.send(s, function() {
            a && i.alertUtil.alert18n("USER_CLOTHE_SET");
        });
    };
    this.sendUnlockCloth = function(t) {
        var e = new proto_cs.user.lockClothe();
        e.id = t;
        e.id1 = 1;
        JsonHttp.send(e, function() {
            i.alertUtil.alert18n("USER_CLOTHE_UNLOCK_SUC");
        });
    };
    this.sendGetOther = function(t, e) {
        void 0 === e && (e = 0);
        var o = new proto_cs.user.getFuserMember();
        o.id = t;
        0 != e && (o.spid = e);
        JsonHttp.send(o, function() {
            i.utils.openPrefabView("user/UserInfo");
        });
    };
    this.sendHeadBlank = function(t, e) {
        var o = new proto_cs.user.setAvatar();
        o.head = t;
        o.blank = e;
        JsonHttp.send(o, function() {
            i.alertUtil.alert18n("USER_HEAD_OK");
        });
    };
    this.sendResetName = function(t, e) {
        void 0 === e && (e = 1);
        var o = new proto_cs.user.resetName();
        o.name = t;
        o.type = e;
        JsonHttp.send(o, function() {
            n.playerProxy.userData.name == t &&
                i.alertUtil.alert18n("USER_RENAME_SUC");
        });
    };
    this.sendResetJob = function(t) {
        if (this.userData.job != t) {
            var e = new proto_cs.user.resetImage();
            e.job = t;
            e.sex = 2;
            JsonHttp.send(e, function() {
                if (n.playerProxy.userData.job == t) {
                    i.alertUtil.alert18n("USER_REJOB_SUC");
                    facade.send("PLAYER_RESET_JOB");
                }
            });
        }
    };

    this.sendBuyJob = function (job) {
        var e = new proto_cs.user.buyImage();
        e.job = job;
        e.sex = 2;
        JsonHttp.send(e, function() {
            // if (n.playerProxy.userData.job == t) {
            //     i.alertUtil.alert18n("USER_REJOB_SUC");
            //     facade.send("PLAYER_RESET_JOB");
            // }
        });

    };

    this.sendAddition = function() {
        JsonHttp.send(new proto_sc.user.addition());
    };
    this.isHaveBlank = function(t) {
        return (
            null != this.blanks &&
            !(!this.blanks || -1 == this.blanks.indexOf(t))
        );
    };
    this.onQifuDat = function(t) {
        this.qifuData = t;
        var e = localcache.getItem(
                localdb.table_officer,
                this.userData.level
            ),
            o =
                t.lastTime > i.timeUtil.getTodaySecond(0)
                    ? e.pray - t.free
                    : e.pray;
        a.change(
            "qifu",
            o > 0 && r.funUtils.isOpenFun(r.funUtils.qifu)
        );
        facade.send(this.PLAYER_QIFU_UPDATE);
    };
    this.onAddition = function(t) {
        this.addition = t;
        facade.send(this.PLAYER_ADDITION_UPDATE);
    };
    this.sendQifu = function(t) {
        var e = new proto_cs.user.qifu();
        e.jyid = t;
        JsonHttp.send(e);
    };
    this.getVipValue = function(t) {
        var e = localcache.getItem(
            localdb.table_vip,
            n.playerProxy.userData.vip
        );
        return e && e[t] ? e[t] : 0;
    };
    this.getSuitLv = function(t) {
        if (null == this.suitlv) return 1;
        for (var e = 0; e < this.suitlv.length; e++)
            if (this.suitlv[e].id == t) return this.suitlv[e].lv;
        return 1;
    };
    this.sendSuitLv = function(t) {
        var e = new proto_cs.user.lvupSuit();
        e.id = t;
        JsonHttp.send(e);
    };

}
exports.PlayerProxy = PlayerProxy;
var RoleData = function() {
    this.coin = 0;
    this.food = 0;
    this.army = 0;
    this.cash = 0;
    this.ep = 0;
};
exports.RoleData = RoleData;
